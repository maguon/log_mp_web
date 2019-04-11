const app = getApp()
const config = require('../../../host_config.js');
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
    

    newcityAZ: [{ letter: 'A', data: [] }, { letter: 'B', data: [] }, { letter: 'C', data: [] }, { letter: 'D', data: [] }, { letter: 'E', data: [] }, { letter: 'F', data: [] }, { letter: 'G', data: [] }, { letter: 'H', data: [] }, { letter: 'I', data: [] }, { letter: 'J', data: [] }, { letter: 'K', data: [] }, { letter: 'L', data: [] }, { letter: 'M', data: [] }, { letter: 'N', data: [] }, { letter: 'O', data: [] }, { letter: 'P', data: [] }, { letter: 'Q', data: [] }, { letter: 'R', data: [] }, { letter: 'S', data: [] }, { letter: 'T', data: [] }, { letter: 'U', data: [] }, { letter: 'V', data: [] }, { letter: 'W', data: [] }, { letter: 'X', data: [] }, { letter: 'Y', data: [] }, { letter: 'Z', data: [] },],
    citys: [],
    flag:false,
  },




  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var userId = app.globalData.userId;
    var newcity = this.data.newcityAZ;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/city", (err, res) => {

    var citys = res.data.result;
     for (var i = 0; i < citys.length; i++) {
       for (var j = 0; j < newcity.length; j++) {
         if (citys[i].city_py.charAt(0).toUpperCase() == newcity[j].letter){
           newcity[j].data.push(citys[i])
          }
        }
      }
      console.log(newcity)
    this.setData({
      newcityAZ: newcity,
      cityResults: newcity,
      citys: res.data.result,
      cityType: options.cityType
    })
  })
  },



/**
 * a-z检索
 */
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
 * 选择城市
 */
  citySelected: function (e) {
    console.log(this.data.cityType)
    console.log(e.currentTarget.dataset.cityname)

    var cityNameTemp = e.currentTarget.dataset.cityname
    if (this.data.cityType == 'begin') {
      app.globalData.trainBeginCity = cityNameTemp
    }

    if (this.data.cityType == "end") {
      app.globalData.trainEndCity = cityNameTemp
    }

    wx.navigateBack()
  },



/**
 * 查询 
 */
  bindSarchInput: function (e) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    var inputVal = e.detail.value;
    var cityResultsTemp = new Array()
    var newcity = this.data.newcityAZ;
    var cityResults = this.data.cityResults;
    var citys = this.data.citys;

    if (inputVal == null || inputVal.trim() == '') {
      this.setData({
        flag: false,
        newcityAZ: cityResults
      })
      return;
    }

    for (var i = 0; i < citys.length; i++) {
      if (citys[i].city_name.indexOf(inputVal) == 0 || citys[i].city_py.indexOf(inputVal.toLowerCase()) == 0 || citys[i].city_pinyin.indexOf(inputVal.toLowerCase()) == 0) {
        //去除热门城市
        if (citys[i].city_py.indexOf("#") != -1) {
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
      flag:true,
      newcityAZ: cityResultsTemp
    })
  },




  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {

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
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return app.onShareApp();
  }

})