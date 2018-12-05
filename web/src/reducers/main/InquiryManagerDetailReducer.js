import {handleActions} from 'redux-actions';
import {InquiryManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 询价信息
    inquiryInfo: [],
    // 询价车辆列表
    inquiryCarArray: [],
};

export default handleActions({
    [InquiryManagerDetailActionType.getInquiryInfo]: (state, action) => {
        return {
            ...state,
            inquiryInfo: action.payload
        }
    },
    [InquiryManagerDetailActionType.getInquiryCarList]: (state, action) => {
        return {
            ...state,
            inquiryCarArray: action.payload
        }
    }
}, initialState)