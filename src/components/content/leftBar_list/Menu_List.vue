
<template>
<div class="back">
  <div class="sidebar_title">
    Menu
  </div>
  <div class="sideBar_btn" :class="[btn_now === 'home'?active:before]" @click="sideBar_btn('home')" >
    <div class="iconfont Player-icon-home_nol"></div>
    首页</div>
  <div class="sideBar_btn" :class="[btn_now === 'library'?active:before]" @click="sideBar_btn('library')">
    <div class="iconfont Player-icon-a-personalinformation"></div>
    乐库</div>
  <div class="sideBar_btn" :class="[btn_now === 'cloudDisk'?active:before]" @click="sideBar_btn('cloudDisk')">
    <div class="iconfont Player-icon-a-untiegps"></div>
    云盘</div>
  <div class="sideBar_btn" :class="[btn_now === 'favorite'?active:before]" @click="sideBar_btn('favorite') ">
    <div class="iconfont Player-icon-collect"></div>
    我的喜欢</div>
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
    //点击按钮切换Main页面
    sideBar_btn(btn){
      this.btn_now = btn;
      switch (btn){
        default:{
          this.$router.push('/Home/'+ btn );
          break;
        }
        case'favorite': {
          this.$router.push({
            name: 'playlistDetail',
            params: {
              type:'myList',
              id: window.localStorage.getItem('myMusicList')
            }
          })
        }
      }

    }
  },
  watch:{
    '$route.path':function (newValue){
      this.btn_now = newValue.substring(6);
    }
  },
  mounted() {
    this.sideBar_btn('home');
  }
}
</script>

<style scoped>
.back{
  display: flex;
  flex-direction: column;
  height: 220px;
}
.iconfont{
  margin-right: 8px;
  font-size: 18px!important;
}
.Player-icon-collect{
  font-size: 14px!important;
}
</style>
