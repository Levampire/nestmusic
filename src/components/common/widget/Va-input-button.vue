<template>

  <div class="input_container signup_container">

      <input class="input_group_one"
             :type="type"
             :value="modelValue"
             :placeholder="placeholder1"
             :name="name"
             @input="$emit('update:modelValue',$event.target.value)"/>
      <div class="line_column"></div>

      <button class="input_button"
              :disabled="sand_disable"
              @click="sendcode()"
      > {{ sendCode }}
      </button>
      <input
             class="input_group_two"
             :placeholder="placeholder2"/>
  </div>
</template>

<script>
export default {
  name: "Va-input-group",
  data(){
    return{
      //点击禁止
      sand_disable:false,
      sendCode:'发送',
      sendTimer:setInterval
    }
  },
  props:{
    //接收类型值
    type:{
      type:String,
      default:'text'
    },
    //接收input值
    modelValue:{
      type:String,
      default:''
    },
    //接收占位符
    placeholder1:{
      type:String,
      default:'点击输入'
    },
    placeholder2:{
      type:String,
      default:'点击输入'
    },
    //接收name 属性
    name:{
      type:String,
      default:''
    },
  },
  methods:{
    //点击发送验证码
    sendcode(){
      console.log('click')
      //禁止多次点击
      this.sand_disable = true;
      this.timerVal = 60;
      this.sendTimer = setInterval(this.timer_send,1000);

    },
    //发送验证码计时器
    timer_send(){
      this.timerVal --;
      this.sendCode = this.timerVal;
      console.log(this.sendCode);
      if(this.timerVal === 0){
        this.clearTimer();
        this.sendCode = '重新发送'
        //允许点击事件
        this.sand_disable = false;
      }
    },
    //清除计时器
    clearTimer(){ clearInterval(this.sendTimer) }
  },
  mounted() {
  },
}
</script>
<style scoped>
.input_container,.isdisabled{
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  padding-left: 0;
  background-color: var(--whitesmoke);
  border-radius: 10px;
  overflow: hidden;
  z-index: 0;
}
.disabled_cursor{
  cursor: not-allowed;
}
.input_container:hover{
//border: 1px solid var(--Main_blue) ;
  box-shadow: 0 0 8px rgba(80,80,80,.1);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.input_group_one{
  padding-left: 10px;
  height: 100%;
  width: 50% ;
}
.input_group_two{
  padding-left: 10px;
  height: 100%;
  width: 50% ;
}
.input_group_one:hover,.input_group_two:hover{

  background-color: white;
}

.input_button{
  border: none;
  color: white;
  font-size: 10pt;
  padding: 0 10px 0 10px;
  position: absolute;
  right: 0;
  width: auto;
  height: 100%;
  line-height: 40px;
  text-align: center;
  background-color: var(--Main_blue) ;
  z-index: 1;
}
.input_button:hover{
  color: var(--Main_blue);
  background-color:#CED5FF;
  transition: 0.2s ease-in-out;
}

</style>
