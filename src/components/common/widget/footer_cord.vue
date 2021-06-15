<template>
    <transition name="cardenter" >
      <playlist-card  v-show="showPlaylist" :style="{position:'fixed',left:playlist_pos.x-150+'px',bottom:'85px',zIndex:'-2'}" ></playlist-card>
    </transition>
  <img :src="coverImg+'?param=70y70'" alt="" class="coverImg">
  <div class="info">
    <div class="songname">{{ songName }}</div>
    <div class="singer">{{ artist }}</div>
  </div>
  <div class="progressbar">
    <div class="btnGroup">
      <i class="iconfont Player-icon-randommdpi"
         :style="{color:[$store.getters['musicplay/getRandomState']===true?'var(--Main_blue)':'var(--title_text)']}"></i>
      <i class="iconfont Player-icon-lastmdpi"
         @click="lastSong()"></i>
      <i class="iconfont Player-icon-playmdpi"
         @click="play()"
         v-show="$store.getters['musicplay/getPlayState']===false">
      </i>
      <i class="iconfont Player-icon-pausemdpi"
           @click="pause()"
         v-show="$store.getters['musicplay/getPlayState']===true" >
      </i>

      <i class="iconfont Player-icon-nextmdpi"
         @click="nextSong()">
      </i>

      <i class="iconfont Player-icon-loopmdpi"
         :style="{color:[$store.getters['musicplay/getLoopState']===true?'var(--Main_blue)':'var(--title_text)']}"></i>

    </div>
    <div class="progress">
      <div class="time">{{timeTrans(currentTime)}}</div>
      <progress-bar class="progress_bar"
                    :progress="(currentTime/maxTime)*100"
                    type="audio"></progress-bar>
      <div class="time">{{timeTrans(maxTime)}}</div>
    </div>
  </div>

  <div class="other">
    <div class="progress_volume">
    <i v-show="volume>0.8"  class="iconfont Player-icon-maxmdpi" ></i>
    <i v-show=".1<volume&&volume<0.8"  class="iconfont Player-icon-lowmdpi" ></i>
    <i v-show="volume<0.1"  class="iconfont Player-icon-mutemdpi" ></i>
    <progress-bar class="progress_bar"
                  type="volume"
                  :progress="volume*100">
    </progress-bar>
  </div>
    <div class="playlist"
         ref="btn_playlist"
         @click="showPlaylistCard">  <i class="iconfont Player-icon-randommdpi"></i></div>
  </div>

  <AudioPlay ></AudioPlay>
</template>

<script>
import {mapState} from 'vuex'
import ProgressBar from "./progressBar";
import playlistCard from "widget/playlistCard.vue";
import {timeTrans,artistsNameComB} from 'utils/tools'
import AudioPlay from "./AudioPlay";
export default {
name: "footer_cord",
  components: {AudioPlay, ProgressBar,playlistCard},
  data(){
  return{
    playlist_pos:{},
    coverImg:'',
    songName:'',
    artist:'',
    showPlaylist:false
   }
  },
  methods:{
    timeTrans(num){ return  timeTrans(num)  },
    play(){ this.$audio.play()  } ,
    pause(){  this.$audio.pause() },
    nextSong:async function(){
      if(this.musicList.length>2){
        clearInterval(this.Timer)
          //当前列表项index
          const currentIndex = this.musicList.findIndex(item=>item.id===this.currentID)
          const nextSong =  this.musicList[currentIndex+1]
          this.$audio.pause()
          await this.$audio.setUrl(nextSong.id,nextSong.name,nextSong.ar,nextSong.al.picUrl)
          this.$audio.play()
      }else{
        this.$msgbox.msgbox('没有下一曲了',1000)
        }
    },
    lastSong:async function(){
      const currentIndex = this.musicList.findIndex(item=>item.id===this.currentID)
      if(this.musicList&&currentIndex>0){
        clearInterval(this.Timer)
          //当前列表项index
          const nextSong =  this.musicList[currentIndex-1]
          this.$audio.pause()
          await this.$audio.setUrl(nextSong.id,nextSong.name,nextSong.ar,nextSong.al.picUrl)
          this.$audio.play()
      }else{
        this.$msgbox.msgbox('没有上一曲了',1000)
        }
    },
    showPlaylistCard(){
      this.playlist_pos = this.$refs.btn_playlist.getBoundingClientRect()
      this.showPlaylist=!this.showPlaylist
    }
  },
  computed:{
  ...mapState({
       currentTime:state => state.musicplay.currentTime,
       musicInfo:state => state.musicplay.musicInfo,
       maxTime:state => state.musicplay.maxTime,
       volume:state => state.musicplay.volume,
       musicList:state => state.musicplay.musicList,
        currentID:state => state.musicplay.musicID,
   }),
  },
  watch:{
    musicInfo:function (newState){
      // console.log('状态');
      // console.log(newState);
      this.songName=newState.NAME
      this.artist=artistsNameComB(newState.ARTISTS)
      this.coverImg=newState.PICURL
    }
  },mounted() {
    this.songName=this.musicInfo.NAME
    this.artist=artistsNameComB(this.musicInfo.ARTISTS)
    this.coverImg=this.musicInfo.PICURL
  }
}
</script>

<style scoped>
.cardenter-enter-active ,.cardenter-leave-active {
  transition: all .2s cubic-bezier(0.4,0.5,0.6,0.9);
}
.cardenter-enter-from, .cardenter-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(500px);
}
.coverImg{
  background-color: white;
  height: 70px;
  width: 70px;
  margin-left: 20px;
  border-radius: 5px;
}
.info{
  padding-left: 20px;
  text-align: left;
  height: 90%;
  width: 325px
 }
.songname{
  font-size: 15pt;
  font-weight: bolder;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--title_text);
}
.singer{
  font-size: 10pt;
  font-weight: bold;
  color: var(--title_text);
}
.btnGroup{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 5px;
  height: 35px;
  padding: 0 20px 0 20px;
}
i{
  height: 20px;
  padding: 8px;
  width: 20px;
  background-size: cover;
  font-size: 13pt;
  transition: .2s;
}
.Player-icon-playmdpi{
  font-size: 18pt;
  transform: translateY(-5px);
}
i:hover{
  transition: .3s;
}
.progressbar{
  height: calc(100% - 10px);
  padding-top: 10px;
  width: 50%;
  background-color: white;
  z-index: 1;
}
.other{
  background-color: white;
  z-index: 1;
  height: 90%;
  width: 24%;
}
.progress_bar{
  width: 780px;
}
.progress{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.time{
  font-size: 10pt;
  margin: 0 10px 0 10px;

}
.progress_volume{
  height: 90%;
  float: right;
  margin: 5px 20px 5px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 150px;
}
.playlist{
  float: right;
  display: flex;
  align-items: center;
  height: 70px;
  width: 70px;
}
</style>
