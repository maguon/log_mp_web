
const reqUtil = require('../../../../utils/ReqUtil.js')
const config = require('../../../../config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    payment:[],
    paymentId:"",
    refundId:"",
    name:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
  this.setData({
  orderId: e.orderId,
  name:e.name,
 refundId: e.refundId,
 })
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
    var userId = app.globalData.userId;
    var orderId = this.data.orderId;
   
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/payment?orderId=" + orderId, (err, res) => {
     
      console.log(res.data.result)
      if (res.data.result != '') {
        for (var i = 0; i < res.data.result.length; i++) {
          //微信 银行支付判断
          if (res.data.result[i].payment_type == 2) {
            res.data.result[i].payment_type = 0;
          }
          //完成的支付显示
          if (res.data.result[i].type == 1 && res.data.result[i].status == 1) {
            res.data.result[i].state = true;
          }
         
          //保留小数
          res.data.result[i].total_fee = config.decimal(res.data.result[i].total_fee);
          //编译时间
          res.data.result[i].updated_on = config.getTime(res.data.result[i].updated_on);
          res.data.result[i].created_on = config.getTime(res.data.result[i].created_on);
          // res.data.result[i].bank_code = this.bankNum(res.data.result[i].bank_code);
        }
        this.setData({
          payment: res.data.result,
        })  

      }
    })
  },


  /**
       *单项选择控制
       */
  radioChange: function (e) {
    var index = e.currentTarget.dataset.index;
    var payment = this.data.payment;
    var userId = app.globalData.userId;
    var paymentId = payment[index].id;

    var name = this.data.name;
    var orderId = this.data.orderId;
    var refundId = this.data.refundId;

    if (name == "order") {
      wx.redirectTo({
        url: "/pages/order/refund/refund?orderId=" + orderId + "&paymentId=" + paymentId + "&name=" + "",
      })
    } else if (name == "user") {

      var remark = this.data.remark;
      var applyfee = this.data.payment.total_fee;

      var params = {
        paymentId: paymentId,
        applyFee: applyfee,
        applyReason: ""
      }
      reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/refundApply/" + refundId, params, (err, res) => {
      })
      wx.redirectTo({
        url: "/pages/user/refund/ref-detail/ref-detail?orderId=" + orderId + "&paymentId=" + paymentId + "&refundId=" + refundId,
      })
    }

    // 判断用户点击index设置默认
    for (var i = 0, len = payment.length; i < len; ++i) {
     payment[i].stat = i == index;

    }
  
    this.setData({
      payment: payment,
      paymentId: paymentId,
    });
  },



  bankNum: function (e) {
    console.log(e)
    var mphone = e.substring(0, 4) + '**********' + e.substring(14);
    return mphone;
  },



  

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }

})
