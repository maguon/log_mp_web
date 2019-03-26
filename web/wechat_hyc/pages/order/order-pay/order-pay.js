
const reqUtil = require('../../../utils/ReqUtil.js')
const config = require('../../../host_config.js');
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
    lagstate: ["待安排", "待发运", "运输中","已送达"],
    invoicelist:[],
    refundlist:[],
    payment_status:0,
    date:"",

    completeFlag: false,
    partFlag:false,  


    delFlag: false,

    refundFlag:false,
    ref_Flag: false,
    refFlag: false,
    norefFlag: false,

    invoiceFlag:false,
    inv_Flag:false,
    invFlag:false,
    noinvFlag: false,
    loadingHidden: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

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
      res.data.result[0].created_on = reqUtil.getTime(res.data.result[0].created_on);
      if (res.data.result[0].payment_status == 1) {
        that.setData({
          loadingHidden: false,
          partFlag: true,
        })
        if (!that.data.ref_Flag && !that.data.refFlag && !that.data.norefFlag){
          that.setData({
            refundFlag: true,
          })
        }
      } else if (res.data.result[0].payment_status == 2) {
        that.setData({
          loadingHidden: false,
          completeFlag: true,
        })
        if (!that.data.ref_Flag && !that.data.refFlag && !that.data.norefFlag) {
          that.setData({
            refundFlag: true,
          })
        }
      } 


      if(res.data.result[0].remark==null){
        res.data.result[0].remark=""
      }
      if (name =="transport"){
        if (res.data.result[0].log_status==1){
          res.data.result[0].log_status=2;
        }
      }

      if (name == "") {
        res.data.result[0].log_status = 3;
        that.setData({
          completeFlag: true,
          
        })
        if (!that.data.inv_Flag && !that.data.invFlag && !that.data.noinvFlag) {
          that.setData({
            invoiceFlag: true,
          })
        }
        if (res.data.result[0].payment_status == 2){
          that.setData({
            delFlag: true,
          })
        }
        if (!that.data.ref_Flag && !that.data.refFlag && !that.data.norefFlag && res.data.result[0].payment_status!=0) {

          that.setData({
            refundFlag: true,
          })
        }
      }
      if (res.data.result[0].departure_time!=null){
        res.data.result[0].departure_time = reqUtil.getTime01(res.data.result[0].departure_time)
      }

      that.setData({
        payment_status: res.data.result[0].payment_status,
        loadingHidden: false,
        orderlist: res.data.result[0],
        service_type: res.data.result[0].service_type - 1,
        sumFee: res.data.result[0].sumFee,
        date: res.data.result[0].departure_time,
      }) 



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
              inv_Flag: true,
              invFlag: false,
              noinvFlag: false,
            })
            //已开票
          } else if (res.data.result[0].invoiced_status == 1) {
            that.setData({
              invoiceFlag: false,
              inv_Flag: false,
              invFlag: true,
              noinvFlag: false,
            })
            //已拒绝
          } else if (res.data.result[0].invoiced_status == 2) {
            that.setData({
              invoiceFlag: false,
              inv_Flag: false,
              invFlag: false,
              noinvFlag: true,
            })
          }
          that.setData({
            loadingHidden: false,
            invoicelist: res.data.result[0],
          })


        }
      })
 
    })

  },


  //取消订单
 del: function () {
    var userId = app.globalData.userId;
   var orderId = this.data.orderId;

    wx.showModal({
      content: '确定要删除订单吗？',
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
          reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/order/" + orderId + "/cancel", "", (err, res) => {
            wx.navigateBack({
              
            })
           })
        }
      }
    })
  },


button:function(){
  var status = this.data.payment_status;
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
    var status = this.data.payment_status;

    wx.navigateTo({
      url: '/pages/order/order-pay/bank-pay/end-pay/end-pay?orderId=' + this.data.orderId + "&fee=" + this.data.sumFee + "&status=" + status,
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
    var userId = app.globalData.userId;
    var orderId =this.data.orderId

    wx.showModal({
      content: '确定要取消订单吗？',
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
        
          reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/order/" + orderId + "/cancel", "", (err, res) => { 
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
    var name = this.data.name;
    if(name!=""){
      wx.switchTab({
        url: '/pages/order/order',
      })
    }
 
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
    return app.onShareApp();
  }
})
