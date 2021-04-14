<template>
<div class="leftBar">
  <div class="logo">
    <img class="img" src="@/assets/img/logo.png" alt="">
    <h3>VamMusic</h3>
  </div>
  <Menu></Menu>
  <Library></Library>
  <PlayList></PlayList>
</div>
</template>
<script>
import menu from 'components/content/leftBar_list/Menu_List'
import library from 'components/content/leftBar_list/Library_List'
import playlist from 'components/content/leftBar_list/Play_List'

export default {
  name: "vam-leftBar",
  components:{
    Menu: menu,
    Library:library,
    PlayList:playlist
  }

}
</script>

<style scoped>
.img{
  margin: 10px;
  height: 30px;
  width: 30px;
}
.logo{
  display: flex;
  align-items: center;
  justify-content: left;
  height: 10vh;
  padding-left: 10px;
}
.leftBar{
  display: flex;
  flex-direction: column;
  width: 200px;
  height:inherit ;
  background-color: #EAECED;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
