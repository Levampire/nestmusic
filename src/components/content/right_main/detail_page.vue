<template>
  <div class="detailPage" ref="mainPage">
  <div class="page " >
    <img  v-show="!isloding"  class="coverImgShadow coverimgLittle"
          :src="listData?.pic+'?param=300y300'"
          alt=""
          @load="isloding=false"
    >
    <div v-if="type === 'playlist'||type === 'newAlbum'||type==='myList'" class="headPart">
      <img  v-show="!isloding"  class="coverimg coverimgLittle"
            :src="listData?.pic+'?param=300y300'"
            alt=""
            @load="isloding=false"
      >
      <div class="coverimg coverimgLittle playlistimg"  v-show="isloding===true"   alt=""></div>
      <div class="text" >
        <div class="title" ref="pageTitle" @click.self="showDialog=!showDialog">{{listData.title.trim()}}</div>
        <div class="tags">
          <div class="tag" v-for="tag in listData.tags">{{tag}}</div>
        </div>
        <div class="btnGroup">
          <div >{{ typeName[type] +''}}  By</div>
<!--          <div class="profile" :style="{backgroundImage:'url('+listData.profile+'?param=30y30)'}"></div>-->
          <div class="profileName">{{' '+listData.author}}</div>
          <div class="little_span" v-if="listData.subscribers"> · {{listData.subscribers}}人收藏</div>
          <div class="little_span" v-if="listData.shareCount"> ·  {{listData.shareCount}}次分享</div>
          <div class="dislike_btn" v-if="subscribed&&subscribed!==0&&type!=='myList'"  @click="removeFromLike()"><i class="iconfont Player-icon-buoumaotubiao16"
          ></i>取消收藏</div>
          <div class="like_btn"  @click="addToLike()" v-if="!subscribed&&subscribed!==0&&type!=='myList'" ><i class="iconfont Player-icon-jiahao"
          ></i>收藏</div>
        </div>
        <div class="info" @click="showDialog=!showDialog"> {{ listData.description }} </div>

      </div>
    </div>
    <div v-if="type==='singer'" class="headPart">
      <img  v-show="!isloding"  class="coverimg coverimgLittle"
            :src="listData?.pic+'?param=200y200'"
            alt=""
            @load="isloding=false"
      >
      <div class="coverimg coverimgLittle playlistimg"  v-show="isloding===true"   alt=""></div>
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
<!--    <div class="swatch">-->
<!--      <div class="list_btn">歌曲</div>-->
<!--      <div class="comm_btn">评论</div>-->
<!--    </div>-->
<!--    <div class="list">-->
<!--    </div>-->
<!--    <div class="comm">-->
<!--    </div>-->
    <div  style="overflow-y:auto;padding: 0 10px" v-if="listData.list.length!==0">
        <musiclittle_item v-for="(item,index) in listData.list"
                          :info="item"
                          type="songs"
                          :index="index+1"
                          key="item.id"
        ></musiclittle_item>
    </div>
    <div v-else class="emptyInfo">您还没有收藏歌曲</div>
    <div class="footerInfo">
      <span v-if="currentRoutePath.indexOf('newAlbum')!==-1">
         ·  共{{ listData.list.length }}首音乐 · 专辑发布于{{formtTime}} <br>© {{ albumCompany }}
      </span>
      <span v-else>
        ·  共{{ listData.list.length}}首音乐 · 最后更新于{{formtTime}}

      </span>

    </div>
    <div class="steppingStones"></div>
  </div>
  <cover_dialog :is-visible="showDialog">
     <div class="dialogDit" @scroll.stop>
       <img  v-show="!isloding"  class="coverimg coverimgBig"
             :src="listData?.pic+'?param=500y500'"
             alt=""
             @load="isloding=false"
       >
       <div class="coverimg coverimgLittle img"  v-show="isloding===true"   alt=""></div>
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
         <div class="dislike_btn btnDit" v-if="subscribed&&subscribed!==0" ><i class="iconfont Player-icon-buoumaotubiao16"
                                                                        ></i>取消收藏</div>
         <div class="like_btn btnDit" v-if="!subscribed&&subscribed!==0" ><i class="iconfont Player-icon-jiahao"
                                                 ></i>收藏</div>
       </div>
       <div class="infoDit"> {{ listData.description }} </div>
     </div>
  </cover_dialog>

</div>
</template>
<script>
import {playlist_detail,artist_detail,playlist_subscribe,likelist,dj_program_detail,album,dj_detail,song_detail} from 'network/music'
import musiclittle_item from "items/musiclittle_item";
import store from "../../../store/store";
import Cover_dialog from "../../common/Vam_Layout/cover_dialog";
import {mapState} from "vuex";
import {timeDateTrans} from "utils/tools";

export default {
name: "detail_page",
  components: {Cover_dialog, musiclittle_item},
  data(){ return{
    id:Number,
    type:'',
    isloding:true,
    showDialog:false,
    subscribed:false,
    albumCompany:'',
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
    listIds:[],//我喜欢的列表数据
    typeName:{
      'playlist':'播放清单',
      'newAlbum':'专辑',
      'singer':'歌手',
      'Radio':'电台节目',
      'myList':'播放清单'
    }
  }},
  computed:{
  ...mapState({
    userInfo:state => state.user.userinfo,
  }),
    formtTime(){
    return timeDateTrans(this.listData.updateTime)
    },
    currentRoutePath(){
    return this.$route.fullPath
    }
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
       case'playlist':case 'myList':{
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
           this.albumCompany = result.data.album.company
         }).catch(error=>{console.log("专辑详情获取失败"+error);});
         break;
       }
       // case 'myList':{
       //   //获取我喜欢的音乐
       //   this.setDataList(
       //       '',
       //       '已收藏的歌曲',
       //       this.userInfo.name,
       //       this.userInfo.avatarUrl,
       //       ['私人收藏'],
       //       this.userInfo.coverImgUrl,
       //       '',
       //       '0',
       //       '0',
       //       '0',
       //       '0',
       //       '0'
       //   )
       //   likelist(window.localStorage.getItem('userid')).then(result => {
       //     this.listIds= result.data.ids;
       //     let idgroup;
       //     this.listIds.length>20?idgroup=this.listIds.splice(1,20):idgroup=this.listIds.splice(1,this.listIds.length);
       //     song_detail(idgroup.toString()).then(result => {
       //       this.listData.list = result.data.songs
       //       this.listData={
       //         ...this.listData,
       //       }
       //     })
       //   }).catch(error=>{console.log("歌单详情获取失败"+error);});
       //   break;
       // }
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
        tittleBottom:this.$refs.pageTitle.offsetTop+this.$refs.pageTitle.clientHeight,
        clientHeight: this.$refs.mainPage.clientHeight,
        scrollHeight: this.$refs.mainPage.scrollHeight,
      }
      store.commit('other/setMainPageScrollInfo',rect);
      store.commit('other/setTittle',this.listData.title);
      if(this.type==='myList'){
        let bottomOfWindow = Math.floor(rect.scrollHeight - rect.scrollTop)  === rect.clientHeight;
        // console.log(rect.scrollHeight-rect.scrollTop+'::'+rect.clientHeight)
        if(bottomOfWindow){
          let idgroup;
          if(this.listIds.length!==0){
            this.listIds.length>20?idgroup=this.listIds.splice(1,20):idgroup=this.listIds.splice(1,this.listIds.length);
            song_detail(idgroup.toString()).then(result => {
              const songs = result.data.songs
              this.listData.list.push(...songs)
              // console.log(this.listData.list)
            })
            .then(this.listData = {
              ...this.listData
            })
          }
        }
      }
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
    },

  },
  mounted() {
    this.id = this.$route.params.id;
    this.type= this.$route.params.type;
    this.$refs.mainPage.addEventListener('scroll',this.handleScroll)
    console.log(this.listData)
  }
}
</script>
<style scoped>
@import "~assets/css/detailpage.css";
.playlistimg{
  background-image: url("~assets/img/coverimg.png");
}
.detailPage{
  position: relative;
  height:calc( 100% - 60px) ;
  overflow-y: auto;
}
.headPart{
  width: 100%;
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
  z-index: 2;
}
.coverImgShadow{
  position: absolute;
  top: 40px;
  left:0 ;
  opacity: .5;
  filter: blur(15px);
  z-index: 1;
  transform: matrix(0.92, 0, 0, 0.96, 0, 0);
}
.coverimgBig{
  position: relative;
  width: 300px;
  height: 300px;
  box-shadow:0 0 15px  #D9D9D9;
}
.text{
  margin-top: 20px;
  position: relative;
  text-align: left;
  margin-left:25px;
  height: 280px;
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
  font-family: var(--VamFont);
}
.tags{
  margin-top: 5px;
  margin-bottom: 20px;
  display: flex;
  font-family: var(--VamFont);
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
  font-family: var(--VamFont);
}

.btnGroup{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 35px;
  color: var(--title_text);
  font-family: Barlow-Medium,var(--VamFont);
  margin-bottom: 10px;
}
.profile{
  height: 25px;
  width: 25px;
  border-radius: 15px;
  font-family: var(--VamFont);
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
  margin-left: 20px;
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
.emptyInfo{
  color: var(--info_text);
  position: relative;
  top: 200px;
}
.coverimgLittle{
  width: 250px;
  height: 250px;
  margin-left: 20px;
}

.title{
  width: 100%;
  height: 80px;
  line-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -1px;
  margin-top: 5px;
  font-size: 24pt;
  font-weight: 800;
  color: var(--title_text);
  font-family: circularBold;
}
.info{
  width: 90%;
  max-height: 120px;
  color: #454F63;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-family: PingFang Light;
  font-weight: bold;
}
.infoDit{
  width: 70%;
  color: #454F63;
  font-size: 16px;
  white-space: break-spaces;
  padding: 40px;
  user-select: text !important;
}
.footerInfo{
  color: #646A76;
  width: 80%;
  margin-left: -30px;
  height: 60px;
  padding-top: 20px;
  line-height: 20px;
  text-align: left;
  font-family: Barlow-Medium,var(--VamFont);
  transform: scale(.85);
}
</style>

