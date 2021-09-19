<template>
  <div class="detailPage" ref="mainPage">
  <div class="page " >
    <div v-if="type === 'playlist'||type === 'newAlbum'||type==='myList'" class="headPart">
      <img  v-show="!isloding"  class="coverimg coverimgLittle"
            :src="listData?.pic+'?param=200y200'"
            alt=""
            @load="isloding=false"
      >
      <img class="coverimg coverimgLittle" style="width: 200px;height: 200px"  v-show="isloding===true"  src="~assets/img/footer/coverimg.png" alt="">
      <div class="text" >
        <div class="type">{{ typeName[type] }}</div>
        <div class="tags">
          <div class="tag" v-for="tag in listData.tags">{{tag}}</div>
        </div>
        <div class="title" ref="pageTitle" @click.self="showDialog=!showDialog">{{listData.title.trim()}}</div>
        <div class="btnGroup">
          <div class="profile" :style="{backgroundImage:'url('+listData.profile+'?param=30y30)'}"></div>
          <div class="profileName">{{' '+listData.author}}</div>
          <div class="little_span" v-if="listData.subscribers">{{listData.subscribers}}人收藏</div>
          <div class="little_span" v-if="listData.shareCount"> {{listData.shareCount}}次分享</div>
        </div>
        <div class="info" @click="showDialog=!showDialog"> {{ listData.description }} </div>
        <div class="dislike_btn" v-if="subscribed"  @click="removeFromLike()"><i class="iconfont Player-icon-buoumaotubiao16"
        ></i>取消收藏</div>
        <div class="like_btn"  @click="addToLike()" v-else ><i class="iconfont Player-icon-jiahao"
        ></i>收藏</div>
      </div>
    </div>
    <div v-if="type==='singer'" class="headPart">
      <img  v-show="!isloding"  class="coverimg coverimgLittle"
            :src="listData?.pic+'?param=200y200'"
            alt=""
            @load="isloding=false"
      >
      <img class="coverimg coverimgLittle"  v-show="isloding===true"  src="~assets/img/footer/coverimg.png" alt="">
      <div class="text">
        <div class="type">{{ typeName[type] }}</div>
        <div class="tags">
          <div class="tag" v-for="tag in listData.tags">{{tag}}</div>
        </div>
        <div class="title" ref="pageTitle">{{listData.title.trim()}}</div>
        <div class="info" @click="showDialog=!showDialog"> {{ listData.description }} </div>
      </div>
    </div>
    <div v-else >
    </div>
    <div class="swatch">
      <div class="list_btn">歌曲</div>
      <div class="comm_btn">评论</div>
    </div>
    <div class="list">
    </div>
    <div class="comm">
    </div>
    <div  style="overflow-y:auto;padding: 0 10px">
      <musiclittle_item v-for="item in listData.list"
                        :info="item"
                        type="songs"
      ></musiclittle_item>
    </div>
  </div>
  <cover_dialog :is-visible="showDialog">
     <div class="dialogDit" @scroll.stop>
       <img  v-show="!isloding"  class="coverimg coverimgBig"
             :src="listData?.pic+'?param=500y500'"
             alt=""
             @load="isloding=false"
       >
       <img class="coverimg coverimgBig"  v-show="isloding===true"  src="~assets/img/footer/coverimg.png" alt="">
       <div class="textDit">
         <div class="tags">
           <div class="tag" v-for="tag in listData.tags">{{tag}}</div>
         </div>
         <div class="title" ref="pageTitle">{{listData.title.trim()}}</div>
         <div class="btnGroup">
           <div class="profile" :style="{backgroundImage:'url('+listData.profile+'?param=30y30)'}"></div>
           <div class="profileName">{{' '+listData.author}}</div>
           <div class="little_span" v-if="listData.subscribers">{{listData.subscribers}}人收藏</div>
           <div class="little_span" v-if="listData.shareCount"> {{listData.shareCount}}次分享</div>
         </div>
         <div class="dislike_btn btnDit" v-if="subscribed" ><i class="iconfont Player-icon-buoumaotubiao16"
                                                                        ></i>取消收藏</div>
         <div class="like_btn btnDit" v-else ><i class="iconfont Player-icon-jiahao"
                                                 ></i>收藏</div>
       </div>
       <div class="infoDit"> {{ listData.description }} </div>
     </div>
  </cover_dialog>
</div>
</template>
<style scoped>
.detailPage{

  height: 100%;
  overflow-y: auto;
}
.headPart{
  width: 100%;
  height: 230px;
  display: flex;
  align-items: center;
}
.coverimg{
  border-radius: 8px;
  transition: .5s;
  flex-shrink: 0;

}
.coverimgLittle{
  width: 200px;
  height: 200px;
  margin-left: 20px;
}
.coverimgBig{
  position: relative;
  width: 300px;
  height: 300px;
}
.text{
  position: relative;
  text-align: left;
  margin-left:25px;
  height: 220px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  font-family: circularBold;
  overflow: hidden;
  text-overflow: ellipsis;
}
.textDit{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  margin-top: 20px;
  margin-bottom: 10px;
}
.type{
  position: relative;
  top: 0;
  color: #454F63;
}
.tags{
  margin-top: 5px;
  display: flex;

}
.tag{
  overflow: hidden;
  max-height: 20px;
  min-width: 40px;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 11pt;
  color: var(--title_text);
  margin-right: 10px;
  background-color: #42b983;
  border-radius: 5px;
  line-height: 1.2rem;
  padding: 0 10px 0 10px;
}
.title{
  width: 100%;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -1px;
  margin-top: 5px;
  font-size: 30pt;
  font-weight: 800;
  color: var(--title_text);
  font-family: circularBold;
}
.btnGroup{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 35px;
  color: var(--title_text);
}
.profile{
  height: 25px;
  width: 25px;
  border-radius: 15px;
}
.info{
  width: 90%;
  max-height: 120px;
  color: #454F63;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.infoDit{
  width: 70%;
  color: #454F63;
  font-size: 16px;
  white-space: break-spaces;
  padding: 40px;
  user-select: text !important;
}
.swatch{
  margin-left: 30px;
  width: 180px;
  display: flex;

}
.list_btn,.comm_btn{
  font-family: circularBold;
  color:var(--title_text);
  text-align: center;
  font-size: 14pt;
  width: 90px;
  height: 30px;
  line-height: 30px;
}
.like_btn,.dislike_btn{
  position: absolute;
  top: 5px;
  right: 10px;
}
.Player-icon-buoumaotubiao16,.Player-icon-jiahao{
  font-size: 12px;
  margin-right: 5px;
}
.btnDit{
  position: relative;
  width: 80px;
  left: 2px;
}
.little_span{
  margin-left: 10px;
}
.profileName{
  margin-left: 5px;
  font-weight: bold;
}
.profileName:hover{
  border-bottom: 1px solid
}
.dialogDit{
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100% ;
  height: calc(100% - 40px) ;
  margin-top: 40px;
  overflow-y: auto;
}
</style>
<script>
import {playlist_detail,artist_detail,playlist_subscribe,likelist,dj_program_detail,album,dj_detail} from 'network/music'
import musiclittle_item from "items/musiclittle_item";
import store from "../../../store/store";
import Cover_dialog from "../../common/Vam_Layout/cover_dialog";
import {mapState} from "vuex";

export default {
name: "Detial_page",
  components: {Cover_dialog, musiclittle_item},
  data(){ return{
    id:Number,
    type:'',
    isloding:true,
    showDialog:false,
    src:require("assets/img/footer/coverimg.png"),
    subscribed:false,
    listData:{
      title:'',
      author:'',
      profile:'',
      pic:'',
      tags:[],
      description:'',
      subscribers:'',
      subscribed:false,
      shareCount:'',
      updateTime:Number,
      updateFrequency:'',
      list:[],
    },
    typeName:{
      'playlist':'播放清单',
      'newAlbum':'专辑',
      'singer':'歌手',
      'Radio':'电台节目'
    }
  }},
  computed:{
  ...mapState({
    userInfo:state => state.user.userinfo,
  })
  },
  watch:{
   id:function (newId){
     switch (this.type){
       case 'Radio': {
         //获取电台详情
         dj_program_detail(newId).then(result => {
           console.log(result )
         })
             .catch(error => { console.log("电台详情获取失败" + error);
         });
         break;
       }
       case'playlist':{
         //获取歌单详情
         playlist_detail(newId).then(result => {
           this.setDataList(
             result.data.playlist.tracks,
             result.data.playlist.name,
             result.data.playlist.creator.nickname,
             result.data.playlist.creator.avatarUrl,
             result.data.playlist.tags,
             result.data.playlist.coverImgUrl,
             result.data.playlist.description,
             result.data.playlist.shareCount,
             result.data.playlist.subscribed,
             result.data.playlist.subscribedCount,
             result.data.playlist.updateTime,
             result.data.playlist.updateFrequency
           )
         }).catch(error=>{console.log("歌单详情获取失败"+error);});
         break;
       }
       case 'newAlbum':{
         //获取歌单详情
         album(newId).then(result => {
           this.setDataList(
               //list,title,author,avatarUrl,tags,picUrl,description,shareCount,subscribed,subscriberCount,updateTime,updateFrequency
               result.data.songs,
               result.data.album.name,
               result.data.album.artist.name,
               result.data.album.artist.img1v1Url,
               [result.data.album.subType],
               result.data.album.picUrl,
               result.data.album.description,
               result.data.album.info.shareCount,
               false,
               false,
               result.data.album.publishTime,
               false
           )
         }).catch(error=>{console.log("专辑详情获取失败"+error);});
         break;
       }
       case 'myList':{
         //获取歌单详情
         likelist(window.localStorage.getItem('userid')).then(result => {
           this.setDataList(
               result.data.playlist.tracks,
               result.data.playlist.name,
               result.data.playlist.creator.nickname,
               result.data.playlist.creator.avatarUrl,
               result.data.playlist.tags,
               result.data.playlist.coverImgUrl,
               result.data.playlist.description,
               result.data.playlist.shareCount,
               result.data.playlist.subscribed,
               result.data.playlist.subscribedCount,
               result.data.playlist.updateTime,
               result.data.playlist.updateFrequency
           )
         }).catch(error=>{console.log("歌单详情获取失败"+error);});
         break;
       }
       case 'singer':{
         //获取歌单详情
         artist_detail(newId).then(result => {
           console.log(result)
           this.setDataList(
               //list,title,author,avatarUrl,tags,picUrl,description,shareCount,subscribed,subscriberCount,updateTime,updateFrequency
               result.data.songs,
               result.data.album.name,
               result.data.album.artist.name,
               result.data.album.artist.img1v1Url,
               result.data.artist.identifyTag,
               result.data.album.picUrl,
               result.data.album.description,
               result.data.album.info.shareCount,
               false,
               false,
               result.data.album.publishTime,
               false
           )
         }).catch(error=>{console.log("专辑详情获取失败"+error);});
         break;
       }
     }
   }
  },
  methods:{
    updatePlaylist(){
      this.$audio.setPlaylist(this.listData.list)
    },
    handleScroll(){
      const rect = {
        scrollTop : this.$refs.mainPage.scrollTop,
        tittleTop : this.$refs.pageTitle.offsetTop-60, //相对于mainPage定位标题顶部
        tittleBottom:this.$refs.pageTitle.offsetTop+this.$refs.pageTitle.clientHeight
      }
      store.commit('other/setMainPageScrollInfo',rect);
      store.commit('other/setTittle',this.listData.title);
    },
    setDataList(...[list,title,author,avatarUrl,tags,picUrl,description,shareCount,subscribed,subscriberCount,updateTime,updateFrequency]){
      this.listData.title=title
      this.listData.author=author
      this.listData.profile=avatarUrl
      this.listData.tags=tags
      this.listData.pic=picUrl
      this.listData.description=description
      this.listData.list=list
      this.subscribed=subscribed
      this.listData.subscribers=subscriberCount
      this.listData.shareCount=shareCount
      this.listData.updateTime=updateTime
      this.listData.updateFrequency=updateFrequency
      console.log(this.listData)
    },
    addToLike(){
      console.log('add')
      playlist_subscribe(1,this.id).then(res=>{
        if(res.code===200){
          this.subscribed=true;
        }
      }).catch(()=>{
        this.$msgbox('添加收藏失败',200)
      })
    },
    removeFromLike(){
      playlist_subscribe(2,this.id).then(res=>{
        if(res.code===200){
          this.subscribed=false;
        }
      }).catch(()=>{
        this.$msgbox('取消收藏失败',200)
      })
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.type= this.$route.params.type;
    this.$refs.mainPage.addEventListener('scroll',this.handleScroll)
  }
}
</script>


