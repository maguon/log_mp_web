const app = getApp()
const config = require('../../../host_config.js');
const reqUtil = require('../../../utils/ReqUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderState: [{
        name: "已付定金",
        url: '../../../images/start.png',
        hidden: false,
        status: true,
        number: 1,
      },
      {
        name: "待发货",
        url: '../../../images/go.png',
        hidden: false,
        status: false,
        number: 0.5,
      },
      {
        name: "已发货",
        url: '../../../images/complete.png',
        hidden: false,
        status: false,
        number: 0.5,
      },
      {
        name: "已送达",
        url: '../../../images/none.png',
        hidden: false,
        status: false,
        number: 0.5,
      },
    ],
    id: 0,
    order: [],
    orderItem: [],
    address: [],
    paymentTime: "",
    refundTime: "",
    loadingHidden: true,
    url: config.host.imageHost,
    imglist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this.setData({
      id: e.id
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
    var userId = app.globalData.userId;
    var orderState = that.data.orderState;
    var id = that.data.id;
    var index = 0;
    var url=that.data.url;

    wx.getStorage({
      key: 'address',
      success: function(res) {
        that.setData({
          address: res.data,
        })
      },
    })

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/productOrder?orderId=" + id, (err, res) => {

      if (res.data.result[0].created_on != null) {
        res.data.result[0].created_on = reqUtil.getTime(res.data.result[0].created_on);
      }
      if (res.data.result[0].updated_on != null) {
        res.data.result[0].updated_on = reqUtil.getTime(res.data.result[0].updated_on);
      }
      if (res.data.result[0].departure_time != null) {
        res.data.result[0].departure_time = reqUtil.getTime(res.data.result[0].departure_time);
      }
      if (res.data.result[0].arrive_time != null) {
        res.data.result[0].arrive_time = reqUtil.getTime(res.data.result[0].arrive_time);
      }
      if (res.data.result[0].cancel_time != null) {
        res.data.result[0].cancel_time = reqUtil.getTime(res.data.result[0].cancel_time);
      }


      var order = res.data.result[0];
      var address = that.data.address;

      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/productOrderPayment?productOrderId=" + order.id +"&type="+1, (err, rea) => {
        console.log(rea)
        var payment_time = "";
        var payment_refund_time = "";
        if (rea.data.result != "") {
          if (rea.data.result[0].payment_time != null) {
            payment_time = reqUtil.getTime(rea.data.result[0].payment_time);
          }
          if (rea.data.result[0].payment_refund_time != null) {
            payment_refund_time = reqUtil.getTime(rea.data.result[0].payment_refund_time);
          }
          that.setData({
            paymentTime: payment_time,
            refundTime: payment_refund_time
          })
        }
      })
      if (order.status == 1) {
        index = 1;
      } else if (order.status == 4) {
        index = 2;
      } else if (order.status == 8) {
        index = 3;
      }
      console.log(order.status)
      console.log(index)
      //判断用户点击
      for (var i = 0; i < orderState.length; i++) {
        if (index == i) {
          orderState[i].status = true;
          orderState[i].number = 1;
        } else {
          orderState[i].status = false;
          orderState[i].number = 0.5;
        }
      }

      if (address != "") {
        order.send_name = address.name;
        order.send_phone = address.phone;
        order.send_address = address.address;
      }

      that.setData({
        order: order,
        orderState: orderState,
        loadingHidden: false,
      })
      console.log(order)
    })
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/productOrder/" + id + "/productOrderItem", (err, res) => {
      var orderItem = res.data.result;
      var imglist=[];
      for (var i = 0; i < orderItem.length; i++) {
        imglist.push(url + orderItem[i].image)
      } 
      console.log(imglist)
    
      that.setData({
        imglist: imglist,
        orderItem: orderItem,
      })
    })

  },

  /**
   * 联系客服
   */
  bindCustomer: function() {
    var userId = app.globalData.userId;
    app.bindCustomer(userId);
  },

  /**
   * 地址
   */
  address: function() {

    wx.navigateTo({
      url: "/pages/user/addressList/addressList?index=" + "3" + "&orderId=" + "",
    })
  },
  /**
   * 支付
   */
  wxpay: function() {
    var that = this;
    var userId = app.globalData.userId;
    var orderId = that.data.order.id;
    var order=that.data.order;
    var price = that.data.order.earnest_money;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/productOrder/" + orderId + "/paymentStatus", (err, res) => {
      if(!res.data.result.paymentFlag){
        wx.showModal({
          title:"支付失败",
          content: '该车辆已被其他买家购买，若买家取消订单，您将还有机会购买此车',
          showCancel: false,
          confirmColor: "#a744a7",
        });
      return
      }else{
        var params = {
          sendName: order.send_name,
          sendPhone: order.send_phone,
          sendAddress: order.send_address,
        }
        reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/productOrder/" + orderId + "/sendInfo", params,(err, res) => {
          wx.navigateTo({
            url: '/pages/special/wxpay/wxpay?orderId=' + orderId + "&price=" + price,
          })
  })

   
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
        console.log(res)
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