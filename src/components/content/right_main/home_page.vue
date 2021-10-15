<template>
  <div class="page">
    <li class="item_li">
      <div class="type_title">   Hi,{{hello}}  </div>
      <div class="content_item_group"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)">
        <div class="content_item_one" >
          <!--精品歌单-->
          <rectangle v-for="item in playlist.highQuality.list"
                     :key="item.id"
                     :item="item"
                     :type="playlist.highQuality.type"></rectangle>
        </div>
        <div class="content_item_two"  >
          <!--热门电台-->
          <rectangle v-for="item in playlist.hotRadios.list"
                     :key="item.id"
                     :item="item"
                     :type="playlist.hotRadios.type"></rectangle>
        </div>
      </div>

      <div class="content_item"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)" >
        <channel v-for="channel in channel"
                 :channel="channel"
                 @click="quickEGTTO(channel)"
        ></channel>
      </div>
    </li>
<!--每日推荐-->
    <li v-if="$store.getters['user/getloginState']===true" class="item_li" >
      <div class="type_title"> 每日推荐  </div>
      <div class="content_item"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)" >
        <square v-for="item in playlist.user_recommend"
                :info="item"
                com_type="user_playlist"
        ></square>
      </div>
    </li>
<!--排行榜-->
    <li class="item_li"  >
      <div class="type_title"> 排行榜  </div>
      <div class="content_item"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)" >
        <div class="column" v-for="(playlist,index) in playlist.top_list.list" :key="index" >
          <toplist
                   :items="playlist"  ></toplist>
        </div>
      </div>
    </li>
<!--新歌速递-->
    <li class="item_li">
      <div class="type_title"> 新歌速递 </div>
      <div class="content_item"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)" >
        <div class="column">
          <rectangle v-for="item in playlist.new_songs.list.slice(0,4)"
                     :item="item"
                     :type="playlist.new_songs.type"
          ></rectangle>
        </div>
        <div class="column">
          <rectangle v-for="item in playlist.new_songs.list.slice(4,8)"
                     :item="item"
                     :type="playlist.new_songs.type"
          ></rectangle>
        </div>
        <div class="column">
          <rectangle v-for="item in playlist.new_songs.list.slice(8,12)"
                     :item="item"
                     :type="playlist.new_songs.type"
          ></rectangle>
        </div>
        <div class="column">
          <rectangle v-for="item in playlist.new_songs.list.slice(12,16)"
                     :item="item"
                     :type="playlist.new_songs.type"
          ></rectangle>
        </div>
      </div>
    </li>
<!--新碟速递-->
    <li class="item_li">
      <div class="type_title"> 新碟上架 </div>
      <div class="content_item"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)" >
        <div class="column">
          <rectangle
              v-for="item in playlist.new_albums.list.slice(0,4)"
              :item="item"
              :type="playlist.new_albums.type"
          ></rectangle>
        </div>
        <div class="column">
          <rectangle v-for="item in playlist.new_albums.list.slice(4,8)"
                     :item="item"
                     :type="playlist.new_albums.type"
          ></rectangle>
        </div>
        <div class="column">
          <rectangle v-for="item in playlist.new_albums.list.slice(8,12)"
                     :item="item"
                     :type="playlist.new_albums.type"
          ></rectangle>
        </div>
        <div class="column">
          <rectangle v-for="item in playlist.new_albums.list.slice(12,16)"
                     :item="item"
                     :type="playlist.new_albums.type"
          ></rectangle>
        </div>
      </div>
    </li>
    <li v-if="$store.getters['user/getloginState']===true" class="item_li">
      <div class="type_title"> 推荐电台 </div>
      <div class="content_item"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)" >
        <square v-for="item in playlist.user_fm"
                :info="item"
                com_type="user_playlist_dj"
        ></square>
      </div>
    </li>
    <div class="steppingStones"></div>
  </div>
</template>

<script>
import square_item from 'items/square_item'
import rectangle_item from "items/rectangle_item";
import toplist from "items/toplist_card";
import channel_item from "items/channel_item";
import {reactive} from 'vue'
import {search_hot,homepage_info,new_songs,playlist_highquality} from 'network/home_page';
import {radio_hot,top_album,top_list,recommend_resource,personalized_djprogram} from "network/music";
import {mapState, useStore} from "vuex";
export default {

  name: "Home_page",
  components: {
    square: square_item,
    rectangle:rectangle_item,
    channel:channel_item,
    toplist:toplist
  },
  setup(){
    //登录状态获取
    const store = useStore()

    //歌单标签数据结构
    const playlist = reactive({
      //用户日推歌单
      user_recommend:{},
      //推荐电台
      user_fm:{},
      //精品歌单
      highQuality:{type:"playlist",list:[]},
      //热门电台
      hotRadios:{type:"Radio",list:[]},
      //新歌
      new_songs:{type:"newSong",list:[]},
      //新碟
      new_albums:{type:"newAlbum",list:[]},
      //排行榜
      top_list:{type:"",list:[]},
      //首页数据
      home_page:{},
      //最近播放
      recently:{}
    })
    // console.log(this.$store)
    //热门电台
    radio_hot().then(result=>{
      playlist.hotRadios.list = result.data.djRadios
    }).catch(error=>{ console.log('热门电台数据获取失败'+error);})
    //新碟上架
    top_album(16).then(result=>{
      playlist.new_albums.list = result.data.monthData
    }).catch(error=>{ console.log('新碟数据获取失败'+error);})
    //排行榜信息
    top_list().then(result=>{
      // console.log(result);
       playlist.top_list.list = result.data.list.slice(0,5)
      // console.log(playlist.top_list.list)
    }).catch(error=>{ console.log('排行榜数据获取失败'+error);})
     //首页数据
    // homepage_info().then(result=>{
    //   console.log('首页数据');
    //   console.log(result);
    //   playlist.home_page = result.data
    // }).catch(error=>{ console.log('首页数据数据获取失败'+error);})

    // //获取热门搜索
    // search_hot().then(result=>{
    // }).catch(error=>{ console.log('热门搜索数据获取失败'+error);})

    //获取新歌 全部 0 华语 7 欧美 96 日本 8 韩国 16
    new_songs(0).then(result=>{
      // console.log(result);
      playlist.new_songs.list = result.data.data;
    }).catch(error=>{ console.log('新歌速递数据获取失败'+error);})

    //获取精品歌单数据
    playlist_highquality().then(result=>{
      playlist.highQuality.list = result.data.playlists;
    }).catch(error=>{ console.log('精品歌单数据获取失败'+error);})
    /*日推 需要登录*/
    if(store.getters['user/getloginState']===true){
      recommend_resource().then(result => {
        playlist.user_recommend = result.data.recommend
      }).catch(error=>{ console.log('日推歌单数据获取失败'+error);})
      personalized_djprogram().then(result => {
        // console.log('电台')
        // console.log(result)
        playlist.user_fm = result.data.result
      }).catch(error=>{ console.log('推荐电台歌单数据获取失败'+error);})
    }
    return{
      playlist
    }
  },
  data() {
    return {
      hello: '',
      init_posX: 0,//鼠标初始位置
      isOn:Boolean,
      init_scrollLeft: 0,//定位滑动
      channel:{
        myFavorite:['我的喜欢','myFavorite'],
        playlist:['歌单广场','playlist'],
        topList:['排行榜','topList'],
        pcFM:['私人电台','radio'],
        recommend:['每日推荐','recommend']
      }
    }
  },
  computed:{
    ...mapState({
      LoginState: state => state.user.isLogin,
    })
  },
  methods: {
    getMouseX(e) {
      this.init_posX = e.x;
      this.isOn = true;
      this.init_scrollLeft = e.currentTarget.scrollLeft;
    },
    getMouseMoveX(e) {
      let temp = this.init_posX - e.x;
      if (this.isOn.valueOf() === true) {
        e.currentTarget.scrollLeft = this.init_scrollLeft + temp;
      }
    },
    MouseLeave(){
      this.isOn = false;
    },
    quickEGTTO(type){
      if(type[1]==='myFavorite'){
        this.$router.push({
          name: 'playlistDetail',
          params: {
            type:'myList',
            id: window.localStorage.getItem('myMusicList')
          }
        })
      }

    }
  },
  mounted() {
    let now = new Date(), hour = now.getHours();
    if (hour < 6) {this.hello = '凌晨好' }
    else if (hour < 9) { this.hello = '早安！' }
    else if (hour < 12) {this.hello = '上午好！' }
    else if (hour < 14) {this.hello = '午安！' }
    else if (hour < 17) {this.hello = '下午好！' }
    else if (hour < 19) {this.hello = '晚上好！' }
    else if (hour < 24) {this.hello = '晚安！'}
    window.addEventListener('mouseup',this.MouseLeave);

  },
}
</script>
<style scoped>
.page{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-image: linear-gradient(to bottom, #F1F4F5, #F4F6F6, #FAFAFA);
}
</style>
