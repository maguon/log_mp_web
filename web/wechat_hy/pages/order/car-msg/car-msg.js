const app = getApp()
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderItem:'',
    count:'',
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/orderItem?orderId=" + e.orderId, (err, res) => {
     var count=0;
      for (var i = 0; i < res.data.result.length;i++){
        count++;
      }
      console.log(res.data.result)
      if (res.data.result != '') {
        this.setData({
          orderItem: res.data.result,
          count:count,
        })
      }
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

  },

})