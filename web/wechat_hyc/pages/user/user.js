// pages/order/order.js
const app = getApp()
const config = require('../../config.js');
const reqUtil = require('../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    headFlag:false,
    url:"",
    name:"",
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
    var userId = app.globalData.userId;

    reqUtil.httpGet(config.host.apiHost + "/api/user?userId=" + userId, (err, res) => {
      //目的城市 城市ID
      this.setData({
        user: res.data.result[0],
        url:res.data.result[0].avatar,
        name: res.data.result[0].user_name,
        headFlag: true,
      })
    })

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
      url: '/pages/user/set/set?url='+this.data.url+"&name="+this.data.name,
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
      url: "/pages/user/invoice/msg-list/msg-list?applyId="+"",
    })
  },
  address:function(){
    wx.navigateTo({
      url: "/pages/user/addressList/addressList?index="+""+"&orderId="+"",
    })
  },
  bankCard:function(){
    wx.navigateTo({
      url: "/pages/order/order-pay/bank-pay/add-card/add-card",
    })
  }
})