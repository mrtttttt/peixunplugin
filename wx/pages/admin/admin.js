// pages/admin/admin.js
var Bmob = require('../../utils/Bmob-1.6.1.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    level: -1,
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getUserInfo: function (e) {
    getApp().globalData.userInfo = e.detail.userInfo
    Bmob.User.upInfo(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    Bmob.User.upInfo(e.detail.userInfo).then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })
    console.log(this.data.userInfo)
  },
  login(){
    Bmob.User.auth().then(res => {
      const query = Bmob.Query('_User');
      query.get(res.objectId).then(res => {
        res.set('level', 0);
        res.save();
      })
      this.setData({
        level: res.level
      })
    }).catch(err => {
      console.log(err)
    });
  },
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('bmob')) {
      const query = Bmob.Query('_User');
      query.get(JSON.parse(wx.getStorageSync('bmob')).objectId).then(res => {
        this.setData({
          level: res.level
        })
      })
      
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  exit:function(){
    wx.removeStorageSync('admin')
    wx.switchTab({
      url: '../index/index',
    })
  },
  typeManage: function () {
    wx.navigateTo({
      url: '../typeManage/typeManage',
    })
  },
  timeManage: function () {
    wx.navigateTo({
      url: '../timeManage/timeManage',
    })
  },
  menuManage: function () {
    wx.navigateTo({
      url: '../menuManage/menuManage',
    })
  },
  usManage: function () {
    wx.navigateTo({
      url: '../usInfo/usInfo',
    })
  },
  nameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passInput: function (e) {
    this.setData({
      pass: e.detail.value
    })
  },
  toLogin: function () {
    const query = Bmob.Query("user");
    query.equalTo("account", "==", this.data.userName);
    query.find().then(res => {
      if (res.length) {
        if (res[0].pass == this.data.pass) {
          wx.setStorageSync("admin", res[0])
          wx.showToast({
            title: '登陆成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          this.onShow()
        } else {
          wx.showToast({
            title: '密码错误',
            icon: "none",
            duration: 1000,
            mask: true
          })
        }
      } else {
        wx.showToast({
          title: '账号不存在',
          icon: "none",
          duration: 1000,
          mask: true
        })
      }
    });
  }

  

  
})