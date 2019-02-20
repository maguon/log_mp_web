// pages/order/order.js
const app = getApp()
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:"",
    name:'',
    imgFlag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if(e.url!=""){
      this.setData({
        imgFlag:true,
        imgUrl:e.url,
      })
    }

    if (e.name != null || e.name != ""){
      this.setData({
       name:e.name,
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  name:function(e){
   console.log(e)
   var name=e.detail.value;
   this.setData({
     name:name,
   })
  },
  chooseHead:function(){
    var that=this;
    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths=res.tempFilePaths[0]

        console.log(tempFilePaths)
        that.setData({
          imgUrl: tempFilePaths,
          imgFlag:true
        })
      },
    })
  },
  add:function(){
    var userId = app.globalData.userId;
    var name=this.data.name;
    var imgUrl = this.data.imgUrl;

    var params={
      userName:name,
      gender:"",
      birth:"",
      avatar:imgUrl,
    }

    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId +"/userInfo",params, (err, res) => {
      wx.navigateBack({
        
      })
    })
    
  },
})