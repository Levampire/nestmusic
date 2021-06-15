<template>
  <div class="item_self" @mouseenter="MouseisOn()" @mouseleave="MouseLeave() ">
    <img :src="src"
         oncontextmenu="return false;"
         ondragstart="return false;"
         loading="lazy"
         alt="">
    <div class="squareitem_info">
      <label class="songname">{{song}}</label>
      <label class="artist">{{artist}}</label>
    </div>
    <label class="info">单曲</label>
    <transition name="play_in">
      <div v-if="isOn" class="play" >
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "squarebig_item",
  data(){
    return{
      isOn:false,
      song:'',
      artist:'',
      src:'',
      type:'',
      id:''
    }
  },
  props:{
    firstone:{
      type:Object,
      default:function (){
        return{}
      }
    }
  },
  methods:{
    MouseisOn(){
      this.isOn = true;
    },
    MouseLeave(){
      this.isOn = false;
    }
  },
  watch:{
    firstone:function (newvalue,oldvalue){
      this.song = newvalue.al.name
      this.artist = newvalue.ar[0].name;
       this.src=  newvalue.al.picUrl;
      // console.log('热搜')
      // console.log(newvalue)
    }
  }
}
</script>

<style scoped>
.item_self{
  position: relative;
  /*不被挤压*/
  flex-shrink: 0;
  padding-top: 10px;
  margin-left: 20px;
  align-items: center;
  background-color: rgba(255,255,255,0.6);
  height: 230px;
  width: 440px;
  border-radius: 5px;
  box-shadow:0 0 5px rgba(80,80,80,.1);
}
.item_self:hover{
  background-color: rgba(255,255,255,1);
}
img{
  border-radius: 8px;
  width:130px ;
  height: 130px;
  float: left;
  margin-left: 10px;
}
.songname{
  margin-bottom: 5px;
  display:inline-block;
  width: 100%;
  height: 2rem;
  line-height: 1.5rem;
  color: var(--title_text) ;
  text-align: left;
  max-lines: 1;
  font-weight: 800;
  font-size: 18pt;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.artist{
  margin-bottom: 10px;
  display:inline-block;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  color: var(--title_text) ;
  text-align: left;
  max-lines: 1;
  font-size: 12pt;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info{
  position: absolute;
  right: 15px;
  top: 10px;
  background-color:rgb(95, 222, 173);
  border-radius: 5px;
  padding: 2px 10px 2px 10px;
  font-weight: bolder;
  font-size: 15pt;
  color: var(--title_text) ;
}
.play{
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100px;
  width: 90px;
  transition: 2s ;
  background-image: url("~assets/img/play_cover.svg");  background-size: cover;
  /*animation: play_btn;
  animation-duration: 0.2s;*/
}
.squareitem_info{
  position: absolute;
  width: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  bottom: 5px;
  left:10px ;
  height: 70px;
}
.play_in-enter-active{
  transition:all .3s ease;
}
.play_in-enter-active {
  transition: all .3s ease;
}
.play_in-leave-active {
  transition: all .4s cubic-bezier(0.4,0.5,0.6,0.9) ;
}
.play_in-enter, .play_in-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(20px) scale(.8);
  opacity: .0;

}
</style>
