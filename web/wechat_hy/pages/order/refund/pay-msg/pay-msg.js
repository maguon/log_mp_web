
const reqUtil = require('../../../../utils/ReqUtil.js')
const config = require('../../../../config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    payment:[],
    paymentId:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
  this.setData({
  orderId: e.orderId,
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
    var userId = app.globalData.userId;
    var orderId = this.data.orderId;
   
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/payment?orderId=" + orderId, (err, res) => {
     
      console.log(res.data.result)
      if (res.data.result != '') {
        for (var i = 0; i < res.data.result.length; i++) {
          //微信 银行支付判断
          if (res.data.result[i].payment_type == 2) {
            res.data.result[i].payment_type = 0;
          }
          if (res.data.result[i].type == 0) {
            res.data.result[i].state = 0;
          }
          //保留小数
          res.data.result[i].total_fee = this.decimal(res.data.result[i].total_fee);
          //编译时间
          res.data.result[i].updated_on = this.getTime(res.data.result[i].updated_on);
          res.data.result[i].created_on = this.getTime(res.data.result[i].created_on);
          // res.data.result[i].bank_code = this.bankNum(res.data.result[i].bank_code);
        }
        this.setData({
          payment: res.data.result,
        })  

      }
    })
  },


  /**
       *单项选择控制
       */
  radioChange: function (e) {
    var index = e.currentTarget.dataset.index;
    var payment = this.data.payment;
    var userId = app.globalData.userId;
    var paymentId = payment[index].id;
    console.log(payment[index].id)
    console.log(index)
    // 判断用户点击index设置默认
    for (var i = 0, len = payment.length; i < len; ++i) {
     payment[i].stat = i == index;

    }
  
    this.setData({
      payment: payment,
      paymentId: paymentId,
    });
  },


  /**
    * 保留小数
    */
  decimal: function (e) {
    //钱数小数点后二位设定
    var total_price = Number(e);
    var money = total_price.toFixed(2);
    return money;
  },

  bankNum: function (e) {
    console.log(e)
    var mphone = e.substring(0, 4) + '**********' + e.substring(14);
    return mphone;
  },



  /**
* 编译时间
*/
  getTime: function (e) {
    var t = new Date(e);
    var Minutes = t.getMinutes();
    var Seconds = t.getSeconds();
    if (Minutes < 10) {
      Minutes = "0" + Minutes;
    }
    if (Seconds < 10) {
      Seconds = "0" + Seconds;
    }

    var olddata = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + Minutes + ':' + Seconds;
    var time = olddata.replace(/-/g, "/");
    return time;
  },

  bindAdd:function(){
    wx.redirectTo({
      url: "/pages/order/refund/refund?orderId=" + this.data.orderId + "&paymentId=" +this.data.paymentId + "&name=" + "",
    })
  }
})