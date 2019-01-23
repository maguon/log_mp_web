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
    chooseMsg:'',
    orderItemId:"",

    valuation: '请输入车辆估值',
    vin: '填写车辆17位识别码',
    insurance: 1,
    distance: '',
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    var chooseMsg=e.index;
    var orderId=e.orderId;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + orderId, (err, res) => {
      console.log(res.data.result)
      this.setData({
        orderlist: res.data.result[0],
        orderId: orderId,
        distance: res.data.result[0].distance,
        chooseMsg: chooseMsg,
      })
    })

    if (chooseMsg !=""){
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/orderItem?orderId=" + orderId, (err, res) => {
          console.log(res.data.result)
        var orderItem = res.data.result[chooseMsg];
        this.setData({
          orderItemId: orderItem.id,
          valuation: orderItem.valuation,
          vin: orderItem.vin,
          car_index: orderItem.model_type-1,
          insurance: orderItem.safe_status,
          checked:orderItem.old_car,
          hidden: false,
        })
      })
    }else{
      this.setData({
        hidden: true,
      })
    }

    if (chooseMsg !=undefined){
    wx.setNavigationBarTitle({
      title: '修改车型'
    })
}
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
    var chooseMsg = this.data.chooseMsg;
    var orderItemId = this.data.orderItemId;
    var orderId=this.data.orderId;

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
      console.log(chooseMsg)
      if (chooseMsg !=""){
        var params = {
          modelType: parseInt(this.data.car_index) + 1,
          vin: this.data.vin,
          oldCar: this.data.checked,
          valuation: this.data.valuation,
          // distance: this.data.distance,
          safeStatus: this.data.insurance,
        }
        //发送服务器
        reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/orderItem/" + orderItemId + "/updateCarType?orderId=" + orderId, params, (err, res) => {
          wx.navigateBack({})
        })

      }else{
      var params = {
        vin: this.data.vin,
        modelType:parseInt(this.data.car_index) + 1,
        oldCar: this.data.checked,
        valuation: this.data.valuation,
        distance: this.data.distance,
        safeStatus: this.data.insurance,
      }
      //发送服务器
      reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/order/" + this.data.orderId + "/car", params, (err, res) => {
        wx.navigateBack({})
      })
      }
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


/**
 * 删除
 */
  bindDelete:function(){
    var userId = app.globalData.userId;
    var orderItemId = this.data.orderItemId;
    reqUtil.httpDel(config.host.apiHost + "/api/user/" + userId + "/orderItem/" + orderItemId);
    wx.navigateBack({})
  },
})