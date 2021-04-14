
<template>
<div class="back">
  <div class="sidebar_title">
    Menu
  </div>
  <div class="sideBar_btn " :class="[btn_now =='btn_home'?active:before]" @click="sideBar_btn('btn_home')" >首页</div>
  <div class="sideBar_btn" :class="[btn_now =='btn_search'?active:before]" @click="sideBar_btn('btn_search')">乐库</div>
  <div class="sideBar_btn" :class="[btn_now =='btn_Disk'?active:before]" @click="sideBar_btn('btn_Disk')">云盘</div>
  <div class="sideBar_btn" :class="[btn_now =='btn_favorite'?active:before]" @click="sideBar_btn('btn_favorite') ">我的喜欢</div>
</div>
</template>
<script>
export default {
  name: "MenuList",
  data(){
    return{
      btn_now : false,
      active: 'sideBar_btn_AfterClick',
      before: 'sideBar_btn_beforeClick',
    }
  },
  methods:{
    //样式转变
    // toggle_btn(btn){
    //   // btn.attr("class","sideBar_btn_AfterClick");
    // },
    sideBar_btn(btn){
      this.btn_now = btn;
    }
  }
}
</script>

<style scoped>
.back{
  height: 26vh;
}
</style>
