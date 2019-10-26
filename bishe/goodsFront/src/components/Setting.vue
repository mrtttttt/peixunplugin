<template>
    <div class="setting">
      <div class="setHead">
        <div>
          <x-icon type="ios-arrow-left" size="30" style="color:#fff"></x-icon>
        </div>
        设置
      </div>
      <router-view> </router-view>

    </div>
</template>

<script>
  import { XButton, Group,Cell,XHeader, Actionsheet } from 'vux'
    export default {
        name: "setting",
      data:function () {
        return {

        }
      },
        components:{
          XButton,Group,Cell,XHeader, Actionsheet,
        },

    }
</script>

<style>
  *:before{display: none}
  *:after{display: none}
p{margin: 0;}
#x-header .vux-header-left a{color:#fff;font-size: 16px;}
.out{width: 80%;margin: 50px auto 0;}
</style>
