<template>
  <div class="page">
    <div v-if="type!==''" class="headPart">

    </div>
    <div v-else  class="headPart">
      <img  v-show="!isloding"  class="coverimg"
           :src="listData.pic+'?param=200y200'"
           alt=""
           @load="isloding=false"
      >
      <img class="coverimg"  v-show="isloding===true"  src="~assets/img/footer/coverimg.png" alt="">
      <div class="text">
        <div class="type">播放清单</div>
        <div class="tags">
          <div class="tag" v-for="tag in listData.tags">{{tag}}</div>
        </div>
        <div class="title">{{listData.title}}</div>
        <div class="info"> {{ listData.description }} </div>
      </div>
    </div>
    <div class="swatch">
      <div class="list_btn">歌曲</div>
      <div class="comm_btn">评论</div>
    </div>
    <div class="list">
    </div>
    <div class="comm">
    </div>
    <div class="mainpage" style="overflow-y:auto;height: 510px;padding: 0 5px">
      <musiclittle_item v-for="item in listData.list"
                        :info="item"
                        type="songs"
      ></musiclittle_item>
    </div>
  </div>
</template>

<script>
import {playlist_detail} from 'network/music'
import {mapState} from 'vuex'
import Musiclittle_item from "items/musiclittle_item";

export default {
name: "Detial_page",
  components: {Musiclittle_item},
  data(){ return{
    id:Number,
    type:'',
    isloding:true,
    src:require("assets/img/footer/coverimg.png"),
    listData:{
      title:'',
      pic:'',
      tags:[],
      description:'',
      subscribers:'',
      updateTime:Number,
      updateFrequency:'',
      list:[]
    }
  }},
  watch:{
   id:function (newId){
     console.log(newId);
     this.type= this.$route.params.type? this.$route.params.type:'';
     playlist_detail(newId).then(result => {
       console.log(result);
       this.listData.title=result.data.playlist.name
       this.listData.tags=result.data.playlist.tags
       this.listData.pic=result.data.playlist.coverImgUrl
       this.listData.description=result.data.playlist.description
       this.listData.list=result.data.playlist.tracks
       this.listData.subscribers=result.data.playlist.subscribers
       this.listData.updateTime=result.data.playlist.updateTime
       this.listData.updateFrequency=result.data.playlist.updateFrequency
       // this.$audio.pause()
       // this.$audio.setPlaylist(result.data.playlist.tracks,this.info.id)
       // const music = this.$store.getters['musicplay/getMusicList']
       // this.$audio.setUrl(music[0].id,music[0].name,music[0].ar,music[0].al.picUrl)
     }).then(()=>{
       // this.$audio.play()
       // this.isPlay=true
     }).catch(error=>{console.log("歌单详情获取失败"+error);});
   }
  },
  methods:{
    loading(){
      this.isloding = false
    },
    updatePlaylist(){
      this.$audio.setPlaylist(this.listData.list)
    }
  }
  ,
  mounted() {
    this.id = this.$route.params.id;
  }
}
</script>

<style scoped>
.headPart{
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
}
.coverimg{
  flex-shrink: 0;
  margin-left: 25px;
  width: 200px;
  height: 200px;
  border-radius: 8px;
  transition: .5s;

}
.text{
  text-align: left;
  margin-left:25px;
  height: 200px;
  width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  font-family: circularBold;
  overflow: hidden;
  text-overflow: ellipsis;
}
.type{
  position: relative;
  top: 0;
  color: #454F63;
}
.tags{
  margin-top: 5px;
  display: flex;
}
.tag{
  overflow: hidden;
  max-height: 20px;
  min-width: 40px;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 11pt;
  color: var(--title_text);
  margin-right: 10px;
  background-color: #42b983;
  border-radius: 5px;
  line-height: 1.2rem;
  padding: 0 10px 0 10px;
}
.title{
  width: 100%;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -1px;
  margin-top: 5px;
  font-size: 30pt;
  font-weight: 800;
  color: var(--title_text);
  font-family: circularBold;

}
.info{
  width: 100%;
  height: 90px;
  color: #454F63;
  max-lines: 3;
}

.swatch{
  margin-left: 30px;
  width: 180px;
  display: flex;

}
.list_btn,.comm_btn{
  font-family: circularBold;
  color:var(--title_text);
  text-align: center;
  font-size: 14pt;
  width: 90px;
  height: 30px;
  line-height: 30px;
}
</style>
