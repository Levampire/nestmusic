<template>
  <div class="main_page">
    <div CLASS="switchbar">
      <div :class="[currentPage===index+1?'isOnBtn':'switchBtn']"
           v-for="(menuitem,index) in menu"
           @click="switchPage(menuitem,index)">
        {{menuitem}}
      </div>
    </div>
<!--    <div class="tipTok" :style="{left:tipLeft}"></div>-->
    <div class="diskPageCtx" >
      <div class="diskPage musicList" :style="{left:posLeft }">
        <div class="tableTitle" v-if="!musicListData">
          <div style="width:43%"># 标题</div>
          <div style="width:50%">专辑</div>
          <div >操作</div>
        </div>
        <musiclittle_item v-for="(item,index) in musicListData"
                          :info="item"
                          type="diskSongs"
                          :index="index+1"
                          key="item.id"
        ></musiclittle_item>
        <div class="tip" v-if="musicListData"> 您的云盘还没有上传音乐</div>
      </div>
      <div class="diskPage upload " :style="{left:posLeft }">
        <div class="diskCtx" >
          <div class="roundPrograss">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {user_cloud} from "network/cloudDisk";
import musiclittle_item from "items/musiclittle_item";

export default {
  name: "cloudDisk_page",
  components:{musiclittle_item},
  data(){
    return{
      menu:['我的音乐','上传文件'],
      currentPage:1,
      posLeft:'0%',
      tipLeft:'0px',
      musicListData:[],
    }
  },
  created() {
    user_cloud(20,0).then(res=>{
      console.log(res)
      this.musicListData=res.data.data
    })
  },
  methods:{
    switchPage(menuitem,index){
      this.posLeft=-index*100 +'%'
      this.currentPage = index+1
      this.tipLeft = index*90+'px'
    },
    updatePlaylist(){
      const list = []
      this.musicListData.map(item=>{
          list.push(
              {
                name : item.fileName,
                ar : item.simpleSong.ar,
                al: item.simpleSong.al,
                id : item.songId
              }
          )
      })
      this.$audio.setPlaylist(list)
    },
    deleteDiskMusic(){

    }
  },
  mounted() {

  }
}
</script>
<style scoped>
.main_page{
  width: 100%;
  height: 100%;
}
.switchbar{
  padding-left: 15px;
  width: 80vw;
  height: 30px;
  display: flex;
}
.isOnBtn{
  display: flex;
  align-items: end;
  font-size: 18px;
  font-weight: 500;
  width: 80px;
  height: 30px;
  padding:0 5px 0 5px;
  color: var(--Main_blue);
  transition: cubic-bezier(0.4,0.5,0.5,0.6) 0.2s;
}
.switchBtn{
  display: flex;
  align-items: end;
  font-size: 18px;
  font-weight: 500;
  width: 80px;
  height: 30px;
  padding:0 5px 0 5px;
  color: #A7A8B2;
  transition: cubic-bezier(0.4,0.5,0.5,0.6) 0.2s;
}
.tipTok{
  position: relative;
  margin-left: 30px;
  margin-top: 20px;
  left: 0;
  height: 10px;
  width: 10px;
  background-color: var(--Main_blue);
  opacity: .8;
  border-radius: 5px;
  transform: scale(.5);
  transition: cubic-bezier(0.4,0.5,0.5,0.6) 0.3s;
}
.tip{
  color: var(--info_text);
  position: relative;
  top: 40%;
  left: 0;
}

.diskPageCtx{
  position: relative;
  width: 100%;
  min-height: 95%;
  display: flex;
  overflow: hidden;
}
.diskPage{
  display: flex;
  flex-direction: column;
  padding: 0px 10px 0 10px ;
  position: relative;
  flex-shrink:0;
  width: calc(100% - 20px);
  height: 740px;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: cubic-bezier(0.4,0.5,0.6,1.05) 0.4s;
}
.tableTitle{
  width: 100%;
  padding-top:10px ;
  color: #999999;
  display: flex;flex-direction:row;
  text-align: left;
  padding-bottom: 5px;

  position: sticky;
  background-color: #F8F9F9;
  top: 0;
  padding-left: 10px;
  margin: 0 10px 0 0;
  z-index: 15;
}
.musicList{
  /*background-color: #DD4A68;*/
}
.upload{
  /*background-color: #42b983;*/
}
::-webkit-scrollbar{
  display: unset;
}
.diskCtx{
  margin-top: 15px;
  width: 300px;
  height: 300px;
  background-color:#E1F3F2 ;
  border-radius: 20px;
}
</style>
