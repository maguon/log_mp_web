import React from 'react';
import {connect} from 'react-redux';

const formatUtil = require('../../util/FormatUtil');
const sysConst = require('../../util/SysConst');
const commonUtil = require('../../util/CommonUtil');

class SupplierPaymentDetailModal extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor() {
        super();
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        $('.modal').modal();
    }

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {supplierPaymentDetailModalReducer, closeModal} = this.props;
        return (
            <div id="supplierPaymentDetailModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">供应商支付详情</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="col s12 detail-box z-depth-1 no-padding">
                        <table className="bordered">
                            <thead className="">
                            <tr className="grey-text text-darken-2">
                                <th className="padding-left10">线路编号</th>
                                <th className="center">线路</th>
                                <th className="center">供应商</th>
                                <th className="center">运输类型</th>
                                <th className="right-align">车辆数</th>
                                <th className="right-align">供应商运费</th>
                                <th className="right-align">供应商保费</th>
                                <th className="right-align padding-right10">总费用</th>
                            </tr>
                            </thead>
                            <tbody>
                            {supplierPaymentDetailModalReducer.loadTaskInfo.map(function (item, key) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td className="padding-left10">{item.id}</td>
                                        <td className="center">{item.route_start} - {item.route_end}</td>
                                        <td className="center">{item.supplier_short}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.TRANSPORT_TYPE, item.trans_type)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.car_count)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.supplier_trans_price,2)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.supplier_insure_price,2)}</td>
                                        <td className="right-align padding-right10 pink-font">{formatUtil.formatNumber(item.supplier_trans_price + item.supplier_insure_price,2)}</td>
                                    </tr>
                                )
                            }, this)}
                            </tbody>
                        </table>
                    </div>

                    <div className="col s12 margin-top20">
                        <div className="col s4 no-padding">供应商运费：{formatUtil.formatNumber(supplierPaymentDetailModalReducer.supplierTransPrice, 2)} 元</div>
                        <div className="col s4">供应商保费：{formatUtil.formatNumber(supplierPaymentDetailModalReducer.supplierInsurePrice, 2)} 元</div>
                        <div className="col s4 no-padding right-align">
                            支付供应商：<span className="fz16 pink-font">{formatUtil.formatNumber(supplierPaymentDetailModalReducer.supplierPrice, 2)}</span> 元
                        </div>
                    </div>
                </div>

                {/** Modal固定底部：确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn confirm-btn" onClick={closeModal}>确定</button>
                </div>
            </div>
        );
    }
}

/**
 * 输入逻辑：外部的数据（即state对象）转换为 UI 组件的参数。
 */
const mapStateToProps = (state) => {
    return {
        supplierPaymentDetailModalReducer: state.SupplierPaymentDetailModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        $('#supplierPaymentDetailModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SupplierPaymentDetailModal);