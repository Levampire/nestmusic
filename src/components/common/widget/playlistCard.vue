<template>
  <div class="card" @scroll.stop.prevent>
    <div class="title">播放列表</div>
    <div style="overflow-y:auto;height: 95% ">
      <div class="item"
           v-for="item in currentPlaylist"
           @click="setPlay(item)"
      >
        <text>{{ item.name }}</text>
        <br>
        <text class="artist">{{ artistsName(item.ar)}}</text>
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
      console.log(value);
    }
  },
  methods: {
    artistsName(array) {
      return artistsNameComB(array)
    },
    setPlay(item) {
      console.log(item);
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
  box-shadow: 0 0 10px rgba(80, 80, 80, 0.4);
  z-index: 950;
  font-family: circularBold, "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--title_text);
  font-weight: bold;
  text-align: left;
  font-size: 12pt;
  height: 50px;
}

.title {
  font-weight: bold;
  font-size: 15pt;
  color: var(--title_text);
  margin-bottom: 10px;

}
.artist{
  font-size: 10pt;
  font-weight: normal;
  font-family: circularnormal;
  color: rgba(80,80,80);
}
</style>