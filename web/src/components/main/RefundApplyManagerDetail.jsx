import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {ConfirmRefundModal, RefuseRefundModal, OrderInfoModal} from '../modules/index';

const commonAction = require('../../actions/main/CommonAction');
const refundApplyManagerDetailAction = require('../../actions/main/RefundApplyManagerDetailAction');
const refuseRefundModalAction = require('../../actions/modules/RefuseRefundModalAction');
const confirmRefundModalAction = require('../../actions/modules/ConfirmRefundModalAction');
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
        this.props.getRefundApplyInfo();
    }

    /**
     * 拒绝退款 按钮
     */
    refuseRefund = () => {
        // 初期化数据
        this.props.initRefuseRefundModalData(this.props.refundApplyManagerDetailReducer.refundApplyInfo[0]);
        $('#refuseRefundModal').modal('open');
    };

    /**
     * 同意退款 按钮
     */
    confirmRefund = () => {
        // 初期化数据
        this.props.initConfirmRefundModalData(this.props.refundApplyManagerDetailReducer.refundApplyInfo[0]);
        $('#confirmRefundModal').modal('open');
    };

    /**
     * 订单详情 按钮
     */
    showOrderInfo = () => {
        // 初期化数据
        this.props.initOrderInfoModalData(this.props.refundApplyManagerDetailReducer.refundApplyInfo[0].order_id);
        $('#orderInfoModal').modal('open');
    };

    render() {
        const {refundApplyManagerDetailReducer, commonReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/refund', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">订单退款 - 退款详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row margin-left50 margin-right50">
                    {/* 上部：退款信息 */}
                    <div className="row margin-top40">
                        <div className="col s12 no-padding pink-font">
                            <i className="mdi mdi-currency-cny fz20"/>
                            <span className="margin-left10 fz16">退款信息</span>
                        </div>
                        {/* 分割线 */}
                        <div className="col s12 no-padding">
                            <div className="col s12 margin-top5 divider bold-divider"/>
                        </div>

                        {refundApplyManagerDetailReducer.refundApplyInfo.length > 0 &&
                        <div className="col s12 no-padding margin-top20 detail-box z-depth-1">
                            <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                <div className="col s6 purple-font">
                                    退款编号：{refundApplyManagerDetailReducer.refundApplyInfo[0].id}
                                </div>
                                {/* 状态 */}
                                <div className="col s6 pink-font right-align">
                                    {commonUtil.getJsonValue(sysConst.REFUND_STATUS, refundApplyManagerDetailReducer.refundApplyInfo[0].status)}
                                </div>
                            </div>

                            <div className="col s12">
                                {/* 退款申请 */}
                                <div className="col s12 padding-top15 padding-bottom10 pink-font"><div className="col s12">退款申请</div></div>
                                <div className="col s12"><div className="col s12 divider"/></div>

                                <div className="col s12 padding-top15 padding-bottom10">
                                    <div className="col s9">
                                        支付账户：
                                        {refundApplyManagerDetailReducer.refundApplyInfo[0].payment_type === sysConst.PAYMENT_MODE[0].value &&
                                        <span>微信支付</span>}
                                        {refundApplyManagerDetailReducer.refundApplyInfo[0].payment_type === sysConst.PAYMENT_MODE[1].value &&
                                        <span>{refundApplyManagerDetailReducer.refundApplyInfo[0].bank} {refundApplyManagerDetailReducer.refundApplyInfo[0].bank_code} {refundApplyManagerDetailReducer.refundApplyInfo[0].account_name}</span>}
                                    </div>

                                    <div className="col s3 right-align">
                                        支付金额：<span className="fz16 pink-font">{formatUtil.formatNumber(refundApplyManagerDetailReducer.refundApplyInfo[0].total_fee, 2)}</span> 元
                                    </div>
                                </div>
                                <div className="col s12"><div className="col s12 dotted-line"/></div>

                                <div className="col s12 padding-top15 padding-bottom10">
                                    <div className="col s-percent-6 padding-right0">申请原因：</div>
                                    <div className="col s-percent-94 padding-left0">{refundApplyManagerDetailReducer.refundApplyInfo[0].apply_reason}</div>
                                </div>
                                <div className="col s12"><div className="col s12 dotted-line"/></div>

                                <div className="col s12 padding-top15 padding-bottom10">
                                    <div className="col s6">
                                        申请金额：<span className="fz16 pink-font">{formatUtil.formatNumber(refundApplyManagerDetailReducer.refundApplyInfo[0].apply_fee, 2)}</span> 元
                                    </div>
                                    <div className="col s6 right-align">
                                        申请时间：{formatUtil.getDateTime(refundApplyManagerDetailReducer.refundApplyInfo[0].created_on)}
                                    </div>
                                </div>

                                {/* 处理结果 已退款/已拒绝 状态显示下面部分 */}
                                {refundApplyManagerDetailReducer.refundApplyInfo[0].status !== sysConst.REFUND_STATUS[2].value &&
                                <div>
                                    <div className="col s12 padding-top20 padding-bottom10 pink-font"><div className="col s12">处理结果</div></div>
                                    <div className="col s12"><div className="col s12 divider"/></div>

                                    {/* 原因 已退款 状态显示下面部分 */}
                                    {refundApplyManagerDetailReducer.refundApplyInfo[0].status === sysConst.REFUND_STATUS[1].value &&
                                    <div className="col s12 padding-top15 padding-bottom10">
                                        <div className="col s-percent-6 padding-right0">退款描述：</div>
                                        <div className="col s-percent-94 padding-left0">{refundApplyManagerDetailReducer.refundApplyInfo[0].remark}</div>
                                    </div>}
                                    {/* 原因 已拒绝 状态显示下面部分 */}
                                    {refundApplyManagerDetailReducer.refundApplyInfo[0].status === sysConst.REFUND_STATUS[0].value &&
                                    <div className="col s12 padding-top15 padding-bottom10">
                                        <div className="col s-percent-6 padding-right0">拒绝原因：</div>
                                        <div className="col s-percent-94 padding-left0">{refundApplyManagerDetailReducer.refundApplyInfo[0].refuse_reason}</div>
                                    </div>}
                                    <div className="col s12"><div className="col s12 dotted-line"/></div>

                                    <div className="col s12 padding-top15 padding-bottom10">
                                        <div className="col s6">
                                            {refundApplyManagerDetailReducer.refundApplyInfo[0].status === sysConst.REFUND_STATUS[1].value &&
                                            <span>退款金额：<span className="fz16 pink-font">{formatUtil.formatNumber(refundApplyManagerDetailReducer.refundApplyInfo[0].refund_fee, 2)}</span> 元</span>}
                                        </div>
                                        <div className="col s6 right-align">
                                            处理时间：{formatUtil.getDateTime(refundApplyManagerDetailReducer.refundApplyInfo[0].updated_on)}
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>}
                    </div>

                    {/** 退款状态：申请中时，拒绝退款 同意退款 按钮 */}
                    {refundApplyManagerDetailReducer.refundApplyInfo.length > 0 && refundApplyManagerDetailReducer.refundApplyInfo[0].status === sysConst.REFUND_STATUS[2].value &&
                    <div className="row margin-top20 margin-bottom0 right-align">
                        <button type="button" className="btn custom-btn" onClick={() => {this.refuseRefund()}}>拒绝退款</button>
                        <button type="button" className="btn confirm-btn margin-left20" onClick={() => {this.confirmRefund()}}>同意退款</button>
                        <ConfirmRefundModal/>
                        <RefuseRefundModal/>
                    </div>}

                    {/* 下部：订单信息 */}
                    <div className="row margin-top40">
                        <div className="col s6 no-padding pink-font">
                            <i className="mdi mdi-currency-cny fz20"/>
                            <span className="margin-left10 fz16">订单信息</span>
                        </div>
                        {commonReducer.orderInfo.length > 0 &&
                        <div className="col s6 no-padding right-align">
                            <button type="button" className="btn custom-btn detail-btn" onClick={() => {this.showOrderInfo()}}>订单详情</button>
                            <OrderInfoModal/>
                        </div>}
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

                            <div className="col s12 padding-top15 padding-bottom10">
                                {/* 线路 */}
                                <div className="col s4 fz18 purple-font">{commonReducer.orderInfo[0].start_city} - {commonReducer.orderInfo[0].end_city}</div>
                                {/* 服务类型 */}
                                <div className="col s4">{commonUtil.getJsonValue(sysConst.SERVICE_MODE, commonReducer.orderInfo[0].service_type)}</div>
                                {/* 运输车辆 */}
                                <div className="col s4 right-align">运输车辆：{formatUtil.formatNumber(commonReducer.orderInfo[0].car_num)}</div>
                            </div>
                            <div className="col s12"><div className="col s12 dotted-line"/></div>

                            <div className="col s12 padding-top15 padding-bottom10">
                                <div className="col s6">创建时间：{formatUtil.getDateTime(commonReducer.orderInfo[0].created_on)}</div>
                                <div className="col s6 right-align">创建人：{commonReducer.orderInfo[0].admin_name}</div>
                            </div>
                            <div className="col s12"><div className="col s12 dotted-line"/></div>

                            <div className="col s12 padding-top15 padding-bottom15">
                                <div className="col s4">
                                    订单金额：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.orderInfo[0].total_trans_price + commonReducer.orderInfo[0].total_insure_price, 2)}</span> 元
                                </div>
                                <div className="col s4">
                                    支付金额：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalPayment, 2)}</span> 元
                                </div>
                                <div className="col s4 right-align">
                                    退款金额：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalRefund, 2)}</span> 元
                                </div>
                            </div>

                            {/* 订单支付列表 */}
                            {commonReducer.orderPaymentArray.length > 0 &&
                            <div className="col s12"><div className="col s12 custom-divider"/></div>}
                            {commonReducer.orderPaymentArray.map(function (item) {
                                return (
                                    <div>
                                        <div className="col s12 padding-top15 padding-bottom10">
                                            <div className="col s2">支付编号：{item.id}
                                            </div>
                                            <div className="col s5 no-padding">支付账户：
                                                {item.payment_type === sysConst.PAYMENT_MODE[0].value && <span>微信</span>}
                                                {item.payment_type === sysConst.PAYMENT_MODE[1].value && <span>{item.bank} {item.bank_code} {item.account_name}</span>}
                                            </div>
                                            <div className="col s3">支付时间：{formatUtil.getDateTime(item.created_on)}</div>
                                            <div className="col s2 right-align">
                                                <span className="fz16 pink-font">{formatUtil.formatNumber(item.total_fee, 2)}</span> 元
                                            </div>
                                        </div>
                                        <div className="col s12"><div className="col s12 dotted-line"/></div>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        refundApplyManagerDetailReducer: state.RefundApplyManagerDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getRefundApplyInfo: () => {
        dispatch(refundApplyManagerDetailAction.getRefundApplyInfo(ownProps.match.params.id));
    },
    initRefuseRefundModalData: (refundApplyInfo) => {
        dispatch(refuseRefundModalAction.initRefuseRefundModal(refundApplyInfo));
    },
    initConfirmRefundModalData: (refundApplyInfo) => {
        dispatch(confirmRefundModalAction.initConfirmRefundModal(refundApplyInfo));
    },
    initOrderInfoModalData: (orderId) => {
        dispatch(commonAction.getOrderInfo(orderId));
        dispatch(commonAction.getOrderCarList(orderId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentManagerDetail)