const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  invoiceList:[{name:"开票订单",url:'',hidden: false,}, { name: "未开票订单", url: '',hidden: true}],
  state:["待开票","已开票","已拒绝"],
  payment_state: ["未支付", "部分支付", "已支付"],

  invoice:[],
  index:0,
  hidden:false,
  carFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var userId = app.globalData.userId;
    var index = this.data.index;
    if (index==0){   
      //发送get请求
      reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/invoicesList", (err, res) => {
       for(var i=0;i<res.data.result.length;i++){
         res.data.result[i].sumfee = this.decimal(res.data.result[i].total_trans_price + res.data.result[i].total_insure_price)
         res.data.result[i].real_payment_price = this.decimal(res.data.result[i].real_payment_price)

         res.data.result[i].apply_time = this.getTime(res.data.result[i].apply_time)
         res.data.result[i].created_on = this.getTime(res.data.result[i].created_on)
         res.data.result[i].invoiced_time = this.getTime(res.data.result[i].invoiced_time)

       }
        this.setData({
          invoice: res.data.result,
          carFlag: false,
        })
      })
    } else if (index == 1){
      //发送get请求
      reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/noInvoiceOrderList", (err, res) => {
        for (var i = 0; i < res.data.result.length; i++) {
          res.data.result[i].sumfee = this.decimal(res.data.result[i].total_trans_price + res.data.result[i].total_insure_price)
          res.data.result[i].real_payment_price = this.decimal(res.data.result[i].real_payment_price)

          res.data.result[i].apply_time = this.getTime(res.data.result[i].apply_time)
          res.data.result[i].created_on = this.getTime(res.data.result[i].created_on)
          res.data.result[i].invoiced_time = this.getTime(res.data.result[i].invoiced_time)

        }
        this.setData({
          invoice: res.data.result,
          carFlag: true,
        })
      })
    }

   
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
 * 确认点击
 */
  chooseInvoice:function(e){
   console.log(e)
   var invoice=this.data.invoiceList;
   var index=e.currentTarget.dataset.index;

    //判断用户点击
    for (var i = 0; i < invoice.length; i++) {
      if (index == i) {
        invoice[i].hidden = false;
      } else {
        invoice[i].hidden = true;
      }
    }
    this.setData({
      invoiceList:invoice,
      index: index,
    })
    this.onShow();
  },




  bindtap:function(e){
  var index01=e.currentTarget.dataset.index;
  var index=this.data.index;
  var orderId = this.data.invoice[index01].id;
  var status = this.data.invoice[index01].invoiced_status;


    if (index){
      wx.navigateTo({
        url: '/pages/user/invoice/apply/apply?orderId=' + orderId,
      })
    }else{
      wx.navigateTo({
        url: '/pages/user/invoice-detail/invoice-detail?orderId=' + orderId,
      })
    }
  },
  
})