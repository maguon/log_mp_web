const config = require('../../../config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bindInquiry:function(){
    wx.switchTab({
      url: "/pages/order/order",
    })
  },


  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})