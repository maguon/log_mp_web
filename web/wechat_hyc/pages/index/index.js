
//获取应用实例
const app = getApp()
const config = require('../../config.js');
const reqUtil = require('../../utils/ReqUtil.js')

Page({
  data: {
    //选择城市
    beginCity:'',
    endCity:'', 
    beginCityId: '', 
    endCityId: '',
    nullHouse: true,
    cusList:[],
    
    img:[
      "../../images/swiper.jpg",
      "../../images/swiper01.jpg",
    ],
     //系数相关
    array:["上门服务","当地自提"],
    carList: ["标准轿车", "标准SUV", "大型SUV", "标准商务车","大型商务车"],
    checked: 1,
    insurance:1,
    index:'',
    car_index:'',
    valuation:'',
    distance:0,
    scene:0,

    //显示控制
    loadingHidden: false,
    carMsg:[],
  },


  /**
   * 加载页面执行
   */
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },



/**
 * 页面执行
 */
  onShow:function(){
    var that=this;
    var userId=app.globalData.userId;

     //始发城市设置
    if (app.globalData.trainBeginCity!='' ){
      that.setData({
        loadingHidden: true
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/city?cityId=" + app.globalData.trainBeginCity,(err,res)=>{
      //始发城市 城市ID
            that.setData({ 
              beginCity:res.data.result[0].city_name, 
              beginCityId: res.data.result[0].id,
              beginCity_hidden: true,
              loadingHidden:false
              })
          })
    }
    //目的城市设置
    if (app.globalData.trainEndCity!=''){
      that.setData({
        loadingHidden: true
      })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/city?cityId=" + app.globalData.trainEndCity, (err, res) => {
        //目的城市 城市ID
            that.setData({
              endCity: res.data.result[0].city_name,
              endCityId: res.data.result[0].id,
              endCity_hidden: true,
              loadingHidden: false
            })
      })
    }
  },




    /**
   * 选择开始城市
   */
  bindBeginCity:function(e){
    wx.navigateTo({
      url: '/pages/index/citys/citys?cityType=begin',
    })
  },




  /**
   * 选择结束城市
   */
  bindEndCity:function(e){
    wx.navigateTo({
      url: '/pages/index/citys/citys?cityType=end',
    })
  },



  /**
   * 服务方式
   */
  bindService:function(e){
      this.setData({
       index:e.detail.value,
       service_hidden:true,
    })
  },




  /**
   * 车型
   */
  bindModels:function(e){
    this.setData({
      car_index: e.detail.value,
      models_hidden:true,
    })
  },




  /**
   * 车辆估值
   */
  bindValuation:function(e){
    this.setData({
      valuation: e.detail.value,
    })
  },




  /**
   * 选择新车
   */
  checkboxChange:function(){
    if(this.data.checked==0){
      this.setData({
        checked:1,
      })
    }else{
      this.setData({
        checked: 0,
      })
    }
  },




   insuranceChange: function () {
    if (this.data.insurance == 1) {
      this.setData({
        insurance: 0,
        valuationRate:0,
      })
    } else {
      this.setData({
        insurance: 1,
        valuationRate:0.05,
      })
    }
  },
 



  /**
   * 询价
   */
  bindInquiry:function(){
    var that=this;
    var userId=app.globalData.userId;
    

    //判断用户输入
    if (app.globalData.trainBeginCity == ''){
      wx.showModal({
        content: '请选择始发城市',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    } if(app.globalData.trainEndCity == ''){
      wx.showModal({
        content: '请选择目的城市',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    } if (that.data.index == '' ){
      wx.showModal({
        content: '请选择服务方式',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    } if (that.data.car_index == ''){
      wx.showModal({
        content: '请选择车辆类型',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    } if (that.data.valuation == '') {
      wx.showModal({
        content: '请输入车辆估值',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    } if (app.globalData.trainBeginCity ==app.globalData.trainEndCity) {
      wx.showModal({
        content: '不支持同城运输',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    }else{
     
      reqUtil.httpGet(config.host.apiHost + "/api/user?userId=" + userId, (err, res) => {
        if (res.data.result[0].phone != '' && res.data.result[0].phone != null ){
          //获取路线
          var route = that.data.beginCityId.toString() + that.data.endCityId.toString();
          //获得公里数
          reqUtil.httpGet(config.host.apiHost + "/api/route?routeStartId=" + that.data.beginCityId + "&routeEndId=" + that.data.endCityId, (err, res) => {
            if (res.data.result != '' && route != '') {
              that.setData({
                distance: res.data.result[0].distance,
              })

              var arr= [{
                routeId: res.data.result[0].route_id,
                serviceType: parseInt(that.data.index),
                startCity: that.data.beginCity,
                endCity: that.data.endCity,
                distance: that.data.distance,
                startId: that.data.beginCityId,
                endId: that.data.endCityId,
              }];
              var newArray=[{
              routeId:res.data.result[0].route_id,
              serviceType: parseInt(that.data.index),
              modelType:parseInt(that.data.car_index),
              oldCar: that.data.checked,
              carNum:1,
                valuation: parseInt(that.data.valuation),             
              startCity:that.data.beginCity,
              endCity:that.data.endCity,
              safeStatus:that.data.insurance,
              distance: that.data.distance,
              }];

              
              app.globalData.name="index";
              var carMsg=JSON.stringify(newArray);
              var arr = JSON.stringify(arr[0]);
              wx.navigateTo({
                url: '/pages/index/budget/budget?carMsg=' + carMsg +"&arr="+arr,
                  })
            } else {

              //设置参数
              var params = {
                routeId: parseInt(app.globalData.trainBeginCity) + parseInt(app.globalData.trainEndCity),
                startCity: that.data.beginCity,
                endCity: that.data.endCity,
                startId: app.globalData.trainBeginCity,
                endId: app.globalData.trainEndCity,
                serviceType: parseInt(that.data.index) + 1,
                oldCarFlag: that.data.checked,
                carNum: 1,
                valuation: that.data.valuation,
                carModelType: parseInt(that.data.car_index) + 1,
                carInsureFlag: that.data.insurance,
              }
              //发送服务器
              reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/noRouteInquiryInfo", params, (err, res) => {
                wx.showModal({
                  content: '该城市路线暂未开通，请联系客服安排合理路线',
                  showCancel: false,
                  confirmColor: "#a744a7",
                });
                return;
             
              })
            }
          })
        }else{
          wx.showModal({
            content: '绑定手机后才能进行相关操作',
            showCancel: false,
            confirmColor: "#a744a7",
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: "/pages/user/user",
                })
              }
            }
          });
          return;
        }
      })
    
     }
  },


  /**
    * 联系客服
    */
  bindCustomer:function() {
    var userId = app.globalData.userId;
    app.bindCustomer(userId);
  },

  /**
    * 跳转服务优势
    */
  service:function(){
    wx.navigateTo({
      url: '/pages/about/service/service',
    })
  },
  // /**
  //  * 联系客服
  //  */
  // bindCustomer: function () {
  //   var userId=app.globalData.userId;
  //   var that = this;
  //   that.setData({
  //     nullHouse: false, //弹窗显示
  //   })
  //   reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/customerPhone", (err, res) => {
  //     that.setData({
  //       cusList:res.data.result,
  //     })
  //   })
   
  // },

  // /**
  //  *拨打电话 
  //  */
  // customer:function(e){
  //   var index=e.currentTarget.dataset.index;
  //   var cusList=this.data.cusList;
  //   var phone = cusList[index].phone;

  //   wx.makePhoneCall({
  //     phoneNumber: phone, //此号码并非真实电话号码，仅用于测试
  //   success: function () {
  //     console.log("拨打电话成功！")
  //   },
  //   fail: function () {
  //     console.log("拨打电话失败！")
  //   }
  // })
  // },
  // /**
  //  * 返回
  //  */
  // back:function(){
  //   this.setData({
  //     nullHouse: true, //弹窗显示
  //   })
  // },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
   return app.onShareApp();
  },

})


