import {handleActions} from 'redux-actions';
import {SupplierBusinessManagerActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：供应商
    conditionSupplier: null,
    // 检索条件：业务生成时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：业务生成时间(终)
    conditionCreatedOnEnd: '',

    // 供应商业务结果列表
    supplierBusinessArray: []
};

export default handleActions({
    [SupplierBusinessManagerActionType.getSupplierBusinessList]: (state, action) => {
        return {
            ...state,
            supplierBusinessArray: action.payload
        }
    },
    [SupplierBusinessManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [SupplierBusinessManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [SupplierBusinessManagerActionType.setConditionSupplier]: (state, action) => {
        return {
            ...state,
            conditionSupplier: action.payload
        }
    },
    [SupplierBusinessManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [SupplierBusinessManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    }
}, initialState)