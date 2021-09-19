import { createStore } from 'vuex'
import user from './modules/user'
import musicplay from './modules/musicplay'
import other from './modules/other'

export default createStore({
    modules: {
        user,
        musicplay,
        other
    },
})
