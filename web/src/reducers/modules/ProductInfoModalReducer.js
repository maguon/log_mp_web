import {handleActions} from 'redux-actions';
import {ProductInfoModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 商品基本信息
    productInfo: []
};

export default handleActions({
    [ProductInfoModalActionType.getProductInfo]: (state, action) => {
        return {
            ...state,
            productInfo: action.payload
        }
    }
}, initialState)