<template>
 <div class="item_self">
   <img class="coverImg"
        loading="lazy"
       :src="coverImg+'?param=40y40'"
        oncontextmenu="return false;"
        ondragstart="return false;"
        alt=""/>
   <div class="ranking">{{ranking+1}}</div>
   <div class="info">
     <div class="songsname">{{ songname }}</div>
     <div class="singer">{{ singer}}</div>
   </div>
   <div v-if="type==='song'" class="time">3:20</div>
   <div v-if="type==='toplist'" class="rankState">
     <img  class="rankinfo" src="" alt="">
   </div>
 </div>
</template>

<script>
export default {
  name: "musiclittle_item",
  data() {
    return {
      coverImg:'',
      songname: '',
      singer: ''
    }
  },
  props: {
    info: {
      type: Object,
      default: function () {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    },
    ranking:{
      type:Number,
      default:1
    }
  },
  mounted() {
    switch (this.type) {
      case "songs": {
        this.songname = this.info.al.name.trim()
        this.singer = this.info.ar[0].name
        this.coverImg = this.info.al.picUrl
        break;
      }
      case "toplist":{
        this.songname = this.info.name
        this.singer = this.info.ar[0].name
        this.coverImg = this.info.al.picUrl
        break;
      }
    }
  }
}

</script>

<style scoped>
.item_self{
  margin-left: 0px !important;
  /*不被挤压*/
  flex-shrink: 0;
  position: relative;
  border-radius: 5px;
  height: 60px !important;
  width: 100%;
  display: flex;
  flex-direction: row !important;
  align-items: center;
  transition: 0.3s ;
}
.item_self:hover{
  box-shadow:0 0 10px rgba(80,80,80,.1);
  background-color: rgba(255,255,255,0.6);
  transition: 0.3s ;
}
.ranking{
  font-size: 16pt;
  font-style: italic;
  line-height: 20px ;
  font-weight: bold;
  margin-right: 10px ;
  color: #42b983 ;
  font-family:"Century Gothic";
}
.rankinfo{
  height: 10px;
  width: 10px;
  background-color: #42b983;
  position: absolute;
  right: 15px;
  bottom: 26px;

}
.coverImg{
  padding: 10px;
  height: 40px;
  width: 40px;
}
.info{
  width: 60%;
  text-align: left;
}
.songsname{
  line-height: 20px ;
  font-weight: bolder;
  color: rgb(80,80,80);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.singer{
  font-size: 10pt;
  text-align: left;
  color: rgb(80,80,80);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}
.time{
  position:absolute;
  right: 50px;
  font-size: 12pt;
  color: rgb(80,80,80);
}
</style>
