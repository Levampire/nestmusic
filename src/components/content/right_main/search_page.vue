
<template>
  <div class="back">
    <li class="item_li_group"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)">
      <div class="li_group1">
        <div class="type_title"> 热门搜索结果 </div>
        <div class="can">
          <squarebig_item :firstone="firstone"></squarebig_item>
        </div>
      </div>
      <div class="li_group2">
        <div class="type_title"> 歌曲 </div>
        <div class="into_detail"> 查看全部 </div>
        <div class="can">
          <musiclittle_item v-for="song in search_result.single.songs"
                            :info="song"
                            :key="song"
           > </musiclittle_item>
        </div>
      </div>
    </li>
    <li class="item_li"  >
      <div class="type_title"> 音乐人 </div>
      <div class="into_detail"> 查看全部 </div>
      <div class="content_item"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)" >
        <!--最近播放-->
        <square v-for="artist in search_result.artists.artists"
                :info="artist"
                :key="artist"
                com_type="artist"
        ></square>
      </div>
    </li>
    <li class="item_li"  >
      <div class="type_title"> 专辑 </div>
      <div class="into_detail"> 查看全部 </div>
      <div class="content_item"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)" >
        <!--最近播放-->
        <square v-for="albums in search_result.albums.albums"
                :info="albums"
                :key="albums"
                com_type="album"
        ></square>
      </div>
    </li>
    <li class="item_li"  >
      <div class="type_title"> 歌单 </div>
      <div class="into_detail"> 查看全部 </div>
      <div class="content_item"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)" >
        <!--最近播放-->
        <square v-for="playlist in search_result.playlist.playlists"
                :info="playlist"
                :key="playlist"
                com_type="playlist"
        ></square>
      </div>
    </li><li class="item_li"  >
      <div class="type_title"> 电台 </div>
      <div class="into_detail"> 查看全部 </div>
      <div class="content_item"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)" >
        <!--最近播放-->
        <square v-for="radio in search_result.radio.djRadios"
                :info="radio"
                :key="radio"
                com_type="radio"
        ></square>
      </div>
    </li><li class="item_li"  >
      <div class="type_title"> MV </div>
      <div class="into_detail"> 查看全部 </div>
      <div class="content_item"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)" >
        <!--最近播放-->
        <square ></square>
      </div>
    </li><li class="item_li"  >
      <div class="type_title"> 用户 </div>
      <div class="into_detail"> 查看全部 </div>
      <div class="content_item"  @mousedown=" getMouseX($event) " @mousemove="getMouseMoveX($event)" >
        <!--最近播放-->
        <square v-for="user in search_result.user.userprofiles"
                :info="user"
                :key="user"
                com_type="user"
        ></square>
      </div>
    </li>
  </div>
</template>
<script>
import square_item from 'items/square_item'
import Squarebig_item from "items/squarebig_item";
import Musiclittle_item from "items/musiclittle_item";
import {searchmusic} from "network/music";
import {throttle} from 'utils/throttle'
export default {
  name: "search_page",
  components:{
    Musiclittle_item,
    Squarebig_item,
    square: square_item,
  },
  data(){
    return{
      ison:false,
      //搜索结果
      search_result:{
        single: {},
        albums: {},
        artists: {},
        playlist:{},
        user:{},
        radio: {},
        mv:{}
      },
      firstone:{}
    }
  },
  computed:{

  },
  props:{
    inputvalue:{
     type:String
    }
  },
  methods:{
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
    getInputValue:function(newvalue){
      const types = {
        'albums': 10,
        'artists': 100,
        'playlist': 1000,
        'user': 1002,
        'radio': 1009,
        'mv': 1004
      }
      searchmusic(newvalue,1,5,0).then(result=>{
        this.search_result.single = result.data.result
        this.firstone = this.search_result.single.songs.shift()
      }).catch(error=>{})
      Object.keys(types).forEach(async (key)=>{
        //搜索请求keyword,type,limit,offset
        searchmusic(newvalue,types[key],10,0).then(result => {
          this.search_result[key]=result.data.result
        }).catch(error=>{ console.log(key+'搜索请求失败'+error) })
      })
      console.log(this.search_result)
    }
  },
  mounted() {
    window.addEventListener('mouseup',this.MouseLeave);
  },
  watch:{
    inputvalue:function (newvalue,oldvalue){
      // throttle( this.getInputValue(newvalue),500)
      this.getInputValue(newvalue)
    }
  }
}
</script>

<style scoped>
.back{
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.item_li{
  position: relative;
  width: 100%;
  height: 320px;
  margin-bottom: 10px;
}
.li_group1{
  width: 480px;
  height: 300px;
}
.li_group2{
  width: calc(100% - 480px);
  height: 300px;
}
.can{
  margin-top: 20px;
}
</style>
