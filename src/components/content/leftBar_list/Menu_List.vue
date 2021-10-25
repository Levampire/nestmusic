
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
      const loginState = window.localStorage.getItem('userid')?(window.localStorage.getItem('userid') !== ''):false
      switch (btn){
        default:{
          this.$router.push('/Home/'+ btn );
          break;
        }
        case 'cloudDisk':{
          if(!loginState){
            this.$msgbox.msgbox('请先登录',200)
          }else {
            this.$router.push('/Home/'+ btn );
          }
          break;
        }
        case'favorite': {
          if(!loginState){
            this.$msgbox.msgbox('请先登录',200)
          }else {
            this.$router.push({
              name: 'playlistDetail',
              params: {
                type:'myList',
                id: window.localStorage.getItem('myMusicList')
              }
            })
          }
          break;
        }
      }

    }
  },
  watch:{
    '$route.path':function (newValue){
      const pattern = {
          'home':RegExp(/home/),
          'library':RegExp(/library/),
          'cloudDisk':RegExp(/cloudDisk/),
          'favorite' :RegExp(/&myList$/),
      }
      for (let key in pattern) {
        const res = pattern[key].test(newValue)
        if(res!==false){
         this.btn_now = key
          return
        }else{
          this.btn_now=''
        }
      }

    }
  },
  mounted() {
    this.btn_now = 'home';
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
