<template >

  <div class="cover" v-if="click_login=== true" >
    <login-card :methods_type="enter_type" @close_login="close_login"/>
  </div>
<!--footer-->
  <div class="footer" >
        <footer_cord></footer_cord>
  </div>
  <div class="music">
    <Home class="home">
    </Home>

    <div class="main_page">
<!--登录-->
      <div class="navBar">
        <search class="search"
                v-model="input_search"
                @keydown.enter="search(input_search)"
        >
        </search>
        <div class="LoginBar" v-if="this.$store.getters['user/getloginState']===false">
          <little_btn
              @click="click_login=true;enter_type='login'"
          >登录</little_btn>
          <little_btn
              @click="click_login=true;enter_type='signin'"
          >注册</little_btn>
        </div>
        <div class="LoginBar"  v-else>
            <userinfo class="userInfo"></userinfo>
        </div>
      </div>
<!--main_page-->
        <router-view v-slot="{ Component }">
          <transition :name="transitionName"  >
            <keep-alive>
            <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view >
    </div>
<!--朋友信息-->
    <div class="userFriends">
      <friend></friend>
    </div>
  </div>
<!--  歌词页 -->
  <Lyric></Lyric>
</template>
<style>
/*路由切换*/
.slide_bottom-enter-from,
.slide_top-leave-to{
  transform: translateY(100%);
}
.slide_bottom-enter-active,
.slide_top-leave-active{
  width: calc(100vw - 500px);
  position: absolute;
  transition: all .3s cubic-bezier(0,.5,.5,1);
}
.slide_bottom-enter-to,
.slide_top-leave-from{
  opacity: 1;
}
.home{
  height: 1080px;
  flex-direction: row;
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
import Friend from "components/content/firend_list/firend";
import search_btn from 'widget/search_btn'
import little_btn from 'widget/little_btn'
import login_card from "widget/login_card";
import Footer_cord from "widget/footer_cord";
import {login_status,logout} from "network/login";
import {useStore} from 'vuex'
import userinfo from "widget/user_info";



export default {
  name: 'HomePage',

  components: {
    userinfo,
    Footer_cord,
    Friend:Friend,
    Home: rightPage,
    Lyric:LyricsPage,
    search: search_btn,
    little_btn:little_btn,
    loginCard:login_card,
  },
  data(){
    return{
      enter_type:'login',
      //点击登录按钮
      click_login:false,
      //路由过渡动画
      transitionName:'',
      //搜索输入内容
      input_search:'',
      //路由记录
      oldPath:0
    }
  },
  created() {
    const store = useStore()
    login_status().then(result => {
      if(result.data.data.account !== null){
        console.log('已登录')
        console.log('vuex登录状态：'+store.getters["user/getloginState"]);
        store.commit('user/setUserinfo', result.data.data.profile)
        store.commit('user/setIslogin', true)
      }else{
        // console.log('vuex登录状态：'+this.$store.getters["user/getloginState"]);
        window.localStorage.setItem('userid','')
      }
    }).catch(error=>{
      console.log('登录状态检查错误'+error)
    })
  },

  methods:{
    //关闭登录卡片
      close_login(){
          this.click_login=false
      },
      search(inputvalue){
      if(this.input_search!==''){
        //搜索页面跳转 props传值
        this.$router.push('/Home/search/'+inputvalue)
        this.oldPath ++;
      }
    }
  },
  mounted() {
    //登出

      // logout().then(result => {
      //   console.log('已登出')
      //   console.log(result)
      //    }).catch(error=>{
      //   console.log('登出失败'+error)
      //  })
  },

  watch:{
    input_search:function (newvalue){
      if(newvalue===''){
        console.log(this.oldPath);
        this.$router.go(-this.oldPath)
        this.oldPath = 0
      }
    },
    //路由匹配动画
    '$route' (to, from) {
      if (to.meta.index !== undefined && from.meta.index !== undefined) {
        if(to.meta.index === 7){
          //点击搜索拉起页面
          this.transitionName = 'slide_bottom'
        }else {
          this.transitionName = ''
        }
        if(from.meta.index === 7){
          //退出搜索拉起页面
          this.transitionName = 'slide_top'
        }
      }
    }
  }
}
</script>
