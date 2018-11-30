import {handleActions} from 'redux-actions';
import {UserManagerActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：编号
    conditionNo: '',
    // 检索条件：微信昵称
    conditionWeChatNm: '',
    // 检索条件：手机
    conditionPhone: '',
    // 检索条件：姓名
    conditionUser: '',

    // 检索条件：认证状态
    conditionAuthStatus: null,
    // 检索条件：关注状态
    conditionWeStatus: null,

    // 检索条件：认证时间(始)
    conditionAuthTimeStart: '',
    // 检索条件：认证时间(终)
    conditionAuthTimeEnd: '',
    // 检索条件：授权时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：授权时间(终)
    conditionCreatedOnEnd: '',

    // 用户检索结果列表
    userArray: []
};

export default handleActions({
    [UserManagerActionType.getUserList]: (state, action) => {
        return {
            ...state,
            userArray: action.payload
        }
    },
    [UserManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [UserManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [UserManagerActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [UserManagerActionType.setConditionWeChatNm]: (state, action) => {
        return {
            ...state,
            conditionWeChatNm: action.payload
        }
    },
    [UserManagerActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [UserManagerActionType.setConditionUser]: (state, action) => {
        return {
            ...state,
            conditionUser: action.payload
        }
    },
    [UserManagerActionType.setConditionAuthStatus]: (state, action) => {
        return {
            ...state,
            conditionAuthStatus: action.payload
        }
    },
    [UserManagerActionType.setConditionWeStatus]: (state, action) => {
        return {
            ...state,
            conditionWeStatus: action.payload
        }
    },
    [UserManagerActionType.setConditionAuthTimeStart]: (state, action) => {
        return {
            ...state,
            conditionAuthTimeStart: action.payload
        }
    },
    [UserManagerActionType.setConditionAuthTimeEnd]: (state, action) => {
        return {
            ...state,
            conditionAuthTimeEnd: action.payload
        }
    },
    [UserManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [UserManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    }
}, initialState)

