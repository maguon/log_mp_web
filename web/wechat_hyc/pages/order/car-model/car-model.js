const app = getApp()
const config = require('../../../host_config.js');
const reqUtil = require('../../../utils/ReqUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    route_start:"",
    route_end:"",
    orderItemArray:[],
    hidden: false,
    checked: 1,
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],
    index: 0,
    car_index: 0,
    orderId: '',
    orderindex: '',
    chooseMsg:'',
    orderItemId:"",

    valuation: '',
    vin: '',
    model:"",
    brand:"",
    insurance: 1,
    distance: '',
    serviceType:0,
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that=this;
    var userId = app.globalData.userId;
    var chooseMsg=e.index;
    var orderId=e.orderId;

    that.setData({
      chooseMsg: chooseMsg,
    })

    wx.getStorage({
    key: 'orderItemArray',
     success: function(res) {
       that.setData({
         orderItemArray: res.data,
       })
     },
    })


    if(orderId!=""){
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/order?orderId=" + orderId, (err, res) => {

      that.setData({
        route_start: res.data.result[0].route_start,
        route_end: res.data.result[0].route_end,
        orderId: orderId,
        distance: res.data.result[0].distance,
      })
    })
    }else{
      wx.getStorage({
        key: 'arr',
        success: function (res) {
          console.log(res)
          that.setData({
            route_start: res.data[0].startCity,
            route_end: res.data[0].endCity,
            distance: res.data[0].distance,
            serviceType: res.data[0].serviceType,
          })
        },
      })

    }

    if (chooseMsg !=""){
      wx.setNavigationBarTitle({
        title: '修改车型'
      })
      if (orderId != "") {
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/orderItem?orderId=" + orderId, (err, res) => {

        var orderItem = res.data.result[chooseMsg];
        that.setData({
          orderItemId: orderItem.id,
          valuation: orderItem.valuation,
          vin: orderItem.vin,
          car_index: orderItem.model_type-1,
          model: orderItem.brand_type,
          brand:orderItem.brand,
          insurance: orderItem.safe_status,
          checked:orderItem.old_car,
          hidden: false,
        })
      })
      }else{
        wx.getStorage({
          key: 'orderItemArray',
          success: function (res) {
            var orderItem = res.data[chooseMsg];
            that.setData({
              valuation: orderItem.valuation,
              vin: orderItem.vin,
              car_index: orderItem.model_type - 1,
              model: orderItem.brand_type,
              brand: orderItem.brand,
              insurance: orderItem.safe_status,
              checked: orderItem.old_car,
              hidden: false,
            })
          },
        })

      }
    }else{
      that.setData({
        hidden: true,
      })
    }
  },





  /**
   * 车型
   */
  bindModels: function (e) {
    this.setData({
      car_index: e.detail.value,
    })
  },




  /**
     * VIN
     */
  noteInput: function (e) {

    this.setData({
      vin: e.detail.value,
    })
    
  },


  brandInput:function(e){
    this.setData({
      brand: e.detail.value,
    })
  },


  modelInput:function(e){
    this.setData({
      model: e.detail.value,
    })
},
  /**
   * 估值
   */
  bindValuation: function (e) {
    this.setData({
      valuation: e.detail.value,
    })
  },




  /**
   * 选择新车
   */
  checkboxChange: function () {
    if (this.data.checked == 0) {
      this.setData({
        checked: 1,
      })
    } else {
      this.setData({
        checked: 0,
      })
    }
  },





  bindtap: function () {
    var userId = app.globalData.userId;
    var regNum = new RegExp('[0-9]');
    var chooseMsg = this.data.chooseMsg;
    var orderItemId = this.data.orderItemId;
    var orderId=this.data.orderId;
    var orderItemArray = this.data.orderItemArray;

    if (this.data.valuation == '') {
      wx.showModal({
        content: '估值不能为空',
        showCancel: false,
      })
      return;
    } else if (this.data.vin == '') {
      wx.showModal({
        content: '车辆识别码不能为空',
        showCancel: false,
      })
      return;
    } else if (this.data.vin.length != 17) {
      wx.showModal({
        content: '请填写17位的车辆识别码',
        showCancel: false,
      })
      return;
    } else if (this.data.brand== "") {
      wx.showModal({
        content: '请填写车辆品牌',
        showCancel: false,
      })
      return;
    } else if (this.data.model== "") {
      wx.showModal({
        content: '请填写车辆型号',
        showCancel: false,
      })
      return;
    } else if (this.data.valuation != parseInt(this.data.valuation)) {
      wx.showModal({
        content: '估值格式填写不正确',
        showCancel: false,

      })
      return;
    } else {
      if (chooseMsg !=""){
       
     if(orderId!=""){
       var params = {
         brand: this.data.brand,
         brandType: this.data.model,
         modelType: parseInt(this.data.car_index) + 1,
         vin: this.data.vin,
         oldCar: this.data.checked,
         valuation: this.data.valuation,
         // distance: this.data.distance,
         safeStatus: this.data.insurance,
       }
        //发送服务器
        reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/orderItem/" + orderItemId + "/updateCarType?orderId=" + orderId, params, (err, res) => {
          wx.navigateBack({})
        })
      }else{

       //传递参数
       var params = {
         distance: this.data.distance,
         modelType: parseInt(this.data.car_index) + 1,
         oldCar: this.data.checked,
         serviceType: parseInt(this.data.serviceType) + 1,
         valuation: parseInt(this.data.valuation),
         safeStatus: this.data.insurance,
       }
       //计算费用
       reqUtil.httpPost(config.host.apiHost + "/api/transAndInsurePrice", params, (err, res) => {
         //计算价格
         var price = parseFloat(res.data.result.trans) + parseFloat(res.data.result.insure);    
         var param = {
           brand: this.data.brand,
           brand_type: this.data.model,
           model_type: parseInt(this.data.car_index) + 1,
           vin: this.data.vin,
           old_car: this.data.checked,
           valuation: this.data.valuation,
           price: price,
           safe_status: this.data.insurance,
         }

         //修改
         orderItemArray.splice(chooseMsg, 1, param);
         wx.setStorage({
           key: 'orderItemArray',
           data: orderItemArray,
         })
         wx.navigateBack({})
       })
       }
      
      }else{
     
    if (orderId != "") {
      var params = {
        brand: this.data.brand,
        brandType: this.data.model,
        vin: this.data.vin,
        modelType: parseInt(this.data.car_index) + 1,
        oldCar: this.data.checked,
        valuation: this.data.valuation,
        distance: this.data.distance,
        safeStatus: this.data.insurance,
      }
      //发送服务器
      reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/order/" + this.data.orderId + "/car", params, (err, res) => {
        wx.navigateBack({})
      })
      }else{


      //传递参数
      var params = {
        distance: this.data.distance,
        modelType: parseInt(this.data.car_index) + 1,
        oldCar: this.data.checked,
        serviceType: parseInt(this.data.serviceType) + 1,
        valuation: parseInt(this.data.valuation),
        safeStatus: this.data.insurance,
      }
        
        //计算费用
        reqUtil.httpPost(config.host.apiHost + "/api/transAndInsurePrice", params, (err, res) => {
          //计算价格
         var price = parseFloat(res.data.result.trans) + parseFloat(res.data.result.insure);    
         var param = {
          brand: this.data.brand,
          brand_type: this.data.model,
          vin: this.data.vin,
          model_type: parseInt(this.data.car_index) + 1,
          old_car: this.data.checked,
          valuation: this.data.valuation,
          price: price,
          safe_status: this.data.insurance,
        }
        //添加
          orderItemArray.push(param);
          wx.setStorage({
            key: 'orderItemArray',
            data: orderItemArray,
          })
          wx.navigateBack({})
        })
      }
      }
    }
  },


  //保险
  insuranceChange: function () {
    if (this.data.insurance == 1) {
      this.setData({
        insurance: 0,
      })
    } else {
      this.setData({
        insurance: 1,
      })
    }
    this.onShow();
  },


/**
 * 删除
 */
  bindDelete:function(){
    var userId = app.globalData.userId;
    var orderId=this.data.orderId;
    var orderItemId = this.data.orderItemId;
    var chooseMsg = this.data.chooseMsg;

    var orderItemArray = this.data.orderItemArray;
    if (orderId!=""){
    reqUtil.httpDel(config.host.apiHost + "/api/user/" + userId + "/orderItem/" + orderItemId);
    wx.navigateBack({})
    }else{
      orderItemArray.splice(chooseMsg, 1);
      wx.setStorage({
        key: 'orderItemArray',
        data: orderItemArray,
      })
      wx.navigateBack({})
    }
  },


  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})