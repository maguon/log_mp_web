export const SESSION_USER_ID = 'user-id';
export const SESSION_USER_TYPE = 'user-type';
export const SESSION_USER_TOKEN = 'auth-token';
export const SESSION_USER_STATUS = 'user-status';
export const SESSION_USER_AVATAR = 'user-avatar';

export const SERVICE_MODE = [
    {
        value: 1,
        label: "送到指定地点"
    },
    {
        value: 2,
        label: "送到当地自提"
    }
];

export const CAR_MODEL = [
    {
        value: 1,
        label: "标准轿车"
    },
    {
        value: 2,
        label: "标准SUV"
    },
    {
        value: 3,
        label: "大型SUV"
    },
    {
        value: 4,
        label: "标准商务车"
    },
    {
        value: 5,
        label: "大型商务车"
    }
];

export const YES_NO = [
    {
        value: 0,
        label: "否"
    },
    {
        value: 1,
        label: "是"
    }
];

export const DATE_PICKER_OPTION = {
    // selectMonths: true,
    // selectYears: 15,
    format: 'yyyy-mm-dd',
    weekdaysLetter: ['日', '一', '二', '三', '四', '五', '六'],
    today: '今天',
    clear: '清除',
    close: '关闭',
    monthsFull: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    weekdaysFull: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    closeOnSelect: true, // Close upon selecting a date,
    // container: undefined, // ex. 'body' will append picker to body
};