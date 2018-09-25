const httpUtil = require('../../util/HttpUtil');
import {apiHost} from '../../config/HostConfig';
import {LoginActionType} from '../../actionTypes';

const LocalUtil = require('../../util/LocalUtil');
const SysConst = require('../../util/SysConst');

export const login = (params) => async (dispatch, getState) => {
    try {
        const res = await httpUtil.httpPost(apiHost + '/api/userLogin', params)
        if (res && res.code) {
            swal({
                type: 'error',
                title: '登陆失败',
                text: '服务器内部错误!'
            })
        } else if (res && res.success) {
            LocalUtil.setLocalItem(SysConst.USER_ID, res.result.userId)
            LocalUtil.setLocalItem(SysConst.USER_TYPE, res.result.type)
            LocalUtil.setLocalItem(SysConst.AUTH_TOKEN, res.result.accessToken);

            window.location.href = '/index.html';
        } else {
            swal({
                type: 'warning',
                title: '登陆失败',
                text: res.msg
            })
        }
    } catch (err) {
        swal({
            type: 'error',
            title: '操作失败',
            text: err.message
        })
    }
}