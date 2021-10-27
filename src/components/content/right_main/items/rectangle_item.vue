<template >
  <div class="item_self"
       @mousedown=" startPos = $event.target.getBoundingClientRect()"
       @mouseenter="MouseisOn()"
       @mouseleave="MouseLeave()"
       @mouseup="toDetailPage($event)"
       @click.stop
       >
    <span class="playlist_tag">{{tag}}</span>
    <img :src="coverImg+'?param=70y70'"
         alt=""
         loading="lazy"
         oncontextmenu="return false;"
         ondragstart="return false;" >
    <label class="title">
      <div class="name">{{title}}</div>
      <div class="author">{{author}}</div>
    </label>
    <transition name="play_cover">
      <div v-show="isOn"
           @click="clickPlay()"
           @mouseover="isOnPlayBtn = true"
           @mouseleave="isOnPlayBtn = false"
           class="play_btn"
           :class="[!isPlay?'play_cover':'pause_cover']">
      </div>
    </transition>
  </div>
</template>
<script>
import {mapState} from "vuex";
import {timeDateTrans} from "utils/tools";
import {playlist_detail,album} from 'network/music'
import {isThisSongPlayable, listInit} from "../../../../utils/isPlayable";

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
      startPos:{},
      endPos:{},
      isOnPlayBtn:false,
      title:'',
      coverImg:'',
      tag:'ee',
      author:'',
      isOn:false,
      isPlay:false,
      currentMusicID:0,
      currentPlaylistID:0,
      playListType:['playlist','newAlbum','Radio']
    }
  },
  computed:{
    ...mapState({
      playState:state => state.musicplay.isPlay,
      musicID:state => state.musicplay.musicID,
      PlaylistID:state => state.musicplay.PlaylistID,
      MusicID:state => state.musicplay.MusicID
    })
  },
  watch:{
    playState:function (newstate){
      // console.log(this.currentMusicID )
      // console.log("item:"+this.item.id)
      if(this.isPlay!==newstate &&(this.currentMusicID===this.item.id || this.currentPlaylistID===this.item.id)){
        this.isPlay = newstate
      }
      switch (this.type) {
        case "newSong":{
          if(this.musicID===this.item.id&&newstate){
            this.isPlay = true
          }else {
            this.isPlay = false
          }
          break;
        }
      }
    },
    musicID:function (currentMusicID){
      // console.log(currentMusicID+this.item.name+":"+this.item.id);
      this.currentMusicID=currentMusicID
    },
    PlaylistID:function (currentPlaylistID){
      this.currentPlaylistID=currentPlaylistID
    },
    MusicID:function (currentMusicID){
      this.currentMusicID=currentMusicID
    },
    item(newInfo){
      if(this.playState){
        this.isPlay = this.musicID===this.item.id
      }
    }
  },
  methods:{
    toDetailPage(e){
      //防止滑动触发click
      this.endPos = e.target.getBoundingClientRect()
      if(Math.abs(this.endPos.x-this.startPos.x) < 7 && this.isOnPlayBtn === false){
        if(this.playListType.indexOf(this.type)!==-1){
          const id = {
            'playlist':this.item.id,
            'newAlbum':this.item.id,
            'Radio':this.item.id,
          }
          console.log(this.type)
          this.$router.push({
            name: 'playlistDetail',
            params: {
              type:this.type,
              id: id[this.type]
            }
          })
        }
      }
    },
    MouseisOn(){
      this.isOn = true;
    },
    MouseLeave(){
      this.isOn = false;
    },
    PLAY:async function (ID,NAME,ARTISTS,PICURL,fullInfo){
      this.$audio.pause()
      await this.$audio.setUrl(ID,NAME,ARTISTS,PICURL,fullInfo)
      this.isPlay=true
      this.$audio.play()
    },
    checkPlayable(list){
      const result = list.filter(item=>item.playable!==false)
      if(result.length===0) {
        this.handleError('没有可用音乐')
        return false
      } else{
        return result
      }
    },
    clickPlay:function(){
      if(!this.isPlay){
        switch (this.type){
          case 'newSong': {
            if(this.item.playable){
              //直接点击音乐播放 播放列表添加内容
              this.PLAY(this.item.id,this.item.name,this.item.artists,this.item.album.picUrl,this.item)
            }else{
              this.handleError(this.item.reason)
            }
            break;
          }
          case'playlist':{
            playlist_detail(this.item.id).then(result => {
              const vaild =  this.checkPlayable(listInit(result.data.playlist.tracks))
              if(vaild){
                this.$audio.setPlaylist(vaild,this.item.id)
                this.PLAY(vaild[0].id,vaild[0].name,vaild[0].ar,vaild[0].al.picUrl,vaild[0])
              }
            }).catch(error=>{console.log("歌单详情获取失败"+error);});
            break;
          }

          case'newAlbum':{
            album(this.item.id).then(result => {
              const vaild =  this.checkPlayable(listInit((result.data.songs)))
              if(vaild){
                this.$audio.setPlaylist(vaild,this.item.id)
                this.PLAY(vaild[0].id,vaild[0].name,vaild[0].ar,vaild[0].al.picUrl,vaild[0])
              }
            }).catch(error=>{console.log("歌单详情获取失败"+error);});
          }
        }

      }else {
        this.isPlay=false
        this.$audio.pause()
      }
    },
    handleError(msg){
      this.$msgbox.msgbox(msg,200)
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
      case "playlist":{
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
        // console.log(this.item);
        this.title = this.item.name;
        this.coverImg = this.item.album.picUrl;
        this.author = this.item.artists[0].name;
        this.tag = timeDateTrans(this.item.album.publishTime)
        break;
      }
      case "newAlbum":{
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
  box-shadow:0 0 5px rgba(80,80,80,.1),
    0 0 15px rgba(220,220,220,.1);
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

.play_cover-enter-active {
  transition: all .8s cubic-bezier(0.4,0.5,0.6,0.9);
}
.play_cover-leave-active {
  transition: all .4s cubic-bezier(0.4,0.5,0.6,0.9) ;
}
.play_cover-enter, .play_cover-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px) scale(.8);
  opacity: .0;
}
</style>
