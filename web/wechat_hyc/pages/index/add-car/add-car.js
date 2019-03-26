const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carMsg: [],
    arr:[],

    carList: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],
    modelType: 0,
    serviceType: '',
    valuation: '',
    distance: '',
    minusStatus: 'disabled',

    price: 0,
    sumPrice: 0,
    num: 1,
    checked: 1,
    insurance: 1,
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId=app.globalData.userId;
    var carMsg = JSON.parse(e.carMsg);
    var arr = JSON.parse(e.arr);

    this.setData({
      carMsg: carMsg,
      arr: arr,
      serviceType: arr.serviceType,
      distance: arr.distance,
    })
  },




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //传递参数
    var params = {
      distance: this.data.distance,
      modelType: parseInt(this.data.modelType) + 1,
      oldCar: this.data.checked,
      serviceType: parseInt(this.data.serviceType) + 1,
      valuation: parseInt(this.data.valuation),
      safeStatus: this.data.insurance,
    }
    //计算费用
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
   * 车辆估值
   */
  bindValuation:function(e){
    this.setData({
      valuation: e.detail.value,
    })
    this.onShow();
  },
  /**
   * 选择车型
   */
  bindModels: function (e) {
    this.setData({
      modelType: e.detail.value,
    })
    this.onShow();
  },





  /**
   * 选择新车
   */
  checkboxChange:function(){
    if (this.data.checked == 0) {
      this.setData({
        checked: 1,
      })
      this.onShow();
    } else {
      this.setData({
        checked: 0,
      })
      this.onShow();
    }
    
  },



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
   * 点击确定
   */
  bindAdd:function(){
    var userId = app.globalData.userId;
    //判断用户输入
    if (this.data.modelType == '') {
      wx.showModal({
        content: '请选择车型',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    }
    if (this.data.valuation == '') {
      wx.showModal({
        content: '请输入车辆估值',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    }

    var newArray = {
      distance: this.data.distance,
      modelType: parseInt(this.data.modelType),
      oldCar: this.data.checked,
      valuation: parseInt(this.data.valuation),
      carNum: parseInt(this.data.num),
      safeStatus: this.data.insurance,
      serviceType: parseInt(this.data.serviceType),
      price: parseFloat(this.data.sumPrice),
      sumPrice: parseFloat(this.data.sumPrice),
    };
    this.data.carMsg.push(newArray);

    app.globalData.name="addCar";

    wx.setStorage({ 
      key:"addCar",
      data: {
        carMsg: this.data.carMsg,
        arr: this.data.arr,
      }
    });
    wx.navigateBack({
      
    })
    // var carMsg = JSON.stringify(this.data.carMsg);
    // var arr = JSON.stringify(this.data.arr);
    // wx.redirectTo({
    //   url: '/pages/index/budget/budget?carMsg=' + carMsg +"&arr="+arr,
    // })
    
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