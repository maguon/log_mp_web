import {apiHost} from '../../config/HostConfig';
import {NewSupplierModalActionType} from "../../actionTypes";

const supplierSettingAction = require('../../actions/main/SupplierSettingAction');
const supplierSettingDetailAction = require('../../actions/main/SupplierSettingDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const saveSupplier = () => async (dispatch, getState) => {
    try {
        // 供应商模态画面：画面类型(新建/编辑)
        const pageType = getState().NewSupplierModalReducer.pageType;
        // 供应商模态画面：供应商编号
        const supplierId = getState().NewSupplierModalReducer.supplierId;

        // 供应商模态画面：供应商简称
        const supplierShort = getState().NewSupplierModalReducer.supplierShort.trim();
        // 供应商模态画面：供应商全称
        const supplierName = getState().NewSupplierModalReducer.supplierName.trim();
        // 供应商模态画面：运输方式：陆运
        const transportModeRoad = getState().NewSupplierModalReducer.transportModeRoad;
        // 供应商模态画面：运输方式：海运
        const transportModeShip = getState().NewSupplierModalReducer.transportModeShip;
        // 供应商模态画面：备注
        const remark = getState().NewSupplierModalReducer.remark.trim();

        // 供应商模态画面：运输方式
        let transType = 0;
        if (transportModeRoad && !transportModeShip) {
            transType = 1;
        } else if (!transportModeRoad && transportModeShip) {
            transType = 2;
        } else if (transportModeRoad && transportModeShip) {
            transType = 3;
        }

        if (supplierShort === '' || supplierName === '' || transType === 0) {
            swal('保存失败', '请输入完整的供应商信息！', 'warning');
        } else {
            const params = {
                supplierShort: supplierShort,
                supplierFull: supplierName,
                transType: transType,
                mark: remark
            };

            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/supplier';
            let res = null;
            // 编辑时
            if (pageType === 'edit') {
                url = url + '/' + supplierId + '/supplierInfo';
                res = await httpUtil.httpPut(url, params);
            } else {
                // 新建时
                res = await httpUtil.httpPost(url, params);
            }
            if (res.success === true) {
                $('#newSupplierModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                if (pageType === 'new') {
                    dispatch(supplierSettingAction.getSupplierSettingList());
                } else {
                    dispatch(supplierSettingDetailAction.getSupplierInfo(supplierId));
                }
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getSupplierInfo = (supplierId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/supplier?supplierId=' + supplierId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: NewSupplierModalActionType.setSupplierId, payload: res.result[0].id});

                dispatch({type: NewSupplierModalActionType.setSupplierShort, payload: res.result[0].supplier_short});
                dispatch({type: NewSupplierModalActionType.setSupplierName, payload: res.result[0].supplier_full});

                if (res.result[0].trans_type === 1) {
                    dispatch({type: NewSupplierModalActionType.setTransportModeRoad, payload: true});
                    dispatch({type: NewSupplierModalActionType.setTransportModeShip, payload: false});
                } else if (res.result[0].trans_type === 2) {
                    dispatch({type: NewSupplierModalActionType.setTransportModeRoad, payload: false});
                    dispatch({type: NewSupplierModalActionType.setTransportModeShip, payload: true});
                } else if (res.result[0].trans_type === 3) {
                    dispatch({type: NewSupplierModalActionType.setTransportModeRoad, payload: true});
                    dispatch({type: NewSupplierModalActionType.setTransportModeShip, payload: true});
                } else {
                    dispatch({type: NewSupplierModalActionType.setTransportModeRoad, payload: false});
                    dispatch({type: NewSupplierModalActionType.setTransportModeShip, payload: false});
                }
                dispatch({type: NewSupplierModalActionType.setRemark, payload: res.result[0].mark});
            } else {
                swal('未找到该供应商详细信息', '', 'warning');
            }
        } else if (res.success === false) {
            swal('获取供应商详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};