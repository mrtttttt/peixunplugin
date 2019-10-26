<template>
    <div class="setMain">
      <group>
        <cell title="用户名" @click.native="changeAccount" :value="userInfo.name" is-link> </cell>
        <cell title="绑定手机"  @click.native="changePhone" :value="userInfo.phone" is-link> </cell>
        <cell title="修改密码" is-link :link="{path:'/setPass'}"> </cell>
      </group>
      <div @click="out">
        <x-button :gradients="['#FF5E3A', '#FF9500']" class="out">退出</x-button>
      </div>
      <toast v-model="show" type="text">退出成功！</toast>
      <div style="padding:15px;">
        <!--<x-button type="primary"> yonghu </x-button>-->
      </div>
      <div v-transfer-dom>
        <confirm v-model="show5"
                 show-input
                 :input-attrs="{type: 'text'}"
                 ref="confirm5"
                 :title="confirmTitle"
                 @on-confirm="onConfirm5"
                 @on-show="onShow5">
        </confirm>
      </div>
    </div>
</template>

<script>
  import { XButton, Group,Cell,XHeader,Toast,XInput,Confirm,TransferDomDirective as TransferDom  } from 'vux'
  export default {
    name: "set-main",
    directives: {
      TransferDom
    },
    data:function () {
      return {
        show:false,
        //show5修改用户名
        show5:false,
        userInfo:[],
        confirmTitle:"",
        confirmMsg:"",
        confirmType:"",
      }
    },
    components:{
      XButton,Group,Cell,XHeader,Toast,XInput,Confirm
    },
    mounted:function () {
      var that=this;
      var uid=sessionStorage.getItem("userFront");
      fetch("/ajax/users/select/"+uid).then(function (e) {
        return e.json()
      }).then(function (e) {
        that.userInfo=e[0]
      })
    },
    methods:{
      out(){
        var that=this;
        sessionStorage.removeItem("userFront");
        this.show=true;
        setTimeout(function () {
          that.$router.push("/")
        },500)
      },
      onShow5 () {
        this.$refs.confirm5.setInputValue(this.confirmMsg)
      },
      onConfirm5 (value) {
        var that=this;
        fetch("/ajax/users/update?type="+that.confirmType+"&a="+value+"&uid="+that.userInfo.uid).then(function (e) {
          return e.text()
        }).then(function (e) {
          if(e=="ok"){
            if(that.confirmType=="name"){
              that.userInfo.name=value;
            }else if(that.confirmType=="phone"){
              that.userInfo.phone=value;
            }
          }
        })
      },
      changeAccount(){
        this.confirmType="name"
        this.confirmTitle="修改用户名"
        this.confirmMsg=this.userInfo.name
        this.show5=true;
      },
      changePhone(){
        this.confirmType="phone"
        this.confirmTitle="修改手机号"
        this.confirmMsg=this.userInfo.phone
        this.show5=true;
      }
    }
  }
</script>

<style scoped>
  .vux-cell-bd p{margin: 0;}
  .out{width: 80%;margin: 50px auto 0;}
</style>
