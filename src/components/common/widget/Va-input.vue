<template>
<div :class="[disabled===false?input_container:isdisabled]">
  <input class="countryCode"
         v-show="(type==='email'||type==='tel')&&(tel_email === false)"
         :value="countryCode"/>
  <input
      v-if="type==='password'"
       class="Va-input"
      :class="[disabled===false?'':'disabled_cursor']"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :type="[type?(!password_show?'password':'text') :'text' ]"
      :value="modelValue"
      @input="$emit('update:modelValue',$event.target.value)"
  />
  <input
    v-if="type==='email'||type==='tel'"
    class="Va-input"
    :class="[disabled===false?'':'disabled_cursor']"
    :placeholder="tel_email_placeholder"
    :name="name"
    :disabled="disabled"
    :type="[type?(!tel_email?'number':'text')
      :'text' ]"
    :value="modelValue"
    @input="$emit('update:modelValue',$event.target.value)"
/>
  <input
      v-if="type==='text'"
      class="Va-input"
      :class="[disabled===false?'':'disabled_cursor']"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue',$event.target.value)"
  />
  <div class="imgspan" v-if=" icon === '' " >
    <!-- 账户类型控制-->
    <div class="img "
         v-if="type==='tel'||type==='email'"
         :class="[!tel_email?'tel':'email']"
         @click="toggle_account_type">
    </div>
<!-- 密码控制-->
    <div class="img "
         v-if="type==='password'"
         :class="[!password_show?'eyes-slash':'eyes']"
         @click="showPassword">
    </div>
  </div>
  <div v-if=" icon !== ''">
    <div class="img "
         :style="icon_diy">
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "Va-input",
  data(){
   return{
     input_container:'input_container',
     input_type:'',
     password_show:false,
     //false:phone,true:email
     tel_email:false,
     //切换placeholder
     tel_email_placeholder:'请输入您的手机号',
     //国家码
     countryCode:'+86',
     icon_diy:{},

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
    placeholder:{
      type:String,
      default:'点击输入'
    },
  //接收name 属性
    name:{
      type:String,
      default:''
    },
  //接收禁用 属性
    disabled:{
      type:Boolean,
      default:false
    },
    //接收icon
    icon:{
      type:String,
      default:''
    }
  },
  methods:{
    showPassword(){
      this.password_show = !this.password_show;
    },
    toggle_account_type(){
      this.tel_email = !this.tel_email;
      this.tel_email_placeholder=!this.tel_email?'请输入您的手机号':'请输入您的邮箱'
      this.$emit('account_type',this.tel_email)
    }
  },
  mounted() {
    this.input_type = this.type;
    this.icon_diy =  "background-image: url("+this.$props.icon+");"
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
input{
  padding: 0 35px 0 10px;
}
.countryCode{
  background-color: var(--btn_back_light);
  align-self: center;
  width: 40px;
  height: 100%;
  background-size: cover;
  border: none;
  outline: none;
  z-index: 1;
  text-align: center;
  font-weight: bolder;
  font-size: 11pt;
  color: var(--Main_blue);
  padding: 0 5px 0 5px ;
}


.input_container:hover>.Va-input{
  background-color: white;
  transition: 0.2s cubic-bezier(0.1,0.4,0.6,0.8);
}
.imgspan{
  padding: 5px;
  position: absolute;
  right: 10px;
  align-self: center;
  width: 30px;
  height: 30px;
  background-size: cover;
  z-index: 1;
}
.img{
  height: 100%;
  width: 100%;
  background-size: cover;
}
.eyes-slash{
  background-image: url("~assets/img/eyes-slash.png");
}
.eyes{
  background-image: url("~assets/img/eyes.png");
}
.tel{
  background-image: url("~assets/img/phone.png");
}
.email{
  background-image: url("~assets/img/email.png");
}
</style>
