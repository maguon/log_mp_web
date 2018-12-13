import {handleActions} from 'redux-actions';
import {UserManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 基本信息TAB：用户信息
    userInfo: [],

    // 询价记录TAB： 检索条件：起始城市
    inquiryConditionStartCity: null,
    // 询价记录TAB： 检索条件：目的城市
    inquiryConditionEndCity: null,
    // 询价记录TAB： 检索条件：服务方式
    inquiryConditionServiceType: null,
    // 询价记录TAB： 检索条件：状态
    inquiryConditionStatus: null,
    // 询价记录TAB：开始位置
    inquiryStart: 0,
    // 询价记录TAB：每页数量
    inquirySize: 9,
    // 询价记录TAB：检索结果数量
    inquiryDataSize: 0,
    // 询价记录TAB：列表
    inquiryArray: [],

    // 收发货信息TAB：列表
    logInfoArray: [],
    // 银行卡TAB：列表
    bankCardArray: [],
    // 发票信息TAB：列表
    invoiceArray: []
};

export default handleActions({
    [UserManagerDetailActionType.getUserInfo]: (state, action) => {
        return {
            ...state,
            userInfo: action.payload
        }
    },
    [UserManagerDetailActionType.setInquiryConditionStartCity]: (state, action) => {
        return {
            ...state,
            inquiryConditionStartCity: action.payload
        }
    },
    [UserManagerDetailActionType.setInquiryConditionEndCity]: (state, action) => {
        return {
            ...state,
            inquiryConditionEndCity: action.payload
        }
    },
    [UserManagerDetailActionType.setInquiryConditionServiceType]: (state, action) => {
        return {
            ...state,
            inquiryConditionServiceType: action.payload
        }
    },
    [UserManagerDetailActionType.setInquiryConditionStatus]: (state, action) => {
        return {
            ...state,
            inquiryConditionStatus: action.payload
        }
    },
    [UserManagerDetailActionType.setInquiryStartNumber]: (state, action) => {
        return {
            ...state,
            inquiryStart: action.payload
        }
    },
    [UserManagerDetailActionType.setInquiryDataSize]: (state, action) => {
        return {
            ...state,
            inquiryDataSize: action.payload
        }
    },
    [UserManagerDetailActionType.getUserInquiryList]: (state, action) => {
        return {
            ...state,
            inquiryArray: action.payload
        }
    },
    [UserManagerDetailActionType.getLogInfoList]: (state, action) => {
        return {
            ...state,
            logInfoArray: action.payload
        }
    },
    [UserManagerDetailActionType.getBankCardList]: (state, action) => {
        return {
            ...state,
            bankCardArray: action.payload
        }
    },
    [UserManagerDetailActionType.getInvoiceList]: (state, action) => {
        return {
            ...state,
            invoiceArray: action.payload
        }
    }
}, initialState)