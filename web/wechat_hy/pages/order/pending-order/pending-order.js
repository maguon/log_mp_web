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
    startAddress:[],
    endAddress:[],
    orderId:'',
    service: ["上门服务", "当地自提"],
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],
    note:"",
    disabled:false,
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    var userId = app.globalData.userId;
    this.setData({
      orderId:e.id,
    })

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + e.id, (err, res) => {
      if (res.data.result != '') {
        for (var i = 0; i < res.data.result.length; i++) {
          //保留2位小数
          res.data.result[i].total_insure_price = this.decimal(res.data.result[i].insure_price + res.data.result[i].trans_price);
          //设置显示
          if (res.data.result[i].status == 3) {
            res.data.result[i].state = 0;
          } else if (res.data.result[i].status == 1){
            this.setData({
              disabled:true,
            })
          }else {
            res.data.result[i].state = 1;
          }
        }
        this.setData({
          orderlist: res.data.result[0],
          service_type: res.data.result[0].service_type-1,
        })
      }
      console.log(res.data.result)
    })

//获取发车地址
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/userAddress?type=" + 0, (err, res) => {
      //获取发车地址
      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].status == 1) {
          this.setData({
            startAddress: res.data.result[i],
          })
        }
      }
    })
    //获取收车地址
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/userAddress?type=" + 1, (err, res) => {
        //获取发车地址
        for (var i = 0; i < res.data.result.length; i++) {
          if (res.data.result[i].status = 1) {
            this.setData({
              endAddress: res.data.result[i],
            })
          }
        }
    })
  },






  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userId = app.globalData.userId;
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/orderItem?orderId=" + this.data.orderId, (err, res) => {
      console.log(res.data.result)
      if (res.data.result != '') {
        this.setData({
          orderItem: res.data.result,
        })
      }
    })
   
  },


  /**
    * 跳转
    */
orderItem:function(e){
    var index=e.currentTarget.dataset.index;
    wx.navigateTo({
      url:'/pages/order/car-model/car-model?orderId='+this.data.orderId+"&index="+index,
    })
   console.log(e)
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
    * 服务方式
    */
  service:function(){
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
    // if (this.data.orderItem.length >=this.data.orderlist.car_num){
    //   wx.showModal({
    //     content: '已达到您提交的' + this.data.orderlist.car_num+"辆上限",
    //     showCancel: false,
    //     confirmColor: "#a744a7",
    //   });
    //   return;
    // }
    wx.navigateTo({
      url: '/pages/order/car-model/car-model?orderId='+this.data.orderId,
    })
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
 var start_address=this.data.startAddress;
 var end_address=this.data.endAddress;
 var orderitem=this.data.orderItem;
 var service = this.data.service;
 var service_type=this.data.service_type;
 var car_num= this.data.orderlist.car_num;
 var orderId=this.data.orderId;
 var userId=app.globalData.userId;
 var note=this.data.note;

  if (start_address==''|| end_address==''){
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
    console.log(this.data.startAddress)
    var that=this;
    wx.showModal({
      title: '确定已完善所有信息？',
      content: '确定完善所有信息后，客服将开始为您补充价格信息。若还需补充信息，请点击取消。',
      confirmColor: "#a744a7",
      success(res) {
        //点击确认
        if (res.confirm) {
          var params = {
            mark: note,
          }
          //提交留言
          reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/orderMark", params, (err, res) => { })

          //发送收货地址
          var param_recv = {
            recvName: that.data.startAddress.user_name,
            recvPhone: that.data.startAddress.phone,
            recvAddress: that.data.startAddress.detail_address,
          }
          
          reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/receiveInfo", param_recv, (err, res) => { })

          //发送发货信息
          var param_send = {
            sendName: that.data.endAddress.user_name,
            sendPhone: that.data.endAddress.phone,
            sendAddress: that.data.endAddress.detail_address,
          }
          reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/sendInfo", param_send, (err, res) => { })

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