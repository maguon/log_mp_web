import {handleActions} from 'redux-actions';
import {NewOfferModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 询价ID
    inquiryId: '',
    // 用户ID
    userId: '',
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
    [NewOfferModalActionType.setInquiryId]: (state, action) => {
        return {
            ...state,
            inquiryId: action.payload
        }
    },
    [NewOfferModalActionType.setUserId]: (state, action) => {
        return {
            ...state,
            userId: action.payload
        }
    },
    [NewOfferModalActionType.setFreight]: (state, action) => {
        return {
            ...state,
            freight: action.payload
        }
    },
    [NewOfferModalActionType.setInsuranceFee]: (state, action) => {
        return {
            ...state,
            insuranceFee: action.payload
        }
    },
    [NewOfferModalActionType.setActFreight]: (state, action) => {
        return {
            ...state,
            actFreight: action.payload
        }
    },
    [NewOfferModalActionType.setActInsuranceFee]: (state, action) => {
        return {
            ...state,
            actInsuranceFee: action.payload
        }
    },
    [NewOfferModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)