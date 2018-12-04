import React from 'react';
import {connect} from 'react-redux';
import {InquiryModalActionType} from "../../actionTypes";

const inquiryModalAction = require('../../actions/modules/InquiryModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

/**
 * UI组件：询价模块。
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
     * 渲染(挂载)画面。
     */
    render() {
        const {inquiryInfoModalReducer, closeModal} = this.props;
        return (
            <div id="inquiryInfoModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">询价信息</div>

                {/** Modal主体 */}
                <div className="modal-content white">

                    {/** 第一行 */}
                    <div className="row detail-box custom-grey grey-text">
                        <div className="col s6 margin-top20">
                            <span className="fz20 pink-font">大連-> 瀋陽XXXXXX</span>
                            <span className="margin-left10">( 送到指定地点XXXX )</span>
                        </div>
                        <div className="col s6 margin-top10 margin-bottom10 right-align">
                            <div className="margin-top3">询价时间：XXXXXXX XXXX</div>
                            <div className="pink-font margin-top10">待报价XXXX</div>
                        </div>
                    </div>

                    <div className="row margin-bottom10 margin-left5 grey-text text-darken-2">
                        运送车辆：{formatUtil.formatNumber(99999)}
                    </div>
                    <div className="row detail-box">
                        <table className="bordered">
                            <thead className="custom-grey border-top-line">
                            <tr className="grey-text text-darken-2">
                                <th className="padding-left10">车型</th>
                                <th className="center">是否新车</th>
                                <th className="right-align">估值单价 ( 元 )</th>
                                <th className="right-align">预计运费单价 ( 元 )</th>
                                <th className="right-align">数量</th>
                                <th className="right-align">估值总额 ( 元 )</th>
                                <th className="right-align padding-right10">预计费用</th>
                            </tr>
                            </thead>
                            <tbody>
                            {inquiryInfoModalReducer.inquiryCarArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td className="padding-left20">{item.id}</td>
                                        <td>{sysConst.INQUIRY_STATUS[item.type - 1].label}</td>
                                        <td className="message-td context-ellipsis">{item.content}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className="operation center">
                                            <i className="mdi mdi-table-search pink-font pointer" onClick={() => {
                                                this.showMessageModal(item.id)
                                            }}/>
                                        </td>
                                    </tr>
                                )
                            }, this)}
                            {inquiryInfoModalReducer.inquiryCarArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="7">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    <div className="row margin-bottom10 grey-text text-darken-2">
                        <div className="col s8 right-align">
                            <span className="fz14">估值总额：</span><span className="fz16">{formatUtil.formatNumber(99999)}</span>
                        </div>
                        <div className="col s4 right-align">
                            <span className="fz14">预计总运费：</span><span className="fz16">{formatUtil.formatNumber(99999,2)}</span>
                        </div>
                    </div>
                    <div className="row divider bold-divider"/>

                    {/** 已取消状态显示：取消时间 */}
                    <div className="row margin-top20 grey-text text-darken-2">
                        <div className="col s12 right-align">取消时间：XXXXXX XXXXXX</div>
                    </div>

                    {/** 已报价状态显示：报价信息 */}
                    <div className="row detail-box margin-top40 grey-text text-darken-2">
                        {/** 已完成状态显示：订单信息 */}
                        <div>
                            <div className="col s12 no-padding custom-grey">
                                <div className="col s6 margin-top10 margin-bottom10">
                                    生成订单编号：XXXXXXXXX
                                </div>
                                <div className="col s6 margin-top10 right-align">
                                    生成订单时间：XXXXXXX XXXX
                                    <span className="margin-left20 pink-font">订单详情 <i className="mdi mdi-chevron-up fz15"/></span>
                                    {/*<span className="margin-left20">订单详情 {inquiryInfoModalReducer.showCarInfoFlag ? <i className="mdi mdi-chevron-up fz15"/> : <i className="mdi mdi-chevron-down fz15"/>}</span>*/}
                                </div>
                            </div>
                            <div className="col s12 no-padding divider"/>

                            <div className="col s12 custom-dark-grey border-bottom-line">
                                <div className="row margin-top15 margin-bottom10">
                                    <div className="col s6 purple-font">运送车辆：{formatUtil.formatNumber(99999)}</div>
                                    <div className="col s6 pink-font right-align">已送达XXXX</div>
                                </div>
                                <div className="row detail-box">
                                    <table className="bordered">
                                        <thead className="custom-grey border-top-line">
                                        <tr className="grey-text text-darken-2">
                                            <th className="padding-left10">车型</th>
                                            <th className="center">是否新车</th>
                                            <th className="right-align">估值单价 ( 元 )</th>
                                            <th className="right-align">预计运费单价 ( 元 )</th>
                                            <th className="right-align">数量</th>
                                            <th className="right-align">估值总额 ( 元 )</th>
                                            <th className="right-align padding-right10">预计费用</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {inquiryInfoModalReducer.inquiryCarArray.map(function (item) {
                                            return (
                                                <tr className="grey-text text-darken-1">
                                                    <td className="padding-left20">{item.id}</td>
                                                    <td>{sysConst.INQUIRY_STATUS[item.type - 1].label}</td>
                                                    <td className="message-td context-ellipsis">{item.content}</td>
                                                    <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                                    <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                                    <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                                    <td className="operation center">
                                                        <i className="mdi mdi-table-search pink-font pointer" onClick={() => {
                                                            this.showMessageModal(item.id)
                                                        }}/>
                                                    </td>
                                                </tr>
                                            )
                                        }, this)}
                                        {inquiryInfoModalReducer.inquiryCarArray.length === 0 &&
                                        <tr className="grey-text white text-darken-1">
                                            <td className="no-data-tr" colSpan="7">暂无数据</td>
                                        </tr>}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="row margin-bottom10 grey-text text-darken-2">
                                    <div className="col s3">
                                        支付运费：<span className="fz16 pink-font">{formatUtil.formatNumber(99999,2)}</span> 元
                                    </div>
                                    <div className="col s4 right-align">
                                        退款：<span className="fz16 pink-font">{formatUtil.formatNumber(99999,2)}</span> 元
                                    </div>
                                    <div className="col s5 right-align">
                                        实收运费：<span className="fz16 pink-font">{formatUtil.formatNumber(99999,2)}</span> 元
                                    </div>
                                </div>
                                <div className="row divider bold-divider"/>

                                <div className="row margin-top15 margin-bottom10">
                                    <div className="col s12 purple-font">送到指定地点XXXX</div>
                                </div>
                                <div className="row divider margin-bottom10 bold-divider"/>

                                <div className="row margin-bottom10 grey-text">
                                    <div className="col s12 margin-top3">发货地址：XXXXXX XXXXXX XXXXXXXX</div>
                                    <div className="col s12 margin-top8">收货地址：XXXXXX XXXXXX XXXXXXXX</div>
                                </div>
                                <div className="row divider margin-bottom10 bold-divider"/>

                                <div className="row margin-bottom10 grey-text text-darken-2">
                                    <div className="col s12">备注：XXXXXX XXXXXX XXXXXXXX</div>
                                </div>
                            </div>

                            {/* 订单详情 */}
                            {/*{inquiryInfoModalReducer.showCarInfoFlag &&*/}
                            {/*<div className="row margin-left10 margin-right10 detail-box grey-text">*/}
                                {/*<div className="row">*/}
                                {/*</div>*/}

                                {/*<div className="dotted-line"/>*/}

                                {/*<div className="row">*/}
                                {/*</div>*/}
                            {/*</div>}*/}


                        </div>


                        <div className="col s6 margin-top10 margin-bottom10">
                            协商运费：<span className="fz16 pink-font">{formatUtil.formatNumber(99999,2)}</span>元
                        </div>
                        <div className="col s6 margin-top10 right-align">
                            协商时间：XXXXXXX XXXX
                        </div>

                        <div className="col s12 no-padding divider"/>

                        <div className="col s-percent-10 padding-right0 margin-top10">
                            报价描述：
                        </div>
                        <div className="col s-percent-90 margin-top10 margin-bottom10">
                            报价描述：报价描述 报价描述 报价描述 报价描述 报价描述 报价描述 报价描述 报价描述
                                        报价描述 报价描述 报价描述 报价描述 报价描述 报价描述 报价描述
                            报价描述 报价描述 报价描述 报价描述 报价描述 报价描述 报价描述
                            报价描述 报价描述 报价描述 报价描述 报价描述 报价描述 报价描述
                            报价描述 报价描述 报价描述 报价描述 报价描述 报价描述 报价描述
                            报价描述 报价描述 报价描述 报价描述 报价描述 报价描述 报价描述
                            报价描述 报价描述 报价描述 报价描述 报价描述 报价描述 报价描述
                            报价描述 报价描述 报价描述 报价描述 报价描述 报价描述 报价描述

                        </div>
                    </div>


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
        inquiryInfoModalReducer: state.InquiryInfoModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        $('#inquiryInfoModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InquiryInfoModal);