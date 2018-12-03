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
                    {/* TAB 头部 */}
                    <div className="col s12">
                        {/* 订单详情：基本信息 */}
                        {inquiryManagerDetailReducer.orderInfo.length > 0 &&
                        <div className="order-detail-header">
                            {/* 基本信息：订单编号 */}
                            <div className="col s6">订单编号：{inquiryManagerDetailReducer.orderInfo[0].id}</div>
                            {/* 基本信息：下单时间 */}
                            <div className="col s-percent-40 right-align">
                                <span className="grey-text fz14">下单时间：{formatUtil.getDateTime(inquiryManagerDetailReducer.orderInfo[0].created_on)}</span>
                            </div>

                            {/* 基本信息：支付/发货/取消 状态 */}
                            <div className="col s-percent-10 right-align">
                                {inquiryManagerDetailReducer.orderInfo[0].status === 1
                                    ?
                                    <span>{sysConst.CANCEL_STATUS[inquiryManagerDetailReducer.orderInfo[0].status].label}</span>
                                    :
                                    <span>{sysConst.PAYMENT_STATUS[inquiryManagerDetailReducer.orderInfo[0].payment_status].label}/{sysConst.LOG_STATUS[inquiryManagerDetailReducer.orderInfo[0].log_status].label}</span>
                                }
                            </div>

                            {/* 基本信息：订单描述 */}
                            <div className="col s6 grey-text fz14 margin-top10 context-ellipsis">{inquiryManagerDetailReducer.orderInfo[0].remark}</div>
                            {/* 基本信息：用户 电话 微信昵称 */}
                            <div className="col s6 margin-top10 right-align">
                                <span><i className="mdi mdi-account margin-right10 fz20"/>{inquiryManagerDetailReducer.orderInfo[0].user_name}</span>
                                <span className="margin-left50"><i className="mdi mdi-cellphone margin-right10 fz20"/>{inquiryManagerDetailReducer.orderInfo[0].phone}</span>
                                <span className="margin-left50"><i className="mdi mdi-wechat margin-right10 fz20"/>{inquiryManagerDetailReducer.orderInfo[0].wechat_name}</span>
                            </div>
                        </div>}

                        {/* 订单详情：订单信息/售后信息 TAB菜单 */}
                        <ul className="tabs">
                            <li className="tab col s6"><a href="#tab-base" className="active" onClick={this.showOrderInfoTab}>订单信息</a></li>
                            <li className="tab col s6"><a href="#tab-after-sale" onClick={this.showFeedBackTab}>售后信息</a></li>
                        </ul>
                    </div>

                    {/* TAB 1 : 订单信息TAB */}
                    <div id="tab-base" className="col s12">
                        {/* 订单信息：明细 */}
                        {inquiryManagerDetailReducer.orderInfo.length > 0 &&
                        <div>
                            {/* 购买信息 */}
                            <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                                <div className="row detail-box-header margin-bottom0">
                                    购买信息
                                </div>

                                <div className="col s12 grey-text">
                                    {inquiryManagerDetailReducer.productArray.length === 0 &&
                                    <div className="row center grey-text margin-top20 fz15">
                                        该订单暂无商品记录
                                    </div>}
                                    {inquiryManagerDetailReducer.productArray.map(function (item) {
                                        return (
                                            <div className="col s12 border-bottom-line padding-top20 padding-bottom20">
                                                <div className="col no-padding s-percent-10">
                                                    {(item.imag == null || item.imag === '')
                                                        ? <div className="no-img-box"/>
                                                        : <img className="img-size-100" src={"http://" + fileHost + "/api/image/" + item.imag}/>
                                                    }
                                                </div>
                                                <div className="col s-percent-90 margin-top10 padding-right0">
                                                    <div className="col s6 grey-text text-darken-1">{item.product_name}</div>
                                                    <div className="col s6 right-align">x <span className="fz16">{item.prod_count}</span></div>
                                                    <div className="col s12 margin-top10">{item.remark}</div>
                                                    <div className="col s6 margin-top10">
                                                        单价：¥ <span className="fz16">{formatUtil.formatNumber(item.unit_price, 2)}</span>
                                                    </div>
                                                    <div className="col s6 margin-top10 right-align">
                                                        总价：¥ <span className="fz16">{formatUtil.formatNumber(item.total_price, 2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    },this)}

                                    <div className="col s12 padding-top20 padding-bottom20">
                                        <div className="col s8 no-padding context-ellipsis">
                                            收货地址：{inquiryManagerDetailReducer.orderInfo[0].recv_address} {inquiryManagerDetailReducer.orderInfo[0].recv_name} {inquiryManagerDetailReducer.orderInfo[0].recv_phone}
                                        </div>
                                        <div className="col s4 right-align">
                                            ( 运费：¥ {formatUtil.formatNumber(inquiryManagerDetailReducer.orderInfo[0].total_freight, 2)} )
                                            <span className="margin-left30">合计：¥ </span>
                                            <span className="fz16 red-font bold-font">
                                            {formatUtil.formatNumber(inquiryManagerDetailReducer.orderInfo[0].total_price + inquiryManagerDetailReducer.orderInfo[0].total_freight, 2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* 已取消的订单 显示：取消时间 */}
                                {inquiryManagerDetailReducer.orderInfo[0].status === 1 &&
                                <div className="col s12 padding-top20 padding-bottom20 box-top-line">
                                    <div className="col s12 grey-text right-align padding-right20">
                                        取消时间：{formatUtil.getDateTime(inquiryManagerDetailReducer.orderInfo[0].updated_on)}
                                    </div>
                                </div>
                                }
                            </div>

                            {/* 支付信息 */}
                            {inquiryManagerDetailReducer.orderInfo[0].status === 0 && inquiryManagerDetailReducer.orderInfo[0].payment_status === 1 && inquiryManagerDetailReducer.paymentInfo.length > 0 &&
                            <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                                <div className="row detail-box-header margin-bottom0">
                                    支付信息
                                </div>

                                {/* 支付信息 */}
                                {inquiryManagerDetailReducer.paymentInfo.map(function (item) {
                                    return (
                                        <div className="col s12 padding-top20 padding-bottom20 grey-text border-bottom-line">
                                            <div className={`col s2 bold-font ${item.type === 0 ?"red-font":"blue-font"}`}>
                                                {sysConst.PAYMENT_TYPE[item.type].label}
                                            </div>
                                            <div className="col s6">金额：¥ <span className="red-font bold-font fz16">{formatUtil.formatNumber(item.total_fee, 2)}</span></div>
                                            <div className="col s4 fz14 right-align padding-right20">
                                                支付时间：{formatUtil.getDateTime(item.created_on)}
                                            </div>
                                        </div>
                                    )
                                },this)}
                            </div>}

                            {/* 发货信息 */}
                            {inquiryManagerDetailReducer.orderInfo[0].status === 0 && inquiryManagerDetailReducer.logInfo.length > 0 &&
                            <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                                <div className="row detail-box-header margin-bottom0">
                                    发货信息
                                </div>

                                {/* 发货信息 */}
                                <div className="col s12 padding20 grey-text text-darken-2">
                                    {/* 支付信息 */}
                                    {inquiryManagerDetailReducer.logInfo.map(function (item) {
                                        return (
                                            <div className="col s12 margin-top10 detail-box custom-grey">

                                                <div className="col s6 margin-top20 fz14 grey-text">发货编号：{item.id}</div>
                                                <div className="col s6 margin-top20 fz14 grey-text right-align">
                                                    操作时间：{formatUtil.getDateTime(item.updated_on)}
                                                </div>

                                                <div className="col s8 margin-top10 margin-bottom10 grey-text fz14">收货地址：{item.recv_address}</div>
                                                <div className="col s4 margin-top10 margin-bottom10 right-align">
                                                    收货人：{item.recv_name} ({item.recv_phone})
                                                </div>

                                                {item.status === 1 && <div>
                                                    {/* 分割线 */}
                                                    <div className="col s12 dotted-line"/>

                                                    <div className="col s4 margin-top10 margin-bottom10">快递公司：{item.company_name}</div>
                                                    <div className="col s4 margin-top10 margin-bottom10">快递编号：{item.log_num}</div>
                                                    <div className="col s4 margin-top10 margin-bottom10 right-align">
                                                        快递费用：¥ {formatUtil.formatNumber(item.freight, 2)}
                                                    </div>
                                                </div>}
                                            </div>
                                        )
                                    },this)}
                                </div>
                            </div>}
                        </div>}
                    </div>

                    {/* TAB 2 : 售后信息TAB */}
                    <div id="tab-after-sale" className="col s12">
                        {/* 售后信息 */}
                        {inquiryManagerDetailReducer.feedBackInfo.length === 0 &&
                        <div className="row center grey-text margin-top40 fz18">
                            暂无售后信息
                        </div>}

                        {inquiryManagerDetailReducer.feedBackInfo.length > 0 &&
                        <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                            {/* 售后编号 处理状态 */}
                            <div className="row detail-box-header margin-bottom0">
                                <div className="col s6 no-padding">售后编号：{inquiryManagerDetailReducer.feedBackInfo[0].id}</div>
                                <div className="col s6 no-padding right-align">{sysConst.FEED_BACK_STATUS[inquiryManagerDetailReducer.feedBackInfo[0].status].label}</div>
                            </div>

                            {/* 用户申请 */}
                            <div className="col s12 padding-top20 padding-bottom10 grey-text">
                                <div className="col s6 blue-font bold-font">用户申请</div>
                                <div className="col s6 fz14 right-align">申请时间：{formatUtil.getDateTime(inquiryManagerDetailReducer.feedBackInfo[0].created_on)}</div>
                            </div>

                            <div className="col s12 padding-left20 padding-right20"><div className="col s12 blue-divider"/></div>

                            <div className="col s12 padding-top20 padding-bottom20">
                                <div className="col s-percent-8 grey-text text-darken-2">申请原因：</div>
                                <div className="col s-percent-92 padding-left0 grey-text">{inquiryManagerDetailReducer.feedBackInfo[0].apply_reason}</div>
                            </div>

                            <div className="col s12 padding-left20 padding-right20"><div className="col s12 divider"/></div>

                            {/* 售后处理 */}
                            <div className="col s12 padding-top20 padding-bottom10">
                                <div className="col s6 blue-font bold-font">售后处理</div>
                                <div className="col s6 fz14 right-align">
                                    {inquiryManagerDetailReducer.feedBackInfo[0].status === 1 && <span>处理时间：{formatUtil.getDateTime(inquiryManagerDetailReducer.feedBackInfo[0].updated_on)}</span>}
                                </div>
                            </div>

                            <div className="col s12 padding-left20 padding-right20 padding-bottom10"><div className="col s12 blue-divider"/></div>

                            <div className="col s12">
                                <Input s={12} label="处理描述" className="right-align" value={inquiryManagerDetailReducer.processRemark} onChange={this.changeProcessRemark}/>
                                <Input s={12} label="处理方法" className="right-align" value={inquiryManagerDetailReducer.processMethod} onChange={this.changeProcessMethod}/>
                            </div>

                            <div className="col s12 right-align padding-bottom20 padding-right20">
                                <button type="button" className="btn confirm-btn" onClick={() => {updateFeedBack(inquiryManagerDetailReducer.feedBackInfo[0].id)}}>修改</button>
                            </div>
                        </div>}

                        {/* 退款 补发 按钮 */}
                        {/*{inquiryManagerDetailReducer.feedBackInfo.length > 0 &&*/}
                        {/*<div>*/}
                            {/*<div className="col s12 right-align padding-right70">*/}
                                {/*<button type="button" className="btn confirm-btn" onClick={this.showRefundModal}>退款</button>*/}
                                {/*<button type="button" className="btn confirm-btn margin-left20" onClick={this.showReSendModal}>补发</button>*/}
                            {/*</div>*/}
                            {/*<RefundModal/>*/}
                            {/*<ReSendModal/>*/}
                        {/*</div>}*/}
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