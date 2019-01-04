const reqUtil = require('../../../../../utils/ReqUtil.js')
const config = require('../../../../../config.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bankList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {


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
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/inquiryBank", (err, res) => {

     
      this.setData({
        bankList: res.data.result,
      })
    })
  },




  //选择银行
  bankChoose: function (e) {

    var userId = app.globalData.userId;
    var index = e.currentTarget.dataset.index;
    var banklist = this.data.bankList;
    var id = this.data.bankList[index].id;
    reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/inquiryBank/" + id + "/status/" + 1, "", (err, res) => {
      this.onShow();
      // wx.navigateBack({})
    });
  },


  //删除
  bankDel: function (e) {
  console.log(e)
    var index = e.currentTarget.dataset.id;
    var banklist = this.data.bankList[index];
    var userId=app.globalData.userId;

    reqUtil.httpDel(config.host.apiHost + "/api/user/" + userId + "/inquiryBank/" + banklist.id);
    this.onShow();
  },

  useRess:function(){
    wx.navigateBack({
    })
  },

  //添加银行卡
  addCard: function () {
    wx.navigateTo({
      url: '/pages/order/order-pay/bank-pay/card-msg/card-msg',
    })
  },



})