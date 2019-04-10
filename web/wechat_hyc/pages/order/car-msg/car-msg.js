const app = getApp()
const config = require('../../../host_config.js');
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
    console.log(e.orderId)
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
    var that=this;
    var userId = app.globalData.userId;
    var orderId = that.data.orderId;
    var name = that.data.name;


 
    if (name == "delivery") {
      that.setData({
        hidden: true,
        loadingHidden: true
      })
    }
    if (orderId!=""){
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/orderItem?orderId=" + orderId, (err, res) => {
      var count = 0;
      for (var i = 0; i < res.data.result.length; i++) {
        count++;
      }

      if (res.data.result != '') {
        that.setData({
          orderItem: res.data.result,
          count: count,
          promptFlag:true,
          loadingHidden: false,
        })
      }
    })
  }else{

      wx.getStorage({
        key: 'orderItemArray',
        success: function (res) {
          console.log(res.data)
          var count = 0;
          for (var i = 0; i < res.data.length; i++) {
            count++;
          }
          res.data.brand_type = res.data.brandType;
          res.data.model_type = res.data.modelType;
          that.setData({
            orderItem: res.data,
            count: count,
            promptFlag: true,
            loadingHidden: false,
          })
        },
      })

 










 }
  },
  


/**
 * 添加车辆信息
 */
  addCar:function(e){

    var index=e.currentTarget.dataset.index;
    var orderId = this.data.orderId;
    wx.navigateTo({
      url: '/pages/order/car-model/car-model?orderId=' + orderId+"&index="+index,
    })
  },
  
  modifyCar:function(e){

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


  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})