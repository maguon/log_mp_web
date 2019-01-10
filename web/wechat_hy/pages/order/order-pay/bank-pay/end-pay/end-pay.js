const reqUtil = require('../../../../../utils/ReqUtil.js')
const config = require('../../../../../config.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    flag:false,
    // state:["审核中","已确认"],
    bankMsg: [],
    payment:[],
    cost_num: "",
    totalPrice: '',
    orderId: '',
    paymentId:'',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    this.setData({
      totalPrice: e.fee,
      orderId: e.id,
      paymentId: e.paymentId,
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userId = app.globalData.userId;
    var paymentId = this.data.paymentId;
    var orderId=this.data.orderId;

    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/inquiryBank", (err, res) => {
      console.log(res)
      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].status == 1) {
          res.data.result[i].bank_code = this.bankNum(res.data.result[i].bank_code);
          this.setData({
            bankMsg: res.data.result[i],
            hidden: true,
          })
        }
      }
    })

    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/payment?orderId=" + orderId +"&paymentId="+paymentId, (err, res) => {
      console.log(res.data.result)
      res.data.result[0].total_fee = this.decimal(res.data.result[0].total_fee);
      if (res.data.result[0].status==1){
        this.setData({
         flag:true,
        })
      }
    this.setData({
      payment:res.data.result[0],
    })
   
    })
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



  chooseBank: function () {
    wx.navigateTo({
      url: '/pages/order/order-pay/bank-pay/add-card/add-card',
    })
  },

  costNum: function (e) {
    console.log(e)
    var num = e.detail.value;
    this.setData({
      cost_num: num,
    })
  },


  bankNum: function (e) {
    console.log(e)
    var mphone = e.substring(0, 4) + '**********' + e.substring(14);
    return mphone;
  },




  bindtap: function () {
    var that = this;
    var costNum = that.data.cost_num;
    var userId = app.globalData.userId;
    var orderId = that.data.orderId;

    var param = {
      remark: "",
      bank: that.data.bankMsg.bank,
      bankCode: that.data.bankMsg.bank_code,
      accountName: that.data.bankMsg.account_name,
      totalFee: costNum,
    }
    reqUtil.httpPost(config.host.apiHost + '/api/user/' + userId + "/order/" + orderId + "/bankPayment", param, (err, res) => {
      console.log(res.data.id);
      this.setData({
        paymentId: res.data.id,
      })
      this.onShow();
 
    })
  },
})