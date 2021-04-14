<template>
  <div class="back">
    <div class="sidebar_title">
      Library
    </div>
    <div class="sideBar_btn " :class="[isActive=='btn_homepage'?active:before]" @click="btn_homepage()" >最近播放</div>
    <div class="sideBar_btn" id="btn_search">歌单</div>
  </div>
</template>

<script>
export default {
  name: "Library_list"
}
</script>

<style scoped>
.back{
  height: 15vh;
}
</style>
