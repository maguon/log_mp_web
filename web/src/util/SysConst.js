export const USER_ID ='user-id';
export const USER_TYPE ='user-type';
export const USER_STATUS='user-status';
export const AUTH_TOKEN ='auth-token';

export const INQUIRY_PARAMS = {
    label: "估值计算用参数",
    unitPrice: 1.2,
    valuationRate: 0.05
};

export const SERVICE_MODE = [
    {
        value: 1,
        label: "上门服务",
        fee: 500
    },
    {
        value: 2,
        label: "当地自提",
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

// 询价状态
export const INQUIRY_STATUS = [
    {
        value: 0,
        label: "待报价"
    },
    {
        value: 1,
        label: "已报价"
    },
    {
        value: 2,
        label: "已完成"
    },
    {
        value: 3,
        label: "已取消"
    }
];

// 性别
export const GENDER = [
    {
        value: 0,
        label: "女"

    },
    {
        value: 1,
        label: "男"
    }
];

// 认证状态
export const AUTH_STATUS = [
    {
        value: 0,
        label: "未认证"
    },
    {
        value: 1,
        label: "已认证"
    }
];

// 关注状态
export const WE_CHAT_STATUS = [
    {
        value: 0,
        label: "未授权"
    },
    {
        value: 1,
        label: "已授权"
    }
];

// 运输方式
export const TRANSPORT_MODE = [
    {
        value: 1,
        label: "公路"
    },
    {
        value: 2,
        label: "海运"
    },
    {
        value: 3,
        label: "公路/海运"
    }
];

// 物流状态
export const LOG_STATUS = [
    {
        value: 0,
        label: "未送达"
    },
    {
        value: 1,
        label: "已送达"
    }
];

// 订单类型
export const ORDER_TYPE = [
    {
        value: 1,
        label: "内部订单"
    },
    {
        value: 2,
        label: "外部订单"
    }
];

// 订单状态
export const ORDER_STATUS = [
    {
        value: 0,
        label: "待完善信息"
    },
    {
        value: 1,
        label: "待完善价格"
    },
    {
        value: 2,
        label: "待生成需求"
    },
    {
        value: 3,
        label: "待安排车辆"
    },
    {
        value: 4,
        label: "执行中"
    },
    {
        value: 8,
        label: "已取消"
    },
    {
        value: 9,
        label: "已完成"
    }
];

// 订单支付状态
export const ORDER_PAYMENT_STATUS = [
    {
        value: 0,
        label: "未支付"
    },
    {
        value: 1,
        label: "部分支付"
    },
    {
        value: 2,
        label: "支付完成"
    }
];

// 支付方式
export const PAYMENT_MODE = [
    {
        value: 1,
        label: "微信"
    },
    {
        value: 2,
        label: "银行转账"
    }
];

// 支付类型
export const PAYMENT_TYPE = [
    {
        value: 0,
        label: "退款"
    },
    {
        value: 1,
        label: "支付"
    }
];

// 支付状态
export const PAYMENT_STATUS = [
    {
        value: 0,
        label: "待确认"
    },
    {
        value: 1,
        label: "已支付"
    }
];

// 退款状态 0:不给退款，1：给退款2默认申请中
export const REFUND_STATUS = [
    {
        value: 0,
        label: "已拒绝"
    },
    {
        value: 1,
        label: "已退款"
    },
    {
        value: 2,
        label: "申请中"
    }
];

// 发票状态
export const INVOICE_STATUS = [
    {
        value: 0,
        label: "待开票"
    },
    {
        value: 1,
        label: "已开票"
    },
    {
        value: 2,
        label: "已拒绝"
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

/**
 * 单选下拉菜单样式
 */
export const CUSTOM_REACT_SELECT_STYLE = {
    control: (styles, {isFocused}) => ({
        ...styles,
        height: 'calc(3rem + 1px)',
        borderRadius: '0',
        boxShadow: '0',
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        background: '#FFFFFF',
        margin: "0 0 20px 0",
        borderColor: isFocused ? '#26a69a' : '#ACACAC',
        ':hover': {
            borderColor: "#26a69a"
        }
    }),
    // 下拉菜单和输入框距离
    menu: styles => ({ ...styles, marginTop:'1px'}),
    indicatorSeparator: styles => ({...styles, display: 'none'}),
    valueContainer: styles => ({...styles, paddingLeft: '0'})
};


export const CUSTOM_REACT_SELECT_STYLE_FOR_MODAL = {
    control: (styles, {isFocused}) => ({
        ...styles,
        height: 'calc(3rem + 1px)',
        borderRadius: '0',
        boxShadow: '0',
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        background: '#FFFFFF',
        margin: "0 0 20px 0",
        borderColor: isFocused ? '#26a69a' : '#ACACAC',
        ':hover': {
            borderColor: "#26a69a"
        }
    }),
    // 下拉菜单和输入框距离
    menu: styles => ({ ...styles, marginTop:'1px'}),
    // 下拉菜单最大高度
    menuList: styles => ({ ...styles, maxHeight: '120px' }),
    indicatorSeparator: styles => ({...styles, display: 'none'}),
    valueContainer: styles => ({...styles, paddingLeft: '0'})
};