
const app = getApp()
const config = require('../../host_config.js');
const reqUtil = require('../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    version:"0.0.8",
    headFlag:false,
    url:"",
    name:"",
    phone:"未绑定手机",
    hidden:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var userId = app.globalData.userId;

    reqUtil.httpGet(config.host.apiHost + "/api/user?userId=" + userId, (err, res) => {
    
      if (res.data.result[0].phone != "" && res.data.result[0].phone != null){
        that.setData({
          phone: res.data.result[0].phone,
          hidden: true,
        })
      }else{
        that.setData({
          hidden: false,
        })
      }
      //目的城市 城市ID
      that.setData({
        user: res.data.result[0],
        url:res.data.result[0].avatar,
        name: res.data.result[0].user_name,
        headFlag: true,
      })
    })

  },
/**
 * 绑定手机
 */
  bandPhone:function(){
  wx.navigateTo({
    url: '/pages/user/bind/bind',
  })
  },
  /**
   * getPhoneNumber 信息
   */
  getPhoneNumber: function (e) {
    var that = this;
    var userId = app.globalData.userId;
    var session_key = app.globalData.session_key;
    var iv = e.detail.iv;
    var encryptedData = e.detail.encryptedData;
    // console.log(e)
    // console.log(session_key)
    // console.log(iv)
    // console.log(encryptedData)

    if (e.detail.errMsg != 'getPhoneNumber:ok') {
      wx.navigateTo({
        url: '/pages/user/bind/bind',
      })
    } else {
      var params={
        sessionKey: session_key,
        iv: iv,
        encryptedData: encryptedData
      }
      reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/wechatBindPhone",params,(err,res)=>{
        // console.log(res)
        // console.log(err)
        if(res.data.success){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '您已成功绑定',
            success: function (res) {
              that.onShow();
            }
          })
        }
        if (res.data.code == "InternalError"){

          wx.showModal({
            content: '无法获取，请手动绑定',
            showCancel: false,
            confirmColor: "#a744a7",
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: "/pages/user/user",
                })
              }
            }
          });
          // wx.showModal({
          //   title: '提示',
          //   showCancel: false,
          //   content: '检测到小程序在多台设备登录，请删除小程序后重新登录',
          // })
        }
      })   
    }
  },




/**
 * 设置
 */
  edit:function(){
    wx.navigateTo({
      url: '/pages/user/set/set?url='+this.data.url+"&name="+this.data.name,
    })
  },
  /**
   * 历史订单
   */
  orderHistory:function(){
    wx.navigateTo({
      url: '/pages/user/order-history/order-history',
    })
  },
  carRecord:function(){
wx.navigateTo({
  url: '/pages/special/record/record',
})
  },
/**
 * 发票管理
 */
invoice:function(){
wx.navigateTo({
  url: '/pages/user/invoice/invoice',
})
  },

  refund:function(){
    wx.navigateTo({
      url: '/pages/user/refund/refund',
    })
  },
  invoiceHead:function(){
    wx.navigateTo({
      url: "/pages/user/invoice/msg-list/msg-list?applyId="+"",
    })
  },
  address:function(){
    wx.navigateTo({
      url: "/pages/user/addressList/addressList?index="+""+"&orderId="+"",
    })
  },
  bankCard:function(){
    wx.navigateTo({
      url: "/pages/order/order-pay/bank-pay/add-card/add-card",
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }

})