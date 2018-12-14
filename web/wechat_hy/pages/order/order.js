// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderState:[
      {
        name:"待协商",
        url:'../../images/negotiation.png',
        hidden:false,
        status:true,
        number:1,
      },
      {
        name: "待完善",
        url: '../../images/perfect.png',
        hidden: false,
        status: false,
        number: 0.5,
      },
      {
        name: "待付款",
        url: '../../images/pay.png',
        hidden: false,
        status: false,
        number: 0.5,
      },
      {
        name: "待发运",
        url: '../../images/stay.png',
        hidden: false,
        status: false,
        number: 0.5,
      },
      {
        name: "待签收",
        url: '../../images/closed.png',
        hidden: false,
        status: false,
        number: 0.5,
      },
      {
        name: "待评价",
        url: '../../images/evaluation.png',
        hidden: false,
        status: false,
        number: 0.5,
      }
    ],


   

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

  },
/**
 * 订单导航栏
 */
  selectButton:function(e){
    console.log(e)
    var that=this;
    var index=e.currentTarget.dataset.index;
    var orderState = that.data.orderState;
    //判断用户点击
    for (var i = 0; i < orderState.length;i++){
      if (index==i){
        orderState[i].status = true;
        orderState[i].number=1;
        console.log(i+'----')
      }else{
        orderState[i].status = false;
        orderState[i].number = 0.5;
        console.log(i)
      }
    }
    //更新点击
    that.setData({
      orderState: orderState,
    })
  },
  bindDetail:function(){
    wx.navigateTo({
      url: '/pages/order/order-discuss/order-discuss',
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})