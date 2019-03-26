
const app = getApp()
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[],
    invoicelist:[], 
    refund:[],
    payment:[],

    paymentId:'',
    orderId:'',
    refundId:'',
    sumfee:'',
    fee:"",

    state: ["已拒绝", "已退款", "待处理"],
    service:["","上门服务","当地自提"],
    applyfee :"",
    remark:'退款原因',

    refuseFlag:false,
    refundFlag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    this.setData({
      paymentId: e.paymentId,
      orderId: e.orderId,
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
    var orderId=this.data.orderId;
    var paymentId = this.data.paymentId;
    var refundId = this.data.refundId;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/payment?paymentId=" + paymentId, (err, res) => {

      if (res.data.result!=""){
      this.setData({
        payment: res.data.result[0] ,
        fee: res.data.result[0].total_fee,
      })
      }
    })
    


    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + orderId, (err, res) => {

      var sumfee = config.decimal(res.data.result[0].total_insure_price + res.data.result[0].total_trans_price);
      //保留小数
      res.data.result[0].total_trans_price = config.decimal(res.data.result[0].total_trans_price)
      res.data.result[0].total_insure_price = config.decimal(res.data.result[0].total_insure_price)
      res.data.result[0].real_payment_price = config.decimal(res.data.result[0].real_payment_price)

      //编译时间
      res.data.result[0].created_on = config.getTime(res.data.result[0].created_on)
      res.data.result[0].updated_on = config.getTime(res.data.result[0].updated_on)



      this.setData({
        sumfee: sumfee,
        orderlist: res.data.result[0],
      })
    })

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/refundApply?orderId=" + orderId + "&refundApplyId=" + refundId, (err, res) => {

      //保留小数
      res.data.result[0].apply_fee = config.decimal(res.data.result[0].apply_fee)
      res.data.result[0].refund_fee = config.decimal(res.data.result[0].refund_fee)
      //编译时间
      res.data.result[0].created_on = config.getTime(res.data.result[0].created_on)
      res.data.result[0].updated_on = config.getTime(res.data.result[0].updated_on)
      //退款金额显示
      if (res.data.result[0].status == 1) {
        this.setData({
          refundFlag: true,

        })
      } else if (res.data.result[0].status == 0) {
        this.setData({
          refundFlag: true,
          refuseFlag: true,
        })
      }
      if (res.data.result[0].payment_type == 1) {
        res.data.result[0].payment_type= true;
      }else{
        res.data.result[0].payment_type = false;
      }

      if (res.data.result[0].apply_reason != null || res.data.result[0].apply_reason != ""){
        this.setData({
          remark: res.data.result[0].apply_reason ,
        })
      }

      this.setData({
        refund: res.data.result[0],
      })
    })


  },



  





  choose: function () {
    var orderId = this.data.orderId;
    var refundId = this.data.refund.id;
    wx.redirectTo({
      url: "/pages/order/refund/pay-msg/pay-msg?orderId=" + orderId + "&name=" + "user" + "&refundId=" + refundId,
    })
  },



  apply: function (e) {
    var applyfee = e.detail.value;
    this.setData({
      applyfee: applyfee,
    })
  },
  why: function (e) {
    var remark = e.detail.value;
    this.setData({
      remark: remark,
    })
  },




  undo: function () {
    var userId = app.globalData.userId;
    var paymentId = this.data.paymentId;
    var orderId = this.data.orderId;
    var refundId = this.data.refundId;

    wx.showModal({
      content: '确定撤销退款申请',
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
          reqUtil.httpDel(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/payment/" + paymentId + "/refundApply/" + refundId)
          wx.navigateBack({

          })
        }
      }
    })
  },



  again: function () {
    var userId = app.globalData.userId;
    var paymentId = this.data.paymentId;
    var orderId = this.data.orderId;
    var refundId = this.data.refund.id;
    var remark = this.data.remark;
    var applyfee = this.data.applyfee;
    var fee = this.data.fee;


    if (applyfee>fee){
      wx.showModal({
        content: '申请金额已大于支付金额',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;

    }else{
    var params = {
      paymentId: paymentId,
      applyFee: applyfee,
      applyReason: remark
    }
    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/refundApply/" + refundId, params, (err, res) => { })
      wx.showToast({
        title: '申请已重新提交',
        icon: 'success',
        duration: 2000,
      })

      setTimeout(function () {
        wx.navigateBack({ })
      }, 2000)
    }
   
  },



 

  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})