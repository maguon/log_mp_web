const httpUtil = require('../../util/HttpUtil');
import {apiHost} from '../../config/HostConfig';

export const getUserList = (param) => async (dispatch, getState) => {
    try {
        const url = `${apiHost}/user`
        const res = await httpUtil.get(url)
        console.log(res);
        /*if (res.success) {
            dispatch({ type: carInfoRecordActionTypes.get_carInfoRecord_success, payload: { carInfoRecord: res.result[0] } })
        } else {
            dispatch({ type: carInfoRecordActionTypes.get_carInfoRecord_failed, payload: { errorMsg: res.msg } })
        }*/
    }
    catch (err) {
        console.log(err)
        //dispatch({ type: carInfoRecordActionTypes.get_carInfoRecord_error, payload: { errorMsg: err } })
    }
}