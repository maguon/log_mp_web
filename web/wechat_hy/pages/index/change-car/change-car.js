const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beginCity: '',
    endCity: '', 
    inquiryId:'',

    array: ["送到指定地点", "送到当地自提"],
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],
    price:'',
    num:'',
    valuation:'',
    model_id:'',
    sumPrice:'',
    service_type:'',
    inquiryCarId:'',

    //系数
    unitPrice: 1.2,
    valuationRate: 0.05,
    ratio: [0.9, 1.0, 1.1, 1.0, 1.1],
    new_old: [0.8, 1.0],
    fee: [500, 0],

    checked:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    var index=e.id;
    var inquiryId=e.inquiryId;
    // var userId = 10004;
    // var index = 1;
    // var inquiryId = 55;
    this.setData({
      inquiryId: inquiryId,
    })
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/queryInquiry?inquiryId=" + inquiryId, (err, res) => {
      this.setData({
        beginCity: res.data.result[0].route_start,
        endCity: res.data.result[0].route_end,
        distance:res.data.result[0].distance,
        service_type: res.data.result[0].service_type,
      })

    })

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiryCar?inquiryId=" + inquiryId, (err, res) => {
     this.setData({
       inquiryCarId: res.data.result[index].id,
       price: res.data.result[index].fee_solo,
       num: res.data.result[index].car_num,
       valuation: res.data.result[index].plan,
       model_id: res.data.result[index].model_id-1,
       checked: res.data.result[index].old_car,
       sumPrice: res.data.result[index].fee,
     })
    })
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
    if (this.data.model_id != '' && this.data.valuation != '') {
      // 暂定公式：里程 * 里程单价 * 车型系数 * 是否新车系数 + 估值*估值比率  + 服务方式费用
      var feeNumber = Number((this.data.distance * this.data.unitPrice * this.data.ratio[this.data.model_id] * this.data.new_old[this.data.checked]) + (this.data.valuation * this.data.valuationRate) + this.data.fee[this.data.service_type]);
      //保存2位小数
      var fee = feeNumber.toFixed(2);
      var sumPrice = fee * this.data.num;
      console.log(fee)
      this.setData({
        price: fee,
        sumPrice: sumPrice.toFixed(2),
      })
    }

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
      model_id: e.detail.value,
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
    } else {
      this.setData({
        checked: 0,
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
  bindtap: function () {
    var userId = app.globalData.userId;
    var inquiryCarId = this.data.inquiryCarId;
    var params = {
      modelId: parseInt(this.data.model_id) + 1,
      oldCar: this.data.checked,
      plan: this.data.valuation,
      fee: this.data.sumPrice,
      carNum: this.data.num,
    }
    //发送服务器
    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/inquiryCar/" + inquiryCarId +"/inquiryCarInfo", params, (err, res) => {
      wx.redirectTo({
        url: '/pages/index/budget/budget?inquiryId=' + this.data.inquiryId,
      })
    })

  },
  bindDelete:function(){
    var userId = app.globalData.userId;
    var inquiryCarId=this.data.inquiryCarId;

    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/inquiryCar/" + inquiryCarId +"/status/"+0, "", (err, res) => {
      wx.redirectTo({
        url: '/pages/index/budget/budget?inquiryId=' + this.data.inquiryId,
      })
    })
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