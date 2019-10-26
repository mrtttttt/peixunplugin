<template>
    <div class="goods">
      <div>
        <x-header :left-options="{backText: ''}" :right-options="{showMore: true}" @on-click-more="showMenus = true" id="x-header">{{gData.gtitle}}</x-header>
        <div v-transfer-dom>
          <actionsheet :menus="menus" v-model="showMenus" show-cancel> </actionsheet>
        </div>
      </div>
      <div class="goodsUser">
        <img :src="gData.photo" alt="">
        <p>{{gData.name}}</p>
      </div>
      <div class="goodsInfo">
        <p>{{gData.ginfo}}</p>
        <img class="previewer-demo-img" v-for="(item, index) in list" :src="item.src" @click="show(index)">
        <div v-transfer-dom>
          <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"> </previewer>
        </div>
      </div>
      <div class="goodsFoot">
        <div class="box">
          <x-icon class="zan" type="ios-heart-outline" size="20"></x-icon>赞
        </div>
        <div class="box">
          <x-icon class="shoucang" type="ios-star-outline" size="20"></x-icon>收藏
        </div>
        <x-button class="buy" :gradients="['#FF5E3A', '#FF9500']">我想买</x-button>
      </div>
    </div>
</template>

<script>
  import { XHeader, Actionsheet, TransferDom,XButton ,Previewer } from 'vux'

  export default {
    props:["gid"],
    name:'goods-info',
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Actionsheet,
      XButton,
      Previewer
    },
    data () {
      return {
        menus: {
          menu1: '分享',
          menu2: '复制链接'
        },
        showMenus: false,
        gData:[],
        list: [{
          src: 'https://ooo.0o0.ooo/2017/05/17/591c271ab71b1.jpg',
          w: 800,
          h: 400
        },
          {
            src: 'https://ooo.0o0.ooo/2017/05/17/591c271acea7c.jpg'
          }, {
            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
          }],
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    },
    mounted:function () {
      var that=this;
      fetch("/ajax/goods/query/"+this.$route.params.gid).then(function (e) {
        return e.json()
      }).then(function (e) {
        that.gData=e[0];
        var imgArr=e[0].gphoto.split(";")
        for(var i in imgArr){
          that.list[i].src=imgArr[i]
        }
        that.list[0].w=800;
        that.list[0].h=400;
      })
    },
    methods:{
      logIndexChange (arg) {
        console.log(arg)
      },
      show (index) {
        this.$refs.previewer.show(index)
      }
    }
  }
</script>

<style>
.goodsUser{
  width: 100%;height:80px;padding: 15px;
}
.goodsUser:after{content: "";display: block;clear: both;}
.goodsUser img{width: 50px;height: 50px;float: left;}
.goodsUser p{float: left;line-height: 50px;margin-left: 10px;font-size: 20px;color: #333;}
  .goodsInfo{width: 100%;padding: 0 15px 60px;}
  .goodsInfo p{line-height: 30px;color:#000;font-size: 16px;}
  .goodsInfo img{width: 100%}
  .goodsFoot{width: 100%;height: 50px;line-height: 50px;padding: 0 15px;position: fixed;bottom: 0;left: 0;background: #fff;}
  .zan,.shoucang{vertical-align: middle;margin-right: 5px;}
  .shoucang{margin-left: 15px;}
  .box{float: left;font-size: 14px;color: #333;}
  .buy{float: right;width: auto;height: 36px;font-size: 16px;padding: 0 15px;margin: 7px;}
</style>
