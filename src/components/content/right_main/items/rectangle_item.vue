<template >
  <div class="item_self" @mouseenter="MouseisOn()" @mouseleave="MouseLeave()" @click.stop>
    <span class="playlist_tag">{{tag}}</span>
    <img :src="coverImg"
         alt=""
         oncontextmenu="return false;"
         ondragstart="return false;" >
    <label class="title">
      <div class="name">{{title}}</div>
      <div class="author">{{author}}</div>
    </label>
    <transition name="play_in">
      <div v-show="isOn"
      @click="clickPlay"
           class="play_btn"
           :class="[!isPlay?'play':'pause']">
      </div>
    </transition>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  name: "rectangle_item",
  props:{
    //PROPS
    item:{
      type:Object,
      default:function() {
        return{}
      }
    },
    type:{
      type:String
    }
  },
  data(){
    return{
      title:'nie',
      coverImg:'eee',
      tag:'ee',
      author:'',
      isOn:false,
      isPlay:false,
      currentMusicID:0,
      currentPlaylistID:0,
    }
  },
  computed:{
    ...mapState({
      playState:state => state.musicplay.isPlay,
      musicID:state => state.musicplay.musicID,
      PlaylistID:state => state.musicplay.PlaylistID
    })
  },
  watch:{
    playState:function (newstate){
      if(this.isPlay!==newstate && this.currentPlaylistID===this.item.id){
        this.isPlay = newstate
      }
    },
    musicID:function (currentMusicID){
      // console.log(currentMusicID+this.item.name+":"+this.item.id);
      this.currentMusicID=currentMusicID
    },
    PlaylistID:function (currentPlaylistID){
      this.currentPlaylistID=currentPlaylistID
    }
  },
  methods:{
    MouseisOn(){
      this.isOn = true;
    },
    MouseLeave(){
      this.isOn = false;
    },
    clickPlay(){
      if(!this.isPlay){
        switch (this.type){
          case 'newSong': {
            //直接点击音乐播放 播放列表添加内容
            this.$audio.pause()
            this.$audio.setUrl(this.item.id,this.item.name,this.item.artists,this.item.album.picUrl)
            this.isPlay=true
            console.log(this.isPlay);
            setTimeout(()=>{this.$audio.play()},100)
            break;
          }
          case'songs':{
            console.log('sonsg')
          }
        }
      }else {
        this.isPlay=false
        this.$audio.pause()
      }
    }
  },
  mounted() {
    switch (this.type) {
      case "Albums":{
        this.title = this.item.uiElement.mainTitle.title;
        this.coverImg = this.item.uiElement.image.imageUrl;
        this.tag = this.item.resourceType;
        this.author = this.item.resourceType;
        break;
      }
      case "playlists":{
        this.title = this.item.name;
        this.coverImg = this.item.coverImgUrl;
        this.tag = this.item.tag;
        this.author = this.item.creator.nickname;
        break;
      }case "Radio":{
        this.title = this.item.name;
        this.coverImg = this.item.picUrl;
        this.tag = "电台";
        this.author = this.item.dj.nickname;
        break;
      }
      case "newSong":{
        this.title = this.item.name;
        this.coverImg = this.item.album.picUrl;
        this.author = this.item.artists[0].name;
        let publishTime = new Date(this.item.album.publishTime);
        this.tag = publishTime.getFullYear().toString() +'.'+ publishTime.getMonth().toString()+'.'+publishTime.getDay().toString() ;
        break;
      }
      case "newAlbums":{
        this.title = this.item.name;
        this.coverImg = this.item.picUrl;
        this.author = this.item.artist.name;
        this.tag = this.item.subType
        break;
      }
    }
  }
}
</script>

<style scoped>
.item_self{
  position: relative;
  /*不被挤压*/
  flex-shrink: 0;
  margin-left: 20px;
  align-items: center;
  background-color: rgba(255,255,255,0.6);
  height: 70px;
  width: 285px;
  border-radius: 5px;
  box-shadow:0 0 5px rgba(80,80,80,.1);
  overflow: hidden;
}
.item_self:hover{
  background-color: rgba(255,255,255,1);
  transition:0.1s cubic-bezier(0.2,0.4,0.6,0.8);
}
img{
  float: left;
  width:70px ;
  height: 70px;
}
.title{
  padding-left: 5px;
  float: left;
  width: 170px;
  height: 60px;
  display:flex;
  flex-direction:column;
}
.name{
  margin-top: 5px;
  font-size: 11pt;
  line-height: 40px ;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--title_text) ;
  font-weight: bold;
  text-align: left;
  max-lines: 1;
}
.author{
  position: absolute;
  left:75px ;
  bottom: 8px;
  line-height: 30px ;
  color: var(--info_text) ;
  font-size: 7pt;
  text-align: left;
  max-lines: 1;
}
.play_btn{
  position: absolute;
  right: 0;
  bottom: 5px;
  height: 70px;
  width: 70px;
  transition: .3s;
  background-size: cover;
  transform: translateY(5px);
}
.play {
  background-image: url("~assets/img/play_cover.svg");
  /*animation: play_btn;
  animation-duration: 0.2s;*/
}
.pause{
  background-image: url("~assets/img/pause_cover.svg");
}

.play_in-enter-active {
  transition: all .8s cubic-bezier(0.4,0.5,0.6,0.9);
}
.play_in-leave-active {
  transition: all .4s cubic-bezier(0.4,0.5,0.6,0.9) ;
}
.play_in-enter, .play_in-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px) scale(.8);
  opacity: .0;
}
</style>
