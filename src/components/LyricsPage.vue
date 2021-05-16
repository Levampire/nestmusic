<template>
  <div class="Lyrics"
   :style="{backgroundImage:back_img}">
  </div>
</template>
<script>
import {mapState} from "vuex";
import {music_lyrics,artist_detail} from "network/music";
import {analysisLyrics} from "utils/tools";
export default {
name: "LyricsPage",
  data(){
   return{
     lyrics:'',
     isPlay:false,
     currentMusicID:0,
     currentPlaylistID:0,
     backImg:[]
   }
  },
  computed:{
    ...mapState({
      playState:state => state.musicplay.isPlay,
      musicID:state => state.musicplay.musicID,
      PlaylistID:state => state.musicplay.PlaylistID,
      musicInfo:state => state.musicplay.musicInfo,
    })
  },
  methods:{
  getArtistInfo(artists){
    artists.forEach( (value,key)=>{
          artist_detail(value.id).then(result=>{
            console.log('图片消息');
            console.log(result);
            this.backImg = result
          })
        }
    )

  },
  //加载歌词
    loadLyrics(id){
      music_lyrics(id).then(result=>{
        this.lyrics=analysisLyrics(result.data.lrc.lyric)
        console.log(this.lyrics[0].slice(1,6))
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
      console.log(newState.ARTISTS);
      this.songName=newState.NAME
      this.artist = newState.ARTISTS
      this.getArtistInfo(newState.ARTISTS)

    }
  },
}
</script>
<style scoped>
  .Lyrics{
    height: 100vh;
    width: 100vw;
    background-color: white;
  }
</style>
