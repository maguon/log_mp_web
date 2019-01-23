import {handleActions} from 'redux-actions';
import {DepartmentSettingActionType} from '../../actionTypes';

const initialState = {
    // 部门名称
    departmentName: '',
    // 部门列表
    departmentArray: []
};

export default handleActions({
    [DepartmentSettingActionType.getDepartmentList]: (state, action) => {
        return {
            ...state,
            departmentArray: action.payload
        }
    },
    [DepartmentSettingActionType.setDepartmentName]: (state, action) => {
        return {
            ...state,
            departmentName: action.payload
        }
    }
}, initialState)