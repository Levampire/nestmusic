<template>
  <div class="item_self"
       @mousedown=" startPos = $event.target.getBoundingClientRect()"
       @mouseenter="MouseisOn()"
       @mouseleave="MouseLeave() "
       @mouseup="toDetailPage($event)"
       @click.stop >
    <div >
      <img :src="coverImg+'?param=180y180'"
           loading="lazy"
           :class="[com_type==='artist'?'artimg':'songimg']"
           oncontextmenu="return false;"
           ondragstart="return false;"
           alt="">
      <div v-if="info.creator" class="tag">{{ tag }}</div>
      <label class="title">{{ title }}</label>
      <label class="info">{{ detail }}</label>
    </div>

<!--    <div v-if="com_type === 'artist' ">-->
<!--      <img :src="info.img1v1Url"-->
<!--           :class="[com_type==='artist'?'artimg':'songimg']"-->
<!--           oncontextmenu="return false;"-->
<!--           ondragstart="return false;"-->
<!--           alt="">-->
<!--      <label class="title">{{ info.name }}</label>-->
<!--      <label class="info"></label>-->
<!--    </div>-->


<!--    <div v-if="com_type === 'user' ">-->
<!--      <img :src="info.avatarUrl"-->
<!--           :class="[(com_type==='artist'||com_type==='user')?'artimg':'songimg']"-->
<!--           oncontextmenu="return false;"-->
<!--           ondragstart="return false;"-->
<!--           alt="">-->
<!--      <label class="title">{{ info.nickname }}</label>-->
<!--      <label class="info">用户</label>-->
<!--    </div>-->


<!--    <div v-if="com_type === 'playlist' ">-->
<!--      <img :src="info.coverImgUrl"-->
<!--           :class="[com_type==='artist'?'artimg':'songimg']"-->
<!--           oncontextmenu="return false;"-->
<!--           ondragstart="return false;"-->
<!--           alt="">-->
<!--      <div class="title">{{ info.name }}</div>-->
<!--      <div class="info">{{ info.creator.nickname }}</div>-->
<!--    </div>-->


<!--      <div v-if="com_type === 'user_playlist'">-->
<!--      <img :src="info.picUrl"-->
<!--           :class="[com_type==='artist'?'artimg':'songimg']"-->
<!--           oncontextmenu="return false;"-->
<!--           ondragstart="return false;"-->
<!--           alt="">-->
<!--        <div v-if="info.creator" class="tag">{{ info.creator.nickname }}</div>-->
<!--      <div class="title">{{ info.name }}</div>-->
<!--      <div class="info">{{ info.copywriter }}</div>-->


<!--    </div>-->


<!--    <div v-if="com_type === 'album' ">-->
<!--      <img :src="info.picUrl"-->
<!--           :class="[com_type==='artist'?'artimg':'songimg']"-->
<!--           oncontextmenu="return false;"-->
<!--           ondragstart="return false;"-->
<!--           alt="">-->
<!--      <div class="tag">{{ info.type }}</div>-->
<!--      <div class="title">{{ info.name }}</div>-->
<!--      <div class="info">{{ info.artist.name }}</div>-->

<!--    </div>-->
<!--    <div v-if="com_type === 'radio'">-->
<!--      <img :src="info.picUrl"-->
<!--           :class="[com_type==='artist'?'artimg':'songimg']"-->
<!--           oncontextmenu="return false;"-->
<!--           ondragstart="return false;"-->
<!--           alt="">-->
<!--      <div class="tag">{{ info.category }}</div>-->
<!--      <div class="title">{{ info.name }}</div>-->
<!--      <div class="info">{{ info.dj.nickname }}</div>-->

<!--    </div>-->
<!--    <div v-if="com_type === 'userRecord'">-->
<!--      <img :src="info.picUrl"-->
<!--           :class="[com_type==='artist'?'artimg':'songimg']"-->
<!--           oncontextmenu="return false;"-->
<!--           ondragstart="return false;"-->
<!--           alt="">-->
<!--      <div class="tag">{{ info.category }}</div>-->
<!--      <div class="title">{{ info.name }}</div>-->
<!--      <div class="info">{{ info.dj.nickname }}</div>-->
<!--    </div>-->

<!-- //播放按钮-->
    <transition v-if="com_type!=='artist'&&com_type!=='user'" name="play_in">
      <div v-show="isOn"
           @mouseover="isOnPlayBtn = true"
           @mouseleave="isOnPlayBtn = false"
           @click="clickPlay()"
           @click.stop.prevent
           class="play_btn"
           :class="[!isPlay?'play':'pause']">
      </div>
    </transition>
  </div>
</template>
<script>
import {playlist_detail} from 'network/music'
import {mapState} from "vuex";

export default {
  name: "square_item",
  props: {
    info: {
      type: Object,
      default: function (){
        return {}
      }
    },
    com_type: {
      type: String
    }
  },
  computed:{
    ...mapState({
      playState:state => state.musicplay.isPlay,
      musicID:state => state.musicplay.musicID,
      PlaylistID:state => state.musicplay.PlaylistID
    })
},
  data() {
    return {
      //触发
      startPos:{},
      endPos:{},
      isPlay:false,
      isOn: false,
      isOnPlayBtn:false,
      currentMusicID:0,
      currentPlaylistID:0,
      //数据
      title:'nie',
      coverImg:'eee',
      tag:'ee',
      detail:'',
    }
  },
  watch:{
    playState:function (newstate){
      if(this.isPlay!==newstate && this.currentPlaylistID===this.info.id){
        this.isPlay = newstate
      }
    },
    musicID:function (currentMusicID){
      this.currentMusicID=currentMusicID
    },
    PlaylistID:function (currentPlaylistID){
      this.currentPlaylistID=currentPlaylistID
    }
  },
  methods: {
    toDetailPage(e){
      //防止滑动触发click
      this.endPos = e.target.getBoundingClientRect()
      if(Math.abs(this.endPos.x-this.startPos.x) < 7 && this.isOnPlayBtn === false){
        this.$router.push({
          name: 'detail',
          params: {
            id:this.info.id
          }
        })
      }
    },
    MouseisOn() {this.isOn = true;},
    MouseLeave() { this.isOn = false;},
    clickPlay(){
      if(!this.isPlay){
        switch (this.com_type){
          case 'user_playlist': {
            playlist_detail(this.info.id).then(result => {
              this.$audio.pause()
              this.$audio.setPlaylist(result.data.playlist.tracks,this.info.id)
              const music = this.$store.getters['musicplay/getMusicList']
              this.$audio.setUrl(music[0].id,music[0].name,music[0].ar,music[0].al.picUrl)
            }).then(()=>{
              this.$audio.play()
              this.isPlay=true
            }).catch(error=>{console.log("歌单详情获取失败"+error);});

            // this.$audio.play(music[0].id,music[0])
            break;
          }
          case'songs':{
            console.log('songs')
          }
        }
      }else {
        this.isPlay=false
        this.$audio.pause()
      }
    }
  },
  mounted() {
    switch (this.com_type) {
      case "song":{
        this.title = this.info.name ;
        this.coverImg = this.info.img1v1Url;
        this.detail = '单曲';
        break;
      }
      //艺人
      case "artist":{
        this.title = this.info.name;
        this.coverImg = this.info.img1v1Url;
        this.detail = '艺人';
        break;
      }
      //用户
      case "user":{
        this.title = this.info.nickname;
        this.coverImg = this.info.avatarUrl;
        this.detail = "用户";
        break;
      }
      //歌单
      case "playlist":{
        this.title = this.info.name;
        this.coverImg = this.info.coverImgUrl;
        this.detail = this.info.creator.nickname;
        break;
      }
      //用户每日推荐
      case "user_playlist":{
        this.title = this.info.name;
        this.coverImg = this.info.picUrl;
        this.detail = this.info.copywriter
        this.tag = this.info.creator? this.info.creator.nickname:''
        break;
      }
      //专辑
      case "album":{
        this.title = this.info.name;
        this.coverImg = this.info.picUrl;
        this.detail = this.info.artist.name
        this.tag = this.info.type
        break;
      }
        //电台
      case "radio":{
        this.title = this.info.name;
        this.coverImg = this.info.picUrl;
        this.detail = this.info.dj.nickname
        this.tag = this.info.category
        break;
      }
        //用户播放记录
      case "userRecord":{
        this.title = this.info.name;
        this.coverImg = this.info.picUrl;
        this.detail = this.info.dj.nickname
        this.tag = this.info.category
        break;
      }
    }
  }
}
</script>

<style scoped>
.item_self {
  display: flex;
  flex-direction: column;
  align-items: start;
  position: relative;
  /*不被挤压*/
  flex-shrink: 0;
  padding:10px 5px 10px 5px;
  margin-left: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  height: 260px;
  width: 170px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(80, 80, 80, .1);
}

.item_self:hover {
  background-color: rgba(255, 255, 255, 1);
}

img {
  width: 160px;
  height: 160px;
}
.artimg {
  border-radius: 80px;
}
.songimg {
  border-radius: 5px;
}

.tag {
  width: fit-content;
  max-width: 160px;
  margin: 0 0 2px 5px;
  color: var(--Ligth_Text);
  background-color: #5FDEAD;
  border-radius: 2px;
  height: 20px;
  line-height: 1.3rem;
  font-weight: bolder;
  padding: 0 2px 0 2px;
  font-size: 8pt;
  overflow: hidden;
  transform: scale(.9) translateX(-5px);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.title {
  text-align: left;
  display: inline-block;
  width: 160px;
  height: 1.5rem;
  line-height: 1.5rem;
  color: var(--title_text);
  font-weight: 800;
  max-lines: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.info {
  display: inline-block;
  width: 160px;
  color: var(--title_text);
  text-align: left;
  font-size: 8pt;
  max-lines: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.play_btn{
  position: absolute;
  right: 0;
  bottom: 5px;
  height: 70px;
  width: 70px;
  transition: .3s;
  background-size: cover;
  transform: translateY(-90px);
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
  transition: all .3s ease;
}

.play_in-enter-active {
  transition: all .3s ease;
}

.play_in-leave-active {
  transition: all .4s cubic-bezier(0.4, 0.5, 0.6, 0.9);
}

.play_in-enter, .play_in-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */
{
  transform: translateY(-75px) scale(.8);
  opacity: .0;

}
</style>
