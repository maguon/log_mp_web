// pages/order/order.js
const app = getApp()
const config = require('../../config.js');
const reqUtil = require('../../utils/ReqUtil.js')



Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderState:[
      {
        name:"待协商",
        url:'../../images/negotiation.png',
        hidden:false,
        status:true,
        number:1,
      },
      {
        name: "待完善",
        url: '../../images/perfect.png',
        hidden: false,
        status: false,
        number: 0.5,
      },
      {
        name: "待付款",
        url: '../../images/pay.png',
        hidden: false,
        status: false,
        number: 0.5,
      },
      {
        name: "待发运",
        url: '../../images/stay.png',
        hidden: false,
        status: false,
        number: 0.5,
      },
      {
        name: "运输中",
        url: '../../images/closed.png',
        hidden: false,
        status: false,
        number: 0.5,
      }
    ],
    state: ["待报价", "已报价", "待完善", "已完善", "未付款", "部分支付","已付款", "待安排","待发运","运输中","已送达"],
    stateindex:0,
    orderlist:[],
    index:0,
    flag:false,
    loadingHidden:false,
    prompt:false,
  
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

  },

  



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  var index=this.data.index;
  var userId=app.globalData.userId;
  var orderState = this.data.orderState;

 

  switch(index){
    case 0:
      //打开加载 
      this.setData({
        loadingHidden: false,
        prompt: false,
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiry", (err, res) => {
        console.log(res.data.result)
        if (res.data.result!=[]){
        orderState[0].hidden=true;
        for(var i=0; i<res.data.result.length;i++){
         //协商费用
          res.data.result[i].price = this.decimal(res.data.result[i].total_trans_price + res.data.result[i].total_insure_price);
          //编译时间
          res.data.result[i].created_on = this.getTime(res.data.result[i].created_on);
          res.data.result[i].updated_on = this.getTime(res.data.result[i].updated_on);
         //预计费用
          res.data.result[i].fee_price = this.decimal(res.data.result[i].ora_trans_price + res.data.result[i].ora_insure_price);
          //判断显示状态
          if (res.data.result[i].status == 0) {
            res.data.result[i].stay = 0;
            res.data.result[i].state = 1;
          } else if (res.data.result[i].status == 1 || res.data.result[i].status == 2) {
            res.data.result[i].stay = 1;
            res.data.result[i].state = 1;
          } else if (res.data.result[i].status == 3) {
            res.data.result[i].state = 0;
          } 
        }         
        this.setData({
          loadingHidden:true,
          orderState: orderState,
          orderlist:res.data.result,
          flag: false,
        })
        }else{
          this.setData({
            flag:true,
            loadingHidden:true,
          })
        }
        console.log(res.data.result)
      })
      break;
    case 1:
      //打开加载 
      this.setData({
        loadingHidden: false,
        prompt: false,
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order", (err, res) => {
        if (res.data.result != '') {
          for (var i = 0; i < res.data.result.length; i++) {
               //协商费用
            res.data.result[i].price = this.decimal(res.data.result[i].trans_price + res.data.result[i].insure_price);
            //编译时间
            res.data.result[i].created_on = this.getTime(res.data.result[i].created_on);
            res.data.result[i].updated_on = this.getTime(res.data.result[i].updated_on);
             //判断显示状态
            if (res.data.result[i].status==0){
              res.data.result[i].status=1;
              res.data.result[i].stay = 2;
              res.data.result[i].state = 1;
            } else if (res.data.result[i].status == 1){
              res.data.result[i].status = 1;
              res.data.result[i].stay = 3;
              res.data.result[i].state = 1;
              //判断删除状态
            } else if (res.data.result[i].status == 8) {
              res.data.result[i].state = 0;
            } 
          }
        console.log(res.data.result)
          this.setData({
            orderState: orderState,
            orderlist: res.data.result,
            loadingHidden:true
          })
        } else {
          this.setData({
            flag: true,
            loadingHidden: true
          })
        }      
      })
    
      break;
    case 2:
      //打开加载 
      this.setData({
        loadingHidden: false,
        prompt: false,
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order", (err, res) => {
        if (res.data.result != '') {
          for (var i = 0; i < res.data.result.length; i++) {
            //支付费用
            res.data.result[i].sumFee = this.decimal(res.data.result[i].total_trans_price + res.data.result[i].total_insure_price);
            //编译时间
            res.data.result[i].created_on = this.getTime(res.data.result[i].created_on);
            res.data.result[i].updated_on = this.getTime(res.data.result[i].updated_on);
             //判断显示状态
            if (res.data.result[i].status == 2) {
              res.data.result[i].status = 1;
              res.data.result[i].state = 1;
              res.data.result[i].payFlag = true;
              //判断删除状态
            }else  if (res.data.result[i].status == 8) {
              res.data.result[i].state = 0;
            } 
           //判断支付状态
            if (res.data.result[i].payment_status == 0) {
              res.data.result[i].stay = 4;
            } else if (res.data.result[i].payment_status == 1) {
              res.data.result[i].stay = 5;
            } else if (res.data.result[i].payment_status == 2) {
              res.data.result[i].stay = 6;
            } 
          }

          console.log(res.data.result)
          this.setData({
            orderState: orderState,
            orderlist: res.data.result,
            loadingHidden: true
          })
        } else {
          this.setData({
            flag: true,
            loadingHidden: true
          })
        }
      })
      break;


    case 3:
      //打开加载 
      this.setData({
        loadingHidden: false,
        prompt: false,
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order", (err, res) => {
        if (res.data.result != '') {
          for (var i = 0; i < res.data.result.length; i++) {
      
            //支付费用
            res.data.result[i].sumFee = this.decimal(res.data.result[i].total_trans_price + res.data.result[i].total_insure_price);
            //编译时间
            res.data.result[i].created_on = this.getTime(res.data.result[i].created_on);
            res.data.result[i].updated_on = this.getTime(res.data.result[i].updated_on);
             //判断显示状态
            if (res.data.result[i].status == 2 || res.data.result[i].status == 3) {
              res.data.result[i].status = 1;           
              res.data.result[i].state = 1;
              res.data.result[i].payFlag = true;
            //判断删除状态
            }else  if (res.data.result[i].status == 8) {
              res.data.result[i].state = 0;
            } 
            //判断物流状态 
            if (res.data.result[i].log_status == 0) {
              res.data.result[i].stay = 7;
            } else if (res.data.result[i].log_status == 1) {
              res.data.result[i].stay = 8;
            } 
          }
          console.log(res.data.result)
          this.setData({
            orderState: orderState,
            orderlist: res.data.result,
            loadingHidden: true
          })
        } else {
          this.setData({
            flag: true,
            loadingHidden: true
          })
        }
      })

      break;
    case 4:
      //打开加载 
      this.setData({
        loadingHidden: false,
        prompt:true,
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order", (err, res) => {
        if (res.data.result != '') {
          for (var i = 0; i < res.data.result.length; i++) {

            //支付费用
            res.data.result[i].sumFee = this.decimal(res.data.result[i].total_trans_price + res.data.result[i].total_insure_price);
            //编译时间
            res.data.result[i].created_on = this.getTime(res.data.result[i].created_on);
            res.data.result[i].updated_on = this.getTime(res.data.result[i].updated_on);
            //判断显示状态
            if (res.data.result[i].status == 4) {
              res.data.result[i].status = 1;           
              res.data.result[i].state = 1;
              res.data.result[i].payFlag = true;
            } else if (res.data.result[i].status == 8) {
              res.data.result[i].state = 0;
            } 
            //判断执行状态
            if (res.data.result[i].log_status == 2) {
              res.data.result[i].stay = 9;
            }
          }
          console.log(res.data.result)
          this.setData({
            orderState: orderState,
            orderlist: res.data.result,
            loadingHidden: true
          })
        } else {
          this.setData({
            flag: true,
            loadingHidden: true
          })
        }
      })
      break;
   }
  },






/**
 * 订单导航栏
 */
  selectButton:function(e){
    var that=this;
    var index=e.currentTarget.dataset.index;
    var orderState = that.data.orderState;
    var userId = app.globalData.userId;
    //判断用户点击
    for (var i = 0; i < orderState.length;i++){
      if (index==i){
        orderState[i].status = true;
        orderState[i].number=1;
      }else{
        orderState[i].status = false;
        orderState[i].number = 0.5;
      }
    }
    //更新点击
    that.setData({
      orderState: orderState,
      index:index,
    })
    this.onShow();
  },




  bindDetail:function(e){
    var index = e.currentTarget.dataset.index;
    var orderId = this.data.orderlist[index].id;
    console.log(e)
    switch(this.data.index){
    case 0:
        wx.navigateTo({
          url: '/pages/order/order-inquiry/order-inquiry?orderId=' + orderId,
        })
       break;
    case 1:
        wx.navigateTo({
          url: '/pages/order/pending-order/pending-order?orderId=' + orderId,
        })
        break;
   case 2:
        wx.navigateTo({
          url: "/pages/order/order-pay/order-pay?orderId=" + orderId+"&name="+"order",
        })
        break;
   case 3:
        wx.navigateTo({
          url: '/pages/order/order-pay/order-pay?orderId=' + orderId+"&name="+"order",
        })
        break;
   case 4:
        wx.navigateTo({
          url: '/pages/order/pending-order/pending-order?orderId=' + orderId,
        })
        break;
      default: 
    }
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
   * 保留小数
   */
  decimal: function (e) {
    //钱数小数点后二位设定
    var total_price = Number(e);
    var money = total_price.toFixed(2);
    return money;
  },
  


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    page = page + 1;
    wx.request({
      url: 'https://xxx/?page=' + page,
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        // 回调函数
        var moment_list = that.data.moment;

        for (var i = 0; i < res.data.data.length; i++) {
          moment_list.push(res.data.data[i]);
        }
        // 设置数据
        that.setData({
          moment: that.data.moment
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  },
})