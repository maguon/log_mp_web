import React from 'react';
import {connect} from 'react-redux';

const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

/**
 * UI组件：订单详情 模块。
 */
class OrderInfoModal extends React.Component {

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
        const {commonReducer, closeModal} = this.props;
        return (
            <div id="orderInfoModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">订单详情</div>

                {/** Modal主体 */}
                <div className="modal-content white">

                    {commonReducer.orderInfo.length > 0 &&
                    <div className="left-align">
                        {/** 头部 */}
                        <div className="row detail-box custom-grey grey-text text-darken-2">
                            <div className="col s6 margin-top10 margin-bottom10">
                                <div className="fz14 pink-font">订单编号：{commonReducer.orderInfo[0].id}</div>
                                <div className="fz20 purple-font margin-top5">
                                    {commonReducer.orderInfo[0].start_city}
                                    <i className="margin-left10 margin-right10 blue-text text-lighten-2 mdi mdi-chevron-double-right"/>
                                    {commonReducer.orderInfo[0].end_city}
                                    <span className="margin-left30 fz15 grey-text text-darken-2">
                                    ( {commonUtil.getJsonValue(sysConst.SERVICE_MODE,commonReducer.orderInfo[0].service_type)} )
                                </span>
                                </div>
                            </div>
                            <div className="col s6 margin-top10 right-align">
                                <div className="margin-top3">创建时间：{formatUtil.getDateTime(commonReducer.orderInfo[0].created_on)}</div>
                                <div className="margin-top10">创建人：{commonReducer.orderInfo[0].admin_name}</div>
                            </div>
                        </div>

                        {/** 运输车辆 列表 */}
                        <div className="row margin-bottom10 margin-left5 fz16 pink-font">
                            运输车辆：{formatUtil.formatNumber(commonReducer.orderCarArray.length)}
                        </div>
                        <div className="row detail-box">
                            <table className="bordered">
                                <thead className="custom-grey border-top-line">
                                <tr className="grey-text text-darken-2">
                                    <th className="padding-left10">VIN</th>
                                    <th className="center">车型</th>
                                    <th className="center">是否新车</th>
                                    <th className="right-align">估值 ( 元 )</th>
                                    <th className="center">是否保险</th>
                                    <th className="right-align width-150">实际运费 ( 元 )</th>
                                    <th className="right-align width-200">实际保费 ( 元 )</th>
                                    <th className="right-align">实际费用 ( 元 )</th>
                                </tr>
                                </thead>
                                <tbody>
                                {commonReducer.orderCarArray.map(function (item) {
                                    return (
                                        <tr className="grey-text text-darken-1">
                                            <td className="padding-left10">{item.vin}</td>
                                            <td className="center">{commonUtil.getJsonValue(sysConst.CAR_MODEL, item.model_type)}</td>
                                            <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.old_car)}</td>
                                            <td className="right-align">{formatUtil.formatNumber(item.valuation,2)}</td>
                                            {/* 是否保险 */}
                                            <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.safe_status)}</td>
                                            {/* 实际运费 */}
                                            <td className="right-align width-150">{formatUtil.formatNumber(item.act_trans_price, 2)}</td>
                                            {/* 实际保费 */}
                                            <td className="right-align width-200">{formatUtil.formatNumber(item.act_insure_price, 2)}</td>
                                            {/* 实际费用 */}
                                            <td className="right-align">{formatUtil.formatNumber(item.act_trans_price + item.act_insure_price, 2)}</td>
                                        </tr>
                                    )
                                }, this)}
                                {commonReducer.orderCarArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="8">暂无数据</td>
                                </tr>}
                                </tbody>
                            </table>
                        </div>

                        {/** 运输车辆 费用 */}
                        <div className="row detail-box custom-grey grey-text text-darken-2 padding-top15 padding-bottom15">
                            <div className="col s4">
                                运费：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.orderInfo[0].total_trans_price,2)}</span> 元
                            </div>
                            <div className="col s4">
                                保费：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.orderInfo[0].total_insure_price,2)}</span> 元
                            </div>
                            <div className="col s4 right-align">
                                总费用：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.orderInfo[0].total_trans_price + commonReducer.orderInfo[0].total_insure_price,2)}</span> 元
                            </div>
                        </div>

                        {/* 收发货信息 + 备注 */}
                        <div className="row grey-text padding-bottom10">
                            <div className="col s12 no-padding"><div className="col s12 divider bold-divider"/></div>
                            <div className="col s12 margin-top15 margin-bottom15">发货人：{commonReducer.orderInfo[0].send_name} {commonReducer.orderInfo[0].send_phone} {commonReducer.orderInfo[0].send_address}</div>
                            <div className="col s12 no-padding"><div className="col s12 dotted-line"/></div>
                            <div className="col s12 margin-top15 margin-bottom15">收货人：{commonReducer.orderInfo[0].recv_name} {commonReducer.orderInfo[0].recv_phone} {commonReducer.orderInfo[0].recv_address}</div>
                            <div className="col s12 no-padding"><div className="col s12 divider bold-divider"/></div>
                            <div className="col s12 margin-top15 margin-bottom15">客户备注：{commonReducer.orderInfo[0].remark}</div>
                            <div className="col s12 no-padding"><div className="col s12 dotted-line"/></div>
                            <div className="col s12 margin-top15">客服备注：{commonReducer.orderInfo[0].admin_mark}</div>
                        </div>
                    </div>}
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
    closeModal: () => {
        $('#orderInfoModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfoModal);