import {apiHost, fileHost} from '../../config/HostConfig';
import {ProductDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const commonUtil = require('../../util/CommonUtil');
const sysConst = require('../../util/SysConst');

export const getProductInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/commodity?commodityId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ProductDetailActionType.getProductInfo, payload: res.result});
            if (res.result.length > 0) {
                // 初期化数据
                dispatch({type: ProductDetailActionType.setProductId, payload: res.result[0].id});
                dispatch({type: ProductDetailActionType.setProductName, payload: res.result[0].commodity_name});
                dispatch({type: ProductDetailActionType.setQuantity, payload: res.result[0].quantity});
                dispatch({type: ProductDetailActionType.setProductCity, payload: {value: res.result[0].city_id, label: res.result[0].city_name}});
                dispatch({type: ProductDetailActionType.setProductionDate, payload: res.result[0].production_date});
                dispatch({type: ProductDetailActionType.setProductSaleType, payload: {value: res.result[0].type, label: commonUtil.getJsonValue(sysConst.PRODUCT_SALE_TYPE, res.result[0].type)}});
                dispatch({type: ProductDetailActionType.setEarnestMoney, payload: res.result[0].earnest_money});
                dispatch({type: ProductDetailActionType.setOriginalPrice, payload: res.result[0].original_price});
                dispatch({type: ProductDetailActionType.setActualPrice, payload: res.result[0].actual_price});
                // TAB2：商品基本图片
                dispatch({type: ProductDetailActionType.setProductImg, payload: res.result[0].image});
                // TAB2：商品描述图片
                if (res.result[0].pord_images == null || res.result[0].pord_images === ""){
                    dispatch({type: ProductDetailActionType.setProductDescImgList, payload: []});
                } else {
                    dispatch({type: ProductDetailActionType.setProductDescImgList, payload: res.result[0].pord_images.split(",")});
                }

                // TAB3：商品介绍
                dispatch({type: ProductDetailActionType.setProductDes, payload: res.result[0].info});
            } else {
                swal('未获取商品信息，请重新查询', res.msg, 'warning');
            }
        } else if (res.success === false) {
            swal('获取商品信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveProductInfo = () => async (dispatch, getState) => {
    // 商品管理详细：商品id
    const productId = getState().ProductDetailReducer.productId;

    // 商品管理详细：商品名称
    const productName = getState().ProductDetailReducer.productName.trim();
    // 商品管理详细：数量
    const quantity = getState().ProductDetailReducer.quantity;
    // 商品管理详细：城市
    const city = getState().ProductDetailReducer.city;
    // 商品管理详细：生产日期
    const productionDate = getState().ProductDetailReducer.productionDate;
    // 商品管理详细：销售类型
    const productSaleType = getState().ProductDetailReducer.productSaleType;
    // 商品管理详细：定金
    const earnestMoney = getState().ProductDetailReducer.earnestMoney;
    // 商品管理详细：指导价
    const originalPrice = getState().ProductDetailReducer.originalPrice;
    // 商品管理详细：实际售价
    const actualPrice = getState().ProductDetailReducer.actualPrice;
    try {
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
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/commodity/' + productId + '/commodityInfo';
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                swal("保存成功", "", "success");
                // 修改成功后，刷新页面
                dispatch(getProductInfo(productId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const changeProductStatus = () => async (dispatch, getState) => {
    try {
        // 商品管理详细：商品id
        const productId = getState().ProductDetailReducer.productId;
        swal({
            title: "确认该商品已售罄？",
            text: "确认后，将不能再修改状态！",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(async function (isConfirm) {
            if (isConfirm && isConfirm.value === true) {
                // 基本url
                let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    + '/commodity/' + productId  + '/status/' + sysConst.PRODUCT_SALE_STATUS[2].value;
                let res = await httpUtil.httpPut(url, {});
                if (res.success === true) {
                    swal("修改成功", "", "success");
                    // 修改成功后，刷新页面
                    dispatch(getProductInfo(productId));
                } else if (res.success === false) {
                    swal('修改失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const uploadProductImg = (type, formData) => (dispatch) => {
    try {
        // 基本url
        let url = fileHost + '/api/user/' + localUtil.getSessionItem(sysConst.USER_ID) + '/image?imageType=1';
        httpUtil.httpAsyncFormPost(url, formData, function (result) {
            if (result.success === true) {
                if (type === "base") {
                    dispatch(saveProductImg(result.imageId));
                } else {
                    dispatch(saveProductDescImg('add',result.imageId));
                }
            } else {
                swal('上传图片失败', result.msg, 'warning');
            }
        }, function (err) {
            swal('上传图片失败', err.msg, 'warning');
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveProductImg = (imageId) => async (dispatch, getState) => {
    try {
        // 商品管理详细：商品id
        let productId = getState().ProductDetailReducer.productId;

        if (productId === '') {
            swal('修改失败', '未找到对应的商品信息，请重新检索！', 'warning');
        } else {
            const params = {
                image: imageId
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/commodity/' + productId + '/image';
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                swal("保存成功", "", "success");
                // 修改成功后，刷新页面
                dispatch(getProductInfo(productId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveProductDescImg = (opFlag, imageId) => async (dispatch, getState) => {
    try {
        // 商品id
        let productId = getState().ProductDetailReducer.productId;

        // 商品描述图片
        let productDescImgList = getState().ProductDetailReducer.productDescImgList;

        // 添加新描述图片
        if (opFlag === 'add') {
            productDescImgList.push(imageId);
        } else {
            // 删除描述图片
            let index = productDescImgList.indexOf(imageId);
            if (index > -1) {
                productDescImgList.splice(index, 1);
            }
        }

        if (productId === '') {
            swal('修改失败', '未找到对应的商品信息，请重新检索！', 'warning');
        } else {
            const params = {
                prodImages: productDescImgList.join(',')
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/commodity/' + productId + '/prodImages';
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                swal("保存成功", "", "success");
                // 修改成功后，刷新页面
                dispatch(getProductInfo(productId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveProductDesc = () => async (dispatch, getState) => {
    try {
        // 商品管理详细：商品id
        let productId = getState().ProductDetailReducer.productId;
        // 商品介绍：详细介绍
        const productDes = getState().ProductDetailReducer.productDes;

        if (productId === '') {
            swal('修改失败', '未找到对应的商品信息，请重新检索！', 'warning');
        } else {
            const params = {
                info: productDes
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/commodity/' + productId + '/info';
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                swal("保存成功", "", "success");
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};