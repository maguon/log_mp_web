const httpUtil = require('../../util/HttpUtil');
import {apiHost} from '../../config/HostConfig';

import {CitySettingActionType} from '../../actionTypes';

export const getCityList = (param) => async (dispatch, getState) => {
    try {
        console.log(getState().HeaderReducer.userInfo);
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

export const addCity = (param) => async (dispatch, getState) => {
    try {
        const userId = getState().HeaderReducer.userInfo.id;
        const params = {
            cityName : getState().CitySettingReducer.cityName
        }
        const url = apiHost + '/api/user/'+userId+'/city';
        const res = await httpUtil.httpPost(url,params)

        if (res.success) {
            dispatch({type: CitySettingActionType.getCityInfo, payload: getState().CitySettingReducer.cityArray})
            dispatch({type: CitySettingActionType.setCityFormFlag, payload: false})
            dispatch({type: CitySettingActionType.setCityName, payload: ''})
        } else {
            swal({
                type: 'warning',
                title: '错误',
                text: '新增城市失败'
            })
        }
    }
    catch (err) {

        swal({
            type: 'error',
            title: '操作失败',
            text: err.message
        })
    }
}