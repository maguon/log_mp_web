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
    loadingHidden: false,

    timeFlag:false,
    dateFlag:false,
    date: '',
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

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

    this.setData({
      loadingHidden: true
    }) 

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + orderId, (err, res) => {
      if (res.data.result != '') {
        // 状态设置显示
        if (res.data.result[0].status == 3) {
          res.data.result[0].state = 0;
        } else if (res.data.result[0].status == 1) {
          var dateTime = config.getTime01(res.data.result[0].departure_time);
          this.setData({
            date: dateTime,
            dateFlag: true,
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

        if (res.data.result[0].remark==null){
          res.data.result[0].remark=""
        }
  
    

        this.setData({
          orderlist: res.data.result[0],
          service_type: res.data.result[0].service_type - 1,
          loadingHidden: false,
        })
      }

    })


    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/orderItem?orderId=" + this.data.orderId, (err, res) => {

      if (res.data.result!= "") {
        this.setData({
          orderItem: res.data.result,
          carflag:true,
        })
      }
    })
   
  },


/**
 * 发车时间
 */
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      timeFlag:true
    })
  },




  /**
    * 服务方式
    */
  service:function(e){

    var name=e.currentTarget.dataset.name;
    if (this.data.disabled) {
  wx.navigateTo({
    url: '/pages/order/transport/transport?orderId=' + this.data.orderId + "&name=" + "delivery",
  })
  }else{
      wx.navigateTo({
        url: '/pages/order/transport/transport?orderId=' + this.data.orderId + "&name=" + "pending",
      })
  }
  },



//留言
noteInput:function(e){

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







  




  //取消订单
  cancel:function(){
    var userId = app.globalData.userId;
    var orderId= this.data.orderId;

    wx.showModal({
      content: '确定要取消订单吗？',
      confirmColor: "#a744a7",
      success(res) {
        if (res.confirm) {
          reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/order/" + orderId+"/cancel", "",(err, res) => {
  wx.navigateBack({
  })
    })
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
 var date=this.data.date;

  if (!address){
    wx.showModal({
      content: "请您添加" +service[service_type]+"中运输地址详情" ,
      showCancel: false,
      confirmColor: "#a744a7",
    });
    return;
  } else if (date== "") {
    wx.showModal({
      content: "请选择您的发车时间",
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
            departureTime:date,
          } 
          reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/remark", params, (err, res) => { })


          //修改订单状态
          reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/status/" + 1, "", (err, res) => {
            wx.navigateTo({
              url: '/pages/order/submit/submit',
            })
          })

        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    });
  }
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})