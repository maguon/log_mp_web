// pages/order/submit/submit.js
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
})