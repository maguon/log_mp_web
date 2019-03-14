const reqUtil = require('../../../../../utils/ReqUtil.js')
const config = require('../../../../../config.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    bank_name: '',
    bank_num: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  //用户输入
  addName: function (e) {
    var name = e.detail.value;
    this.setData({
      name: name,
    })
  },
  //用户输入
  bankName: function (e) {
    var bank_name = e.detail.value;
    this.setData({
      bank_name: bank_name,
    })
  },
  //用户输入
  addNumber: function (e) {
    var bank_num = e.detail.value;
    this.setData({
      bank_num: bank_num,
    })
  },
  //点击确认
  addCard: function () {
    var that = this;
    var name = that.data.name;
    var bankName = that.data.bank_name;
    var bankNum = that.data.bank_num;
    var len = bankNum.length;
    var userId = app.globalData.userId;

    //判断用户输入
    if (name == "") {
      wx.showModal({
        content: "请输入您的姓名！",
        showCancel: false,
        confirmColor: "#a744a7",
      })
    } else if (bankName == "") {
      wx.showModal({
        content: "请输入您的开户行！",
        showCancel: false,
        confirmColor: "#a744a7",
      })
    } else if (len > 19 || len < 15) {
      wx.showModal({
        content: "银行卡号码位数不正确！",
        showCancel: false,
        confirmColor: "#a744a7",
      })
    } else if (bankNum != parseInt(that.data.bank_num)) {
      wx.showModal({
        content: "银行卡号码格式不正确！",
        showCancel: false,
        confirmColor: "#a744a7",
      })
    } else if (bankNum == "") {
      wx.showModal({
        content: "请输入您的银行卡号",
        showCancel: false,
        confirmColor: "#a744a7",
      })
    } else {
      //获取要传递的参数
      var params = {
        bank: bankName,
        bankCode: bankNum,
        accountName: name,
      }
      //发送Post请求
      reqUtil.httpPost(config.host.apiHost + '/api/user/' + userId + "/inquiryBank", params, (err, res) => {
        reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/inquiryBank/" + res.data.id + "/status/" + 1, "", (err, res) => {
          //跳转地址管理界面
          wx.navigateBack({})
        });
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