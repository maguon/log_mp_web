import {handleActions} from 'redux-actions';
import {EditDepartmentModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 部门ID
    departmentId: '',
    // 部门名称
    departmentName: '',
};

export default handleActions({
    [EditDepartmentModalActionType.setDepartmentId]: (state, action) => {
        return {
            ...state,
            departmentId: action.payload
        }
    },
    [EditDepartmentModalActionType.setDepartmentName]: (state, action) => {
        return {
            ...state,
            departmentName: action.payload
        }
    }
}, initialState)