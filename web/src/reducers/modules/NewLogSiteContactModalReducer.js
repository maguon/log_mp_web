import {handleActions} from 'redux-actions';
import {NewLogSiteContactModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 收发货地点ID
    logSiteId: '',
    // 姓名
    name: '',
    // 职务
    position: '',
    // 电话
    phone: ''
};

export default handleActions({
    [NewLogSiteContactModalActionType.setLogSiteId]: (state, action) => {
        return {
            ...state,
            logSiteId: action.payload
        }
    },
    [NewLogSiteContactModalActionType.setName]: (state, action) => {
        return {
            ...state,
            name: action.payload
        }
    },
    [NewLogSiteContactModalActionType.setPosition]: (state, action) => {
        return {
            ...state,
            position: action.payload
        }
    },
    [NewLogSiteContactModalActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    }
}, initialState)