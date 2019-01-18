const app = getApp();
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    invList: [],
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
    //获取userid
    var userId = app.globalData.userId;
    //发送get请求
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/invoice", (err, res) => {
      if (res.data.result.length == 1) {
        res.data.result[0].status = 1;
      }
      this.setData({
        invList: res.data.result,
      })
    })
  },

  /**
      *单项选择控制
      */
  radioChange: function (e) {
    var index = e.currentTarget.dataset.index;
    var invList = this.data.invList;
    var userId = app.globalData.userId;
    var shipAddressId = invList[index].id;
    console.log(invList[index].id)
    // 判断用户点击index设置默认
    for (var i = 0, len = invList.length; i < len; ++i) {
      invList[i].status = i == index;

    }

    //发送PUT
    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + '/userAddress/' + shipAddressId + '/type/' + this.data.index, '', (err, res) => { })
    //保存
    this.setData({
      invList: invList,
    });

  },

  
  addAddress:function(){
    wx.navigateTo({
      url: "/pages/user/invoice/msg-Add/msg-Add",
    })
  },
  useRess:function(){
    wx.navigateBack({
      
    })
  }
})