<template>
  <div class="item_self"
       @mousedown=" startPos = $event.target.getBoundingClientRect()"
       @mouseenter="MouseisOn()"
       @mouseleave="MouseLeave() "
       @mouseup="toDetailPage($event)"
       @click.stop
      >
      <div class="samllOne">
        <img :src="src"
             :class="[type==='MV'?'mvCover':'imgCover']"
             oncontextmenu="return false;"
             ondragstart="return false;"
             loading="lazy"
             alt="">
        <img :src="src"
             class="shadowImg"
             oncontextmenu="return false;"
             ondragstart="return false;"
             loading="lazy"
             alt="">
        <div class="squareitem_info" v-if="type!=='songs'">
          <label class="samllsongname">{{song?.replaceAll('&nbsp;',' ')}}</label>
          <label v-if="publishTime!==undefined" class="publishTime">发布于{{publishTime}}</label>
          <label v-if="type==='MV'" class="size">MV · {{artist}}</label>
          <label v-else class="size">{{firstone.type}} · {{firstone.size}}首歌</label>
        </div>
      </div>
      <div class="squareitem_info" v-if="type==='songs'">
        <label class="songname">{{song}}</label>
        <label class="artist">{{artist}}</label>
      </div>
      <label class="info"
             v-if="type==='songs'">
        单曲
      </label>
    <transition name="play_cover">
      <div v-show="isOn"
           @mouseover="isOnPlayBtn = true"
           @mouseleave="isOnPlayBtn = false"
           :class="[!isPlay?'play_cover':'pause_cover']"
           @click.stop.prevent
           @click="clickplay()">
      </div>
    </transition>
  </div>
</template>
<script>
import {mapState} from "vuex";
import {timeDateTrans} from 'utils/tools'
import {listInit} from "utils/isPlayable";
import {album} from "network/music";

export default {
  name: "squarebig_item",
  data(){
    return{
      //触发
      startPos:{},
      endPos:{},
      isOn:false,
      song:'',
      artist:'',
      src:'',
      id:'',
      isPlay:false,
      isOnPlayBtn:false,
    }
  },
  props:{
    firstone:{
      type:Object,
      default:function (){
        return{}
      }
    },
    type:{
      type:String,
      default:''
    }
  },
  computed:{
    ...mapState({
    playState:state => state.musicplay.isPlay,
    musicID:state => state.musicplay.musicID,
      currentPlayListID:state => state.musicplay.PlaylistID

  }),
    publishTime:function(){
      if(this.firstone.publishTime){
        if(this.type!=='MV'){
          return timeDateTrans(this.firstone.publishTime)
        }else{
          return this.firstone.publishTime.replaceAll('-','.')||''
        }
      }
    }
},
  methods:{
    loadData(newvalue){
      if(this.type==='MV'){
        this.song = newvalue?.name
        this.artist = newvalue?.artistName
        this.src=  newvalue?.imgurl16v9||newvalue.cover
      }else{
        this.song = newvalue?.al?.name||newvalue.name
        this.artist = newvalue?.ar?.[0]?.name||newvalue.artists?.[0].name;
        this.src=  newvalue?.al?.picUrl||newvalue.picUrl;
      }
    },
    MouseisOn(){
      this.isOn = true;
    },
    MouseLeave(){
      if(!this.isPlay){
        this.isOn = false;
      }
    },
    toDetailPage(e){
      const typeName={
            'user_playlist':{
              router:'playlistDetail',
              type :'playlist',
              id  :this.firstone.id
            },
            'radio':{
              router:'playlistDetail',
              type :'Radio',
              id   :this.firstone.id
            },
            'user_playlist_dj':{
              router:'playlistDetail',
              type :'Radio',
              id   :this.firstone.id
            },
            'artist':{
              router:'artistDetail',
              type :'singer',
              id   :this.firstone.id
            },
            'album':{
              router:'albumDetail',
              type :'newAlbum',
              id   :this.firstone.id
            },
            'MV':{
              router:'mvDetail',
              type :'mv',
              id   :this.firstone.id
            }
      }
      //防止滑动触发click
      this.endPos = e.target.getBoundingClientRect()
      if(Math.abs(this.endPos.x-this.startPos.x) < 7 && this.isOnPlayBtn === false){

        this.$router.push({
          name:typeName[this.type].router ,
          params: {
            type:typeName[this.type].type,
            id:typeName[this.type].id
          }
        })
      }
    },
    clickplay(){

      this.handlePlay(!this.isPlay)
    },
    handlePlay:async function(state){
      if(!this.isPlay){
        switch (this.type){
          case 'songs':{
            this.$parent.setPlaylist()
            //更新播放列表
             this.$audio.pause()
            await this.$audio.setUrl(this.firstone.id, this.firstone.name, this.firstone.ar, this.firstone.al.picUrl, this.firstone)
             this.$audio.play()
            break;
          }
          case 'album':{
            album(this.firstone.id).then(result => {
              this.playFirstOne(result.data.songs)
            })
            break
          }
        }
      }else {
        this.setPause()
      }

    },
    setPause(){
      console.log('ok')
      this.isPlay=false
      this.$audio.pause()
    },
    checkPlayable(list){
      const result = list.filter(item=>item.playable!==false)
      if(result.length===0) {
        this.handleError('没有可用音乐')
        return false
      } else{
        return result
      }

    },
    playFirstOne:async function(tracks){
      const vaild =  this.checkPlayable(listInit(tracks))
      if(vaild) {
        this.$audio.pause()
         await this.$audio.setPlaylist(vaild,this.firstone.id)
        await this.$audio.setUrl(vaild[0].id, vaild[0].name, vaild[0].ar, vaild[0].al.picUrl,vaild[0])
        this.$audio.play()
      }
    },
  },
  watch:{
    firstone:function (data){
      console.log('ok')
     this.loadData(data)

      // console.log('热搜')
      // console.log(newvalue)
    },
    playState:function (newstate){
      console.log('正在播放状态'+newstate+'当前播放ID'+ this.currentMusicID);
      if(this.isPlay!==newstate && this.currentMusicID===this.firstone.id){
        this.isPlay = newstate
      }
    },
    musicID:function (currentMusicID){
      this.currentMusicID=currentMusicID
      // console.log('当前ID'+this.currentMusicID);
    }
  },
  mounted() {
    this.loadData(this.firstone)
  }
}
</script>

<style scoped>
.item_self{
  position: relative;
  /*不被挤压*/
  flex-shrink: 0;
  padding: 10px 20px 10px 0;
  margin-left: 20px;
  width: 440px;
  border-radius: 5px;
  transition: 0.3s ;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;

}
.item_self:hover{
  background-color:#EAECED;
  transition: 0.3s ;
}
img{
  border-radius: 8px;
  width:130px ;
  height: 130px;
  float: left;
  margin-left: 10px;
}
.samllOne{
  width: 440px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.mvCover{
  width: 230px;
  z-index: 2;
}
.imgCover{
  z-index: 2;
}
.shadowImg{
  position: absolute;
  top: 10px;
  left:0 ;
  opacity: .5;
  filter: blur(15px);
  z-index: 1;
  transform: matrix(0.92, 0, 0, 0.96, 0, 0);
}
.songname{
  margin-bottom: 5px;
  display:inline-block;
  width: 100%;
  height: 2rem;
  line-height: 1.5rem;
  color: var(--title_text) ;
  text-align: left;
  max-lines: 1;
  font-weight: 800;
  font-size: 16pt;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.samllsongname{
  word-wrap: break-word;
  font-size: 18px;
  text-align: left;
  width: 100%;
}
.publishTime{
  font-size: 15px;
}
.size{
  font-size: 12px;
}
.artist{
  margin-bottom: 10px;
  display:inline-block;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  color: var(--title_text) ;
  text-align: left;
  max-lines: 1;
  font-size: 12pt;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info{
  position: absolute;
  right: 15px;
  top: 10px;
  background-color:rgb(95, 222, 173);
  border-radius: 5px;
  padding: 2px 10px 2px 10px;
  font-weight: bolder;
  font-size: 15pt;
  color: var(--title_text) ;
}
.play_cover,.pause_cover{
    position: absolute;
    right: -10px;
    bottom: -20px;
    height: 100px;
    width: 90px;
    transition: .6s ;
}

.squareitem_info{
  flex: 1;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  bottom: 5px;
  height: 130px;
  font-family: Barlow-Medium,"PingFang SC";
}
.play_cover-enter-active {
  transition: all .3s ease;
}

.play_cover-enter-active {
  transition: all .3s ease;
}

.play_cover-leave-active {
  transition: all .4s cubic-bezier(0.4, 0.5, 0.6, 0.9);
}

.play_cover-enter, .play_cover-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */
{
  transform: translateY(15px) ;
  opacity: .0;

}
</style>
