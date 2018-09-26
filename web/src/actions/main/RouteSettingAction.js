import {apiHost} from '../../config/HostConfig';
import {RouteSettingActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');

export const getAllCityList = () => async (dispatch) => {
    try {
        const url = apiHost + '/api/city';
        const res = await httpUtil.httpGet(url);

        if (res.success) {
            dispatch({type: RouteSettingActionType.getCityArray, payload: res.result});
        } else {
            swal({
                type: 'warning',
                title: '获取城市信息失败',
                text: res.msg
            })
        }
    } catch (err) {
        swal({
            type: 'error',
            title: '操作失败',
            text: err.message
        })
    }
};

export const getStartCityList = (cityName) => async (dispatch, getState) => {
    try {
        console.log('cityName',cityName);
        let condition = '';
        // 没有输入城市的时候
        if (typeof cityName !== 'undefined' && cityName !== '') {
            condition = '?cityName=' + cityName;
        }

        const url = apiHost + '/api/city' + condition;
        console.log('url ',url);
        const res = await httpUtil.httpGet(url);

        if (res.success) {
            dispatch({type: RouteSettingActionType.getStartCityList, payload: res.result})
        } else {
            swal({
                type: 'warning',
                title: '获取城市信息失败',
                text: res.msg
            })
        }
    } catch (err) {
        swal({
            type: 'error',
            title: '操作失败',
            text: err.message
        })
    }
};

export const addCity = () => async (dispatch, getState) => {
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
                // 恢复添加前画面样子
                dispatch({type: RouteSettingActionType.setCityFormFlag, payload: false});
                dispatch({type: RouteSettingActionType.setCityName, payload: ''});
                // 添加成功后，重新检索画面数据
                dispatch(getCityList());
            } else {
                swal({
                    type: 'warning',
                    title: '添加失败',
                    text: res.msg
                })
            }
        }
    } catch (err) {
        swal({
            type: 'error',
            title: '操作失败',
            text: err.message
        })
    }
};