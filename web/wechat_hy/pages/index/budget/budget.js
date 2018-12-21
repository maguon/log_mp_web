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
    var inquiryId= e.inquiryId;
    var userId = app.globalData.userId;
     //获取数据
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/queryInquiry?inquiryId=" + inquiryId,(err,res)=>{
      console.log(res)
      this.setData({
        beginCity: res.data.result[0].start_city,
        endCity: res.data.result[0].end_city,
        index: res.data.result[0].service_type,
        inquiryId: inquiryId,
      })
    })

    //获取数据
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiryCar?inquiryId=" + inquiryId, (err, res) => {
      console.log(res.data.result)
      var carList=[];
      var sum=0;
      for (var i = 0; i < res.data.result.length;i++){
        if (res.data.result[i].status==1){
          sum += res.data.result[i].fee;
        }
       
      }
      this.setData({
        carList: res.data.result,
        sumFee: sum.toFixed(2),
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
  
  },
  /**
   * 点击修改
   */
  bindcarList:function(e){
  console.log(e)
  var id=e.currentTarget.dataset.id;
  var name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: "/pages/index/change-car/change-car?id=" + id + "&inquiryId=" + this.data.inquiryId+"&name="+name,
    })
  },

  
  /**
   * 添加车辆
   */
  addCar:function(e){
    var name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: "/pages/index/add-car/add-car?inquiryId=" + this.data.inquiryId + "&name=" + name,
    })
  },
  /**
   * 客服协商
   */
  bindInquiry:function(){
   
    wx.navigateTo({
      url: '/pages/index/submit/submit',
    })
  },
  /**
   * 继续询价
   */
  Inquiry:function(){
  wx.reLaunch({
    url: '/pages/index/index',
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
    wx.switchTab({
      url: '/pages/index/index',
    })

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