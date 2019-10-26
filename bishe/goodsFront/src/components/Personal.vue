<template>
    <div class="personal">
      <header class="mui-bar mui-bar-nav" style="padding-right: 15px;">
        <h1 class="mui-title">我的</h1>
        <button id='setting' class=" mui-pull-right mui-btn-link" @click="gotoSet">
          <em class="mui-icon mui-icon-gear"></em>
        </button>
      </header>
      <div class="userImg" v-if="userFront" >
        <div class="maskImg" >
          <div>
            <img :src="photo" alt="" />
          </div>
        </div>
        <p>欢迎你，{{name}}</p>
      </div>
      <div class="userImg" v-else>
        <router-link to="/login" class="loginBtn">你还没有登录，去登录</router-link>
      </div>
      <img src="@/assets/imgs/gd.png" alt="" class="gd" />
      <div style="padding: 15px;">
        <button-tab v-model="btnTab">
          <button-tab-item selected @on-item-click="consoleIndex()">我的发布</button-tab-item>
          <button-tab-item  @on-item-click="consoleIndex()">购买我的</button-tab-item>
          <button-tab-item @on-item-click="consoleIndex()">我的收藏</button-tab-item>
          <button-tab-item @on-item-click="consoleIndex()">账单信息</button-tab-item>
        </button-tab>
      </div>
      <div class="myInfo" ref="myInfo">我的发布</div>
      <div class="myInfo" ref="myInfo">购买我的</div>
      <div class="myInfo" ref="myInfo">我的收藏</div>
      <div class="myInfo" ref="myInfo">账单信息</div>
      <!--<ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <span class="mui-icon mui-icon-paperplane"></span>
            我的发布
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <span class="mui-icon mui-icon-download"></span>
            购买我的
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <span class="mui-icon mui-icon-compose"></span>
            账单信息
          </a>
        </li>
      </ul>-->
    </div>
</template>

<script>
  import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore, ButtonTab, ButtonTabItem } from 'vux'
    export default {
        name: "personal",
      components: {
        Scroller,
        Divider,
        Spinner,
        XButton,
        Group,
        Cell,
        LoadMore, ButtonTab, ButtonTabItem
      },
      data:function () {
        return {
          userFront:false,
          btnTab:0,
          name:"",
          photo:""
        }
      },
      mounted:function () {
          var that=this;
        if(sessionStorage.getItem("userFront")){
          var uid=sessionStorage.getItem("userFront");
          this.userFront=true;
          fetch("/ajax/users/select/"+uid).then(function (e) {
            return e.json()
          }).then(function (e) {
            that.name=e[0].name;
            that.photo=e[0].photo;
          })
        }
      },
      methods:{
        consoleIndex () {
          switch (this.btnTab){
            case 0:{
              this.$refs.myInfo[0].style="display:block"
            }
          }
          console.log('click demo01', this.btnTab)
        },
        gotoSet(){
          this.$router.push("/setting")
        }
      }
    }
</script>

<style scoped>
  .mui-bar-nav{
    background: #FF8053;
  }
  .gd{width: 100%;}
  .mui-bar-nav h1{color: #fff;}
  .mui-bar-nav em{color: #fff;}
  .userImg{
    text-align: center;
    width: 100%;height: 144px;background: #FF8053;margin-top: 44px;padding-top: 8px;
  }
  .maskImg{
    margin: 0 auto;
    width: 100px;height: 100px;border-radius: 50%;background: rgba(255,255,255,.4);display: flex;justify-content: center;align-items: center;
  }
  .maskImg div{width: 90px;height:90px;border-radius: 50%;overflow: hidden;}
  .maskImg img{width: 100%;height: 100%;float: left;}
  .userImg p{color: #fff;font-size: 16px;margin-top: 15px;}

  .mui-table-view-cell{
    border-bottom: 1px solid #E4E4E4;
  }
  .mui-table-view-cell .mui-navigate-right{color:#333}
  .mui-table-view-cell span{color: #FF7B53;margin-right: 5px;}
  .loginBtn{line-height: 144px;color: #fff;}
  .myInfo{display: none;}
</style>
