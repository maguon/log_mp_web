import {apiHost} from '../../config/HostConfig';
import {InquiryManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getInquiryList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().InquiryManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().InquiryManagerReducer.size;

        // 检索条件：客户ID
        const conditionUser = getState().InquiryManagerReducer.conditionUser.trim();
        // 检索条件：客户电话
        const conditionPhone = getState().InquiryManagerReducer.conditionPhone.trim();
        // 检索条件：起始城市
        const conditionStartCity = getState().InquiryManagerReducer.conditionStartCity.trim();
        // 检索条件：目的城市
        const conditionEndCity = getState().InquiryManagerReducer.conditionEndCity.trim();

        // 检索条件：服务方式
        const conditionServiceType = getState().InquiryManagerReducer.conditionServiceType;
        // 检索条件：询价时间
        const conditionCreatedOnStart = getState().InquiryManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().InquiryManagerReducer.conditionCreatedOnEnd;
        // 检索条件：状态
        const conditionInquiryStatus = getState().InquiryManagerReducer.conditionInquiryStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/queryInquiry?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：客户ID
            userId: conditionUser,
            // 检索条件：客户电话
            phone: conditionPhone,
            // 检索条件：起始城市
            routeStart: conditionStartCity,
            // 检索条件：目的城市
            routeEnd: conditionEndCity,

            // 检索条件：服务方式
            serviceType: conditionServiceType === null ? '' : conditionServiceType.value,
            // 检索条件：询价时间
            inquiryTimeStart: conditionCreatedOnStart,
            inquiryTimeEnd: conditionCreatedOnEnd,

            // 检索条件：状态
            status: conditionInquiryStatus === null ? '' : conditionInquiryStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InquiryManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: InquiryManagerActionType.getInquiryList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取询价列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};