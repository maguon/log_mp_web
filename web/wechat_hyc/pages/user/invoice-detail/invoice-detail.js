const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: ["待开票", "已开票", "已拒绝"],
    service: ["", "上门服务", "当地自提"],
    orderlist:[],
    invoice:[],
    orderId:"",
    remark:'',
    
   
    refuseFlag: false,
    invoiceFlag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
  this.setData({
    orderId: e.orderId,
  })
    var userId = app.globalData.userId;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + e.orderId, (err, res) => {

      var sumfee = config.decimal(res.data.result[0].total_insure_price + res.data.result[0].total_trans_price);
      //保留小数
      res.data.result[0].total_trans_price = config.decimal(res.data.result[0].total_trans_price)
      res.data.result[0].total_insure_price = config.decimal(res.data.result[0].total_insure_price)


      //编译时间
      res.data.result[0].created_on = config.getTime(res.data.result[0].created_on)
      res.data.result[0].updated_on = config.getTime(res.data.result[0].updated_on)



      this.setData({
        sumfee: sumfee,
        orderlist: res.data.result[0],
      })
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
    var userId = app.globalData.userId;
    var orderId = this.data.orderId;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/invoicesList?orderId=" + orderId, (err, res) => {

      res.data.result[0].apply_time = config.getTime(res.data.result[0].apply_time)
      res.data.result[0].invoiced_time = config.getTime(res.data.result[0].invoiced_time)

      if (res.data.result[0].invoiced_status == 1) {
        this.setData({
          invoiceFlag: true,
        })
      } else if (res.data.result[0].invoiced_status == 2) {
        this.setData({
          refuseFlag: true,
          invoiceFlag: false,
        })
      }

      this.setData({
        invoice: res.data.result[0],
      })
    })


  },



  choose:function(){
    var applyId = this.data.invoice.invoice_apply_id;
    console.log(this.data.invoice)
    wx.navigateTo({
      url: "/pages/user/invoice/msg-list/msg-list?applyId=" + applyId,
    })
  },

note:function(e){
  var remark = e.detail.value;
  this.setData({
    remark: remark,
  })
},


undo:function(){
  var userId = app.globalData.userId;
  var applyId = this.data.invoice.invoice_apply_id;
  wx.showModal({
    content: '确定撤销发票申请',
    confirmColor: "#a744a7",
    success(res) {
      if (res.confirm) {
  reqUtil.httpDel(config.host.apiHost + "/api/user/" + userId + "/controlInvoices/" +applyId+"/revokeInvoice")

        wx.navigateBack({
        })
      }
    }
  })
},



again:function(){
  var userId = app.globalData.userId;
  var applyId = this.data.invoice.invoice_apply_id;
  var remark = this.data.remark;
  var invoice = this.data.invoice;

  var params = {
    title: invoice.title,
    taxNumber: invoice.tax_number,
    companyPhone: invoice.company_phone,
    bank: invoice.bank,
    bankCode: invoice.bank_code,
    companyAddress: invoice.company_address,
    remark: remark
  }
  reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/controlInvoices/" + applyId + "/invoiceMsg", params,(err, res) => {
    wx.showToast({
      title: '开票申请已重新提交',
      icon: 'success',
      duration: 2000
    })
    setTimeout(function () {
      wx.navigateBack({})
    }, 2000)
  })
},







})