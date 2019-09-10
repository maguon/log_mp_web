import {apiHost} from '../../config/HostConfig';
import {NewProductModalActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');
const commonAction = require('../../actions/main/CommonAction');

// 新增商品 初期化
export const initNewProductModal = () => async (dispatch) => {
    // 取得城市列表
    dispatch(commonAction.getCityList());
    // 商品ID
    dispatch({type: NewProductModalActionType.setNewProductId, payload: ''});
    // 商品名称
    dispatch({type: NewProductModalActionType.setProductName, payload: ''});
    // 数量
    dispatch({type: NewProductModalActionType.setQuantity, payload: ''});
    // 城市
    dispatch({type: NewProductModalActionType.setProductCity, payload: null});
    // 生产日期
    dispatch({type: NewProductModalActionType.setProductionDate, payload: ''});
    // 销售类型
    dispatch({type: NewProductModalActionType.setProductSaleType, payload: null});
    // 定金
    dispatch({type: NewProductModalActionType.setEarnestMoney, payload: 0});
    // 指导价
    dispatch({type: NewProductModalActionType.setOriginalPrice, payload: ''});
    // 实际售价
    dispatch({type: NewProductModalActionType.setActualPrice, payload: ''});
};

export const addProduct = () => async (dispatch, getState) => {
    try {
        // 商品管理详细：商品名称
        const productName = getState().NewProductModalReducer.productName.trim();
        // 商品管理详细：数量
        const quantity = getState().NewProductModalReducer.quantity;
        // 商品管理详细：城市
        const city = getState().NewProductModalReducer.city;
        // 商品管理详细：生产日期
        const productionDate = getState().NewProductModalReducer.productionDate;
        // 商品管理详细：销售类型
        const productSaleType = getState().NewProductModalReducer.productSaleType;
        // 商品管理详细：定金
        const earnestMoney = getState().NewProductModalReducer.earnestMoney;
        // 商品管理详细：指导价
        const originalPrice = getState().NewProductModalReducer.originalPrice;
        // 商品管理详细：实际售价
        const actualPrice = getState().NewProductModalReducer.actualPrice;

        if (productName === '' || quantity === '' || city == null || productionDate === '' || productSaleType == null || originalPrice === '' || actualPrice === '') {
            swal('保存失败', '请输入完整的商品信息！', 'warning');
        } else {
            if (productSaleType.value === sysConst.PRODUCT_SALE_TYPE[1].value && earnestMoney === '') {
                swal('保存失败', '请输入定金金额！', 'warning');
                return;
            }
            const params = {
                commodityName: productName,
                quantity: quantity,
                cityId: city.value,
                productionDate: productionDate,
                type: productSaleType.value,
                earnestMoney: productSaleType.value === sysConst.PRODUCT_SALE_TYPE[1].value ? earnestMoney : 0,
                originalPrice: originalPrice,
                actualPrice: actualPrice
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/commodity';
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newProductModal').modal('close');
                swal("保存成功", "", "success");
                dispatch({type: NewProductModalActionType.setNewProductId, payload: res.id});
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};