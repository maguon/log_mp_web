import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {
    OrderManagerDetailActionType,
    InquiryInfoModalActionType,
    EditUserAddressModalActionType,
    EditOrderCarModalActionType,
    NewOrderModalActionType,
    CancelOrderModalActionType
} from '../../actionTypes';
import {
    InquiryInfoModal,
    EditUserAddressModal,
    EditOrderCarModal,
    CancelOrderModal,
    NewPaymentModal,
    NewRefundModal,
    NewInvoiceModal,
    NewLoadTaskModal,
    LoadTaskCarDetailModal,
    EditLogAddressModal,
    SyncInfoModal
} from '../modules/index';

const orderManagerDetailAction = require('../../actions/main/OrderManagerDetailAction');
const inquiryInfoModalAction = require('../../actions/modules/InquiryInfoModalAction');
const editOrderCarModalAction = require('../../actions/modules/EditOrderCarModalAction');
const newPaymentModalAction = require('../../actions/modules/NewPaymentModalAction');
const newRefundModalAction = require('../../actions/modules/NewRefundModalAction');
const newInvoiceModalAction = require('../../actions/modules/NewInvoiceModalAction');
const transDemandManagerDetailAction = require('../../actions/main/TransDemandManagerDetailAction');
const newLoadTaskModalAction = require('../../actions/modules/NewLoadTaskModalAction');
const loadTaskCarDetailModalAction = require('../../actions/modules/LoadTaskCarDetailModalAction');
const editLogAddressModalAction = require('../../actions/modules/EditLogAddressModalAction');
const syncInfoModalAction = require('../../actions/modules/SyncInfoModalAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class OrderManagerDetail extends React.Component {

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
        // 清空创建的订单编号
        this.props.clearNewOrderId();
        // 取得用户信息
        this.props.getOrderInfo();
        $('ul.tabs').tabs();
    }

    /**
     * 详情头部：显示询价信息详细内容
     */
    showInquiryInfoModal = () => {
        this.props.initInquiryInfoModalData(this.props.orderManagerDetailReducer.orderInfo[0].inquiry_id,this.props.orderManagerDetailReducer.orderInfo[0].user_id);
        $('#inquiryInfoModal').modal('open');
    };

    /**
     * 订单信息TAB：显示 增加车辆/编辑车辆 模态画面
     */
    showEditOrderCarModal = (pageType, orderItem) => {
        this.props.initEditOrderCarModalData(pageType, this.props.orderManagerDetailReducer.orderInfo, orderItem);
        $('#editOrderCarModal').modal('open');
    };

    /**
     * 订单信息TAB：删除 运送车辆
     */
    deleteOrderItem = (orderItemId) => {
        this.props.deleteOrderItem(orderItemId);
    };

    /**
     * 订单信息TAB：修改 实际运费，实际保费
     */
    saveOrderItemInfo = (orderItem, transFee, insureFee) => {
        this.props.saveOrderItem(orderItem.id, $('#' + transFee).val(), $('#' + insureFee).val());
    };

    /**
     * 订单信息TAB：更新 订单状态
     */
    changeOrderStatus = (status, tipsTitle, tipsText) => {
        this.props.changeOrderStatus(status, tipsTitle, tipsText);
    };

    /**
     * 订单信息TAB：显示 更新 收发货信息 模态
     */
    showEditUserAddressModal = (pageType) => {
        this.props.initEditUserAddressModalData(pageType, this.props.orderManagerDetailReducer.orderInfo[0]);
        $('#editUserAddressModal').modal('open');
    };

    /**
     * 订单信息TAB：更新 订单备注
     */
    changeOrderRemark = (event) => {
        this.props.setOrderRemark(event.target.value);
    };

    /**
     * 订单信息TAB：取消订单按钮 点击事件
     */
    showCancelOrderModal = () => {
        this.props.initCancelOrderModalData();
        $('#cancelOrderModal').modal('open');
    };

    /**
     * 支付信息TAB：显示 支付 模态画面
     */
    showPaymentModal = (pageType, item) => {
        // 应付运费
        let freight = this.props.commonReducer.totalActFreight;
        // 应付保费
        let insuranceFee = this.props.commonReducer.totalInsuranceFee;
        // 应付总额
        let totalFee = this.props.commonReducer.totalActFreight + this.props.commonReducer.totalInsuranceFee;
        // 剩余应付
        let leftPayment = this.props.commonReducer.totalActFreight + this.props.commonReducer.totalInsuranceFee - this.props.orderManagerDetailReducer.orderPaymentPaid;

        this.props.initNewPaymentModalData(pageType, item, freight, insuranceFee, totalFee, leftPayment);
        $('#newPaymentModal').modal('open');
    };

    /**
     * 支付信息TAB：更新 订单支付备注
     */
    changeOrderPaymentRemark = (event) => {
        this.props.setOrderPaymentRemark(event.target.value);
    };

    /**
     * 支付信息TAB：显示 申请退款 模态画面
     */
    showRefundModal = (pageType, item) => {
        this.props.initNewRefundModalData(pageType, item);
        $('#newRefundModal').modal('open');
    };

    /**
     * 支付信息TAB：删除 申请退款
     */
    deleteRefundApply = (item) => {
        this.props.deleteRefundApply(item);
    };

    /**
     * 运输信息TAB：收发货地址 按钮
     */
    showEditLogAddressModal = () => {
        this.props.initEditLogAddressModalData();
        $('#editLogAddressModal').modal('open');
    };

    /**
     * 运输信息TAB：显示 线路安排 模态画面
     */
    showNewLoadTaskModal = (pageId, loadTaskId, loadTaskStatus) => {
        let orderId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].order_id;
        let requireId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].id;
        this.props.initNewLoadTaskModalData(pageId, orderId, requireId, loadTaskId, loadTaskStatus);
        $('#newLoadTaskModal').modal('open');
    };

    /**
     * 运输信息TAB：显示 车辆安排 模态画面
     */
    showLoadTaskCarDetailModal = (loadTaskId) => {
        let orderId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].order_id;
        let requireId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].id;
        this.props.initLoadTaskCarDetailModal(orderId, requireId, loadTaskId);
        $('#loadTaskCarDetailModal').modal('open');
    };

    /**
     * 发票信息TAB：显示 申请开票 模态画面
     */
    showNewInvoiceModal = (invoiceApplyInfo) => {
        this.props.initNewInvoiceModalData(invoiceApplyInfo);
        $('#newInvoiceModal').modal('open');
    };

    /**
     * 发票信息TAB：删除 发票申请
     */
    deleteInvoiceApply = (invoiceApplyId) => {
        this.props.deleteInvoiceApply(invoiceApplyId);
    };

    render() {
        const {
            commonReducer, orderManagerDetailReducer, transDemandManagerDetailReducer,
            getOrderInfo, getPaymentInfo, getTransDemandInfo, getInvoiceList, getOperationList,generateTransTask,
            changeRequireStatus,
            syncLoadTask, deleteLoadTask,changeLoadTaskStatus,
            saveOrderRemark,saveOrderPaymentRemark
        } = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/order', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">订单管理 - 订单详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row">
                    {/* TAB 头部 */}
                    <div className="col s12">
                        {/* 用户详情：基本信息 */}
                        {orderManagerDetailReducer.orderInfo.length > 0 &&
                        <div className="order-detail-header">
                            {/* 左侧：基本信息 */}
                            <div className="col s7 grey-text text-darken-1">
                                {/* 第一行 */}
                                <div className="margin-top5">
                                    {/* 开始城市 */}
                                    <span className="fz20 purple-font">{orderManagerDetailReducer.orderInfo[0].start_city}</span>
                                    <img className="margin-left30 margin-right30" src="../../../assets/images/transport.png"/>
                                    {/* 目的城市 */}
                                    <span className="fz20 purple-font">{orderManagerDetailReducer.orderInfo[0].end_city}</span>
                                    {/* 服务类型 */}
                                    <span className="margin-left30">
                                        {commonUtil.getJsonValue(sysConst.SERVICE_MODE, orderManagerDetailReducer.orderInfo[0].service_type)}
                                    </span>
                                    {/* 询价信息 按钮 */}
                                    {orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[1].value &&
                                    <button type="button" className="margin-left30 btn purple-btn btn-height24 fz14" onClick={this.showInquiryInfoModal}>询价信息</button>}
                                </div>

                                {/* 第二行 */}
                                <div className="margin-top15">
                                    {/* 订单类型 */}
                                    <span className="purple-font">{commonUtil.getJsonValue(sysConst.ORDER_TYPE, orderManagerDetailReducer.orderInfo[0].created_type)}</span>
                                    {orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[1].value &&
                                    <span>
                                        {/* 用户 */}
                                        <i className="margin-left30 fz20 pink-font mdi mdi-account"/>
                                        <span className="margin-left10">{orderManagerDetailReducer.orderInfo[0].user_name} ( ID：{orderManagerDetailReducer.orderInfo[0].user_id} )</span>
                                        {/* 电话 */}
                                        <i className="margin-left30 fz20 pink-font mdi mdi-cellphone"/>
                                        <span className="margin-left10">{orderManagerDetailReducer.orderInfo[0].phone}</span>
                                    </span>}
                                </div>
                            </div>

                            {/* 右侧：基本信息 */}
                            <div className="col s5 grey-text text-darken-1 right-align">
                                <div>订单编号：{orderManagerDetailReducer.orderInfo[0].id}</div>
                                <div className="margin-top10">
                                    <span>创建时间：{formatUtil.getDateTime(orderManagerDetailReducer.orderInfo[0].created_on)}</span>
                                    <span className="margin-left30">创建人：{orderManagerDetailReducer.orderInfo[0].admin_name}</span>
                                </div>
                                <div className="margin-top10 pink-font">
                                    {commonUtil.getJsonValue(sysConst.ORDER_STATUS, orderManagerDetailReducer.orderInfo[0].status)}
                                </div>
                            </div>
                        </div>}
                        <InquiryInfoModal/>
                        <ul className="tabs">
                            <li className="tab col s-percent-20"><a className="active" href="#tab-order" onClick={getOrderInfo}>订单信息</a></li>
                            <li className="tab col s-percent-20"><a href="#tab-payment-info" onClick={getPaymentInfo}>支付信息</a></li>
                            <li className="tab col s-percent-20"><a href="#tab-log-info" onClick={getTransDemandInfo}>运输信息</a></li>
                            <li className="tab col s-percent-20"><a href="#tab-invoice" onClick={getInvoiceList}>发票信息</a></li>
                            <li className="tab col s-percent-20"><a href="#tab-operation" onClick={getOperationList}>操作记录</a></li>
                        </ul>
                    </div>

                    {/* TAB 1 : 订单信息TAB */}
                    <div id="tab-order" className="col s12">
                        {/** 存在订单数据时，显示下面具体内容 */}
                        {orderManagerDetailReducer.orderInfo.length > 0 &&
                        <div>
                            {/** 待完善信息：内部订单时，增加车辆 按钮 */}
                            {orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[0].value && orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[0].value &&
                            <div className="row margin-top20 margin-right60 margin-bottom0 right-align">
                                <button type="button" className={`btn custom-btn ${commonReducer.orderCarArray.length > 0 ? '' : 'disabled'}`}
                                        onClick={() => {this.changeOrderStatus(sysConst.ORDER_STATUS[1].value, '确定要完善信息？')}}>完善信息</button>
                                <button type="button" className="btn confirm-btn margin-left20"
                                        onClick={() => {this.showEditOrderCarModal('new','')}}>增加车辆</button>
                            </div>}

                            {/** 待完善价格：回到待完善信息/完善价格 按钮 */}
                            {orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[1].value &&
                            <div className="row margin-top20 margin-right60 margin-bottom0 right-align">
                                <button type="button" className="btn custom-btn width-auto"
                                        onClick={() => {this.changeOrderStatus(sysConst.ORDER_STATUS[0].value, '确定要回到待完善信息？','')}}>回到待完善信息</button>
                                <button type="button" className="btn confirm-btn margin-left20"
                                        onClick={() => {this.changeOrderStatus(sysConst.ORDER_STATUS[2].value, '确定要完善价格？','')}}>完善价格</button>
                            </div>}

                            {/** 待生成需求：生成运输需求/重新完善价格 按钮 */}
                            {orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[2].value &&
                            <div className="row margin-top20 margin-right60 margin-bottom0 right-align">
                                <button type="button" className="btn custom-btn width-auto"
                                        onClick={() => {this.changeOrderStatus(sysConst.ORDER_STATUS[1].value, '确定要重新完善价格？','')}}>重新完善价格</button>
                                <button type="button" className="btn confirm-btn width-auto margin-left20"
                                        onClick={generateTransTask}>生成运输需求</button>
                            </div>}
                            <EditOrderCarModal/>

                            {/* 运送车辆 */}
                            <div className={`row margin-left50 margin-right50 ${
                                ((orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[0].value && orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[0].value)
                                    || orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[1].value
                                    || orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[2].value) ? "" : "margin-top40"}`}>
                                <div className="col s12 pink-font">
                                    <i className="mdi mdi-car fz20"/>
                                    <span className="margin-left10 fz16">运送车辆</span>
                                    {commonReducer.orderCarArray.length > 0 &&
                                    <span className="fz16">： {formatUtil.formatNumber(commonReducer.orderCarArray.length)}</span>}
                                </div>

                                {/* 运送车辆 列表 */}
                                {commonReducer.orderCarArray.length > 0 &&
                                <div className="col s12 margin-top5">
                                    <table className="detail-box bordered">
                                        <thead className="custom-grey border-top-line">
                                        <tr className="grey-text text-darken-2">
                                            <th className="padding-left10">VIN</th>
                                            <th className="center">车型</th>
                                            <th className="center">品牌</th>
                                            <th className="center">型号</th>
                                            <th className="center">新车</th>
                                            <th className="right-align">估值</th>
                                            <th className="center">保险</th>
                                            <th className="right-align width-150">实际运费</th>
                                            <th className="right-align width-200">实际保费</th>
                                            <th className="right-align">实际费用</th>
                                            {/* 内部订单，并且是：待完善信息 状态时，显示 */}
                                            {orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[0].value &&
                                            orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[0].value &&
                                            <th className="width-100"/>}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {commonReducer.orderCarArray.map(function (item, key) {
                                            return (
                                                <tr className="grey-text text-darken-1">
                                                    <td className="padding-left10">{item.vin}</td>
                                                    <td className="center">{commonUtil.getJsonValue(sysConst.CAR_MODEL, item.model_type)}</td>
                                                    <td className="center">{item.brand}</td>
                                                    <td className="center">{item.brand_type}</td>
                                                    <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.old_car)}</td>
                                                    <td className="right-align">{formatUtil.formatNumber(item.valuation,2)}</td>
                                                    {/* 是否保险 */}
                                                    <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.safe_status)}</td>
                                                    {/* 实际运费 */}
                                                    <td className="right-align width-150">
                                                        {/* 待完善价格 状态时，可编辑 */}
                                                        {orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[1].value &&
                                                        <input id={`trans_index${key}`} type="number" defaultValue={item.act_trans_price} className="margin-bottom0 width-100 right-align"/>}

                                                        {/* 待完善价格 状态 以外时，只显示 */}
                                                        {orderManagerDetailReducer.orderInfo[0].status !== sysConst.ORDER_STATUS[1].value &&
                                                        <span>{formatUtil.formatNumber(item.act_trans_price, 2)}</span>}
                                                    </td>
                                                    {/* 实际保费 */}
                                                    <td className="right-align width-200">
                                                        {/* 待完善价格 状态时，可编辑 */}
                                                        {orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[1].value &&
                                                        <div>
                                                            <input id={`insure_index${key}`} type="number" defaultValue={item.act_insure_price} className="margin-bottom0 width-100 right-align"/>
                                                            <i className="mdi mdi-checkbox-marked-circle margin-left20 fz24 purple-font pointer"
                                                               onClick={()=> {this.saveOrderItemInfo(item,`trans_index${key}`,`insure_index${key}`)}}/>
                                                        </div>}
                                                        {/* 待完善价格 状态 以外时，只显示 */}
                                                        {orderManagerDetailReducer.orderInfo[0].status !== sysConst.ORDER_STATUS[1].value &&
                                                        <span>{formatUtil.formatNumber(item.act_insure_price, 2)}</span>}
                                                    </td>

                                                    {/* 实际费用 */}
                                                    <td className="right-align">{formatUtil.formatNumber(item.act_trans_price + item.act_insure_price, 2)}</td>
                                                    {/* 操作 内部订单，并且是：待完善信息 状态时，显示 */}
                                                    {orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[0].value &&
                                                    orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[0].value &&
                                                    <td className="right-align width-100">
                                                        <i className="mdi mdi-pencil margin-left30 fz20 pink-font pointer" onClick={()=> {this.showEditOrderCarModal('edit',item)}}/>
                                                        <i className="mdi mdi-delete margin-left10 fz20 pink-font pointer" onClick={()=> {this.deleteOrderItem(item.id)}}/>
                                                    </td>}
                                                </tr>
                                            )
                                        }, this)}
                                        </tbody>
                                    </table>
                                </div>}

                                {/* 运送车辆 总计 */}
                                {commonReducer.orderCarArray.length > 0 &&
                                <div className="col s12 margin-top20 grey-text text-darken-2">
                                    <div className="col s3">
                                        估值总额：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalValuation,2)}</span> 元
                                    </div>
                                    <div className="col s3 right-align">
                                        运费总额：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalActFreight,2)}</span> 元
                                    </div>
                                    <div className="col s3 right-align">
                                        保费总额：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalInsuranceFee,2)}</span> 元
                                    </div>
                                    <div className="col s3 right-align">
                                        总费用：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalActFreight + commonReducer.totalInsuranceFee,2)}</span> 元
                                    </div>
                                </div>}

                                {/* 分割线 */}
                                <div className="col s12"><div className="col s12 margin-top5 divider bold-divider"/></div>

                                {/* 外部订单，并且没有 运送车辆 时，提示文字 */}
                                {orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[1].value && commonReducer.orderCarArray.length === 0 &&
                                <div className="col s12 margin-top10 grey-text text-lighten-1">等待用户完善车辆信息</div>}
                            </div>

                            {/* 收发货信息 */}
                            <div className="row margin-top40 margin-left50 margin-right50">
                                <div className="col s12 pink-font">
                                    <i className="mdi mdi-truck fz20"/>
                                    <span className="margin-left10 fz16">收发货信息</span>
                                </div>
                                <div className="col s12"><div className="col s12 margin-top5 divider bold-divider"/></div>

                                {/* 发货信息 详情 */}
                                <div>
                                    <div className="col s4 margin-top10">
                                        <i className="mdi mdi-account-outline fz20 pink-font"/>
                                        <span className="margin-left10">发货人：{orderManagerDetailReducer.orderInfo[0].send_name} {orderManagerDetailReducer.orderInfo[0].send_phone}</span>
                                    </div>

                                    <div className="col s7 margin-top10">
                                        <i className="mdi mdi-map-marker-outline fz20 pink-font"/>
                                        <span className="margin-left10">地址：{orderManagerDetailReducer.orderInfo[0].send_address}</span>
                                    </div>
                                    {(orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[0].value ||
                                        orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[1].value ||
                                        orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[2].value) &&
                                    <div className="col s1 margin-top10 right-align pink-font"><i className="mdi mdi-pencil fz20 pointer" onClick={() => {this.showEditUserAddressModal('send')}}/></div>}
                                    <div className="col s12"><div className="col s12 margin-top10 divider"/></div>
                                </div>

                                {/* 收货信息 详情 */}
                                <div>
                                    <div className="col s4 margin-top10">
                                        <i className="mdi mdi-account-outline fz20 orange-text text-lighten-3"/>
                                        <span className="margin-left10">收货人：{orderManagerDetailReducer.orderInfo[0].recv_name} {orderManagerDetailReducer.orderInfo[0].recv_phone}</span>
                                    </div>
                                    <div className="col s7 margin-top10">
                                        <i className="mdi mdi-map-marker-outline fz20 orange-text text-lighten-3"/>
                                        <span className="margin-left10">地址：{orderManagerDetailReducer.orderInfo[0].recv_address}</span>
                                    </div>
                                    {(orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[0].value ||
                                        orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[1].value ||
                                        orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[2].value) &&
                                    <div className="col s1 margin-top10 right-align pink-font"><i className="mdi mdi-pencil fz20 pointer" onClick={() => {this.showEditUserAddressModal('receive')}}/></div>}
                                    <div className="col s12"><div className="col s12 margin-top10 divider"/></div>
                                </div>
                                <EditUserAddressModal/>
                            </div>

                            {/* 客户备注 (仅外部订单 显示)*/}
                            {orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[1].value &&
                             orderManagerDetailReducer.orderInfo[0].remark !== null && orderManagerDetailReducer.orderInfo[0].remark !== '' &&
                            <div className="row margin-top40 margin-left50 margin-right50">
                                <div className="col s12 pink-font">
                                    <i className="mdi mdi-square-edit-outline fz20"/>
                                    <span className="margin-left10 fz16">客户备注</span>
                                </div>
                                <div className="col s12"><div className="col s12 margin-top5 divider bold-divider"/></div>

                                <div>
                                    <div className="col s12 margin-top10">{orderManagerDetailReducer.orderInfo[0].remark}</div>
                                    <div className="col s12"><div className="col s12 margin-top10 divider"/></div>
                                </div>
                            </div>}

                            {/* 客服备注 */}
                            <div className="row margin-top40 margin-left50 margin-right50 position-relative">
                                <Input s={12} label="客服备注" value={orderManagerDetailReducer.orderRemark} onChange={this.changeOrderRemark}/>
                                {/* 客服备注 已取消/已完成 以外状态时，可以编辑 */}
                                {(orderManagerDetailReducer.orderInfo[0].status !== sysConst.ORDER_STATUS[5].value &&
                                    orderManagerDetailReducer.orderInfo[0].status !== sysConst.ORDER_STATUS[6].value) &&
                                <i className="mdi mdi-checkbox-marked-circle confirm-icon fz30 purple-font pointer" onClick={saveOrderRemark}/>}
                            </div>

                            {/** 取消订单 按钮 */}
                            {(orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[0].value || orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[1].value
                                || orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[2].value || orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[3].value) &&
                            <div className="row margin-right60 right-align">
                                <CancelOrderModal/>
                                <button type="button" className="btn custom-btn" onClick={this.showCancelOrderModal}>取消订单</button>
                            </div>}

                            {/* 取消原因 已取消 状态时，显示详情 */}
                            {orderManagerDetailReducer.orderInfo[0].cancel_reason !== null && orderManagerDetailReducer.orderInfo[0].cancel_reason !== '' &&
                            orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[5].value &&
                            <div className="row margin-top40 margin-left50 margin-right50">
                                <div className="col s12 pink-font">
                                    <i className="mdi mdi-square-edit-outline fz20"/>
                                    <span className="margin-left10 fz16">取消原因</span>
                                </div>
                                <div className="col s12"><div className="col s12 margin-top5 divider bold-divider"/></div>
                                <div className="col s12 margin-top10">{orderManagerDetailReducer.orderInfo[0].cancel_reason}</div>
                                <div className="col s12"><div className="col s12 margin-top10 divider"/></div>
                            </div>}
                        </div>}
                    </div>

                    {/* TAB 2 : 支付信息TAB */}
                    <div id="tab-payment-info" className="col s12">
                        {orderManagerDetailReducer.orderInfo.length > 0 &&
                        <div>
                            {/* 头部：支付概述 */}
                            <div className="row margin-top40 margin-left50 margin-right50 detail-box">
                                <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                    <div className="col s4">
                                        应收款：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalActFreight + commonReducer.totalInsuranceFee,2)}</span> 元
                                    </div>
                                    <div className="col s4">
                                        实收款：<span className="fz16 pink-font">{formatUtil.formatNumber(orderManagerDetailReducer.orderPaymentPaid + orderManagerDetailReducer.orderPaymentRefund,2)}</span> 元
                                    </div>
                                    {/* 支付状态 */}
                                    <div className="col s4 pink-font right-align">
                                        {commonUtil.getJsonValue(sysConst.ORDER_PAYMENT_STATUS, orderManagerDetailReducer.orderInfo[0].payment_status)}
                                    </div>
                                </div>
                                <div className="col s12 padding-top15 padding-bottom15">
                                    <div className="col s4">
                                        已支付：<span className="fz16 pink-font">{formatUtil.formatNumber(orderManagerDetailReducer.orderPaymentPaid,2)}</span> 元
                                    </div>

                                    <div className="col s4">
                                        剩余应付：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalActFreight + commonReducer.totalInsuranceFee - orderManagerDetailReducer.orderPaymentPaid,2)}</span> 元
                                    </div>

                                    <div className="col s4 right-align">
                                        已退款：<span className="fz16 pink-font">{formatUtil.formatNumber(orderManagerDetailReducer.orderPaymentRefund,2)}</span> 元
                                    </div>
                                </div>
                            </div>

                            {/* 第二部分：支付信息 */}
                            <div className="row margin-top40 margin-left50 margin-right50">
                                <div className="col s6 no-padding pink-font">
                                    <i className="mdi mdi-currency-cny fz20"/>
                                    <span className="margin-left10 fz16">支付信息</span>
                                </div>

                                {/* 追加支付 按钮 内部订单 并且 是 未支付/部分支付 时 显示 */}
                                <div className="col s6 no-padding right-align">
                                    {orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[0].value &&
                                    (orderManagerDetailReducer.orderInfo[0].payment_status === sysConst.ORDER_PAYMENT_STATUS[0].value ||
                                    orderManagerDetailReducer.orderInfo[0].payment_status === sysConst.ORDER_PAYMENT_STATUS[1].value) &&
                                    <button type="button" className="btn confirm-btn" onClick={() => {this.showPaymentModal('new','')}}>支付</button>}
                                </div>
                                {/* 分割线 */}
                                <div className="col s12 no-padding"><div className="col s12 margin-top5 divider bold-divider"/></div>
                                <NewPaymentModal/>

                                {/* 外部订单，并且没有 运送车辆 时，提示文字 */}
                                {orderManagerDetailReducer.orderPaymentArray.length === 0 &&
                                <div className="col s12 no-padding margin-top10 grey-text text-lighten-1">暂无支付信息</div>}
                            </div>

                            {/* 支付信息 明细 */}
                            {orderManagerDetailReducer.orderPaymentArray.map(function (item) {
                                return (
                                    <div className="row margin-top20 margin-left50 margin-right50 detail-box">
                                        <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                            <div className="col s6 purple-font">支付编号：{item.id}</div>
                                            {/* 支付状态 */}
                                            <div className="col s6 pink-font right-align">
                                                {commonUtil.getJsonValue(sysConst.PAYMENT_STATUS, item.status)}
                                                {/* 申请中的 可编辑 */}
                                                {item.status === sysConst.PAYMENT_STATUS[0].value &&
                                                <i className="mdi mdi-pencil margin-left20 pointer" onClick={() => {this.showPaymentModal('edit',item)}}/>}
                                            </div>
                                        </div>
                                        <div className="col s12 padding-top15 padding-bottom15 border-bottom-dotted-line">
                                            <div className="col s2">支付方式：{commonUtil.getJsonValue(sysConst.PAYMENT_MODE, item.payment_type)}</div>
                                            <div className="col s7 no-padding">支付账户：{item.bank} {item.bank_code} {item.account_name}</div>
                                            <div className="col s3 right-align">支付时间：{formatUtil.getDateTime(item.created_on)}</div>
                                        </div>
                                        <div className="col s12 padding-top15 padding-bottom15">
                                            <div className="col s12 right-align">
                                                支付金额：<span className="fz16 pink-font">{formatUtil.formatNumber(item.total_fee,2)}</span> 元
                                            </div>
                                        </div>
                                    </div>
                                )
                            },this)}

                            {/* 支付备注 */}
                            <div className="row margin-top10 margin-left40 margin-right50 position-relative">
                                <Input s={12} label="支付备注" value={orderManagerDetailReducer.orderPaymentRemark} onChange={this.changeOrderPaymentRemark}/>
                                {/* 支付备注 已取消/已完成 以外状态时，可以编辑 */}
                                {(orderManagerDetailReducer.orderInfo[0].status !== sysConst.ORDER_STATUS[5].value &&
                                    orderManagerDetailReducer.orderInfo[0].status !== sysConst.ORDER_STATUS[6].value) &&
                                <i className="mdi mdi-checkbox-marked-circle confirm-icon fz30 purple-font pointer" onClick={saveOrderPaymentRemark}/>}
                            </div>

                            {/* 第三部分：退款申请 */}
                            <div className="row margin-top40 margin-left50 margin-right50">
                                <div className="col s6 no-padding pink-font">
                                    <i className="mdi mdi-currency-cny fz20"/>
                                    <span className="margin-left10 fz16">退款申请</span>
                                </div>

                                {/* 追加支付 按钮 内部订单 显示 */}
                                <div className="col s6 no-padding right-align">
                                    {orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[0].value && orderManagerDetailReducer.orderPaymentSize > 0 &&
                                    <button type="button" className="btn custom-btn" onClick={() => {this.showRefundModal('new','')}}>退款</button>}
                                </div>
                                {/* 分割线 */}
                                <div className="col s12 no-padding"><div className="col s12 margin-top5 divider bold-divider"/></div>
                                <NewRefundModal/>

                                {/* 外部订单，并且没有 运送车辆 时，提示文字 */}
                                {orderManagerDetailReducer.orderRefundApplyArray.length === 0 &&
                                <div className="col s12 no-padding margin-top10 grey-text text-lighten-1">暂无退款信息</div>}
                            </div>

                            {/* 退款申请 明细 */}
                            {orderManagerDetailReducer.orderRefundApplyArray.map(function (item) {
                                return (
                                    <div className="row margin-top20 margin-left50 margin-right50 detail-box">
                                        <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                            <div className="col s6">退款编号：{item.id}</div>
                                            {/* 支付状态 */}
                                            <div className="col s6 pink-font right-align">
                                                {commonUtil.getJsonValue(sysConst.REFUND_STATUS, item.status)}
                                                {/* 申请中的 可编辑 */}
                                                {item.status === sysConst.REFUND_STATUS[2].value &&
                                                <span>
                                                    <i className="mdi mdi-pencil margin-left20 pointer" onClick={() => {this.showRefundModal('edit',item)}}/>
                                                    <i className="mdi mdi-close margin-left10 pointer" onClick={() => {this.deleteRefundApply(item)}}/>
                                                </span>}
                                            </div>
                                        </div>
                                        <div className="col s12 padding-top15 padding-bottom15 border-bottom-dotted-line">
                                            <div className="col s6">
                                                申请金额：<span className="fz16 pink-font">{formatUtil.formatNumber(item.apply_fee, 2)}</span> 元
                                            </div>
                                            <div className="col s6 right-align">申请时间：{formatUtil.getDateTime(item.created_on)}</div>
                                        </div>
                                        <div className="col s12 padding-top15 padding-bottom15 border-bottom-dotted-line">
                                            <div className="col s6">支付账户：{item.bank} {item.bank_code} {item.account_name}</div>
                                            <div className="col s3 no-padding">支付时间：{formatUtil.getDateTime(item.created_on)}</div>
                                            <div className="col s3 right-align">
                                                支付金额：<span className="fz16 pink-font">{formatUtil.formatNumber(item.total_fee, 2)}</span> 元
                                            </div>
                                        </div>
                                        <div className="col s12 padding-top15 padding-bottom15 border-bottom-dotted-line">
                                            <div className="col s12">申请原因：{item.apply_reason}</div>
                                        </div>

                                        {/* 已退款/已拒绝 状态：显示退款描述 */}
                                        {(item.status === sysConst.REFUND_STATUS[0].value || item.status === sysConst.REFUND_STATUS[1].value) &&
                                        <div>
                                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-dotted-line">
                                                {item.status === sysConst.REFUND_STATUS[0].value &&
                                                <div className="col s12">拒绝原因：{item.refuse_reason}</div>}
                                                {item.status === sysConst.REFUND_STATUS[1].value &&
                                                <div className="col s12">退款描述：{item.remark}</div>}
                                            </div>
                                            <div className="col s12 padding-top15 padding-bottom15">
                                                <div className="col s6">
                                                    {/* 已退款 状态：显示退款金额 */}
                                                    {item.status === sysConst.REFUND_STATUS[1].value &&
                                                    <span>退款金额：<span className="fz16 pink-font">{formatUtil.formatNumber(item.refund_fee, 2)}</span> 元</span>}
                                                </div>
                                                <div className="col s6 right-align">处理时间：{formatUtil.getDateTime(item.updated_on)}</div>
                                            </div>
                                        </div>}
                                    </div>
                                )
                            }, this)}
                        </div>}
                    </div>

                    {/* TAB 3 : 运输信息TAB */}
                    <div id="tab-log-info" className="col s12">
                        {transDemandManagerDetailReducer.transDemandInfo.length === 0 &&
                        <div className="row center margin-top50 grey-text fz18">
                            暂无运输信息
                        </div>}
                        {transDemandManagerDetailReducer.transDemandInfo.length > 0 &&
                        <div>
                            <div className="padding-top10 grey-text text-darken-1">
                                <div className="col s6 padding-left30">需求创建时间：{formatUtil.getDateTime(transDemandManagerDetailReducer.transDemandInfo[0].created_on)}</div>
                                <div className="col s6 padding-right30 right-align pink-font">
                                    {commonUtil.getJsonValue(sysConst.TRANS_DEMAND_STATUS,transDemandManagerDetailReducer.transDemandInfo[0].status)}
                                </div>
                                <div className="col s12 divider custom-divider margin-top10"/>
                            </div>

                            {/* 待安排 */}
                            {transDemandManagerDetailReducer.transDemandInfo[0].status === sysConst.TRANS_DEMAND_STATUS[0].value &&
                            <div className="col s12 margin-top20 padding-left50 padding-right50">
                                {/** 开始安排 按钮 */}
                                <div className="row margin-bottom10 right-align">
                                    <button type="button" className="btn confirm-btn margin-left20" onClick={() => {
                                        changeRequireStatus(transDemandManagerDetailReducer.transDemandInfo[0].id, sysConst.TRANS_DEMAND_STATUS[1].value)
                                    }}>开始安排
                                    </button>
                                </div>
                            </div>}

                            {/* 已安排 */}
                            {transDemandManagerDetailReducer.transDemandInfo[0].status !== sysConst.TRANS_DEMAND_STATUS[0].value &&
                            <div className="col s12 margin-top20 padding-left50 padding-right50">
                                {/** 收发货地址/增加线路 按钮 */}
                                {transDemandManagerDetailReducer.transDemandInfo[0].status === sysConst.TRANS_DEMAND_STATUS[1].value &&
                                <div className="row margin-bottom10 right-align">
                                    {transDemandManagerDetailReducer.transDemandInfo[0].service_type === sysConst.SERVICE_MODE[1].value &&
                                    <button type="button" className="btn custom-btn" onClick={this.showEditLogAddressModal}>收发货地址</button>}
                                    <button type="button" className="btn confirm-btn margin-left20" onClick={() => {this.showNewLoadTaskModal('new','', '')}}>增加线路</button>
                                    <button type="button" className="btn orange-btn margin-left20" onClick={() => {
                                        changeRequireStatus(transDemandManagerDetailReducer.transDemandInfo[0].id, sysConst.TRANS_DEMAND_STATUS[2].value)
                                    }}>完成需求
                                    </button>
                                </div>}
                                <SyncInfoModal/>
                                <EditLogAddressModal/>
                                <NewLoadTaskModal/>
                                <LoadTaskCarDetailModal/>

                                <div className="row margin-top20 margin-bottom5 pink-font">
                                    <div className="col s6">
                                        <i className="mdi mdi-truck fz20"/>
                                        <span className="margin-left10 fz16">运输线路</span>
                                    </div>
                                    <div className="col s6 margin-top5 right-align">线路数：{formatUtil.formatNumber(transDemandManagerDetailReducer.loadTaskArray.length)}</div>
                                </div>
                                <div className="row divider bold-divider"/>

                                {/* 运输线路列表 */}
                                {transDemandManagerDetailReducer.loadTaskArray.map(function (item) {
                                    return (
                                        <div className="row margin-top20 detail-box z-depth-1 grey-text">
                                            <div className="col s12 padding-bottom10 custom-grey border-bottom-line">
                                                <div className="col s6 margin-top10">
                                                    <span className="fz16 purple-font bold-font">{item.route_start} -- {item.route_end}</span>
                                                    {item.trans_type === 1 && <i className="mdi mdi-truck-fast fz20 pink-font margin-left30"/>}
                                                    {item.trans_type === 2 && <i className="mdi mdi-ferry fz20 pink-font margin-left30"/>}
                                                    <span className="margin-left30 grey-text text-darken-2">{item.supplier_short}</span>
                                                </div>
                                                <div className="col s6 fz20 pink-font margin-top10 right-align">
                                                    {item.close_flag === 0 &&
                                                    <i className="mdi mdi-sync pointer" onClick={() => {
                                                        syncLoadTask(transDemandManagerDetailReducer.transDemandInfo[0].id, item.id, item.hook_id, transDemandManagerDetailReducer.transDemandInfo[0].status)
                                                    }}/>}

                                                    {/* 编辑图标，已安排 并且 未同步 显示 */}
                                                    {transDemandManagerDetailReducer.transDemandInfo[0].status === sysConst.TRANS_DEMAND_STATUS[1].value && item.hook_id === 0 &&
                                                    <i className="mdi mdi-pencil margin-left30 pointer" onClick={() => {
                                                        this.showNewLoadTaskModal('edit', item.id, item.load_task_status)
                                                    }}/>}

                                                    {/* 显示图标，(已安排 并且 已同步) 或者 已完成 显示 */}
                                                    {((transDemandManagerDetailReducer.transDemandInfo[0].status === sysConst.TRANS_DEMAND_STATUS[1].value && item.hook_id !== 0)
                                                    || transDemandManagerDetailReducer.transDemandInfo[0].status === sysConst.TRANS_DEMAND_STATUS[2].value) &&
                                                    <i className="mdi mdi-car margin-left30 pointer" onClick={() => {
                                                        this.showLoadTaskCarDetailModal(item.id)
                                                    }}/>}

                                                    {/* 删除图标，仅在已安排状态显示 */}
                                                    {(transDemandManagerDetailReducer.transDemandInfo[0].status === sysConst.TRANS_DEMAND_STATUS[1].value && item.load_task_status === sysConst.LOAD_TASK_STATUS[0].value) &&
                                                    <i className="mdi mdi-close margin-left30 pointer" onClick={() => {deleteLoadTask(item.require_id, item.id)}}/>}
                                                </div>
                                            </div>

                                            <div className="col s12 padding-top15 padding-bottom10">
                                                <div className="col s6">线路编号：{item.id}</div>
                                                <div className="col s6 right-align">线路创建时间：{formatUtil.getDateTime(item.created_on)}</div>
                                            </div>

                                            <div className="col s12 padding-bottom15 border-bottom-line grey-text text-darken-2">
                                                <div className="col s6">安排车辆数：<span className="fz16 pink-font">{formatUtil.formatNumber(item.car_count)}</span></div>
                                                <div className="col s6 right-align">预计发货时间：{item.plan_date}</div>
                                            </div>

                                            <div className="col s12 padding-top15 padding-bottom15">
                                                <div className="col s11 no-padding">
                                                    {/* 待发运 */}
                                                    <div className="col s-percent-5"><i className="mdi mdi-checkbox-marked-circle fz36 pink-font"/></div>
                                                    <div className="col s-percent-7 no-padding">
                                                        <div className="margin-top5 pink-font">{sysConst.LOAD_TASK_STATUS[0].label}</div>
                                                        <div>{formatUtil.getDate(item.created_on)}</div>
                                                    </div>

                                                    {/* 分割线 */}
                                                    <div className="col s-percent-31"><div className="col s12 bold-divider margin-top25"/></div>

                                                    {/* 已发运 */}
                                                    <div className="col s-percent-5"><i className={`mdi mdi-checkbox-marked-circle fz36 ${item.load_task_status !== sysConst.LOAD_TASK_STATUS[0].value ? "pink-font" : ""}`}/></div>
                                                    <div className="col s-percent-7 no-padding">
                                                        <div className={`${item.load_task_status !== sysConst.LOAD_TASK_STATUS[0].value ? "margin-top5 pink-font" : "margin-top15"}`}>{sysConst.LOAD_TASK_STATUS[1].label}</div>
                                                        <div>{item.load_date}</div>
                                                    </div>

                                                    {/* 分割线 */}
                                                    <div className="col s-percent-31"><div className="col s12 bold-divider margin-top25"/></div>

                                                    {/* 已送达 */}
                                                    <div className="col s-percent-5"><i className={`mdi mdi-checkbox-marked-circle fz36 ${item.load_task_status === sysConst.LOAD_TASK_STATUS[2].value ? "pink-font" : ""}`}/></div>
                                                    <div className="col s-percent-7 no-padding">
                                                        <div className={`${item.load_task_status === sysConst.LOAD_TASK_STATUS[2].value ? "margin-top5 pink-font" : "margin-top15"}`}>{sysConst.LOAD_TASK_STATUS[2].label}</div>
                                                        <div>{item.arrive_date}</div>
                                                    </div>
                                                </div>

                                                <div className="col s1 no-padding margin-top15 center">
                                                    {item.load_task_status !== sysConst.LOAD_TASK_STATUS[2].value &&
                                                    <button type="button" className="btn purple-btn btn-height24 fz14" onClick={() => {changeLoadTaskStatus(item.require_id, item.id, item.load_task_status)}}>变更状态</button>}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }, this)}
                            </div>}
                        </div>}
                    </div>

                    {/* TAB 4 : 发票信息TAB */}
                    <div id="tab-invoice" className="col s12">
                        {orderManagerDetailReducer.orderInfo.length > 0 &&
                        <div>
                            {/** 内部订单，没有发票信息，并且为已完成状态时，显示 申请开票 按钮 */}
                            {orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[0].value &&
                            orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[6].value &&
                            orderManagerDetailReducer.invoiceArray.length === 0 &&
                            <div className="row margin-top40 margin-right60 margin-bottom0 right-align">
                                <button type="button" className="btn confirm-btn margin-left20"
                                        onClick={() => {this.showNewInvoiceModal('')}}>申请开票</button>
                                <NewInvoiceModal/>
                            </div>}
                            {/** 外部订单时，没有发票信息时，显示 暂无发票信息  */}
                            {((orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[0].value &&
                                orderManagerDetailReducer.orderInfo[0].status !== sysConst.ORDER_STATUS[6].value &&
                                orderManagerDetailReducer.invoiceArray.length === 0) ||
                            (orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[1].value && orderManagerDetailReducer.invoiceArray.length === 0)) &&
                            <div className="row center grey-text margin-top50 fz18">
                                暂无发票信息
                            </div>}

                            {/* 主体：发票信息 */}
                            {orderManagerDetailReducer.invoiceArray.length > 0 &&
                            <div className="row margin-top40 margin-left50 margin-right50 detail-box">
                                <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                    <div className="col s6">
                                        发票申请编号：{orderManagerDetailReducer.invoiceArray[0].invoice_apply_id}
                                    </div>
                                    {/* 发票状态 */}
                                    <div className="col s6 pink-font right-align">
                                        {commonUtil.getJsonValue(sysConst.INVOICE_STATUS, orderManagerDetailReducer.invoiceArray[0].invoiced_status)}


                                        {/* 编辑按钮 */}
                                        {orderManagerDetailReducer.invoiceArray[0].invoiced_status !== sysConst.INVOICE_STATUS[1].value &&
                                        <span>
                                            <i className="mdi mdi-close pointer fz20 margin-left20" onClick={() => {this.deleteInvoiceApply(orderManagerDetailReducer.invoiceArray[0].invoice_apply_id)}}/>
                                            <i className="mdi mdi-pencil pointer fz20 margin-left20" onClick={() => {this.showNewInvoiceModal(orderManagerDetailReducer.invoiceArray[0])}}/>
                                            <NewInvoiceModal/>
                                        </span>}
                                    </div>
                                </div>
                                <div className="col s12 padding-top15 padding-bottom15 border-bottom-dotted-line">
                                    <div className="col s6">发票抬头：{orderManagerDetailReducer.invoiceArray[0].title}</div>
                                    <div className="col s6 right-align">税号：{orderManagerDetailReducer.invoiceArray[0].tax_number}</div>
                                    <div className="col s6 margin-top10">开户银行：{orderManagerDetailReducer.invoiceArray[0].bank}</div>
                                    <div className="col s6 margin-top10 right-align">银行账户：{orderManagerDetailReducer.invoiceArray[0].bank_code}</div>
                                    <div className="col s9 margin-top10">企业地址：{orderManagerDetailReducer.invoiceArray[0].company_address}</div>
                                    <div className="col s3 margin-top10 right-align">电话号码：{orderManagerDetailReducer.invoiceArray[0].company_phone}</div>
                                    <div className="col s12 margin-top10">备注：{orderManagerDetailReducer.invoiceArray[0].remark}</div>
                                </div>
                                {orderManagerDetailReducer.invoiceArray[0].invoiced_status === sysConst.INVOICE_STATUS[2].value &&
                                <div className="col s12 padding-top15 padding-bottom15 border-bottom-dotted-line">
                                    <div className="col s12">拒绝原因：{orderManagerDetailReducer.invoiceArray[0].refuse_reason}</div>
                                </div>}
                                <div className="col s12 padding-top15 padding-bottom15 grey-text">
                                    <div className="col s6">申请时间：{formatUtil.getDateTime(orderManagerDetailReducer.invoiceArray[0].created_on)}</div>
                                    <div className="col s6 right-align">
                                        {orderManagerDetailReducer.invoiceArray[0].invoiced_status !== sysConst.INVOICE_STATUS[0].value &&
                                        <span>处理时间：{formatUtil.getDateTime(orderManagerDetailReducer.invoiceArray[0].created_on)}</span>}
                                    </div>
                                </div>
                            </div>}
                        </div>}
                    </div>







                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orderManagerDetailReducer: state.OrderManagerDetailReducer,
        transDemandManagerDetailReducer: state.TransDemandManagerDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 询价信息 模态
    initInquiryInfoModalData: (inquiryId, userId) => {
        dispatch(InquiryInfoModalActionType.setPrePage('order'));
        dispatch(inquiryInfoModalAction.getInquiryInfo(inquiryId, userId));
        dispatch(inquiryInfoModalAction.getInquiryCarList(inquiryId, userId));
    },
    // 清除内部订单编号
    clearNewOrderId: () => {
        dispatch(NewOrderModalActionType.setNewOrderId(''));
    },

    // TAB1：订单信息
    getOrderInfo: () => {
        dispatch(orderManagerDetailAction.getOrderInfo(ownProps.match.params.id));
        dispatch(commonAction.getOrderCarList(ownProps.match.params.id));
    },
    initEditOrderCarModalData: (pageType, orderInfo, orderItem) => {
        dispatch(EditOrderCarModalActionType.setPageType(pageType));
        dispatch(EditOrderCarModalActionType.setOrderInfo(orderInfo));
        dispatch(editOrderCarModalAction.initOrderCarData(pageType, orderItem));
    },
    deleteOrderItem: (orderItemId) => {
        dispatch(orderManagerDetailAction.deleteOrderItem(ownProps.match.params.id, orderItemId))
    },
    changeOrderStatus: (value, tipsTitle, tipsText) => {
        dispatch(orderManagerDetailAction.changeOrderStatus(ownProps.match.params.id, value, tipsTitle, tipsText))
    },
    generateTransTask: () => {
        dispatch(orderManagerDetailAction.generateTransTask(ownProps.match.params.id))
    },
    saveOrderItem: (orderItemId, actTransFee, actInsuranceFee) => {
        dispatch(orderManagerDetailAction.saveOrderItem(ownProps.match.params.id, orderItemId, actTransFee, actInsuranceFee))
    },
    initEditUserAddressModalData: (pageType, orderInfo) => {
        dispatch(EditUserAddressModalActionType.setOrderId(ownProps.match.params.id));
        dispatch(EditUserAddressModalActionType.setPageType(pageType));
        if (pageType === 'send') {
            dispatch(EditUserAddressModalActionType.setOrderUser(orderInfo.send_name == null ? "" : orderInfo.send_name));
            dispatch(EditUserAddressModalActionType.setOrderPhone(orderInfo.send_phone == null ? "" : orderInfo.send_phone));
            dispatch(EditUserAddressModalActionType.setOrderAddress(orderInfo.send_address == null ? "" : orderInfo.send_address));
        } else {
            dispatch(EditUserAddressModalActionType.setOrderUser(orderInfo.recv_name == null ? "" : orderInfo.recv_name));
            dispatch(EditUserAddressModalActionType.setOrderPhone(orderInfo.recv_phone == null ? "" : orderInfo.recv_phone));
            dispatch(EditUserAddressModalActionType.setOrderAddress(orderInfo.recv_address == null ? "" : orderInfo.recv_address));
        }
    },
    setOrderRemark: (value) => {
        dispatch(OrderManagerDetailActionType.setOrderRemark(value))
    },
    saveOrderRemark: (value) => {
        dispatch(orderManagerDetailAction.saveOrderRemark(ownProps.match.params.id))
    },
    initCancelOrderModalData: () => {
        dispatch(CancelOrderModalActionType.setOrderId(ownProps.match.params.id));
        dispatch(CancelOrderModalActionType.setRemark(''));
    },

    // TAB2：支付信息
    getPaymentInfo: () => {
        dispatch(orderManagerDetailAction.getOrderInfo(ownProps.match.params.id));
        dispatch(orderManagerDetailAction.getOrderPaymentList(ownProps.match.params.id));
        dispatch(orderManagerDetailAction.getOrderRefundList(ownProps.match.params.id));
    },
    initNewPaymentModalData: (pageType, item, freight, insuranceFee, totalFee, leftPayment) => {
        dispatch(newPaymentModalAction.initNewPaymentModal(ownProps.match.params.id, freight, insuranceFee, totalFee, leftPayment, pageType, item));
    },
    initNewRefundModalData: (pageType,item) => {
        dispatch(newRefundModalAction.initNewRefundModal(ownProps.match.params.id, pageType, item));
    },
    deleteRefundApply: (item) => {
        dispatch(orderManagerDetailAction.deleteRefundApply(item));
    },
    setOrderPaymentRemark: (value) => {
        dispatch(OrderManagerDetailActionType.setOrderPaymentRemark(value))
    },
    saveOrderPaymentRemark: (value) => {
        dispatch(orderManagerDetailAction.saveOrderPaymentRemark(ownProps.match.params.id))
    },

    // TAB3：运输信息

    // 取得需求基本信息
    getTransDemandInfo: () => {
        dispatch(transDemandManagerDetailAction.getTransDemandInfoByOrder(ownProps.match.params.id));
    },
    // 更新需求状态
    changeRequireStatus: (requireId, status) => {
        dispatch(transDemandManagerDetailAction.changeStatus(requireId, status, ownProps.match.params.id));
    },
    // 显示/修改 收发货地址
    initEditLogAddressModalData: () => {
        dispatch(editLogAddressModalAction.initEditLogAddressModal(ownProps.match.params.id));
    },
    // 进行同步/显示同步信息
    syncLoadTask: (requireId, loadTaskId, hookId, status) => {
        // 没同步的进行同步
        if (hookId === 0) {
            if (status === sysConst.TRANS_DEMAND_STATUS[1].value) {
                dispatch(transDemandManagerDetailAction.syncLoadTask(requireId, loadTaskId));
            } else {
                swal('暂无同步信息', '', 'warning');
            }
        } else {
            dispatch(syncInfoModalAction.initSyncInfoModal(loadTaskId));
            // 显示同步信息
            $('#syncInfoModal').modal('open');
        }
    },
    // 增加/修改 线路安排
    initNewLoadTaskModalData: (pageId, orderId, requireId, loadTaskId, loadTaskStatus) => {
        // 初始化画面
        dispatch(newLoadTaskModalAction.initNewLoadTaskModal(pageId, orderId, requireId, loadTaskId, loadTaskStatus));
        // 城市列表
        dispatch(commonAction.getCityList());
        // 供应商列表
        dispatch(commonAction.getSupplierList());
    },
    // 车辆安排
    initLoadTaskCarDetailModal: (orderId, requireId, loadTaskId) => {
        // 初始化画面
        dispatch(loadTaskCarDetailModalAction.initLoadTaskCarDetailModal(orderId, requireId, loadTaskId));
    },
    // 删除指定线路
    deleteLoadTask: (requireId, loadTaskId) => {
        dispatch(transDemandManagerDetailAction.deleteLoadTask(requireId, loadTaskId));
    },
    // 更新线路状态
    changeLoadTaskStatus: (requireId, loadTaskId, status) => {
        dispatch(transDemandManagerDetailAction.changeLoadTaskStatus(requireId, loadTaskId, status));
    },

    // TAB4：发票信息
    getInvoiceList: () => {
        dispatch(orderManagerDetailAction.getInvoiceList(ownProps.match.params.id))
    },
    initNewInvoiceModalData: (invoiceApplyInfo) => {
        dispatch(newInvoiceModalAction.initNewInvoiceModal('orderManagerDetail', ownProps.match.params.id, invoiceApplyInfo));
    },
    deleteInvoiceApply: (invoiceApplyId) => {
        dispatch(orderManagerDetailAction.deleteInvoiceApply(invoiceApplyId, ownProps.match.params.id))
    },

    // TAB5：操作记录
    getOperationList: () => {
        // dispatch(orderManagerDetailAction.getOperationList(ownProps.match.params.id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderManagerDetail)