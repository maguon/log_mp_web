// pages/user/invoice/invoice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  invoiceList:[{name:"开票订单",url:'',hidden: false,}, { name: "未开票订单", url: '',hidden: true}],
  index:0,
  hidden:false,
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
 * 确认点击
 */
  chooseInvoice:function(e){
   console.log(e)
   var invoice=this.data.invoiceList;
   var index=e.currentTarget.dataset.index;

    //判断用户点击
    for (var i = 0; i < invoice.length; i++) {
      if (index == i) {
        invoice[i].hidden = false;
      } else {
        invoice[i].hidden = true;
      }
    }
    this.setData({
      invoiceList:invoice,
      index: index,
    })
    
  },

  bindtap:function(){
  var index=this.data.index;

    if (index){
      wx.navigateTo({
        url: '/pages/user/invoice/apply/apply',
      })
    }else{
      wx.navigateTo({
        url: '/pages/user/invoice-detail/invoice-detail',
      })
    }
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