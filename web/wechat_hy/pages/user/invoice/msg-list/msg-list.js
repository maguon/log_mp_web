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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
 this.setData({
   applyId: e.applyId,
 })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取userid
    var userId = app.globalData.userId;
    //发送get请求
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/invoice", (err, res) => {
      if (res.data.result.length == 1) {
        res.data.result[0].status = 1;
      }
      this.setData({
        invList: res.data.result,
      })
    })
  },

  // /**
  //     *单项选择控制
  //     */
  // radioChange: function (e) {
  //   var index = e.currentTarget.dataset.index;
  //   var invList = this.data.invList;
  //   var userId = app.globalData.userId;
  //   var shipAddressId = invList[index].id;
  //   console.log(invList[index].id)
  //   // 判断用户点击index设置默认
  //   for (var i = 0, len = invList.length; i < len; ++i) {
  //     invList[i].status = i == index;

  //   }

  //   //发送PUT
  //   reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + '/invoice/' + shipAddressId + '/status/' + this.data.index, '', (err, res) => { })
  //   //保存
  //   this.setData({
  //     invList: invList,
  //   });

  // },
  //选择银行
  radioChange: function (e) {

    var userId = app.globalData.userId;
    var index = e.currentTarget.dataset.index;
    var invList = this.data.invList;
    var id = this.data.invList[index].id;
    reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/invoice/" + id + "/status/" + 1, "", (err, res) => {
      this.onShow();
      // wx.navigateBack({})
    });
  },






  editor:function(e){
    var index = e.currentTarget.dataset.id;
    var userId = app.globalData.userId;
    var invList = JSON.stringify(this.data.invList[index]);
    console.log(invList)
    wx.navigateTo({
      url: '/pages/user/invoice/msg-Add/msg-Add?invList=' + invList,
    });
  },






  del:function(e){
    var that=this;
    var index = e.currentTarget.dataset.id;
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





  
  useRess:function(){
   var applyId = this.data.applyId;
   var userId = app.globalData.userId;
   var invList = this.data.invList;

    if (applyId !=""){
      var params = {
        title: invList.company_name,
        taxNumber: invList.tax_number,
        companyPhone: invList.company_phone,
        bank: invList.bank,
        bankCode: invList.bank_code,
        companyAddress: invList.company_address,
        remark: ""
      }
      reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/controlInvoices/" + applyId + "/invoiceMsg", params, (err, res) => {
        wx.navigateBack({
        })
       })
    }else{
      wx.navigateBack({
      })
    }
  }
})