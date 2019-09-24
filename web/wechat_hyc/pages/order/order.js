
const app = getApp()
const config = require('../../host_config.js');
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
    size:20,
  
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    if (!userId) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  var index=this.data.index;
  var userId=app.globalData.userId;
  var orderState = this.data.orderState;

   //判断红点显示
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiry", (err, res) => {
      var count=0;
      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].status == 0 ||res.data.result[i].status == 1 ) {
          count++;
        }
      }
      if (count == 0){
        orderState[0].hidden = false;
      }else{
        orderState[0].hidden = true;
      }
      this.setData({
        orderState: orderState,
      })
    })
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order", (err, res) => {
      var count_a = 0;
      var count_b = 0;
      var count_c = 0;
      var count_d = 0;

      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].status == 0 || res.data.result[i].status == 1 ) {
          count_a++;
          orderState[1].hidden = true;
        } else if (res.data.result[i].status == 8){

        }else if (res.data.result[i].payment_status == 0 || res.data.result[i].payment_status == 1){
    
          count_b++;
          orderState[2].hidden = true;
        } 
         if (res.data.result[i].status == 2 || res.data.result[i].status == 3) {
          count_c++;
          orderState[3].hidden = true;
        } 

         if (res.data.result[i].status == 4 ) {
          count_d++;
          orderState[4].hidden = true;
        }
      }
      if (count_a==0){
        orderState[1].hidden = false;
      }
       if (count_b==0){
        orderState[2].hidden = false;
      } 
      if (count_c == 0){
        orderState[3].hidden = false;
      } 
       if (count_d == 0) {
        orderState[4].hidden = false;
      }


      this.setData({
        orderState: orderState,
      })
    })


 
//内容显示
  switch(index){
    case 0:
      //打开加载 
      this.setData({
        loadingHidden: false,
        prompt: false,
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiry?statusList=" + "0,1"+ "&start=" + 0 +"&size="+this.data.size, (err, res) => {
        // console.log(res.data.result)
        if (res.data.result!=""){
        for(var i=0; i<res.data.result.length;i++){
         //协商费用
          res.data.result[i].price = reqUtil.decimal(res.data.result[i].total_trans_price + res.data.result[i].total_insure_price);
          //编译时间
          res.data.result[i].created_on = reqUtil.getTime(res.data.result[i].created_on);
          res.data.result[i].updated_on = reqUtil.getTime(res.data.result[i].updated_on);
         //预计费用
          res.data.result[i].fee_price = reqUtil.decimal(res.data.result[i].ora_trans_price + res.data.result[i].ora_insure_price);
          res.data.result[i].route_start = res.data.result[i].start_city;
          res.data.result[i].route_end = res.data.result[i].end_city;

        
          //判断显示状态
          if (res.data.result[i].status == 0) {
            res.data.result[i].stay = 0;
            res.data.result[i].state = 1;
            res.data.result[i].is=true;
          } else if (res.data.result[i].status == 1) {
            res.data.result[i].stay = 1;
            res.data.result[i].state = 1;
       
          } else if (res.data.result[i].status == 3) {
            res.data.result[i].state = 0;
          } 
        }         
        this.setData({
          flag: false,
          loadingHidden:true,
          orderlist:res.data.result,
        })
        }else{
          this.setData({
            flag:true,         
            loadingHidden:true,
          })
        }

      })
      break;


    case 1:
      //打开加载 
      this.setData({
        loadingHidden: false,
        prompt: false,
    
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?statusList=" + "0,1" + "&start=" + 0 +"&size="+this.data.size, (err, res) => {
        if (res.data.result != '') {
          for (var i = 0; i < res.data.result.length; i++) {
               //协商费用
            res.data.result[i].price = reqUtil.decimal(res.data.result[i].trans_price + res.data.result[i].insure_price);
            //预计费用
            res.data.result[i].fee_price = reqUtil.decimal(res.data.result[i].ora_trans_price + res.data.result[i].ora_insure_price);
            //编译时间
            res.data.result[i].created_on = reqUtil.getTime(res.data.result[i].created_on);
            res.data.result[i].updated_on = reqUtil.getTime(res.data.result[i].updated_on);

            if (res.data.result[i].created_type==3){
              res.data.result[i].creatFlag=true;
            }
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
            } 
            else if (res.data.result[i].status == 8) {
              res.data.result[i].state = 0;
            } 
          }

          this.setData({
            flag: false,
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
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?statusList=" + "2,3,4,9" +"&paymentStatusList="+"0,1"+ "&start=" + 0 +"&size="+this.data.size, (err, res) => {
        if (res.data.result != '') {

          for (var i = 0; i < res.data.result.length; i++) {
            //支付费用
            res.data.result[i].sumFee = reqUtil.decimal(res.data.result[i].total_trans_price + res.data.result[i].total_insure_price);
            //编译时间
            res.data.result[i].created_on = reqUtil.getTime(res.data.result[i].created_on);
            res.data.result[i].updated_on = reqUtil.getTime(res.data.result[i].updated_on);

           
           //判断支付状态
            if (res.data.result[i].payment_status == 0) {
              res.data.result[i].stay = 4;
              res.data.result[i].payFlag = true;
              res.data.result[i].state = 1;
            } else if (res.data.result[i].payment_status == 1) {
              res.data.result[i].stay = 5;
              res.data.result[i].payFlag = true;
              res.data.result[i].state = 1;
            } else{
              res.data.result[i].state = 0;
            }
        
          }

          this.setData({
            flag: false,
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
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId +"/order?statusList=" +"2,3" + "&start=" + 0 +"&size="+this.data.size, (err, res) => {

        if (res.data.result != '') {
          for (var i = 0; i < res.data.result.length; i++) {
      
            //支付费用
            res.data.result[i].sumFee = reqUtil.decimal(res.data.result[i].total_trans_price + res.data.result[i].total_insure_price);
            //编译时间
            res.data.result[i].created_on = reqUtil.getTime(res.data.result[i].created_on);
            res.data.result[i].updated_on = reqUtil.getTime(res.data.result[i].updated_on);
            //  //判断显示状态
            if (res.data.result[i].status == 2 || res.data.result[i].status == 3) {
              res.data.result[i].status = 1;           
              res.data.result[i].state = 1;
              res.data.result[i].payFlag = true;  
            }
          
            //判断物流状态 
            if (res.data.result[i].log_status == 0) {
              res.data.result[i].stay = 7;
            } else if (res.data.result[i].log_status == 1) {
              res.data.result[i].stay = 8;
            } 
          }

          this.setData({
            flag: false,
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
        prompt:false,
     
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?statusList=" + "4" + "&start=" + 0 +"&size="+this.data.size,(err, res) => {
        if (res.data.result != '') {
          for (var i = 0; i < res.data.result.length; i++) {

            //支付费用
            res.data.result[i].sumFee = reqUtil.decimal(res.data.result[i].total_trans_price + res.data.result[i].total_insure_price);
            //编译时间
            res.data.result[i].created_on = reqUtil.getTime(res.data.result[i].created_on);
            res.data.result[i].updated_on = reqUtil.getTime(res.data.result[i].updated_on);
            // //判断显示状态
            if (res.data.result[i].status == 4) {
              res.data.result[i].stay = 9;
              res.data.result[i].status = 1;           
              res.data.result[i].state = 1;
              res.data.result[i].payFlag = true;
            } 
            // else if (res.data.result[i].status == 8) {
            //   res.data.result[i].state = 0;
            // } 
            //判断执行状态
            if (res.data.result[i].log_status == 0) {
              res.data.result[i].stay = 9;
            }
          }

          this.setData({
            flag: false,
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
      size:20,
    })
    this.onShow();
  },


  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {
    var size = this.data.size;
    var new_size = size +6;

    this.setData({
      size: new_size,
    })
    this.onShow();
  },


  bindDetail:function(e){
    var index = e.currentTarget.dataset.index;
    var orderId = this.data.orderlist[index].id;
    var fee_price = this.data.orderlist[index].fee_price;
 
    switch(this.data.index){
    case 0:
        wx.navigateTo({
          url: '/pages/order/order-inquiry/order-inquiry?orderId=' + orderId,
        })
       break;
    case 1:
        wx.navigateTo({
          url: '/pages/order/pending-order/pending-order?orderId=' + orderId + "&name=" + "" + "&ora_insure_price=" + fee_price,
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
        url: '/pages/order/order-pay/order-pay?orderId=' + orderId + "&name=" + "transport",
        })
        break;
      default: 
    }
  },


  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})