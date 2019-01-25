
const reqUtil = require('../../../utils/ReqUtil.js')
const config = require('../../../config.js');
const app = getApp();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    add: "确认添加",
    name:'',
    phone:'',
    address:'',
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var addressList = JSON.parse(e.addressList);
    console.log(addressList)
    if (addressList != "") {
      this.setData({
        addressList: addressList,
        city: addressList.address,
        name: addressList.user_name,
        phone: addressList.phone,
        address: addressList.detail_address,
        add: '确定修改',
      })
    } else {
      this.setData({
        addressList: addressList,
      })
    }
  },


  city:function(e){
    console.log(e.detail.value)
    var city = e.detail.value;
    this.setData({
      city: city,
    })
  },


  addName: function (e) {
    var name = e.detail.value;
    this.setData({
      name: name,
    })
  },



  userPhone: function (e) {
    var phone = e.detail.value;
    this.setData({
      phone: phone,
    })
  },



  addRess: function (e) {
    var address = e.detail.value;
    this.setData({
      address: address,
    })
  },




  
  /**
    * 添加地址
    */
  saveAddress: function (e) {
    var that = this;
    var warn = '';
    var flag = true;
    var city = that.data.city;
    var name = that.data.name;
    var phone = that.data.phone;
    var address = that.data.address;
    var len = phone.length;
    var userId = app.globalData.userId;

    //判断用户输入
    if (name == "") {
      warn = "请输入您的姓名！";
    } else if (phone == "") {
      warn = "请输入您的手机号！";
    } else if (!(/^1(3|4||5|7|8)\d{9}$/.test(phone)) || len != 11 || phone.charAt(0) != '1') {
      warn = "手机号码格式不正确";
    } else if (address == "") {
      warn = "请输入您的具体地址";
    } else {
      flag = false;
      if (that.data.addressList != "") {
        var params = {
          userName: name,
          phone: phone,
          detailAddress: address,
          address:city,
        }
        //发送请求
        reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/userAddress/" + that.data.addressList.id + "/address", params, (err, res) => {  
          wx.navigateBack({
          })
          });
      } else {
        //获取要传递的参数
        var params = {
          address: "",
          userName: name,
          detailAddress: address,
          phone: phone,
        }

        //发送Post请求
        reqUtil.httpPost(config.host.apiHost + '/api/user/' + userId + "/userAddress", params, (err, res) => {
          //跳转地址管理界面
          wx.navigateBack({
          })
         })
      }
     
    }
    //输入错误弹窗提示
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn,
        showCancel: false,
        confirmColor: "#a744a7",
      })
    }
  },
})