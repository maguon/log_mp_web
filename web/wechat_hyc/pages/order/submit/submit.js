const config = require('../../../host_config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
    orderId:"",
    name:"",
  },

  onLoad:function(e){
  if (e.name =="create"){
   this.setData({
    hidden:true,
    orderId: e.orderId,
  })
  }
  },
  /**
     * 联系客服
     */
  bindCustomer: function () {
    var userId = app.globalData.userId;
    app.bindCustomer(userId);
  },


  bindInquiry:function(){
    this.setData({
      name: "creat",
    })
     wx.switchTab({
      url: "/pages/order/order",
     })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var name = this.data.name;
    if (name != "creat") {
      wx.switchTab({
        url: "/pages/index/index",
      })
    } 
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})