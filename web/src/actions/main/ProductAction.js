import {apiHost} from '../../config/HostConfig';
import {ProductActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getProductList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().ProductReducer.start;
        // 检索条件：每页数量
        const size = getState().ProductReducer.size;

        // 检索条件：商品名称
        const conditionProduct = getState().ProductReducer.conditionProduct;
        // 检索条件：城市
        const conditionCity = getState().ProductReducer.conditionCity;
        // 检索条件：销售类型
        const conditionSaleType = getState().ProductReducer.conditionSaleType;
        // 检索条件：销售状态
        const conditionProductSaleStatus = getState().ProductReducer.conditionProductSaleStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/commodity?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            commodityId: conditionProduct === null ? '' : conditionProduct.value,
            cityId: conditionCity === null ? '' : conditionCity.value,
            type: conditionSaleType === null ? '' : conditionSaleType.value,
            status: conditionProductSaleStatus === null ? '' : conditionProductSaleStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ProductActionType.setDataSize, payload: res.result.length});
            dispatch({type: ProductActionType.getProductList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取商品列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};


export const changeProductShowStatus = (id, showStatus) => async (dispatch) => {
    swal({
        title: showStatus === sysConst.SALE_STATUS[1].value ? "确定上架该商品？" : "确定下架该商品？",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            // 状态
            let newStatus = 0;
            if (showStatus === 0) {
                newStatus = 1
            } else {
                newStatus = 0
            }
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/commodity/' + id + '/showStatus/' + newStatus;
            const res = await httpUtil.httpPut(url, {});
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getProductList());
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};