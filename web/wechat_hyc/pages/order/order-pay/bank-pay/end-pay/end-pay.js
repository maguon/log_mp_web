const reqUtil = require('../../../../../utils/ReqUtil.js')
const config = require('../../../../../host_config.js');
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
    status:0,
    pagFlag:false,
    refundFlag:false,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

    this.setData({
      orderId: e.orderId,
      sumFee:e.fee,
      status:e.status,
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    var userId = app.globalData.userId;
    var orderId = that.data.orderId;
    var sumFee = that.data.sumFee;
    var _remain =0;
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/payment?orderId=" + orderId, (err, res) => {
     
      // console.log(res)
      if (res.data.result!=''){
        var refundSum = 0;

        //支付按钮显示
        if (that.data.status == 2) {
          that.setData({
            pagFlag: true,
          })
        }
      for( var i=0;i<res.data.result.length;i++){
        //微信 银行支付判断
        if (res.data.result[i].payment_type==2){
          res.data.result[i].payment_type=0;
        }
        if (res.data.result[i].type==0){
          refundSum += res.data.result[i].total_fee;
          res.data.result[i].status=1;
        }
       _remain+= res.data.result[i].total_fee;
      //保留小数
        res.data.result[i].total_fee = reqUtil.decimal(res.data.result[i].total_fee);
        res.data.result[i].refund = reqUtil.decimal(res.data.result[i].total_fee*-1);
      //编译时间
        res.data.result[i].updated_on = reqUtil.getTime(res.data.result[i].updated_on);
        res.data.result[i].created_on = reqUtil.getTime(res.data.result[i].created_on);
      }

        if (refundSum==0){
          that.setData({
            refundFlag: true,
          })
        }
      // var _remain=reqUtil.decimal(sumFee - res.data.result[0].unpaid_price);
  
        var refundsum = reqUtil.decimal(refundSum * -1);
      that.setData({
      payment:res.data.result,
      remain: _remain,
        refund: refundsum,
    })
  

  }else{
     that.setData({
        refundFlag: true,
     })
        
  }
    })
  },


  bankNum: function (e) {

    var mphone = e.substring(0, 4) + '**********' + e.substring(14);
    return mphone;
  },

  payment: function () {
    wx.navigateTo({
      url: '/pages/order/order-pay/choose/choose?orderId=' + this.data.orderId + "&fee=" + this.data.sumFee +"&param="+"order",
    })
  },






/**
 * 删除支付信息
 */
  bindDel:function(e){
    var that=this;
    var index=e.currentTarget.dataset.index;
    var userId = app.globalData.userId;
    var paymentId = that.data.payment[index].id;


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
  var fee = this.data.payment[index].unpaid_price;
  var paymentId = this.data.payment[index].id;
wx.navigateTo({
  url: '/pages/order/order-pay/bank-pay/bank-pay?orderId=' + orderId + '&fee=' + fee + '&name=' + "Modify" + "&paymentId=" + paymentId + "&param=" + "" ,
})
},



  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})