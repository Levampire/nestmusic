<template>
  <div class="main_page">
    <div class="upload_head">
      <div class="storage">
        <canvas height="400" width="400" class="storageCanvas" ref="storageCanvas">
            不支持canvas的浏览器
        </canvas>
        <div class="storageInfo">
          <div class="cardTitle"> 云盘空间 </div>
          <div><div class="number">{{(size/1073741824).toFixed(2)}}Gb</div>
            <div class="type">已使用</div>
          </div>
          <div>
            <div class="number">{{ ((maxSize-size)/1073741824).toFixed(2)}}Gb</div>
            <div class="type">未使用</div>
          </div>
          <div>
            <div class="number">{{Math.floor(maxSize/1073741824)}}Gb</div>
            <div class="type">总容量</div>
          </div>
        </div>
      </div>
      <div class="chooseFile">
        <div class="cardTitle"> 选择音乐文件 </div>
        <div  class="ctx">
          <div class="dropArea" @click="clickUpload()">
            <div class="uploadImg">
              <div class="Bside"></div>
              <div class="Aside"></div>
            </div>
            <div>拖入文件或者点击选择您的文件</div>
          </div>
          <div class="uploadList" v-if="uploadList.length!==0"></div>
        </div>

      </div>
    </div>
<!--    <div class="tipTok" :style="{left:tipLeft}"></div>-->
    <div style='width: fit-content; margin-left: 20px' class="title">我的音乐</div>
    <div class="diskPageCtx" >

      <div class="diskPage musicList" :style="{left:posLeft }">
        <div class="tableTitle" v-if="!musicListData.length!==0">
          <div style="width:40%"> 标题</div>
          <div style="width:50%">专辑</div>
          <div >操作</div>
        </div>
        <musiclittle_item v-for="(item,index) in musicListData"
                          :info="item"
                          type="diskSongs"
                          :index="index+1"
                          :key="item.id"
        ></musiclittle_item>
        <div class="tip" v-if="musicListData.length===0"> 您的云盘还没有上传音乐</div>
      </div>
    </div>
  </div>
  <input type="file" ref="fileUploadBtn" @change="fileSelected()" accept=".mp3,.aac,.wma,.wav,.ogg,.m4a,.ape,.flac,.cue)"/>
</template>
<script>
import {user_cloud} from "network/cloudDisk";
import musiclittle_item from "items/musiclittle_item";

export default {
  name: "cloudDisk_page",
  components:{musiclittle_item},
  data(){
    return{
      musicListData:[],
      maxSize:0,
      size:0,
      uploadList:[]
    }
  },
  created() {
    user_cloud(20,0).then(res=>{
      this.musicListData=res.data.data
      this.maxSize = res.data.maxSize
      this.size = res.data.size
    }).then(()=>{
      this.showStorage()
    })
  },
  methods:{
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

    },
    showStorage(){
      const precent  = this.size/this.maxSize
      const storageCanvas = this.$refs.storageCanvas;
      const ctx = storageCanvas.getContext('2d')
      ctx.radius = 100;    // 圆环半径
      ctx.lineWidth = 35;  // 圆环边的宽度
      ctx.strokeStyle = '#D4DBFF' ; //边的颜色
      ctx.font = '40px KlavikaMedium-Italic'
      const text = precent<1?'1':precent.toFixed(0)
      ctx.fillStyle = '#5773FF'
      ctx.fillText(text+'%',180,220)

      ctx.lineCap = 'round';
      ctx.beginPath()
      ctx.arc(200,200,140,0,360/Math.PI)
      ctx.closePath()
      ctx.stroke()

      ctx.strokeStyle='#5773FF'
      ctx.beginPath()
      ctx.arc(200,200,140,0,2*Math.PI*precent)
      ctx.stroke()

    },
    clickUpload(){
      this.$refs.fileUploadBtn.click()
    },
    fileSelected(){
      let currentIndex = 0
      for(const item of this.$refs.fileUploadBtn.files){
          this.upload(item,currentIndex)
          currentIndex++
      }
    },
    upload(file,index){
      let formData = new FormData()
      formData.append('songFile', file)
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
  background-color: #F8F9F9;
  margin: 0 10px 0 60px;
  z-index: 15;
}
.musicList{
  height: 480px;
}
.upload{
  /*background-color: #42b983;*/
}
.upload_head{
  width: 1300px;
  height: 300px;
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  align-items: center;
}
.chooseFile,.storage,.uploadInfo{
  height: 250px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}
.chooseFile{
  width: 68%;
}
.storage{
  width: 30%;
}
.storageCanvas{
  width: 200px;
  height: 200px;
  position: relative;
  border-radius: 10px;
  margin-left: 20px;
}
.storageInfo{
  width: 200px;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-between ;
}
.uploadInfo{
  width: 40%;
}
.ctx{
  width: 100%;
  height: 190px;
  margin: 20px 20px 0 20px;
  display: flex;
  color: var(--info_text);
}
.dropArea{
  height: 100%;
  overflow: hidden;
  flex: 1;
  background-color: var(--btn_back_light);
  border: 2px var(--Main_blue);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.uploadList{
  margin-left: 20px;
  height: 180px;
  width: 500px;
  float:right
}
.steppStone{
  width: 100px;
  height: 200px!important;
}
::-webkit-scrollbar{
  display: unset;
}
.number{
 color: var(--Main_blue);
  font-size: 18px;
  font-family: KlavikaMedium-Italic;
}
.type{
 font-size: 12px;
  color: var(--info_text);
}
.title,.cardTitle{
  color: var(--title_text);
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  opacity: .9;
}
.uploadImg{
  position: relative;
  width: 40px;
  height: 40px ;
}
.Bside{
  position: absolute;
  background: no-repeat url("~assets/img/Bside.svg");
  height: inherit;
  width: inherit;
}
.Aside{
  position: absolute;
  bottom: 4px;
  left: 2px;
  background: no-repeat url("~assets/img/Aside.svg");
  height: 25px;
  width: 38px;
}
.cardTitle{
  position: absolute;
  top: 10px;
  left: 0;
}
</style>
