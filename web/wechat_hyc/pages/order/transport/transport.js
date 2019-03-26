const app = getApp();
const config = require('../../../host_config.js');
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
    var userId = app.globalData.userId;
    var orderId=this.data.orderId;
    var name=this.data.name;


    this.setData({
      loadingHidden: true
    }) 


    if (name=="delivery"){
      this.setData({
        perFlag:true,
      })
    }


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
        loadingHidden: false,
      })
    })
  
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