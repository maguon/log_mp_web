
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
    phone:"未绑定手机",
    hidden:false,
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
      if (res.data.result[0].phone != "" && res.data.result[0].phone != null){
        this.setData({
          phone: res.data.result[0].phone,
          hidden: true,
        })
      }else{
        this.setData({
          hidden: false,
        })
      }
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
   * getPhoneNumber 信息
   */
  getPhoneNumber: function (e) {
    console.log(e)
    console.log(app.globalData.session_key)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    var userId = app.globalData.userId;
    var that = this;
    var session_key = app.globalData.session_key;
    var iv = e.detail.iv;
    var encryptedData = e.detail.encryptedData;


    if (e.detail.errMsg != 'getPhoneNumber:ok') {
      wx.navigateTo({
        url: '/pages/user/bind/bind',
      })
    } else {
      var params={
        sessionKey: session_key,
        iv: iv,
        encryptedData: encryptedData
      }
      reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/wechatBindPhone",params,(err,res)=>{
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '您已成功绑定',
          success: function (res) {
            that.onShow();
          }
        })
      })   
    }
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
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }

})