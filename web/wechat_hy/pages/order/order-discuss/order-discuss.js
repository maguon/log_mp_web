// pages/order/order-discuss/order-discuss.js
const app = getApp()
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[],
    carlist:[],
    service:["上门服务","当地自提"],
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],
    service_type:'',
    sumFee:'',
    carCount:'',
    inquiryId:'',
    index:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    var userId = app.globalData.userId;
    var inquiryId=e.id;
    this.setData({
      index:e.index,
    })
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/queryInquiry?inquiryId=" + inquiryId, (err, res) => {
      console.log(res)
      res.data.result[0].fee_price = this.decimal(res.data.result[0].fee_price);
        this.setData({
          orderlist: res.data.result[0],
          service_type: res.data.result[0].service_type-1,
          inquiryId: inquiryId,
        })
    })

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId+ "/inquiryCar?inquiryId=" + inquiryId, (err, res) => {
      console.log(res)
       var index=this.data.index;
      var sum = 0;
      var count=0;
      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].status == 1) {
          sum += res.data.result[i].fee;
          count += res.data.result[i].car_num;
         
        }
      }
      
      res.data.result[0].fee = this.decimal(res.data.result[0].fee);
      this.setData({
        carlist: res.data.result,
        sumFee: sum.toFixed(2),
        carCount:count,
      })
      console.log(res.data.result[index])
    })

  },
  /**
   * 复制成功
   */
  textPaste:function() {
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: this.data.inquiryId,
      success: function (res) {
        wx.getClipboardData({
          //这个api是把拿到的数据放到电脑系统中的
          success: function(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
     * 保留小数
     */
  decimal: function (e) {
    //钱数小数点后二位设定
    var total_price = Number(e);
    var money = total_price.toFixed(2);
    return money;
  },
  /**
 * 联系客服
 */
  bindCustomer: function () {
    wx.makePhoneCall({
      phoneNumber: '15840668526', //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  /**
   * 点击修改
   */
  bindcarList: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: "/pages/index/change-car/change-car?id=" + id + "&inquiryId=" + this.data.inquiryId+"&name="+name,
    })
  },

  /**
    * 添加车辆
    */
  addCar: function (e) {
    var name= e.currentTarget.dataset.name;
    console.log(e)
    wx.navigateTo({
      url: "/pages/index/add-car/add-car?inquiryId=" + this.data.inquiryId+"&name="+name,
    })
  },
  /**
   * 取消订单
   */
  cancel:function(){
    var inquiryId=this.data.inquiryId;
    var userId=app.globalData.userId;

    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/inquiry/" + inquiryId +"/cancel","", (err, res) => { 
      wx.navigateBack({ })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.switchTab({
      url: '/pages/order/order',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})