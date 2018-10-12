export const USER_ID ='user-id';
export const USER_TYPE ='user-type';
export const USER_STATUS='user-status';
export const AUTH_TOKEN ='auth-token';

export const ENQUIRY_PARAMS = {
    label: "估值计算用参数",
    unitPrice: 1.2,
    valuationRate: 0.05
};

export const SERVICE_MODE = [
    {
        value: 1,
        label: "送到指定地点",
        fee: 500
    },
    {
        value: 2,
        label: "送到当地自提",
        fee: 0
    }
];

export const CAR_MODEL = [
    {
        value: 1,
        label: "标准轿车",
        ratio: 0.9
    },
    {
        value: 2,
        label: "标准SUV",
        ratio: 1.0
    },
    {
        value: 3,
        label: "大型SUV",
        ratio: 1.1
    },
    {
        value: 4,
        label: "标准商务车",
        ratio: 1.0
    },
    {
        value: 5,
        label: "大型商务车",
        ratio: 1.1
    }
];

export const YES_NO = [
    {
        value: 0,
        label: "否",
        ratio: 0.8
    },
    {
        value: 1,
        label: "是",
        ratio: 1.0
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