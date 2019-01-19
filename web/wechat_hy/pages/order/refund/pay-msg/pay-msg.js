
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
    refundId:"",
    name:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
  this.setData({
  orderId: e.orderId,
  name:e.name,
 refundId: e.refundId,
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
          //完成的支付显示
          if (res.data.result[i].type == 1 && res.data.result[i].status == 1) {
            res.data.result[i].state = true;
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
    var name=this.data.name;
    var userId = app.globalData.userId;
    var paymentId = this.data.paymentId;
    var orderId = this.data.orderId;
    var refundId = this.data.refundId;


    if(name=="order"){
    wx.redirectTo({
      url: "/pages/order/refund/refund?orderId=" + this.data.orderId + "&paymentId=" +this.data.paymentId + "&name=" + "",
    })
    } else if (name == "user") {

      var remark = this.data.remark;
      var applyfee = this.data.applyfee;

      var params = {
        paymentId: paymentId,
        applyFee: 0,
        applyReason: ""
      }
      reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/refundApply/" + refundId, params, (err, res) => {
      })
      wx.redirectTo({
        url: "/pages/user/refund/ref-detail/ref-detail?orderId=" + this.data.orderId + "&paymentId=" + this.data.paymentId + "&refundId=" + refundId,
      })
    }
  },



})
