import React from 'react';
import {connect} from 'react-redux';

const orderPaymentDetailModalAction = require('../../actions/modules/OrderPaymentDetailModalAction');
const formatUtil = require('../../util/FormatUtil');
const sysConst = require('../../util/SysConst');
const commonUtil = require('../../util/CommonUtil');

class OrderPaymentDetailModal extends React.Component {

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
        $('ul.tabs').tabs();
    }

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {commonReducer, getOrderCarList, getPaymentList, closeModal} = this.props;
        return (
            <div id="orderPaymentDetailModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">订单支付详情</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <ul className="tabs">
                        <li className="tab col s6"><a className="active" href="#tab-car" onClick={getOrderCarList}>车辆信息</a></li>
                        <li className="tab col s6"><a href="#tab-payment" onClick={getPaymentList}>支付信息</a></li>
                    </ul>

                    <div id="tab-car" className="row margin-top30">
                        <div className="col s12 detail-box z-depth-1 no-padding">
                            <table className="bordered">
                                <thead className="">
                                <tr className="grey-text text-darken-2">
                                    <th className="padding-left10">VIN</th>
                                    <th className="center">车型</th>
                                    <th className="center">品牌</th>
                                    <th className="center">型号</th>
                                    <th className="right-align">估值</th>
                                    <th className="center">新车</th>
                                    <th className="center">保险</th>
                                    <th className="right-align">实际运费</th>
                                    <th className="right-align">实际保费</th>
                                    <th className="right-align padding-right10">总费用</th>
                                </tr>
                                </thead>
                                <tbody>
                                {commonReducer.orderCarArray.map(function (item, key) {
                                    return (
                                        <tr className="grey-text text-darken-1">
                                            <td className="padding-left10">{item.vin}</td>
                                            <td className="center">{commonUtil.getJsonValue(sysConst.CAR_MODEL, item.model_type)}</td>
                                            <td className="center">{item.brand}</td>
                                            <td className="center">{item.brand_type}</td>
                                            <td className="right-align">{formatUtil.formatNumber(item.valuation,2)}</td>
                                            <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.old_car)}</td>
                                            <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.safe_status)}</td>
                                            <td className="right-align">{formatUtil.formatNumber(item.act_trans_price,2)}</td>
                                            <td className="right-align">{formatUtil.formatNumber(item.act_insure_price,2)}</td>
                                            <td className="right-align padding-right10 pink-font">{formatUtil.formatNumber(item.act_trans_price + item.act_insure_price,2)}</td>
                                        </tr>
                                    )
                                }, this)}
                                </tbody>
                            </table>
                        </div>

                        <div className="col s12 margin-top20">
                            <div className="col s4">订单运费：{formatUtil.formatNumber(commonReducer.totalActFreight, 2)} 元</div>
                            <div className="col s4">订单保费：{formatUtil.formatNumber(commonReducer.totalInsuranceFee, 2)} 元</div>
                            <div className="col s4 right-align">
                                订单总费用：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalActFreight + commonReducer.totalInsuranceFee, 2)}</span> 元
                            </div>
                        </div>
                    </div>

                    <div id="tab-payment" className="row margin-top30">
                        <div className="col s12 detail-box z-depth-1 no-padding">
                            <table className="bordered">
                                <thead className="">
                                <tr className="grey-text text-darken-2">
                                    <th className="padding-left10">支付编号</th>
                                    <th className="center">支付类型</th>
                                    <th className="center">支付银行</th>
                                    <th className="center">支付账号</th>
                                    <th className="center">户主</th>
                                    <th className="center">支付时间</th>
                                    <th className="right-align padding-right10">支付金额</th>
                                </tr>
                                </thead>
                                <tbody>
                                {commonReducer.orderPaymentArray.map(function (item, key) {
                                    return (
                                        <tr className="grey-text text-darken-1">
                                            <td className="padding-left10">{item.id}</td>
                                            <td className="center">{commonUtil.getJsonValue(sysConst.PAYMENT_TYPE, item.type)}</td>
                                            <td className="center">{item.bank}</td>
                                            <td className="center">{item.bank_code}</td>
                                            <td className="center">{item.account_name}</td>
                                            <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                            <td className="right-align padding-right10 pink-font">{formatUtil.formatNumber(item.total_fee,2)}</td>
                                        </tr>
                                    )
                                }, this)}
                                </tbody>
                            </table>
                        </div>

                        <div className="col s12 margin-top20">
                            <div className="col s4">支付费用：{formatUtil.formatNumber(commonReducer.totalPayment, 2)} 元</div>
                            <div className="col s4">退款：{formatUtil.formatNumber(commonReducer.totalRefund, 2)} 元</div>
                            <div className="col s4 right-align">
                                订单收入：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalPayment + commonReducer.totalRefund, 2)}</span> 元
                            </div>
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
        commonReducer: state.CommonReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    // 车辆信息
    getOrderCarList: () => {
        dispatch(orderPaymentDetailModalAction.getOrderCarList());
    },
    // 支付信息
    getPaymentList: () => {
        dispatch(orderPaymentDetailModalAction.getPaymentList());
    },
    closeModal: () => {
        $('#orderPaymentDetailModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentDetailModal);