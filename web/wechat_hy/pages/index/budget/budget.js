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
    index: '',

    carList:[],
    sumFee: 0,
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;

    console.log(e.inquiryId)
    console.log(userId)

     //获取数据
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiry?inquiryId=" + e.inquiryId,(err,res)=>{
      console.log(res)
      this.setData({
        beginCity: res.data.result[0].start_city,
        endCity: res.data.result[0].end_city,
        index: res.data.result[0].service_type,
        inquiryId: e.inquiryId,
      })
    })

    //获取数据
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiryCar?inquiryId=" + e.inquiryId, (err, res) => {
      console.log(res.data.result)
      var carList=[];
      var sum=0;
      for (var i = 0; i < res.data.result.length;i++){
        if (res.data.result[i].status==1){
          //设置单价
          res.data.result[i].price = ((res.data.result[i].trans_price + res.data.result[i].insure_price) * res.data.result[i].car_num).toFixed(2);
          //设置总价
          sum += (res.data.result[i].trans_price + res.data.result[i].insure_price) * res.data.result[i].car_num;
        }
       
      }
      this.setData({
        carList: res.data.result,
        sumFee: sum.toFixed(2),
      })
    })
  },



  /**
   * 点击修改
   */
  bindcarList:function(e){
  console.log(e)
  var id=e.currentTarget.dataset.id;
  var name = e.currentTarget.dataset.name;
    wx.redirectTo({
      url: "/pages/index/change-car/change-car?id=" + id + "&inquiryId=" + this.data.inquiryId+"&name="+name,
    })
  },



  
  /**
   * 添加车辆
   */
  addCar:function(e){
    var name = e.currentTarget.dataset.name;
    wx.redirectTo({
      url: "/pages/index/add-car/add-car?inquiryId=" + this.data.inquiryId + "&name=" + name,
    })
  },




  /**
   * 客服协商
   */
  bindInquiry:function(e){
    wx.redirectTo({
      url: '/pages/index/submit/submit',
    })
  },



  /**
   * 继续询价
   */
  Inquiry:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
 

})