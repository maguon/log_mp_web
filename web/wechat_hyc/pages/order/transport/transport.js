const app = getApp();
const config = require('../../../host_config.js');
const reqUtil = require('../../../utils/ReqUtil.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
  service: ["","上门服务", "当地自提"],

  send_name:"",
  send_phone:"",
  send_address:"",
  recv_name:"",
  recv_phone:"",
  recv_address:"",


  route_start:"",
  route_end:"",
  service_type:"",


  hidden:false,
  startress:false,
  endress:false,

  orderId:'',
  name:"",

  logFlag:false,
  perFlag:false,
  loadingHidden: false,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    console.log(e.orderId)
    this.setData({
      orderId: e.orderId,
      name:e.name,
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

   
    if (orderId!=""){
      that.setData({
        loadingHidden: true
      })

      if (name == "delivery") {
        that.setData({
          perFlag: true,
        })
      }
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" +orderId, (err, res) => {
     var orderlist= res.data.result[0];
      if (orderlist.send_name!=null){
        that.setData({
          startress: true,
        })
     
      }
      if (orderlist.recv_name != null) {
        that.setData({
          endress: true,
        })

      }
      console.log(orderlist)
      that.setData({
        route_start: orderlist.route_start,
        route_end: orderlist.route_end,
        service_type: orderlist.service_type,
        recv_name: orderlist.recv_name,
        recv_phone: orderlist.recv_phone,
        recv_address: orderlist.recv_address,
        send_name: orderlist.send_name,
        send_phone: orderlist.send_phone,
        send_address: orderlist.send_address,
        loadingHidden: false,
      })
    })
 }else{

      wx.getStorage({
        key: 'arr',
        success: function (res) {
          console.log(res)
          that.setData({
            route_start: res.data[0].startCity,
            route_end: res.data[0].endCity,
            service_type: res.data[0].serviceType+1,
          })
        },
      })

    try {
        const value = wx.getStorageSync('sendAddress')
        if (value) {
          console.log(value)
          that.setData({
            startress: true,
            send_name: value.sendName,
            send_phone: value.sendPhone,
            send_address: value.sendAddress,
          })
        }
      } catch (e) {
      }


      try {
        const value = wx.getStorageSync('recvAddress')
        if (value) {
          console.log(value)
          that.setData({
            endress: true,
            recv_name: value.recvName,
            recv_phone: value.recvPhone,
            recv_address: value.recvAddress,
          })
        }
      } catch (e) {
        // Do something when catch error
      }
    }
  },





  startAddress:function(e){
    var index=e.currentTarget.dataset.index;
    var orderId = this.data.orderId;
 
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

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})