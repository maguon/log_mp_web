export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//取倒计时（天时分秒）
export const getTimeLeft=(datetimeTo)=> {
  // 计算目标与现在时间差（毫秒）
  let time1 = new Date(datetimeTo).getTime();
  let time2 = new Date().getTime();
  let mss = time1 - time2;

  // 将时间差（毫秒）格式为：时分秒
  let days = parseInt(mss / (1000 * 60 * 60 * 24));
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + mss / (1000 * 60 * 60))
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = parseInt((mss % (1000 * 60)) / 1000);
  if (hours < 10) {
    hours = "0" + hours;
   } 
   if (minutes < 10) { 
     minutes = "0" + minutes;
   } 
   if(seconds<10){
     seconds = "0" + seconds;
   }
if(mss>0){
  return hours + ":" + minutes + ":" + seconds
}else{
  return 0
}

  
}

// module.exports = {
//   formatTime: formatTime,
// }
