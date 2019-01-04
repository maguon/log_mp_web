const app = getApp()
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    checked: 1,
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],
    index: 0,
    car_index: 0,
    orderId: '',
    orderindex: '',

    valuation: '',
    vin: '',
    insurance: 1,
    distance: '',
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + e.orderId, (err, res) => {
      console.log(res.data.result)
      this.setData({
        orderlist: res.data.result[0],
        orderId: e.orderId,
        distance: res.data.result[0].distance,
        hidden: true,
      })
    })

    wx.setNavigationBarTitle({
      title: '修改车型'
    })
  },





  /**
   * 车型
   */
  bindModels: function (e) {
    this.setData({
      car_index: e.detail.value,
    })
  },




  /**
     * VIN
     */
  noteInput: function (e) {
    console.log(e)
    this.setData({
      vin: e.detail.value,
    })
  },




  /**
   * 估值
   */
  bindValuation: function (e) {
    console.log(e)
    this.setData({
      valuation: e.detail.value,
    })
  },




  /**
   * 选择新车
   */
  checkboxChange: function () {
    if (this.data.checked == 0) {
      this.setData({
        checked: 1,
      })
    } else {
      this.setData({
        checked: 0,
      })
    }
  },





  bindtap: function () {
    var userId = app.globalData.userId;
    var regNum = new RegExp('[0-9]');
    console.log(parseInt(this.data.valuation))
    if (this.data.valuation == '') {
      wx.showModal({
        content: '估值不能为空',
        showCancel: false,
      })
      return;
    } else if (this.data.vin == '') {
      wx.showModal({
        content: '车辆识别码不能为空',
        showCancel: false,
      })
      return;
    } else if (this.data.vin.length != 17) {
      wx.showModal({
        content: '请填写17位的车辆识别码',
        showCancel: false,
      })
      return;
    } else if (this.data.valuation != parseInt(this.data.valuation)) {
      wx.showModal({
        content: '估值格式填写不正确',
        showCancel: false,

      })
      return;
    } else {
      var params = {
        vin: this.data.vin,
        modelType: this.data.car_index + 1,
        oldCar: this.data.checked,
        valuation: this.data.valuation,
        distance: this.data.distance,
        insuranceFlag: this.data.insurance,
      }
      //发送服务器
      reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/order/" + this.data.orderId + "/car", params, (err, res) => {
        wx.navigateBack({})
      })
    }
  },


  //保险
  insuranceChange: function () {
    if (this.data.insurance == 1) {
      this.setData({
        insurance: 0,
      })
    } else {
      this.setData({
        insurance: 1,
      })
    }
    this.onShow();
  },

})