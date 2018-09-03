import { handleActions } from 'redux-actions';
import {LoginActionType} from '../../actionTypes';
const initialState = {
    data: {
        mobile: '13322221111',
        password:''
    }
}
export default handleActions(
    {
        [LoginActionType.loginInit]: (state, action) => {
            console.log(state)
            console.log(action)
            return {
                ...state,
                data: action.payload
            }
        }
    } , initialState)