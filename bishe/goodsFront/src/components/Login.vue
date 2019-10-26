<template>
  <div class="mui-content login">
    <div class="logo">
      <img src="@/assets/imgs/qihoo.png" alt="" />
    </div>
    <form id='login-form' class="mui-input-group">
      <div class="mui-input-row" ref="account">
        <span class="mui-icon mui-icon-phone"></span>
        <!--<x-input title="手机号" mask="999 9999 9999" v-model="account" :max="13" is-type="china-mobile" @focus="accountFocus" @blur="accountBlur" ></x-input>-->
        <input id='account' v-model="account" type="text" class="mui-input-clear mui-input" placeholder="手机号" @focus="accountFocus" @blur="accountBlur" >
      </div>
      <div class="mui-input-row" ref="password">
        <span class="mui-icon mui-icon-locked"></span>
        <input id='password' v-model="password" type="password" class="mui-input-clear mui-input" placeholder="密码" @focus="passFocus" @blur="passBlur" >
      </div>
    </form>

    <div class="mui-content-padded">
      <button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit()">登录</button>
      <div class="link-area"><a id='reg' @click="register">注册账号</a> <span class="spliter">|</span> <a id='forgetPassword'>忘记密码</a>
      </div>
    </div>
    <div class="mui-content-padded oauth-area">

    </div>
    <toast v-model="showTip" :text="tipMessage"> </toast>
    <toast v-model="showWarn" type="cancel" :text="warnMessage"> </toast>
  </div>
</template>

<script>
  import { Toast,XInput } from 'vux'
    export default {
        name: "login",
      components:{
          Toast,XInput
      },
      data:function () {
        return {
          account:"",
          password:"",
          showTip:false,
          tipMessage:"",
          showWarn:false,
          warnMessage:""
        }
      },
        methods:{
          submit(){
            var that=this;
            fetch("/ajax/users/login",{
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: "account="+that.account+"&password="+that.password
            }).then(function (e) {
              return e.json();
            }).then(function (e) {
                if(e.message){
                  that.showWarn=true;
                  that.warnMessage="账号或密码错误";
                }else{
                  sessionStorage.userFront=e[0].uid;
                  that.showTip=true;
                  that.tipMessage="登录成功";
                  setTimeout(function () {
                    that.$router.push("/personal")
                  },600)
                }

            })
          },
          accountFocus(){
            this.$refs.account.style="border:1px solid #ff8053";
          },
          accountBlur(){
            this.$refs.account.style="order: 1px solid #C6C5C4;";
          },
          passFocus(){
            this.$refs.password.style="border:1px solid #ff8053";
          },
          passBlur(){
            this.$refs.password.style="order: 1px solid #C6C5C4;";
          },
          register(){
            this.$router.push("/register")
          }
        }
    }
</script>

<style scoped>
  .logo{
    width: 70px;height: 70px;margin: 80px auto 45px;
  }
  .logo img{
    width: 100%;height: 100%;float: left;
  }
  .mui-content{background: #fff;height: 100vh;overflow: hidden;}

  .mui-input-group {
    width: 80%;margin: 0 auto;
  }
  .mui-input-row{
    width: 100%;height:40px;
    border-radius: 40px;transition: .3s;
    margin: 25px auto 0;border: 1px solid #C6C5C4;
  }
  .mui-input-row span {
    box-sizing: border-box;
    width: 13%;margin: 7px 0 0 11px;color: #C6C5C4;float: left;
  }
  .mui-input-row span~input,
  .mui-input-row span~select,
  .mui-input-row span~textarea {
    color: #333;
    width: 78%;float: left;box-sizing: border-box;padding: 0;
  }

  .mui-content-padded {
    margin:30px auto 0;width: 80%;
  }

  .mui-btn {
    width: 100%;
    background: #FFB398;color: #fff;border: none;outline: none;
    padding: 10px;border-radius: 7px;
  }
  .mui-content-padded .mui-btn:active{
    background: #F29879;
  }

  .link-area {
    display: block;
    margin-top: 25px;
    text-align: center;
  }
  .link-area a{
    color: #FFB398;
  }

  .spliter {
    color: #bbb;
    padding: 0px 8px;
  }

  .oauth-area {
    margin-top: 30px;
    text-align: center;
    width: 100%;
    padding: 0px;

  }

  .oauth-area .oauth-btn {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-size: 30px 30px;
    background-position: center center;
    background-repeat: no-repeat;
    margin: 0px 20px;
    /*-webkit-filter: grayscale(100%); */
    border: solid 1px #ddd;
    border-radius: 25px;
  }

  .oauth-area .oauth-btn:active {
    border: solid 1px #aaa;
  }

  .oauth-area .oauth-btn.disabled {
    background-color: #ddd;
  }
   .weui-toast__content{color:#fff;}
</style>
