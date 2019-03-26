const config = require('../../../host_config.js');
const app=getApp();
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
      * 联系客服
      */
  bindCustomer: function () {
    var userId = app.globalData.userId;
    app.bindCustomer(userId);
  },

  
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})