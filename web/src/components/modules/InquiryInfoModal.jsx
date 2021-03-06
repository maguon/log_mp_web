import React from 'react';
import {connect} from 'react-redux';
import {InquiryInfoModalActionType} from "../../actionTypes";

const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

/**
 * UI组件：询价详情 模块。
 */
class InquiryInfoModal extends React.Component {

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
     * 点击后，显示/隐藏 订单信息
     */
    clickOrderInfo = () => {
        this.props.setShowOrderInfoFlag(!this.props.inquiryInfoModalReducer.showOrderInfoFlag);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {inquiryInfoModalReducer, commonReducer, closeModal} = this.props;
        return (
            <div id="inquiryInfoModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">询价详情</div>

                {/** Modal主体 */}
                <div className="modal-content white">

                    {/** 头部 */}
                    {inquiryInfoModalReducer.inquiryInfo.length > 0 &&
                    <div className="row detail-box custom-grey grey-text text-darken-2">
                        <div className="col s6 margin-top10 margin-bottom10">
                            <div className="fz14 pink-font">询价编号：{inquiryInfoModalReducer.inquiryInfo[0].id}</div>
                            <div className="fz20 purple-font margin-top5">
                                {inquiryInfoModalReducer.inquiryInfo[0].start_city}
                                <i className="margin-left10 margin-right10 blue-text text-lighten-2 mdi mdi-chevron-double-right"/>
                                {inquiryInfoModalReducer.inquiryInfo[0].end_city}
                                <span className="margin-left30 fz15 grey-text text-darken-2">
                                    ( {commonUtil.getJsonValue(sysConst.SERVICE_MODE,inquiryInfoModalReducer.inquiryInfo[0].service_type)} )
                                </span>
                            </div>
                        </div>
                        <div className="col s6 margin-top10 right-align">
                            <div className="margin-top3">询价时间：{formatUtil.getDateTime(inquiryInfoModalReducer.inquiryInfo[0].created_on)}</div>
                            {inquiryInfoModalReducer.prePage === 'user' &&
                            <div className="pink-font margin-top10">{sysConst.INQUIRY_STATUS[inquiryInfoModalReducer.inquiryInfo[0].status].label}</div>}
                        </div>
                    </div>}

                    {inquiryInfoModalReducer.inquiryInfo.length > 0 &&
                    <div className="row margin-bottom10 margin-left5 fz16 pink-font">
                        协商车辆数：{formatUtil.formatNumber(inquiryInfoModalReducer.inquiryInfo[0].car_num)}
                    </div>}
                    <div className="row">
                        <table className="bordered">
                            <thead className="custom-grey border-top-line">
                            <tr className="grey-text text-darken-2">
                                <th className="padding-left10">车型</th>
                                <th className="center">新车</th>
                                <th className="right-align">估值单价</th>
                                <th className="right-align">预计运费单价</th>
                                <th className="center">保险</th>
                                <th className="right-align">保险单价</th>
                                <th className="right-align">数量</th>
                                <th className="right-align">估值总额</th>
                                <th className="right-align padding-right10">预计费用</th>
                            </tr>
                            </thead>
                            <tbody>
                            {inquiryInfoModalReducer.inquiryCarArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td className="padding-left10">{commonUtil.getJsonValue(sysConst.CAR_MODEL, item.model_id)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.old_car)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.plan, 2)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.one_trans_price, 2)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.safe_status)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.one_insure_price, 2)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.car_num)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.plan_total)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.trans_price + item.insure_price, 2)}</td>
                                    </tr>
                                )
                            }, this)}
                            {inquiryInfoModalReducer.inquiryCarArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="9">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    <div className="row margin-bottom10 grey-text text-darken-2">
                        <div className="col s3 padding-right0">
                            <span className="fz14">估值总额：</span><span className="fz16">{formatUtil.formatNumber(inquiryInfoModalReducer.totalValuation)}</span>
                        </div>
                        <div className="col s3 right-align no-padding">
                            <span className="fz14">预计总运费：</span><span className="fz16">{formatUtil.formatNumber(inquiryInfoModalReducer.totalFreight,2)}</span>
                        </div>
                        <div className="col s3 right-align no-padding">
                            <span className="fz14">预计总保费：</span><span className="fz16">{formatUtil.formatNumber(inquiryInfoModalReducer.totalInsuranceFee,2)}</span>
                        </div>
                        <div className="col s3 right-align padding-left0">
                            <span className="fz14">预计总费用：</span><span className="fz16">{formatUtil.formatNumber(inquiryInfoModalReducer.totalFreight + inquiryInfoModalReducer.totalInsuranceFee,2)}</span>
                        </div>
                    </div>
                    <div className="row divider bold-divider"/>

                    {/** 订单管理详情画面进入 */}
                    {inquiryInfoModalReducer.inquiryInfo.length > 0 && inquiryInfoModalReducer.prePage === 'order' &&
                    <div className="row detail-box margin-top40 grey-text text-darken-2">

                        <div className="col s12 padding-top10 padding-bottom10 custom-grey pink-font">协商结果</div>
                        <div className="col s12 no-padding divider"/>

                        <div className="col s12 no-padding">
                            <div className="col s3 margin-top10 margin-bottom10">
                                协商运费：<span className="margin-left10 fz16 pink-font">{formatUtil.formatNumber(inquiryInfoModalReducer.inquiryInfo[0].total_trans_price,2)}</span> 元
                            </div>
                            <div className="col s4 margin-top10 right-align">
                                协商保费：<span className="margin-left10 fz16 pink-font">{formatUtil.formatNumber(inquiryInfoModalReducer.inquiryInfo[0].total_insure_price,2)}</span> 元
                            </div>
                            <div className="col s5 margin-top10 right-align">
                                协商总费用：<span className="margin-left10 fz16 pink-font">{formatUtil.formatNumber(inquiryInfoModalReducer.inquiryInfo[0].total_trans_price + inquiryInfoModalReducer.inquiryInfo[0].total_insure_price,2)}</span> 元
                            </div>
                        </div>
                        <div className="col s12 no-padding divider"/>

                        <div className="col s-percent-10 margin-top10 margin-bottom10 padding-right0">
                            协商描述：
                        </div>
                        <div className="col s-percent-90 margin-top10 margin-bottom10 padding-left0">
                            {inquiryInfoModalReducer.inquiryInfo[0].remark}
                        </div>
                        <div className="col s12 no-padding divider"/>

                        <div className="col s6 margin-top10 margin-bottom10 padding-right0">
                            协商客服：{inquiryInfoModalReducer.inquiryInfo[0].admin_user}
                        </div>
                        <div className="col s6 margin-top10 margin-bottom10 padding-left0 right-align">
                            协商时间：{formatUtil.getDateTime(inquiryInfoModalReducer.inquiryInfo[0].inquiry_time)}
                        </div>
                    </div>}

                    {/** 用户管理详情画面进入 已取消状态显示：取消时间 */}
                    {inquiryInfoModalReducer.inquiryInfo.length > 0 && inquiryInfoModalReducer.prePage === 'user' && inquiryInfoModalReducer.inquiryInfo[0].status === 3 &&
                    <div className="row margin-top20 grey-text text-darken-2">
                        <div className="col s12 right-align">取消时间：{formatUtil.getDateTime(inquiryInfoModalReducer.inquiryInfo[0].cancel_time)}</div>
                    </div>}

                    {/** 用户管理详情画面进入 已报价/已完成状态(status:1,2)显示：报价信息 */}
                    {inquiryInfoModalReducer.inquiryInfo.length > 0 && inquiryInfoModalReducer.prePage === 'user'
                        && (inquiryInfoModalReducer.inquiryInfo[0].status === 1 || inquiryInfoModalReducer.inquiryInfo[0].status === 2) &&
                    <div className="row detail-box margin-top40 grey-text text-darken-2">

                        {/** 已完成状态(status:2)显示：订单信息 */}
                        {inquiryInfoModalReducer.orderInfo.length > 0 && inquiryInfoModalReducer.inquiryInfo[0].status === 2 &&
                        <div>
                            <div className="col s12 no-padding custom-grey">
                                <div className="col s6 margin-top10 margin-bottom10">
                                    生成订单编号：{inquiryInfoModalReducer.orderInfo[0].id}
                                </div>
                                <div className="col s6 margin-top10 right-align">
                                    生成订单时间：{formatUtil.getDateTime(inquiryInfoModalReducer.orderInfo[0].created_on)}
                                    <span className="margin-left20 pink-font pointer" onClick={this.clickOrderInfo}>
                                        订单详情 {inquiryInfoModalReducer.showOrderInfoFlag ? <i className="mdi mdi-chevron-up fz15"/> : <i className="mdi mdi-chevron-down fz15"/>}
                                    </span>
                                </div>
                            </div>
                            <div className="col s12 no-padding divider"/>

                            {/* 订单详情 */}
                            {inquiryInfoModalReducer.showOrderInfoFlag &&
                            <div className="col s12 custom-dark-grey border-bottom-line">
                                <div className="row margin-top15 margin-bottom10">
                                    <div className="col s6 pink-font">运送车辆：{formatUtil.formatNumber(commonReducer.orderCarArray.length)}</div>
                                    <div className="col s6 pink-font right-align">
                                        {commonUtil.getJsonValue(sysConst.ORDER_LOG_STATUS,inquiryInfoModalReducer.orderInfo[0].log_status)}
                                    </div>
                                </div>
                                <div className="row detail-box">
                                    <table className="bordered">
                                        <thead className="custom-grey border-top-line">
                                        <tr className="grey-text text-darken-2">
                                            <th className="padding-left10">VIN</th>
                                            <th className="center">车型</th>
                                            <th className="center">新车</th>
                                            <th className="right-align">估值</th>
                                            <th className="center">保险</th>
                                            <th className="right-align">实际运费</th>
                                            <th className="right-align">实际保费</th>
                                            <th className="right-align padding-right10">实际费用</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {commonReducer.orderCarArray.map(function (item) {
                                            return (
                                                <tr className="grey-text text-darken-1">
                                                    <td className="padding-left10">{item.vin}</td>
                                                    <td className="center">{commonUtil.getJsonValue(sysConst.CAR_MODEL,item.model_type)}</td>
                                                    <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO,item.old_car)}</td>
                                                    <td className="right-align">{formatUtil.formatNumber(item.valuation,2)}</td>
                                                    <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO,item.safe_status)}</td>
                                                    <td className="right-align">{formatUtil.formatNumber(item.act_trans_price,2)}</td>
                                                    <td className="right-align">{formatUtil.formatNumber(item.act_insure_price,2)}</td>
                                                    <td className="right-align padding-right10">{formatUtil.formatNumber(item.act_trans_price + item.act_insure_price,2)}</td>
                                                </tr>
                                            )
                                        }, this)}
                                        {commonReducer.orderCarArray.length === 0 &&
                                        <tr className="grey-text white text-darken-1">
                                            <td className="no-data-tr" colSpan="8">暂无数据</td>
                                        </tr>}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="row margin-bottom10 grey-text text-darken-2">
                                    <div className="col s4 padding-right0">
                                        运费总额：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalActFreight,2)}</span> 元
                                    </div>
                                    <div className="col s4 right-align no-padding">
                                        保费总额：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalInsuranceFee,2)}</span> 元
                                    </div>
                                    <div className="col s4 right-align padding-left0">
                                        总费用：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalActFreight + commonReducer.totalInsuranceFee,2)}</span> 元
                                    </div>
                                </div>
                                <div className="row divider bold-divider"/>

                                <div className="row margin-top15 margin-bottom10">
                                    <div className="col s12 purple-font">
                                        {commonUtil.getJsonValue(sysConst.SERVICE_MODE,inquiryInfoModalReducer.orderInfo[0].service_type)}
                                    </div>
                                </div>
                                <div className="row divider margin-bottom10 bold-divider"/>

                                <div className="row margin-bottom10 grey-text">
                                    <div className="col s12 margin-top3">发货地址：{inquiryInfoModalReducer.orderInfo[0].send_address}</div>
                                    <div className="col s12 margin-top8">收货地址：{inquiryInfoModalReducer.orderInfo[0].recv_address}</div>
                                </div>
                                <div className="row divider margin-bottom10 bold-divider"/>

                                <div className="row margin-bottom10 grey-text text-darken-2">
                                    <div className="col s12">备注：{inquiryInfoModalReducer.orderInfo[0].remark}</div>
                                </div>
                            </div>}
                        </div>}

                        <div className="col s3 margin-top10 margin-bottom10">
                            协商运费：<span className="margin-left10 fz16 pink-font">{formatUtil.formatNumber(inquiryInfoModalReducer.inquiryInfo[0].total_trans_price,2)}</span> 元
                        </div>
                        <div className="col s4 margin-top10 right-align">
                            协商保费：<span className="margin-left10 fz16 pink-font">{formatUtil.formatNumber(inquiryInfoModalReducer.inquiryInfo[0].total_insure_price,2)}</span> 元
                        </div>
                        <div className="col s5 margin-top10 right-align">
                            协商总费用：<span className="margin-left10 fz16 pink-font">{formatUtil.formatNumber(inquiryInfoModalReducer.inquiryInfo[0].total_trans_price + inquiryInfoModalReducer.inquiryInfo[0].total_insure_price,2)}</span> 元
                        </div>
                        <div className="col s12 no-padding divider"/>

                        <div className="col s-percent-10 margin-top10 margin-bottom10 padding-right0">
                            协商描述：
                        </div>
                        <div className="col s-percent-90 margin-top10 margin-bottom10 padding-left0">
                            {inquiryInfoModalReducer.inquiryInfo[0].remark}
                        </div>
                        <div className="col s12 no-padding divider"/>

                        <div className="col s6 margin-top10 margin-bottom10 padding-right0">
                            协商客服：{inquiryInfoModalReducer.inquiryInfo[0].admin_user}
                        </div>
                        <div className="col s6 margin-top10 margin-bottom10 padding-left0 right-align">
                            协商时间：{formatUtil.getDateTime(inquiryInfoModalReducer.inquiryInfo[0].inquiry_time)}
                        </div>
                    </div>}
                </div>

                {/** Modal固定底部：取消确定按钮 */}
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
        inquiryInfoModalReducer: state.InquiryInfoModalReducer,
        commonReducer: state.CommonReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setShowOrderInfoFlag: (showCarInfoFlag) => {
        dispatch(InquiryInfoModalActionType.setShowOrderInfoFlag(showCarInfoFlag))
    },
    closeModal: () => {
        $('#inquiryInfoModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InquiryInfoModal);