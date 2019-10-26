//index.js
var Bmob = require('../../utils/Bmob-1.6.1.min.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    typeList:[],
    timeList:[],
    newList:[]
  },
  onLoad:function(){
    
  },
  toSearch(){
    wx.navigateTo({
      url: '../lists/lists',
    })
  },
  toDetails(e){
    wx.navigateTo({
      url: '../details/details?id='+e.currentTarget.dataset.id,
    })
  },
  tolists(e){
    wx.navigateTo({
      url: '../lists/lists?id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name + '&type='+e.currentTarget.dataset.type,
    })
  },
  onShow:function(){
    // 最新菜系
    const newList = Bmob.Query('menu');
    newList.equalTo("mnew", "==", true);
    newList.equalTo("show", "==", true);
    newList.find().then(res => {
      this.setData({
        newList: res
      })
    })
    // 类型
    const type = Bmob.Query('category');
    type.find().then(res => {
      this.setData({
        typeList: res
      })
    })
    // 场景
    const time = Bmob.Query('foodtime');
    time.find().then(res => {
      this.setData({
        timeList: res
      })
    })
  }
})
