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
         :style="{color:[isRandom===true?'var(--Main_blue)':'rgba(0,0,0,.8)']}"
         :class = "[isRandom===true?'randomISON':'']"
         @click="RandomStateChange()"
      ></i>
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

      <i class="iconfont "
         :class = "[loopMode!==0?'loopISON':'']+' '+[loopMode===1?'Player-icon-Player-icon-loopOnemdpi':' Player-icon-Player-icon-loopmdpi']"
         @click="loopModeChange()"
      ></i>
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
         @click="showPlaylistCard">  <i class="iconfont Player-icon-list1"></i></div>
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
    RandomStateChange(){this.$store.commit('musicplay/isRandom')},
    loopModeChange(){this.$store.commit('musicplay/loopMode')},
    nextSong:async function(){
      let  tempList;
      if(!this.isRandom){
        tempList = this.musicList
      }else{
        tempList = this.RandomList
      }
      const currentIndex = tempList.findIndex(item=>item.id===this.currentID)
      let nextSong;
      if(tempList.length>2&& tempList[currentIndex+1]!==undefined){
        clearInterval(this.Timer)
          //当前列表项index
          nextSong =  tempList[currentIndex+1]
      }else{
        nextSong =  tempList[0]
        }
      this.$audio.pause()
      await this.$audio.setUrl(nextSong.id,nextSong.name,nextSong.ar,nextSong.al.picUrl,nextSong)
      this.$audio.play()
    },
    lastSong:async function(){
      let  tempList;
      if(!this.isRandom){
        tempList = this.musicList
      }else{
        tempList = this.RandomList
      }
      const currentIndex = tempList.findIndex(item=>item.id===this.currentID)
      let lastSong;
      if(tempList&&currentIndex>0){
        clearInterval(this.Timer)
          //当前列表项index
          lastSong  =  tempList[currentIndex-1]
      }else{
        lastSong  =  tempList[this.musicList.length-1]
        }
      this.$audio.pause()
      await this.$audio.setUrl(lastSong.id,lastSong.name,lastSong.ar,lastSong.al.picUrl,lastSong)
      this.$audio.play()
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
      loopMode :state => state.musicplay.loopMode,
      isRandom :state => state.musicplay.isRandom,
      RandomList :state => state.musicplay.randomList,
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
  transition: all .3s cubic-bezier(0.4,0.5,0.6,0.9);
  opacity: 1;
}
.cardenter-enter-from, .cardenter-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(500px);
  opacity: 0 ;
}
.coverImg{
  height: 50px;
  width: 50px;
  margin-left: 20px;
  border-radius: 5px;
}
.info{
  padding-left: 20px;
  margin-top: 5px;
  text-align: left;
  height: 80%;
  width: 325px;
  font-family: Barlow-Medium,var(--VamFont);
 }
.songname{
  font-size: 12pt;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.singer {
  font-size: 10pt;
  transform: scale(.8);
  margin-left: -35px;
}
.btnGroup{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 18px;
  padding: 0 20px 0 10px;
  margin: 10px 0 10px 0;
}
.btnGroup i:hover{
  background-color: rgba(220,220,220,.7);
}
i{
  padding: 8px;
  background-size: cover;
  font-size: 12pt;
  border-radius: 5px;
  transition: .6s;
  color: rgba(0,0,0,.8);
}
.Player-icon-nextmdpi,.Player-icon-lastmdpi{
  font-size: 13pt;
}
.Player-icon-Player-icon-loopmdpi,.Player-icon-Player-icon-loopOnemdpi{
  width: 18px;
  height: 16px;
}
.randomISON,.loopISON{
  color: var(--Main_blue);
  transition: .3s cubic-bezier(.31,.97,.74,.63);
}
.Player-icon-loopOnemdpi{
  background-color: rgba(220,220,220,.7);
  transition: .3s cubic-bezier(.31,.97,.74,.63);
}
i:hover{
  transition: .3s cubic-bezier(.31,.97,.74,.63);
}
.progressbar{
  height: calc(100% - 10px);
  width: 50%;
  z-index: 1;
}
.other{
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
