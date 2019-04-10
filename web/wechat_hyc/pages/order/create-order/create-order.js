const app = getApp()
const config = require('../../../host_config.js');
const reqUtil = require('../../../utils/ReqUtil.js')


Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderItem: [],
    orderItemArray:[],
    recvAddress:[],
    sendAddress:[],
    service: ["上门服务", "当地自提"],
    address: false,
    sumFee:0,
    note: "",

    disabled: false,
    carflag: false,
    loadingHidden: false,

    timeFlag: false,
    dateFlag: false,
    date: '',
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    
    wx.getStorage({
      key: 'arr',
      success: function(res) {
        console.log(res)
        that.setData({
          orderItem: res.data[0]
        })
      },
    })

    try {
      const value = wx.getStorageSync('sendAddress')
      if (value) {
        that.setData({
         sendAddress:value
        })
      }
    } catch (e) {
    }
    try {
      const value = wx.getStorageSync('recvAddress')
      if (value) {
        that.setData({
          recvAddress: value
        })
      }
    } catch (e) {
      // Do something when catch error
    }

    if(that.data.sendAddress!=""&&that.data.recvAddress!=""){
      that.setData({
        address:true,
      })
    }



    wx.getStorage({
      key: 'orderItemArray',
      success: function (res) {
        var sumfee=0;
        if(res.data!=""){
          for (var i = 0; i < res.data.length; i++) {
            sumfee +=res.data[i].price;
          }

          that.setData({
            sumFee: sumfee.toFixed(2),
            orderItemArray:res.data,
            carflag: true,
          })
        }
      }
    })
  },




  /**
   * 发车时间
   */
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      timeFlag: true
    })
  },

  //留言
  noteInput: function (e) {
    var note = e.detail.value;
    this.setData({
      note: note,
    })
  },


  /**
    * 服务方式
    */
  service: function (e) {
    var orderItem = this.data.orderItem;
      wx.navigateTo({
        url: '/pages/order/transport/transport?orderId=' + "" + "&name=" + "pending",
      })
    
  },

  //完善信息
  perfect: function () {

    wx.navigateTo({
      url: '/pages/order/car-msg/car-msg?orderId=' +"" + "&name=" + "pending",
    })
  },







  //提交完善信息
  submit: function (e) {
    var address = this.data.address;
    var orderitem = this.data.orderItem;
    var orderItemArray = this.data.orderItemArray;
    var userId = app.globalData.userId;
    var note = this.data.note;
    var date = this.data.date;
    var recvAddress = this.data.recvAddress;
    var sendAddress = this.data.sendAddress;
 

 console.log(recvAddress)
  console.log(sendAddress)
    if (!address) {
      wx.showModal({
        content: "请您选择运输地址",
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    } else if (date == "") {
      wx.showModal({
        content: "请选择您的发车时间",
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    } else if (orderItemArray == '') {
      wx.showModal({
        content: '请您完善车辆信息',
        showCancel: false,
        confirmColor: "#a744a7",
      });
      return;
    } else {
      wx.showModal({
        title: '确定已完善所有信息？',
        content: '确定完善所有信息后，客服将开始为您补充价格信息。若还需补充信息，请点击取消。',
        confirmColor: "#a744a7",
        success(res) {
          //点击确认
          if (res.confirm) {
            var count = orderItemArray.length;
            for (var i = 0; i < orderItemArray.length;i++){
              orderItemArray[i].modelType = orderItemArray[i].model_type;
              orderItemArray[i].oldCar = orderItemArray[i].old_car;
              orderItemArray[i].brandType = orderItemArray[i].brand_type;
              orderItemArray[i].safeStatus = orderItemArray[i].safe_status;
            }
            //提交信息到服务器
            var params = {
              routeStartId: orderitem.startId,
              routeEndId: orderitem.endId,
              routeStart: orderitem.startCity,
              routeEnd: orderitem.endCity,
              serviceType: orderitem.serviceType+1,
              createdType: 3,
              remark: note,
              recvName: recvAddress.recvName,
              recvPhone: recvAddress.recvPhone,
              recvAddress: recvAddress.recvAddress,
              sendName: sendAddress.sendName,
              sendPhone: sendAddress.sendPhone,
              sendAddress: sendAddress.sendAddress,
              departureTime: date,
              carNum:count,
              orderItemArray: orderItemArray,
            }
            reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/order" , params, (err, res) => {
              
              //清除缓存
              try {
                wx.removeStorageSync('sendAddress')
                wx.removeStorageSync('recvAddress')
              } catch (e) { }
              wx.removeStorage({ key: 'orderItemArray' })
              wx.removeStorage({ key: 'arr', })

             console.log(res)
              wx.navigateTo({
                url: '/pages/order/submit/submit?name=' + "create" + "&orderId=" + res.data.id,
              })
             })

          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      });
    }
  },



  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //清除缓存
    try {
      wx.removeStorageSync('sendAddress')
      wx.removeStorageSync('recvAddress')
    } catch (e) { }
    wx.removeStorage({ key: 'orderItemArray' })
    wx.removeStorage({ key: 'arr'})
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }
})