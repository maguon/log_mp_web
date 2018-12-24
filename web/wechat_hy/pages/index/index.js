//index.js
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

     //系数相关
    array:["上门服务","当地自提"],
    carList: ["标准轿车", "标准SUV", "大型SUV", "标准商务车","大型商务车"],
    unitPrice: 1.2,
    valuationRate: 0.05,
    ratio: [0.9,1.0,1.1,1.0,1.1],
    new_old: [0.8,1.0],
    fee:[500,0],
    checked: 0,
    insurance:1,
    index:'',
    car_index:'',
    valuation:'',
    distance:0,

    //显示控制
    loadingHidden: false,
  },
  /**
   * 加载页面执行
   */
  onLoad: function () {
    console.log(app.globalData.userId)
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
        if (res.data.result[0].phone != '' && res.data.result[0].phone != null){
          //获取路线
          var route = that.data.beginCityId.toString() + that.data.endCityId.toString();
          console.log(route)
          //获得公里数
          reqUtil.httpGet(config.host.apiHost + "/api/route?routeStartId=" + that.data.beginCityId + "&routeEndId=" + that.data.endCityId, (err, res) => {
            if (res.data.result != '' && route != '') {
              that.setData({
                distance: res.data.result[0].distance,
              })
              //计算运输费用
              // 暂定公式：里程 * 里程单价 * 车型系数 * 是否新车系数 + 估值*估值比率  + 服务方式费用
              var feeNumber = Number((that.data.distance * that.data.unitPrice * that.data.ratio[that.data.car_index] * that.data.new_old[that.data.checked]) + (that.data.valuation * that.data.valuationRate) + that.data.fee[that.data.index]);
              //保存2位小数
              var fee = feeNumber.toFixed(2);
              console.log(fee)

              console.log(this.data.distance)
              console.log(this.data.ratio[this.data.car_index])
              console.log(this.data.new_old[this.data.checked])
              console.log(this.data.valuationRate)
              console.log(this.data.fee[this.data.index])

              var params = {
                routeId: res.data.result[0].route_id,
                serviceType: parseInt(that.data.index) + 1,
                modelId: parseInt(that.data.car_index) + 1,
                oldCar: that.data.checked,
                carNum: 1,
                inquiryName: "",
                plan: that.data.valuation,
                fee: fee,
                startCity: that.data.beginCity,
                endCity:that.data.endCity,
                safeStatus:that.data.insurance,
                safePrice: that.data.valuation*that.data.valuationRate,
              }
              //发送服务器
              reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "//inquiry", params, (err, res) => {
                wx.redirectTo({
                  url: '/pages/index/budget/budget?inquiryId=' + res.data.result[0].inquiryId,
                })
              })
            } else {
              wx.showModal({
                content: '该城市路线暂未开通，请联系客服安排合理路线',
                showCancel: false,
                confirmColor: "#a744a7",
                success(res) {
                  if (res.confirm) {
                    this.bindCustomer();
                  }
                }
              });
              return;
            }
          })
        }else{
          wx.showModal({
            content: '绑定手机后才能进行相关操作',
            showCancel: false,
            confirmColor: "#a744a7",
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url:"pages/user/bind/bind",
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
})
