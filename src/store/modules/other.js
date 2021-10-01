const state = ()=>({
    Tittle:'this is tittle',
    MainPageScrollInfo:{},
    AudioCtxData:[],
})
const getters = {
    getTittle:(state)=>{ return state.Tittle },
    getMainPageScrollInfo:(state)=>{ return state.MainPageScrollInfo },
}
const actions = {

}
const mutations = {
    setMainPageScrollInfo(state,scrollRect){ state.MainPageScrollInfo = scrollRect },
    setTittle(state,tittle){ state.Tittle = tittle },
    setAudioCtxData(state,dataArray){ state.AudioCtxData = dataArray }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
