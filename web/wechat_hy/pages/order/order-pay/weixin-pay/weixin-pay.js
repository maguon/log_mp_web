const app = getApp();
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    totalPrice: 0,
    orderId: '',
    order: [],
    param: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
 
    this.setData({
      orderId: e.orderId,
      totalPrice: e.fee,
      param: e.param,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /**
   * 支付方法
   */
  payment: function () {
  
    var that = this;
    var openid = app.globalData.openid;
    var userInfo = app.globalData.userInfo;
    var userId = app.globalData.userId;
    var orderId = that.data.orderId;

    var params = {
      openid: app.globalData.openid,
      totalFee: that.data.totalPrice, //支付金额
    }
    console.log(app.globalData.openid)
    //发送Post请求
    reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/wechatPayment", params, (err, res) => {
      console.log(res.data.result)

      wx.requestPayment({
        timeStamp: res.data.result[0].timeStamp + "",
        nonceStr: res.data.result[0].nonce_str,
        package: 'prepay_id=' + res.data.result[0].prepay_id,
        signType: "MD5",
        paySign: res.data.result[0].paySign,
        success: (res) => {       
          console.log('支付成功');
     
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
          
          //支付完成跳转页面
          if (this.data.param == "payment") {
          wx.navigateBack({
              delta: 2
            })
          } else if (this.data.param == "order") {
            wx.navigateBack({
              delta: 3
            })
          } 
          
        },
        fail: function (err) {
          console.log('支付失败')
          console.log(err)
          wx.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    })

  },
  money: function (e) {
    //钱数小数点后二位设定
    var total_price = Number(e);
    var money = total_price.toFixed(2);
    return money;
  },


})