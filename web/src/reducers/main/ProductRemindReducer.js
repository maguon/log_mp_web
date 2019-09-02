import {handleActions} from 'redux-actions';
import {ProductRemindActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,
    // 检索条件：商品编号
    conditionProduct: null,
    // 检索条件：用户昵称
    conditionNickname: '',
    // 检索条件：商品状态
    conditionProductSaleStatus: null,
    // 商品检索结果列表
    productRemindArray: []
};

export default handleActions({
    [ProductRemindActionType.getProductRemindList]: (state, action) => {
        return {
            ...state,
            productRemindArray: action.payload
        }
    },
    [ProductRemindActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [ProductRemindActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [ProductRemindActionType.setConditionProduct]: (state, action) => {
        return {
            ...state,
            conditionProduct: action.payload
        }
    },
    [ProductRemindActionType.setConditionNickname]: (state, action) => {
        return {
            ...state,
            conditionNickname: action.payload
        }
    },
    [ProductRemindActionType.setConditionProductSaleStatus]: (state, action) => {
        return {
            ...state,
            conditionProductSaleStatus: action.payload
        }
    }
}, initialState)