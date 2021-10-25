<template>
  <div class="item_self" @mouseenter="MouseisOn()" @mouseleave="MouseLeave() ">
    <div class="samllOne">
      <img :src="src"
           oncontextmenu="return false;"
           ondragstart="return false;"
           loading="lazy"
           alt="">
      <img :src="src"
           class="shadowImg"
           oncontextmenu="return false;"
           ondragstart="return false;"
           loading="lazy"
           alt="">
      <div class="squareitem_info" v-if="type!=='search'">
        <label class="samllsongname">{{song}}</label>
        <label class="publishTime">发布于{{publishTime}}</label>
        <label class="size">{{firstone.type}} · {{firstone.size}}首歌</label>
      </div>
    </div>

    <div class="squareitem_info" v-if="type==='search'">
      <label class="songname">{{song}}</label>
      <label class="artist">{{artist}}</label>
    </div>
    <label class="info"
           v-if="type==='search'">
      单曲
    </label>
    <transition name="play_cover">
      <div v-if="isOn" :class="[!isPlay?'play_cover':'pause_cover']"  @click="clickplay()">
      </div>
    </transition>
  </div>
</template>
<script>
import {mapState} from "vuex";
import {timeDateTrans} from 'utils/tools'

export default {
  name: "squarebig_item",
  data(){
    return{
      isOn:false,
      song:'',
      artist:'',
      src:'',
      id:'',
      isPlay:false,
    }
  },
  props:{
    firstone:{
      type:Object,
      default:function (){
        return{}
      }
    },
    type:{
      type:String,
      default:''
    }
  },
  computed:{
    ...mapState({
    playState:state => state.musicplay.isPlay,
    musicID:state => state.musicplay.musicID,

  }),
    publishTime:function(){
      if(this.firstone.publishTime){
        return timeDateTrans(this.firstone.publishTime)
      }
     return ''
    }
},
  methods:{
    MouseisOn(){
      this.isOn = true;
    },
    MouseLeave(){
      if(!this.isPlay){
        this.isOn = false;
      }
    },
    clickplay(){
      this.handlePlay(!this.isPlay)
    },
    handlePlay(state){
      state?this.setPlay(state):this.setPause();
    },
    setPause(){
      this.$audio.pause()
    },
    setPlay : async function(state){
      this.$parent.setPlaylist()
          //更新播放列表
          this.$audio.pause()
          await this.$audio.setUrl(this.firstone.id,this.firstone.name,this.firstone.ar,this.firstone.al.picUrl,this.firstone)
          this.$audio.play()
    }
  },
  watch:{
    firstone:function (newvalue,oldvalue){
      this.song = newvalue?.al?.name||newvalue.name
      this.artist = newvalue?.ar?.[0]?.name||newvalue.artists?.[0].name;
       this.src=  newvalue?.al?.picUrl||newvalue.picUrl;
      // console.log('热搜')
      // console.log(newvalue)
    },
    playState:function (newstate){
      console.log('正在播放状态'+newstate+'当前播放ID'+ this.currentMusicID);
      if(this.isPlay!==newstate && this.currentMusicID===this.firstone.id){
        this.isPlay = newstate
      }
    },
    musicID:function (currentMusicID){
      this.currentMusicID=currentMusicID
      // console.log('当前ID'+this.currentMusicID);
    }
  }
}
</script>

<style scoped>
.item_self{
  position: relative;
  /*不被挤压*/
  flex-shrink: 0;
  padding: 10px 0 10px 0;
  margin-left: 20px;
  width: 440px;
  border-radius: 5px;
  transition: 0.3s ;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}
.item_self:hover{
  background-color:#EAECED;
  transition: 0.3s ;
}
img{
  border-radius: 8px;
  width:130px ;
  height: 130px;
  float: left;
  margin-left: 10px;
}
.samllOne{
  display: flex;
  align-items: center;
}
.shadowImg{
  position: absolute;
  top: 10px;
  left:0 ;
  opacity: .5;
  filter: blur(15px);
  z-index: 1;
  transform: matrix(0.92, 0, 0, 0.96, 0, 0);
}
.songname{
  margin-bottom: 5px;
  display:inline-block;
  width: 100%;
  height: 2rem;
  line-height: 1.5rem;
  color: var(--title_text) ;
  text-align: left;
  max-lines: 1;
  font-weight: 800;
  font-size: 16pt;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.samllsongname{
  font-size: 18px;
}
.publishTime{
  font-size: 15px;
}
.size{
  font-size: 12px;
}
.artist{
  margin-bottom: 10px;
  display:inline-block;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  color: var(--title_text) ;
  text-align: left;
  max-lines: 1;
  font-size: 12pt;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info{
  position: absolute;
  right: 15px;
  top: 10px;
  background-color:rgb(95, 222, 173);
  border-radius: 5px;
  padding: 2px 10px 2px 10px;
  font-weight: bolder;
  font-size: 15pt;
  color: var(--title_text) ;
}
.play_cover{
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100px;
    width: 90px;
    transition: .6s ;
}
.pause_cover{
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100px;
    width: 90px;
    transition: .6s ;
}
.squareitem_info{
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  bottom: 5px;
  height: 70px;
  font-family: Barlow-Medium,"PingFang SC";
}
.play_cover-enter-active {
  transition: all .3s ease;
}

.play_cover-enter-active {
  transition: all .3s ease;
}

.play_cover-leave-active {
  transition: all .4s cubic-bezier(0.4, 0.5, 0.6, 0.9);
}

.play_cover-enter, .play_cover-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */
{
  transform: translateY(15px) ;
  opacity: .0;

}
</style>
