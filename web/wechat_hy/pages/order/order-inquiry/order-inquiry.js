// pages/order/order-discuss/order-discuss.js
const app = getApp()
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderlist: [],
    carlist: [],
    service: ["上门服务", "当地自提"],
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],
    service_type: '',
    sumFee: '',
    carCount: '',
    inquiryId: '',
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    var userId = app.globalData.userId;
    var inquiryId = e.orderId;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiry?inquiryId=" + inquiryId, (err, res) => {
      console.log(res)
      res.data.result[0].total_trans_price = this.decimal(res.data.result[0].total_trans_price + res.data.result[0].total_insure_price);

      res.data.result[0].created_on = this.getTime(res.data.result[0].created_on);
      this.setData({
        orderlist: res.data.result[0],
        service_type: res.data.result[0].service_type - 1,
        inquiryId: inquiryId,
      })
    })

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiryCar?inquiryId=" + inquiryId, (err, res) => {
      console.log(res)
      var sum = 0;
      var count = 0;
      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].status == 1) {
          //设置单价
          res.data.result[i].price = this.decimal(res.data.result[i].trans_price + res.data.result[i].insure_price);
          //设置总价
          sum += res.data.result[i].trans_price + res.data.result[i].insure_price;
          ////车辆数
          count += res.data.result[i].car_num;
        }
      }
      //更新显示
      this.setData({
        carlist: res.data.result,
        sumFee: this.decimal(sum),
        carCount: count,
      })
    })
  },



  /**
   * 复制成功
   */
  textPaste: function () {
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: this.data.inquiryId,
      success: function (res) {
        wx.getClipboardData({
          //这个api是把拿到的数据放到电脑系统中的
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
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
   * 编译时间
   */
  getTime: function (e) {
    var t = new Date(e);
    var Minutes = t.getMinutes();
    var Seconds = t.getSeconds();
    if (Minutes < 10) {
      Minutes = "0" + Minutes;
    }
    if (Seconds < 10) {
      Seconds = "0" + Seconds;
    }

    var olddata = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + Minutes + ':' + Seconds;
    var time = olddata.replace(/-/g, "/");
    return time;
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
      url: "/pages/index/change-car/change-car?id=" + id + "&inquiryId=" + this.data.inquiryId + "&name=" + name,
    })
  },





  /**
    * 添加车辆
    */
  addCar: function (e) {
    var name = e.currentTarget.dataset.name;
    console.log(e)
    wx.navigateTo({
      url: "/pages/index/add-car/add-car?inquiryId=" + this.data.inquiryId + "&name=" + name,
    })
  },




  /**
   * 取消订单
   */
  cancel: function () {
    var inquiryId = this.data.inquiryId;
    var userId = app.globalData.userId;
    wx.showModal({
      content: '确定要取消订单吗？',
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/inquiry/" + inquiryId + "/cancel", "", (err, res) => {
            wx.navigateBack({})
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });

  },




  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.switchTab({
      url: '/pages/order/order',
    })
  },


})