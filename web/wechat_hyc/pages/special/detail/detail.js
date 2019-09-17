const app = getApp()
const config = require('../../../host_config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
var htmlToWxml = require('../../../utils/htmlToWxml.js');

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  data: {
    content: "",
    url: config.host.imageHost,
    image:"",
    imgList:[],
    autoplay: false,
    indicatordots: false,
    duration: 500,

    tabs: ["车辆信息", "车辆图片"],
    activeIndex: 0,
    sliderLeft: 0,
    sliderOffset: 0,
    detail: '',
    id: 0,
    loadingHidden: true,
    hidden: false
  },

  onLoad: function(e) {
    var that = this;
    that.setData({
      id: e.id
    })
  
    var userId = app.globalData.userId;
    var url=that.data.url;
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/commodity?commodityId=" +e.id, (err, res) => {
      var res = res.data.result[0];
      var imglist=[];
      var info = htmlToWxml.html2json(res.info);
      if (res.pord_images != null && res.pord_images != "") {
        res.pord_images = res.pord_images.split(",")
      }
      for (var i = 0; i < res.pord_images.length;i++){
        imglist.push( url+res.pord_images[i])
      }
      var image =url + res.image;

      that.setData({
        detail: res,
        image: image,
        imgList: imglist,
        content: info,
        loadingHidden: false
      })
    })

    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 5,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  onSlideChange: function(event) {
    var postId = event.detail.current;
    console.log(postId);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    

  },



  previewImg: function(e) {
    var index = e.currentTarget.dataset.index;
    // var url=this.data.url;
    // var imgArr = this.data.detail.pord_images;
    var imgList = this.data.imgList;
    var image = imgList[index];
    // for (var i = 0; i < imgArr.length; i++) {
    //   imgList.push(url + imgArr[i]);
    // }

    console.log(imgList)
    console.log(image)

    wx.previewImage({
      current: image, //当前图片地址
      urls: imgList, //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 支付
   */

  pay: function() {
    var that = this;
    var price = 0;
    var detail = that.data.detail;
    var type = that.data.detail.type;
    var id = that.data.detail.id;
    var userId = app.globalData.userId;

    if (detail.type == 1) {
      price = that.data.detail.actual_price;
    } else if (detail.type == 2) {
      price = that.data.detail.earnest_money;
    } else {
      price = 0;
    }

    reqUtil.httpGet(config.host.apiHost + "/api/user?userId=" + userId, (err, res) => {
      if (res.data.result[0].phone != '' && res.data.result[0].phone != null) {
        wx.navigateTo({
          url: '/pages/special/pay/pay?price=' + price + "&id=" + id + "&type=" + type,
        })
      } else {
        wx.showModal({
          content: '绑定手机后才能进行相关操作',
          showCancel: false,
          confirmColor: "#a744a7",
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: "/pages/user/user",
              })
            }
          }
        });
        return;
      }
    })

  },

  remind: function() {
    var that = this;
    var userId = app.globalData.userId;
    var commodityId = that.data.detail.id;
    var params = ""

    reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/commodity/" + commodityId + "/reminders", params, (err, res) => {
      if (res.data.success) {
        wx.showModal({
          content: '当前车辆已被预定，如果当前买家取消订单，客服会在24小时之内联系您',
          showCancel: false,
          confirmColor: "#a744a7",
          success(res) {
            if (res.confirm) {

            }
          }
        })
      } else {
        wx.showModal({
          content: '已设置提醒，请耐心等待',
          showCancel: false,
          confirmColor: "#a744a7",
        })
      }
    })


  },
  /**
   *分享
   */
  bindShare: function() {
    return app.onShareApp();
  },
  /**
   * 联系客服
   */
  bindCustomer: function() {
    var userId = app.globalData.userId;
    app.bindCustomer(userId);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return app.onShareApp();
  }
})