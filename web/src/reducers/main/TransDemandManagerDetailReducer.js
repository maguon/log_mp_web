import {handleActions} from 'redux-actions';
import {TransDemandManagerDetailActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 运输需求信息
    transDemandInfo: [],



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
    [TransDemandManagerDetailActionType.getTransDemandInfo]: (state, action) => {
        return {
            ...state,
            transDemandInfo: action.payload
        }
    },
    [TransDemandManagerDetailActionType.getInquiryCarList]: (state, action) => {
        return {
            ...state,
            inquiryCarArray: action.payload
        }
    },
    [TransDemandManagerDetailActionType.setTotalValuation]: (state, action) => {
        return {
            ...state,
            totalValuation: action.payload
        }
    },
    [TransDemandManagerDetailActionType.setTotalFreight]: (state, action) => {
        return {
            ...state,
            totalFreight: action.payload
        }
    },
    [TransDemandManagerDetailActionType.setTotalInsuranceFee]: (state, action) => {
        return {
            ...state,
            totalInsuranceFee: action.payload
        }
    },
    [TransDemandManagerDetailActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    }
}, initialState)