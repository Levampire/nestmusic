<template>
  <div class="mian_page">
    <div CLASS="switchbar">
      <div class="switchBtn" v-for="(menuitem,index) in menu">
        {{menuitem}}
      </div>
    </div>
  </div>

</template>

<script>
import {user_cloud} from "network/cloudDisk";

export default {
  name: "cloudDisk_page",
  data(){
    return{
      menu:{
        myDocument:'我的音乐',
        upload:'上传文件',
      }
    }
  },
  created() {
    user_cloud(20,0).then(res=>{
      console.log(res)
    })
  }
}
</script>
<style scoped>
.main_page{
  width: 100vw;
  height: 100vh;
  background-color: antiquewhite;
}
.switchbar{
  padding-left: 20px;
  width: 80vw;
  height: 40px;
  display: flex;
}
.switchBtn{
  font-size: 14px;
  padding:0 5px 0 5px;
  line-height: 40px;
}
</style>
