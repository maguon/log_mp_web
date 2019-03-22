const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
const app = getApp()


Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderlist: [],
    inquiryId: '',

    array: ["上门服务", "当地自提"],
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],

    price: '',
    num: '',
    valuation: '',
    modelType: 0,
    sumPrice: '',
    serviceType: '',
    inquiryCarId: '',
    distance: '',

    checked: 0,
    insurance: 1,
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    this.setData({
      index: e.index,
      inquiryId: e.inquiryId,
    })
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiry?inquiryId=" + e.inquiryId, (err, res) => {
        this.setData({
          orderlist: res.data.result[0],
          serviceType: res.data.result[0].service_type,
          distance: res.data.result[0].distance,
        })
      })

      //读取数据
      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiryCar?inquiryId=" + e.inquiryId, (err, res) => {
        var index=this.data.index;

        //获取数据
        var sumPrice = (res.data.result[e.index].trans_price + res.data.result[e.index].insure_price).toFixed(2);
        var price = (sumPrice / res.data.result[e.index].car_num).toFixed(2);
        //同步页面
        this.setData({
          inquiryCarId: res.data.result[index].id,
          price: price,
          num: res.data.result[index].car_num,
          valuation: res.data.result[index].plan,
          modelType: res.data.result[index].model_id - 1,
          checked: res.data.result[index].old_car,
          sumPrice: sumPrice,
          insurance: res.data.result[index].safe_status,
        })
      })
    
  },








  /**
 * 车辆估值
 */
  bindValuation: function (e) {

    this.setData({
      valuation: e.detail.value,
    })
    this.cost();
  },
  /**
   * 选择车型
   */
  bindModels: function (e) {

    this.setData({
      modelType: e.detail.value,
    })
    this.cost();
  },
  /**
   * 选择新车
   */
  checkboxChange: function () {
    if (this.data.checked == 1) {
      this.setData({
        checked: 0,
      })
      this.cost();
    } else {
      this.setData({
        checked: 1,
      })
      this.cost();
    }

  },
  insuranceChange: function () {
    if (this.data.insurance == 1) {
      this.setData({
        insurance: 0,
      })
      this.cost();
    } else {
      this.setData({
        insurance: 1,
      })
      this.cost();
    }

  },




  /**
   *  点击减号 
   */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    var price = (num * this.data.price).toFixed(2);
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      sumPrice: price,
      minusStatus: minusStatus
    });
  },




  /**
  *点击加号
   */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    var price = (num * this.data.price).toFixed(2);
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      sumPrice: price,
      minusStatus: minusStatus
    });
  },




  /**
  *输入框事件
   */
  bindManual: function (e) {
    var num = e.detail.value;
    //添加提示
    var price = (num * this.data.price).toFixed(2);
    // 将数值与状态写回  
    this.setData({
      num: num,
      sumPrice: price,
    });
  },



  /**
   * 费用计算
   */
  cost: function () {
    var params = {
      distance: this.data.distance,
      modelType: parseInt(this.data.modelType) + 1,
      oldCar: this.data.checked,
      serviceType: parseInt(this.data.serviceType) ,
      valuation: this.data.valuation,
      safeStatus: this.data.insurance,
    }


    reqUtil.httpPost(config.host.apiHost + "/api/transAndInsurePrice", params, (err, res) => {

      //计算价格
      var price = parseFloat(res.data.result.trans) + parseFloat(res.data.result.insure);
      var sumPrice = (price * this.data.num).toFixed(2);

      this.setData({
        price: price.toFixed(2),
        sumPrice: sumPrice,
      })
    })
  },



  /**
   * 点击确定
   */
  bindtap: function () {
    var userId = app.globalData.userId;
    var inquiryCarId = this.data.inquiryCarId;
    var index = this.data.index;

      var params = {
        modelId: parseInt(this.data.modelType) + 1,
        oldCar: this.data.checked,
        plan: this.data.valuation,
        carNum: this.data.num,
        safeStatus: this.data.insurance,
      }
      //发送服务器
      reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/inquiryCar/" + inquiryCarId + "/inquiryCarInfo", params, (err, res) => {

        wx.navigateBack({
          
        })
      })
    
  },



  //删除
  bindDelete: function () {
    var userId = app.globalData.userId;
    var inquiryCarId = this.data.inquiryCarId;
    var index = this.data.index;

      reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/inquiryCar/" + inquiryCarId + "/status", "", (err, res) => {
        wx.navigateBack({   
        })
      })
    
  },



  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {


  },


  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})