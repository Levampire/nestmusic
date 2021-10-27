<template>
    <div class="detailPage " ref="mainPage">
      <cover_dialog :is-visible="showDialog">
        <div class="dialogDit" @scroll.stop>
          <img  v-show="!isloding"
                class="coverimg coverimgBig"
                :src="listData?.pic+'?param=500y500'"
                alt=""
                @load="isloding=false">
          <div class="coverimg coverimgLittle img"
               v-show="isloding===true"
               alt="">
          </div>
          <div class="textDit">
            <div class="tags">
              <div class="tag"
                   v-for="tag in listData.tags">
                {{tag}}
              </div>
            </div>
            <div class="title" ref="pageTitle">{{listData.title.trim()}}</div>
            <div class="btnGroup">
              <div class="profile"
                   :style="{backgroundImage:'url('+listData.profile+'?param=30y30)'}">
              </div>
              <div class="profileName" @click="toAutherPage()">
                {{' '+listData.author.nickname}}
              </div>
              <div class="little_span" v-if="listData.subscribers">
                {{listData.subscribers}}人收藏
              </div>
              <div class="little_span" v-if="listData.shareCount">
                {{listData.shareCount}}次分享
              </div>
            </div>
            <div class="dislike_btn btnDit"
                 v-if="subscribed&&subscribed!==0" >
              <i class="iconfont Player-icon-buoumaotubiao16"></i>
              取消收藏
            </div>
            <div class="like_btn btnDit"
                 v-if="!subscribed&&subscribed!==0" >
              <i class="iconfont Player-icon-jiahao"></i>
              收藏
            </div>
          </div>
          <div class="infoDit"> {{ listData.description }} </div>
        </div>
      </cover_dialog>
      <div v-if="type === 'playlist'||type === 'newAlbum'||type==='myList'||type==='Radio'"
           class="headPart">
        <img  v-show="!isloding"
              class="coverImgShadow coverimgLittle"
              :src="listData?.pic+'?param=300y300'"
              alt=""
              @load="isloding=false"
        >
        <img  v-show="!isloding"
              class="coverimg coverimgLittle"
              :src="listData?.pic+'?param=300y300'"
              alt=""
              @load="isloding=false"
        >
        <div class="coverimg coverimgLittle playlistimg"
             v-show="isloding===true"
             alt="">
        </div>
        <div class="text" >
          <div class="title"
               ref="pageTitle"
               @click.self="showDialog=!showDialog">
            {{listData.title.trim()}}
          </div>

          <div class="btnGroup">
            <div >
              {{ typeName[type] +''}}  By
            </div>
            <!--          <div class="profile" :style="{backgroundImage:'url('+listData.profile+'?param=30y30)'}"></div>-->
            <div class="profileName" @click="toAutherPage()" >
              {{' '}}{{listData.author?.nickname || listData.author.name}}
            </div>
            <div class="little_span" v-if="listData.subscribers">
              · {{listData.subscribers}}人收藏
            </div>
            <div class="little_span" v-if="listData.shareCount">
              ·  {{listData.shareCount}}次分享
            </div>

          </div>
          <div class="tags">
            <div class="tag"
                 v-for="tag in listData.tags">
              {{tag}}
            </div>
          </div>
          <div class="info" @click="showDialog=!showDialog"> {{ listData.description }} </div>
          <div class="playListActions">
            <div class="playAll" @click="playAll">
              <div v-show="!isPlay">
                <i class="iconfont Player-icon-playmdpi"
                      >
                </i>
                播放
              </div>
              <div v-show="isPlay">
                <i class="iconfont Player-icon-pausemdpi"
                   >
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
      <div v-if="type==='singer'" class="headPart">
        <img  v-show="!isloding"
              class="singerImgShadow coverimgLittle"
              :src="listData?.pic+'?param=300y300'"
              alt=""
              @load="isloding=false"
        >

        <img  v-show="!isloding"  class="coverimg singerImg"
              :src="listData?.pic+'?param=200y200'"
              alt=""
              @load="isloding=false"
        >
        <div class="coverimg singerImg playlistimg"  v-show="isloding===true"   alt=""></div>
        <div class="text" >
          <div class="title"
               ref="pageTitle"
               @click.self="showDialog=!showDialog">
            {{listData.title.trim()}}
          </div>
          <div class="type">
            {{typeName[type]}}
          </div>
          <div class="type">
            {{artistsInfo.musicSize}}首歌 {{artistsInfo.albumSize}}张专辑 {{artistsInfo.mvSize}}个MV
          </div>
          <div class="tags">
            <div class="tag"
                 v-for="tag in listData.tags">
              {{tag}}
            </div>
          </div>
          <div class="info" @click="showDialog=!showDialog"> {{ listData.description }} </div>
          <div class="playListActions">
            <div class="playAll" @click="playAll()">
              <div v-show="!isPlay">
                <i class="iconfont Player-icon-playmdpi"
                >
                </i>
                播放
              </div>
              <div v-show="isPlay">
                <i class="iconfont Player-icon-pausemdpi"
                   >
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

      <div class="back">
        <li class="item_li_group"  v-if="type==='singer'">
          <div class="recentAlbum">
            <div class="type_title"> 最近专辑 </div>
            <div class="can">
              <squarebig_item
                  :firstone="artistAlbum[0]"
                  type="album"
              ></squarebig_item>
            </div>
          </div>
          <div class="recentMV">
            <div class="type_title"> 最近MV </div>
            <div class="can">
              <squarebig_item
                  :firstone="MVData?.mvs?.[0]"
                  type="MV"
              ></squarebig_item>
            </div>
          </div>
        </li>
        <li class="item_li"  >
          <div class="into_detail" v-if="type==='singer'" > 查看全部 </div>
          <div class="type_title" v-if="type==='singer'"> 热门单曲 </div>
          <div>
            <div v-if="type==='Radio'" >
              <div  style="padding: 0 10px" v-if="listData.list.length===0">
                <musiclittle_item
                    :info="RadioMainSong"
                    type="RadioMainSong"
                    :index="index+1"
                    :key="item?.id"
                ></musiclittle_item>
              </div>
            </div>
            <div  style="padding: 0 10px" v-if="listData.list.length!==0">
              <musiclittle_item v-for="(item,index) in listData.list"
                                :info="item"
                                type="songs"
                                :index="index+1"
                                :key="item?.id"
              ></musiclittle_item>
            </div>
            <div v-else  class="emptyInfo">
              <div v-if="type!=='Radio'">您还没有收藏歌曲</div>
            </div>
            <div class="footerInfo" v-if="listData.list.length!==0&&type!=='singer'">
      <span v-if="currentRoutePath.indexOf('newAlbum')!==-1">
         ·  共{{ listData.list.length }}首音乐 · 专辑发布于{{formtTime}} <br>© {{ albumCompany }}
      </span>
              <span v-else>
        ·  共{{ listData.list.length}}首音乐 · 最后更新于{{formtTime}}
      </span>
            </div>
          </div>
        </li>
        <li class="item_li"  v-if="type==='singer'">
          <div class="type_title" > 专辑 </div>
          <div class="content_album" >
            <square_item v-for="albums in artistAlbum"
                    :info="albums"
                    :key="albums"
                    com_type="album"
            ></square_item>
          </div>
        </li>
        <li class="item_li"  v-if="type==='singer'">
          <div class="type_title" > MV </div>
          <div class="content_album" >
            <squarebig_item
                v-for="item in MVData?.mvs"
                :firstone="item"
                :key="'MV'+item.id"
                type="MV"
            ></squarebig_item>
          </div>
        </li>
        <li class="item_li"  v-if="type==='singer'">
          <div class="type_title" > 相似歌手 </div>
          <div class="content_album" >
            <square_item v-for="artist in simiData"
                    :info="artist"
                    :key="artist.id"
                    com_type="artist"
            ></square_item>
          </div>
        </li>
        <li class="item_li"  v-if="type==='newAlbum'">
          <div class="type_title" > 更多专辑 </div>
          <div class="content_album" >
            <square_item v-for="albums in simiData"
                    :info="albums"
                    :key="albums"
                    com_type="album"
            ></square_item>
          </div>
        </li>
      <div class="steppingStones"></div>
    </div>
    </div>
</template>
<script>
import {artist_mv,simi_mv,simi_artist,artist_album,artist_songs,artists,playlist_detail,artist_detail,playlist_subscribe,likelist,dj_program_detail,album,song_detail} from 'network/music'
import musiclittle_item from "items/musiclittle_item";
import store from "../../../store/store";
import Cover_dialog from "../../common/Vam_Layout/cover_dialog";
import Squarebig_item from "items/squarebig_item";
import square_item from 'items/square_item'
import {mapState} from "vuex";
import {timeDateTrans} from "utils/tools";
import {listInit} from "utils/isPlayable";
import {isThisSongPlayable, isTrackPlayable} from "utils/isPlayable";

export default {
name: "detail_page",
  components: {Cover_dialog, musiclittle_item,Squarebig_item,square_item},
  data(){ return{
    isPlay:false,
    id:Number,
    type:'',
    isloding:true,
    showDialog:false,
    subscribed:false,
    albumCompany:'',
    RadioMainSong:'',
    artistAlbumLimit:10,
    artistAlbum:[],
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
    artistsInfo:{},
    listIds:[],//我喜欢的列表数据
    typeName:{
      'playlist':'播放清单',
      'newAlbum':'专辑',
      'singer':'歌手',
      'Radio':'电台节目',
      'myList':'播放清单'
    },
    MVData:{},
    simiData:[],
  }},
  computed:{
  ...mapState({
    isLogin:state=>state.user.isLogin,
    userInfo:state => state.user.userinfo,
    playState:state => state.musicplay.isPlay,
    currentPlayMusic:state=>state.musicplay.musicID,
    playlist:state=>state.musicplay.musicList
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
           // dj_detail(result.data.program.radio.id).then(result =>{
           //   console.log(result)
           // })
           this.setDataList(
               //list,title,author,avatarUrl,tags,picUrl,description,shareCount,subscribed,subscriberCount,updateTime,updateFrequency
               result.data.program.songs,
               result.data.program.name,
               result.data.program.dj,
               ['电台节目'],
               result.data.program.coverUrl,
               result.data.program.description,
               result.data.program.shareCount,
               result.data.program.subscribed,
               result.data.program.subscribedCount,
               result.data.program.createTime,
               false,
               result.data.program.privileges,
           )
           this.RadioMainSong=isThisSongPlayable( result.data.program.mainSong)
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
             result.data.playlist.creator,
             result.data.playlist.tags,
             result.data.playlist.coverImgUrl,
             result.data.playlist.description,
             result.data.playlist.shareCount,
             result.data.playlist.subscribed,
             result.data.playlist.subscribedCount,
             result.data.playlist.updateTime,
             result.data.playlist.updateFrequency,
               result.data.privileges,
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
               result.data.album.artist,
               [result.data.album.subType],
               result.data.album.picUrl,
               result.data.album.description,
               result.data.album.info.shareCount,
               false,
               false,
               result.data.album.publishTime,
               false,
               [],
           )
           this.albumCompany = result.data.album.company
           artist_album(result.data.album.artist.id,this.artistAlbumLimit).then(res=>{
             this.simiData=res.data.hotAlbums
           })
         }).catch(error=>{console.log("专辑详情获取失败"+error);});
         break;
       }
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
          const order = 'hot'
         artists(newId).then(res=>{
           this.artistsInfo = res.data.artist
           this.setDataList(
               res.data.hotSongs,
               res.data.artist.name,
               {id:res.data.artist.id,avaterUrl:res.data.artist.img1v1Url},
               [],
               res.data.artist.img1v1Url,
               res.data.artist.briefDesc,
               '',
               '',
               '',
               '',
               [],
           )
         })
         artist_album(newId,this.artistAlbumLimit).then(res=>{
           this.artistAlbum=res.data.hotAlbums
         })
         simi_artist(newId).then(res=>{
           this.simiData = res.data.artists
         })
         artist_mv(newId).then(res=>{
           this.MVData = res.data
         })
         //获取歌单详情
         /*artist_detail(newId).then(result1 => {
           console.log(this.listData)
           console.log(result1)

           return result1
         }).then(result1=>{
           artist_songs(newId,order).then(res=>{
             this.setDataList(
                 res.data.songs,
                 result1.data.data.artist.name,
                 result1.data.data.user,
                 result1.data.data.secondaryExpertIdentiy,
                 result1.data.data.artist.cover,
                 result1.data.data.artist.briefDesc,
                 '',
                 '',
                 '',
                 '',
             )
           })
         }).catch(error=>{console.log("歌手信息"+error);});*/
         break;
       }
     }
   },
    playState(newState){
      this.isPlay = newState && this.listData.list.filter(item =>item.id===this.currentPlayMusic).length>0;
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
    setDataList(...[list,title,author,tags,picUrl,description,shareCount,subscribed,subscriberCount,updateTime,updateFrequency,privileges]){
      //,privileges,this.isLogin,this.userInfo  vipType
      this.listData.title=title
      this.listData.author=author
      this.listData.tags=tags
      this.listData.pic=picUrl
      this.listData.description=description
      this.listData.list=listInit(list,privileges)
      this.subscribed=subscribed
      this.listData.subscribers=subscriberCount
      this.listData.shareCount=shareCount
      this.listData.updateTime=updateTime
      this.listData.updateFrequency=updateFrequency
      this.isPlay = this.playState && list.filter(item =>item.id===this.currentPlayMusic).length>0;
    },
    addToLike(){
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
    playAll:async function(){
      if(
          this.listData.list.filter(item =>item.id===this.currentPlayMusic).length===0
      ){this.isPlay = !this.isPlay
        await this.$audio.pause()
          this.$audio.setPlaylist(this.listData.list )
          const music = this.listData.list.filter(item=>item.playable!==false)
          if(music.length>0){
            await this.$audio.setUrl(music[0].id,music[0].name,music[0].ar,music[0].al.picUrl,music[0])
            this.$audio.play()
          }else {
            this.handleError('无可用音乐资源')
          }
      }else {
        this.isPlay && this.$audio.pause()
        !this.isPlay && this.$audio.play()
      }
    },
    toAutherPage(){
      if(this.type==='newAlbum')
      this.$router.push({
        name: 'artistDetail',
        params: {
          type:'singer',
          id: this.listData.author.id
        }
      })
    },
    handleError(msg){
      this.$msgbox.msgbox(msg,200)
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.type= this.$route.params.type;
    this.$refs.mainPage.addEventListener('scroll',this.handleScroll)
  }
}
</script>
<style scoped>
@import "~assets/css/detailpage.css";
.playlistimg{
 border-radius: 8px;
  background-image: url("~assets/img/coverimg.png");
}
.detailPage{
  position: relative;
  height:calc( 100% - 60px) ;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
}
.headPart{
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.coverimg{
  border-radius: 10px;
  transition: .5s;
  flex-shrink: 0;
  box-shadow:0 0 10px  #D9D9D9;
  z-index: 2;
}
.coverImgShadow,.singerImgShadow{
  position: absolute;
  top: 40px;
  left:0 ;
  opacity: .5;
  filter: blur(15px);
  z-index: 1;
  transform: matrix(0.92, 0, 0, 0.96, 0, 0);
}
.singerImgShadow{
  border-radius: 45%;
  margin: 0px 20px 20px 40px;
  width: 220px;
  height: 220px;
}
.singerImg{
  border-radius: 50%;
  margin: 20px 20px 20px 30px;
  width: 230px;
  height: 230px;
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
  font-family:Barlow-Medium,"PingFang SC";

}
.tags,.playListActions{

  margin-bottom: 10px;
  display: flex;
  font-family: var(--VamFont);
}
.playListActions{
  padding-top: 20px;
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.coverimgLittle{
  width: 250px;
  height: 250px;
  margin-left: 20px;
}

.title{
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -1px;
  margin-top: 5px;
  font-size: 28pt;
  font-weight: 800;
  color: black !important;
  font-family: circularBold;
  margin-bottom: 30px;
}
.info{
  width: 90%;
  max-height: 120px;
  color: #454F63;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-family: PingFang Light;
  font-weight: bold;
  min-height: 40px;
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
  position: relative;
  color: #646A76;
  width: 80%;
  margin-left: -30px;
  height: 20px;
  padding-top: 20px;
  line-height: 20px;
  text-align: left;
  font-family: Barlow-Medium,var(--VamFont);
  transform: scale(.85);
}
.moreActions ,.playAll,.like_btn,.dislike_btn{
  height: inherit;
  text-align: center;
  border-radius: 8px;
  transition: .6s;
}

.type_title{
  font-size: 14pt;
  margin-bottom: 20px;
}

.recentAlbum,.recentMV{
  width: 50%;
}
.recentMV{

}
.content_album{
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
}
.content_album .item_self {
  margin-bottom: 20px;
}
</style>

