// pages/index/foods.js
var Bmob = require('../../utils/Bmob-1.6.1.min.js');
var common = require('../../utils/common.js');

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    data:[],
    hotList:[],
    top:'',
    left:'',
    animationData:''
  },
  onLoad: function (options) {
    this.setData({
      top: getApp().globalData.top,
      left:getApp().globalData.left
    })

    if(options.id){
      this.setData({
        inputVal: options.name
      });
      var where = "";
      if (options.type == "cate") {
        where = "cid";
      } else if (options.type == "time") {
        where = "fid";
      }
      const query = Bmob.Query('menu');
      query.equalTo(where, "==", options.id)
      query.equalTo('show', "==", true)
      query.find().then(res => {
        this.setData({
          data: res
        })
      })
    }
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      data:[]
    });
  },
  inputTyping: function (e) {
    if (e.detail.value){
      this.setData({
        inputVal: e.detail.value
      });
    }else if(e.currentTarget.dataset.value){
      this.setData({
        inputVal: e.currentTarget.dataset.value
      });
    }
    common.getLike(Bmob, "menu", "mname", this.data.inputVal,(lists)=>{
      this.setData({
        data: lists
      });
    });
    
    
  },
  toDetails(e) {
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  onShow: function(){
    const hot = Bmob.Query('menu');
    hot.equalTo('hot', '==', true);
    hot.equalTo('show','==',true);
    hot.find().then(res =>{
      this.setData({
        hotList:res
      })
    })
  },
  /**
   * 增加到列表
   */
  addList: function(e){
    console.log(e)
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    const x = this.data.left - e.touches[0].clientX+20;
    const y = this.data.top - e.touches[0].clientY+20;
    animation.translate(x,y).step({ duration: 1000 });
    this.setData({
      animationData: animation.export()
    })

  },
  /**
   * 移动
   */
  ballMoveEvent: function (e) {
    
    common.move(e,(left,top) =>{
      this.setData({
        top: top,
        left: left
      });
    })
  
  },
  ballClickEvent: function () {
    wx.navigateTo({
      url: '../orderList/orderList'
    })
  }
})