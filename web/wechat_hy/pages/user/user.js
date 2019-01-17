// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },
/**
 * 绑定手机
 */
  bandPhone:function(){
  wx.navigateTo({
    url: '/pages/user/bind/bind',
  })
  },
/**
 * 设置
 */
  edit:function(){
    wx.navigateTo({
      url: '/pages/user/set/set',
    })
  },
  /**
   * 历史订单
   */
  orderHistory:function(){
    wx.navigateTo({
      url: '/pages/user/order-history/order-history',
    })
  },

/**
 * 发票管理
 */
invoice:function(){
wx.navigateTo({
  url: '/pages/user/invoice/invoice',
})
  },

  refund:function(){
    wx.navigateTo({
      url: '/pages/user/refund/refund',
    })
  },
  invoiceHead:function(){
    wx.navigateTo({
      url: "/pages/user/invoice/msg-list/msg-list",
    })
  },
  address:function(){
    wx.navigateTo({
      url: "/pages/user/addressList/addressList",
    })
  },
  bankCard:function(){
    wx.navigateTo({
      url: "/pages/order/order-pay/bank-pay/add-card/add-card",
    })
  }
})