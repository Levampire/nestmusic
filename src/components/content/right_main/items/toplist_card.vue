<template>
<div class="item_self">
<div class="name">{{ items.name }}</div>
  <div class="item">
    <musiclittle class="songs_item"
                 type="toplist"
                 v-for="(info,index) in list.slice(0,4)"
                 :info="info"
                 :ranking = "index"
    ></musiclittle>
  </div>
</div>
</template>

<script>
import musiclittle from "items/musiclittle_item";
import {playlist_detail} from 'network/music'
export default {
name: "toplist_card",
  components:{
  musiclittle
  },
  data(){
  return{
    playListID:'',
    list:[],
    rank:1
   }
  },
  props:{
    items:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  methods:{
    updatePlaylist(){
      this.$audio.setPlaylist(this.list)
    }
  },
  mounted() {
    playlist_detail(this.items.id).then(result=>{
      this.list = result.data.playlist.tracks
      // console.log(result);
    })
  }
}
</script>

<style scoped>
.item_self{
  display: flex;
  flex-direction: column;
  /*不被挤压*/
  flex-shrink: 0;
  margin-left: 20px;
  padding: 0;
  align-items: center;
  background-color: #42b983;
  background-color: rgba(255,255,255,0.6);
  height: 320px;
  width: 280px;
  border-radius: 5px;
  box-shadow:0 0 5px rgba(80,80,80,.1);
}
.name{
  margin: 10px 0 0 0;
  font-weight: bolder;
  font-size: 15pt;
  color: var(--title_text);
}
.item{
  width: 100%;
  height: 100%;
}
.songs_item{
  margin-top: 10px;
  box-shadow: none;
}
.songs_item:hover{
  box-shadow: none;
  background-color:white;
}
</style>
