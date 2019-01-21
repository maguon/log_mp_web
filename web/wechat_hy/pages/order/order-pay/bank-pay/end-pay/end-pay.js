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
    remain:0,
    refund:0,
    sumFee:0,
    pagFlag:false,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    this.setData({
      orderId: e.orderId,
      sumFee:e.fee,
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userId = app.globalData.userId;
    var orderId=this.data.orderId;
    var sumFee=this.data.sumFee;

    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/payment?orderId=" + orderId, (err, res) => {
      var refundSum=0;
      console.log(res.data.result)
      if (res.data.result!=''){
      for( var i=0;i<res.data.result.length;i++){
        //微信 银行支付判断
        if (res.data.result[i].payment_type==2){
          res.data.result[i].payment_type=0;
        }
        if (res.data.result[i].type==0){
          refundSum+= res.data.result[i].total_fee;
          res.data.result[i].status=1;
        }
      //保留小数
        res.data.result[i].total_fee = config.decimal(res.data.result[i].total_fee);
      //编译时间
        res.data.result[i].updated_on = config.getTime(res.data.result[i].updated_on);
        res.data.result[i].created_on = config.getTime(res.data.result[i].created_on);
      }
    this.setData({
      payment:res.data.result,
      remain: config.decimal(sumFee-res.data.result[0].unpaid_price),
      refund:refundSum,
    })
    //支付按钮显示
        if (res.data.result[0].unpaid_price==0){
          this.setData({
          pagFlag:true,
          })
        }

  }
    })
  },


  bankNum: function (e) {
    console.log(e)
    var mphone = e.substring(0, 4) + '**********' + e.substring(14);
    return mphone;
  },

  payment: function () {
    wx.navigateTo({
      url: '/pages/order/order-pay/choose/choose?orderId=' + this.data.orderId + "&fee=" + this.data.sumFee +"&param="+"order",
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





})