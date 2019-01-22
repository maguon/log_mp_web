const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: ["未支付", "部分支付", "已支付"],
    service: ["", "上门服务", "当地自提"],
    orderId:"",
    sumfee:'',
    remark :'',
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
    //获取userid
    var userId = app.globalData.userId;
    //发送get请求
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/invoice", (err, res) => {
      var list=[];
   for(var i=1;i<res.data.result.length;i++){
     if(res.data.result[i].status==1){
       list=res.data.result[i];
     }
   }
      this.setData({
        invList: list,
      })
    })
  },


  noteInput:function(e){
    var remark = e.detail.value;
    this.setData({
      remark:remark,
    })

  },





  bindtap:function(){
    var userId = app.globalData.userId;
    var orderId=this.data.orderId;
    var remark = this.data.remark;
    var invList = this.data.invList;
    
    var params = {
      title: invList.company_name,
      taxNumber: invList.tax_number,
      companyPhone: invListe.company_phone,
      bank: invList.bank,
      bankCode: invList.bank_code,
      companyAddress: invList.company_address,
      remark: remark
    }
    reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/invoiceApply", params, (err, res) => {
      wx.showToast({
        title: '开票申请已提交',
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack({

      })
    })

  },
 


  payMsg:function(){
    wx.navigateTo({
      url: '/pages/user/invoice/msg-list/msg-list?applyId=' + "",
    })
  },
})