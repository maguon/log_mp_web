import {handleActions} from 'redux-actions';
import {EditUserCouponModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 领取优惠券ID
    userCouponId: '',
    // 领取优惠券信息
    userCouponInfo: null,
    // 优惠券领取详情：是否显示订单信息
    showOrderInfoFlag: false,
    // 接收人手机号
    userPhone: '',
    // 用户信息
    userInfo: [],

    // 优惠券金额
    couponAmount: '',
    // 门槛
    threshold: '',
    // 有效期类型
    validityPeriodType: '',
    // 有效期天数
    effectiveDays: '',
    // 有效日期(始)
    validityPeriodStart: '',
    // 有效日期(终)
    validityPeriodEnd: '',
    // 备注
    remark: ''
};

export default handleActions({
    [EditUserCouponModalActionType.setUserCouponId]: (state, action) => {
        return {
            ...state,
            userCouponId: action.payload
        }
    },
    [EditUserCouponModalActionType.setUserCouponInfo]: (state, action) => {
        return {
            ...state,
            userCouponInfo: action.payload
        }
    },
    [EditUserCouponModalActionType.setShowOrderInfoFlag]: (state, action) => {
        return {
            ...state,
            showOrderInfoFlag: action.payload
        }
    },
    [EditUserCouponModalActionType.setUserPhone]: (state, action) => {
        return {
            ...state,
            userPhone: action.payload
        }
    },
    [EditUserCouponModalActionType.setUserInfo]: (state, action) => {
        return {
            ...state,
            userInfo: action.payload
        }
    },
    [EditUserCouponModalActionType.setCouponAmount]: (state, action) => {
        return {
            ...state,
            couponAmount: action.payload
        }
    },
    [EditUserCouponModalActionType.setCouponThreshold]: (state, action) => {
        return {
            ...state,
            threshold: action.payload
        }
    },
    [EditUserCouponModalActionType.setValidityPeriodType]: (state, action) => {
        return {
            ...state,
            validityPeriodType: action.payload
        }
    },
    [EditUserCouponModalActionType.setEffectiveDays]: (state, action) => {
        return {
            ...state,
            effectiveDays: action.payload
        }
    },
    [EditUserCouponModalActionType.setValidityPeriodStart]: (state, action) => {
        return {
            ...state,
            validityPeriodStart: action.payload
        }
    },
    [EditUserCouponModalActionType.setValidityPeriodEnd]: (state, action) => {
        return {
            ...state,
            validityPeriodEnd: action.payload
        }
    },
    [EditUserCouponModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)