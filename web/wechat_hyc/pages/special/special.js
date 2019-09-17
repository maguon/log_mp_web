const app = getApp()
const config = require('../../host_config.js');
const reqUtil = require('../../utils/ReqUtil.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: config.host.imageHost,
    specialList:[],
    imageList:[],
    index:0,
    loadingHidden:true,
    size: 20,
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
      var that=this;
    var userId = app.globalData.userId;
    var size = that.data.size;
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/commodity" + "?showStatus=" + 0 +"&start=" + 0 + "&size=" + size, (err, res) => {
    
     this.setData({
       specialList:res.data.result,
       loadingHidden:false
     })
     console.log(this.data.specialList)
    })

 
  },



  bindDetail:function(e){
    console.log(e)
    var index=e.currentTarget.dataset.index;
    var id = this.data.specialList[index].id;
  wx.navigateTo({
    url: '/pages/special/detail/detail?id=' + id,
   })
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
    var size = this.data.size;
    var new_size = size + 6;

    this.setData({
      size: new_size,
    })
    this.onShow();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})