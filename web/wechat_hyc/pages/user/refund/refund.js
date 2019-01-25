// pages/order/order.js
const app = getApp()
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refund:[],
    size:8,
    state:["已拒绝","已退款","待处理"],
    hidden:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;


    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/refundApply?start=" + 0 +"&size="+this.data.size, (err, res) => {
      console.log(res.data.result)
      for (var i = 0; i < res.data.result.length;i++){
        //保留小数
        res.data.result[i].apply_fee = config.decimal(res.data.result[i].apply_fee)
        res.data.result[i].refund_fee = config.decimal(res.data.result[i].refund_fee)
        //编译时间
        res.data.result[i].created_on = config.getTime(res.data.result[i].created_on)
        res.data.result[i].updated_on = config.getTime(res.data.result[i].updated_on)
        //退款金额显示
        if (res.data.result[i].status==1){
          res.data.result[i].hidden=true;
        }
      }

      this.setData({
        refund:res.data.result,
      })
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
    var new_size = size + 8;

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
  bindtap:function(e){
    var index = e.currentTarget.dataset.index;
    var refund = this.data.refund;
    var userId = app.globalData.userId;
    var orderId = refund[index].order_id;
    var paymentId = refund[index].payment_id;
    var refundId = refund[index].id;


    wx.navigateTo({
      url: "/pages/user/refund/ref-detail/ref-detail?orderId=" + orderId + "&paymentId=" + paymentId + "&refundId=" + refundId,
    })
  },


  /**
 * 生命周期函数--监听页面卸载
 */
  onUnload: function () {
  },
})