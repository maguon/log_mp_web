const app = getApp();
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
  service: ["","上门服务", "当地自提"],

 startRess: [],
  endRess: [],
  hidden:false,
  startress:false,
  endress:false,
  orderList:[],
  orderId:'',

  logFlag:false,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    this.setData({
      orderId: e.orderId,
    })

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + e.orderId, (err, res) => {
      
      this.setData({
        orderList: res.data.result[0],
      })
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

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/userAddress?type=" + 0, (err, res) => {
      var startRess = [];
      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].status == 1) {
          startRess = res.data.result[i];
        }
      }
      this.setData({
        startRess: startRess,
        startress: true,
      })
    })
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/userAddress?type=" + 1, (err, res) => {
      var endRess = [];
      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].status == 1) {
          endRess = res.data.result[i];
        }
      }
      this.setData({
        endRess: endRess,
        endress: true,
      })
    })
  },





  startAddress:function(e){
    var index=e.currentTarget.dataset.index;
    var orderId = this.data.orderId;
    console.log(e)
    wx.navigateTo({
      url: '/pages/user/addressList/addressList?index='+index+"&orderId="+orderId,
    })
  },


  endAddress:function(e){
    var index = e.currentTarget.dataset.index;
    var orderId = this.data.orderId;
    wx.navigateTo({
      url: '/pages/user/addressList/addressList?index=' + index + "&orderId=" + orderId,
    })
  },




  bindAdd:function(){
    var userId = app.globalData.userId;
    var startRess=this.data.startRess;
    var endRess = this.data.endRess;
    var orderId=this.data.orderId;

      //发货
      var params = {
        sendName: startRess.user_name,
        sendPhone: startRess.phone,
        sendAddress: startRess.detail_address
      }
      reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + '/order/' + orderId + '/sendMsg', params, (err, res) => {
      })
    
  
      //收货
      var params = {
        recvName: endRess.user_name,
        recvPhone: endRess .phone,
        recvAddress: endRess.detail_address
      }
      reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + '/order/' + orderId + '/recvMsg', params, (err, res) => { })
    
   wx.navigateBack({})
  },
  
})