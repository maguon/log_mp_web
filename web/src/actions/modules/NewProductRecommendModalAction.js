import {apiHost} from '../../config/HostConfig';
import {NewProductRecommendModalActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');
const productDetailAction = require('../../actions/main/ProductDetailAction');
const commonAction = require('../../actions/main/CommonAction');

// 新增商品 初期化
export const initNewProductRecommendModal = (pageType, productId, productRecommend) => async (dispatch) => {
    // 取得推广人列表
    dispatch(commonAction.getRecommendList());
    // 画面区分 新建 / 修改
    dispatch({type: NewProductRecommendModalActionType.setPageType, payload: pageType});
    // 商品ID
    dispatch({type: NewProductRecommendModalActionType.setProductId, payload: productId});

    if (pageType === 'new') {
        // 推广名称
        dispatch({type: NewProductRecommendModalActionType.setTitle, payload: ''});
        // 推广人
        dispatch({type: NewProductRecommendModalActionType.setRecommend, payload: null});
        // 备注
        dispatch({type: NewProductRecommendModalActionType.setRemark, payload: ''});
    } else {
        // 海报ID
        dispatch({type: NewProductRecommendModalActionType.setPosterId, payload: productRecommend.id});
        // 推广名称
        dispatch({type: NewProductRecommendModalActionType.setTitle, payload: productRecommend.title});
        // 推广人
        dispatch({type: NewProductRecommendModalActionType.setRecommend, payload: {value: productRecommend.recommend_id, label: productRecommend.name}});
        // 备注
        dispatch({type: NewProductRecommendModalActionType.setRemark, payload: productRecommend.remark});
    }
};

export const saveProductRecommend = () => async (dispatch, getState) => {
    try {
        // 画面区分 新建 / 修改
        const pageType = getState().NewProductRecommendModalReducer.pageType;
        // 商品ID
        const productId = getState().NewProductRecommendModalReducer.productId;
        // 海报ID
        const posterId = getState().NewProductRecommendModalReducer.posterId;
        // 推广名称
        const title = getState().NewProductRecommendModalReducer.title.trim();
        // 推广人
        const recommend = getState().NewProductRecommendModalReducer.recommend;
        // 备注
        const remark = getState().NewProductRecommendModalReducer.remark.trim();

        if (title === '' || recommend == null) {
            swal('保存失败', '请输入完整的商品微信推广信息！', 'warning');
        } else {
            const params = {
                title: title,
                recommendId: recommend.value,
                remark: remark
            };

            // 基本url
            let url = null;
            let res = null;
            // 新建时
            if (pageType === 'new') {
                // 基本url
                url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/commodity/' + productId;
                res = await httpUtil.httpPost(url, params);
            } else {
                url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/poster/' + posterId;
                res = await httpUtil.httpPut(url, params);
            }
            if (res.success === true) {
                $('#newProductRecommendModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(productDetailAction.getProductRecommendList(productId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};