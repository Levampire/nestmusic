<template>
  <div style="position: relative">
    <div class="switch">
      <div class="mode">歌词</div>
      <div class="mode">评论</div>
    </div>
    <div class="Lyricspage" :style="{backgroundImage:coverImg}">
    </div>
    <div class="cover_mode" >
      <div class="roll_albums">
        <div class="head">
          <div class="songname">{{songName}}</div>
          <div class="artists">{{artist}}</div>
        </div>
        <div class="round" :style="{backgroundImage:coverImg}"></div>
      </div>
      <div class="lyrics">
        <div class="lyricsCard"

             @scroll.stop.prevent ref="lyrCard">
          <div class="title" >歌词</div>
          <div ref="words"
               class="words"
               v-for="(words,index) in lyrics"
               :key="index"
               :class="[timeTransBack(words.slice(1,indexOfTime-1))<Time?[style='light',scroll(index)]:style='dark']||style">
                {{words.slice(indexOfTime)}}
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
import analyze from 'rgbaster'

export default {
name: "LyricsPage",
  data(){
   return{
     indexOfTime:0,
     lyrics:[],
     isPlay:false,
     songName:'',
     artist:'',
     coverImg: {},
     currentMusicID:0,
     Time:0,
     MaxTime:0,
     wordsNow:10,
     currentPlaylistID:0,
     CardColor:''
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
    }),
    shouldScroll:function(){
      return this.$refs.lyrCard.clientHeight/this.lyrics.length
    }
  },
  methods:{
  scroll(index){
    if(index>this.wordsNow){
      //歌词滚动
      this.$refs.lyrCard.scrollTop = 40*index-this.wordsNow-280
      if(index>this.wordsNow){this.wordsNow = index}
      if(this.wordsNow===10){
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
      music_lyrics(id).then(result=>{
        this.lyrics=analysisLyrics(result.data.lrc.lyric)
        this.indexOfTime=this.lyrics[0].indexOf(']')+1
      })
    }
  },
  watch:{
    playState:function (newstate){
      if(this.isPlay!==newstate && this.currentPlaylistID===this.currentMusicID){
        this.isPlay = newstate
      }
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
      this.coverImg='url("' + newState.PICURL + '")'
      // this.getColor(this.musicInfo.PICURL,).then(res=>{
      //   this.CardColor =  res[0].color})
    },
    currentTime:function (currentTime){
      this.Time = currentTime
      // console.log(currentTime/this.maxTime);
    },
    maxTime:function (maxTime){
      this.MaxTime = maxTime
    }
  },
  mounted() {
  //初始化数据
    this.songName=this.musicInfo.NAME
    this.artist = artistsNameComB(this.musicInfo.ARTISTS)
    this.coverImg='url("' + this.musicInfo.PICURL + '")'
    this.loadLyrics(this.musicID)
    // this.getColor(this.musicInfo.PICURL).then(res=>{
    //  this.CardColor =  res[0].color})

  }
}
// background-image: linear-gradient(to bottom, #F1F4F5, #F4F6F6, #FAFAFA);
</script>
<style scoped>
  .Lyricspage{
    overflow: hidden;
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-size: cover;
    filter: blur(25px) brightness(70%);
    z-index: -1 ;
  }

  .switch{
    color: white;
    position: absolute;
    top: 40px;
    left: 445px;
    display: flex;
    justify-content: space-evenly;
    width: 160px;
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
    width: 60%;
    height: 100%;
  }
  .round {
    margin-top: 150px;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    background-size: cover;
    box-shadow: 0 0 5px rgba(20,20,20,.1);
  }
  .lyrics{
    z-index: 1 ;
    width: 40%;
    height: 100%;
  }
  .title{
    font-weight: bold;
    font-size: 15pt;
    margin-top: 10px;
    color:var(--title_text)

  }
  .head{
    z-index: 10;
    width: 900px;
    height: 80px;
    margin-top: 90px;
    text-shadow: 0 0 5px rgba(20,20,20,.1);
  }
  .songname{
    color: white;
    z-index: 11;
    font-size: 24pt;
    font-weight: bolder;

  }
  .artists{
    color: rgba(255,255,255,.8);
    z-index: 11;
    margin-top: 10px ;
  }
  .lyricsCard{
    padding: 0 15px 0 15px;
    border-radius:14px ;
    margin-top: 20px;
    text-align: left;
    z-index: 11;
    width: 94%;
    height: 740px;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    box-shadow: 0 0 10px rgba(20,20,20,.1);
  }
  .words{
    letter-spacing: -1px;
    font-family:circularBold,"Helvetica Neue","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    max-width: 680px;
    z-index:15;
    line-height: 1.8rem;
    font-size: 20pt;
    font-weight: bold;
    margin: 10px 0 10px 0;
  }
  .light{
    transition: .4s;
    color: white;
  }
  .dark{
    transition: .4s;
    color: var(--title_text)
  }
</style>
