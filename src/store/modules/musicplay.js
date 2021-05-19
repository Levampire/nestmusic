
// initial state
const state = () => ({
    musicUrl:"https://music.163.com/song/media/outer/url?id=1842802205.mp3",
    musicInfo:{NAME:'庞贝',ARTISTS:[{"img1v1Id":18686200114669624,"topicPerson":0,"followed":false,"alias":[],"picId":0,"trans":"","albumSize":0,"img1v1Url":"http://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg","picUrl":"http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","briefDesc":"","musicSize":0,"name":"许嵩","id":5771,"img1v1Id_str":"18686200114669622"}],PICURL:'http://p4.music.126.net/EepVxZ_7Z0qAiW_UYcC7EA==/109951165954048759.jpg'},
    musicID:1842802205,
    PlaylistID:Number,
    musicList:{},
    isPlay:false,
    isRandom:false,
    isLoop:false,
    maxTime:'300',
    currentTime:'0',
    progress:0,
    volume:0
})
// mutations
const mutations = {
    setUrl(state,[ID,NAME,ARTISTS,PICURL]){
        // console.log(INFO);
        state.musicUrl = 'https://music.163.com/song/media/outer/url?id='+ID+'.mp3'
        state.musicID = ID
        state.musicInfo = {NAME,ARTISTS,PICURL};
    },
    setPlay(state){ state.isPlay = true;},
    setPause(state){ state.isPlay = false;},
    setMaxTime(state,maxTime){ state.maxTime = maxTime ;},
    setcurrentTime(state,timeNow){ state.currentTime = timeNow; },
    setVolume(state,volume){  state.volume = volume;  },
    setProgress(state,progress){ state.progress = progress; },
    setMusicList(state,[musicList,id]){
        state.PlaylistID = id
        state.musicList = musicList;
    }
}
// getters
const getters = {
    getPlayState:(state)=>{ return state.isPlay  },
    getRandomState:(state)=>{  return state.isRandom  },
    getLoopState:(state)=>{  return state.isLoop  },
    getMaxTime:(state)=>{return state.maxTime  },
    getcurrentTime:(state)=>{ return state.currentTime },
    getVolume:(state)=>{   return state.volume },
    getProgress:(state)=>{  return state.progress  },
    getMusicList:(state)=>{  return state.musicList }
}
// actions
const actions = {

}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
