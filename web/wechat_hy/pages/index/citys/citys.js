const app = getApp()
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({
  /**
 * 页面的初始数据
 */
  data: {
    scrollAZ: null,
    scrollNow: 0,
    cityType: 'begin',
    cityResults: null,
    cityAZ: [{ city_name: 'A' }, { city_name: 'B' }, { city_name: 'C' }, { city_name: 'D' }, { city_name: 'E' }, { city_name: 'F' }, { city_name: 'G' }, { city_name: 'H' }, { city_name: 'J' }, { city_name: 'K' }, { city_name: 'L' }, { city_name: 'M' }, { city_name: 'N' }, { city_name: 'P' }, { city_name: 'Q' }, { city_name: 'R' }, { city_name: 'S' }, { city_name: 'T' }, { city_name: 'W' }, { city_name: 'X' }, { city_name: 'Y' }, { city_name: 'Z' },],

    citys: [],

  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var userId = app.globalData.userId;
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/city", (err, res) => {
      this.setData({
        citys:res.data.result,
      })
    this.setData({
      cityType: options.cityType
    })
    if (this.data.cityResults == null) {
      this.setData({
        cityResults: this.data.citys
      })
    }
  })
  },
  bindAZ: function (e) {
    var currentCityName = e.currentTarget.dataset.id
    var that = this;
    //放入A-Z的scrollTop参数
    if (that.data.scrollAZ == null) {
      wx.createSelectorQuery().selectAll('.city-item-A-Z').fields({
        dataset: true,
        size: true,
        rect: true
      }, function (res) {
        res.forEach(function (re) {
          if (currentCityName == re.dataset.cityname) {
            wx.pageScrollTo({
              scrollTop: re.top + that.data.scrollNow - 55.5,
              duration: 0
            })
          }
        })
      }).exec();
    } else {
      this.data.scrollAZ.forEach(function (re) {
        if (currentCityName == re.dataset.cityname) {
          wx.pageScrollTo({
            scrollTop: re.top + that.data.scrollNow - 55.5,
            duration: 0
          })
        }
      })
    }


  },
  onPageScroll: function (e) { // 获取滚动条当前位置
    this.setData({
      scrollNow: e.scrollTop
    })
  },

  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {

  },
  citySelected: function (e) {
    var cityNameTemp = e.currentTarget.dataset.cityname
    console.log(e.currentTarget)
    if (this.data.cityType == 'begin') {
      app.globalData.trainBeginCity = cityNameTemp
    }

    if (this.data.cityType == "end") {
      app.globalData.trainEndCity = cityNameTemp
    }

    wx.navigateBack()
  },
  bindSarchInput: function (e) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })

    var inputVal = e.detail.value;
    var cityResultsTemp = new Array()
    var citys = this.data.citys;

    if (inputVal == null || inputVal.trim() == '') {
      this.setData({
        cityResults: citys
      })
      return;
    }

    for (var i = 0; i < citys.length; i++) {
      if (citys[i].city_name.indexOf(inputVal) == 0 || citys[i].cityPY.indexOf(inputVal.toLowerCase()) == 0 || citys[i].cityPinYin.indexOf(inputVal.toLowerCase()) == 0) {
        //去除热门城市
        if (citys[i].cityPY.indexOf("#") != -1) {
          continue;
        }
        var ifHas = false;
        for (var j = 0; j < cityResultsTemp.length; j++) {
          if (cityResultsTemp[j] == citys[i]) {
            ifHas = true;
            break;
          }
        }
        if (!ifHas) {
          cityResultsTemp.push(citys[i]);
        }
      }
    }
    this.setData({
      cityResults: cityResultsTemp
    })
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    console.log(this.data.cityResults) 
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
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1000)

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

  }, 
})