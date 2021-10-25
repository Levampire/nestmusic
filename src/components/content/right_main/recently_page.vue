<template>
  <div class="detailPage" ref="mainPage">
    <div >
      <img  v-show="!isloding"  class="coverImgShadow coverimg"
            :src="listData[0]?.al.picUrl+'?param=300y300'"
            alt=""
            @load="isloding=false"
      >
      <div class="headPart">
        <img  v-show="!isloding"  class="coverimg "
              :src="listData[0]?.al.picUrl+'?param=300y300'"
              alt=""
              @load="isloding=false"
        >
        <div class="coverimg  playlistimg"  v-show="isloding===true"   ></div>
        <div class="column">
          <div class="title" ref="pageTitle">最近听过</div>
          <div class="playListActions">
            <div class="playAll">
              <div v-show="!isPlay">
                <i class="iconfont Player-icon-playmdpi"
                   @click="play()">
                </i>
                播放
              </div>
              <div v-show="isPlay">
                <i class="iconfont Player-icon-pausemdpi"
                   @click="play()">
                </i>
                暂停
              </div>

            </div>
            <div class="dislike_btn"
                 v-if="subscribed&&subscribed!==0&&type!=='myList'"
                 @click="removeFromLike()">
              <i class="iconfont Player-icon-buoumaotubiao16"></i>

            </div>
            <div class="like_btn"
                 @click="addToLike()"
                 v-if="!subscribed&&subscribed!==0&&type!=='myList'" >
              <i class="iconfont Player-icon-enshrine"></i>
            </div>
            <div class="moreActions ">
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
    <div  style="overflow-y:auto;padding: 0 10px;transition: .7s" v-if="listData.length!==0">
      <musiclittle_item v-for="(item,index) in listData"
                        :info="item"
                        type="songs"
                        :index="index+1"
                        :key="item.id"
      ></musiclittle_item>
    </div>
    <div v-else class="emptyInfo">您还没有收藏歌曲</div>
    <div class="steppingStones"></div>
</div>
</template>

<script>
import store from "../../../store/store";
import musiclittle_item from "./items/musiclittle_item";
import {logout} from "../../../network/login";
import {mapState} from "vuex";

export default {
  name: "recently-page",
  components:{musiclittle_item},
  data() {
    return {
      listData:[],
    }
  },
  computed:{
    ...mapState({
      RecentList:state => state.musicplay.RecentList,
      playState:state => state.musicplay.isPlay,
      currentPlayMusic:state=>state.musicplay.musicID,
      playlist:state=>state.musicplay.musicList
    })
  },
  watch:{
    RecentList(list){
      this.listData = [...list]

    }
  },
  methods: {
    updatePlaylist(){
      this.$audio.setPlaylist(this.listData)
    },
    handleScroll() {
      const rect = {
        scrollTop: this.$refs.mainPage.scrollTop,
        tittleTop: this.$refs.pageTitle.offsetTop - 60, //相对于mainPage定位标题顶部
        tittleBottom: this.$refs.pageTitle.offsetTop + this.$refs.pageTitle.clientHeight,
        clientHeight: this.$refs.mainPage.clientHeight,
        scrollHeight: this.$refs.mainPage.scrollHeight,
      }
      store.commit('other/setTittle', '最近播放');
    },
    loadData:async function(){
      this.listData = await JSON.parse(window.localStorage.getItem('musicRecord'))
      this.isPlay = this.playState &&  this.listData.filter(item =>item.id===this.currentPlayMusic).length>0;
    }
  },
  created() {
    this.loadData()
  },
  mounted() {
    this.$refs.mainPage.addEventListener('scroll', this.handleScroll)


  }
}
</script>

<style scoped>
.playlistimg{
  background-image: url("~assets/img/coverimg.png");
}
.detailPage{
  position: relative;
  height:calc( 100% - 60px) ;
  overflow-y: auto;
}
.headPart{
  width: calc(100% - 40px) ;
  padding:0 20px 20px 20px ;
  height: 300px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.coverimg{
  border-radius: 8px;
  transition: .5s;
  flex-shrink: 0;
  box-shadow:0 0 10px  #D9D9D9;
  z-index: 15;
  height: 250px;
  width: 250px;
}
.coverImgShadow{
  position: absolute;
  top: 55px;
  left:20px ;
  opacity: .5;
  filter: blur(15px);
  margin-top: -30px;
  z-index: 0;
  transform: matrix(0.85, 0, 0, 0.96, 0, 0);
}
.headPart .column{
  padding-left: 25px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}
.headPart .column .title{
  font-size: 25pt;
  font-family: circularBold;
  font-weight: bold;
}
</style>
