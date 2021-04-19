<template>
<div class="leftBar">
  <div class="logo">
    <img class="img" src="@/assets/img/logo.png" alt="">
    <p>NestMusic</p>
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
  font-family: var(--VamFont);
  display: flex;
  margin-top: 10px;
  justify-content: left;
  height: 100px;
  padding-left: 10px;
}
p{
  font-weight: bold;
  font-size: 18px;
}
.leftBar{
  width: 200px;
  height:100vh ;
  background-color: #EAECED;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
