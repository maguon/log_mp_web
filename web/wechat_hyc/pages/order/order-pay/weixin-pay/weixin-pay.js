const app = getApp();
const config = require('../../../../host_config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    totalPrice: 0,
    orderId: '',
    order: [],
    param: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      orderId: e.orderId,
      totalPrice: e.fee,
      param: e.param,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /**
   * 支付方法
   */
  payment: function () {
  
    var that = this;
    var openid = app.globalData.openid;
    var userInfo = app.globalData.userInfo;
    var userId = app.globalData.userId;
    var orderId = that.data.orderId;

    //支付完成跳转页面
    var params = {
      openid: app.globalData.openid,
      totalFee: that.data.totalPrice, //支付金额
    }

    //发送Post请求
    reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/wechatPayment", params, (err, res) => {
 

      wx.requestPayment({
        timeStamp: res.data.result[0].timeStamp + "",
        nonceStr: res.data.result[0].nonce_str,
        package: 'prepay_id=' + res.data.result[0].prepay_id,
        signType: "MD5",
        paySign: res.data.result[0].paySign,
        success: (res) => {       
     
          
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
          
          // //支付完成跳转页面
          // if (that.data.param == "pagment") {
          // wx.navigateBack({
          //     delta: 2
          //   })
            
          // } else if (that.data.param == "order") {
          //   wx.navigateBack({
          //     delta: 3
          //   })
          // } 
          wx.redirectTo({
            url: "/pages/order/order-pay/order-pay?orderId=" + orderId+"&name="+"wexin-pay",
          })
        },
        fail: function (err) {
          wx.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    })

  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }

})