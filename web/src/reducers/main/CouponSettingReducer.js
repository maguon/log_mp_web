import {handleActions} from 'redux-actions';
import {CouponSettingActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：编号
    conditionNo: '',
    // 检索条件：状态
    conditionStatus: null,

    // 优惠券列表
    couponArray: []
};

export default handleActions({
    [CouponSettingActionType.getCouponList]: (state, action) => {
        return {
            ...state,
            couponArray: action.payload
        }
    },
    [CouponSettingActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [CouponSettingActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [CouponSettingActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [CouponSettingActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)