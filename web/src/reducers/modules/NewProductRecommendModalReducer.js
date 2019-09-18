import {handleActions} from 'redux-actions';
import {NewProductRecommendModalActionType} from '../../actionTypes';

const initialState = {
    // 画面区分 新建 / 修改
    pageType: '',
    // 商品ID
    productId: '',
    // 海报ID
    posterId: '',
    // 推广名称
    title: '',
    // 推广人
    recommend: null,
    // 备注
    remark: ''
};

export default handleActions({
    [NewProductRecommendModalActionType.setPageType]: (state, action) => {
        return {
            ...state,
            pageType: action.payload
        }
    },
    [NewProductRecommendModalActionType.setProductId]: (state, action) => {
        return {
            ...state,
            productId: action.payload
        }
    },
    [NewProductRecommendModalActionType.setPosterId]: (state, action) => {
        return {
            ...state,
            posterId: action.payload
        }
    },
    [NewProductRecommendModalActionType.setTitle]: (state, action) => {
        return {
            ...state,
            title: action.payload
        }
    },
    [NewProductRecommendModalActionType.setRecommend]: (state, action) => {
        return {
            ...state,
            recommend: action.payload
        }
    },
    [NewProductRecommendModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)