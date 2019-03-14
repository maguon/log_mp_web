const app = getApp();
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')


Page({
  // 页面的初始数据
  data: {
    addressList: [],
    orderId:'',
    list: [{ name: "收车地址", hidden:0, }, { name: "发车地址", hidden:1}],
    index:"",
    hidden:false,
    flag:false,
  },





  //生命周期函数--监听页面加载
  onLoad: function (e) {
    console.log(e)
    this.setData({
      orderId :e.orderId,
      index:e.index,
    })
    console.log(e.index)
    if (e.index!= ""){
      this.setData({
        hidden: true,
      })
    }

  },




  //生命周期函数--监听页面显示
  onShow: function () {
    //获取userid
    var userId = app.globalData.userId;
    //发送get请求
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/userAddress", (err, res) => {  
      if (res.data.result!=""){ 
        if (res.data.result.length == 1) {
          res.data.result[0].status = 1;
        }
        this.setData({
          flag:false,
          addressList: res.data.result,
        }) 
      }else{
        this.setData({
          flag:true,
        })
      }
    })
   

  },





  /**
   * 添加地址按钮
   */
  addAddress: function () {
    var addressList = JSON.stringify("");
    wx.navigateTo({ url: '../address/address?addressList=' + addressList});
  },


  /**
     * 删除item
     */
  delAddress: function (e) {
   var that=this;
    var index = e.currentTarget.dataset.index;
    var userId = app.globalData.userId;
    var addressList = that.data.addressList[index];
console.log(index)
    console.log(that.data.addressList)
    wx.showModal({
      content: '确定要删除地址吗？',
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
    //发送请求
    reqUtil.httpDel(config.host.apiHost + '/api/user/' + userId + "/userAddress/" + addressList.id);
    //更新信息
    that.onShow();
        }
      }
    })
  },





/**
 * 编辑按钮
 */
  editorAddress: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var userId = app.globalData.userId;
    var addressList = that.data.addressList;
    var shipAddressId = addressList[index].id;
    var indexinfo = that.data.index;
    var orderId = that.data.orderId;
    var address= JSON.stringify(that.data.addressList[index]);

    console.log(addressList)
    if (indexinfo == 0 && orderId!="" ) {
   
      var params = {
        sendName: addressList[index].user_name,
        sendPhone: addressList[index].phone,
        sendAddress: addressList[index].detail_address
      }
      reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + '/order/' + orderId + '/sendMsg', params, (err, res) => {
        setTimeout(function () {
          wx.navigateBack({
          })
        }, 500)
      })
      return;
    } else if (indexinfo == 1 && orderId != "") {
   
      var params = {
        recvName: addressList[index].user_name,
        recvPhone: addressList[index].phone,
        recvAddress: addressList[index].detail_address
      }
      reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + '/order/' + orderId + '/recvMsg', params, (err, res) => {
        setTimeout(function () {
          wx.navigateBack({
          })
        }, 500)
      })
      return;
    }else{
    wx.navigateTo({
      url: '../address/address?addressList=' + address,
    });
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.onShareApp();
  }

  

})