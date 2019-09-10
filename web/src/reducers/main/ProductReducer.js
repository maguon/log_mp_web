import {handleActions} from 'redux-actions';
import {ProductActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,
    // 检索条件：商品编号
    conditionProduct: null,
    // 检索条件：城市
    conditionCity: null,
    // 检索条件：销售类型
    conditionSaleType: null,
    // 检索条件：销售状态
    conditionProductSaleStatus: null,
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
    [ProductActionType.setConditionProduct]: (state, action) => {
        return {
            ...state,
            conditionProduct: action.payload
        }
    },
    [ProductActionType.setConditionCity]: (state, action) => {
        return {
            ...state,
            conditionCity: action.payload
        }
    },
    [ProductActionType.setConditionSaleType]: (state, action) => {
        return {
            ...state,
            conditionSaleType: action.payload
        }
    },
    [ProductActionType.setConditionProductSaleStatus]: (state, action) => {
        return {
            ...state,
            conditionProductSaleStatus: action.payload
        }
    }
}, initialState)

