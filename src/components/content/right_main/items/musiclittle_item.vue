<template>
 <div
      @mousedown=" startPos = $event.target.getBoundingClientRect()"
      @mouseover="isOn=true"
      @mouseleave="isOn=false"
      @mouseup.self="clickPlay($event)"
      :class="[type==='toplist'?'item_self':(!isPlay?'item_self':'item_self_play')]"
     >
   <div v-if="type==='songs'" class="index" >
     {{index}}
   </div>
   <transition name="play">
     <div v-show="isOn&&currentRoutePath.indexOf('newAlbum')===-1"
          @mouseover="isOnPlayBtn = true"
          @mouseleave="isOnPlayBtn = false"
          class="play_btn"
          :style="{left:type==='songs'?'54px':'24px'}"
          :class="[!isPlay?'play':'pause']">
     </div>
   </transition>
   <img class="coverImg"
        v-if="currentRoutePath.indexOf('newAlbum')===-1"
        loading="lazy"
        :src="coverImg+'?param=40y40'"
        oncontextmenu="return false;"
        ondragstart="return false;"
        alt=""/>
   <div v-if="type==='toplist'" class="ranking">{{ranking+1}}</div>
   <div class="info" @click="clickPlay($event)">
     <div class="songsname" >{{ songname }}</div>
     <div class="singer"
          v-if="currentRoutePath.indexOf('newAlbum')===-1"
          @click.stop="toSingerPage()" >{{ singer}}</div>
   </div>
   <div v-if="type==='songs'||type==='diskSongs'" class="info" @click="clickPlay($event)">
     <div class="songsname albumName" v-if="currentRoutePath.indexOf('newAlbum')===-1" @click.stop="toAlbumPage()">{{ albumName }}</div>
   </div>
   <div v-if="type==='songs'&& ids.indexOf(info.id)!==-1"
        class="collection iconfont Player-icon-LIKE"
        @click="removeFromLikeList()"
   ></div>
   <div v-if="type==='songs'&& ids.indexOf(info.id)===-1"
        class="collection iconfont Player-icon-enshrine"
        @click="addToLikeList()"
   ></div>
   <div v-if="type==='songs'" class="time">{{formatMaxTime}}</div>
   <div v-if="type==='toplist'" class="rankState">
     <img  class="rankinfo" src="" alt="">
   </div>
   <div v-if="type==='diskSongs'" class="delete">
     <img  class="iconfont Player-icon-shanchu" src="" alt=""
     @click="deleteDiskMusic()">
   </div>
 </div>
</template>

<script>
import {mapState} from "vuex";
import {song_like} from "network/music";
import {timeTrans} from "utils/tools";
import {artistsNameComB} from "utils/tools";

export default {
  name: "musiclittle_item",
  data() {
    return {
      startPos:{},
      endPos:{},
      id:'',
      isOn:false,
      isPlay:false,
      currentMusicID:0,
      coverImg:'',
      songname: '',
      albumName:'',
      singer: '',
      ids:[],
      maxTime:'',
      currentRoutePath:''
    }
  },

  props: {
    info: {
      type: Object,
      default: function () {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    },
    ranking:{
      type:Number,
      default:1
    },
    showAblum:{
      type:Boolean,
      default:false
    },
    index:{
      type:Number,
      default:0
    }
  },

  computed:{
    ...mapState({
      playState:state => state.musicplay.isPlay,
      musicID:state => state.musicplay.musicID,
      idOfLovedList: state => state.user.idOfLovedSongs
    }),
    formatMaxTime(){
      return timeTrans(Math.round(this.info.dt/1000))
    }
  },
  watch:{
    isPlay:function (state){
    },
    playState:function (newstate){
      if(this.isPlay!==newstate && this.currentMusicID===this.id){
        this.isPlay = newstate
      }
    },
    musicID:function (currentMusicID){
      this.currentMusicID=currentMusicID
    },
    idOfLovedList:function (ids){
      this.ids=ids
    }
  },
  methods:{
    clickPlay(e){
      console.log('play')
      this.endPos = e.target.getBoundingClientRect()
      if(Math.abs(this.endPos.x-this.startPos.x) < 7){
        this.handlePlay(!this.isPlay)
      }

    },
    handlePlay(state){
      state?this.setPlay(state):this.setPause();
    },
    setPause(){
        this.$audio.pause()
    },
    setPlay : async function(state){
      switch (this.type){
        case 'songs':{
          //更新播放列表
          this.$parent.updatePlaylist()
          this.$audio.pause()
          await this.$audio.setUrl(this.info.id,this.info.name,this.info.ar,this.info.al.picUrl,this.info)
          this.$audio.play()
          break
        }
        case 'toplist':{
          //更新播放列表
          this.$parent.updatePlaylist()
          this.$audio.pause()
          await this.$audio.setUrl(this.info.id,this.info.name,this.info.ar,this.info.al.picUrl,this.info)
          this.$audio.play()
          break
        }
        case 'diskSongs':{
          //更新播放列表
          this.$parent.updatePlaylist()
          this.$audio.pause()
          await this.$audio.setUrl(this.info.songId,this.info.fileName,this.info.simpleSong.ar,this.info.simpleSong.al.picUrl,this.info)
          this.$audio.play()
          break
        }
      }
    },
    toSingerPage(){
      this.$router.push({
        name: 'artistDetail',
        params: {
          type:'singer',
          id: this.info.ar[0].id
        }
      })
    },
    toAlbumPage(){
      this.$router.push({
        name: 'albumDetail',
        params: {
          type:'newAlbum',
          id: this.info.al.id
        }
      })
    },
    removeFromLikeList(){
      // console.log(this.info.id)
      song_like(this.info.id,false).then(res=>{
        if (res.data.code===200){
          let ids = window.localStorage.getItem('idOfLovedOnes').split(',').map(item=>{return parseInt(item)});
            ids = ids.filter(item=>{
              return item!==this.info.id})
            this.$store.commit('user/setIdOfLovedSongs',ids)
        }
      }).catch(err=>{
        this.handleError(err)
      }
      )
    },
    addToLikeList(){
      song_like(this.info.id,true).then(res=>{
        if (res.data.code===200){
         let ids = window.localStorage.getItem('idOfLovedOnes').split(',');
          ids = ids.map(item=>{return parseInt(item)})
          ids.push(this.info.id)
          this.$store.commit('user/setIdOfLovedSongs',ids)
        }
      }).catch(err=>{
            this.handleError(err)
          }
      )
    },
    handleError(msg){
      this.$msgbox.msgbox(msg,200)
    },
    deleteDiskMusic(){
      this.$parent.deleteDiskMusic(this.id)
    }
  } ,
  mounted() {
    this.ids = this.idOfLovedList;
    this.currentRoutePath = this.$route.path
    switch (this.type) {
      case "songs": {
        this.songname = this.info.name.trim()
        this.singer =artistsNameComB(this.info.ar)
        this.coverImg = this.info.al.picUrl
        this.albumName = this.info.al.name
        this.id = this.info.id
        break;
      }
      case "toplist":{
        this.songname = this.info.name
        this.singer = artistsNameComB(this.info.ar)
        this.coverImg = this.info.al.picUrl
        this.albumName = this.info.al.name
        this.id = this.info.id
        break;
      }
      case "diskSongs":{
        this.songname = this.info.fileName
        this.singer = this.info.artist
        this.coverImg = this.info.simpleSong.al.picUrl
        this.albumName = this.info.simpleSong.al.name
        this.maxTime = timeTrans(this.info.simpleSong.dt)
        this.id = this.info.songId
        break;
      }
    }
  },
}

</script>

<style scoped>
.item_self,.item_self_play{
  margin-left: 0px !important;
  /*不被挤压*/
  flex-shrink: 0;
  position: relative;
  border-radius: 5px;
  height: 60px !important;
  width: 100%;
  min-width: 200px;
  display: flex;
  flex-direction: row !important;
  align-items: center;
  transition: 0.3s ;
  color: var(--title_text);
}
.item_self:hover{
  background-color:#EAECED;
  transition: 0.3s ;
}
.item_self_play{
  color: var(--Main_blue);
  background-color:var(--btn_back_light);
  transition: 0.3s ;
}
.index{
  margin-left: 5px;
  width: 25px;
  font-size: 18px;
  color: #999999;
  font-family: LeagueGothic;
}
.ranking{
  font-size: 16pt;
  font-style: italic;
  line-height: 20px ;
  font-weight: bold;
  margin-right: 10px ;
  color: #42b983 ;
  font-family:"Century Gothic";
}
.rankinfo{
  height: 10px;
  width: 10px;
  background-color: #42b983;
  position: absolute;
  right: 15px;
  bottom: 26px;

}
.coverImg{
  margin: 10px ;
  height: 40px;
  width: 40px;
  border-radius: 5px ;
  box-shadow:0 0 10px  #D9D9D9;
  filter:brightness(80%);
}
.info{
  width: 38%;
  margin-right: 20px;
  text-align: left;
}
.songsname{
  line-height: 20px ;
  font-weight: bolder;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.singer{
  width: fit-content;
  height: 18px;
  font-size: 10pt;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid rgba(255,255,255,0.4);
  z-index: 980;
}
.albumName{
  border-bottom: 1px solid rgba(255,255,255,0.4);
  font-weight: unset;
  width: fit-content;
}
.singer:hover,.albumName:hover{
  border-bottom: 1px solid;
}
.time{
  position:absolute;
  right: 50px;
  font-size: 12pt;
  color: rgb(80,80,80);
  font-family: Barlow-Medium;
}
.collection{
  position:absolute;
  right: 100px;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.delete{
  position:absolute;
  right: 50px;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.play_btn{
  position: absolute;
  width: 20px;
  height: 20px;
  transition: .3s;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 1;
  color: var(--Main_blue);

}
.play-enter-active {
  transition: all .3s ease;
}

.play-enter-active {
  transition: all .3s ease;
}

.play-leave-active {
  transition: all .4s cubic-bezier(0.4, 0.5, 0.6, 0.9);
}

.play-enter, .play-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */
{
  transform:  scale(.8);
  opacity: .0;

}
.Player-icon-LIKE{
  font-size: 14px;
  color: #f34c48;
}
</style>
