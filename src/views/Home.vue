<template>
  <div class="cover" v-if="click_login=== true" >
    <login-card :methods_type="enter_type"/>
  </div>
  <div class="footer" >
  </div>
  <div class="music">
    <Home class="home">
    </Home>
<!--  //Main页面-->
    <div class="main_page">
<!--登录-->
      <div class="navBar">
        <search class="search"></search>
        <div class="LoginBar">
          <signin></signin>
          <login
          @click="click_login=true"></login>
        </div>
      </div>
<!--  main_page-->
      <router-view id="main_page"   />
    </div>
    <div class="userFriends">
      <friend></friend>
    </div>
  </div>
<!--  歌词页 -->
  <Lyric></Lyric>
</template>
<style>
.home{
  height: 1080px;
  flex-direction: row;
}
body{
  padding: 0;margin: 0;
}

.music{
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
}

</style>
<script>
// @ is an alias to /src
import rightPage from 'layout/vam-container'
import LyricsPage from 'components/LyricsPage'
import search_btn from 'widget/search_btn'
import login_btn from 'widget/login_btn'
import Friend from "components/content/firend_list/firend";
import signin_btn from "widget/signin_btn";
import login_card from "widget/login_card";


export default {
  name: 'HomePage',

  components: {
    Friend:Friend,
    Home: rightPage,
    Lyric:LyricsPage,
    search: search_btn,
    login:login_btn,
    signin:signin_btn,
    loginCard:login_card,

  },
  data(){
    return{
      enter_type:'login',
      //点击登录按钮
      click_login:false
    }
  },

  methods:{
      close_login(e){
        console.log(e)
        if(e===false){
          this.click_login=false
        }
      }

  },
  mounted() {


  }
}
</script>
