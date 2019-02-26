const config = require('../../config.js');
const reqUtil = require('../../utils/ReqUtil.js');
const app = getApp()


Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loadingHidden: false,
    scene:0,
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (query) {
    var that = this;
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    const scene = decodeURIComponent(query.scene)
    if (scene != "" && scene !="undefined"){
       that.setData({
       scene:scene
      })
    }
  
  wx.getSetting({
  success: function (res) {
    console.log(res.authSetting)
  //判断是否授权
 if (res.authSetting['scope.userInfo']) {

   //获得本地存储信息
   wx.getStorage({
     key: 'user',
     success: function(res) {
       if (res.data.userId != "" ){
         //从数据库获取用户信息
         that.queryUsreInfo();
         that.setData({
           loadingHidden: true,
         })
        }
      },
     })
    }
   }
  })
},



  /**
   * 点击授权
   */
  bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      if (e.detail.userInfo.gender==2){
        e.detail.userInfo.gender == 0;
      }

      //登录
      wx.login({
        success: res => {
          //获取code
          var code = res.code;
          //发送code 请求openid
          reqUtil.httpGet(config.host.apiHost + "/api/wechat/" + code + "/openid", (err, res) => {
            //保存openid 到全局
            app.globalData.openid = res.data.result.openid;
            
            //插入登录的用户的相关信息到数据库
            var params = {
              wechatId: res.data.result.openid,
              wechatName: e.detail.userInfo.nickName,
              gender: e.detail.userInfo.gender,
              avatar: e.detail.userInfo.avatarUrl,
              recommendId: that.data.scene,
            }

            reqUtil.httpPost(config.host.apiHost + "/api" + "/userLogin", params, (err, res) => {
              console.log(res)
              app.globalData.userId = res.data.result.userId;
              app.globalData.accessToken = res.data.result.accessToken;

             //获取设备信息传给服务器
              wx.getSystemInfo({
                success(rec) {
                  var param = {
                    brand: rec.brand,
                    model: rec.model,
                    system: rec.system,
                  }
                  reqUtil.httpPost(config.host.apiHost + "/api/user/" + res.data.result.userId + "/device", param, (err, res) => {

                  })
                }
              })
             //保存本地
              wx.setStorage({
                key: 'user',
                data: {
                  userId: res.data.result.userId,
                  accessToken: res.data.result.accessToken,
                },
              })
              //从数据库获取用户信息
              that.queryUsreInfo();
            })
          })
        }
      })

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },




  /**
   * 获取用户信息接口
  */
  queryUsreInfo: function () {
    var userId = app.globalData.userId;
    reqUtil.httpGet(config.host.apiHost + "/api/user?userId=" + userId, (err, res) => {
      if (res.data != '') {
        app.globalData.userInfo = res.data;
      } else {
        wx.showModal({
          title: '提示',
          content: '暂时不能访问，请稍后再试',
        })
        return;
      }
      //用户已经授权过
      wx.switchTab({
        url: '/pages/index/index',
      })
    })
  },
})

