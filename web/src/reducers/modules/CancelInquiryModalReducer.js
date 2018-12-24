import {handleActions} from 'redux-actions';
import {CancelInquiryModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 询价ID
    inquiryId: '',
    // 预计运费
    freight: 0,
    // 预计保费
    insuranceFee: 0,
    // 协商运费
    actFreight: 0,
    // 协商保费
    actInsuranceFee: 0,
    // 备注
    remark: ''
};

export default handleActions({
    [CancelInquiryModalActionType.setInquiryId]: (state, action) => {
        return {
            ...state,
            inquiryId: action.payload
        }
    },
    [CancelInquiryModalActionType.setFreight]: (state, action) => {
        return {
            ...state,
            freight: action.payload
        }
    },
    [CancelInquiryModalActionType.setInsuranceFee]: (state, action) => {
        return {
            ...state,
            insuranceFee: action.payload
        }
    },
    [CancelInquiryModalActionType.setActFreight]: (state, action) => {
        return {
            ...state,
            actFreight: action.payload
        }
    },
    [CancelInquiryModalActionType.setActInsuranceFee]: (state, action) => {
        return {
            ...state,
            actInsuranceFee: action.payload
        }
    },
    [CancelInquiryModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)