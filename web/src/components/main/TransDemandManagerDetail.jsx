import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {NewOfferModalActionType, CancelInquiryModalActionType, CommonActionType} from '../../actionTypes';
import {NewOfferModal, CancelInquiryModal, OrderInfoModal} from '../modules/index';

const commonAction = require('../../actions/main/CommonAction');
const transDemandManagerDetailAction = require('../../actions/main/TransDemandManagerDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class InquiryManagerDetail extends React.Component {

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
        this.props.getTransDemandInfo();
    }

    /**
     * 报价按钮 点击事件
     */
    showNewOfferModal = () => {
        let userId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].user_id;
        let totalFreight = this.props.transDemandManagerDetailReducer.totalFreight;
        let totalInsuranceFee = this.props.transDemandManagerDetailReducer.totalInsuranceFee;
        this.props.initNewOfferModalData(userId, totalFreight, totalInsuranceFee, 0, 0, '');
        $('#newOfferModal').modal('open');
    };

    /**
     * 重新报价按钮 点击事件
     */
    showOfferModal = () => {
        let userId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].user_id;
        let totalFreight = this.props.transDemandManagerDetailReducer.totalFreight;
        let totalInsuranceFee = this.props.transDemandManagerDetailReducer.totalInsuranceFee;
        let actTotalFreight = this.props.transDemandManagerDetailReducer.transDemandInfo[0].total_trans_price;
        let actTotalInsuranceFee = this.props.transDemandManagerDetailReducer.transDemandInfo[0].total_insure_price;
        let remark = this.props.transDemandManagerDetailReducer.transDemandInfo[0].remark;
        this.props.initNewOfferModalData(userId, totalFreight, totalInsuranceFee, actTotalFreight, actTotalInsuranceFee, remark);
        $('#newOfferModal').modal('open');
    };

    /**
     * 取消报价按钮 点击事件
     */
    showCancelInquiryModal = () => {
        let freight = this.props.transDemandManagerDetailReducer.totalFreight;
        let insuranceFee = this.props.transDemandManagerDetailReducer.totalInsuranceFee;
        let actTotalFreight = this.props.transDemandManagerDetailReducer.transDemandInfo[0].total_trans_price;
        let actTotalInsuranceFee = this.props.transDemandManagerDetailReducer.transDemandInfo[0].total_insure_price;

        this.props.initCancelInquiryModalData(freight, insuranceFee, actTotalFreight, actTotalInsuranceFee);
        $('#cancelInquiryModal').modal('open');
    };

    /**
     * 生成订单 点击事件
     */
    generateOrder = () => {
        // let userId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].user_id;
        this.props.generateOrder();
    };

    /**
     * 订单详情 按钮
     */
    showOrderInfo = () => {
        // 初期化数据
        this.props.initOrderInfoModalData(this.props.transDemandManagerDetailReducer.transDemandInfo[0].order_id);
        $('#orderInfoModal').modal('open');
    };


    render() {
        const {transDemandManagerDetailReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/trans_demand', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">
                            运输需求 - 线路安排
                            {transDemandManagerDetailReducer.transDemandInfo.length > 0 && <span> - {transDemandManagerDetailReducer.transDemandInfo[0].id}</span>}
                        </span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {transDemandManagerDetailReducer.transDemandInfo.length > 0 &&
                <div className="row">
                    {/* 头部 */}
                    <div className="col s12">
                        {/* 询价详情：基本信息 */}
                        <div className="trans-demand-header">
                            <div className="col s9 margin-top5 grey-text text-darken-1">
                                <div className="pink-font">订单编号：{transDemandManagerDetailReducer.transDemandInfo[0].order_id}</div>

                                <div className="margin-top10 grey-text text-darken-1">
                                    <span className="fz20 purple-font">{transDemandManagerDetailReducer.transDemandInfo[0].route_start} - {transDemandManagerDetailReducer.transDemandInfo[0].route_end}</span>
                                    <span className="margin-left30">{commonUtil.getJsonValue(sysConst.SERVICE_MODE,transDemandManagerDetailReducer.transDemandInfo[0].service_type)}</span>
                                </div>

                                <div className="col s7 margin-top10 grey-text text-darken-1 no-padding">
                                    运费：<span className="fz16 pink-font">{formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].total_trans_price, 2)}</span> 元
                                </div>
                                <div className="col s5 margin-top10 grey-text text-darken-1">
                                    保费：<span className="fz16 pink-font">{formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].total_insure_price, 2)}</span> 元
                                </div>
                                <div className="col s12 no-padding margin-top5 grey-text text-darken-1">
                                    创建人：{transDemandManagerDetailReducer.transDemandInfo[0].real_name}
                                </div>
                            </div>

                            <div className="col s3 margin-top5 right-align grey-text text-darken-1">
                                <div>
                                    订单创建时间：{formatUtil.getDateTime(transDemandManagerDetailReducer.transDemandInfo[0].order_created_on)}
                                </div>
                                <div className="margin-top10">
                                    运送车辆：<span className="fz16 pink-font">{transDemandManagerDetailReducer.transDemandInfo[0].car_num}</span>
                                </div>

                                <div className="margin-top10">
                                    总费用：<span className="fz16 pink-font">
                                    {formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].total_trans_price + transDemandManagerDetailReducer.transDemandInfo[0].total_insure_price, 2)}
                                    </span> 元
                                </div>

                                <div className="margin-top5">
                                    <button type="button" className="btn purple-btn btn-height24 fz14" onClick={this.showOrderInfo}>订单详情</button>
                                </div>
                            </div>
                        </div>

                        <div className="padding-top10 grey-text text-darken-1">
                            <div className="col s6 padding-left30">需求创建时间：{formatUtil.getDateTime(transDemandManagerDetailReducer.transDemandInfo[0].created_on)}</div>
                            <div className="col s6 padding-right30 right-align pink-font">
                                {commonUtil.getJsonValue(sysConst.TRANS_DEMAND_STATUS,transDemandManagerDetailReducer.transDemandInfo[0].status)}
                            </div>
                            <div className="col s12 divider custom-divider margin-top10"/>
                        </div>
                        <OrderInfoModal/>
                    </div>

                    {/* 主体 */}
                    <div className="col s12 margin-top40 padding-left50 padding-right50">

                        {/** 待报价状态显示：报价按钮 */}
                        {transDemandManagerDetailReducer.transDemandInfo[0].status === 0 &&
                        <div className="row margin-bottom10 right-align">
                            <button type="button" className="btn confirm-btn" onClick={this.showNewOfferModal}>报价</button>
                        </div>}

                        {/** 已报价状态显示：取消询价/重新报价/生成订单 按钮 */}
                        {transDemandManagerDetailReducer.transDemandInfo[0].status === 1 &&
                        <div className="row margin-bottom10 right-align">
                            <button type="button" className="btn custom-btn" onClick={this.showCancelInquiryModal}>取消询价</button>
                            <button type="button" className="btn confirm-btn margin-left20" onClick={this.showOfferModal}>重新报价</button>
                            <button type="button" className="btn orange-btn margin-left20" onClick={this.generateOrder}>生成订单</button>
                        </div>}
                        <NewOfferModal/>
                        <CancelInquiryModal/>

                        <div className="row margin-bottom10 margin-left5 pink-font bold-font">
                            运送车辆：{formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].car_num)}
                        </div>
                        <div className="row detail-box">
                            <table className="bordered">
                                <thead className="custom-grey">
                                <tr className="grey-text text-darken-2">
                                    <th className="padding-left10">车型</th>
                                    <th className="center">新车</th>
                                    <th className="right-align">估值单价</th>
                                    <th className="right-align">预计运费单价</th>
                                    <th className="center">保险</th>
                                    <th className="right-align">保险单价</th>
                                    <th className="right-align">数量</th>
                                    <th className="right-align">估值</th>
                                    <th className="right-align padding-right10">预计费用</th>
                                </tr>
                                </thead>
                                <tbody>
                                {transDemandManagerDetailReducer.inquiryCarArray.map(function (item) {
                                    return (
                                        <tr className="grey-text text-darken-1">
                                            <td className="padding-left10">{commonUtil.getJsonValue(sysConst.CAR_MODEL, item.model_id)}</td>
                                            <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.old_car)}</td>
                                            <td className="right-align">{formatUtil.formatNumber(item.plan, 2)}</td>
                                            <td className="right-align">{formatUtil.formatNumber(item.one_trans_price, 2)}</td>
                                            <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.safe_status)}</td>
                                            <td className="right-align">{formatUtil.formatNumber(item.one_insure_price)}</td>
                                            <td className="right-align">{formatUtil.formatNumber(item.car_num)}</td>
                                            <td className="right-align">{formatUtil.formatNumber(item.plan_total)}</td>
                                            <td className="right-align">{formatUtil.formatNumber(item.trans_price + item.insure_price, 2)}</td>
                                        </tr>
                                    )
                                }, this)}
                                {transDemandManagerDetailReducer.inquiryCarArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="9">暂无数据</td>
                                </tr>}
                                </tbody>
                            </table>
                        </div>

                        <div className="row margin-bottom10 grey-text text-darken-2 bold-font">
                            <div className="col s2">
                                <span className="fz14">估值总额：</span><span className="fz16">{formatUtil.formatNumber(transDemandManagerDetailReducer.totalValuation)}</span>
                            </div>

                            <div className="col s3 right-align">
                                <span className="fz14">预计总运费：</span><span className="fz16">{formatUtil.formatNumber(transDemandManagerDetailReducer.totalFreight,2)}</span>
                            </div>
                            <div className="col s3 right-align">
                                <span className="fz14">预计总保费：</span><span className="fz16">{formatUtil.formatNumber(transDemandManagerDetailReducer.totalInsuranceFee,2)}</span>
                            </div>

                            <div className="col s4 right-align">
                                <span className="fz14">预计总费用：</span><span className="fz16">{formatUtil.formatNumber(transDemandManagerDetailReducer.totalFreight + transDemandManagerDetailReducer.totalInsuranceFee,2)}</span>
                            </div>
                        </div>
                        <div className="row divider bold-divider"/>

                        {/** 已取消状态显示：取消时间 */}
                        {transDemandManagerDetailReducer.transDemandInfo[0].status === 3 && transDemandManagerDetailReducer.transDemandInfo[0].inquiry_time == null &&
                        <div className="row margin-top20 grey-text text-darken-2">
                            <div className="col s12 right-align">取消时间：{formatUtil.getDateTime(transDemandManagerDetailReducer.transDemandInfo[0].cancel_time)}</div>
                        </div>}

                        {/** 已报价/已完成状态(status:1,2,3)显示：报价信息 */}
                        {transDemandManagerDetailReducer.transDemandInfo[0].inquiry_time !== null &&
                        (transDemandManagerDetailReducer.transDemandInfo[0].status === 1 || transDemandManagerDetailReducer.transDemandInfo[0].status === 2 || transDemandManagerDetailReducer.transDemandInfo[0].status === 3) &&
                        <div className="row detail-box margin-top40 grey-text text-darken-2">
                            {/** 已完成状态(status:2)显示：订单信息 */}
                            {transDemandManagerDetailReducer.orderInfo.length > 0 && transDemandManagerDetailReducer.transDemandInfo[0].status === 2 &&
                            <div className="bold-font">
                                <div className="col s12 no-padding custom-grey">
                                    <div className="col s6 margin-top10 margin-bottom10">
                                        生成订单编号：{transDemandManagerDetailReducer.orderInfo[0].id}
                                    </div>
                                    <div className="col s6 margin-top10 right-align">
                                        生成订单时间：{formatUtil.getDateTime(transDemandManagerDetailReducer.orderInfo[0].created_on)}
                                    </div>
                                </div>
                                <div className="col s12 no-padding divider"/>
                            </div>}

                            {transDemandManagerDetailReducer.transDemandInfo[0].inquiry_time !== null &&
                            <div>
                                <div className="col s3 margin-top10 margin-bottom10 bold-font">
                                    协商运费：<span className="margin-left10 fz16 pink-font">{formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].total_trans_price,2)}</span> 元
                                </div>
                                <div className="col s4 margin-top10 right-align bold-font">
                                    协商保费：<span className="margin-left10 fz16 pink-font">{formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].total_insure_price,2)}</span> 元
                                </div>
                                <div className="col s5 margin-top10 right-align bold-font blue-text text-lighten-2">
                                    协商总费用：<span className="margin-left10 fz16">{formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].total_trans_price + transDemandManagerDetailReducer.transDemandInfo[0].total_insure_price,2)}</span> 元
                                </div>
                                <div className="col s12 no-padding divider"/>

                                <div className="col s-percent-6 padding-right0 margin-top10 margin-bottom10 bold-font">
                                    协商描述：
                                </div>
                                <div className="col s-percent-94 margin-top10 margin-bottom10 grey-text">
                                    {transDemandManagerDetailReducer.transDemandInfo[0].remark}
                                </div>
                                <div className="col s12 no-padding divider"/>

                                <div className="col s6 margin-top10 margin-bottom10 bold-font">
                                    协商客服：{transDemandManagerDetailReducer.transDemandInfo[0].admin_user}
                                </div>
                                <div className="col s6 margin-top10 right-align bold-font">
                                    协商时间：{formatUtil.getDateTime(transDemandManagerDetailReducer.transDemandInfo[0].inquiry_time)}
                                </div>
                            </div>}
                        </div>}

                        {/** 已取消状态显示：取消时间 / 取消原因 */}
                        {transDemandManagerDetailReducer.transDemandInfo[0].status === 3 && transDemandManagerDetailReducer.transDemandInfo[0].inquiry_time !== null &&
                        <div className="row detail-box margin-top40 grey-text text-darken-2">
                            <div className="bold-font">
                                <div className="col s12 padding-top10 padding-bottom10 right-align custom-grey">取消时间：{formatUtil.getDateTime(transDemandManagerDetailReducer.transDemandInfo[0].cancel_time)}</div>
                                <div className="col s12 no-padding divider"/>
                            </div>

                            <div className="col s12 no-padding divider"/>

                            <div className="col s-percent-8 padding-right0 margin-top10 margin-bottom10 bold-font">
                                取消原因：
                            </div>
                            <div className="col s-percent-92 padding-left0 margin-top10 margin-bottom10 grey-text">
                                {transDemandManagerDetailReducer.transDemandInfo[0].mark_reason}
                            </div>
                        </div>}
                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        transDemandManagerDetailReducer: state.TransDemandManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getTransDemandInfo: () => {
        dispatch(transDemandManagerDetailAction.getTransDemandInfo(ownProps.match.params.id));
        dispatch(transDemandManagerDetailAction.getInquiryCarList(ownProps.match.params.id));
    },
    initOrderInfoModalData: (orderId) => {
        dispatch(CommonActionType.setShowOrderCarListFlag(false));
        dispatch(commonAction.getOrderInfo(orderId));
        dispatch(commonAction.getOrderCarList(orderId));
    },






    initNewOfferModalData: (userId, totalFreight, totalInsuranceFee, actfreight, actInsuranceFee, remark) => {
        dispatch(NewOfferModalActionType.setInquiryId(ownProps.match.params.id));
        dispatch(NewOfferModalActionType.setUserId(userId));
        dispatch(NewOfferModalActionType.setFreight(totalFreight));
        dispatch(NewOfferModalActionType.setInsuranceFee(totalInsuranceFee));
        dispatch(NewOfferModalActionType.setActFreight(actfreight));
        dispatch(NewOfferModalActionType.setActInsuranceFee(actInsuranceFee));
        dispatch(NewOfferModalActionType.setRemark(remark));
    },
    initCancelInquiryModalData: (freight, insuranceFee, actTotalFreight, actTotalInsuranceFee) => {
        dispatch(CancelInquiryModalActionType.setInquiryId(ownProps.match.params.id));
        dispatch(CancelInquiryModalActionType.setFreight(freight));
        dispatch(CancelInquiryModalActionType.setInsuranceFee(insuranceFee));
        dispatch(CancelInquiryModalActionType.setActFreight(actTotalFreight));
        dispatch(CancelInquiryModalActionType.setActInsuranceFee(actTotalInsuranceFee));
        dispatch(CancelInquiryModalActionType.setRemark(''));
    },
    generateOrder: () => {
        dispatch(transDemandManagerDetailAction.generateOrder(ownProps.match.params.id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InquiryManagerDetail)