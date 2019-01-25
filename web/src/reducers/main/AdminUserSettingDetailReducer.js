import {handleActions} from 'redux-actions';
import {AdminUserSettingDetailActionType} from '../../actionTypes';

const initialState = {
    // 员工编号
    adminId: '',
    // 员工状态
    adminStatus: '',
    // 手机
    phone: '',
    // 姓名
    adminName: '',
    // 性别 默认为男：1
    gender: 1,
    // 部门
    department: null
};

export default handleActions({
    [AdminUserSettingDetailActionType.setAdminId]: (state, action) => {
        return {
            ...state,
            adminId: action.payload
        }
    },
    [AdminUserSettingDetailActionType.setAdminStatus]: (state, action) => {
        return {
            ...state,
            adminStatus: action.payload
        }
    },
    [AdminUserSettingDetailActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    },
    [AdminUserSettingDetailActionType.setAdminName]: (state, action) => {
        return {
            ...state,
            adminName: action.payload
        }
    },
    [AdminUserSettingDetailActionType.setAdminGender]: (state, action) => {
        return {
            ...state,
            gender: action.payload
        }
    },
    [AdminUserSettingDetailActionType.setDepartment]: (state, action) => {
        return {
            ...state,
            department: action.payload
        }
    }
}, initialState)