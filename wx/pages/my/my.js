// pages/my/my.js
var Bmob = require('../../utils/Bmob-1.6.1.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    location: '',
    name0: '',
    tel0: '',
    name1: '',
    tel1: '',
    kitchenArray: [],
    teamArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const query = Bmob.Query('information');
    query.find().then(res => {
      console.log(res)
      this.setData({
        info: res[0].who,
        name0: res[0].tel[0].name,
        tel0: res[0].tel[0].tel,
        name1: res[0].tel[1].name,
        tel1: res[0].tel[1].tel,
        location: res[0].location,
        kitchenArray: res[0].kitchen,
        teamArray: res[0].team
      })
    })
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
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  tel:function(e){
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone,
    })
  }
})