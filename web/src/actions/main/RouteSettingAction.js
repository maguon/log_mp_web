import {apiHost} from '../../config/HostConfig';
import {RouteSettingActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getAllCityList = () => async (dispatch) => {
    try {
        const url = apiHost + '/api/city';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 左侧 城市列表
            dispatch({type: RouteSettingActionType.getStartCityArray, payload: res.result});
            // 右侧 城市列表
            dispatch({type: RouteSettingActionType.getEndCityArray, payload: res.result});
        } else if (res.success === false) {
            swal('获取城市信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getRouteCityList = (cityId) => async (dispatch, getState) => {
    try {
        // 检索条件
        let condition = '';
        if (typeof cityId !== 'undefined' && cityId !== '') {
            condition = '?routeStartId=' + cityId;
        }
        // 检索url
        const url = apiHost + '/api/route' + condition;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 路线结果列表
            let routeList = res.result;

            // 新的右侧城市列表(包含路线信息)
            let newEndCityList = [];
            // 临时单个城市信息
            let cityItem = {};
            // 遍历所有的城市
            getState().RouteSettingReducer.endCityArray.map(function (item) {
                // 当没有路线时，城市信息
                if (routeList.length === 0) {
                    cityItem = {
                        id: item.id,
                        city_name: item.city_name,
                        status: item.status,
                        route_flag: false,
                        route_id: '',
                        distance: ''
                    };
                }
                // 遍历路线
                for (let i = 0; i < routeList.length; i++) {
                    // 路线中的开始城市为 检索城市时，路线中的结束城市和遍历城市相同，则为：可用路线
                    if (routeList[i].route_start_id === cityId && routeList[i].route_end_id === item.id) {
                        cityItem = {
                            id: item.id,
                            city_name: item.city_name,
                            status: item.status,
                            route_flag: true,
                            route_id: routeList[i].route_id,
                            distance: routeList[i].distance
                        };
                        // 删除当前路线，减少开销
                        routeList.splice(i, 1);
                        break;

                        // 路线中的结束城市为 检索城市时，路线中的开始城市和遍历城市相同，则为：可用路线
                    } else if (routeList[i].route_end_id === cityId && routeList[i].route_start_id === item.id) {
                        cityItem = {
                            id: item.id,
                            city_name: item.city_name,
                            status: item.status,
                            route_flag: true,
                            route_id: routeList[i].route_id,
                            distance: routeList[i].distance
                        };
                        // 删除当前路线，减少开销
                        routeList.splice(i, 1);
                        break;

                        // 非可用路线，标记flag false
                    } else {
                        cityItem = {
                            id: item.id,
                            city_name: item.city_name,
                            status: item.status,
                            route_flag: false,
                            route_id: '',
                            distance: ''
                        };
                    }
                }
                // 将城市信息 追加到 新城市列表
                newEndCityList.push(cityItem);
            });
            dispatch({type: RouteSettingActionType.getEndCityArray, payload: newEndCityList});
        } else if (res.success === false) {
            swal('获取路线失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const modifyRoute = () => async (dispatch, getState) => {
    try {
        // 公里数
        const distance = getState().RouteSettingReducer.distance;
        // 未输入公里数时，提示失败
        if (distance === '' || distance <= 0 || distance >= 100000000) {
            // 不合理(9.9.9)或小于等于0的 数字输入时，提示错误信息，并修改为0。(修改为空，数字控件不变化)
            dispatch(RouteSettingActionType.setDistance(0));
            $("#distance-label").addClass('active');
            swal('线路设置失败', '请正确输入线路公里数！', 'warning');
        } else {
            // 追加/更新 数据
            const params = {
                routeStartId: getState().RouteSettingReducer.startCityId,
                routeStart: getState().RouteSettingReducer.startCityName,
                routeEndId: getState().RouteSettingReducer.endCityId,
                routeEnd: getState().RouteSettingReducer.endCityName,
                distance: distance
            };

            // url
            const url = apiHost + '/api/user/' + localUtil.getLocalItem(sysConst.USER_ID) + '/route';

            // http response
            let res;

            // 编辑画面时，进行put
            if (getState().RouteSettingReducer.modifyFlag) {
                res = await httpUtil.httpPut(url + '/' + getState().RouteSettingReducer.routeId, params);
            } else {
                res = await httpUtil.httpPost(url, params);
            }

            if (res.success === true) {
                swal("线路设置成功", "", "success");
                // 成功后关闭 模态
                $('#routeModal').modal('close');
                // 添加成功后，重新检索画面数据
                dispatch(getRouteCityList(getState().RouteSettingReducer.startCityId));
            } else if (res.success === false) {
                swal('线路设置失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};