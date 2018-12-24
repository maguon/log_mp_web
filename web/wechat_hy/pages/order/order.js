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
    orderlist:[],
    index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

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
  var index=this.data.index;
  var userId=app.globalData.userId;
  var orderState = this.data.orderState;

  switch(index){
    case 0:
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/queryInquiry", (err, res) => {
        if (res.data.result!=''){
        orderState[0].hidden=true;
       
        for(var i=0; i<res.data.result.length;i++){
          res.data.result[i].fee= this.decimal(res.data.result[i].fee);
          res.data.result[i].fee_price=this.decimal(res.data.result[i].fee_price);
          if(res.data.result[i].status==3){
            res.data.result[i].state = 0;
          }else{
            res.data.result[i].state = 1;
          }
        }

        this.setData({
          orderState: orderState,
          orderlist:res.data.result,
        })
        }
        console.log(res.data.result)
      })
      
      break;
    case 1:
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order", (err, res) => {
        orderState[1].hidden = true;
          for (var i = 0; i < res.data.result.length; i++) {
            res.data.result[i].fee = this.decimal(res.data.result[i].fee);
            res.data.result[i].fee_price = this.decimal(res.data.result[i].fee_price);
          }
        console.log(res.data.result)
          this.setData({
            orderState: orderState,
            orderlist: res.data.result,
          })
          
      })
    
      break;
    case 2:
   
      break;
    case 3:
    
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
    wx.navigateTo({
      url: '/pages/order/order-discuss/order-discuss?id='+id+"&index="+index,
    })
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})