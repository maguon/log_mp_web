const reqUtil = require('../../../utils/ReqUtil.js')
const config = require('../../../config.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    service: ["上门服务", "当地自提"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    var userId = app.globalData.userId;
    this.setData({
      orderId: e.id,
    })

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + e.id, (err, res) => {
      if (res.data.result != '') {
        // for (var i = 0; i < res.data.result.length; i++) {
        //保留2位小数
        res.data.result[0].total_insure_price = (res.data.result[0].insure_price + res.data.result[0].trans_price).toFixed(2);
        //   //设置显示
        //   if (res.data.result[i].status == 3) {
        //     res.data.result[i].state = 0;
        //   } else if (res.data.result[i].status == 1) {
        //     this.setData({
        //       disabled: true,
        //     })
        //   } else {
        //     res.data.result[i].state = 1;
        //   }
        // }
        this.setData({
          orderlist: res.data.result[0],
          service_type: res.data.result[0].service_type - 1,
        })
      }
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


  carMsg: function () {
    wx.navigateTo({
      url: '/pages/order/car-msg/car-msg?orderId=' + this.data.orderId,
    })
  },

  payMsg:function(){
    wx.navigateTo({
      url: '/pages/order/order-pay/bank-pay/bank-pay?orderId=' + this.data.orderId + "&fee=" + this.data.orderlist.total_insure_price,
    })
  },

  payment: function () {
    wx.navigateTo({
      url: '/pages/order/order-pay/weixin-pay/weixin-pay?orderId=' + this.data.orderId + "&fee=" + this.data.orderlist.total_insure_price,
    })
  },



  /**
    * 服务方式
    */
  service: function () {
    wx.navigateTo({
      url: '/pages/order/transport/transport?orderId=' + this.data.orderId,
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