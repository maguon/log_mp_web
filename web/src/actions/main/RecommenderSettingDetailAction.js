import {apiHost} from '../../config/HostConfig';
import {RecommenderSettingDetailActionType} from "../../actionTypes";

const commonUtil = require('../../util/CommonUtil');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 取得基本信息
export const getRecommendInfo = (recommendId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/recommend?recommendId=' + recommendId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: RecommenderSettingDetailActionType.setRecommendId, payload: res.result[0].id});
                dispatch({type: RecommenderSettingDetailActionType.setRecommendName, payload: res.result[0].name});
                dispatch({type: RecommenderSettingDetailActionType.setIntroduction, payload: res.result[0].introduction});
                dispatch({type: RecommenderSettingDetailActionType.setMpUrl, payload: res.result[0].mp_url});
                dispatch({type: RecommenderSettingDetailActionType.setContent, payload: res.result[0].content});
            }
        } else if (res.success === false) {
            swal('获取推荐人详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 修改基本信息
export const saveRecommend = () => async (dispatch, getState) => {
    try {
        // 推荐人ID
        const recommendId = getState().RecommenderSettingDetailReducer.recommendId;
        // 推荐人名称
        const recommendName = getState().RecommenderSettingDetailReducer.recommendName.trim();
        // 推荐人简介
        const introduction = getState().RecommenderSettingDetailReducer.introduction.trim();

        if (recommendName === '') {
            swal('保存失败', '请输入推荐人名称！', 'warning');
        } else {
            const params = {
                name: recommendName,
                introduction: introduction
            };

            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/recommend/' + recommendId;
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                swal("保存成功", "", "success");
                dispatch(getRecommendInfo(recommendId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 生成推荐码
export const crateRecommendCode = (recommendId) => async (dispatch) => {
    swal({
        title: "确定生成新的推荐码？",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            const url = apiHost + '/api/recommend/' + recommendId + '/wxCodeImage';
            const res = await httpUtil.httpPost(url, {});
            if (res.success === true) {
                swal("生成推荐码成功", "", "success");
                dispatch(getRecommendInfo(recommendId));
            } else if (res.success === false) {
                swal('生成推荐码失败', res.msg, 'warning');
            }
        }
    });
};

// 下载推荐码
export const downloadRecommend = () => async () => {
    try {
        html2canvas(document.getElementById('recommend-div'),{useCORS: true}).then((canvas) => {
            const imgUrl = canvas.toDataURL();
            commonUtil.saveFile(imgUrl,"推荐码.png");
        })
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};