
<template>
<div class="back">
  <div class="sidebar_title">
    Menu
  </div>

  <div class="sideBar_btn" :class="[btn_now === 'home'?active:before]" @click="sideBar_btn('home')" >首页</div>
  <div class="sideBar_btn" :class="[btn_now === 'library'?active:before]" @click="sideBar_btn('library')">乐库</div>
  <div class="sideBar_btn" :class="[btn_now === 'cloudDisk'?active:before]" @click="sideBar_btn('cloudDisk')">云盘</div>
  <div class="sideBar_btn" :class="[btn_now === 'favorite'?active:before]" @click="sideBar_btn('favorite') ">我的喜欢</div>
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
            name:'playlistDetail',
            params:{
              id:'0000',
              type:'myList'
            }
          });
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
</style>
