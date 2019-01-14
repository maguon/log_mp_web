const app = getApp();
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')


Page({
  // 页面的初始数据
  data: {
    addressList: [],
    defAddress:[],
    hidden: false,
    orderId:'',
  },





  //生命周期函数--监听页面加载
  onLoad: function (e) {
    console.log(e)
    this.setData({
      index:e.index,
      orderId :e.orderId,
    })

  },




  //生命周期函数--监听页面显示
  onShow: function () {
    var index=this.data.index;
    //获取userid
    var userId = app.globalData.userId;
    //发送get请求
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/userAddress?type="+index, (err, res) => {
      console.log(res)
      if (res.data.result == "") {
        this.setData({
          hidden: true,
        })
      } else {

        if (res.data.result.length == 1) {
          res.data.result[0].status = 1;
        }
        this.setData({
          hidden: false,
          addressList: res.data.result,
        })
      }
    })
  },





  /**
   * 添加地址按钮
   */
  addAddress: function () {
    var addressList = JSON.stringify("");
    wx.navigateTo({ url: '../address/address?addressList=' + addressList+"&index="+""});
  },





  /**
     * 删除item
     */
  delAddress: function (e) {
    var index = e.currentTarget.dataset.id;
    var userId = app.globalData.userId;
    var addressList = this.data.addressList[index];
    //发送请求
    reqUtil.httpDel(config.host.apiHost + '/api/user/' + userId + "/userAddress/" + addressList.id);
    //更新信息
    this.onShow();
  },





/**
 * 编辑按钮
 */
  editorAddress: function (e) {
    var index = e.currentTarget.dataset.id;
    var userId = app.globalData.userId;
    var addressList = JSON.stringify(this.data.addressList[index]);
    console.log(addressList)
    wx.navigateTo({
      url: '../address/address?addressList=' + addressList+"&index="+index,
    });
  },




  /**
     *单项选择控制
     */
  radioChange: function (e) {
    var index=e.currentTarget.dataset.index;
    var addressList = this.data.addressList;
    var userId = app.globalData.userId;
    var shipAddressId = addressList[index].id;
    console.log(addressList[index].id)
   // 判断用户点击index设置默认
    for (var i = 0, len = addressList.length; i < len; ++i) {
      addressList[i].status = i == index;
   
    }



    console.log(addressList)
    //发送PUT
    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + '/userAddress/' + shipAddressId + '/type/'+this.data.index, '', (err, res) => {})
    //保存
    this.setData({
      addressList: addressList,
      defAddress: addressList[index],
    });

  },




  /**
   * 点击跳转
   */
  useRess: function () {
    var index = this.data.index;
    var userId = app.globalData.userId;
    var orderId = this.data.orderId;
    var defAddress=this.data.defAddress;
    console.log(defAddress)
  //判断收发货
    if(index==0){
      //发货
      var params = {
        sendName: defAddress.user_name,
        sendPhone: defAddress.phone,
        sendAddress: defAddress.detail_address
      }
    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + '/order/' + orderId + '/sendMsg', params, (err, res) => {
  })
    } 
    if (index == 1){
      //收货
      var params = {
        recvName: defAddress.user_name,
        recvPhone: defAddress.phone,
        recvAddress: defAddress.detail_address
      }
      reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + '/order/' + orderId + '/recvMsg', params, (err, res) => {})
    }
    wx.navigateBack({
      url: '',
    });
  }
})