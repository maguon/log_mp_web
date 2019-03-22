
export const host = {
  "apiHost": "https://stg.myxxjs.com"
}

export const priceConfig = {
  sizeTypes: ["紧凑车型", "中型车", "商务车", "其他大型"],
  carTypes: ["全新", "二手"],
  serviceTypes: ["门到门", "指定站点"],
}

//保留小数
export const decimal= (num) =>{
  //钱数小数点后二位设定
  var total_price = Number(num);
  var money = total_price.toFixed(2);
  return money;
}

/**
* 编译时间
*/
export const getTime = (times) => {
  var t = new Date(times);
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
}

/**
* 编译时间
*/
export const getTime01 = (times) => {
  var t = new Date(times);
  var olddata = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ';
  var time = olddata.replace(/-/g, "/");
  return time;
}



/**
* 复制成功
*/
export const textPaste=()=> {
  wx.showToast({
    title: '复制成功',
  })
  wx.setClipboardData({
    data: this.data.orderId,
    success: function (res) {
      wx.getClipboardData({
        //这个api是把拿到的数据放到电脑系统中的
        success: function (res) {
          console.log(res.data) // data
        }
      })
    }
  })
}


