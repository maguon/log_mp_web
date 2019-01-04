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
        name: "待签收",
        url: '../../images/closed.png',
        hidden: false,
        status: false,
        number: 0.5,
      }
    ],
    state:["待报价","已报价","待完善","已完善","待付款","已付款","待发运","已发运","待签收","已签收"],
    stateindex:0,
    orderlist:[],
    index:0,
    flag:false,
    loadingHidden:false,
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
        loadingHidden: false
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiry", (err, res) => {
        console.log(res.data.result)
        if (res.data.result!=[]){
        orderState[0].hidden=true;
        for(var i=0; i<res.data.result.length;i++){
         //协商费用
         res.data.result[i].total_trans_price = this.decimal(res.data.result[i].total_trans_price);
         //预计费用
          res.data.result[i].fee_price = this.decimal(res.data.result[i].ora_trans_price + res.data.result[i].ora_insure_price);
          //判断状态
          if (res.data.result[i].status == 0) {
            res.data.result[i].stay = 0;
            res.data.result[i].state = 1;
          } else if (res.data.result[i].status == 1 || res.data.result[i].status == 2) {
            res.data.result[i].stay = 1;
            res.data.result[i].state = 1;
          } else if (res.data.result[i].status == 3) {
            res.data.result[i].state = 0;
          } else {
            res.data.result[i].state = 1;
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
        loadingHidden: false
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order", (err, res) => {
        if (res.data.result != '') {
          for (var i = 0; i < res.data.result.length; i++) {
            res.data.result[i].total_trans_price = this.decimal(res.data.result[i].trans_price + res.data.result[i].insure_price);
            if (res.data.result[i].status==0){
              res.data.result[i].status=1;
              res.data.result[i].stay = 2;
              res.data.result[i].state = 1;
            } else if (res.data.result[i].status == 1){
              res.data.result[i].status = 1;
              res.data.result[i].stay = 3;
              res.data.result[i].state = 1;
            } else if (res.data.result[i].status == 8 || res.data.result[i].status != 0 || res.data.result[i].status != 1 ) {
              res.data.result[i].state = 0;
            } else {
              res.data.result[i].state = 1;
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
        loadingHidden: false
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order", (err, res) => {
        if (res.data.result != '') {
          for (var i = 0; i < res.data.result.length; i++) {
            res.data.result[i].total_trans_price = this.decimal(res.data.result[i].trans_price + res.data.result[i].insure_price);
            if (res.data.result[i].status == 2) {
              res.data.result[i].status = 1;
              res.data.result[i].stay = 4;
              res.data.result[i].state = 1;
            } else if (res.data.result[i].status == 3) {
              res.data.result[i].status = 1;
              res.data.result[i].stay = 5;
              res.data.result[i].state = 1;
            } else if (res.data.result[i].status == 8 || res.data.result[i].status != 2 || res.data.result[i].status != 3) {
              res.data.result[i].state = 0;
            } else {
              res.data.result[i].state = 1;
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
        loadingHidden: false
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order", (err, res) => {
        if (res.data.result != '') {
          for (var i = 0; i < res.data.result.length; i++) {
            res.data.result[i].total_trans_price = this.decimal(res.data.result[i].trans_price + res.data.result[i].insure_price);
            // if (res.data.result[i].status == 2) {
            //   res.data.result[i].status = 1;
            //   res.data.result[i].stay = 4;
            //   res.data.result[i].state = 1;
            // } else 
            if (res.data.result[i].status == 3) {
              res.data.result[i].status = 1;
              res.data.result[i].stay = 5;
              res.data.result[i].state = 1;
            } else if (res.data.result[i].status == 8 || res.data.result[i].status != 2 || res.data.result[i].status != 3) {
              res.data.result[i].state = 0;
            } else {
              res.data.result[i].state = 1;
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

      break;
    default:
    
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
    var id = this.data.orderlist[index].id;
    console.log(e)
    switch(this.data.index){
    case 0:
        wx.navigateTo({
          url: '/pages/order/order-inquiry/order-inquiry?id='+id,
        })
       break;
    case 1:
        wx.navigateTo({
          url: '/pages/order/pending-order/pending-order?id=' + id,
        })
        break;
   case 2:
        wx.navigateTo({
          url: "/pages/order/order-pay/order-pay?id="+ id,
        })
        break;
   case 3:
        wx.navigateTo({
          url: '/pages/order/delivery-order/delivery-order?id=' + id,
        })
        break;
   case 4:
        wx.navigateTo({
          url: '/pages/order/pending-order/pending-order?id=' + id,
        })
        break;
      default: 
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
  
})