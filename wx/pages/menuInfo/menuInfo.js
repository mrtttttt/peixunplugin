// pages/menuInfo/menuInfo.js
var Bmob = require('../../utils/Bmob-1.6.1.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    title:"",
    info:"",
    img:'../images/addfiles.png',
    mnew:false,
    hot:false,
    show:true,
    typeArray:[],
    timeArray:[],
    fid:'',
    cid:'',
    timeIndex:0,
    typeIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const typeArray = Bmob.Query("category");
    typeArray.find().then(e =>{
      this.setData({
        typeArray:e
      })
    })
    const timeArray = Bmob.Query("foodtime");
    timeArray.find().then(e => {
      this.setData({
        timeArray: e
      })
    })

    if(options.id){
      const query = Bmob.Query('menu');
      query.get(options.id).then(res => {
        this.data.typeArray.forEach((item,i)=>{
          if (res.cid.objectId==item.objectId){
            this.setData({
              typeIndex: i,
            })
          }
        })
        this.data.timeArray.forEach((item, i) => {
          if (res.fid.objectId == item.objectId) {
            this.setData({
              timeIndex: i,
            })
          }
        })
        this.setData({
          id: options.id,
          title: res.mname,
          info: res.minfo,
          show:res.show,
          hot:res.hot,
          mnew:res.mnew,
          img:res.mimg
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
  /**
   * 选择是否新品
   */
  switch1Change: function (e) {
    this.setData({
      mnew: e.detail.value
    })
  },
  /**
   * 选择是否热搜
   */
  switch2Change: function (e) {
    this.setData({
      hot: e.detail.value
    })
  },
  /**
   * 选择是否显示
   */
  switch3Change: function (e) {
    this.setData({
      show: e.detail.value
    })
  },
  /**
   * 选择所属场景
   */
  timePickerChange: function (e) {
    this.setData({
      fid: this.data.timeArray[e.detail.value].objectId,
      timeIndex: e.detail.value
    })
  },
  /**
   * 选择所属类型
   */
  typePickerChange: function (e) {
    this.setData({
      cid: this.data.typeArray[e.detail.value].objectId,
      typeIndex:e.detail.value
    })
  },
  /**
   * 更新标题value
   */
  titleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  /**
   * 更新信息value
   */
  infoInput(e) {
    this.setData({
      info: e.detail.value
    })
  },
  /**
   * 上传图片
   */
  upFiles: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
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
  /**
   * 提交  有id是编辑
   */
  submit(){
    const foodtime = Bmob.Pointer('foodtime')
    const fid = foodtime.set(this.data.fid)
    const category = Bmob.Pointer('category')
    const cid = foodtime.set(this.data.cid)
    if (this.data.id) {
      const query = Bmob.Query('menu');
      query.get(this.data.id).then(res => {
        res.set('mname', this.data.title)
        res.set('minfo', this.data.info)
        res.set('mnew', this.data.mnew)
        res.set('hot', this.data.hot)
        res.set('show', this.data.show)
        res.set('fid', fid)
        res.set('cid', cid)
        res.set('mimg',this.data.img)
        res.save().then(res => {
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
    } else {
      const query = Bmob.Query('menu');
      query.set('mname', this.data.title)
      query.set('minfo', this.data.info)
      query.set('mnew', this.data.mnew)
      query.set('hot', this.data.hot)
      query.set('show', this.data.show)
      query.set('fid', fid)
      query.set('cid', cid)
      query.set('mimg', this.data.img)
      query.save().then(res => {
        wx.showToast({
          title: '添加成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        setTimeout(function () {
          wx.navigateBack({})
        }, 1000)
      }).catch(err => {
        console.log(err)
      })
    }
  }

  
})