
const app = getApp()
const config = require('../../../host_config.js');
const reqUtil = require('../../../utils/ReqUtil.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderlist: [],
    carlist: [],
    nullHouse: true,
    cusList: [],

    service: ["上门服务", "当地自提"],
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],
    service_type: '',
    sumFee: '',
    carCount: '',
    inquiryId: '',
  },

  onLoad: function (e) {
    this.setData({
      inquiryId : e.orderId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    var userId = app.globalData.userId;
    var inquiryId = this.data.inquiryId;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiry?inquiryId=" + inquiryId, (err, res) => {

      res.data.result[0].total_trans_price = reqUtil.decimal(res.data.result[0].total_trans_price + res.data.result[0].total_insure_price);

      res.data.result[0].created_on = reqUtil.getTime(res.data.result[0].created_on);
      res.data.result[0].route_start=res.data.result[0].start_city
       res.data.result[0].route_end=res.data.result[0].end_city
      console.log(res.data.result[0])
      this.setData({
        orderlist: res.data.result[0],
        service_type: res.data.result[0].service_type - 1,
      })
    })

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiryCar?inquiryId=" + inquiryId, (err, res) => {

      var sum = 0;
      var count = 0;
      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].status == 1) {
          //设置单价
          res.data.result[i].price = reqUtil.decimal(res.data.result[i].trans_price + res.data.result[i].insure_price);
          //设置总价
          sum += res.data.result[i].trans_price + res.data.result[i].insure_price;
          ////车辆数
          count += res.data.result[i].car_num;
        }
      }
     var sumfee=reqUtil.decimal(sum);
      //更新显示
      this.setData({
        carlist: res.data.result,
        sumFee: sumfee,
        carCount: count,
      })
    })
  },









  /**
      * 联系客服
      */
  bindCustomer: function () {
    var userId = app.globalData.userId;
    app.bindCustomer(userId);
  },



  /**
   * 点击修改
   */
  bindcarList: function (e) {

    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: "/pages/order/change-car/change-car?index=" + index + "&inquiryId=" + this.data.inquiryId,
    })
  },





  /**
    * 添加车辆
    */
  addCar: function (e) {
    wx.navigateTo({
      url: "/pages/order/add-car/add-car?inquiryId=" + this.data.inquiryId,
    })
  },




  /**
   * 取消订单
   */
  cancel: function () {
    var inquiryId = this.data.inquiryId;
    var userId = app.globalData.userId;
    wx.showModal({
      content: '确定要取消订单吗？',
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
    
          reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/inquiry/" + inquiryId + "/cancel", "", (err, res) => {
            wx.navigateBack({})
          })
        } else if (res.cancel) {
    
        }
      }
    });

  },




  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.switchTab({
      url: '/pages/order/order',
    })
  },


  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})