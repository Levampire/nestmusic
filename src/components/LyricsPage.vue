<template>
  <div class="Lyrics">

  </div>
</template>
<script>
import {mapState} from "vuex";
export default {
name: "LyricsPage",
  computed:{
    ...mapState({
      playState:state => state.musicplay.isPlay,
      musicID:state => state.musicplay.musicID,
      PlaylistID:state => state.musicplay.PlaylistID
    })
  },
  methods:{

  },
  watch:{
    playState:function (newstate){
      if(this.isPlay!==newstate && this.currentPlaylistID===this.info.id){
        this.isPlay = newstate
      }
    },
    musicID:function (currentMusicID){
      this.currentMusicID=currentMusicID
    },
    PlaylistID:function (currentPlaylistID){
      this.currentPlaylistID=currentPlaylistID
    }
  },
}
</script>
<style scoped>
  .Lyrics{
    height: 100vh;
    width: 100vw;
    background-color: #42b983;
  }
</style>
