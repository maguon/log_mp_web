// pages/order/order.js
const app = getApp()
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[],
    flag:false,
    size:6,
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
    var userId = app.globalData.userId;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?status=" + 9 + "&start=" + 0 + "&size=" + this.data.size, (err, res) => {
      if (res.data.result != '') {
        for (var i = 0; i < res.data.result.length; i++) {
          //支付费用
          res.data.result[i].sumFee = config.decimal(res.data.result[i].total_trans_price + res.data.result[i].total_insure_price);
          res.data.result[i].real_payment_price = config.decimal(res.data.result[i].real_payment_price);
          //编译时间
          res.data.result[i].created_on = config.getTime(res.data.result[i].created_on);
          res.data.result[i].updated_on = config.getTime(res.data.result[i].updated_on);
          res.data.result[i].state = 1;
        }
        console.log(res.data.result)
        this.setData({
          orderlist: res.data.result,
          loadingHidden: true,
          flag: true,
        })
      } else {
        this.setData({
          flag: false,
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
    var size = this.data.size;
    var new_size = size + 6;

    this.setData({
      size: new_size,
    })
    this.onLoad();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  
  orderHistory:function(e){
    var index = e.currentTarget.dataset.index;
    var orderId = this.data.orderlist[index].id;
    wx.navigateTo({
      url: "/pages/order/order-pay/order-pay?orderId=" + orderId+"&name="+"",
    })
  }
})