const app = getApp();
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    invList: [],
    applyId:"",
    hidden: false,
    flag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if (e.applyId!=""){
      this.setData({
       applyId: e.applyId,
       hidden:true,
       })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取userid
    var userId = app.globalData.userId;
    //发送get请求
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/invoice", (err, res) => {
      if (res.data.result!=""){
      if (res.data.result.length == 1) {
        res.data.result[0].status = 1;
      }
      this.setData({
        flag: false,
        invList: res.data.result,
      })
      }else{
        this.setData({
          flag: true,
        })
      }
    })
  },


  // //选择银行
  // radioChange: function (e) {

 
  //   reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/invoice/" + id + "/defaultInvoice", "", (err, res) => {
  //     this.onShow();
  //     // wx.navigateBack({})
  //   });

  //   if (applyId != "") {
  //     var params = {
  //       title: invList.company_name,
  //       taxNumber: invList.tax_number,
  //       companyPhone: invList.company_phone,
  //       bank: invList.bank,
  //       bankCode: invList.bank_code,
  //       companyAddress: invList.company_address,
  //       remark: ""
  //     }
  //     reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/controlInvoices/" + applyId + "/invoiceMsg", params, (err, res) => {
  //       setTimeout(function () {
  //         wx.navigateBack({
  //         })
  //       }, 500)
  //     })
  //   } else {
  //     setTimeout(function () {
  //       wx.navigateBack({
  //       })
  //     }, 500)
  //   }
  // },






  editor:function(e){
    var index = e.currentTarget.dataset.index;
    var userId = app.globalData.userId;
    var invList = this.data.invList;
    var id = this.data.invList[index].id;
    var applyId = this.data.applyId;
    var invLists = JSON.stringify(this.data.invList[index]);

    if (applyId != "") {
     reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/invoice/" + id + "/defaultInvoice", "", (err, res) => {
  });
      var params = {
        title: invList[index].company_name,
        taxNumber: invList[index].tax_number,
        companyPhone: invList[index].company_phone,
        bank: invList[index].bank,
        bankCode: invList[index].bank_code,
        companyAddress: invList[index].company_address,
        remark: ""
      }
      reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/controlInvoices/" + applyId + "/invoiceMsg", params, (err, res) => {
        setTimeout(function () {
          wx.navigateBack({
          })
        }, 500)
      })
    } else {
      wx.navigateTo({
        url: '/pages/user/invoice/msg-Add/msg-Add?invList=' + invLists,
      });
    }
   
  },






  del:function(e){
    var that=this;
    var index = e.currentTarget.dataset.index;
    var userId = app.globalData.userId;
    var invList = that.data.invList[index];

    wx.showModal({
      content: '确定要删除抬头信息？',
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
    //发送请求
    reqUtil.httpDel(config.host.apiHost + '/api/user/' + userId + "/invoice?userInvoiceId=" + invList.id);
    //更新信息
    that.onShow();
        }
      }
    })
  },
  





  addAddress:function(){
    var invList = JSON.stringify("");
    wx.navigateTo({
      url: "/pages/user/invoice/msg-Add/msg-Add?invList=" + invList,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.onShareApp();
  }

})