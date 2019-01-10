const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
const app = getApp()


Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[],
    inquiryId:'',

    array: ["上门服务", "当地自提"],
    carModel: ["标准轿车", "标准SUV", "大型SUV", "标准商务车", "大型商务车"],

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
      //编译时间
      res.data.result[0].created_on = this.getTime(res.data.result[0].created_on);
  
      this.setData({
        orderlist: res.data.result[0],
        inquiryId: e.inquiryId,
      })
    })

    //获取数据
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/inquiryCar?inquiryId=" + e.inquiryId, (err, res) => {
      console.log(res.data.result)
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


  /**
   * 继续询价
   */
  Inquiry:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },



  /**
  * 编译时间
  */
  getTime: function (e) {
    var t = new Date(e);
    var Minutes = t.getMinutes();
    var Seconds = t.getSeconds();
    if (Minutes < 10) {
      Minutes = "0" + Minutes;
    }
    if (Seconds < 10) {
      Seconds = "0" + Seconds;
    }

    var olddata = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + Minutes + ':' + Seconds;
    var time = olddata.replace(/-/g, "/");
    return time;
  },



})