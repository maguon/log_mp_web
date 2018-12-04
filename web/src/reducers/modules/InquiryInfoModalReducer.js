import {handleActions} from 'redux-actions';
import {InquiryInfoModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 询价信息
    inquiryInfo: [],
    // 询价车辆列表
    inquiryCarArray: [],
};

export default handleActions({
    [InquiryInfoModalActionType.getInquiryInfo]: (state, action) => {
        return {
            ...state,
            inquiryInfo: action.payload
        }
    },
    [InquiryInfoModalActionType.getInquiryCarList]: (state, action) => {
        return {
            ...state,
            inquiryCarArray: action.payload
        }
    }
}, initialState)