
const app = getApp()
const config = require('../../../host_config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     recordList:[],
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
    var size = that.data.size
    var userId = app.globalData.userId;
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/productOrderAndItem?start=" + 0 + "&size=" + size, (err, res) => {
   
      that.setData({
        recordList:res.data.result,
        loadingHidden:false,
    })
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
    wx.switchTab({
      url: "/pages/user/user",
    })
   
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
  bindRecord: function (e) {
    var index = e.currentTarget.dataset.index;
    var recordList = this.data.recordList;
    var id = recordList[index].id;
    wx.navigateTo({
      url: '/pages/special/order/order?id='+id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})