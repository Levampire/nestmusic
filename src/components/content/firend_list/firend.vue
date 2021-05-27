<template>
 <div class="firend">
   <div class="board ">
     <div  class="title"> 我的关注</div>
     <div class="item " v-for="item in userfollows_list">
       <img :src="item.avatarUrl" alt="" class="avatar">
       <img :src="item.avatarDetail.identityIconUrl" alt="" class="identity">
       <div class="name">{{item.nickname}}</div>
     </div>
   </div>
   <div class="board">
     <div  class="title"> 我的粉丝</div>
     <div v-if="userfolloweds_list.length===0" class="blankinfo">
       您还没有粉丝
     </div>
     <div v-if="userfolloweds_list.length>0">
       <div class="item" v-for="item in userfolloweds_list">
         <img :src="item.avatarUrl+'?param=40y40'" alt="" class="avatar">
         <img :src="item.avatarDetail.identityIconUrl" alt="" class="identity">
         <div class="name">{{item.nickname}}</div>
       </div>
     </div>

   </div>
   <div class="board">
     <div  class="title"> 我的动态</div>
     <div v-if="userevent_list.length===0" class="blankinfo">
       最近无动态
     </div>
     <div v-if="userevent_list.length>0">
       <div class="item" v-for="item in userfolloweds_list">
         <img :src="item.avatarUrl" alt="" class="avatar">
         <img :src="item.avatarDetail.identityIconUrl+'?param=15y15'" alt="" class="identity">
         <div class="name">{{item.nickname}}</div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import {user_follows,user_followeds,user_event} from 'network/user_info'
export default {
  name: "firend",
  data(){
    return{
      userfollows_list:[],
      userfolloweds_list:[],
      userevent_list:[],
    }
  },
  methods: {
    getUserFollowinfo(){
      user_follows(this.$store.getters['user/getuserid']).then(result=>{
        this.userfollows_list = result.data.follow
      }).catch(error=>{console.log(error)})
      user_followeds(this.$store.getters['user/getuserid']).then(result=>{
        this.userfolloweds_list = result.data.followeds
        console.log();
      }).catch(error=>{console.log(error)})
      user_event(this.$store.getters['user/getuserid']).then(result=>{
        // console.log('用户动态')
        // console.log(result)
        this.userevent_list = result.data.events
        console.log();
      }).catch(error=>{console.log(error)})
    }
  },mounted() {
    setTimeout(this.getUserFollowinfo,400)
  }
}

</script>

<style scoped>
.firend{
  width: 100%;
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
}
.board{
  position: relative;
  margin-bottom: 5px;
  width: 80%;
}
.title{
  width: 40%;
  text-align: left;
  font-weight: bold;
  color: var(--inform_textcolor);
  margin: 0 0 10px 2px;
}
.item{
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  width: 90%;
  margin: 5px 0 10px 0;

}
.item:hover{
  box-shadow: 0 0 5px 2px  rgba(200,200,200,.2) ;
}
.avatar{
  margin-left: 10px;
  border-radius: 8px;
  height: 40px;
  width: 40px;

}
.identity{
  transform: translate(-15px,12px);
  height: 15px;
  width: 15px
}
.name{
  font-size: 10pt;
}
.blankinfo{
  text-align: center;
  height: 80px;
  line-height: 80px;
  font-size: 10pt;
  width: 100%;
  color: rgb(200,200,200);
}
</style>
