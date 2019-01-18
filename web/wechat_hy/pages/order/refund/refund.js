
const reqUtil = require('../../../utils/ReqUtil.js')
const config = require('../../../config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   orderlist:[],
   paymentlist:[],
   orderId:"",
   paymentId:"",
   hidden:false,
   orderPay:"",
   butFlag:false,
    applyfee:"",
    remark:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    this.setData({
     orderId:e.orderId,
      paymentId:e.paymentId
    })

    // if (e.name=="refund"){
    //   this.setData({
    //      butFlag:true,
    //   })
    // }else{
    //   this.setData({
    //     butFlag: false,
    //   })
    // }
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + e.orderId, (err, res) => {
      this.setData({
        orderlist: res.data.result[0],
      })
    })

   
  },


  choose:function(){
    var orderId = this.data.orderId;
    wx.navigateTo({
      url: "/pages/order/refund/pay-msg/pay-msg?orderId=" + orderId,
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
    var paymentId = this.data.paymentId;

    if (paymentId != '') {
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/payment?paymentId=" + paymentId, (err, res) => {
        var fee = (res.data.result[0].total_fee).toFixed(2);

          this.setData({
            orderPay: "支付金额:" +fee+"元",
          })
      })
    }
  },

  apply:function(e){
    var applyfee = e.detail.value;
    this.setData({
      applyfee: applyfee,
    })
  },
  why:function(e){   
    var remark = e.detail.value;
    this.setData({
      remark: remark,
    })
  },

  bindAdd:function(){
    var that=this;
    var userId = app.globalData.userId;
    var orderId = that.data.orderId;
    var paymentId = that.data.paymentId;
    var remark=that.data.remark;

    //获取要传递的参数
    var params={
      mark: that.data.remark,
      applyFee: that.data.applyfee,
    }

    //发送Post请求
    reqUtil.httpPost(config.host.apiHost + '/api/user/' + userId + "/order/" + orderId + "/payment/" + paymentId +"/refundApply", params, (err, res) => { }) 

  wx.navigateTo({
    url: "/pages/order/refund/submit/submit?orderId=" + orderId,
  })
  }
})