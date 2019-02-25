import {handleActions} from 'redux-actions';
import {AdvertisingModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 推荐人ID
    recommendId: '',
    // 广告语
    advertisement: ''
};

export default handleActions({
    [AdvertisingModalActionType.setRecommendId]: (state, action) => {
        return {
            ...state,
            recommendId: action.payload
        }
    },
    [AdvertisingModalActionType.setAdvertisement]: (state, action) => {
        return {
            ...state,
            advertisement: action.payload
        }
    }
}, initialState)