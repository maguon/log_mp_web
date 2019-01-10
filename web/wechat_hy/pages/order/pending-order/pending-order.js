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
    address:false,
    carflag:false,
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    var userId = app.globalData.userId;
    var  orderId=e.orderId;
    

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + orderId, (err, res) => {
      if (res.data.result != '') {
        // for (var i = 0; i < res.data.result.length; i++) {
        //   //保留2位小数
        //   res.data.result[i].total_insure_price = this.decimal(res.data.result[i].insure_price + res.data.result[i].trans_price);
         
        //   //设置显示
        //   if (res.data.result[i].status == 3) {
        //     res.data.result[i].state = 0;
        //   } else if (res.data.result[i].status == 1){
        //     this.setData({
        //       disabled:true,
        //     })
        //   }else {
        //     res.data.result[i].state = 1;
        //   }
        // }
        //预计费用
        res.data.result[0].ora_insure_price = this.decimal(res.data.result[0].ora_insure_price + res.data.result[0].ora_trans_price);
        //协商费用
        res.data.result[0].total_insure_price = this.decimal(res.data.result[0].insure_price + res.data.result[0].trans_price);
        //编译时间
        res.data.result[0].created_on = this.getTime(res.data.result[0].created_on);
        this.setData({
          orderlist: res.data.result[0],
          service_type: res.data.result[0].service_type-1,
          orderId: orderId,
        })
      }
      console.log(res.data.result)
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
          carflag:true,
        })
      }
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
    if(this.data.startAddress==""||this.data.endAddress!=""){
      this.setData({
        address:true,
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
    wx.navigateTo({
      url: '/pages/order/car-msg/car-msg?orderId=' + this.data.orderId+"&name="+"pending",
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