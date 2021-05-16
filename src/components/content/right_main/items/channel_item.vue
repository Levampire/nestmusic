<template>
<div class="channel_btn">
  <div class="imgback">
    <img :src="require('assets/img/channel/'+channel[1]+'.svg')" alt="">
  </div>
  <label> {{ channel[0] }} </label>
</div>
</template>
<script>
export default {
name: "channel_item",
  props:{
    img:{
      type:String,
      default:''
    },
    channel:{
      type:Array,
      default:function (){
        return []
      }
    }
  }
}
</script>

<style scoped>
.channel_btn{
  display: flex;
  flex-direction: column;
  align-items: center;
  /*不被挤压*/
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-left: 20px;
  transition: 0.4s ;
}
.channel_btn:hover{
  background-color: white;
  box-shadow:0 0 10px rgba(100,100,100,.1);
  transition: 0.4s ;

}
.imgback{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 80%;
  border-radius: 8px;
  background-color: white ;
}
img{
  height: 60%;
  width: 60%;
}
</style>
