const app = getApp();
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    invList:[],
    invoice:"",
    ein:"",
    bank: "",
    bankNum: "",
    address: "",
    phone: "",
    add:"确定",
    index:0,
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var invList = JSON.parse(e.invList);
    console.log(invList)
    if (invList!= "") {
      this.setData({
        invList: invList,
        invoice: invList.company_name,
        bank: invList.bank,
        bankNum: invList.bank_code,
        ein: invList.tax_number,
        phone: invList.company_phone,
        address: invList.company_address,
        add: '确定修改',

      })
    } else {
      this.setData({
        invList: invList,
      })
    }
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

  },

  invoice:function(e){
    var invoice = e.detail.value;
    this.setData({
      invoice: invoice,
    })
  },
  ein: function (e) {
    var ein = e.detail.value;
    this.setData({
      ein: ein,
    })
  },
  bank: function (e) {
    var bank = e.detail.value;
    this.setData({
      bank: bank,
    })
  },
  bankNum: function (e) {
    var bankNum = e.detail.value;
    this.setData({
      bankNum: bankNum,
    })
  },
  address: function (e) {
    var address= e.detail.value;
    this.setData({
      address: address,
    })
  },
  phone: function (e) {
    var phone = e.detail.value;
    this.setData({
      phone: phone,
    })
  },
  add: function (e) {
    var add = e.detail.value;
    this.setData({
      add: add,
    })
  },


  /**
     * 添加
     */
  saveAddress: function (e) {
    var userId = app.globalData.userId;
    var that = this;
    var warn = '';
    var flag = true;
    var invoice = that.data.invoice;
    var ein = that.data.ein;
    var bank = that.data.bank;
    var bankNum = that.data.bankNum;
    var address = that.data.address;
    var phone = that.data.phone;

    //判断用户输入
    if (invoice == "") {
      warn = "请输入公司名称";
    } else if (phone == "") {
      warn = "请输入您的电话号！";
    } else if (ein == "") {
      warn = "请输入公司税号";
    } else if (bank == "") {
      warn = "请输入开户银行";
    } else if (bankNum == "") {
      warn = "请输入开户账号";
    } else if (address == "") {
      warn = "请输入公司地址";
    }else {
      console.log(that.data.invList)
    
      flag = false;
      if (that.data.invList!= "") {
     
        var params = {
          title: invoice,
          taxNumber: ein,
          companyAddress: address,
          bank: bank,
          bankCode: bankNum,
          companyPhone: phone,
        }
        //发送请求
        reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/invoice/" + that.data.invList.id, params, (err, res) => { 
          //跳转地址管理界面
          wx.navigateBack({
          })
        });
      } else {   
        //获取要传递的参数
        var params = {
          companyName: invoice,
          taxNumber: ein,
          companyAddress: address,
          bank: bank,
          bankCode: bankNum,
          companyPhone: phone,
        }
        //发送Post请求
        reqUtil.httpPost(config.host.apiHost + '/api/user/' + userId + "/invoice", params, (err, res) => { 
          //跳转地址管理界面
          wx.navigateBack({
          })
        })
       }
    
    }
    //输入错误弹窗提示
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn,
        showCancel: false,
        confirmColor: "#a744a7",
      })
    }
  },
})