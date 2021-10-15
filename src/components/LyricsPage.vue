<template>
  <div style="position: relative;z-index: 1;overflow: hidden;height: 100vh;box-shadow: 0 0 10px #d9d9d9,0 0 20px #d9d9d9;
  min-height: 100vh;"
  >
    <div class="Lyricspage" :style="{backgroundImage:coverImg}">
    </div>
    <div class="cover_mode" >
      <div class="roll_albums">
        <div class="head">
          <div class="songname">{{songName}}</div>
          <div class="artists">{{artist}}</div>
        </div>
        <canvas class="round" width="1200" height="1000" ref="canvasDisk" >不支持canvas</canvas>
        <canvas class="AudioContext" width="1200" height="1000" ref="canvasAudioContext" >不支持canvas</canvas>
<!--        <comments-->
<!--            :Visible = 'commentsVisible'-->
<!--            :id="currentMusicID"-->
<!--        >-->
<!--        </comments>-->
      </div>
      <div class="lyrics">
        <div class="lyricsCard" v-if="lyrics.length===0">
          <div class="tips">没有歌词</div>
        </div>
        <div class="lyricsCard"
             v-else
             @scroll.stop.prevent ref="lyrCard">
          <div class="stones" ></div>
          <div :ref="'words'+index"
               class="words"
               :key="currentMusicID+index"
               v-for="(words,index) in lyrics"
               :class="[words.startTime<=Time&&Time<=words.endTime-0.1&&index>lastWordsIndex?[style='light',scroll(index,'words'+index)]:style='dark']||style"
               >
            <span>
              {{words.content}}
            </span><br>
            <span >
              {{words.tl}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
import {artist_detail, music_lyrics} from "network/music";
import {analysisLyrics, artistsNameComB, timeTransBack} from "utils/tools";
import comments from "./common/widget/comments";

export default {
name: "LyricsPage",
  components:{
  comments
  },
  data(){
   return{
     lyrics:[],
     tlLyrics:[],
     isPlay:false,
     lyricsTl:true,
     songName:'',
     artist:'',
     coverImg: {},
     currentMusicID:0,
     Time:0,
     MaxTime:0,
     wordsNow:10,
     currentPlaylistID:0,
     CardColor:'',
     commentsVisible:true,
     lastWordsIndex:-1,
     currentWordsIndex:-1,
     timer:setInterval,
   }
  },
  computed:{
    ...mapState({
      playState:state => state.musicplay.isPlay,
      musicID:state => state.musicplay.musicID,
      PlaylistID:state => state.musicplay.PlaylistID,
      musicInfo:state => state.musicplay.musicInfo,
      currentTime:state => state.musicplay.currentTime,
      maxTime:state => state.musicplay.maxTime,
      setAudioCtxData:state => state.other.AudioCtxData
    }),
    shouldScroll:function(){
      return this.$refs.lyrCard.clientHeight/this.lyrics.length
    }
  },
  methods:{
  scroll(index,ref){
    // console.log('in:'+ index)
      this.lastWordsIndex = index-1
      if(this.playState&&index>this.currentWordsIndex){
          const offset =  this.$refs[`${ref}`].clientHeight >90?this.$refs[`${ref}`].clientHeight:0
          this.currentWordsIndex = index
          const proof = this.$refs[`${ref}`].offsetTop - this.$refs.lyrCard.clientHeight/2 -offset
        // console.log(proof)
          if(proof>=0){
            //歌词滚动
            // console.log('scroll:'+ index)
            this.$refs.lyrCard.scrollTop = proof +this.$refs[`${ref}`].clientHeight
          }else {
            this.$refs.lyrCard.scrollTop = 0
          }
      }
  },
  timeTransBack(index){
    return  timeTransBack(index)
  },
  // getColor : function (pic){
  //   return analyze(pic, {ignore: ['rgb（255,255,255）', 'rgb（0,0,0）']}, {scale: .1})
  //   },
  //加载歌词
    loadLyrics(id){
      this.lastWordsIndex = -1;
      music_lyrics(id).then(result=>{
        if(result.data.lrc!==undefined){
          this.lyrics=analysisLyrics(result.data.lrc.lyric)
          if(result.data.tlyric.lyric!==''){this.tlLyrics = analysisLyrics(result.data.tlyric.lyric)}
          this.lyricWithTranslation()

        }else{
          this.lyrics= []
        }
      })
    },
    lyricWithTranslation:function(){
      let lyrics=[]
      if(this.lyrics.length){
        this.lyrics.forEach((words,index)=>{
          const item = {
            startTime:timeTransBack(words.slice(1,words.indexOf(']'))),
            endTime:this.lyrics[index+1]?timeTransBack(this.lyrics[index+1].slice(1,words.indexOf(']'))) : '',
            content: words.slice(words.indexOf(']')+1),
            tl:''
          }
          if(this.tlLyrics!==''&&this.lyricsTl){
            item.tl = this.tlLyrics.filter(tlItem=>{
              return   item.startTime===timeTransBack(tlItem.slice(1,tlItem.indexOf(']')))
            }).toString().slice(words.indexOf(']')+1)
          }
          lyrics.push(item)
      })
      // this.tlLyrics.forEach((words)=>{
      //   const item = {
      //     time:timeTransBack(words.slice(1,words.indexOf(']'))),
      //     content: words.slice(words.indexOf(']')+1)
      //   }
      //   tlLyrics.push(item)
      // })

      this.lyrics=lyrics
      // this.tlLyrics=tlLyrics
    }
    },
    showSpinDisk(){
    const canvas = this.$refs.canvasDisk;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation='source-over'
      // let angle=0
      ctx.beginPath(); /*起始*/
      //ctx.translate(500,500)
      let srcs = [
        require('assets/img/albumBack.png'),
        require('assets/img/vinly.svg'),
        this.musicInfo.PICURL+'?param=400y400',
        require('assets/img/albumCover.svg'),
      ];
      let promiseAll = [], img = [
        'backImage','album','image','coverImage'
      ], imgTotal = srcs.length;
      for(let i = 0 ; i < imgTotal ; i++){
        promiseAll[i] = new Promise((resolve, reject)=>{
          img[i] = new Image()
          img[i].src = srcs[i];
          img[i].onload = function(){
            //第i张加载完成
            resolve(img[i])
          }
        })
      }
      Promise.all(promiseAll).then((img)=>{
        //全部加载完成
        drawAct(img)
      })
      const drawAct =  function (img){
        ctx.clearRect(0,0,1000,1000)
        ctx.drawImage(img[2],575,327,200,200)
        ctx.drawImage(img[1],400,150,550,550)
        ctx.drawImage(img[0],0,150,600,560)
        ctx.drawImage(img[2],60,160,530,540)
        ctx.drawImage(img[3],0,105,660,670)
        }
      //ctx.save()
        // setInterval(function (){
        //   angle=angle+0.08
        //   ctx.clearRect(-200,-200,canvas.width,canvas.height)
        //   ctx.save()
        //   ctx.rotate(angle*Math.PI/180)
        //   drawAct()
        //   ctx.restore()
        // },500/60)
        // ctx.restore()
    },

  },
  watch:{
    playState:function (newstate){
      if(this.isPlay!==newstate && this.currentPlaylistID===this.currentMusicID){
        this.isPlay = newstate
      }
      // if(newstate){
      //   this.timer=setInterval(()=>{
      //     const index = this.lyrics.findIndex(item=> item.startTime<=this.Time&&this.Time<=item.endTime-0.1)
      //     this.scroll(index,'words'+index)
      //   }, 800)
      // }else {
      //   clearInterval(this.timer)
      // }
    },
    musicID:function (currentMusicID){
      this.currentMusicID=currentMusicID
      this.loadLyrics(currentMusicID)
    },
    PlaylistID:function (currentPlaylistID){
      this.currentPlaylistID=currentPlaylistID
    },
    musicInfo:function (newState){
      // console.log(newState.ARTISTS);
      this.songName=newState.NAME
      this.artist = artistsNameComB(newState.ARTISTS)
      // this.getArtistInfo(newState.ARTISTS)
      this.coverImg='url("' + newState.PICURL +'?param=19y10' + '")'
      // this.getColor(this.musicInfo.PICURL,).then(res=>{
      //   this.CardColor =  res[0].color})

      this.showSpinDisk()
    },
    currentTime:function (currentTime,oldtime){
        this.Time = currentTime
        if(currentTime<oldtime){
          this.lastWordsIndex=-1
          this.currentWordsIndex=-1
        }
    },
    maxTime:function (maxTime){
      this.MaxTime = maxTime
    },
    setAudioCtxData:function (newData){
      // console.log(newData)
    }
  },
  created() {
    this.loadLyrics(this.musicID)
  },
  mounted() {
  //初始化数据
    this.songName=this.musicInfo.NAME
    this.artist = artistsNameComB(this.musicInfo.ARTISTS)
    this.coverImg='url("' + this.musicInfo.PICURL +'?param=1920y1080' + '")'
  }
}
// background-image: linear-gradient(to bottom, #F1F4F5, #F4F6F6, #FAFAFA);
</script>
<style scoped>
  .Lyricspage{
    overflow: hidden;
    position: absolute;
    height:calc(100vh + 10px) ;
    width: 100vw;
    background-size: cover;
    filter: blur(50px) brightness(60%) saturate(120%);
    transform: scale(1.3);
    z-index: -1 ;
  }

  .switch{
    height: 50px;
    width: 100%;
    color: white;
    display: flex;
    justify-content: space-evenly;
  }
  .cover_mode{
    z-index:0;
    width: 100vw;
    height: calc(100vh - 80px);
    display: flex;
    }

  .roll_albums{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 1 ;
    width: 53%;
    height: 100%;
  }
  .round {
    margin-top: 30px;
    width: 600px;
    height: 500px;
    background-size: cover;
  }
  .AudioContext{
    position: absolute;
    width: 100vw;
    height: 35vh;
    bottom: 0;
    left: 0;
  }
  .lyrics{
    z-index: 1 ;
    width: 40%;
    height: 100%;
  }
  .stones{
    height: 100px;
    width: 100px;

  }
  .head{
    z-index: 10;
    width: 900px;
    height: 80px;
    margin-top: 30px;
    text-shadow: 0 0 5px rgba(20,20,20,.1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .songname{
    color: white;
    z-index: 11;
    font-size: 24pt;
    font-weight: bolder;
    width: 70%;

  }
  .artists{
    color: rgba(255,255,255,.8);
    z-index: 11;
    margin-top: 10px ;
  }
  .lyricsCard{
    padding: 0 15px 0 15px;
    border-radius:14px ;
    text-align: left;
    z-index: 11;
    width: 112%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
  .words{
    letter-spacing: -1px;
    font-family:circularBold,"Helvetica Neue","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    max-width: 980px;
    z-index:15;
    font-weight: bold;
    border-radius: 10px;
    margin: 10px 0 10px 0;
    padding: 10px;
    overflow: hidden;
    transition: .4s ;
  }
  .words:hover{
    background-color:rgba(220,220,220,.5);
    transition: 0.3s cubic-bezier(.31,.23,0,.68) ;
  }
  .light{
    font-size: 25pt;
    color: white;
    opacity: .9;
    transition: .8s cubic-bezier(.56,.34,.2,.85);
  }
  .dark{

    font-size: 20pt;
    transition: .2s cubic-bezier(.31,.97,.74,.63);
    color: white;
    opacity: .3;
  }
  .tips{
    height: inherit;
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
  }
</style>
