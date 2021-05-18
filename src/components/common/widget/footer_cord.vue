<template>
  <img :src="coverImg" alt="" class="coverImg">
  <div class="info">
    <div class="songname">{{ songName }}</div>
    <div class="singer">{{ artist }}</div>
  </div>
  <div class="progressbar">
    <div class="btnGroup">
      <i class="iconfont Player-icon-randommdpi"
         :style="{color:[$store.getters['musicplay/getRandomState']===true?'var(--Main_blue)':'var(--title_text)']}"></i>
      <i class="iconfont Player-icon-lastmdpi" ></i>
      <i class="iconfont Player-icon-playmdpi"
         @click="play()"
         v-show="$store.getters['musicplay/getPlayState']===false">
      </i>
      <i class="iconfont Player-icon-pausemdpi"
           @click="pause()"
         v-show="$store.getters['musicplay/getPlayState']===true" >
      </i>

      <i class="iconfont Player-icon-nextmdpi"
         @click="this.nextSong">
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
                    :progress="(volume/1)*100">
      </progress-bar>
    </div>
  </div>
  <AudioPlay></AudioPlay>
</template>

<script>
import {mapState} from 'vuex'
import ProgressBar from "./progressBar";
import {timeTrans,artistsNameComB} from 'utils/tools'
import AudioPlay from "./AudioPlay";
export default {
name: "footer_cord",
  components: {AudioPlay, ProgressBar},
  data(){
  return{
    coverImg:'',
    songName:'',
    artist:''
   }
  },
  methods:{
    timeTrans(num){ return  timeTrans(num)  },
    play(){ this.$audio.play()  } ,
    pause(){  this.$audio.pause() }
  },
  computed:{
  ...mapState({
       currentTime:state => state.musicplay.currentTime,
       musicInfo:state => state.musicplay.musicInfo,
       maxTime:state => state.musicplay.maxTime,
       volume:state => state.musicplay.volume,
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
  color: var(--title_text);
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
  height: 50%;
  width: 50%;
  margin-bottom: 15px;
}
.other{
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
</style>
