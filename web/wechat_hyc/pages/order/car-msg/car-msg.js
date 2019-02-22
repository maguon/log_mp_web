const app = getApp()
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    orderItem:'',
    count:0,
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],

    hidden:false,
    promptFlag:false,
    loadingHidden: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      orderId: e.orderId,
      name: e.name,
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
    var userId = app.globalData.userId;
    var orderId = this.data.orderId;
    var name=this.data.name;


 
    if (name == "delivery") {
      this.setData({
        hidden: true,
        loadingHidden: true
      })
    }

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/orderItem?orderId=" + orderId, (err, res) => {
      var count = 0;
      for (var i = 0; i < res.data.result.length; i++) {
        count++;
      }
      console.log(res.data.result)
      if (res.data.result != '') {
        this.setData({
          orderItem: res.data.result,
          count: count,
          promptFlag:true,
          loadingHidden: false,
        })
      }
    })
  },
  


/**
 * 添加车辆信息
 */
  addCar:function(e){
    console.log(e)
    var index=e.currentTarget.dataset.index;
    var orderId = this.data.orderId;
    wx.navigateTo({
      url: '/pages/order/car-model/car-model?orderId=' + orderId+"&index="+index,
    })
  },
  
  modifyCar:function(e){
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var orderId= this.data.orderId;
    wx.navigateTo({
      url: '/pages/order/car-model/car-model?orderId=' + orderId + "&index=" + index,
    })
  },

  bindtap:function(){
    var orderId = this.data.orderId;
  
    wx.navigateBack({
      
    })
  },
})