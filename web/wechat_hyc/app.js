const config = require('host_config.js');
const reqUtil = require('utils/ReqUtil.js');
//app.js

App({

  /**
   * 异步执行登录信息加载
   */
  onLaunch: function () {
  },
  /**
    * 联系客服
    */
  bindCustomer: function (userId) {
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/customerPhone", (err, res) => {
      var cusList = res.data.result;
      for (var i = 0; i < cusList.length; i++) {
        cusList[i] = cusList[i].phone;
      }
      wx.getSystemInfo({
        success: function (rec) {
          if (rec.platform == "android") {
            cusList.push("取消")
          }

          wx.showActionSheet({
            itemList: cusList,
            success: function (res) {
              if (rec.platform == "android") {
                if (res.tapIndex != cusList.length - 1) { 
                  wx.makePhoneCall({
                    phoneNumber: cusList[res.tapIndex],
                  })
                }
              } else if (!res.cancel) {
             
                wx.makePhoneCall({
                  phoneNumber: cusList[res.tapIndex],
                })
              }
            }
          });
        },
      })
    })
  },





  /**
* 用户点击右上角分享
*/
  onShareApp: function () {
    wx.showShareMenu({
      withShareTicket: true
    })

    return {
      title: '测试小程序',//分享内容
      path: '/pages/login/login',//分享地址
      imageUrl: '/images/share.jpg',//分享图片
      success: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') {//判断分享是否成功
          if (res.shareTickets == undefined) {//判断分享结果是否有群信息
            //分享到好友操作...
          } else {
            //分享到群操作...
            var shareTicket = res.shareTickets[0];
            wx.getShareInfo({
              shareTicket: shareTicket,
              success: function (e) {
                //当前群相关信息
                var encryptedData = e.encryptedData;
                var iv = e.iv;
              }
            })
          }
        }
      }
    }
  },

  //设置全局变量
  globalData: {
    userInfo: null,
    openid: '',
    userId: "",
    accessToken: '',
    session_key: '',
    trainBeginCity: '',
    trainEndCity: '',
    name: "",
  },

})
