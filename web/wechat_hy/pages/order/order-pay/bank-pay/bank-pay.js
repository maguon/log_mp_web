const reqUtil = require('../../../../utils/ReqUtil.js')
const config = require('../../../../config.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    bankMsg: [],
    cost_num:0,
    totalPrice: '',
    orderId: '',
    paymentId:"",
    name:'',
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
    var totalPrice = parseInt(that.data.totalPrice);
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
    } else if(costNum != 0){

      if (costNum < totalPrice) {
        wx.showModal({
          content: "当前支付金额不足应支付费用，确定支付部分费用？",
          confirmColor: "#a744a7",
          success(res) {
            if (res.confirm) {
            //全部支付
              wx.showModal({
                content: "请线下自行进行银行转账",
                showCancel: false,
                confirmColor: "#a744a7",
                success(res) {
                  if (res.confirm) {
                    var params = {
                      remark: "",
                      bank: that.data.bankMsg.bank,
                      bankCode: that.data.bankMsg.bank_code,
                      accountName: that.data.bankMsg.account_name,
                      totalFee: costNum,
                    }
                    reqUtil.httpPost(config.host.apiHost + '/api/user/' + userId + "/order/" + orderId + "/bankPayment", params, (err, res) => {
                      wx.navigateTo({
                        url: "/pages/order/order-pay/bank-pay/end-pay/end-pay?orderId=" + orderId,
                      })
                      })
                  
                  }
                }
              })
            } 
          }
        })
        return;
      }
    }else {
      //部分支付
      wx.showModal({
        content: "请线下自行进行银行转账",
        showCancel: false,
        confirmColor: "#a744a7",
        success(res) {
          if (res.confirm) {
            var param = {
              remark: "",
              bank: that.data.bankMsg.bank,
              bankCode: that.data.bankMsg.bank_code,
              accountName: that.data.bankMsg.account_name,
              totalFee: totalPrice, 
            }
            reqUtil.httpPost(config.host.apiHost + '/api/user/' + userId + "/order/" + orderId + "/bankPayment", param, (err, res) => {
              console.log(res.data.id);
                wx.navigateTo({
                  url: "/pages/order/order-pay/bank-pay/end-pay/end-pay?orderId=" + orderId,
                })
              })
          }
        }
      })
    }
  },
})