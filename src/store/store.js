import { createStore } from 'vuex'
import user from './modules/user'
import musicplay from './modules/musicplay'

export default createStore({
    modules: {
        user,
        musicplay
    },
})
