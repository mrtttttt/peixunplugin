<template>
  <div class="home">
    <div class="main">
      <div class="mui-input-row mui-search">
        <input type="search" class="mui-input-clear" placeholder="搜索">
      </div>
    </div>
    <div class="goods">
      <ul class="gUl">
        <li class="gLi" v-for="(item,index) in goodsData" >
          <div class="uInfo">
            <img :src="item.photo" alt="" />
            <p>{{item.name}}</p>
            <span><em>￥&nbsp;</em>{{item.price}}</span>
          </div>
          <div @click="gotoInfo(item.gid)">
            <scroller lock-y :scrollbar-x=false class="imgBox" ref="scroller">
              <div class="box1" ref="imgView">
                <img class="box1-item" v-for="iitem in item.gphoto" :src="iitem" alt="" />
              </div>
              <div class="imgMask" @touchstart="touchStart" :index="index" ></div>
            </scroller>
          </div>
          <div class="gInfo">
            <h4 @click="gotoInfo(item.gid)">{{item.gtitle}}</h4>
          </div>
          <div class="gAddr">
            <p>来自&nbsp;{{item.addr}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { Scroller } from 'vux'

    export default {
      name: "home",
      components: {
        Scroller
      },
      /***
       * goods
       *   gid   name  time  title  info   img  price  category
       *
       *
       *
       * @returns {{goodsData: *[]}}
       */
      data() {
        return {
          goodsData:[
            {gid:1,title:"wre",img:["/static/img/cssj.33cd418.jpg","/static/img/cssj.33cd418.jpg","/static/img/cssj.33cd418.jpg"]},
            {gid:2,title:"wqwqwq",img:["/static/img/cssj.33cd418.jpg","/static/img/cssj.33cd418.jpg","/static/img/cssj.33cd418.jpg","/static/img/cssj.33cd418.jpg"]}
          ]
        }
      },
      mounted:function () {
        var that=this;
        fetch("/ajax/goods/select").then(function (e) {
          return e.json()
        }).then(function (e) {
          that.goodsData=e;
        })
      },
      methods: {
        touchStart: function (ev) {
          this.startX = ev.touches[0].clientX;
          //动态设置imgView的宽度
          var imgs = ev.target.parentNode.getElementsByTagName("img");
          var width = 0;
          for (var i = 0; i < imgs.length; i++) {
            width += imgs[i].width;
            width += 15;
          }
          let imgView = ev.target.previousElementSibling;
          imgView.style.width = width + 'px';
          let a=ev.target.parentNode.parentNode.parentNode;
          let index=ev.target.getAttribute("index")
          this.$refs.scroller[index].reset();
        },
        gotoInfo:function (gid) {
          this.$router.push("/goodsInfo/"+gid)
        }
      }
    }
</script>

<style scoped>
  body{background: #F4F5F9;}
  .main{
    width: 100%;margin: 0 auto;background: #FF8053;padding: 10px 5%;
    position: fixed;top: 0;left: 0;z-index: 9;
  }
  .main input{background: #fff;margin-bottom: 0;font-size: 14px;}
  .goods{margin-top: 54px;padding-bottom: 50px;}
  .gUl{
    padding: 0;width: 100%;overflow: hidden;margin: 0;background: #efefef;
  }
  .gLi{
    padding: 10px 5%;
    margin-top: 13px;width: 100%;float: left;background: #fff;
  }
  .uInfo{
    width: 100%;overflow: hidden;
  }
  .uInfo img{
    width: 35px;height: 35px;float: left;
  }
  .uInfo p{float: left;margin-left: 10px;line-height: 35px;color: #333;font-size: 16px;}
  .uInfo span{float: right;color: #F74949;font-size: 18px;line-height: 35px;}
  .uInfo span em{font-size: 14px;}
  .imgBox{height: 100px;overflow: hidden;position: relative;width: 100%;display: block;}
  .imgMask{width: 100%;height: 100%;position: absolute;top: 0;left:0;z-index: 5;opacity: 0;}
  .gInfo h4{line-height: 35px;font-size: 16px;}
  .gAddr p{color: #35ADFF;margin-bottom: 0;}
  .box1 {
    height: 100px;
    position: relative;
  }
  .box1-item {
    height: 100px;
    background-color: #ccc;
    display:inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }
  .box1-item:first-child {
    margin-left: 0;
  }
  .box2-wrap {
    height: 300px;
    overflow: hidden;
  }
</style>
