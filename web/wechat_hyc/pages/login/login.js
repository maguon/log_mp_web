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

   
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    const scene = decodeURIComponent(query.scene)
    if (scene!=""){
    this.setData({
      scene:scene
    })
    }
    console.log(this.data.scene)


    //app.onLaunch res成功后执行{}内代码
    app.userInfoReadyCallback = res => {
      if (res != '') {
        var that = this;

        // 查看是否授权
        wx.getSetting({
          success: function (res) {
            //判断是否授权
            if (res.authSetting['scope.userInfo']) {

              //获取用户信息
              wx.getUserInfo({

                success: res => {
                  console.log(res);
                  var params = {
                    wechatId: app.globalData.openid,
                    wechatName: res.userInfo.nickName,
                    gender: res.userInfo.gender,
                    avatar: res.userInfo.avatarUrl,
                    recommendId: that.data.scene,
                  }
                  //发送请求
                  reqUtil.httpPost(config.host.apiHost + "/api" + "/userLogin", params, (err, res) => {
                    //userid保存到全局
                    app.globalData.userId = res.data.result.userId;
                    app.globalData.accessToken = res.data.result.accessToken;
                    //从数据库获取用户信息
                    that.queryUsreInfo();
                    that.setData({
                      loadingHidden: true,
                    })

                  })

                }
              });
            }
          }
        })
      }
    }
  },



  /**
   * 点击授权
   */
  bindGetUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      if (app.globalData.openid==""){
        app.onLaunch();
      }
      if (e.detail.userInfo.gender==2){
        e.detail.userInfo.gender == 0;
      }

      console.log(e.detail.userInfo.gender)
      //插入登录的用户的相关信息到数据库
      var params = {
        wechatId: app.globalData.openid,
        wechatName: e.detail.userInfo.nickName,
        gender: e.detail.userInfo.gender,
        avatar: e.detail.userInfo.avatarUrl,
        recommendId: that.data.scene,
      }

      reqUtil.httpPost(config.host.apiHost + "/api" + "/userLogin", params, (err, res) => {

        app.globalData.userId = res.data.result.userId;
        app.globalData.accessToken = res.data.result.accessToken;
        console.log(that.data.scene)
  
        //从数据库获取用户信息
        that.queryUsreInfo();
        console.log(res.data.result.userId);
        console.log("插入小程序登录用户信息成功！");
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

