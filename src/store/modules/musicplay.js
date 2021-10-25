
// initial state
import {song_detail} from "../../network/music";

const state = () => ({
    musicUrl:"https://music.163.com/song/media/outer/url?id=1887190390.mp3",
    musicInfo:{},
    musicID:Number,
    PlaylistID:Number,
    musicList:{},
    isPlay:false,
    isRandom:false,
    randomList:[],
    RecentList:JSON.parse(window.localStorage.getItem('musicRecord'))||[],
    loopMode:0,// 0关闭 1 single单曲循环,2 all列表循环, 默认 1
    maxTime:'300',
    currentTime:'0',
    progress:0,
    volume:0
})
// mutations
const mutations = {
    setUrl(state,[ID,NAME,ARTISTS,PICURL]){
        state.musicUrl = 'https://music.163.com/song/media/outer/url?id='+ID+'.mp3'
        state.musicID = ID
        state.musicInfo = {NAME,ARTISTS,PICURL};
    },
    setPlay(state){ state.isPlay = true;
    },
    setPause(state){ state.isPlay = false;},
    setMaxTime(state,maxTime){ state.maxTime = maxTime ;},
    setcurrentTime(state,timeNow){ state.currentTime = timeNow; },
    initPlayMode(state,[random,loop]){
        state.isRandom = random
        state.loopMode = loop
    },
    isRandom(state){  state.isRandom = !state.isRandom;
        window.localStorage.setItem('isRandom',state.isRandom)
        },
    loopMode(state){
        if(state.loopMode<2){
            state.loopMode++;
        }else {
            state.loopMode = 0
        }
        window.localStorage.setItem('loopMode',state.loopMode)
        },
    setVolume(state,volume){  state.volume = volume;  },
    setProgress(state,progress){ state.progress = progress; },
    setMusicList(state,[musicList,id]){
        state.PlaylistID = id
        state.musicList = musicList;
        let tempList=[];
        let len = musicList.length;
        for (let i = 0; i < len; i++) {
            let index = Math.floor(Math.random() * musicList.length);
            tempList.push(musicList[index]);
            tempList.splice(index, 1);
        }
        state.randomList =  Array.from(new Set(tempList))
    },
    setRecentList(state,musicRecord){
        state.RecentList = musicRecord
    }
}
// getters
const getters = {
    getPlayState:(state)=>{ return state.isPlay  },
    getRandomState:(state)=>{  return state.isRandom  },
    getLoopState:(state)=>{  return state.isLoop  },
    getMaxTime:(state)=>{return state.maxTime  },
    getcurrentTime:(state)=>{ return state.currentTime },
    getcurrentMusicID:(state)=>{ return state.musicID },
    getVolume:(state)=>{   return state.volume },
    getProgress:(state)=>{  return state.progress  },
    getMusicList:(state)=>{  return state.musicList }
}
// actions
const actions = {
   async addInList(state,music){
        //保留播放记录
        if(!music.al){
          await  song_detail(music.id).then(res=>{
              console.log(res)
                music=res.data.songs[0]
            })
        }
        let musicRecord  = JSON.parse(window.localStorage.getItem('musicRecord'))||[]
        const item = {
            ...music,
            'musicID':state.getters.getcurrentMusicID,
            'time':Date.now()
        }
        const index = musicRecord.findIndex(item=>item.musicID === state.getters.getcurrentMusicID)
        if(index!==-1){
            musicRecord.splice(index,1)
        }
        musicRecord = [item,...musicRecord]
        window.localStorage.setItem('musicRecord',JSON.stringify(musicRecord))
         state.commit('setRecentList',musicRecord)
        // console.log( JSON.parse(window.localStorage.getItem('musicRecord')))
    },

}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
