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

    array: ["上门服务", "当地自提"],
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],
    price:'',
    num:'',
    valuation:'',
    car_index:0,
    sumPrice:'',
    service_type:'',
    inquiryCarId:'',
    distance:'',

    checked:0,
    insurance:1,
    name:'',
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    var index=e.id;
    var inquiryId=e.inquiryId;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiry?inquiryId=" + inquiryId, (err, res) => {
      this.setData({
        beginCity: res.data.result[0].start_city,
        endCity: res.data.result[0].end_city,
        distance:res.data.result[0].distance,
        service_type: res.data.result[0].service_type-1,
        inquiryId: inquiryId,
        name: e.name,
      })
    })

    //读取数据
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiryCar?inquiryId=" + inquiryId, (err, res) => {
      console.log(res)
    //获取数据
      var price=(res.data.result[index].trans_price + res.data.result[index].insure_price).toFixed(2);
      var sumPrice = (price*res.data.result[index].car_num).toFixed(2);
    //同步页面
     this.setData({
       inquiryCarId: res.data.result[index].id,
       price: price ,
       num: res.data.result[index].car_num,
       valuation: res.data.result[index].plan,
       car_index: res.data.result[index].model_id-1,
       checked: res.data.result[index].old_car,
       sumPrice:sumPrice,
       insurance: res.data.result[index].safe_status,
     })
    })
  },



  /**
   * 费用计算
   */
  cost: function () {
    var params = {
    distance: this.data.distance,
    modelType:parseInt(this.data.car_index)+1,
    oldCar: this.data.checked,
    serviceType:parseInt(this.data.service_type)+1,
    valuation: this.data.valuation,
    insuranceFlag: this.data.insurance,
    }
    console.log(this.data.distance+"dis")
    console.log(this.data.car_index+1+"car")
    console.log(this.data.checked+"old")
    console.log(this.data.service_type+"ser")
    console.log(this.data.valuation+"val")
    console.log(this.data.insurance+"ins")

    reqUtil.httpPost(config.host.apiHost + "/api/transAndInsurePrice", params, (err, res) => {

    //计算价格
    var price = (res.data.result[0].trans + res.data.result[0].insure).toFixed(2);
    var sumPrice =(price * this.data.num).toFixed(2);
    console.log(res)
    this.setData({
      price: price,
      sumPrice: sumPrice,
    })
  })
  },




  /**
 * 车辆估值
 */
  bindValuation: function (e) {
    console.log(e)
    this.setData({
      valuation: e.detail.value,
    })
    this.cost();
  },
  /**
   * 选择车型
   */
  bindModels: function (e) {
    console.log(e)
    this.setData({
      car_index: e.detail.value,
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
   * 点击确定
   */
  bindtap: function () {
    var userId = app.globalData.userId;
    var inquiryCarId = this.data.inquiryCarId;
    var params = {
      modelId: parseInt(this.data.car_index) + 1,
      oldCar: this.data.checked,
      plan: this.data.valuation,
      fee: this.data.price,
      carNum: this.data.num,
      safePrice: this.data.valuation * this.data.valuationRate,
      safeStatus: this.data.insurance,
    }
    //发送服务器
    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/inquiryCar/" + inquiryCarId +"/inquiryCarInfo", params, (err, res) => {
      if(this.data.name=="carlist"){
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



  //删除
  bindDelete:function(){
    var userId = app.globalData.userId;
    var inquiryCarId=this.data.inquiryCarId;

    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + "/inquiryCar/" + inquiryCarId +"/status/"+0, "", (err, res) => {
      if (this.data.name == "carlist") {
        wx.redirectTo({
          url: '/pages/index/budget/budget?inquiryId=' + this.data.inquiryId,
        })
      } else {
        wx.redirectTo({
          url: '/pages/order/order-inquiry/order-inquiry?orderId=' + this.data.inquiryId,
        })
      }
    })
  },

})