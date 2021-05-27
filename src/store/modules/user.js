
// initial state
const state = () => ({
    isLogin:window.localStorage.getItem('userid')?(window.localStorage.getItem('userid') !== ''):false,
    userinfo:{}
})
// mutations
const mutations = {
    setIslogin(state,islogin){
        state.isLogin = islogin;
    },
    setUserinfo(state,userinfo){
       state.userinfo = userinfo;
    }
}
// getters
const getters = {
    getloginState:(state)=>{
        return state.isLogin
    },
    getuserinfo:(state)=>{
        return state.userinfo
    },
    getuserid:(state)=>{
        return state.userinfo.userId
    }
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
