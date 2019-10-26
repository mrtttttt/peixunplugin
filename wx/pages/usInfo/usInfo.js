// pages/usInfo/usInfo.js
var Bmob = require('../../utils/Bmob-1.6.1.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    info:'',
    location:'',
    name0:'',
    tel0:'',
    name1:'',
    tel1:'',
    kitchenArray:[],
    teamArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const query = Bmob.Query('information');
    query.find().then(res =>{
      this.setData({
        id:res[0].objectId,
        info:res[0].who,
        name0: res[0].tel[0].name,
        tel0: res[0].tel[0].tel,
        name1: res[0].tel[1].name,
        tel1:res[0].tel[1].tel,
        location:res[0].location,
        kitchenArray: res[0].kitchen,
        teamArray:res[0].team
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
    
  },
  onHide: function () {
    for(var i of this.data.kitchenArray){
      const del = Bmob.File();
      del.destroy(i).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err)
      })  
    }
  },
  infoInput: function (e) {
    this.setData({
      info: e.detail.value
    })
  },
  locationInput: function (e) {
    this.setData({
      location: e.detail.value
    })
  },
  name0Input: function (e) {
    this.setData({
      name0: e.detail.value
    })
  },
  tel0Input: function (e) {
    this.setData({
      tel0: e.detail.value
    })
  },
  name1Input: function (e) {
    this.setData({
      name1: e.detail.value
    })
  },
  tel1Input: function (e) {
    this.setData({
      tel1: e.detail.value
    })
  },
  submit: function () {
    const o = { 0: { name: this.data.name0, tel: this.data.tel0 }, 1: { name: this.data.name1, tel: this.data.tel1 }}
    const obj = new Object(o);

    const query = Bmob.Query('information');
    query.get(this.data.id).then(res => {
      res.set('who', this.data.info);
      res.set('location', this.data.location);
      res.set('tel', obj);
      res.set('team', this.data.teamArray);
      res.set('kitchen', this.data.kitchenArray);
      res.save().then(e =>{
        wx.showToast({
          title: '添加成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../my/my',
          })
        }, 1000)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  kitchenFiles: function () {
    var _this = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        var file;
        for (let item of tempFilePaths) {
          file = Bmob.File('kitchen.jpg', item);
        }
        file.save().then(res => {
          const arr=[];
          for(const i in res){
            arr[i] = JSON.parse(res[i]).url
          }
          
          _this.setData({
            kitchenArray: _this.data.kitchenArray.concat(arr)
          })
          console.log(_this.data.kitchenArray)
        })
      }
    })
  },
  teamFiles: function () {
    var _this = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        var file;
        for (let item of tempFilePaths) {
          file = Bmob.File('team.jpg', item);
        }
        file.save().then(res => {
          const arr = [];
          for (const i in res) {
            arr[i] = JSON.parse(res[i]).url
          }
          _this.setData({
            teamArray: _this.data.teamArray.concat(arr)
          })
        })

      }
    })
  }



  
})