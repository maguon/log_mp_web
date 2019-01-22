import {handleActions} from 'redux-actions';
import {EditLoginUserModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 原始密码
    loginPassword: '',
    // 新密码
    newLoginPassword: '',
    // 确认密码
    repeatLoginPassword: ''
};

export default handleActions({
    [EditLoginUserModalActionType.setLoginPassword]: (state, action) => {
        return {
            ...state,
            loginPassword: action.payload
        }
    },
    [EditLoginUserModalActionType.setNewLoginPassword]: (state, action) => {
        return {
            ...state,
            newLoginPassword: action.payload
        }
    },
    [EditLoginUserModalActionType.setRepeatLoginPassword]: (state, action) => {
        return {
            ...state,
            repeatLoginPassword: action.payload
        }
    }
}, initialState)