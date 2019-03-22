const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
const app = getApp()



Page({
  /**
   * 页面的初始数据
   */
  data: {
    userPhone: '',
    userCode: '',
    avatar:'',
    avhidden:false,
    wechat_name:'',

    key: "获取验证码",
    gainFlag: false,

    bntFlag: true,
    hidden: false,

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
    var userId = app.globalData.userId;
    //发送请求
    reqUtil.httpGet(config.host.apiHost + "/api/user?userId=" + userId, (err, res) => {

      if (res.data.result[0].wechat_name != '' && res.data.result[0].wechat_name!= null) {
        this.setData({
          hidden: true,
          wechat_name: res.data.result[0].user_name,
        })
      } else {
        this.setData({
          hidden: false,
        })
      }
      if (res.data.result[0].avatar != '' && res.data.result[0].avatar != null){
        this.setData({
          avatar:res.data.result[0].avatar,
          avhidden:true
        })
      } else {
        this.setData({
          avhidden: false,
        })
    }
    })
  },
  /** 
 *  获取用户手机输入
 */
  checkPhone: function (e) {
    this.setData({
      userPhone: e.detail.value,
    })
  },






  /** 
  *  获取验证码
  */
  gain: function () {
    var userPhone = this.data.userPhone
    //检查手机号码输入
    if (userPhone == '') {
      wx.showModal({
        title: '提示',
        content: "手机号码不能为空",
      })
      return;
    } else if (!(/^1(3|4||5|7|8)\d{9}$/.test(userPhone)) || userPhone.length != 11 || userPhone.charAt(0) != '1') {
      wx.showModal({
        title: '提示',
        content: "手机号码格式不正确",
      })
      return;
    }
    //调用60秒验证码发送
    var second = 60;
    var userId = app.globalData.userId;
    this.countDown(second);
    //请求验证码
    reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + '/phone/' + userPhone + "/userPhoneSms", '', (err, res) => {
      if (res.data.success==false){
        wx.showModal({
          title: '提示',
          content: res.data.msg,
        })
        return;
      }
    })
  },

  /** 
   *  60秒发送等待
   */
  countDown: function (num) {
    this.setData({
      gainFlag: true,
      key:"已发送"+"("+ num+"s"+")"
    });
    //time 为0 返回原始状态
    if (num < 0) {
      this.setData({
        key: '重新获取验证码',
        gainFlag: false
      });
      return;
    }
    //递归每秒递减
    setTimeout(() => {
      this.countDown(num - 1);
    }, 1000)
  },





  /** 
   * 输入验证码
   */
  code: function (e) {
    var userCode = e.detail.value;
  
    //判断用户输入
    if (e.detail.value.length != 4) {
      this.setData({
        bntFlag: true
      });
      return;
    } else {
      //保存信息 
      this.setData({
        userCode: userCode,
        bntFlag: false //激活确定按钮
      });
    }
  },





  /** 
   * 确认按钮
   */
  bindTap(e) {
    var userId = app.globalData.userId;
    var userPhone = this.data.userPhone;
    var userCode = this.data.userCode;
  
    //发送请求
    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + '/phone/' + userPhone + "/code/" + userCode, '', (err, res) => {
      if (res.data.success != true) {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
        })
        return;
      } else {
        //校对一致后跳转界面
        wx.navigateBack({})
      }
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
  
})