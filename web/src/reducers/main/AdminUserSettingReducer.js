import {handleActions} from 'redux-actions';
import {AdminUserSettingActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：员工编号
    conditionNo: '',
    // 检索条件：姓名
    conditionAdminName: '',
    // 检索条件：部门
    conditionDepartment: null,
    // 检索条件：状态
    conditionStatus: null,

    // 员工列表
    adminArray: []
};

export default handleActions({
    [AdminUserSettingActionType.getAdminList]: (state, action) => {
        return {
            ...state,
            adminArray: action.payload
        }
    },
    [AdminUserSettingActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [AdminUserSettingActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [AdminUserSettingActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [AdminUserSettingActionType.setConditionAdminName]: (state, action) => {
        return {
            ...state,
            conditionAdminName: action.payload
        }
    },
    [AdminUserSettingActionType.setConditionDepartment]: (state, action) => {
        return {
            ...state,
            conditionDepartment: action.payload
        }
    },
    [AdminUserSettingActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)