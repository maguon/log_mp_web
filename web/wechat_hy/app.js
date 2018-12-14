const config = require('config.js');
const reqUtil = require('utils/ReqUtil.js');
//app.js
App({
  //设置全局变量
  globalData: {
    userInfo: null,
    openid: '',
    userId: 0,
    accessToken: '',
    session_key: '',
    trainBeginCity: '',
    trainEndCity: ''
  },

  /**
   * 异步执行登录信息加载
   */
  onLaunch: function () {

    var that = this;
    // 登录
    wx.login({
      success: res => {
        //获取code
        var code = res.code;
        console.log(res.code)
        //发送code 请求openid
        reqUtil.httpGet(config.host.apiHost + "/api/wechat/" + code + "/openid", (err, res) => {

          //保存openid 到全局
          that.globalData.openid = res.data.result.openid;
          console.log(res.data.result)
          that.globalData.session_key = res.data.result.session_key;
          //判断加载数据完成后执行login-onload
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }

        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

})