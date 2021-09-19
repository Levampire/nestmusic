<template>
  <div class="loginCard">
    <div class="close_login"
         @click="close_login()">
      关闭
    </div>
    <div class="title">登录网易云</div>
    <div class="switch" id="switch">
      <div class="slipper" :style="slipper_style"></div>
      <div class="switch_btn" ref="switch1" :class="[btn_now === '1'?active:before]" @click="click($event,'1')">账号密码
      </div>
      <div class="switch_btn" ref="switch2" :class="[btn_now === '2'?active:before]" @click="click($event,'2')">二维码登录
      </div>
      <div class="switch_btn" ref="switch3" :class="[btn_now === '3'?active:before]" @click="click($event,'3')">账户注册
      </div>
    </div>
    <div class="login_content">
      <!--账号密码登录-->
      <div v-show="btn_now==='1'" class="login_content">
        <div class="Password_login">
          <Va-input
              class="login_input"
              type="tel"
              v-model="username"
              @account_type="account_type"
          >
          </Va-input>
          <Va-input
              class="login_input"
              v-model="userpassword"
              type="password"
              placeholder="输入您的密码">
          </Va-input>
          <div class="btn_container">
            <div class="btn little_btn login_btn ">忘记密码</div>
            <div class=" btn_light little_btn login_btn"
                 @click="password_login"
            > 登录
            </div>
          </div>
          <div class="check">
            <!--  同意条款-->
            <input ref="checkBox" class="checkbox" type="checkbox" style="background-color: #5773FF"/>
            同意 <a href="">《服务条款》</a> <a href="">《隐私政策》</a><a href="">《儿童隐私政策》</a>
          </div>

        </div>
      </div>
      <!--二维码登录-->
      <div v-show="btn_now==='2'" class="login_content">
        <img class="ERCode" :src="ERCode_src"/>
        <span v-if="ERCode_aval==='wait'">请打开网易云APP扫码</span>
        <span v-if="ERCode_aval==='scan'">请确认授权</span>
        <span v-if="ERCode_aval==='ok'">登陆成功</span>
        <span v-if="ERCode_aval==='out'" @click="requestERCode()">刷新二维码</span>
      </div>
      <!--注册-->
      <div v-show="btn_now==='3'" class="login_content">
        <div class="signup_login">
          <Va-input
              class="login_input"
              type="tel"
              v-model="signup_username"
              placeholder="输入您的手机号">
          </Va-input>
          <Va-input-button
              class="_group"
              placeholder1="昵称"
              placeholder2="验证码"
          >
          </Va-input-button>
          <Va-input
              class="login_input"
              v-model="signup_userpassword"
              type="password"
              placeholder="输入您的密码">
          </Va-input>
          <Va-input
              class="login_input"
              v-model="signup_userpassword_V"
              type="password"
              placeholder="输入您的密码">
          </Va-input>
          <div class="signup_container">
            <div class=" btn_light little_btn login_btn"> 注册</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

//登录请求
import {getERCode_key, getERCode_create, getERCode_check} from 'network/login';
import {phone_login, email_login, login_status} from "network/login";

export default {

  name: "login_card",
  data() {
    return {
      //登录状态
      userStatus: Boolean,
      //输入数据双向绑定
      username: '',
      userpassword: '',
      signup_username: '',
      signup_userpassword: '',
      signup_userpassword_V: '',
      //登录类型
      tel_email: Boolean,
      //切换滑块
      slipper_style: {},
      active: 'switch_btn_after',
      before: 'switch_btn',
      sendCode: '发送验证码',
      //页面定位
      btn_now: '1',
      //二维码
      ERCode_key: '',
      ERCode_src: require('assets/img/ERCODE.png'),
      ERCode_aval: 'wait'
    }
  },
  components: {},
  props: {
    methods_type: String
  },
  methods: {
    //点击切换页面
    click(e, name) {
      this.slipper_style = {
        left: (e.target.offsetLeft) + 'px',
        width: e.target.clientWidth + 'px'
      };
      this.btn_now = name;
      //点击二维码登录时请求二维码
      if (name === '2') {
        this.requestERCode();
      } else {
        this.clearTimer()
      }
    },

    //手机邮箱登录
    //获取账户类型 true :email false:cellphone
    account_type(type) {
      this.tel_email = type;
      console.log(type)
    },
    //点击登录
    password_login() {
      if (this.$refs.checkBox.checked) {
        //是否勾选用户协议
        if (this.tel_email === true) {
          //eamil登录
          //email_login()
          email_login(this.username, this.userpassword).then(result => {
            console.log(result)
            if (result.data.code === 200) {
              console.log('邮箱登录成功');
              this.close_login('login')
            } else {
              console.log('密码错误');
            }
            //获取用户信息
            // get_userinfo(result.data.account.id).then(result=>{ console.log(result); }).catch(error=>{ console.log('用户数据获取失败'+error);})
          }).catch(error => {
            console.log('登录请求失败' + error);
          })
          console.log('邮箱登录')
        } else {
          //cellphone登录
          phone_login(this.username, this.userpassword).then(result => {
            console.log(result)
            if (result.data.code === 200) {
              console.log('手机登录成功');
              this.close_login('login')
            } else {
              console.log('密码错误');
            }
            //获取用户信息
            // get_userinfo(result.data.account.id).then(result=>{ console.log(result); }).catch(error=>{ console.log('用户数据获取失败'+error);})
          }).catch(error => {
            console.log('登录请求失败' + error);
          })
        }
      } else {
        //提示勾选框
      }
    },
//请求二维码
    requestERCode() {
      getERCode_key().then(result => {
        //获取二维码key
        this.ERCode_key = result.data.data.unikey
        //获取到二维码图片
        getERCode_create(this.ERCode_key).then(result => {
              console.log(result);
              this.ERCode_src = result.data.data.qrimg
              this.sendTimer = setInterval(this.timer_request, 3000);
            }
        ).catch(error => {
          console.log('请求二维码图片出错：' + error)
        })
      }).catch(error => {
        console.log('请求二维码key出错：' + error)
      })
    },
    //请求二维码计时器
    timer_request() {
      //获取二维码状态，800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功(803状态码下会返回cookies)
      getERCode_check(this.ERCode_key).then(result => {
            if (result.data.code === 800) {
              this.ERCode_aval = 'out'
              this.clearTimer();
            } else if (result.data.code === 802) {
              this.ERCode_aval = 'scan'
            } else if (result.data.code === 803) {
              console.log('二维码登录成功');
              this.close_login('login')
              this.ERCode_aval = 'ok'
            } else if (result.data.code === 801) {
              this.ERCode_aval = 'wait'
            }
          }
      ).catch(error => {
        console.log('请求二维码状态出错：' + error)
      })
    },
    //关闭登录页面
    close_login(login) {
      if (login === 'login') {
        //校验用户信息设置登录状态
        login_status().then(result => {
          console.log(result);
          if (result.data.data.account === null) {
            console.log('未登录')
          } else {
            //成功获取到登录信息
            console.log('已登录')
            console.log(result)
            this.$router.go(0)
            this.$emit('close_login')
            this.$store.commit('user/setUserinfo', result.data.data.profile)
            //本地储存用户数据
            window.localStorage.setItem('userid', result.data.data.profile.userId)
          }
        }).catch(error => {
          console.log('登录校验失败' + error)
        })
      } else {
        this.$emit('close_login')
      }
    },
    //清除计时器
    clearTimer() {
      clearInterval(this.sendTimer)
    }
  },
  mounted() {
    //滑块位置初始化
    if (this.methods_type === 'login') {
      this.slipper_style = {
        left: this.$refs.switch1.offsetLeft + 'px',
        width: this.$refs.switch1.clientWidth + 'px'
      }
    } else if (this.methods_type === 'signin') {
      this.slipper_style = {
        left: this.$refs.switch3.offsetLeft + 'px',
        width: this.$refs.switch3.clientWidth + 'px'
      };
      this.btn_now = '3'
    }
  }
}
</script>
<style scoped>
.switch {
  position: relative;
  width: fit-content;
  height: 40px;
  padding: 0 2px 0 0;
  margin: 10px 0 5px 20px;
  border-radius: 8px;
  background-color: var(--btn_back_light);
  z-index: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
}

.login_content {
  width: inherit;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  height: 320px;
}

.title {
  color: var(--title_text);
  margin: 18px 0 20px 0;
  width: 190px;
  font-weight: 1000;
  font-size: 28px;
}

.login_input {
  margin-top: 20px;
}

.ERCode {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 220px;
  width: 220px;
}

.close_login {
  width: 40px;
  font-weight: bolder;
  color: var(--title_text);
  height: 30px;
  position: absolute;
  right: 20px;
  top: 22px;
}

.close_login:hover {
  color: var(--Main_blue);
}
</style>
