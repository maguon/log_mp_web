import {handleActions} from 'redux-actions';
import {ProductActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,
    // 检索条件：编号
    conditionNo: '',
    // 检索条件：销售类型
    conditionSaleType: null,
    // 检索条件：销售状态
    conditionSaleStatus: null,
    // 商品检索结果列表
    productArray: []
};

export default handleActions({
    [ProductActionType.getProductList]: (state, action) => {
        return {
            ...state,
            productArray: action.payload
        }
    },
    [ProductActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [ProductActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [ProductActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [ProductActionType.setConditionSaleType]: (state, action) => {
        return {
            ...state,
            conditionSaleType: action.payload
        }
    },
    [ProductActionType.setConditionSaleStatus]: (state, action) => {
        return {
            ...state,
            conditionSaleStatus: action.payload
        }
    }
}, initialState)

