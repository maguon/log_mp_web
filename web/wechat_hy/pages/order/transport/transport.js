const app = getApp();
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
  startCity:"",
  endCity:'',
  service: ["","上门服务", "当地自提"],
  service_id:0,

  hidden:false,
  startress:false,
  endress:false,
  startAddress:[],
  endAddress:[],
  
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId=app.globalData.userId;
   
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + e.orderId, (err, res) => {
    this.setData({
      startCity: res.data.result[0].start_city,
      endCity: res.data.result[0].end_city,
      service_id: res.data.result[0].service_type,
      
    })
      console.log(res.data.result)
    })
   
  },





  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userId = app.globalData.userId;

    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/userAddress?type=" + 0, (err, res) => {
      if (res.data.result != '') {
        console.log(res.data.result)
        //获取发车地址
        for (var i = 0; i < res.data.result.length; i++) {
          if (res.data.result[i].status == 1) {
            this.setData({
              startAddress: res.data.result[i],
              startress: true,
            })
          }
        }
      }
    })

    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/userAddress?type=" + 1, (err, res) => {
      console.log(res.data.result)
      if (res.data.result != '') {
        //获取发车地址
        for (var i = 0; i < res.data.result.length; i++) {
          if (res.data.result[i].status == 1) {
            this.setData({
              endAddress: res.data.result[i],
              endress: true,
            })
          }
        }
      }
    })
  },





  startAddress:function(e){
     var index=e.currentTarget.dataset.index;
    console.log(e)
    wx.navigateTo({
      url: '/pages/user/addressList/addressList?index='+index,
    })
  },


  endAddress:function(e){
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/user/addressList/addressList?index=' + index,
    })
  },


  bindAdd:function(){
   wx.navigateBack({})
  },
  
})