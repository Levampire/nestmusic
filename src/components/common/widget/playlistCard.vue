<template>
  <div class="card" @scroll.stop.prevent>
    <div class="cardtitle">播放列表</div>
    <div style="overflow-y:auto;height: 92% ">
      <div class="item"
           v-for="item in currentPlaylist"
           @click="setPlay(item)"
      >
        <img class="songImg"
             loading="lazy"
             :src="item.al?.picUrl||item.album?.picUrl||''+'?param=30y30'"
             oncontextmenu="return false;"
             ondragstart="return false;"
             alt=""/>
        <div class="info">
          <div class="songName">{{ item.name }}</div>
          <div class="artist">{{ artistsName(item.ar||item.artists)}}</div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import {mapState} from "vuex";
import {artistsNameComB} from "utils/tools"

export default {
  name: "playlistCard",
  computed: {
    ...mapState({
      currentPlaylist: state => state.musicplay.musicList
    })
  },
  watch: {
    currentPlaylist: function (value) {
      // console.log(value);
    }
  },
  methods: {
    artistsName(array) {
      return artistsNameComB(array)
    },
    setPlay(item) {
      this.$audio.pause()
      this.$audio.setUrl(item.id,item.al.name,item.ar,item.al.picUrl)
      setTimeout(() => {
        this.$audio.play()
      }, 100)
    }
  }
}
</script>

<style scoped>
.card {
  padding: 10px 15px;
  height: 450px;
  width: 350px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(80, 80, 80, 0.2);
  z-index: 950;
  font-family: var(--VamFont);
  scroll-behavior: smooth;
}
.songImg{
  height: 40px;
  width: 40px;
  border-radius: 5px;
  margin-right: 5px;
}
.item {
  padding: 10px;
  white-space: nowrap;
  color: var(--title_text);
  font-weight: bold;
  text-align: left;
  font-size: 12pt;
  display: flex;
  border-radius: 10px;

}
.item:hover{
  background-color:#EAECED;
  transition: .4s;
}
.cardtitle {
  width: 100px;
  font-size: 14pt;
  color: var(--title_text);
  margin-bottom: 10px;
  font-family: "PingFang SC";

}
.songName{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.artist{
  font-size: 10pt;
  font-weight: normal;
  font-family: var(--VamFont);
  color: rgb(80,80,80);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info{
  width: 85%;
}
::-webkit-scrollbar{
  display: unset;
}
</style>
