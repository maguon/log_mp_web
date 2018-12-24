import {handleActions} from 'redux-actions';
import {InquiryManagerDetailActionType} from '../../actionTypes';

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
    // 预计总保费
    totalInsuranceFee: 0,
    // 订单信息
    orderInfo: []
};

export default handleActions({
    [InquiryManagerDetailActionType.getInquiryInfo]: (state, action) => {
        return {
            ...state,
            inquiryInfo: action.payload
        }
    },
    [InquiryManagerDetailActionType.getInquiryCarList]: (state, action) => {
        return {
            ...state,
            inquiryCarArray: action.payload
        }
    },
    [InquiryManagerDetailActionType.setTotalValuation]: (state, action) => {
        return {
            ...state,
            totalValuation: action.payload
        }
    },
    [InquiryManagerDetailActionType.setTotalFreight]: (state, action) => {
        return {
            ...state,
            totalFreight: action.payload
        }
    },
    [InquiryManagerDetailActionType.setTotalInsuranceFee]: (state, action) => {
        return {
            ...state,
            totalInsuranceFee: action.payload
        }
    },
    [InquiryManagerDetailActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    }
}, initialState)