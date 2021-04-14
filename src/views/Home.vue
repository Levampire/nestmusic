<template>
    <Home class="home">
    </Home>
    <Lyric></Lyric>
</template>
<style>
.home{
  display: flex;
  flex-direction: row;
}
body{
  display: flex;
  flex-direction: column;
  padding: 0;margin: 0;
}

</style>
<script>
// @ is an alias to /src
import rightPage from 'components/common/Vam_Layout/vam-container'
import LyricsPage from 'components/LyricsPage'


export default {
  name: 'HomePage',
  components: {
    Home: rightPage,
    Lyric:LyricsPage,

  }
}
</script>
