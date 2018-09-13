const httpUtil = require('../../util/HttpUtil');
import {apiHost} from '../../config/HostConfig';

import {CitySettingActionType} from '../../actionTypes';

export const getCityList = (param) => async (dispatch, getState) => {
    try {
        const url = apiHost + '/api/city';
        const res = await httpUtil.httpGet(url)

        if (res.success) {
            dispatch({type: CitySettingActionType.getCityInfo, payload: res.result})
        } else {
            swal({
                type: 'warning',
                title: '错误',
                text: '获取城市信息失败'
            })
        }
    }
    catch (err) {

        swal({
            type: 'error',
            title: '查询失败',
            text: err.msg
        })
    }
}