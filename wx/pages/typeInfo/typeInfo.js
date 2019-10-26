// pages/typeInfo/typeInfo.js
var Bmob = require('../../utils/Bmob-1.6.1.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    img:"../images/addfiles.png",
    table:"",
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      table:options.table
    })
    if(options.id){
      this.setData({
        id: options.id
      })
      const query = Bmob.Query(options.table);
      query.get(options.id).then(res => {
        this.setData({
          title: res[options.table.slice(0, 1) + 'name'],
          img: res[options.table.slice(0, 1) + 'img']
        })
      }).catch(err => {
        console.log(err)
      })
      
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  submit:function(){
    if(this.data.id){
      const query = Bmob.Query(this.data.table);
      query.get(this.data.id).then(res => {
        res.set(this.data.table.slice(0, 1) + 'name', this.data.title)
        res.set(this.data.table.slice(0,1)+'img', this.data.img)
        res.save().then(res =>{
          wx.showToast({
            title: '修改成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          setTimeout(function () {
            wx.navigateBack({})
          }, 1000)
        });
      }).catch(err => {
        console.log(err)
      })
    }else{
      const query = Bmob.Query(this.data.table);
      query.set(this.data.table.slice(0, 1) + 'name', this.data.title)
      query.set(this.data.table.slice(0, 1) + 'img', this.data.img)
      query.save().then(res => {
        wx.showToast({
          title: '添加成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        setTimeout(function(){
          wx.navigateBack({})
        },1000)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  upFiles: function () {
    var that = this;
    wx.chooseImage({
      count:1,
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        var file;
        file = Bmob.File('abc.jpg', tempFilePaths[0]);
        
        file.save().then(res => {
          that.setData({
            img: JSON.parse(res[0]).url
          })
        })

      }
    })
  },
  titleInput:function(e){
    this.setData({
      title:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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

  

  

})