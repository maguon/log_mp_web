
const reqUtil = require('../../../utils/ReqUtil.js')
const config = require('../../../config.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    sumFee:0,
    service: ["上门服务", "当地自提"],
    state:["未支付","部分支付","已支付"],
    lagstate: ["待安排", "待发运", "执行中","已送达"],
    invoicelist:[],
    refundlist:[],

    completeFlag: false,
    partFlag:false,  


    delFlag: false,

    refundFlag:false,
    ref_Flag: false,
    refFlag: false,
    norefFlag: false,

    invoiceFlag:false,
    vin_Flag:false,
    vinFlag:false,
    novinFlag: false,
    loadingHidden: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    this.setData({
      orderId: e.orderId,
      name:e.name,
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
    var that=this;
    var userId = app.globalData.userId;
    var orderId = that.data.orderId;
    var name = that.data.name;

    that.setData({
      loadingHidden: true
    })
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + orderId, (err, res) => {
      //应付费用
      res.data.result[0].sumFee = (res.data.result[0].total_trans_price + res.data.result[0].total_insure_price).toFixed(2);
      //编译时间
      res.data.result[0].created_on = config.getTime(res.data.result[0].created_on);
      if (res.data.result[0].payment_status == 1) {
        wx.setNavigationBarTitle({
          title: "部分支付订单",
        })
        that.setData({
          loadingHidden: false,
          partFlag: true,
        })
      } else if (res.data.result[0].payment_status == 2) {
        wx.setNavigationBarTitle({
          title: "已支付订单",
        })
        that.setData({
          loadingHidden: false,
          completeFlag: true,
         
        })
      } else if (res.data.result[0].payment_status == 1 || res.data.result[0].payment_status == 2 && that.data.ref_Flag != true && that.data.refFlag != true && that.data.norefFlag!=true){
        that.setData({
          refundFlag: true,
        })
      }

      if(res.data.result[0].remark==null){
        res.data.result[0].remark=""
      }
   

      that.setData({
        loadingHidden: false,
        orderlist: res.data.result[0],
        service_type: res.data.result[0].service_type - 1,
        sumFee: res.data.result[0].sumFee,
      })


      if (name == "") {
        that.setData({
          refundFlag: true,
          completeFlag: true,
          invoiceFlag: true,
          delFlag: true,
        })
      }

      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/refundApply?orderId=" + orderId, (err, res) => {
        if (res.data.result != "") {
          //申请中
          if (res.data.result[0].status == 2) {
            that.setData({
              refundFlag: false,
              ref_Flag: true,
              refFlag: false,
              norefFlag: false,
            })
            //已退款
          } else if (res.data.result[0].status == 1) {
            that.setData({
              refundFlag: false,
              ref_Flag: false,
              refFlag: true,
              norefFlag: false,
            })
            //已拒绝
          } else if (res.data.result[0].status == 0) {
            that.setData({
              refundFlag: false,
              ref_Flag: false,
              refFlag: false,
              norefFlag: true,
            })
          }
          that.setData({
            loadingHidden: false,
            refundlist: res.data.result[0],
          })

        }
      })


      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/invoicesList?orderId=" + orderId, (err, res) => {
        if (res.data.result != "") {
          //申请中
          if (res.data.result[0].invoiced_status == 0) {
            that.setData({
              invoiceFlag: false,
              vin_Flag: true,
              vinFlag: false,
              novinFlag: false,
            })
            //已开票
          } else if (res.data.result[0].invoiced_status == 1) {
            that.setData({
              invoiceFlag: false,
              vin_Flag: false,
              vinFlag: true,
              novinFlag: false,
            })
            //已拒绝
          } else if (res.data.result[0].invoiced_status == 2) {
            that.setData({
              invoiceFlag: false,
              vin_Flag: false,
              vinFlag: false,
              novinFlag: true,
            })
          }
          that.setData({
            loadingHidden: false,
            invoicelist: res.data.result[0],
          })


        }
      })
      console.log(res.data.result)
    })

  },


  //取消订单
 del: function () {
    var userId = app.globalData.userId;

    wx.showModal({
      content: '确定要删除订单吗？',
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
          reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/order/" + this.data.orderId + "/cancel", "", (err, res) => { })
        }
      }
    })
  },





//退款
  refund:function(){
  wx.navigateTo({
    url: "/pages/order/refund/refund?orderId=" + this.data.orderId + "&name=" + "refund" + "&paymentId=" + "",
  })
  },


 //处理完成
 isRefund:function(){
   var orderId = this.data.orderId;
   var paymentId = this.data.refundlist.payment_id;
   var refundId = this.data.refundlist.id;
   wx.navigateTo({
     url: "/pages/user/refund/ref-detail/ref-detail?orderId=" + orderId + "&paymentId=" + paymentId + "&refundId=" + refundId,
   })
 },

//开票
invoice:function(){
  var orderId = this.data.orderId;
  wx.navigateTo({
  url: "/pages/user/invoice/apply/apply?orderId=" + orderId,
  })
  },

 //处理完成
isInvoice: function () {
    var orderId = this.data.orderId;
    wx.navigateTo({
      url: "/pages/user/invoice-detail/invoice-detail?orderId=" + orderId,
    })
  },
 









  carMsg: function () {
    wx.navigateTo({
      url: '/pages/order/car-msg/car-msg?orderId=' + this.data.orderId + "&name=" + "delivery",
    })
  },

  payMsg: function () {
    wx.navigateTo({
      url: '/pages/order/order-pay/bank-pay/end-pay/end-pay?orderId=' + this.data.orderId+"&fee="+this.data.sumFee,
    })
  },

  payment: function () {
  wx.navigateTo({
    url: '/pages/order/order-pay/choose/choose?orderId=' + this.data.orderId + "&fee=" + this.data.orderlist.sumFee +"&param="+"pagment",
  })
  },



  /**
    * 服务方式
    */
  service: function () {
    wx.navigateTo({
      url: '/pages/order/order-pay/service-mode/service-mode?orderId=' + this.data.orderId,
    })
  },




  //取消订单
  cancel: function () {
    var that=this;
    var userId = app.globalData.userId;
  
    wx.showModal({
      content: '确定要取消订单吗？',
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
          var param={
            cancelMark: "",
          }
          reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/order/" + that.data.orderId + "/cancel", param, (err, res) => { 
            wx.navigateBack({
              
            })
          })
        }
      }
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
      data: this.data.orderId,
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