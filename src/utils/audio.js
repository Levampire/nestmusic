
import store from "../store/store";

const setUrl = (id,NAME,ARTISTS,PICURL) => store.commit('musicplay/setUrl',[id,NAME,ARTISTS,PICURL])
const play =  () => {store.commit('musicplay/setPlay')}
const pause = () => store.commit('musicplay/setPause')
const updateProgress = (index) => store.commit('musicplay/setProgress',index)
const setVolume = (index) => store.commit('musicplay/setVolume',index)
const setPlaylist = (list,id) => store.commit('musicplay/setMusicList',[list,id])

export default {
        play,
        pause,
        updateProgress,
        setVolume,
        setPlaylist,
        setUrl
}
