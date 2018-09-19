/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * @param date 要格式化的日期
 * @param format 指定格式 例：FormatUtil.DateFormat(new Date(),'yyyy-MM-dd hh:mm:ss.S q') ==> 2018-09-19 13:33:17.148 3
 */
export const DateFormat = (date, format) => {
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    Date.prototype.Format = function (fmt) { //author: meizz
        let o = {
            "M+": this.getMonth() + 1,                     //月份
            "d+": this.getDate(),                          //日
            "h+": this.getHours(),                         //小时
            "m+": this.getMinutes(),                       //分
            "s+": this.getSeconds(),                       //秒
            "q+": Math.floor((this.getMonth() + 3) / 3),  //季度
            "S": this.getMilliseconds()                    //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    return date.Format(format);
};

// /**
//  * 数字格式化。
//  * @param number 数字
//  * @returns {string} 本地标准格式
//  */
// export const NumberFormat = (number) => {
//     return new Intl.NumberFormat().format(number);
// };

/**
 * 数字格式化。
 * @param number 数字
 * @param decimals 保留小数位数
 * @returns {string} 标准格式 例：FormatUtil.NumberFormat(123456.789, 2) ==> 123,456.79
 */
export const NumberFormat = (number, decimals) => {
    decimals = typeof undefined === 'undefined'? 0 : decimals;
    // 保留指定小数点后位数，并分割数组
    let x = number.toFixed(decimals).split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
};

/**
 * 货币格式化。
 * @param amount 货币
 * @returns {string} 美元货币格式  例：FormatUtil.CurrencyFormat(123456.789) ==> $123,456.79
 */
export const CurrencyFormat = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};