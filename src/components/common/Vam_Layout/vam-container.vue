<template>
  <div class="container">
      <leftBar></leftBar>
  </div>
</template>
<script>
import leftBar from 'components/common/Vam_Layout/vam-leftbar'
export default {
name: "VamUi-Layout",
  components: {
    leftBar:leftBar,
  }
}
</script>
<style scoped>
.container{
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  width: 200px;
  height: 100vh;
}
.main{
  position: absolute;
  left: 0;
  width: 200px;
  height: 200px;
}
</style>
