// pages/order/order-pay/payment/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    name:"",
    orderId:'',
    fee:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    this.setData({
      orderId: e.orderId,
      fee:e.fee,
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



  bindtap:function(){
    var name=this.data.name;
    if (name == '' || name == "weixin") {
      wx.navigateTo({
        url: "/pages/order/order-pay/weixin-pay/weixin-pay?orderId="+this.data.orderId+"&fee="+this.data.fee,
      })
    } else if (name == "bank"){
    wx.navigateTo({
      url: '/pages/order/order-pay/bank-pay/bank-pay?orderId=' + this.data.orderId + "&fee=" + this.data.fee,
    })
    }
  },
  /**
    * 选择新车
    */
  checkboxChange: function (e) {
    console.log(e)
    var name=e.currentTarget.dataset.name;
   
    if (this.data.checked == 0) {
      this.setData({
        checked: 1,
        name:name,
      })
    } else {
      this.setData({
        checked: 0,
        name:name,
      })
    }

  },


  // /**
  //   * 保留小数
  //   */
  // decimal: function (e) {
  //   //钱数小数点后二位设定
  //   var total_price = Number(e);
  //   var money = total_price.toFixed(2);
  //   return money;
  // },
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})