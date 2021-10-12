
// initial state
const state = () => ({
    musicUrl:"https://music.163.com/song/media/outer/url?id=1842802205.mp3",
    musicInfo:{NAME:'庞贝',ARTISTS:[{"img1v1Id":18686200114669624,"topicPerson":0,"followed":false,"alias":[],"picId":0,"trans":"","albumSize":0,"img1v1Url":"http://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg","picUrl":"http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","briefDesc":"","musicSize":0,"name":"许嵩","id":5771,"img1v1Id_str":"18686200114669622"}],PICURL:'http://p4.music.126.net/EepVxZ_7Z0qAiW_UYcC7EA==/109951165954048759.jpg'},
    musicID:1842802205,
    PlaylistID:Number,
    musicList:{},
    isPlay:false,
    isRandom:false,
    loopMode:0,// 0关闭 1 single单曲循环,2 all列表循环, 默认 1
    maxTime:'300',
    currentTime:'0',
    progress:0,
    volume:0
})
// mutations
const mutations = {
    setUrl(state,[ID,NAME,ARTISTS,PICURL]){
        console.log(NAME);
        state.musicUrl = 'https://music.163.com/song/media/outer/url?id='+ID+'.mp3'
        state.musicID = ID
        state.musicInfo = {NAME,ARTISTS,PICURL};
    },
    setPlay(state){ state.isPlay = true;
        // console.log('**********设置播放')
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
    },
    RandomPlayNext(state){

    },
    // AutoPlay:async (state)=>{
    //    setTimeout(()=>{
    //        state.isPlay = false
    //    },1)
    //     const temp=[state.musicID,state.musicInfo]
    //     state.musicUrl = ''
    //     state.musicID = ''
    //     state.musicInfo = {};
    //     if(state.loopMode=== 0 ){
    //         state.musicUrl = 'https://music.163.com/song/media/outer/url?id='+temp[0]+'.mp3'
    //         state.musicID = temp[0]
    //         state.musicInfo = temp[1];
    //     }
    //     state.isPlay = true
    // }
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
