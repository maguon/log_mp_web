const config = require('../../../host_config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
const app = getApp()


Page({
  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    carMsg:[],
    nullHouse: true,
    cusList: [],

    array: ["上门服务", "当地自提"],
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],

    car_num:0,
    sumFee: 0,
    loadingHidden: false,
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(e){
    var carMsgList = JSON.parse(e.carMsg);
    var arr = JSON.parse(e.arr);

    this.setData({
       loadingHidden: true,
       arr: arr,
       carMsg: carMsgList,
     })
 },


  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (e) {
    var that=this;
    var userId = app.globalData.userId;
    var name=app.globalData.name;
    var carMsg = that.data.carMsg;
    var car_num=0;
    var sumFee=0;


    if(name=="index"){
    var params={
      distance: carMsg[0].distance,
      modelType: carMsg[0].modelType+1,
      oldCar: carMsg[0].oldCar,
      serviceType: carMsg[0].serviceType+1,
      valuation: parseInt(carMsg[0].valuation),
      safeStatus: carMsg[0].safeStatus
    }
   
    reqUtil.httpPost(config.host.apiHost +"/api/transAndInsurePrice",params,(err,res)=>{

      carMsg[0].price =(res.data.result.trans+res.data.result.insure).toFixed(2);

      carMsg[0].price = parseFloat(carMsg[0].price);

      for (var i = 0; i < carMsg.length; i++) {
        car_num += carMsg[i].carNum;
        sumFee += carMsg[i].price;
      }
       
    
      that.setData({
        carMsg: carMsg,
        car_num: car_num,
        sumFee: sumFee,
        loadingHidden: false,
      })
    }) 
    }else{

      wx.getStorage({
        key: "addCar",
        success(res) {

          that.setData({
            arr: res.data.arr,
            carMsg: res.data.carMsg,
          })

          for (var i = 0; i < res.data.carMsg.length; i++) {
            car_num += parseInt(res.data.carMsg[i].carNum);
            sumFee += res.data.carMsg[i].price;
          }

          that.setData({
            car_num: car_num,
            sumFee: sumFee.toFixed(2),
            loadingHidden: false,
          })

        }
      });
    }


  },



  /**
   * 点击修改
   */
  bindcarList:function(e){
  var index=e.currentTarget.dataset.index;
  var name = e.currentTarget.dataset.name;
  var carMsg = this.data.carMsg;
    
    var carMsg = JSON.stringify(this.data.carMsg);
    var arr = JSON.stringify(this.data.arr);
    wx.navigateTo({
      url: "/pages/index/change-car/change-car?index=" + index + "&arr=" + arr+ "&carMsg=" + carMsg ,
    })
  },



  
  /**
   * 添加车辆
   */
  addCar:function(e){
    var name = e.currentTarget.dataset.name;
    var carMsg = JSON.stringify(this.data.carMsg);
    var arr= JSON.stringify(this.data.arr);
    wx.navigateTo({
      url: "/pages/index/add-car/add-car?carMsg=" + carMsg + "&arr=" + arr,
    })
  },




  /**
   * 客服协商
   */
bindInquiry:function(e){
  var userId=app.globalData.userId;
  var arr=this.data.arr;
  var carMsg = this.data.carMsg;
    
  if (carMsg==""){
    wx.showModal({
      content: '您的车辆信息不能为空',
      showCancel: false,
      confirmColor: "#a744a7",
    });
    return;
  }
  
  for(var i=0;i<carMsg.length;i++){
    carMsg[i].modelId= carMsg[i].modelType+1;
    carMsg[i].plan = carMsg[i].valuation;
  }

    var params={
      routeId: arr.routeId,
      serviceType: arr.serviceType+1,
      carInfo:carMsg,
      inquiryName: "",
      startCity: arr.startCity,
      endCity: arr.endCity,
      startId: arr.startId,
      endId: arr.endId,
      distance: arr.distance,
    }
    reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId +"/inquiry",params,(err,res)=>{
      wx.redirectTo({
        url: '/pages/index/submit/submit',
      })

      wx.setStorage({
        key: "addCar",
        data: "",
      });

    })
},


  /**
      * 联系客服
      */
  bindCustomer: function () {
    var userId = app.globalData.userId;
    app.bindCustomer(userId);
  },

  /**
   * 继续询价
   */
  Inquiry:function(){
   var order_arr=[this.data.arr];
    wx.setStorage({
      key: 'arr',
      data: order_arr,
    })
    wx.navigateTo({
      url: "/pages/order/create-order/create-order",
    })
  },


  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  
  }




})