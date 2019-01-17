const app = getApp();
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    service: ["", "上门服务", "当地自提"],
    orderList: [],
    hidden:false,
    logFlag: false,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + e.orderId, (err, res) => {
      if (res.data.result[0].service_type==1){
      this.setData({
        orderList: res.data.result[0],
      })
      } else if (res.data.result[0].service_type == 2){
        this.setData({
          hidden: true,
        })
      }

      if (res.data.result[0].log_status == 2) {
        this.setData({
          logFlag: true,
        })
      }
    })
  },




})