var Bmob = require('../../utils/Bmob-1.6.1.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const query = Bmob.Query("foodtime");
    query.find().then(res => {
      this.setData({
        list: res
      })
    });
  },
  add: function () {
    wx.navigateTo({
      url: '../typeInfo/typeInfo?table=foodtime'
    })
  },
  edit: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../typeInfo/typeInfo?id=' + id + '&table=foodtime'
    })
  },
  del: function (e) {
    var that = this;
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定删除该场景吗',
      success: function (res) {
        if (res.confirm) {
          const query = Bmob.Query('foodtime');
          query.destroy(id).then(res => {
            wx.showToast({
              title: '删除成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            that.onLoad()
          }).catch(err => {
            console.log(err)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    this.onLoad()
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

  }
})