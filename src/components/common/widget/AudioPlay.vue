<template>
 <audio  preload="auto"
         onload="onloading()"
         @timeupdate="getCurrentTime($event)"
        :autoplay="false"
        :src="url"
        ref="audio"
        @error="audioError"
        @loadedmetadata="onloadedmetadata($event)"
        @ended="onended()"
 > </audio>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "AudioPlay",
  data(){
    return{
      url:'',
      Timer:setTimeout,
    }
  },
  computed:{
    ...mapState({
      isPlay:state => state.musicplay.isPlay,
      musicUrl:state => state.musicplay.musicUrl,
      updateProgress:state => state.musicplay.progress,
      updateVolume:state => state.musicplay.volume,
      musicList:state => state.musicplay.musicList,
      currentID:state => state.musicplay.musicID
    })
  },
  watch:{
    isPlay(state){
      this.handlePlay(state)
    },
    updateProgress(progress){
      this.updateTime(progress)
    },
    updateVolume(index){
      this.updatevolume(index)
    },
    musicUrl(index){
      // console.log("新UEL"+OLDVALUE);
       console.log(index);
      this.url = index
    }
},
  methods:{
    handlePlay(state){
      state?this.audioPlay():this.audioPause();
    },
    onloading(){
      this.$msgbox.msgbox('加载中','success')
    },
    audioPlay (){
      console.log('***************播放********************')
      this.$refs.audio.play()
    },
    audioPause(){
      console.log('***************暂停********************')
      this.$refs.audio.pause()
    },
    getCurrentTime(e){
        this.$store.commit('musicplay/setcurrentTime', parseInt(e.target.currentTime))
    },
    updateTime(progress){
      this.$refs.audio.currentTime = progress/100 * this.$refs.audio.duration
    },
    audioError:async function (){
       this.$msgbox.msgbox('资源加载出错',800)
     if(this.musicList.length>2){
       clearInterval(this.Timer)
       this.Timer = setTimeout(async()=>{
         await this.$msgbox.msgbox('切换到下一曲',1000)
         //当前列表项index
         const currentIndex = this.musicList.findIndex(item=>item.id===this.currentID)
         const nextSong =  this.musicList[currentIndex+1]
         this.$audio.pause()
         await this.$audio.setUrl(nextSong.id,nextSong.name,nextSong.ar,nextSong.al.picUrl)
         this.$audio.play()
       },1500)
     }else{
       this.$msgbox.msgbox('播放失败,请重试',1000)
     }
    },
    onloadedmetadata(e){
      this.$store.commit('musicplay/setMaxTime', parseInt(e.target.duration))

    },
    updatevolume(index){
      index=index<0?0:index>1?1:index
      this.$refs.audio.volume = index
    },
    onended(){
      this.$audio.pause()

    }
  },
  mounted() {
    this.url = this.musicUrl
    this.$audio.setVolume(1)
  }
}
</script>

<style scoped>

</style>
