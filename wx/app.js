//app.js
var Bmob = require('utils/Bmob-1.6.1.min.js');
Bmob.initialize("1b460ba08ae543354b7e203cca89984f", "6ad07a975efd0f80bf9a2dc47693e119");
App({
  globalData:{
    left:200,
    top:200,
    userInfo:null
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
  }
})

