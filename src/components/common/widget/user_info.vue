<template>
  <div style="position: relative">
    <div  v-if="login === true" class="userinfo">
      <img :src="userinfo.avatarUrl" alt="">
      <div class="username">
        {{ userinfo.nickname }}
      </div>
      <div class="arrow"  ></div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
name: "userInfo",
data(){
  return{
    profile:'',//用户头像
    UserName:''
  }
},
computed:{
...mapState({
    userinfo:state => state.user.userinfo,
    login:state => state.user.isLogin
  })
}
}
</script>

<style scoped>
img{
  border-radius: 5px;
  height: 30px;
  width: 30px;
  position: absolute;
  left: 10px;
  top: 10px;
  margin-right: 40px;
}
.username{
  margin-left: 50px;
  font-weight: bolder;
  font-size: 12pt;
  max-width: 160px;
  color: var(--title_text);
}
.userinfo{
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: unset;
  align-items: center;
  background-color: white;
  width: 220px;
  height: 40px;
  margin:5px  0 0;
}
.arrow{
  position: absolute;
  right: 20px;

  width: 20px;
  height: 20px;
  background-color:cadetblue ;
}
</style>
