import {handleActions} from 'redux-actions';
import {EnquiryActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    modalIsOpen: false
};

export default handleActions(
    {
        [EnquiryActionType.enquiryModal]: (state, action) => {
            console.log('EnquiryReducer inner');
            return {
                ...state,
                modalIsOpen: action.payload
            }
        }
    }, initialState)