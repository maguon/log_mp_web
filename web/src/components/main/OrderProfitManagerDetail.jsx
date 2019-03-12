import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {SupplierPaymentDetailModal, OrderPaymentDetailModal} from '../modules/index';

const orderProfitManagerDetailAction = require('../../actions/main/OrderProfitManagerDetailAction');
const supplierPaymentDetailModalAction = require('../../actions/modules/SupplierPaymentDetailModalAction');
const orderPaymentDetailModalAction = require('../../actions/modules/OrderPaymentDetailModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class OrderProfitManagerDetail extends React.Component {

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
        this.props.getOrderProfitInfo();
    }

    /**
     * 详情头部：显示 订单支付详情
     */
    showOrderPaymentModal = () => {
        this.props.initOrderPaymentDetailModalData();
        $('#orderPaymentDetailModal').modal('open');
    };

    /**
     * 详情头部：显示 供应商支付详情
     */
    showSupplierPaymentModal = () => {
        let supplierTransPrice = this.props.orderProfitManagerDetailReducer.orderProfitInfo[0].supplier_trans_price;
        let supplierInsurePrice = this.props.orderProfitManagerDetailReducer.orderProfitInfo[0].supplier_insure_price;
        let supplierPrice = this.props.orderProfitManagerDetailReducer.orderProfitInfo[0].supplier_trans_price + this.props.orderProfitManagerDetailReducer.orderProfitInfo[0].supplier_insure_price;
        this.props.initSupplierPaymentDetailModalData(supplierTransPrice, supplierInsurePrice, supplierPrice);
        $('#supplierPaymentDetailModal').modal('open');
    };

    render() {
        const {orderProfitManagerDetailReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/order_profit', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">订单利润 - 详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row">
                    {/* 主体 */}
                    <div className="col s12 margin-top20 padding-left50 padding-right50">

                        {/* 基本信息 */}
                        {orderProfitManagerDetailReducer.orderProfitInfo.length > 0 &&
                        <div className="col s12 no-padding margin-top20 detail-box z-depth-1">
                            <div className="col s12 padding-top15 padding-bottom10 custom-grey border-bottom-line">
                                <div className="col s8 pink-font">
                                    <i className="mdi mdi-clipboard-text fz20"/>
                                    <span className="margin-left20">订单编号：{orderProfitManagerDetailReducer.orderProfitInfo[0].id}</span>
                                </div>

                                <div className="col s4 right-align">创建时间：{formatUtil.getDateTime(orderProfitManagerDetailReducer.orderProfitInfo[0].created_on)}</div>
                            </div>

                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-line">
                                <div className="col s8">
                                    {/* 线路 */}
                                    <span className="fz18 purple-font">{orderProfitManagerDetailReducer.orderProfitInfo[0].route_start} - {orderProfitManagerDetailReducer.orderProfitInfo[0].route_end}</span>
                                    {/* 发运日期 */}
                                    <span className="margin-left30">发运日期：{formatUtil.getDate(orderProfitManagerDetailReducer.orderProfitInfo[0].departure_time)}</span>
                                    {/* 服务类型 */}
                                    <span className="margin-left30">{commonUtil.getJsonValue(sysConst.SERVICE_MODE, orderProfitManagerDetailReducer.orderProfitInfo[0].service_type)}</span>
                                    <span className="margin-left30">运输车辆：{formatUtil.formatNumber(orderProfitManagerDetailReducer.orderProfitInfo[0].car_num)}</span>
                                </div>
                                <div className="col s4 right-align">创建人：{orderProfitManagerDetailReducer.orderProfitInfo[0].real_name}</div>
                            </div>

                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-line">
                                <div className="col s3">订单运费：{formatUtil.formatNumber(orderProfitManagerDetailReducer.orderProfitInfo[0].total_trans_price, 2)} 元</div>
                                <div className="col s3">订单保费：{formatUtil.formatNumber(orderProfitManagerDetailReducer.orderProfitInfo[0].total_insure_price, 2)} 元</div>
                                <div className="col s3">订单价格：{formatUtil.formatNumber(orderProfitManagerDetailReducer.orderProfitInfo[0].total_trans_price + orderProfitManagerDetailReducer.orderProfitInfo[0].total_insure_price, 2)} 元</div>
                                <div className="col s3 right-align">
                                    实际支付：<span className="fz16 pink-font">{formatUtil.formatNumber(orderProfitManagerDetailReducer.orderProfitInfo[0].real_payment_price, 2)}</span> 元
                                    <button type="button" className="btn purple-btn margin-left40 btn-height24 fz14" onClick={() => {this.showOrderPaymentModal()}}>查看详情</button>
                                </div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-line">
                                <div className="col s3">供应商运费：{formatUtil.formatNumber(orderProfitManagerDetailReducer.orderProfitInfo[0].supplier_trans_price, 2)} 元</div>
                                <div className="col s3">供应商保费：{formatUtil.formatNumber(orderProfitManagerDetailReducer.orderProfitInfo[0].supplier_insure_price, 2)} 元</div>
                                <div className="col s6 right-align">
                                    支付供应商：<span className="fz16 pink-font">{formatUtil.formatNumber(orderProfitManagerDetailReducer.orderProfitInfo[0].supplier_trans_price + orderProfitManagerDetailReducer.orderProfitInfo[0].supplier_insure_price, 2)}</span> 元
                                    <button type="button" className="btn purple-btn margin-left40 btn-height24 fz14" onClick={() => {this.showSupplierPaymentModal()}}>查看详情</button>
                                </div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15">
                                <div className="col s12 right-align">
                                    订单利润：<span className="fz16 pink-font">{formatUtil.formatNumber(orderProfitManagerDetailReducer.orderProfitInfo[0].order_real_profit, 2)}</span> 元
                                </div>
                            </div>
                            <SupplierPaymentDetailModal/>
                            <OrderPaymentDetailModal/>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orderProfitManagerDetailReducer: state.OrderProfitManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 取得订单利润 详情
    getOrderProfitInfo: () => {
        dispatch(orderProfitManagerDetailAction.getOrderProfitInfo(ownProps.match.params.id));
    },
    // 供应商支付详情 模态
    initOrderPaymentDetailModalData: () => {
        dispatch(orderPaymentDetailModalAction.initOrderPaymentDetailModal(ownProps.match.params.id));
    },
    // 供应商支付详情 模态
    initSupplierPaymentDetailModalData: (supplierTransPrice, supplierInsurePrice, supplierPrice) => {
        dispatch(supplierPaymentDetailModalAction.initSupplierPaymentDetailModal(ownProps.match.params.id, supplierTransPrice, supplierInsurePrice, supplierPrice));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderProfitManagerDetail)