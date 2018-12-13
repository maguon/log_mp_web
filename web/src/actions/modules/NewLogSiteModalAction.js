import {apiHost} from '../../config/HostConfig';
import {NewLogSiteModalActionType} from "../../actionTypes";

const logSiteSettingAction = require('../../actions/main/LogSiteSettingAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const addAutoCompleteListener = () => async (dispatch) => {
    // 给画面的地址控件追加 高德Amap Autocomplete监听
    AMap.plugin(['AMap.Autocomplete'],function(){
        let autoOptions = {
            city: "中国",
            // 画面联想输入的input的id
            input: "amapAddress"
        };
        let autocomplete = new AMap.Autocomplete(autoOptions);
        AMap.event.addListener(autocomplete, "select", function(e){
            if (e.poi.location.lng !== undefined && e.poi.location.lat !== undefined) {
                // 设定经纬度内容
                dispatch({type: NewLogSiteModalActionType.setLogSiteLon, payload: e.poi.location.lng,});
                dispatch({type: NewLogSiteModalActionType.setLogSiteLat, payload: e.poi.location.lat,});
                // aMap 中 追加 marker
                dispatch(setLocationMaker(e.poi.location.lng, e.poi.location.lat));
            } else {
                swal("无法获取该位置地理信息", "请重新输入", "warning");
            }
        });
    });
};

export const getDetailAddress = () => async (dispatch) => {
    // AMap.plugin('AMap.Geocoder', function() {
        let geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city: '中国',
            radius: 1000 //范围，默认：500
        });
        // aMap 自动填充控件 内容
        let mapAddress = amapAddress.value;
        geocoder.getLocation(mapAddress, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                // 设定经纬度内容
                dispatch({type: NewLogSiteModalActionType.setLogSiteLon, payload: result.geocodes[0].location.getLng()});
                dispatch({type: NewLogSiteModalActionType.setLogSiteLat, payload: result.geocodes[0].location.getLat()});
                // aMap 中 追加 marker
                dispatch(setLocationMaker(result.geocodes[0].location.getLng(), result.geocodes[0].location.getLat()));
            } else{
                swal("无法获取该位置地理信息", "请重新输入", "warning")
            }
        })
    // })
};

export const showMap = () => async () => {
    // 设置地图显示
    new AMap.Map("new-log-site-map", {
        resizeEnable: true,
        zoom: 13
    });
};

export const setLocationMaker = (lon, lat) => async () => {
    let marker, map = new AMap.Map("new-log-site-map", {
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
    // marker.setPosition(lnglat);
    marker.setMap(map);
    map.setFitView(marker);
};

export const saveLogSiteInfo = () => async (dispatch, getState) => {
    try {
        // 收发货地点名称
        const logSiteName = getState().NewLogSiteModalReducer.logSiteName;
        // 所在城市
        const logSiteCity = getState().NewLogSiteModalReducer.logSiteCity;
        // 地址
        const logSiteAddress = getState().NewLogSiteModalReducer.logSiteAddress;
        // 备注
        const logSiteRemark = getState().NewLogSiteModalReducer.logSiteRemark;
        // 经度
        const logSiteLon = getState().NewLogSiteModalReducer.logSiteLon;
        // 纬度
        const logSiteLat = getState().NewLogSiteModalReducer.logSiteLat;

        if (logSiteName === '' || logSiteCity == null || logSiteAddress === '' || logSiteRemark === '' || logSiteLon === '' || logSiteLat === '') {
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
            let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/address';
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newLogSiteModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(logSiteSettingAction.getLogSiteSettingList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};