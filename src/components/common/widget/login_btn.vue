<template>
  <div >
    <div  class="btn_light little_btn">
      登录
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
name: "login_btn",
  data(){
  return{
      profile:'',//用户头像
      UserName:''
    }
  },
  computed:{
    ...mapState({
      userinfo:state => state.user.userinfo,
      login:state => state.user.isLogin
  })
  }
}
</script>

<style scoped>


</style>
