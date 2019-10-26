<template>
  <div class="mui-content login">
    <div class="logo">
      <img src="@/assets/imgs/qihoo.png" alt="" />
    </div>
    <form id='login-form' class="mui-input-group">
      <div class="mui-input-row" ref="account">
        <span class="mui-icon mui-icon-phone"></span>
        <input id='account' v-model="account" type="text" class="mui-input-clear mui-input" placeholder="手机号" @focus="accountFocus" @blur="accountBlur" >
      </div>
      <div class="mui-input-row" ref="password">
        <span class="mui-icon mui-icon-locked"></span>
        <input id='password' v-model="password" type="password" class="mui-input-clear mui-input" placeholder="设置新密码" @focus="passFocus" @blur="passBlur" >
      </div>
      <div class="mui-input-row" ref="password2">
        <span class="mui-icon mui-icon-locked"></span>
        <input v-model="password2" type="password" class="mui-input-clear mui-input" placeholder="确认密码" @focus="pass2Focus" @blur="pass2Blur" >
      </div>
    </form>

    <div class="mui-content-padded">
      <button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="register">注册</button>
      <div class="link-area"><a id='reg' @click="login">去登录</a>
      </div>
    </div>
    <div class="mui-content-padded oauth-area">

    </div>
    <toast v-model="showTip" :text="tipMessage"> </toast>
    <toast v-model="showWarn" type="cancel" :text="warnMessage" class="warn" width="8.5em">  </toast>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  export default {
    name: "login",
    components:{
      Toast
    },
    data:function () {
      return {
        account:"",
        password:"",
        password2:"",
        showTip:false,
        tipMessage:"",
        showWarn:false,
        warnMessage:"",
        may:false
      }
    },
    methods:{
      register(){
        var that=this;
        if(this.may){
          fetch("/ajax/users/register",{
            method: "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "account="+that.account+"&password="+that.password+"&password2="+that.password2
          }).then(function (e) {
            return e.text();
          }).then(function (e) {
            sessionStorage.userFront=e;
            that.showTip=true;
            that.tipMessage="注册成功";
            setTimeout(function () {
              that.$router.push("/personal")
            },1200)
          })
        }else{
          that.showWarn=true;
          that.warnMessage="请正确填写手机号";
        }

      },
      accountFocus(){
        this.$refs.account.style="border:1px solid #ff8053";
      },
      accountBlur(){
        var that=this;
        this.$refs.account.style="order: 1px solid #C6C5C4;";
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if(this.account==''){
          that.showWarn=true;
          that.warnMessage="请输入手机号";
        }else if(!reg.test(this.account)){
          that.showWarn=true;
          that.warnMessage="手机格式不正确";
        }else{
          fetch("/ajax/users/selected/"+this.account).then(function (e) {
            return e.text()
          }).then(function (e) {
            if(e=="already"){
              that.showWarn=true;
              that.warnMessage="该手机号已注册过";
              that.may=false;
            }else if(e=="none"){
              that.may=true;
            }
          })
        }

      },
      passFocus(){
        this.$refs.password.style="border:1px solid #ff8053";
      },
      passBlur(){
        this.$refs.password.style="order: 1px solid #C6C5C4;";
      },
      pass2Focus(){
        this.$refs.password2.style="border:1px solid #ff8053";
      },
      pass2Blur(){
        this.$refs.password2.style="order: 1px solid #C6C5C4;";
      },
      login(){
        this.$router.go(-1)
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
