import {handleActions} from 'redux-actions';
import {InquiryManagerActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：客户ID
    conditionUser: '',
    // 检索条件：客户电话
    conditionPhone: '',
    // 检索条件：起始城市
    conditionStartCity: '',
    // 检索条件：目的城市
    conditionEndCity: '',

    // 检索条件：服务方式
    conditionServiceType: null,
    // 检索条件：询价时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：询价时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：状态
    conditionInquiryStatus: null,

    // 询价列表
    inquiryArray: []
};

export default handleActions({
    [InquiryManagerActionType.getInquiryList]: (state, action) => {
        return {
            ...state,
            inquiryArray: action.payload
        }
    },
    [InquiryManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [InquiryManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [InquiryManagerActionType.setConditionUser]: (state, action) => {
        return {
            ...state,
            conditionUser: action.payload
        }
    },
    [InquiryManagerActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [InquiryManagerActionType.setConditionStartCity]: (state, action) => {
        return {
            ...state,
            conditionStartCity: action.payload
        }
    },
    [InquiryManagerActionType.setConditionEndCity]: (state, action) => {
        return {
            ...state,
            conditionEndCity: action.payload
        }
    },
    [InquiryManagerActionType.setConditionServiceType]: (state, action) => {
        return {
            ...state,
            conditionServiceType: action.payload
        }
    },
    [InquiryManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [InquiryManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [InquiryManagerActionType.setConditionInquiryStatus]: (state, action) => {
        return {
            ...state,
            conditionInquiryStatus: action.payload
        }
    }
}, initialState)