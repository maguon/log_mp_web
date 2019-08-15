import {handleActions} from 'redux-actions';
import {EditCouponModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 优惠券ID
    couponId: '',

    // 优惠券名称
    couponName: '',
    // 优惠券金额
    couponAmount: '',
    // 门槛
    threshold: '',

    // 有效期类型
    validityPeriodType: {value: 1, label: '天数'},
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
    [EditCouponModalActionType.setCouponId]: (state, action) => {
        return {
            ...state,
            couponId: action.payload
        }
    },
    [EditCouponModalActionType.setCouponName]: (state, action) => {
        return {
            ...state,
            couponName: action.payload
        }
    },
    [EditCouponModalActionType.setCouponAmount]: (state, action) => {
        return {
            ...state,
            couponAmount: action.payload
        }
    },
    [EditCouponModalActionType.setCouponThreshold]: (state, action) => {
        return {
            ...state,
            threshold: action.payload
        }
    },
    [EditCouponModalActionType.setValidityPeriodType]: (state, action) => {
        return {
            ...state,
            validityPeriodType: action.payload
        }
    },
    [EditCouponModalActionType.setEffectiveDays]: (state, action) => {
        return {
            ...state,
            effectiveDays: action.payload
        }
    },
    [EditCouponModalActionType.setValidityPeriodStart]: (state, action) => {
        return {
            ...state,
            validityPeriodStart: action.payload
        }
    },
    [EditCouponModalActionType.setValidityPeriodEnd]: (state, action) => {
        return {
            ...state,
            validityPeriodEnd: action.payload
        }
    },
    [EditCouponModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)