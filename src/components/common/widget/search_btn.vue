<template>
<div class="container">
  <div class="search_img"></div>
  <input
         :value="modelValue"
         name="Input"
         id="Input_search"
         placeholder="搜索"
         @input="$emit('update:modelValue',$event.target.value)"
  />
</div>
</template>

<script>
export default {
  name: "navBar",
  data(){
    return{
      input:''
    }
  },
  props:{
    modelValue:{
      type:String,
      default:''
    }
  },
  methods:{

  }
}
</script>
<style scoped>
.container{
  display: flex;
  flex-direction: row;
  padding-left: 0;
  background-color: transparent;
  border: 1px solid  var(--inform_textcolor);
  border-radius: 10px;
  overflow: hidden;
  z-index: 0;
  transform: scale(0.9);
}
input{
  margin: 0;
  padding: 0 5px 0 35px;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  text-align: left;
  font-weight: 500;
  z-index: 0;
  caret-color:var(--Main_blue);
  color: var(--Ligth_Text);
  background-color: rgba(255,255,255,.5);

}

.container:hover{
  background-color: rgba(255,255,255,.4);
  box-shadow:0 0 5px rgba(10,10,10,.2);
  transition: 0.4s cubic-bezier(0.1,0.4,0.6,0.8);
}
.search_img{
  padding: 0;
  position: absolute;
  left:10px ;
  align-self: center;
  width: 16px;
  height: 16px;
  z-index: 1;
}
</style>
