import {handleActions} from 'redux-actions';
import {NewAdminModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 手机
    phone: '',
    // 密码
    password: '',
    // 姓名
    adminName: '',
    // 性别 默认为男：1
    gender: 1,
    // 部门
    department: null
};

export default handleActions({
    [NewAdminModalActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    },
    [NewAdminModalActionType.setPassword]: (state, action) => {
        return {
            ...state,
            password: action.payload
        }
    },
    [NewAdminModalActionType.setAdminName]: (state, action) => {
        return {
            ...state,
            adminName: action.payload
        }
    },
    [NewAdminModalActionType.setAdminGender]: (state, action) => {
        return {
            ...state,
            gender: action.payload
        }
    },
    [NewAdminModalActionType.setDepartment]: (state, action) => {
        return {
            ...state,
            department: action.payload
        }
    }
}, initialState)