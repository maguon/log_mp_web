const app = getApp()
const config = require('../../../host_config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: 0,
    id: '',
    address: [],
    flag: false,
    type: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this.setData({
      price: e.price,
      id: e.id,
      type: e.type,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    if (that.data.address == "") {
      that.setData({
        flag: true
      })
    }
    wx.getStorage({
      key: 'address',
      success: function(res) {
        that.setData({
          address: res.data,
          flag: false
        })
      },
    })
  },
  address: function() {

    wx.navigateTo({
      url: "/pages/user/addressList/addressList?index=" + "3" + "&orderId=" + "",
    })
  },
  /**
   * 生成订单
   */
  wxpay: function() {
    var that = this;
    var userId = app.globalData.userId;
    var address = that.data.address;
    var id = that.data.id;
    var price = that.data.price;
    var type = that.data.type;

    if (address == "") {
      wx.showModal({
        content: '请选择收货地址',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    }

    var params = {
      sendName: address.name,
      sendPhone: address.phone,
      sendAddress: address.address,
      remark: "",
      productOrderItemArray: [{
        commodityId: id,
        type:type
      }]
    }

    reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/productOrder", params, (err, res) => {
      if(res.data.success){
      if (type == 3) {
        wx.navigateTo({
          url: "/pages/special/record/record",
        })
      } else {
        wx.navigateTo({
          url: '/pages/special/wxpay/wxpay?price=' + price + "&orderId=" + res.data.id,
        })
      }
      }else{
        wx.showModal({
          content: res.data.msg,
          showCancel: false,
          confirmColor: "#a744a7",
        });
      }
    })
    

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.removeStorage({
      key: 'address',
      success(res) {
        // console.log(res)
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return app.onShareApp();
  }
})