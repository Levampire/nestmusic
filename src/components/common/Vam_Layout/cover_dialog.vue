<template>
  <transition name="bTot">
    <div class="cover" v-if="visible" @scroll.stop >
      <div class="exit" @click="visible=!visible">X</div>
      <slot></slot>
    </div>
  </transition>

</template>
<script>
export default {
  name: "cover_dialog",
  data(){
    return{
      visible:false,
    }
  },
  props:{
    isVisible:{
      type:Boolean,
      default:false
    }
  },
  watch:{
    isVisible:function (newVal){
      this.visible = newVal
    }
  }
}
</script>

<style scoped>
.cover{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(200,200,200,0.9);
  backdrop-filter:blur(15px);
  z-index: 999;
  overflow: hidden;
}
.exit{
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.bTot-enter-active {
  transition: all .6s cubic-bezier(0.4, 0.5, 0.6, 1);
}

.bTot-enter-to {
  transition: all .8s ease;
}

.bTot-leave-active {
  transition: all .6s cubic-bezier(0.4, 0.5, 0.6, 1);
}

.bTot-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */
{
  transform: translateY(15px) ;
  opacity: .0;
}.bTot-enter-to
   /* .slide-fade-leave-active for below version 2.1.8 */
{
  opacity: 1;
}
</style>
