const config = require('../../host_config.js');
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

    try {
      const value = wx.getStorageSync('openid')
      if (value) {

        if (value.openid != "" && value.session_key != "") {
          //保存openid 到全局
          app.globalData.openid = value.openid;
          app.globalData.session_key = value.session_key;
        }
      }
    } catch (e) {

    }
 

    try {
      const value = wx.getStorageSync('user')
      if (value) {

        if (value.userId != "" && value.accessToken != "") {
          app.globalData.userId = value.userId;
          app.globalData.accessToken = value.accessToken;
        }
        //更换新的Token
        reqUtil.httpGet(config.host.apiHost + "/api/user/" + value.userId + "/token/" + value.accessToken, (err, rec) => {

           if (rec.data.result) {
            var userId=parseInt(rec.data.result.userId)
            try {
              wx.setStorageSync('user', {
                userId: userId,
                accessToken:rec.data.result.accessToken})
            } catch (e) { }
            that.queryUsreInfo();
            that.setData({
              loadingHidden: true,
            })
          }
        }) 
      }
    } catch (e) {

    }
},



  /**
   * 点击授权
   */
  bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      if (e.detail.userInfo.gender==2){
        e.detail.userInfo.gender = 0;
      }else if (e.detail.userInfo.gender == 0){
        e.detail.userInfo.gender = 3;
      }

      //登录
      wx.login({
        success:ree => {
          //获取code
          var code = ree.code;
    
          //发送code 请求openid
          reqUtil.httpGet(config.host.apiHost + "/api/wechat/" + code + "/openid", (err, rea) => {
            // //保存openid 到全局
            app.globalData.openid = rea.data.result.openid;
            app.globalData.session_key = rea.data.result.session_key;
     
            //保存本地
            try {
              wx.setStorageSync('openid',  {openid:rea.data.result.openid,
                session_key:rea.data.result.session_key})
            } catch (e) { }
            //插入登录的用户的相关信息到数据库
            var params = {
              wechatId: rea.data.result.openid,
              wechatName: e.detail.userInfo.nickName,
              gender: e.detail.userInfo.gender,
              avatar: e.detail.userInfo.avatarUrl,
              recommendId: parseInt(that.data.scene),
            }
            reqUtil.httpPost(config.host.apiHost + "/api" + "/userLogin", params, (err, res) => {


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

            //  //保存本地
             try {
                wx.setStorageSync('user', {userId:res.data.result.userId,
                  accessToken:res.data.result.accessToken})
              } catch (e) { }
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

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})

