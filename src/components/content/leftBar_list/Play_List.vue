<template>
  <div class="back">
    <div class="sidebar_title">
      {{sidebar_title}}
    </div >
    <div v-if="user_playlist.length<=0" class="item">
      <div class="tip" >您还没有收藏歌单</div>
    </div>
    <div v-else class="line"> </div>
      <div class="item list">
       <p v-for="item in user_playlist" @click="toPlaylist(item)">{{ item.name.trim()}}</p>
        <div class="steppingStones"></div>
      </div>
  </div>
</template>

<script>

import {user_playlist,playlist_detail} from "network/music";
import {dj_Todayperfered} from "network/home_page";

import {mapState} from "vuex"

export default {
  name: "Play_List",
  data(){
    return{
      islogin:false,
      sidebar_title:'',
      //最近播放
      user_playlist:[],
      //推荐热歌
      recommend_list:{}
    }
  },
  computed:{
    ...mapState({
      loginState:state => state.user.isLogin
    })
  },
  watch:{
    loginState:function (newState){
      this.islogin =  newState
    }
  },
  methods:{
    getrecord(){
      if(this.islogin){
        this.sidebar_title='我的歌单'
        const id =window.localStorage.getItem('userid')
        //获取最近播放 type=1 时只返回 weekData, type=0 时返回 allData
        user_playlist(id).then(result => {
          // console.log(this.$store)
          // console.log(result)
          window.localStorage.setItem('myMusicList',result.data.playlist[0].id)
          this.user_playlist = result.data.playlist.slice(1)
        }).then(
            playlist_detail(window.localStorage.getItem('myMusicList')).then(result => {
              const idOfLovedOnes = result.data.playlist.tracks.map(items =>{
                return items.id})
              this.$store.commit('user/setIdOfLovedSongs',idOfLovedOnes)
            }).catch(

            )
        ).catch(error=>{
          console.log(error)
        })
      }else{
        //获取推荐歌曲
        this.sidebar_title = '近期热门'
        //获取热门话题
        dj_Todayperfered().then(result => {
          console.log('今日推荐电台')
          console.log(result)
          this.user_playlist = result.data.data
          /*this.user_playlist = result.data.playlist
          console.log(this.user_playlist)*/
        }).catch(error=>{
          console.log(error)
        })
      }
    },
    toPlaylist(item){
      this.$router.push({
        name: 'playlistDetail',
        params: {
          type:'playlist',
          id: item.id
        }
      })
    }
  },
  mounted() {
    this.islogin = this.loginState;
    this.getrecord()
  }
}

</script>

<style scoped>
.back{
  height: 52%;
  overflow: hidden;
}
.list{
  overflow-y: scroll;
  height:100%;
}
.item p{
  width: 145px ;
  height: 30px;
  line-height: 30px;
  color: var(--info_text);
  font-size: 8pt;
  font-weight: 400;
  font-family: var(--VamFont);
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  text-align: left;
  transition: 0.2s cubic-bezier(0.2 ,0.4 ,.6, 0.8);
  margin: 0 0 0 15px;
  padding-left: 5px;
  border-radius: 5px;
}
.item p:hover{
  color: var(--Main_blue);
  background-color: #F8F9F9 ;
  transition: 0.2s cubic-bezier(0.2 ,0.4 ,.6, 0.8);

}
.line{
  margin-left: 20px;
  width: 145px;
  border-bottom: 1px solid var(--info_text);
  margin-bottom: 5px;
}
.tip{
  text-align: center;
  line-height: 200px;
  width: 100%;
  height: 200px;
  font-size: 10pt;
  color: var(--info_text);
}
::-webkit-scrollbar{
  display: unset;
}
.steppingStones{
  height: 100px;
}
</style>
