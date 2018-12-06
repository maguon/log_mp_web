import {apiHost} from '../../config/HostConfig';
import {SupplierSettingActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getSupplierSettingList = () => async (dispatch, getState) => {
    try {
        // 检索条件：供应商简称
        const conditionSupplierShort = getState().SupplierSettingReducer.conditionSupplierShort.trim();
        // 检索条件：供应商全称
        const conditionSupplierName = getState().SupplierSettingReducer.conditionSupplierName.trim();
        // 检索条件：运输方式
        const conditionTransportMode = getState().SupplierSettingReducer.conditionTransportMode;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/supplier?start=0';

        // 检索条件
        let conditionsObj = {
            // 检索条件：供应商简称
            supplierShort: conditionSupplierShort,
            // 检索条件：供应商全称
            supplierFull: conditionSupplierName,
            // 检索条件：运输方式
            transType: conditionTransportMode === null ? '' : conditionTransportMode.value
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: SupplierSettingActionType.getSupplierList, payload: res.result})
        } else if (res.success === false) {
            swal('获取供应商列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};


export const addCity = () => async (dispatch, getState) => {
    try {
        const cityName = getState().CitySettingReducer.cityName.trim();
        if (cityName === '') {
            swal('添加失败', '请输入城市名称！', 'warning');
        } else {
            const params = {
                cityName: cityName
            };
            const url = apiHost + '/api/user/' + localUtil.getLocalItem(sysConst.USER_ID) + '/city';
            const res = await httpUtil.httpPost(url, params);

            if (res.success === true) {
                swal("添加成功", "", "success");
                // 恢复添加前画面样子
                dispatch({type: SupplierSettingActionType.setCityFormFlag, payload: false});
                dispatch({type: SupplierSettingActionType.setCityName, payload: ''});
                // 添加成功后，重新检索画面数据
                dispatch(getCityList());
            } else if (res.success === false) {
                swal('添加失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};