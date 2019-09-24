const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
   * 托运流程
   */
  consign:function(){
   wx.navigateTo({
   url: '/pages/about/consign/consign',
    })
  },
  /**
  * 跳转服务优势
  */
  service: function () {
    wx.navigateTo({
      url: '/pages/about/service/service',
    })
  },
  /**
 * 跳转关于我们
 */
  we: function () {
    wx.navigateTo({
      url: '/pages/about/we/we',
    })
    // wx.navigateTo({
    //   url: '/pages/map/map',
    // })
  },
  insurance:function(){
    wx.navigateTo({
      url: '/pages/about/insurance/insurance',
    })
  },
  contract:function(){
    wx.navigateTo({
      url: '/pages/about/contract/contract',
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
    return app.onShareApp();
  }
})