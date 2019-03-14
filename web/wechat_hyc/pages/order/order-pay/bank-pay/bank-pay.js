const reqUtil = require('../../../../utils/ReqUtil.js')
const config = require('../../../../config.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    focus:false,
    hidden: false,
    banklist:[],
    bankMsg: [],
    cost_num:"",
    totalPrice: '',
    orderId: '',
    paymentId:"",
    name:'',
    payText:'去支付',
    param:"",
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      totalPrice: e.fee,
      orderId: e.orderId,
      name:e.name,
      paymentId: e.paymentId,  
      param: e.param,
    })
     if (e.name =="Modify"){
      this.setData({
        payText:"确认修改"
      })
    }

    reqUtil.httpGet(config.host.apiHost + '/api/companyBank',(err,res)=>{
      this.setData({
        banklist:res.data.result,
      })
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userId = app.globalData.userId;

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
    var that=this;
    var totalPrice = that.data.totalPrice;
    var costNum = that.data.cost_num;
    var userId = app.globalData.userId;
    var orderId = that.data.orderId;
    var name=that.data.name;
    var paymentId = that.data.paymentId; 



    if (that.data.hidden == false) {
   
      wx.showModal({
        content: "请选择您的银行卡",
        showCancel: false,
        confirmColor: "#a744a7",
      })
      return;
    } else if (costNum == "") {
     
      wx.showModal({
        content: "请输入您要支付的金额",
        showCancel: false,
        confirmColor: "#a744a7",
      })
      return;
    } else if (costNum > parseFloat(totalPrice)) {
      wx.showModal({
        content: "输入金额不能大于支付的金额",
        showCancel: false,
        confirmColor: "#a744a7",
      })
      return;
    } else  if (name == "Modify") {
     
        var params = {
          bank: that.data.bankMsg.bank,
          bankCode: that.data.bankMsg.bank_code,
          accountName: that.data.bankMsg.account_name,
          totalFee: costNum,
        }
        reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/payment/" + paymentId + "/bankInfo", params, (err, res) => {
          wx.navigateBack({
          })
        })
     } else if (costNum < totalPrice) {
   
        wx.showModal({
          content: "当前支付金额不足应支付费用，确定支付部分费用？",
          confirmColor: "#a744a7",
          success(res) {
            if (res.confirm) {
            //全部支付
            var params = {
              remark: "",
              bank: that.data.bankMsg.bank,
              bankCode: that.data.bankMsg.bank_code,
              accountName: that.data.bankMsg.account_name,
              totalFee: costNum,
              }
        reqUtil.httpPost(config.host.apiHost + '/api/user/' + userId + "/order/" + orderId + "/bankPayment", params, (err, res) => {
          //支付完成跳转页面
          if (that.data.param == "pagment") {
            wx.navigateBack({
              delta: 2
            })
          } else if (that.data.param == "order") {
            wx.navigateBack({
              delta: 3
            })
          } 
            }) 
            } 
          }
        })
        return;
      }else {
     
            var param = {
              remark: "",
              bank: that.data.bankMsg.bank,
              bankCode: that.data.bankMsg.bank_code,
              accountName: that.data.bankMsg.account_name,
              totalFee: costNum, 
            }
            reqUtil.httpPost(config.host.apiHost + '/api/user/' + userId + "/order/" + orderId + "/bankPayment", param, (err, res) => {

              wx.showToast({
                title: '请自行进行转账',
                icon: 'success',
                duration: 2000
              })
              setTimeout(function () {
                //支付完成跳转页面
                if (that.data.param == "pagment") {
                  wx.navigateBack({
                    delta: 2
                  })
                } else if (that.data.param == "order") {
                  wx.navigateBack({
                    delta: 3
                  })
                } 
              }, 2000)
           
              })     
    }
  },


  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})