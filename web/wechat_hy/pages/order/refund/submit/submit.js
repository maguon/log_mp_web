// pages/order/refund/submit/submit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
orderId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
this.setData({
   orderId:e.orderId
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
   var orderId = this.data.orderId;
   wx.redirectTo({
     url: '/pages/order/order-pay/order-pay?orderId=' + orderId + "&name=" + "submit",
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