<template>
    <div id="setPass">
      <group>
        <x-input type="text" placeholder="请输入旧密码" :min="6" :max="12" v-model="oldpass"> </x-input>
        <x-input placeholder="请输入6-12位数字" type="text"  v-model="password" :min="6" :max="12" > </x-input>
        <x-input placeholder="请确认6-12位数字" v-model="password2" type="text" :equal-with="password"> </x-input>
        <button @click="submit" class="submit">确认修改</button>
        <toast v-model="showTip" type="text">{{tipMsg}}</toast>
      </group>
    </div>
</template>

<script>
  import { XInput, Group, XButton, Toast } from 'vux'
    export default {
      name: "set-pass",
      components:{XInput, XButton,Group,Toast},
      data:function () {
        return {
          oldpass: '',
          password: '',
          password2: '',
          showTip: false,
          tipMsg: "",
        }
      },
      methods:{
        submit(){
          var that=this;
          if(this.oldpass.trim()==""){
            this.showTip=true;
            this.tipMsg="旧密码不能为空";
          }else if(this.password.trim()=="" ||this.password2.trim()==""){
            this.showTip=true;
            this.tipMsg="新密码不能为空";
          }else if(this.password.trim()!=this.password2.trim()){
            this.showTip=true;
            this.tipMsg="两次密码不一致";
          }else{
            fetch("/ajax/users/updatePass?oldpass="+this.oldpass+"&pass="+this.password+"&uid="+JSON.parse(sessionStorage.getItem("userFront"))).then(function (e) {
              return e.text();
            }).then(function (e) {
              if(e=="ok"){
                that.showTip=true;
                that.tipMsg="修改成功";
                setTimeout(function () {
                  that.$router.go(-1)
                },600)
              }else if(e=="err"){
                that.showTip=true;
                that.tipMsg="修改失败";
                setTimeout(function () {
                  that.$router.go(-1)
                },600)
              }
            })
          }

        }
      }
    }
</script>

<style>
  *{margin: 0;padding: 0;}
  *:after{display: none}
  *:before{display: none}
  #setPass{text-align: center;}
.submit{
  width: 80%;height: 50px;margin-top: 30px;
}
#setPass input{margin:0;}
</style>
