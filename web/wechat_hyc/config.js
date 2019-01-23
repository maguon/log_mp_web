
export const host = {
  "apiHost": "https://stg.myxxjs.com",
  "imageHost" : "http://stg.myxxjs.com:9002"
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