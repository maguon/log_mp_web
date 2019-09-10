import {handleActions} from 'redux-actions';
import {EditProductRemindModalActionType} from '../../actionTypes';

const initialState = {
    // 商品提醒id
    productRemindId: '',
    // 商品提醒内容
    remark: ''
};

export default handleActions({
    [EditProductRemindModalActionType.setProductRemindId]: (state, action) => {
        return {
            ...state,
            productRemindId: action.payload
        }
    },
    [EditProductRemindModalActionType.setProductRemindRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)