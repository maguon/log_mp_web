
const reqUtil = require('../../../utils/ReqUtil.js')
const config = require('../../../config.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    sumFee:0,
    service: ["上门服务", "当地自提"],
    state:["未支付","部分支付","已支付"],
    lagstate: ["待安排", "待发运", "执行中","已送达"],

    completeFlag: false,
    partFlag:false,  
    refundFlag:false,

    delFlag:false,
    invoiceFlag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    var userId = app.globalData.userId;
    
    var orderId = e.orderId;
    this.setData({
      orderId: e.orderId,
      name:e.name,
    })

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + orderId, (err, res) => {
        //应付费用
        res.data.result[0].sumFee = (res.data.result[0].total_trans_price + res.data.result[0].total_insure_price).toFixed(2);
        //编译时间
        res.data.result[0].created_on = this.getTime(res.data.result[0].created_on);
     if (res.data.result[0].payment_status == 1) {
        this.setData({
          partFlag: true,
          refundFlag:true,
        })
      } else if (res.data.result[0].payment_status == 2) {
        this.setData({
          completeFlag: true,
          refundFlag: true,
        })
      } 

      if(e.name==""){
        this.setData({
          completeFlag: true,
          invoiceFlag:true,
          delFlag:true,
        })
      }

        this.setData({
          orderlist: res.data.result[0],
          service_type: res.data.result[0].service_type - 1,
          sumFee:res.data.result[0].sumFee,
        })
      
      console.log(res.data.result)
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

  },


  //取消订单
 del: function () {
    var userId = app.globalData.userId;

    wx.showModal({
      content: '确定要删除订单吗？',
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
          reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/order/" + this.data.orderId + "/cancel", "", (err, res) => { })
        }
      }
    })
  },


  refund:function(){
  wx.navigateTo({
    url: "/pages/order/refund/refund?orderId=" + this.data.orderId + "&name=" + "refund" + "&paymentId=" + "",
  })
  },


  invoice:function(){

  },
  /**
 * 编译时间
 */
  getTime: function (e) {
    var t = new Date(e);
    var Minutes = t.getMinutes();
    var Seconds = t.getSeconds();
    if (Minutes < 10) {
      Minutes = "0" + Minutes;
    }
    if (Seconds < 10) {
      Seconds = "0" + Seconds;
    }

    var olddata = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + Minutes + ':' + Seconds;
    var time = olddata.replace(/-/g, "/");
    return time;
  },







  carMsg: function () {
    wx.navigateTo({
      url: '/pages/order/car-msg/car-msg?orderId=' + this.data.orderId + "&name=" + "delivery",
    })
  },

  payMsg: function () {
    wx.navigateTo({
      url: '/pages/order/order-pay/bank-pay/end-pay/end-pay?orderId=' + this.data.orderId+"&fee="+this.data.sumFee,
    })
  },

  payment: function () {
  wx.navigateTo({
    url: '/pages/order/order-pay/choose/choose?orderId=' + this.data.orderId + "&fee=" + this.data.orderlist.sumFee +"&param="+"pagment",
  })
  },



  /**
    * 服务方式
    */
  service: function () {
    wx.navigateTo({
      url: '/pages/order/order-pay/service-mode/service-mode?orderId=' + this.data.orderId,
    })
  },




  //取消订单
  cancel: function () {
    var userId = app.globalData.userId;

    wx.showModal({
      content: '确定要取消订单吗？',
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
          reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/order/" + this.data.orderId + "/cancel", "", (err, res) => { })
        }
      }
    })
  },




  /**
  * 复制成功
  */
  textPaste: function () {
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: this.data.orderId,
      success: function (res) {
        wx.getClipboardData({
          //这个api是把拿到的数据放到电脑系统中的
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

    wx.switchTab({
      url: '/pages/order/order',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})