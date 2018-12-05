import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
// import {OrderDetailActionType, RefundModalActionType, ReSendModalActionType} from '../../actionTypes';
// import {RefundModal,ReSendModal} from '../modules/index';
import {fileHost} from "../../config/HostConfig";

// const orderDetailAction = require('../../actions/main/OrderDetailAction');
// const refundModalAction = require('../../actions/modules/RefundModalAction');
// const reSendModalAction = require('../../actions/modules/ReSendModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

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
        // this.props.getOrderInfo();
        // 初始化TAB
        $('ul.tabs').tabs();
    }

    /**
     * 订单信息TAB：点击事件
     */
    showOrderInfoTab = () => {
        // 取得售后详情信息
        this.props.getOrderInfo();
    };

    /**
     * 售后信息TAB：点击事件
     */
    showFeedBackTab = () => {
        // 取得售后详情信息
        this.props.getFeedBackInfo();
    };

    /**
     * 售后信息TAB：更新 处理描述
     */
    changeProcessRemark = (event) => {
        this.props.setProcessRemark(event.target.value);
    };

    /**
     * 售后信息TAB：更新 处理方法
     */
    changeProcessMethod = (event) => {
        this.props.setProcessMethod(event.target.value);
    };

    // /**
    //  * 售后信息TAB：显示 退款 模态画面
    //  */
    // showRefundModal = () => {
    //     $('#refundModal').modal('open');
    //     this.props.initRefundModalData(this.props.inquiryManagerDetailReducer.feedBackInfo);
    // };
    //
    // /**
    //  * 售后信息TAB：补发按钮 点击事件
    //  */
    // showReSendModal = () => {
    //     $('#reSendModal').modal('open');
    //     this.props.initReSendModalData();
    // };

    render() {
        const {inquiryManagerDetailReducer, updateFeedBack} = this.props;
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
                        <span className="page-title margin-left30">询价管理 - 询价详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row">
                    {/* 头部 */}
                    <div className="col s12">
                        {/* 询价详情：基本信息 */}
                        <div className="inquiry-detail-header">
                            {/* 左侧：图标 */}
                            <div className="col s8 margin-top5 grey-text text-darken-1">
                                <div>
                                    <span className="fz20 purple-font">大连</span>
                                    <img className="margin-left30 margin-right30" src="../../../assets/images/transport.png"/>
                                    <span className="fz20 purple-font">沈阳</span>
                                    <span className="margin-left30">送到指定地点</span>
                                </div>

                                <div className="margin-top15">
                                    <i className="mdi mdi-account fz20 pink-font"/>
                                    <span className="margin-left10">王大治 ( ID：XXXXX )</span>

                                    <i className="mdi mdi-cellphone margin-left30 fz20 pink-font"/>
                                    <span className="margin-left10">999 9999 9999</span>
                                </div>

                            </div>

                            <div className="col s4 margin-top10 right-align grey-text text-darken-1">
                                <div className="margin-top3">询价时间：XXXXX XXXXXX</div>
                                <div className="margin-top15 pink-font">待报价XXXXX XXXXXX</div>
                            </div>
                        </div>
                    </div>

                    {/* 主体 */}
                    <div className="col s12 margin-top40 padding-left50 padding-right50">

                        <div className="row margin-bottom10 right-align">
                            <button type="button" className="btn cancel-btn">取消询价</button>
                            <button type="button" className="btn confirm-btn margin-left20">重新报价</button>
                            <button type="button" className="btn orange-btn margin-left20">生成订单</button>
                        </div>

                        <div className="row margin-bottom10 margin-left5 pink-font bold-font">
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
                                {inquiryManagerDetailReducer.inquiryCarArray.map(function (item) {
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
                                {inquiryManagerDetailReducer.inquiryCarArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="7">暂无数据</td>
                                </tr>}
                                </tbody>
                            </table>
                        </div>

                        <div className="row margin-bottom10 grey-text text-darken-2 bold-font">
                            <div className="col s8">
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
                            <div className="bold-font">
                                <div className="col s12 no-padding custom-grey">
                                    <div className="col s6 margin-top10 margin-bottom10">
                                        生成订单编号：XXXXXXXXX
                                    </div>
                                    <div className="col s6 margin-top10 right-align">
                                        生成订单时间：XXXXXXX XXXX
                                    </div>
                                </div>
                                <div className="col s12 no-padding divider"/>
                            </div>


                            <div className="col s6 margin-top10 margin-bottom10 bold-font">
                                协商运费：<span className="fz16 pink-font">{formatUtil.formatNumber(99999,2)}</span> 元
                            </div>
                            <div className="col s6 margin-top10 right-align bold-font">
                                协商时间：XXXXXXX XXXX
                            </div>

                            <div className="col s12 no-padding divider"/>

                            <div className="col s-percent-8 padding-right0 margin-top10 bold-font">
                                协商描述：
                            </div>
                            <div className="col s-percent-92 padding-left0 margin-top10 margin-bottom10 grey-text">
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


                        {/** 已取消状态显示：取消时间 / 取消原因 */}
                        <div className="row detail-box margin-top40 grey-text text-darken-2">
                            <div className="bold-font">
                                <div className="col s12 padding-top10 padding-bottom10 right-align custom-grey">取消时间：XXXXXX XXXXXX</div>
                                <div className="col s12 no-padding divider"/>
                            </div>

                            <div className="col s12 no-padding divider"/>

                            <div className="col s-percent-8 padding-right0 margin-top10 bold-font">
                                取消原因：
                            </div>
                            <div className="col s-percent-92 padding-left0 margin-top10 margin-bottom10 grey-text">
                                取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因
                                取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因
                                取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因
                                取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因取消原因
                            </div>
                        </div>
                    </div>
                </div>
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
    // getOrderInfo: () => {
    //     dispatch(orderDetailAction.getOrderInfo(ownProps.match.params.id));
    //     dispatch(orderDetailAction.getOrderDetail(ownProps.match.params.id));
    //     dispatch(orderDetailAction.getPaymentInfo(ownProps.match.params.id));
    //     dispatch(orderDetailAction.getLogInfo(ownProps.match.params.id));
    // },
    // getFeedBackInfo: () => {
    //     dispatch(orderDetailAction.getFeedBackInfo(ownProps.match.params.id))
    // },
    // setProcessRemark: (value) => {
    //     dispatch(OrderDetailActionType.setProcessRemark(value))
    // },
    // setProcessMethod: (value) => {
    //     dispatch(OrderDetailActionType.setProcessMethod(value))
    // },
    // initRefundModalData: (feedBackInfo) => {
    //     dispatch(refundModalAction.getOrderInfo(ownProps.match.params.id));
    //     dispatch(RefundModalActionType.setPaymentId(feedBackInfo[0].id));
    //     dispatch(RefundModalActionType.setRefundMoney(''));
    //     dispatch(RefundModalActionType.setRemark(''));
    // },
    // initReSendModalData: () => {
    //     dispatch(ReSendModalActionType.setOrderId(ownProps.match.params.id));
    //     dispatch(reSendModalAction.getOrderInfo(ownProps.match.params.id));
    // },
    // updateFeedBack: (feedBackId) => {
    //     dispatch(orderDetailAction.updateFeedBack(feedBackId, ownProps.match.params.id))
    // }
});

export default connect(mapStateToProps, mapDispatchToProps)(InquiryManagerDetail)