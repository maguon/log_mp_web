// pages/order/order.js
const app = getApp()
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[],
    flag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId = app.globalData.userId;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order", (err, res) => {
      if (res.data.result != '') {
        for (var i = 0; i < res.data.result.length; i++) {
          //支付费用
          res.data.result[i].sumFee = this.decimal(res.data.result[i].total_trans_price + res.data.result[i].total_insure_price);
          //编译时间
          res.data.result[i].created_on = this.getTime(res.data.result[i].created_on);
          res.data.result[i].updated_on = this.getTime(res.data.result[i].updated_on);
          //判断显示状态
          if (res.data.result[i].status==9) {
            res.data.result[i].state = 1;
            this.setData({
              flag: true,
            })
            //判断删除状态
          } else if (res.data.result[i].status == 8) {
            res.data.result[i].state = 0;
          }
        }
        console.log(res.data.result)
        this.setData({
          orderlist: res.data.result,
          loadingHidden: true
        })
      } else {
        this.setData({
          flag: true,
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
     * 保留小数
     */
  decimal: function (e) {
    //钱数小数点后二位设定
    var total_price = Number(e);
    var money = total_price.toFixed(2);
    return money;
  },

  orderHistory:function(e){
    var index = e.currentTarget.dataset.index;
    var orderId = this.data.orderlist[index].id;
    wx.navigateTo({
      url: "/pages/order/order-pay/order-pay?orderId=" + orderId+"&name="+"",
    })
  }
})