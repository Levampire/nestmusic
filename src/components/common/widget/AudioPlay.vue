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
      audioCtxTimer:setTimeout,
      analyser:'',
      tempList:[],
      listId:0
    }
  },
  computed:{
    ...mapState({
      isPlay:state => state.musicplay.isPlay,
      musicUrl:state => state.musicplay.musicUrl,
      updateProgress:state => state.musicplay.progress,
      updateVolume:state => state.musicplay.volume,
      musicList:state => state.musicplay.musicList,
      currentID:state => state.musicplay.musicID,
      randomPLay:state => state.musicplay.isRandom,
      RandomList:state => state.musicplay.randomList,
      loop:state => state.musicplay.loopMode
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
      this.url = index
    },
    loop(mode){
      if(mode===1){
        this.$refs.audio.setAttribute('loop','loop')
      }else {
        this.$refs.audio.removeAttribute('loop')
      }

    }

},
  methods:{
    init(){
     let RandomPlay = window.localStorage.getItem('isRandom') !== 'false'
     let loop =Number(window.localStorage.getItem('loopMode'))
     this.$store.commit('musicplay/initPlayMode',[RandomPlay,loop])
    },
    handlePlay(state){
      state?this.audioPlay():this.audioPause();
    },
    onloading(){
      this.$msgbox.msgbox('加载中','success')
    },
    audioPlay (){
     // console.log('***************播放********************')
      this.$refs.audio.play()
     // this.vueXDataSync(this.analyser)
     //  console.log(this.musicUrl)

    },
    audioPause(){
     // console.log('***************暂停********************')
      this.$refs.audio.pause()
    //  clearInterval(this.audioCtxTimer)
    },
    getCurrentTime(e){
        this.$store.commit('musicplay/setcurrentTime', parseInt(e.target.currentTime))
    },
    updateTime(progress){
      this.$refs.audio.currentTime = progress/100 * this.$refs.audio.duration
    },
    audioError:async function (){
     //
     // this.$msgbox.msgbox('资源加载出错',200)
     // if(this.musicList.length>2){
     //   clearInterval(this.Timer)
     //   this.Timer = setTimeout(async()=>{
     //     await this.$msgbox.msgbox('切换到下一曲',1000)
     //     let  tempList;
     //     if(!this.isRandom){
     //       tempList = this.musicList
     //     }else{
     //       tempList = this.RandomList
     //     }
     //     //当前列表项index
     //     const currentIndex = tempList.findIndex(item=>item.id===this.currentID)
     //     let nextSong ;
     //     if(tempList.length>2&& tempList[currentIndex+1]!==undefined){
     //       //当前列表项index
     //       nextSong =  tempList[currentIndex+1]
     //     }else{
     //       nextSong =  tempList[0]
     //     }
     //     this.$audio.pause()
     //     await this.$audio.setUrl(nextSong.id,nextSong.name,nextSong.ar,nextSong.al.picUrl,nextSong)
     //     this.$audio.play()
     //   },1500)
     // }else{
     //   this.$msgbox.msgbox('播放失败,请重试',1000)
     // }
    },
    onloadedmetadata(e){
      this.$store.commit('musicplay/setMaxTime', parseInt(e.target.duration))

    },
    updatevolume(index){
      index=index<0?0:index>1?1:index
      this.$refs.audio.volume = index
    },
    onended(){
      if(this.loop===0){
        this.$audio.pause()
      }
      if( this.randomPLay){
        if(this.loop===2){
          this.NEXT(1,this.musicList,this.currentID)
        }
      }else {
        if(this.loop===2){
          this.NEXT(0,this.musicList,this.currentID)
        }
      }
    },
    NEXT: async function (index,list,currentID){
      await this.$audio.pause()
      if(index===0){//顺序播放下一首
        const currentIndex = await  list.findIndex(item=>item.id===currentID)
        let nextSong = await list.filter(item=>item.playable!==false)[currentIndex+1]
        await this.$audio.setUrl(nextSong.id,nextSong.name,nextSong.ar,nextSong.al.picUrl,nextSong)
      }else {
        this.tempList = this.RandomList.filter(item=> item.id!==currentID)
        let nextSong =  this.tempList.filter(item=>item.playable!==false)[0]
        await this.$audio.setUrl(nextSong.id,nextSong.name,nextSong.ar,nextSong.al.picUrl,nextSong)
      }
       this.$audio.play()
    },
    /*音乐可视化*/
    audioCtxInit(){

      const audioElement = this.$refs.audio
      let audioCtx = new AudioContext()
      let analyser = audioCtx.createAnalyser()
      //得到音源
      let source = audioCtx.createMediaElementSource(audioElement)
      //音源和分析器绑定
      source.connect(analyser)
      analyser.connect(audioCtx.destination)
      // 设置傅里叶变化的参数,用来设置分析范围
      analyser.fftSize = 128

      this.analyser = analyser

    },
    vueXDataSync(analyser){
      //根据范围得到不同音频的数量的长度
      let bufferLength = analyser.frequencyBinCount
      this.audioCtxTimer = setInterval( ()=>{
        //生成8位为一个item,长度为bufferLength的array
        let dataArray = new Uint8Array(bufferLength)
        //  将频率导入到该array
        analyser.getByteFrequencyData(dataArray)
        //this.$store.commit('other/setAudioCtxData',dataArray)
        console.log(dataArray)
      }, 500)
    }
  },
  mounted() {
    this.$audio.setVolume(1)
    //this.audioCtxInit()
    this.init()
    this.url = this.musicUrl
  }
}
</script>

<style scoped>

</style>
