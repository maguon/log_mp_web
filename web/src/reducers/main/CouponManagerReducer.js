import {handleActions} from 'redux-actions';
import {CouponManagerActionType} from '../../actionTypes';

const sysConst = require('../../util/SysConst');

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：编号
    conditionNo: '',
    // 优惠券编号列表
    couponNoList: [],
    // 检索条件：优惠券编号
    conditionCouponNo: null,
    // 检索条件：发放人
    conditionGrantUser: '',
    // 检索条件：状态
    conditionStatus: null,
    // 检索条件：用户ID
    conditionUserId: '',
    // 检索条件：用户昵称
    conditionWeChatNm: '',
    // 检索条件：领取日期(始)
    conditionCreatedOnStart: '',
    // 检索条件：领取日期(终)
    conditionCreatedOnEnd: '',

    // 领取优惠券列表
    userCouponArray: []
};

export default handleActions({
    [CouponManagerActionType.getUserCouponList]: (state, action) => {
        return {
            ...state,
            userCouponArray: action.payload
        }
    },
    [CouponManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [CouponManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [CouponManagerActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [CouponManagerActionType.getCouponNoList]: (state, action) => {
        let couponNoList = sysConst.DEFAULT_USER_COUPON;
        action.payload.forEach((value) => {
            couponNoList.push({value: value.id, label: value.coupon_name})
        });
        return {
            ...state,
            couponNoList: couponNoList
        }
    },
    [CouponManagerActionType.setConditionCouponNo]: (state, action) => {
        return {
            ...state,
            conditionCouponNo: action.payload
        }
    },
    [CouponManagerActionType.setConditionGrantUser]: (state, action) => {
        return {
            ...state,
            conditionGrantUser: action.payload
        }
    },
    [CouponManagerActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    },
    [CouponManagerActionType.setConditionUserId]: (state, action) => {
        return {
            ...state,
            conditionUserId: action.payload
        }
    },
    [CouponManagerActionType.setConditionWeChatNm]: (state, action) => {
        return {
            ...state,
            conditionWeChatNm: action.payload
        }
    },
    [CouponManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [CouponManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    }
}, initialState)