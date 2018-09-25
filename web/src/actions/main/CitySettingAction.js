import {apiHost} from '../../config/HostConfig';
import {CitySettingActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');

export const getCityList = () => async (dispatch, getState) => {
    try {
        const url = apiHost + '/api/city';
        const res = await httpUtil.httpGet(url);

        if (res.success) {
            dispatch({type: CitySettingActionType.getCityInfo, payload: res.result})
        } else {
            swal({
                type: 'warning',
                title: '获取城市信息失败',
                text: res.msg
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
};

export const addCity = (param) => async (dispatch, getState) => {
    try {
        const cityName = getState().CitySettingReducer.cityName;
        if (cityName === '') {
            swal({
                type: 'warning',
                title: '添加失败',
                text: '请输入城市名称！'
            })
        } else {
            const userId = getState().HeaderReducer.userInfo.id;
            const params = {
                cityName: cityName
            };
            const url = apiHost + '/api/user/' + userId + '/city';
            const res = await httpUtil.httpPost(url, params);

            if (res.success) {
                dispatch({type: CitySettingActionType.getCityInfo, payload: getState().CitySettingReducer.cityArray});
                dispatch({type: CitySettingActionType.setCityFormFlag, payload: false});
                dispatch({type: CitySettingActionType.setCityName, payload: ''});
            } else {
                swal({
                    type: 'warning',
                    title: '添加失败',
                    text: res.msg
                })
            }
        }
    }
    catch (err) {
        swal({
            type: 'error',
            title: '操作失败',
            text: err.message
        })
    }
};