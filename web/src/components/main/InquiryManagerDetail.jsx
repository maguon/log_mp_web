import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {NewOfferModalActionType, CancelInquiryModalActionType} from '../../actionTypes';
import {NewOfferModal, CancelInquiryModal} from '../modules/index';

const inquiryManagerDetailAction = require('../../actions/main/InquiryManagerDetailAction');
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
        this.props.getInquiryInfo();
    }

    /**
     * 报价按钮 点击事件
     */
    showNewOfferModal = () => {
        let userId = this.props.inquiryManagerDetailReducer.inquiryInfo[0].user_id;
        let totalFreight = this.props.inquiryManagerDetailReducer.totalFreight;
        let totalInsuranceFee = this.props.inquiryManagerDetailReducer.totalInsuranceFee;
        this.props.initNewOfferModalData(userId, totalFreight, totalInsuranceFee, 0, 0, '');
        $('#newOfferModal').modal('open');
    };

    /**
     * 重新报价按钮 点击事件
     */
    showOfferModal = () => {
        let userId = this.props.inquiryManagerDetailReducer.inquiryInfo[0].user_id;
        let totalFreight = this.props.inquiryManagerDetailReducer.totalFreight;
        let totalInsuranceFee = this.props.inquiryManagerDetailReducer.totalInsuranceFee;
        let actTotalFreight = this.props.inquiryManagerDetailReducer.inquiryInfo[0].total_trans_price;
        let actTotalInsuranceFee = this.props.inquiryManagerDetailReducer.inquiryInfo[0].total_insure_price;
        let remark = this.props.inquiryManagerDetailReducer.inquiryInfo[0].remark;
        this.props.initNewOfferModalData(userId, totalFreight, totalInsuranceFee, actTotalFreight, actTotalInsuranceFee, remark);
        $('#newOfferModal').modal('open');
    };

    /**
     * 取消报价按钮 点击事件
     */
    showCancelInquiryModal = () => {
        let freight = this.props.inquiryManagerDetailReducer.totalFreight;
        let insuranceFee = this.props.inquiryManagerDetailReducer.totalInsuranceFee;
        let actTotalFreight = this.props.inquiryManagerDetailReducer.inquiryInfo[0].total_trans_price;
        let actTotalInsuranceFee = this.props.inquiryManagerDetailReducer.inquiryInfo[0].total_insure_price;

        this.props.initCancelInquiryModalData(freight, insuranceFee, actTotalFreight, actTotalInsuranceFee);
        $('#cancelInquiryModal').modal('open');
    };

    /**
     * 生成订单 点击事件
     */
    generateOrder = () => {
        // let userId = this.props.inquiryManagerDetailReducer.inquiryInfo[0].user_id;
        this.props.generateOrder();
    };

    render() {
        const {inquiryManagerDetailReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/inquiry', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">
                            询价管理 - 询价详情
                            {inquiryManagerDetailReducer.inquiryInfo.length > 0 && <span> - {inquiryManagerDetailReducer.inquiryInfo[0].id}</span>}
                        </span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {inquiryManagerDetailReducer.inquiryInfo.length > 0 &&
                <div className="row">
                    {/* 头部 */}
                    <div className="col s12">
                        {/* 询价详情：基本信息 */}
                        <div className="inquiry-detail-header">
                            {/* 左侧：图标 */}
                            <div className="col s8 margin-top5 grey-text text-darken-1">
                                <div>
                                    <span className="fz20 purple-font">{inquiryManagerDetailReducer.inquiryInfo[0].start_city}</span>
                                    <img className="margin-left30 margin-right30" src="../../../assets/images/transport.png"/>
                                    <span className="fz20 purple-font">{inquiryManagerDetailReducer.inquiryInfo[0].end_city}</span>
                                    <span className="margin-left30">{commonUtil.getJsonValue(sysConst.SERVICE_MODE,inquiryManagerDetailReducer.inquiryInfo[0].service_type)}</span>
                                </div>

                                <div className="margin-top15">
                                    <i className="mdi mdi-account fz20 pink-font"/>
                                    <span className="margin-left10">{inquiryManagerDetailReducer.inquiryInfo[0].user_name}</span>

                                    <i className="mdi mdi-cellphone margin-left30 fz20 pink-font"/>
                                    <span className="margin-left10">{inquiryManagerDetailReducer.inquiryInfo[0].phone}</span>
                                </div>
                            </div>

                            <div className="col s4 margin-top10 right-align grey-text text-darken-1">
                                <div className="margin-top3">询价时间：{formatUtil.getDateTime(inquiryManagerDetailReducer.inquiryInfo[0].created_on)}</div>
                                <div className="margin-top15 pink-font">{sysConst.INQUIRY_STATUS[inquiryManagerDetailReducer.inquiryInfo[0].status].label}</div>
                            </div>
                        </div>
                    </div>

                    {/* 主体 */}
                    <div className="col s12 margin-top40 padding-left50 padding-right50">

                        {/** 待报价状态显示：报价按钮 */}
                        {inquiryManagerDetailReducer.inquiryInfo[0].status === 0 &&
                        <div className="row margin-bottom10 right-align">
                            <button type="button" className="btn confirm-btn" onClick={this.showNewOfferModal}>报价</button>
                        </div>}

                        {/** 已报价状态显示：取消询价/重新报价/生成订单 按钮 */}
                        {inquiryManagerDetailReducer.inquiryInfo[0].status === 1 &&
                        <div className="row margin-bottom10 right-align">
                            <button type="button" className="btn custom-btn" onClick={this.showCancelInquiryModal}>取消询价</button>
                            <button type="button" className="btn confirm-btn margin-left20" onClick={this.showOfferModal}>重新报价</button>
                            <button type="button" className="btn orange-btn margin-left20" onClick={this.generateOrder}>生成订单</button>
                        </div>}
                        <NewOfferModal/>
                        <CancelInquiryModal/>

                        <div className="row margin-bottom10 margin-left5 pink-font bold-font">
                            运送车辆：{formatUtil.formatNumber(inquiryManagerDetailReducer.inquiryInfo[0].car_num)}
                        </div>
                        <div className="row detail-box">
                            <table className="bordered">
                                <thead className="custom-grey">
                                <tr className="grey-text text-darken-2">
                                    <th className="padding-left10">车型</th>
                                    <th className="center">是否新车</th>
                                    <th className="right-align">估值单价(元)</th>
                                    <th className="right-align">预计运费单价(元)</th>
                                    <th className="center">是否保险</th>
                                    <th className="right-align">保险单价(元)</th>
                                    <th className="right-align">数量</th>
                                    <th className="right-align">估值(元)</th>
                                    <th className="right-align padding-right10">预计费用</th>
                                </tr>
                                </thead>
                                <tbody>
                                {inquiryManagerDetailReducer.inquiryCarArray.map(function (item) {
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
                                {inquiryManagerDetailReducer.inquiryCarArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="9">暂无数据</td>
                                </tr>}
                                </tbody>
                            </table>
                        </div>

                        <div className="row margin-bottom10 grey-text text-darken-2 bold-font">
                            <div className="col s2">
                                <span className="fz14">估值总额：</span><span className="fz16">{formatUtil.formatNumber(inquiryManagerDetailReducer.totalValuation)}</span>
                            </div>

                            <div className="col s3 right-align">
                                <span className="fz14">预计总运费：</span><span className="fz16">{formatUtil.formatNumber(inquiryManagerDetailReducer.totalFreight,2)}</span>
                            </div>
                            <div className="col s3 right-align">
                                <span className="fz14">预计总保费：</span><span className="fz16">{formatUtil.formatNumber(inquiryManagerDetailReducer.totalInsuranceFee,2)}</span>
                            </div>

                            <div className="col s4 right-align">
                                <span className="fz14">预计总费用：</span><span className="fz16">{formatUtil.formatNumber(inquiryManagerDetailReducer.totalFreight + inquiryManagerDetailReducer.totalInsuranceFee,2)}</span>
                            </div>
                        </div>
                        <div className="row divider bold-divider"/>

                        {/** 已取消状态显示：取消时间 */}
                        {inquiryManagerDetailReducer.inquiryInfo[0].status === 3 && inquiryManagerDetailReducer.inquiryInfo[0].inquiry_time == null &&
                        <div className="row margin-top20 grey-text text-darken-2">
                            <div className="col s12 right-align">取消时间：{formatUtil.getDateTime(inquiryManagerDetailReducer.inquiryInfo[0].cancel_time)}</div>
                        </div>}

                        {/** 已报价/已完成状态(status:1,2,3)显示：报价信息 */}
                        {inquiryManagerDetailReducer.inquiryInfo[0].inquiry_time !== null &&
                        (inquiryManagerDetailReducer.inquiryInfo[0].status === 1 || inquiryManagerDetailReducer.inquiryInfo[0].status === 2 || inquiryManagerDetailReducer.inquiryInfo[0].status === 3) &&
                        <div className="row detail-box margin-top40 grey-text text-darken-2">
                            {/** 已完成状态(status:2)显示：订单信息 */}
                            {inquiryManagerDetailReducer.orderInfo.length > 0 && inquiryManagerDetailReducer.inquiryInfo[0].status === 2 &&
                            <div className="bold-font">
                                <div className="col s12 no-padding custom-grey">
                                    <div className="col s6 margin-top10 margin-bottom10">
                                        生成订单编号：{inquiryManagerDetailReducer.orderInfo[0].id}
                                    </div>
                                    <div className="col s6 margin-top10 right-align">
                                        生成订单时间：{formatUtil.getDateTime(inquiryManagerDetailReducer.orderInfo[0].created_on)}
                                    </div>
                                </div>
                                <div className="col s12 no-padding divider"/>
                            </div>}

                            {inquiryManagerDetailReducer.inquiryInfo[0].inquiry_time !== null &&
                            <div>
                                <div className="col s3 margin-top10 margin-bottom10 bold-font">
                                    协商运费：<span className="margin-left10 fz16 pink-font">{formatUtil.formatNumber(inquiryManagerDetailReducer.inquiryInfo[0].total_trans_price,2)}</span> 元
                                </div>
                                <div className="col s4 margin-top10 right-align bold-font">
                                    协商保费：<span className="margin-left10 fz16 pink-font">{formatUtil.formatNumber(inquiryManagerDetailReducer.inquiryInfo[0].total_insure_price,2)}</span> 元
                                </div>
                                <div className="col s5 margin-top10 right-align bold-font blue-text text-lighten-2">
                                    协商总费用：<span className="margin-left10 fz16">{formatUtil.formatNumber(inquiryManagerDetailReducer.inquiryInfo[0].total_trans_price + inquiryManagerDetailReducer.inquiryInfo[0].total_insure_price,2)}</span> 元
                                </div>
                                <div className="col s12 no-padding divider"/>

                                <div className="col s-percent-6 padding-right0 margin-top10 margin-bottom10 bold-font">
                                    协商描述：
                                </div>
                                <div className="col s-percent-94 margin-top10 margin-bottom10 grey-text">
                                    {inquiryManagerDetailReducer.inquiryInfo[0].remark}
                                </div>
                                <div className="col s12 no-padding divider"/>

                                <div className="col s6 margin-top10 margin-bottom10 bold-font">
                                    协商客服：{inquiryManagerDetailReducer.inquiryInfo[0].admin_user}
                                </div>
                                <div className="col s6 margin-top10 right-align bold-font">
                                    协商时间：{formatUtil.getDateTime(inquiryManagerDetailReducer.inquiryInfo[0].inquiry_time)}
                                </div>
                            </div>}
                        </div>}

                        {/** 已取消状态显示：取消时间 / 取消原因 */}
                        {inquiryManagerDetailReducer.inquiryInfo[0].status === 3 && inquiryManagerDetailReducer.inquiryInfo[0].inquiry_time !== null &&
                        <div className="row detail-box margin-top40 grey-text text-darken-2">
                            <div className="bold-font">
                                <div className="col s12 padding-top10 padding-bottom10 right-align custom-grey">取消时间：{formatUtil.getDateTime(inquiryManagerDetailReducer.inquiryInfo[0].cancel_time)}</div>
                                <div className="col s12 no-padding divider"/>
                            </div>

                            <div className="col s12 no-padding divider"/>

                            <div className="col s-percent-8 padding-right0 margin-top10 margin-bottom10 bold-font">
                                取消原因：
                            </div>
                            <div className="col s-percent-92 padding-left0 margin-top10 margin-bottom10 grey-text">
                                {inquiryManagerDetailReducer.inquiryInfo[0].mark_reason}
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
        inquiryManagerDetailReducer: state.InquiryManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getInquiryInfo: () => {
        dispatch(inquiryManagerDetailAction.getInquiryInfo(ownProps.match.params.id));
        dispatch(inquiryManagerDetailAction.getInquiryCarList(ownProps.match.params.id));
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
        dispatch(inquiryManagerDetailAction.generateOrder(ownProps.match.params.id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InquiryManagerDetail)