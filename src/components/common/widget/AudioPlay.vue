<template>
 <audio  preload="auto"
         @timeupdate="getCurrentTime($event)"
        :autoplay="false"
        :src="url"
        ref="audio"
        @error="audioError"
        @loadedmetadata="onloadedmetadata($event)"
 > </audio>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "AudioPlay",
  data(){
    return{
      url:''
    }
  },
  computed:{
    ...mapState({
      isPlay:state => state.musicplay.isPlay,
      musicUrl:state => state.musicplay.musicUrl,
      updateProgress:state => state.musicplay.progress,
      updateVolume:state => state.musicplay.volume
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
      console.log("新UEL");
      console.log(index);
      this.url = index
    }
},
  methods:{
    handlePlay(state){
      state?this.audioPlay():this.audioPause();
    },
    audioPlay(){
      this.$refs.audio.play()
      console.log(this.$refs.audio.src);
    },
    audioPause(){
      this.$refs.audio.pause()
    },
    getCurrentTime(e){
        this.$store.commit('musicplay/setcurrentTime', parseInt(e.target.currentTime))
    },
    updateTime(progress){
      this.$refs.audio.currentTime = progress/100 * this.$refs.audio.duration
    },
    audioError(){
      console.log('资源加载出错')
    },
    onloadedmetadata(e){
      this.$store.commit('musicplay/setMaxTime', parseInt(e.target.duration))

    },
    updatevolume(index){
      index=index<0?0:index>1?1:index
      this.$refs.audio.volume = index}
  },
  mounted() {
    this.$audio.setVolume(1)
  }
}
</script>

<style scoped>

</style>
