const app = getApp();
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
  service: ["","上门服务", "当地自提"],

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
    var orderId=this.data.orderId;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" +orderId, (err, res) => {
      if (res.data.result[0].send_name!=null){
        this.setData({
          startress: true,
        })
     
      }
      if (res.data.result[0].recv_name != null) {
        this.setData({
          endress: true,
        })

      }
      
      this.setData({
        orderList: res.data.result[0],
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
   wx.navigateBack({})
  },
  
})