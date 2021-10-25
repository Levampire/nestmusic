
import store from "../store/store";
let musicRecord;
const setUrl = (id,NAME,ARTISTS,PICURL,fullInfo) => {
    store.commit('musicplay/setUrl',[id,NAME,ARTISTS,PICURL])
        if(fullInfo){
         musicRecord = fullInfo
        }
}
const play =  () => {
    store.commit('musicplay/setPlay')
    store.dispatch('musicplay/addInList',musicRecord)
}
const pause = () => store.commit('musicplay/setPause')
const updateProgress = (index) => store.commit('musicplay/setProgress',index)
const setVolume = (index) => store.commit('musicplay/setVolume',index)
const setPlaylist = (list,id) => {
        store.commit('musicplay/setMusicList',[list,id])
}

const PLAY = async function (ID,NAME,ARTISTS,PICURL){
        this.$audio.pause()
        await this.$audio.setUrl(ID,NAME,ARTISTS,PICURL)
        this.isPlay=true
        this.$audio.play()
}
export default {
        PLAY,
        play,
        pause,
        updateProgress,
        setVolume,
        setPlaylist,
        setUrl,
}
