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
    
    
    carList: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],
    car_index:0,
    service_type: '',
    valuation:'',
    distance:'',
    minusStatus: 'disabled', 

    price:0,
    sumPrice: 0, 
    num: 1,
    checked:1,
    insurance:1,
    name:'',
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var inquiryId = e.inquiryId;
    var userId = app.globalData.userId;

   //请求询价id相关数据
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId+ "/inquiry?inquiryId=" + inquiryId, (err, res) => {
      console.log(res)
      this.setData({
        beginCity: res.data.result[0].start_city,
        endCity: res.data.result[0].end_city,
        distance: res.data.result[0].distance,
        service_type: res.data.result[0].service_type-1,
        inquiryId: inquiryId,
        name: e.name,
      })
    })
  },




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //传递参数
  var params={
    distance: this.data.distance,
    modelType: parseInt(this.data.car_index)+1,
    oldCar: this.data.checked,
    serviceType: parseInt(this.data.service_type)+1,
    valuation: this.data.valuation,
    safeStatus: this.data.insurance,
    }
    //计算费用
    reqUtil.httpPost(config.host.apiHost + "/api/transAndInsurePrice", params,(err, res) => {
      //计算价格
      var price = this.money(res.data.result.trans + res.data.result.insure);
      var sumPrice = this.money(price*this.data.num);
      console.log(res)
      this.setData({
        price: price,
        sumPrice:sumPrice,
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
      car_index: e.detail.value,
    })
    this.onShow();
  },




  /**
   * 保存2位小数
   */
  money: function (e) {
    //钱数小数点后二位设定
    var total_price = Number(e);
    var money = total_price.toFixed(2);
    return money;
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
    if(this.data.car_index == ''){
      wx.showModal({
        content: '请选择车型',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    } 
    if(this.data.valuation == ''){
      wx.showModal({
        content: '请输入车辆估值',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    }
  //设置参数
    var params = {
      modelId: parseInt(this.data.car_index)+1,
      oldCar: this.data.checked,
      plan: this.data.valuation,
      carNum: this.data.num,
      safeStatus: this.data.insurance,
      serviceType: this.data.service_type,
    }
    //发送服务器
    reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/inquiry/" + this.data.inquiryId+"/inquiryCar", params, (err, res) => {
      if(this.data.name == "budget"){
      wx.redirectTo({
        url: '/pages/index/budget/budget?inquiryId=' + this.data.inquiryId,
      })
      }else{
        wx.redirectTo({
          url: '/pages/order/order-inquiry/order-inquiry?orderId=' + this.data.inquiryId,
        })
      }
    })
  },


  
})