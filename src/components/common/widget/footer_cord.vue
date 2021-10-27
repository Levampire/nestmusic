<template>
    <transition name="cardenter" >
      <playlist-card  v-show="showPlaylist" :style="{position:'fixed',left:playlist_pos.x-220+'px',bottom:'85px',zIndex:'-2'}" ></playlist-card>
    </transition>

  <div class="songInfo">
    <img :src="coverImg+'?param=70y70'" alt="" class="coverImg" loading="lazy">
    <div class="textInfo" >
      <div class="songname">{{ songName }}</div>
      <div class="singer"
           @click="toSingerPage()"
      >{{ artist.trim() }}
      </div>
    </div>
  </div>
  <div class="progressbar">
    <div class="btnGroup">
      <i class="iconfont Player-icon-randommdpi"
         :style="{color:[isRandom===true?'var(--Main_blue)':'rgba(0,0,0,.8)']}"
         :class = "[isRandom===true?'randomISON':'']"
         @click="RandomStateChange()"
      ></i>
      <i class="iconfont Player-icon-lastmdpi"
         @click="lastSong()"></i>
      <i class="iconfont Player-icon-playmdpi"
         @click="play()"
         v-show="$store.getters['musicplay/getPlayState']===false">
      </i>
      <i class="iconfont Player-icon-pausemdpi"
           @click="pause()"
         v-show="$store.getters['musicplay/getPlayState']===true" >
      </i>

      <i class="iconfont Player-icon-nextmdpi"
         @click="nextSong()">
      </i>

      <i class="iconfont "
         :class = "[loopMode!==0?'loopISON':'']+' '+[loopMode===1?'Player-icon-Player-icon-loopOnemdpi':' Player-icon-Player-icon-loopmdpi']"
         @click="loopModeChange()"
      ></i>
    </div>
    <div class="progress">
      <div class="time">{{timeTrans(currentTime)}}</div>
      <div class="progress_bar">
        <progress-bar style="width: inherit"
                      :progress="(currentTime/maxTime)*100"
                      type="audio"></progress-bar>
      </div>

      <div class="time">{{timeTrans(maxTime)}}</div>
    </div>
  </div>

  <div class="other">
    <div class="progress_volume">
    <i v-show="volume>0.8"  class="iconfont Player-icon-maxmdpi" ></i>
    <i v-show=".1<volume&&volume<0.8"  class="iconfont Player-icon-lowmdpi" ></i>
    <i v-show="volume<0.1"  class="iconfont Player-icon-mutemdpi" ></i>
    <progress-bar class="progress_bar"
                  type="volume"
                  :progress="volume*100">
    </progress-bar>
  </div>

  <div class="playlist"
         ref="btn_playlist"
         @click="showPlaylistCard">  <i class="iconfont Player-icon-list1"></i>
  </div>
  <div class="like"
        @click="addInLikeList()">
      <i v-if="ids.indexOf(currentID)!==-1"
             class=" iconfont Player-icon-LIKE"
    ></i>
      <i v-if="ids.indexOf(currentID)===-1"
           class="iconfont Player-icon-enshrine"
      ></i></div>
    <div class="playlist"
         @click="showLyrics">  <i class="iconfont Player-icon-a-untiegps"></i>
    </div>
  </div>
  <AudioPlay ></AudioPlay>
</template>

<script>
import {mapState} from 'vuex'
import ProgressBar from "./progressBar";
import playlistCard from "widget/playlistCard.vue";
import {timeTrans,artistsNameComB} from 'utils/tools'
import AudioPlay from "./AudioPlay";
import {song_like} from "network/music";
export default {
name: "footer_cord",
  components: {AudioPlay, ProgressBar,playlistCard},
  data(){
  return{
    playlist_pos:{},
    coverImg:'',
    songName:'',
    artist:'',
    showPlaylist:false,
    musicVolume:10,
    ids:[],
    timer:setInterval,
   }
  },
  methods:{
    timeTrans(num){ return  timeTrans(num)  },
    play(){ this.$audio.play()  } ,
    pause(){  this.$audio.pause() },
    RandomStateChange(){this.$store.commit('musicplay/isRandom')},
    loopModeChange(){this.$store.commit('musicplay/loopMode')},
    nextSong:async function(){
      let  tempList;
      if(!this.isRandom){
        tempList = this.musicList
      }else{
        tempList = this.RandomList
      }
      const currentIndex = tempList.findIndex(item=>item.id===this.currentID)
      let nextSong;
      if(tempList.length>2&& tempList[currentIndex+1]!==undefined){
        clearInterval(this.Timer)
          //当前列表项index
          nextSong =  tempList[currentIndex+1]
      }else{
        nextSong =  tempList[0]
        }
      this.$audio.pause()
      await this.$audio.setUrl(nextSong.id,nextSong.name,nextSong.ar,nextSong.al.picUrl,nextSong)
      this.$audio.play()
    },
    lastSong:async function(){
      let  tempList;
      if(!this.isRandom){
        tempList = this.musicList
      }else{
        tempList = this.RandomList
      }
      const currentIndex = tempList.findIndex(item=>item.id===this.currentID)
      let lastSong;
      if(tempList&&currentIndex>0){
        clearInterval(this.Timer)
          //当前列表项index
          lastSong  =  tempList[currentIndex-1]
      }else{
        lastSong  =  tempList[this.musicList.length-1]
        }
      this.$audio.pause()
      await this.$audio.setUrl(lastSong.id,lastSong.name,lastSong.ar,lastSong.al.picUrl,lastSong)
      this.$audio.play()
    },
    showPlaylistCard(){
      this.playlist_pos = this.$refs.btn_playlist.getBoundingClientRect()
      this.showPlaylist=!this.showPlaylist
    },
    addInLikeList(){
      if(this.ids.indexOf(this.currentID)!==-1){
        song_like(this.currentID,false).then(res=>{
          if (res.data.code===200){
            let ids = window.localStorage.getItem('idOfLovedOnes').split(',').map(item=>{return parseInt(item)});
            ids = ids.filter(item=>{
              return item!==this.currentID})
            this.$store.commit('user/setIdOfLovedSongs',ids)
          }
        }).catch(err=>{
          this.handleError(err)
        })
      }else{
        song_like(this.currentID,true).then(res=>{
          if (res.data.code===200){
            let ids = window.localStorage.getItem('idOfLovedOnes').split(',');
            ids = ids.map(item=>{return parseInt(item)})
            ids.push(this.currentID)
            this.$store.commit('user/setIdOfLovedSongs',ids)
          }
        }).catch(err=>{
              this.handleError(err)
            }
        )
      }
    },
    showLyrics(){
      let index = 0,offset = 0
      const bottom = document.documentElement
      let bottomOfWindow = Math.floor(bottom.scrollHeight - bottom.scrollTop)  ;


      this.timer=setInterval(
          ()=>{
            index+=offset
            if(offset>=bottomOfWindow/1.5){
              offset-=.5
            }else {offset+=.5}

            index<bottomOfWindow &&  window.scrollTo(0,index )
          },60/1000
      )
        bottomOfWindow  === bottom.clientHeight && clearInterval(this.timer)
    },
    toSingerPage(){
     const id =   this.musicInfo.ARTISTS[0].id
      this.$router.push({
        name: 'artistDetail',
        params: {
          type:'singer',
          id:id
        }
      })
    },
    handleError(msg){
      this.$msgbox.msgbox(msg,200)
    }
  },
  computed:{
  ...mapState({
       currentTime:state => state.musicplay.currentTime,
       musicInfo:state => state.musicplay.musicInfo,
       maxTime:state => state.musicplay.maxTime,
       volume:state => state.musicplay.volume,
       musicList:state => state.musicplay.musicList,
      currentID:state => state.musicplay.musicID,
      loopMode :state => state.musicplay.loopMode,
      isRandom :state => state.musicplay.isRandom,
      RandomList :state => state.musicplay.randomList,
     idOfLovedList: state => state.user.idOfLovedSongs
   }),
  },
  watch:{
    musicInfo:function (newState){
      // console.log('状态');
      // console.log(newState);
      this.songName=newState.NAME
      this.artist=artistsNameComB(newState.ARTISTS)
      this.coverImg=newState.PICURL
    },
    volume:function (newLevel){
      this.musicVolume = newLevel
    },
    idOfLovedList:function (ids){
      this.ids=ids
    }
  },
  mounted() {
    // this.songName=this.musicInfo.NAME
    // this.artist=artistsNameComB(this.musicInfo.ARTISTS)
    // this.coverImg=this.musicInfo.PICURL
  }
}
</script>

<style scoped>
.cardenter-enter-active ,.cardenter-leave-active {
  transition: all .3s cubic-bezier(0.4,0.5,0.6,0.9);
  opacity: 1;
}
.cardenter-enter-from, .cardenter-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(500px);
  opacity: 0 ;
}
.coverImg{
  height: 50px;
  width: 50px;
  margin-left: 20px;
  border-radius: 5px;
}
.songInfo{
  height: 80%;
  font-family: Barlow-Medium,var(--VamFont);
  transition: .5s ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 25%;
 }
.textInfo{
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
}
.songname{
  font-size: 12pt;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
.singer {
  font-size: 10pt;
  width: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: .5s;
}
.singer:hover{
  border-radius: 5px;
  background-color: rgba(220,220,220,.7);
  transition: .5s;
}
.btnGroup{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 18px;
  padding: 0 20px 0 10px;
  margin: 10px 0 10px 0;
}
.btnGroup i:hover{
  background-color: rgba(220,220,220,.7);
  color: var(--Main_blue);
}
i{
  padding: 8px;
  background-size: cover;
  font-size: 12pt;
  border-radius: 5px;
  transition: .6s;
  color: rgba(0,0,0,.8);
}
.Player-icon-nextmdpi,.Player-icon-lastmdpi{
  font-size: 13pt;
}
.Player-icon-Player-icon-loopmdpi,.Player-icon-Player-icon-loopOnemdpi,{
  width: 18px;
  height: 16px;
}
.randomISON,.loopISON{
  color: var(--Main_blue);
  transition: .3s cubic-bezier(.31,.97,.74,.63);
}
.Player-icon-loopOnemdpi{
  background-color: rgba(220,220,220,.7);
  transition: .3s cubic-bezier(.31,.97,.74,.63);
}
.progressbar{
  height: calc(100% - 10px);
  z-index: 1;
  width: 50%;

}
.other{
  z-index: 1;
  height: 90%;
  width: 25%;
}

.progress{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.time{
  font-size: 10pt;
  margin: 0 10px 0 10px;

}
.progress_bar{
  flex: 1;
}
.progress_volume{
  height: 90%;
  float: right;
  margin: 5px 20px 5px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 120px;
}
.playlist{
  float: right;
  display: flex;
  align-items: center;
  height: 70px;
  width: 10%;
}
.like{
  float: right;
  display: flex;
  align-items: center;
  height: 70px;
  width: 10%;
  font-size: 10pt;
}
.like i{
  width: 18px;
  height: 16px;

}
.like i:hover{
  background-color: rgba(220,220,220,.7);
}
.Player-icon-LIKE{
  color: #f34c48;
  font-size: 10pt;
}
</style>
