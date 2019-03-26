
//获取应用实例
const app = getApp()
const config = require('../../../host_config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nullHouse: true,
    cusList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
     * 联系客服
     */
  bindCustomer: function () {
    var userId = app.globalData.userId;
    app.bindCustomer(userId);
  },

  
  /**
   * 继续询价
   */
  bindInquiry:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })

  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
  
})