const app = getApp()
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[],
    orderItem:[],

    orderId:'',
    service: ["上门服务", "当地自提"],
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],
    note:"",
    disabled:false,
    address:false,
    carflag:false,
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    var userId = app.globalData.userId;
    this.setData({
      orderId:e.orderId,
    })
  },






  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userId = app.globalData.userId;
    var orderId = this.data.orderId;


    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + orderId, (err, res) => {
      if (res.data.result != '') {
        // 状态设置显示
        if (res.data.result[0].status == 3) {
          res.data.result[0].state = 0;
        } else if (res.data.result[0].status == 1) {
          this.setData({
            disabled: true,
          })
        } else {
          res.data.result[0].state = 1;
        }
        //是否完善地址
        if (res.data.result[0].recv_name != null && res.data.result[0].send_name != null) {
          this.setData({
            address: true,
          })
        }

        //预计费用
        res.data.result[0].ora_insure_price = config.decimal(res.data.result[0].ora_insure_price + res.data.result[0].ora_trans_price);
        //协商费用
        res.data.result[0].total_insure_price = config.decimal(res.data.result[0].insure_price + res.data.result[0].trans_price);
        //编译时间
        res.data.result[0].created_on = config.getTime(res.data.result[0].created_on);
        this.setData({
          orderlist: res.data.result[0],
          service_type: res.data.result[0].service_type - 1,
        })
      }
      console.log(res.data.result)
    })


    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/orderItem?orderId=" + this.data.orderId, (err, res) => {
      console.log(res.data.result)
      if (res.data.result!= "") {
        this.setData({
          orderItem: res.data.result,
          carflag:true,
        })
      }
    })
   
  },








  /**
    * 服务方式
    */
  service:function(e){
    console.log(e)
    var name=e.currentTarget.dataset.name;
  wx.navigateTo({
    url: '/pages/order/transport/transport?orderId='+this.data.orderId,
  })
  },



//留言
noteInput:function(e){
console.log(e)
var note=e.detail.value;

  this.setData({
    note: note,
  })
  },




  //完善信息
  perfect:function(){
    if(this.data.disabled){
      wx.navigateTo({
        url: '/pages/order/car-msg/car-msg?orderId=' + this.data.orderId + "&name=" + "delivery" ,
      })  
    }else{
    wx.navigateTo({
      url: '/pages/order/car-msg/car-msg?orderId=' + this.data.orderId + "&name=" + "pending",
    })
    }
  },





  /**
* 联系客服
*/
  bindCustomer: function () {
    wx.makePhoneCall({
      phoneNumber: '15840668526', //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
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






  




  //取消订单
  cancel:function(){
    var userId = app.globalData.userId;
    wx.showModal({
      content: '确定要取消订单吗？',
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
    reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/order/" + this.data.orderId+"/cancel", "",(err, res) => {})
        }
      }
    })
  },




//提交完善信息
submit:function(e){
  var address = this.data.address;
 var orderitem=this.data.orderItem;
 var service = this.data.service;
 var service_type=this.data.service_type;
 var orderId=this.data.orderId;
 var userId=app.globalData.userId;
 var note=this.data.note;

  if (!address){
    wx.showModal({
      content: "请您添加" +service[service_type]+"中运输地址详情" ,
      showCancel: false,
      confirmColor: "#a744a7",
    });
    return;
  } else if (orderitem == ''){
    wx.showModal({
      content: '请您完善车辆信息',
      showCancel: false,
      confirmColor: "#a744a7",
    });
    return;
  }else{
    var that=this;
    wx.showModal({
      title: '确定已完善所有信息？',
      content: '确定完善所有信息后，客服将开始为您补充价格信息。若还需补充信息，请点击取消。',
      confirmColor: "#a744a7",
      success(res) {
        //点击确认
        if (res.confirm) {
        
          //提交信息到服务器
          var params = {
            remark: note,
          } 
          reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/remark", params, (err, res) => { })


          //修改订单状态
          reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/status/" + 1, "", (err, res) => {
            wx.navigateTo({
              url: '/pages/order/submit/submit',
            })
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  }
  },
 
})