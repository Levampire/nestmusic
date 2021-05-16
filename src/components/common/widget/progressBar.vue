<template>
  <div style="position: relative ;padding: 5px 0 5px 0"
       ref="progressbar"
       @mousemove="drag_move($event)"
       @mouseup="mouseUp()"
       @mouseleave="mouseUp()"
        >
    <div class="bar">
      <div class="progress" :style="{width:index+'%'}"></div>
    </div>
    <div class="dragBtn"
         :style="{left:index+'%'}"
         @mousedown="drag_click($event)"
    ></div>
  </div>
</template>

<script>

export default {
  name: "progressBar",
  data(){
    return{
      pro:0,
      mousein:false,
      startPos:0,
      endPos:0,
      offset:0,
      index:0
    }
  },
  props:{
    progress:{
      type:Number,
      default:10
    },
    type:{
      type:String,
      default: "audio"
    }
  },
  watch:{
    progress:function (newValue){
      if(this.mousein !== true){
        this.index=newValue;
      }
    }
  },
  methods:{
    drag_click(e){
      this.mousein=true
      this.startPos=e.x
      this.pro = this.index
      this.index = this.index<=0?this.index=0:(this.index>=99?this.index=98.9:this.index)
    },
    drag_move(e){
      if(this.mousein===true&&this.index>=0&&this.index<=100){
          this.endPos = e.x
          this.offset = 100*((this.endPos-this.startPos)/this.$refs.progressbar.clientWidth)
        this.setindex()
      }
    },
    setindex(){
      this.index = (this.index<99)?this.pro+this.offset:this.index
    },
    mouseUp(){
      this.mousein=false
      this.updateProgress(this.index)
    },
    updateProgress(index){
      if(this.type==='audio'){
        this.$audio.updateProgress(index)
      }
      else if(this.type==='volume'){
        this.$audio.setVolume(index/100)
      }
    }
  }
}
</script>

<style scoped>
.bar{
  position: relative;
  background-color: rgba(200,200,230,.5);
  height: 6px;
  border-radius: 5px;
  overflow: hidden;
}
.progress{
  position: absolute;
  left: 0;
  border-radius: 8px 0 0 8px;
  background-color: #5773FF;
  height: 100%
}
.dragBtn{
  position: absolute;
  left: 0;
  top: 4px;
  width: 8px;
  height: 8px;
  background-color: white;
  box-shadow:0 0 4px rgba(80,80,80,.5);
  border-radius: 4px;
}
</style>
