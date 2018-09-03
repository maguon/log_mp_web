const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
import {apiHost} from '../../config/HostConfig';
const SysConst = require('../../util/SysConst');
import {HeaderActionType} from '../../actionTypes';

export const getUserDetail = (params) => async (dispatch, getState) => {
    try {
        const url = apiHost+'/api/user?userId='+params.userId;
        const res = await httpUtil.httpGet(url)
        if(res && res.success){
            dispatch({type:HeaderActionType.getUserInfo,payload:res.result[0]})
        }else{
            dispatch({type:HeaderActionType.getUserInfo,payload:{}})
        }

    } catch (err) {
        dispatch({type:HeaderActionType.getUserInfo,payload:{}})
    }
}




export const checkUser = () =>{
    
}

export const logout =()=> {
    localUtil.removeLocalItem(SysConst.USER_ID);
    localUtil.removeLocalItem(SysConst.USER_TYPE);
    localUtil.removeLocalItem(SysConst.AUTH_TOKEN);
    window.location.href='/login.html';
}