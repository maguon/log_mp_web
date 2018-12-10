import {handleActions} from 'redux-actions';
import {InquiryInfoModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 询价信息
    inquiryInfo: [],
    // 询价车辆列表
    inquiryCarArray: [],
    // 估值总额
    totalValuation: 0,
    // 预计总运费
    totalFreight: 0,
    // 是否显示订单详情
    showOrderInfoFlag: false,
    // 订单信息
    orderInfo: [],
    // 订单车辆列表
    orderCarArray: [],
    // 实际运费
    totalActFreight: 0
};

export default handleActions({
    [InquiryInfoModalActionType.getInquiryInfo]: (state, action) => {
        return {
            ...state,
            inquiryInfo: action.payload
        }
    },
    [InquiryInfoModalActionType.getInquiryCarList]: (state, action) => {
        return {
            ...state,
            inquiryCarArray: action.payload
        }
    },
    [InquiryInfoModalActionType.setTotalValuation]: (state, action) => {
        return {
            ...state,
            totalValuation: action.payload
        }
    },
    [InquiryInfoModalActionType.setTotalFreight]: (state, action) => {
        return {
            ...state,
            totalFreight: action.payload
        }
    },
    [InquiryInfoModalActionType.setShowOrderInfoFlag]: (state, action) => {
        return {
            ...state,
            showOrderInfoFlag: action.payload
        }
    },
    [InquiryInfoModalActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    },
    [InquiryInfoModalActionType.getOrderCarList]: (state, action) => {
        return {
            ...state,
            orderCarArray: action.payload
        }
    },
    [InquiryInfoModalActionType.setTotalActFreight]: (state, action) => {
        return {
            ...state,
            totalActFreight: action.payload
        }
    }
}, initialState)