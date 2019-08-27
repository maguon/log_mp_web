import {apiHost, fileHost} from '../../config/HostConfig';
import {ProductDetailActionType} from '../../actionTypes';

const productAction = require('../../actions/main/ProductAction');
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
                dispatch({type: ProductDetailActionType.setProductName, payload: res.result[0].commodity_name});
                dispatch({type: ProductDetailActionType.setQuantity, payload: res.result[0].quantity});
                dispatch({type: ProductDetailActionType.setProductCity, payload: {value: res.result[0].city_id, label: res.result[0].city_name}});
                dispatch({type: ProductDetailActionType.setProductionDate, payload: res.result[0].production_date});
                dispatch({type: ProductDetailActionType.setProductSaleType, payload: {value: res.result[0].type, label: commonUtil.getJsonValue(sysConst.PRODUCT_SALE_TYPE, res.result[0].type)}});
                dispatch({type: ProductDetailActionType.setEarnestMoney, payload: res.result[0].earnest_money});
                dispatch({type: ProductDetailActionType.setOriginalPrice, payload: res.result[0].original_price});
                dispatch({type: ProductDetailActionType.setActualPrice, payload: res.result[0].actual_price});
                dispatch({type: ProductDetailActionType.setProductImg, payload: res.result[0].image});
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
    // 商品管理详细：画面类型(新建/编辑)
    const pageType = getState().ProductDetailReducer.pageType;
    // 商品管理详细：商品信息
    const productInfo = getState().ProductDetailReducer.productInfo;

    // 商品管理详细：商品名称
    const productName = getState().ProductDetailReducer.productName.trim();
    // 商品管理详细：商品类型
    const productType = getState().ProductDetailReducer.productType;
    // 商品管理详细：原价
    const originalPrice = getState().ProductDetailReducer.originalPrice;
    // 商品管理详细：单价
    const unitPrice = getState().ProductDetailReducer.unitPrice;
    // 商品管理详细：运费
    const freight = getState().ProductDetailReducer.freight;
    // 商品管理详细：备注
    const remark = getState().ProductDetailReducer.remark;
    try {
        if (productName === '' || productType == null || originalPrice === '' || unitPrice === '' || freight === '') {
            swal('保存失败', '请输入完整的商品信息！', 'warning');
        } else {
            const params = {
                productName: productName,
                originalPrice: originalPrice,
                unitPrice: unitPrice,
                freight: freight,
                type: productType.value,
                remark: remark
            };
            // 基本url
            // let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/product';

            let url = 'stg.myxxjs.com:9201/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/product';
            let res = null;
            // 编辑时,需要拼接 商品信息 中的商品id
            if (pageType === 'edit') {
                url = url + '/' + productInfo[0].id + '/productInfo';
                res = await httpUtil.httpPut(url, params);
            } else {
                // 新建时
                res = await httpUtil.httpPost(url, params);
            }
            if (res.success === true) {
                // 新建成功时，要自动跳转到下一个TAB
                if (pageType === 'new') {
                    dispatch({type: ProductDetailActionType.setNewProductId, payload: res.id});
                    $("ul.tabs li").removeClass("disabled");
                    $('ul.tabs').tabs('select_tab', 'tab-img');
                    $("ul.tabs li").addClass("disabled");
                } else {
                    swal("保存成功", "", "success");
                }
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
        // 商品管理详细：商品信息
        const productInfo = getState().ProductDetailReducer.productInfo;
        if (productInfo.length === 0) {
            swal('修改失败', '未找到对应的商品信息，请重新检索！', 'warning');
        } else {
            swal({
                title: "",
                text: productInfo[0].status === 1 ? "确认将当前商品下架？" : "确认将当前商品重新上架？",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async function (isConfirm) {
                if (isConfirm && isConfirm.value === true) {
                    // 状态
                    let status = 0;
                    if (productInfo[0].status === 0) {
                        // 启用
                        status = 1
                    } else {
                        // 停用
                        status = 0
                    }
                    const params = {
                        status: status
                    };
                    // 基本url
                    // let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    //     + '/product/' + productInfo[0].id  + '/status';



                    let url =  'stg.myxxjs.com:9201/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                        + '/product/' + productInfo[0].id  + '/status';
                    let res = await httpUtil.httpPut(url, params);

                    if (res.success === true) {
                        swal("修改成功", "", "success");
                        // 修改成功后，刷新页面
                        dispatch(getProductInfo(productInfo[0].id));
                    } else if (res.success === false) {
                        swal('修改失败', res.msg, 'warning');
                    }
                }
            });
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const uploadProductImg = (formData) => (dispatch) => {
    try {
        // 基本url
        let url = fileHost + '/api/user/' + localUtil.getSessionItem(sysConst.USER_ID) + '/image?imageType=1';
        httpUtil.httpAsyncFormPost(url, formData, function (result) {
            if (result.success === true) {
                // 上传图片成功后，刷新画面显示图片
                dispatch({type: ProductDetailActionType.setProductImg, payload: result.imageId});
                dispatch(saveProductImg());
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

export const saveProductImg = () => async (dispatch, getState) => {
    try {
        // 商品管理详细：画面类型(新建/编辑)
        const pageType = getState().ProductDetailReducer.pageType;

        // 商品管理详细：商品信息
        const productInfo = getState().ProductDetailReducer.productInfo;
        // 商品管理详细：新建商品id
        let productId = getState().ProductDetailReducer.newProductId;

        // 商品管理详细：商品照片id
        let productImgId = getState().ProductDetailReducer.productImg;

        if (pageType === 'edit' && productInfo.length === 0) {
            swal('修改失败', '未找到对应的商品信息，请重新检索！', 'warning');
        } else {
            // 如果是编辑画面，则使用检索商品信息中的 商品ID
            if (pageType === 'edit') {
                productId = productInfo[0].id;
            }
            const params = {
                img: productImgId
            };
            // 基本url
            // let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            //     + '/product/' + productId + '/productImg';


            let url = 'stg.myxxjs.com:9201/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/product/' + productId + '/productImg';
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                // if (pageType === 'new') {
                //     $("ul.tabs li").removeClass("disabled");
                //     $('ul.tabs').tabs('select_tab', 'tab-desc');
                //     $("ul.tabs li").addClass("disabled");
                // } else {
                //     swal("保存成功", "", "success");
                // }
                swal("保存成功", "", "success");
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
        // 商品管理详细：画面类型(新建/编辑)
        const pageType = getState().ProductDetailReducer.pageType;

        // 商品管理详细：商品信息
        const productInfo = getState().ProductDetailReducer.productInfo;
        // 商品管理详细：新建商品id
        let productId = getState().ProductDetailReducer.newProductId;

        // 商品介绍：详细介绍
        const productDes = getState().ProductDetailReducer.productDes;

        if (pageType === 'edit' && productInfo.length === 0) {
            swal('修改失败', '未找到对应的商品信息，请重新检索！', 'warning');
        } else {
            // 如果是编辑画面，则使用检索商品信息中的 商品ID
            if (pageType === 'edit') {
                productId = productInfo[0].id;
            }
            const params = {
                productRemark: productDes
            };
            // 基本url
            // let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/product/' + productId + '/productRemark';


            let url = 'stg.myxxjs.com:9201/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/product/' + productId + '/productRemark';
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                swal("保存成功", "", "success");
                // 新建成功时，回到主画面，显示详细列表
                if (pageType === 'new') {
                    dispatch(productAction.getProductList());
                }
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};