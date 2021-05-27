<template>
 <div class="item_self"
      @mouseover="isOn=true"
      @mouseleave="isOn=false"
      @click="isPlay=!isPlay">
   <transition name="play_in">
     <div v-show="isOn"
          @mouseover="isOnPlayBtn = true"
          @mouseleave="isOnPlayBtn = false"
          @click.stop.prevent
          class="play_btn"
          :class="[!isPlay?'play':'pause']">
     </div>
   </transition>
   <img class="coverImg"
        loading="lazy"
       :src="coverImg+'?param=40y40'"
        oncontextmenu="return false;"
        ondragstart="return false;"
        alt=""/>
   <div v-if="type==='toplist'" class="ranking">{{ranking+1}}</div>
   <div class="info" >
     <div class="songsname">{{ songname }}</div>
     <div class="singer">{{ singer}}</div>
   </div>
   <div v-if="type==='songs'" class="info" >
     <div class="songsname">{{ info.al.name }}</div>
   </div>
   <div v-if="type==='songs'" class="collection">

   </div>
   <div v-if="type==='songs'" class="time">3:20</div>

   <div v-if="type==='toplist'" class="rankState">
     <img  class="rankinfo" src="" alt="">
   </div>
 </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "musiclittle_item",
  data() {
    return {
      isOn:false,
      isPlay:false,
      currentMusicID:0,
      coverImg:'',
      songname: '',
      singer: ''
    }
  },
  props: {
    info: {
      type: Object,
      default: function () {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    },
    ranking:{
      type:Number,
      default:1
    },
    showAblum:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    switch (this.type) {
      case "songs": {
        console.log(this.info);
        this.songname = this.info.name.trim()
        this.singer = this.info.ar[0].name
        this.coverImg = this.info.al.picUrl
        break;
      }
      case "toplist":{
        this.songname = this.info.name
        this.singer = this.info.ar[0].name
        this.coverImg = this.info.al.picUrl
        break;
      }
    }
  },
  computed:{
    ...mapState({
      playState:state => state.musicplay.isPlay,
      musicID:state => state.musicplay.musicID,
    })
  },
  watch:{
    isPlay:function (state){
      this.handlePlay(state)
    },
    playState:function (newstate){
      // console.log('正在播放状态'+newstate+'当前播放ID'+ this.currentMusicID);
      if(this.isPlay!==newstate && this.currentMusicID===this.info.id){
        this.isPlay = newstate
      }
    },
    musicID:function (currentMusicID){
      this.currentMusicID=currentMusicID
      // console.log('当前ID'+this.currentMusicID);
    }
  },
  methods:{
    handlePlay(state){
      state?this.setPlay():this.setPause();
    },
    setPause(){
      this.$audio.pause()
    },
    setPlay(){
      this.$audio.pause()
      if (this.type==='songs'){
        this.$parent.updatePlaylist()
      }
      this.$audio.setUrl(this.info.id,this.info.al.name,this.info.ar,this.info.al.picUrl)
      setTimeout(() => {
        this.$audio.play()
      }, 100)
    }
  }
}

</script>

<style scoped>
.item_self{
  margin-left: 0px !important;
  /*不被挤压*/
  flex-shrink: 0;
  position: relative;
  border-radius: 5px;
  height: 60px !important;
  width: 100%;
  min-width: 200px;
  display: flex;
  flex-direction: row !important;
  align-items: center;
  transition: 0.3s ;
}
.item_self:hover{
  box-shadow:0 0 10px rgba(80,80,80,.1);
  background-color: rgba(255,255,255,0.6);
  transition: 0.3s ;
}
.ranking{
  font-size: 16pt;
  font-style: italic;
  line-height: 20px ;
  font-weight: bold;
  margin-right: 10px ;
  color: #42b983 ;
  font-family:"Century Gothic";
}
.rankinfo{
  height: 10px;
  width: 10px;
  background-color: #42b983;
  position: absolute;
  right: 15px;
  bottom: 26px;

}
.coverImg{
  padding: 10px;
  height: 40px;
  width: 40px;
  filter:brightness(80%);
}
.info{
  width: 40%;
  text-align: left;
}
.songsname{
  line-height: 20px ;
  font-weight: bolder;
  color: rgb(80,80,80);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.singer{
  font-size: 10pt;
  text-align: left;
  color: rgb(80,80,80);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}
.time{
  position:absolute;
  right: 50px;
  font-size: 12pt;
  color: rgb(80,80,80);
}
.collection{
  position:absolute;
  right: 100px;
  height: 30px;
  width: 30px;
  background-color: #5FDEAD;
}
.play_btn{
  position: absolute;
  left: 24px;
  width: 20px;
  height: 20px;
  transition: .3s;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 1;
}
.play {
  background-image: url("~assets/img/play.svg");
  /*animation: play_btn;
  animation-duration: 0.2s;*/
}
.pause{
  background-image: url("~assets/img/pause.svg");
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
  transform:  scale(.8);
  opacity: .0;

}
</style>
