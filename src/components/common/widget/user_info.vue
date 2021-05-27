<template>
  <div style="position: relative"
       @click="showOptions"
       ref="btnpos"
    >
    <div  v-if="login === true" class="userinfo">
      <img :src="userinfo.avatarUrl" alt="">
      <div class="username">
        {{ userinfo.nickname }}
      </div>
      <div class="arrow"  ></div>
    </div>
  </div><transition name="cardenter" >
  <div v-show="isOnbtn" class="opitons" :style="{position:'fixed',height:height, left:pos.x+50+'px',bottom:'85px',overflow:'hidden'}">
    <div class="options">个人中心 </div>
    <div class="options"> 账号设置</div>
    <div class="options" @click="logOut">登出</div>
  </div> </transition>
</template>

<script>
import {mapState} from "vuex";
import {logout} from "network/login";

export default {
name: "userInfo",
data(){
  return{
    isOnbtn:false,
    height:10+'px',
    pos:{},
    profile:'',//用户头像
    UserName:''
  }
},
computed:{
...mapState({
    userinfo:state => state.user.userinfo,
    login:state => state.user.isLogin
  })
},
  methods:{
    logOut(){
      logout()
    },
    showOptions(){
      this.isOnbtn=!this.isOnbtn
      this.pos=this.$refs.btnpos.getBoundingClientRect()
      if(!this.isOnbtn){setTimeout(()=>{
        this.height=0+'px'
      },1)}
      else {
        setTimeout(()=>{
          this.height=150+'px'
        },1)
      }
    }
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
.options{
  font-weight: bold;
  font-size: 10pt;
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
.opitons{
  position: fixed;
  top: 55px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 120px;
  z-index:998!important;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(80, 80, 80, 0.1);
}
.cardenter-enter-active ,.cardenter-leave-active {
  transition: all .2s cubic-bezier(0.4,0.5,0.6,0.9);
}
.cardenter-enter-from, .cardenter-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transition: .2s cubic-bezier(0.4,0.5,0.6,0.9);
}
</style>
