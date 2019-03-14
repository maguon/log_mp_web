const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
const app = getApp()


Page({
  /**
   * 页面的初始数据
   */
  data: {
    carMsg:[],
    arr:[],

    array: ["上门服务", "当地自提"],
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],
    price: '',
    num: '',
    valuation: '',
    modelType: 0,
    sumPrice: '',
    serviceType: '',
    distance: '',

    checked: 0,
    insurance: 1,
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    var arr = JSON.parse(e.arr);
    var carMsg = JSON.parse(e.carMsg);
    console.log(carMsg)

    this.setData({
      carMsg: carMsg,
      arr:arr,
      index: e.index,
    })
    //询价
  
    var index=this.data.index;
    this.setData({
      distance: this.data.carMsg[index].distance,
      num: this.data.carMsg[index].carNum,
      valuation: this.data.carMsg[index].valuation,
      modelType: this.data.carMsg[index].modelType,
      checked: this.data.carMsg[index].oldCar,
      price: (this.data.carMsg[index].price / this.data.carMsg[index].carNum).toFixed(2),
      sumPrice: this.data.carMsg[index].price,
      insurance: this.data.carMsg[index].safeStatus,
      serviceType: this.data.carMsg[index].serviceType,
    })
    //待协商
    
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
      serviceType: parseInt(this.data.serviceType) + 1,
      valuation: this.data.valuation,
      safeStatus: this.data.insurance,
    }

    reqUtil.httpPost(config.host.apiHost + "/api/transAndInsurePrice", params, (err, res) => {

      //计算价格
      var price = parseFloat(res.data.result.trans) + parseFloat(res.data.result.insure);
      var sumPrice = (price * this.data.num).toFixed(2);
      console.log(res)
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
    var carMsg = this.data.carMsg;
    var index = this.data.index;
  

      carMsg[index].modelType=parseInt(this.data.modelType);
      carMsg[index].oldCar=this.data.checked;
      carMsg[index].valuation=parseInt(this.data.valuation);
      carMsg[index].carNum= parseInt(this.data.num);
      carMsg[index].safeStatus=this.data.insurance;
      carMsg[index].serviceType=parseInt(this.data.serviceType);
      carMsg[index].price = this.data.sumPrice;
      carMsg[index].sumPrice=parseFloat(this.data.sumPrice);

    app.globalData.name = "addCar";

    wx.setStorage({
      key: "addCar",
      data: {
        carMsg: carMsg,
        arr: this.data.arr,
      }
    });
    wx.navigateBack({

    })
      // var carMsgList = JSON.stringify(carMsg)
      // var arr = JSON.stringify(this.data.arr);
      // wx.redirectTo({
      //   url: '/pages/index/budget/budget?carMsg=' + carMsgList+"&arr="+arr,
      // })
    
  },



  //删除
  bindDelete:function(){
    var carMsg = this.data.carMsg;
    var index = this.data.index;
    carMsg.splice(index, 1);

    app.globalData.name = "addCar";

    wx.setStorage({
      key: "addCar",
      data: {
        carMsg:carMsg,
        arr: this.data.arr,
      }
    });
    wx.navigateBack({

    })
    // var carMsgList = JSON.stringify(carMsg)
    //   var arr = JSON.stringify(this.data.arr);
    // wx.redirectTo({
    //   url: '/pages/index/budget/budget?carMsg=' + carMsgList + "&arr=" + arr,
    // })
    
  },



  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

    // var carMsg = JSON.stringify(this.data.carMsg);
    // var arr = JSON.stringify(this.data.arr);
    // wx.redirectTo({
    //   url: '/pages/index/budget/budget?carMsg=' + carMsg + "&arr=" + arr,
    // })
  },


  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})