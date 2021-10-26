<template>
  <div class="item_self"
       @mousedown=" startPos = $event.target.getBoundingClientRect()"
       @mouseenter="MouseisOn()"
       @mouseleave="MouseLeave() "
       @mouseup="toDetailPage($event)"
       @click.stop >
    <div >
      <img :src="coverImg+'?param=180y180'"
           loading="lazy"
           :class="[com_type==='artist'?'artimg':'songimg']"
           oncontextmenu="return false;"
           ondragstart="return false;"
           alt="">
      <div v-if="info.creator" class="tag">{{ tag }}</div>
      <label class="title">{{ title }}</label>
      <label class="info">{{ detail }}</label>
    </div>
<!-- //播放按钮-->
    <transition v-if="com_type!=='artist'&&com_type!=='user'" name="play_cover">
      <div v-show="isOn"
           @mouseover="isOnPlayBtn = true"
           @mouseleave="isOnPlayBtn = false"
           @click="clickPlay()"
           @click.stop.prevent
           class="play_btn"
           :class="[!isPlay?'play_cover':'pause_cover']">
      </div>
    </transition>
  </div>
</template>
<script>
import {playlist_detail} from 'network/music'
import {mapState} from "vuex";
import {dj_program_detail} from "network/music";

export default {
  name: "square_item",
  props: {
    info: {
      type: Object,
      default: function (){
        return {}
      }
    },
    com_type: {
      type: String
    }
  },
  computed:{
    ...mapState({
      playState:state => state.musicplay.isPlay,
      musicID:state => state.musicplay.musicID,
      PlaylistID:state => state.musicplay.PlaylistID
    })
},
  data() {
    return {
      //触发
      startPos:{},
      endPos:{},
      isPlay:false,
      isOn: false,
      isOnPlayBtn:false,
      currentMusicID:0,
      currentPlaylistID:0,
      dj_program_detail:[],
      //数据
      title:'nie',
      coverImg:'eee',
      tag:'ee',
      detail:'',
    }
  },
  watch:{
    playState:function (newstate){
      if(this.isPlay!==newstate && this.currentPlaylistID===this.info.id){
        this.isPlay = newstate
      }
      if(this.com_type==='user_playlist_dj'&&this.currentMusicID === this.dj_program_detail.id){
        console.log('ok')
        this.isPlay = newstate;
      }
    },
    musicID:function (currentMusicID){
      this.currentMusicID=currentMusicID
      this.isPlay = this.musicID === this.dj_program_detail.id;
    },
    PlaylistID:function (currentPlaylistID){
      this.currentPlaylistID=currentPlaylistID
    }
  },
  methods: {
    toDetailPage(e){
      const typeName={
        'user_playlist':{
          router:'playlistDetail',
           type :'playlist',
           id  :this.info.id
        },
        'radio':{
          router:'playlistDetail',
          type :'Radio',
          id   :this.info.id
        },
        'user_playlist_dj':{
          router:'playlistDetail',
          type :'Radio',
          id   :this.info.id
        },
        'artist':{
          router:'artistDetail',
          type :'singer',
          id   :this.info.id
        },
        'album':{
          router:'albumDetail',
          type :'newAlbum',
          id   :this.info.id
        },

      }
        //防止滑动触发click
        this.endPos = e.target.getBoundingClientRect()
        if(Math.abs(this.endPos.x-this.startPos.x) < 7 && this.isOnPlayBtn === false){
          this.$router.push({
            name:typeName[this.com_type].router ,
            params: {
              type:typeName[this.com_type].type,
              id:typeName[this.com_type].id
            }
          })
        }
    },
    MouseisOn() {this.isOn = true;},
    MouseLeave() { this.isOn = false;},
    clickPlay(){
      if(!this.isPlay){
        switch (this.com_type){
          case 'user_playlist':  {
            playlist_detail(this.info.id).then(result => {
              this.$audio.pause()
              this.$audio.setPlaylist(result.data.playlist.tracks,this.info.id)
              const music = this.$store.getters['musicplay/getMusicList']
              this.$audio.setUrl(music[0].id,music[0].name,music[0].ar,music[0].al.picUrl,music[0])
            }).then(()=>{
              this.$audio.play()
              this.isPlay=true
            }).catch(error=>{console.log("歌单详情获取失败"+error);});

            // this.$audio.play(music[0].id,music[0])
            break;
          }
          case 'user_playlist_dj':{
            dj_program_detail(this.info.id).then(result => {
              const song = result.data.program.mainSong
              this.dj_program_detail = result.data.program.mainSong
              this.$audio.pause()
              this.$audio.setUrl(song.id,song.name,song.artists,song.album.picUrl)
            }).then(()=>{
              this.$audio.play()
            })
            break;
          }
          case'songs':{
            console.log('songs')
            console.log(this.info)
          }
        }
      }else {
        this.isPlay=false
        this.$audio.pause()
      }
    }
  },
  mounted() {
    switch (this.com_type) {
      case "song":{
        this.title = this.info.name ;
        this.coverImg = this.info.img1v1Url;
        this.detail = '单曲';
        break;
      }
      //艺人
      case "artist":{
        this.title = this.info.name;
        this.coverImg = this.info.img1v1Url;
        this.detail = '艺人';
        break;
      }
      //用户
      case "user":{
        this.title = this.info.nickname;
        this.coverImg = this.info.avatarUrl;
        this.detail = "用户";
        break;
      }
      //歌单
      case "playlist":{
        this.title = this.info.name;
        this.coverImg = this.info.coverImgUrl;
        this.detail = this.info.creator.nickname;
        break;
      }
      //用户每日推荐
      case "user_playlist" : case'user_playlist_dj':{
        this.title = this.info.name;
        this.coverImg = this.info.picUrl||this.info.coverImgUrl;
        this.detail = this.info.copywriter
        this.tag = this.info.creator? this.info.creator.nickname:''
        break;
      }
      //专辑
      case "album":{
        this.title = this.info.name;
        this.coverImg = this.info.picUrl;
        this.detail = this.info.artist.name
        this.tag = this.info.type
        break;
      }
        //电台
      case "radio":{
        this.title = this.info.name;
        this.coverImg = this.info.picUrl;
        this.detail = this.info.dj.nickname
        this.tag = this.info.category
        break;
      }
        //用户播放记录
      case "userRecord":{
        this.title = this.info.name;
        this.coverImg = this.info.picUrl;
        this.detail = this.info.dj.nickname
        this.tag = this.info.category
        break;
      }
    }
  }
}
</script>

<style scoped>
.item_self {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  /*不被挤压*/
  flex-shrink: 0;
  padding:10px 5px 10px 5px;
  margin-left: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  min-height: 220px;
  width: 170px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(80, 80, 80, .1),
  0 0 15px rgba(220, 220, 220, .1);
}

.item_self:hover {
  background-color: rgba(255, 255, 255, 1);
}

img {
  width: 160px;
  height: 160px;
}
.artimg {
  border-radius: 80px;
}
.songimg {
  border-radius: 5px;
}

.tag {
  width:fit-content ;
  margin: 0 0 2px 5px;
  color: var(--Ligth_Text);
  background-color: #5FDEAD;
  border-radius: 2px;
  height: 20px;
  line-height: 1.3rem;
  font-weight: bolder;
  padding: 0 2px 0 2px;
  font-size: 8pt;
  overflow: hidden;
  transform: scale(.9) translateX(-2px);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.title {
  text-align: left;
  display: inline-block;
  width: 160px;
  height: 1.5rem;
  line-height: 1.5rem;
  color: var(--title_text);
  font-weight: 800;
  max-lines: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.info {
  margin-left: 5px;
  width: inherit;
  color: var(--title_text);
  text-align: left;
  font-size: 8pt;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden
}
.play_btn{
  position: absolute;
  right: 0;
  top: 200px;
  height: 70px;
  width: 70px;
  transition: .3s;
  background-size: cover;
  transform: translateY(-90px);
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
  transform: translateY(-75px) scale(.8);
  opacity: .0;

}
</style>
