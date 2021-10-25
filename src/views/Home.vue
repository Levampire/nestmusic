<template>
  <div class="cover" v-if="click_login=== true">
    <login-card :methods_type="enter_type" @close_login="close_login"/>
  </div>
  <!--footer-->
  <div class="footer">
    <footer_cord></footer_cord>
  </div>
  <div class="music">
    <Home class="home">
    </Home>
    <div class="main_page">
      <!--登录-->
      <div class="navBar"
           v-if="this.$route.name!=='detail'">
        <search class="search"
                v-model="input_search"
                @keydown.enter="search(input_search)" >
        </search>
        <div v-if="isShow" class="mainPageTitle" :class="{opacity:opacity}">{{tittle}}</div>
        <div class="stepStone"></div>
        <div class="LoginBar" v-if="islogin === false">
          <little_btn
              @click="click_login=true;enter_type='login'"
          >登录
          </little_btn>
          <little_btn
              @click="click_login=true;enter_type='signin'"
          >注册
          </little_btn>
        </div>
        <div class="LoginBar" v-if="islogin === true">
          <userinfo ></userinfo>
        </div>
      </div>
      <!--main_page-->
      <router-view v-if="this.$route.meta.index!==0" v-slot="{ Component }" :key="$route.fullPath">
        <keep-alive include="playlistDetail">
        <transition :name="transitionName">
            <component :is="Component"/>
        </transition>
      </keep-alive>
      </router-view>

      <router-view v-if="this.$route.meta.index===0" v-slot="{ Component }" :key="$route.fullPath">
        <keep-alive include="playlistDetail">
        <transition :name="transitionName">
          <component :is="Component"/>
        </transition>
          </keep-alive>
      </router-view>
    </div>
    <!--朋友信息-->
    <transition >
      <div class="userFriends" v-if="islogin ===true && showFriends" >
        <friend></friend>
      </div>
    </transition>
  </div>
  <!--  歌词页 -->
  <Lyric></Lyric>
</template>

<script>
// @ is an alias to /src
import rightPage from 'layout/vam-container'
import LyricsPage from 'components/LyricsPage'
import Friend from "components/content/firend_list/firend";
import search_btn from 'widget/search_btn'
import little_btn from 'widget/little_btn'
import login_card from "widget/login_card";
import Footer_cord from "widget/footer_cord";
import {useStore,mapState} from 'vuex'
import userinfo from "widget/user_info";
import {playlist_detail} from "network/music";
import {new_songs} from "network/home_page";
import {song_detail} from "network/music";

export default {
  name: 'HomePage',
  components: {
    userinfo,
    Footer_cord,
    Friend: Friend,
    Home: rightPage,
    Lyric: LyricsPage,
    search: search_btn,
    little_btn: little_btn,
    loginCard: login_card,
  },
  data() {
    return {
      islogin:false,
      enter_type: 'login',
      //点击登录按钮
      click_login: false,
      //路由过渡动画
      transitionName: '',
      //搜索输入内容
      input_search: '',
      //路由记录
      oldPath: [],
      //标题
      tittle:'',
      //主页面滚动变化
      MainPageScrollChange:{},
      opacity: 0,
      isShow:false,
    }
  },
  computed:{
    ...mapState({
       LoginState: state => state.user.isLogin,
       Tittle:state => state.other.Tittle,
       MainPageScrollInfo: state => state.other.MainPageScrollInfo,
      showFriends:state => state.other.showFriends,
    })
  },
  created() {
    // login_status().then(result => {
    //   console.log(result)
    //   if (result.data.data.account !== null) {
    //     window.localStorage.setItem('userid',result.data.profile.userId)
    //     window.localStorage.setItem('userinfo',JSON.stringify(result.data.profile))
    //   } else {
    //     // console.log('vuex登录状态：'+this.$store.getters["user/getloginState"]);
    //     window.localStorage.setItem('userid', '')
    //     window.localStorage.setItem('userinfo', '')
    //   }
    // }).catch(error => {
    //   console.log('登录状态检查错误' + error)
    // })
    // let myList = window.localStorage.getItem('myMusicList');
    // if(this.LoginState&&myList.length>0){
    //   console.log(myList)
    //   this.loadLovedSongs(myList)
    // } else {

      new_songs(0).then(result=>{
        const song   = result.data.data[0];
        this.setList(song.id)
       this.$audio.setUrl(song.id,song.name,song.artists,song.album.picUrl,song)
      }).catch(error=>{ console.log('新歌速递数据获取失败'+error);})
    //
    // }


  },
  methods: {
    //关闭登录卡片
    close_login() {
      this.click_login = false
    },
    search(inputvalue) {
      if (this.input_search !== '') {
        //搜索页面跳转 props传值
        this.$router.push('/Home/search/' + inputvalue)
      }
    },
    showTittle(){
      const path = ["playlistDetail"]
      const scroll = this.MainPageScrollChange
      let scrollOffset = scroll.scrollTop-scroll.tittleTop;
      if(path.indexOf(this.$route.name)!==-1) {

        if (scroll.scrollTop<80){this.isShow = false} else {this.isShow=true}
        if (scrollOffset < 10) {
          this.opacity=(Math.abs(scrollOffset)/10)
        }
        else if(scrollOffset<1){
          this.opacity = 1;
        }
      }
      else {
        this.isShow=false
      }
    },
    setList(id){
      song_detail(id).then(res=>{
        this.$audio.setPlaylist(res.data.songs)
      })
     },
    loadLovedSongs(ids){
      let myList=[]
      playlist_detail(ids).then(res=>{
        myList = res.data.playlist.tracks
      }).then(()=>{
        this.$audio.setPlaylist(myList)
        myList[0]!==undefined &&  this.$audio.setUrl(myList[0].id,myList[0].name,myList[0].ar,myList[0].al.picUrl,myList[0])
      })
    }
  },
  mounted() {
    //初始化登录状态
    this.islogin = this.LoginState
    this.tittle = this.Tittle


    //
    // //登出
    // logout().then(result => {
    //   console.log('已登出')
    //   console.log(result)
    //    }).catch(error=>{
    //   console.log('登出失败'+error)
    //  })
    // console.log(window.localStorage.getItem('userinfo'))
  },

  watch: {
    //登录状态
    LoginState:function (newState){
      this.islogin = newState
    },
    //搜索按钮
    input_search: function (newvalue) {
      this.oldPath.push(this.$route.fullPath)
      if (newvalue === '') {
        this.$router.push(this.oldPath[0])
      }
    },
    //路由匹配动画
    '$route'(to, from) {
      if(this.$route.fullPath.indexOf('Detail')===-1){
        this.isShow=false
      }
      if (to.meta.index !== undefined && from.meta.index !== undefined) {
        if (to.meta.index === 7) {
          //点击搜索拉起页面
          this.transitionName = 'slide_bottom'
        } else {
          this.transitionName = ''
        }
        if (from.meta.index === 7) {
          //退出搜索拉起页面
          this.transitionName = 'slide_top'
        }
      }
    },
    //Tittle
    Tittle(newTittle){
      this.tittle = newTittle;
    },
    //页面滚动
    MainPageScrollInfo(newInfo){
      this.MainPageScrollChange = newInfo
      this.showTittle()
    }
  }
}
</script>
<style>
/*路由切换*/
.slide_bottom-enter-from,
.slide_top-leave-to {
  transform: translateY(100%);
}

.slide_bottom-enter-active,
.slide_top-leave-active {
  width: calc(100vw - 500px);
  position: absolute;
  transition: all .3s cubic-bezier(0, .5, .5, 1);
}

.slide_bottom-enter-to,
.slide_top-leave-from {
  opacity: 1;
}
.userFriends-enter-active ,.userFriends-leave-active {
  transition: all .3s cubic-bezier(0.4,0.5,0.6,0.9);
  opacity: 1;
}
.userFriends-enter-from, .userFriends-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(500px);
  opacity: 0 ;
}

.home {
  height: 1080px;
  flex-direction: row;
}
.music {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
}
.mainPageTitle{
  color:var(--title_text);
  font-size: 20px;
  font-weight: bold;
  height: 100%;
  line-height: 40px;
  text-align: center;
}
.stepStone{
  position: absolute;
  right: 0 ;
  background-color: var(--BackColor);
  width: 40px;
  height: 60px;
}
::-webkit-scrollbar{
  display: none;
}
</style>
