const reqUtil = require('../../../../../utils/ReqUtil.js')
const config = require('../../../../../config.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // state:["审核中","已确认"],
    payment:[],
    cost_num: "",
    orderId: '',
    remain:'',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    this.setData({
      orderId: e.orderId,
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userId = app.globalData.userId;
    var orderId=this.data.orderId;

    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/payment?orderId=" + orderId, (err, res) => {
      console.log(res.data.result)

      for( var i=0;i<res.data.result.length;i++){
        //微信 银行支付判断
        if (res.data.result[i].paymentType==2){
          res.data.result[i].paymentType=0;
        }
      //保留小数
      res.data.result[i].total_fee = this.decimal(res.data.result[i].total_fee);
      //编译时间
      res.data.result[i].updated_on = this.getTime(res.data.result[i].updated_on);
      res.data.result[i].created_on = this.getTime(res.data.result[i].created_on);
      }
    this.setData({
      payment:res.data.result,
      remain: res.data.result[0].unpaid_price,
    })
   
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

  bankNum: function (e) {
    console.log(e)
    var mphone = e.substring(0, 4) + '**********' + e.substring(14);
    return mphone;
  },

  payment: function () {

    console.log("000000000")
    wx.navigateTo({
      url: '/pages/order/order-pay/choose/choose?orderId=' + this.data.orderId + "&fee=" + this.data.remain,
    })
  },
  // chooseBank: function () {
  //   wx.navigateTo({
  //     url: '/pages/order/order-pay/bank-pay/add-card/add-card',
  //   })
  // },

  // costNum: function (e) {
  //   console.log(e)
  //   var num = e.detail.value;
  //   this.setData({
  //     cost_num: num,
  //   })
  // },





/**
 * 删除支付信息
 */
  bindDel:function(e){
    var that=this;
    var index=e.currentTarget.dataset.index;
    var userId = app.globalData.userId;
    var paymentId = this.data.payment[index].id;

    wx.showModal({
      content: "确定要删除该笔支付？",
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
          reqUtil.httpDel(config.host.apiHost + '/api/user/' + userId + "/payment/" + paymentId);
          that.onShow();
        }
      }
    })
   
  },



/**
 * 修改支付信息
 */
bindModify:function(e){
  var index = e.currentTarget.dataset.index;
  var orderId=this.data.orderId;
  var fee= this.data.payment[index].total_fee;
  var paymentId = this.data.payment[index].id;
wx.navigateTo({
  url: '/pages/order/order-pay/bank-pay/bank-pay?orderId=' + orderId + '&fee=' + fee + '&name=' + "Modify" + "&paymentId=" + paymentId ,
})

},



  /**
* 编译时间
*/
  getTime: function(e) {
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


})