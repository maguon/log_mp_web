import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {ConfirmPaymentModal} from '../modules/index';

const paymentManagerDetailAction = require('../../actions/main/PaymentManagerDetailAction');
const confirmPaymentModalAction = require('../../actions/modules/ConfirmPaymentModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class PaymentManagerDetail extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        // 取得订单信息
        this.props.getPaymentInfo();
    }

    /**
     * 确认支付 按钮
     */
    confirmPayment = (type, paymentId, paymentMoney) => {
        let paymentInfo = this.props.paymentManagerDetailReducer.paymentInfo[0];
        // 退款
        if (paymentInfo.type === sysConst.PAYMENT_TYPE[0].value) {
            this.props.confirmPayment();
        } else {
            this.props.initConfirmPaymentModalData(paymentInfo.total_fee);
            $('#confirmPaymentModal').modal('open');
        }
    };

    render() {
        const {paymentManagerDetailReducer, commonReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/payment', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">支付管理 - 支付详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row margin-left50 margin-right50">
                    {/* 上部：支付信息 */}
                    <div className="row margin-top40">
                        <div className="col s12 no-padding pink-font">
                            <i className="mdi mdi-currency-cny fz20"/>
                            <span className="margin-left10 fz16">支付</span>
                        </div>
                        {/* 分割线 */}
                        <div className="col s12 no-padding">
                            <div className="col s12 margin-top5 divider bold-divider"/>
                        </div>

                        {paymentManagerDetailReducer.paymentInfo.length > 0 &&
                        <div className="col s12 no-padding margin-top20 detail-box z-depth-1">
                            <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                <div className="col s6 purple-font">
                                    支付编号：{paymentManagerDetailReducer.paymentInfo[0].id}
                                </div>
                                {/* 支付状态 */}
                                <div className="col s6 pink-font right-align">
                                    {commonUtil.getJsonValue(sysConst.PAYMENT_STATUS, paymentManagerDetailReducer.paymentInfo[0].status)}
                                </div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-dotted-line">
                                <div className="col s2">
                                    支付方式：{commonUtil.getJsonValue(sysConst.PAYMENT_MODE, paymentManagerDetailReducer.paymentInfo[0].payment_type)}
                                </div>

                                {/* 支付方式：银行转账 时，显示 */}
                                <div className="col s7 no-padding">
                                    {paymentManagerDetailReducer.paymentInfo[0].payment_type === sysConst.PAYMENT_MODE[1].value &&
                                    <span>付款账户：{paymentManagerDetailReducer.paymentInfo[0].bank} {paymentManagerDetailReducer.paymentInfo[0].bank_code} {paymentManagerDetailReducer.paymentInfo[0].account_name}</span>}
                                </div>

                                <div className="col s3 right-align">
                                    金额：<span className="fz16 pink-font">{formatUtil.formatNumber(paymentManagerDetailReducer.paymentInfo[0].total_fee, 2)}</span> 元
                                </div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15">
                                <div className="col s12 right-align">
                                    支付时间：{formatUtil.getDateTime(paymentManagerDetailReducer.paymentInfo[0].created_on)}
                                </div>
                            </div>
                        </div>}
                    </div>

                    {/** 支付状态：待确认时，确认支付 按钮 */}
                    {paymentManagerDetailReducer.paymentInfo.length > 0 && paymentManagerDetailReducer.paymentInfo[0].status === sysConst.PAYMENT_STATUS[0].value &&
                    <div className="row margin-top20 margin-bottom0 right-align">
                        <button type="button" className="btn confirm-btn" onClick={() => {this.confirmPayment()}}>确认支付</button>
                        <ConfirmPaymentModal/>
                    </div>}

                    {/* 下部：订单信息 */}
                    <div className="row margin-top40">
                        <div className="col s12 no-padding pink-font">
                            <i className="mdi mdi-currency-cny fz20"/>
                            <span className="margin-left10 fz16">订单信息</span>
                        </div>
                        {/* 分割线 */}
                        <div className="col s12 no-padding">
                            <div className="col s12 margin-top5 divider bold-divider"/>
                        </div>

                        {commonReducer.orderInfo.length > 0 &&
                        <div className="col s12 no-padding margin-top20 detail-box z-depth-1">

                            <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                <div className="col s6 purple-font">
                                    {commonUtil.getJsonValue(sysConst.ORDER_TYPE, commonReducer.orderInfo[0].created_type)}
                                    <span className="margin-left10 grey-text">编号：{commonReducer.orderInfo[0].id}</span>
                                </div>
                                {/* 订单状态 */}
                                <div className="col s6 pink-font right-align">
                                    {commonUtil.getJsonValue(sysConst.ORDER_STATUS, commonReducer.orderInfo[0].status)}
                                </div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-dotted-line">
                                <div className="col s6">
                                    {/* 线路 */}
                                    <span className="fz18 purple-font">{commonReducer.orderInfo[0].start_city} - {commonReducer.orderInfo[0].end_city}</span>
                                    {/* 服务类型 */}
                                    <span className="margin-left30">{commonUtil.getJsonValue(sysConst.SERVICE_MODE, commonReducer.orderInfo[0].service_type)}</span>
                                    <span className="margin-left30">运输车辆：{formatUtil.formatNumber(commonReducer.orderInfo[0].car_num)}</span>
                                </div>

                                <div className="col s6 right-align">
                                    创建人：{commonReducer.orderInfo[0].admin_name}
                                    <span className="margin-left30">创建时间：{formatUtil.getDateTime(commonReducer.orderInfo[0].created_on)}</span>
                                </div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15">
                                <div className="col s4">
                                    运费：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.orderInfo[0].total_trans_price, 2)}</span> 元
                                </div>
                                <div className="col s4">
                                    保费：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.orderInfo[0].total_insure_price, 2)}</span> 元
                                </div>
                                <div className="col s4 right-align">
                                    订单金额：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.orderInfo[0].total_trans_price + commonReducer.orderInfo[0].total_insure_price, 2)}</span> 元
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        paymentManagerDetailReducer: state.PaymentManagerDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getPaymentInfo: () => {
        dispatch(paymentManagerDetailAction.getPaymentInfo(ownProps.match.params.id));
    },
    confirmPayment: () => {
        dispatch(paymentManagerDetailAction.confirmPayment(ownProps.match.params.id,'payment_detail'));
    },
    initConfirmPaymentModalData: (paymentMoney) => {
        dispatch(confirmPaymentModalAction.initConfirmPaymentModal('payment_detail', ownProps.match.params.id, paymentMoney));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentManagerDetail)