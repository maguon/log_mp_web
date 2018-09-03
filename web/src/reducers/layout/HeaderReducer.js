import { handleActions } from 'redux-actions';
import {HeaderActionType} from '../../actionTypes';
const initialState = {
    userInfo :{}
}

export default handleActions({
    [HeaderActionType.getUserInfo]: (state, action) => {

        return {
            ...state,
            userInfo: action.payload
        }
    }} , initialState)

