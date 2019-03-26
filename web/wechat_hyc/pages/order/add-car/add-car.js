const config = require('../../../host_config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[],
    inquiryId: '',
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
    var userId = app.globalData.userId;
    this.setData({
      inquiryId: e.inquiryId,
    })

      reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiry?inquiryId=" + e.inquiryId, (err, res) => {
        this.setData({
          orderlist: res.data.result[0],
          serviceType: res.data.result[0].service_type,
          distance: res.data.result[0].distance,
        })

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
      serviceType: parseInt(this.data.serviceType),
      valuation: parseInt(this.data.valuation),
      safeStatus: this.data.insurance,
    }
    //计算费用
    reqUtil.httpPost(config.host.apiHost + "/api/transAndInsurePrice", params, (err, res) => {
      //计算价格
      var price = parseFloat(res.data.result.trans) + parseFloat(res.data.result.insure);
      var sumPrice =(price * this.data.num).toFixed(2);

      this.setData({
        price: price.toFixed(2),
        sumPrice: sumPrice,
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
  checkboxChange: function () {
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
  bindAdd: function () {
    var userId = app.globalData.userId;

    if (this.data.valuation == '') {
      wx.showModal({
        content: '请输入车辆估值',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    }

      //设置参数
      var params = {
        modelId: parseInt(this.data.modelType) + 1,
        oldCar: this.data.checked,
        plan: this.data.valuation,
        carNum: this.data.num,
        safeStatus: this.data.insurance,
        serviceType: this.data.serviceType,
      }
      //发送服务器
      reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/inquiry/" + this.data.inquiryId + "/inquiryCar", params, (err, res) => {

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