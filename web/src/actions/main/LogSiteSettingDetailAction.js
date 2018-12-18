import {apiHost} from '../../config/HostConfig';
import {LogSiteSettingDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getLogSiteInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/address?addressId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                // 组装react-select 需要的类型
                let selectedCity = {
                    value: res.result[0].city_id,
                    label: res.result[0].city_name
                };

                dispatch({type: LogSiteSettingDetailActionType.setLogSiteId, payload: res.result[0].id});
                dispatch({type: LogSiteSettingDetailActionType.setLogSiteName, payload: res.result[0].name});
                dispatch({type: LogSiteSettingDetailActionType.setLogSiteCity, payload: selectedCity});
                dispatch({type: LogSiteSettingDetailActionType.setLogSiteAddress, payload: res.result[0].address});
                dispatch({type: LogSiteSettingDetailActionType.setLogSiteRemark, payload: res.result[0].mark});
                // 经纬度
                dispatch({type: LogSiteSettingDetailActionType.setLogSiteLon, payload: res.result[0].lon});
                dispatch({type: LogSiteSettingDetailActionType.setLogSiteLat, payload: res.result[0].lat});

                // 设置地图显示
                new AMap.Map("log-site-map", {
                    resizeEnable: true,
                    zoom: 13
                });

                // aMap 中 追加 marker
                if (res.result[0].lon !== null && res.result[0].lat !== null) {
                    dispatch(setLocationMaker(res.result[0].lon, res.result[0].lat));
                }
            } else {
                swal('未获取收发货地点详细信息', '', 'warning');
            }
        } else if (res.success === false) {
            swal('获取收发货地点详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const addAutoCompleteListener = () => async (dispatch) => {
    // 给画面的地址控件追加 高德Amap Autocomplete监听
    AMap.plugin(['AMap.Autocomplete'],function(){
        let autoOptions = {
            city: "中国",
            // 画面联想输入的input的id
            input: "aMapAutoComplete"
        };
        let autocomplete = new AMap.Autocomplete(autoOptions);
        // 控件追加监听
        AMap.event.addListener(autocomplete, "select", function(e){
            dispatch({type: LogSiteSettingDetailActionType.setLogSiteAddress, payload: e.poi.name});
            if (e.poi.location.lng !== undefined && e.poi.location.lat !== undefined) {
                // 设定经纬度内容
                dispatch({type: LogSiteSettingDetailActionType.setLogSiteLon, payload: e.poi.location.lng});
                dispatch({type: LogSiteSettingDetailActionType.setLogSiteLat, payload: e.poi.location.lat});
                // aMap 中 追加 marker
                dispatch(setLocationMaker(e.poi.location.lng, e.poi.location.lat));
            } else {
                swal("无法获取该位置地理信息", "请重新输入", "warning");
            }
        });
    });
};

export const getDetailAddress = () => async (dispatch) => {
    let geocoder = new AMap.Geocoder({
        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        city: '中国',
        radius: 1000 //范围，默认：500
    });
    // aMap 自动填充控件 内容
    let mapAddress = aMapAutoComplete.value;
    geocoder.getLocation(mapAddress, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            // 设定经纬度内容
            dispatch({type: LogSiteSettingDetailActionType.setLogSiteLon, payload: result.geocodes[0].location.getLng()});
            dispatch({type: LogSiteSettingDetailActionType.setLogSiteLat, payload: result.geocodes[0].location.getLat()});
            // aMap 中 追加 marker
            dispatch(setLocationMaker(result.geocodes[0].location.getLng(), result.geocodes[0].location.getLat()));
        } else{
            swal("无法获取该位置地理信息", "请重新输入", "warning")
        }
    })
};

export const setLocationMaker = (lon, lat) => async () => {
    let marker, map = new AMap.Map("log-site-map", {
        resizeEnable: true,
        center: [lon, lat],
        zoom: 17
    });
    if (marker) {
        return;
    }
    marker = new AMap.Marker({
        position: [lon, lat]
    });
    marker.setMap(map);
    map.setFitView(marker);
};

export const saveLogSiteInfo = () => async (dispatch, getState) => {
    try {
        // 收发货地点ID
        const logSiteId = getState().LogSiteSettingDetailReducer.logSiteId;
        // 收发货地点名称
        const logSiteName = getState().LogSiteSettingDetailReducer.logSiteName;
        // 所在城市
        const logSiteCity = getState().LogSiteSettingDetailReducer.logSiteCity;
        // 地址
        const logSiteAddress = getState().LogSiteSettingDetailReducer.logSiteAddress;
        // 备注
        const logSiteRemark = getState().LogSiteSettingDetailReducer.logSiteRemark;
        // 经度
        const logSiteLon = getState().LogSiteSettingDetailReducer.logSiteLon;
        // 纬度
        const logSiteLat = getState().LogSiteSettingDetailReducer.logSiteLat;

        if (logSiteName === '' || logSiteCity == null || logSiteCity.value === undefined || logSiteAddress === '' || logSiteLon === '' || logSiteLat === '') {
            swal('保存失败', '请输入完整的收发货地点信息！', 'warning');
        } else {
            const params = {
                name: logSiteName,
                city: logSiteCity.value,
                address: logSiteAddress,
                mark: logSiteRemark,
                lon: logSiteLon,
                lat: logSiteLat
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/address/' + logSiteId + '/addressByAdmin';
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(getLogSiteInfo(logSiteId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getLogSiteContactList = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/addressContact?addressId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: LogSiteSettingDetailActionType.getLogSiteContactList, payload: res.result});
        } else if (res.success === false) {
            swal('获取收发货地点联系方式列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const deleteLogSiteContact = (logSiteId, contactId) => async (dispatch) => {
    try {
        swal({
            title: "",
            text: "确定删除该联系方式？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#724278',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(async function (isConfirm) {
            if (isConfirm && isConfirm.value === true) {
                // 基本检索URL
                const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    // + '/supplier/' + logSiteId
                    + '/addressContact/' + contactId;
                const res = await httpUtil.httpDelete(url);
                if (res.success === true) {
                    dispatch(getLogSiteContactList(logSiteId));
                } else if (res.success === false) {
                    swal('删除收发货地点联系方式失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};