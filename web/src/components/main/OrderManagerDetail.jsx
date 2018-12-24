import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {
    OrderManagerDetailActionType, InquiryInfoModalActionType, EditUserAddressModalActionType,EditOrderCarModalActionType,
    CancelOrderModalActionType
} from '../../actionTypes';
import {InquiryInfoModal, EditUserAddressModal, EditOrderCarModal, CancelOrderModal} from '../modules/index';

const orderManagerDetailAction = require('../../actions/main/OrderManagerDetailAction');
const inquiryInfoModalAction = require('../../actions/modules/InquiryInfoModalAction');
const editOrderCarModalAction = require('../../actions/modules/EditOrderCarModalAction');
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
        // 取得用户信息
        this.props.getOrderInfo();
        $('ul.tabs').tabs();
    }

    /**
     * 显示询价信息详细内容
     */
    showInquiryInfoModal = () => {
        this.props.initInquiryInfoModalData(this.props.orderManagerDetailReducer.orderInfo[0].inquiry_id,this.props.orderManagerDetailReducer.orderInfo[0].user_id);
        $('#inquiryInfoModal').modal('open');
    };

    /**
     * 显示 增加车辆/编辑车辆 模态画面
     */
    showEditOrderCarModal = (pageType) => {
        this.props.initEditOrderCarModalData(pageType, this.props.orderManagerDetailReducer.orderInfo);
        $('#editOrderCarModal').modal('open');
    };

    /**
     * 更新 订单备注
     */
    saveOrderItemInfo = (actFee, premium) => {

        console.log('actFee',$('#' + actFee).val());
        console.log('premium',$('#' + actFee).text());
    };

    /**
     * 更新 订单状态
     */
    changeOrderStatus = (status) => {
        this.props.changeOrderStatus(status);
    };

    /**
     * 显示 更新 收发货信息
     */
    showEditUserAddressModal = (pageType) => {
        this.props.initEditUserAddressModalData(pageType, this.props.orderManagerDetailReducer.orderInfo[0]);
        $('#editUserAddressModal').modal('open');
    };

    /**
     * 更新 订单备注
     */
    changeOrderRemark = (event) => {
        this.props.setOrderRemark(event.target.value);
    };

    /**
     * 取消订单按钮 点击事件
     */
    showCancelOrderModal = () => {
        this.props.initCancelOrderModalData();
        $('#cancelOrderModal').modal('open');
    };

    render() {
        const {
            orderManagerDetailReducer, commonReducer,
            getOrderInfo, getPaymentInfo, getLogInfo, getInvoiceList, getOperationList,
            changeInquiryConditionStartCity, changeInquiryConditionEndCity,
            changeInquiryConditionServiceType, changeInquiryConditionStatus,
            saveOrderRemark
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
                            <li className="tab col s-percent-20"><a href="#tab-log-info" onClick={getLogInfo}>运输信息</a></li>
                            <li className="tab col s-percent-20"><a href="#tab-invoice" onClick={getInvoiceList}>发票信息</a></li>
                            <li className="tab col s-percent-20"><a href="#tab-operation" onClick={getOperationList}>操作记录</a></li>
                        </ul>
                    </div>

                    {/* TAB 1 : 订单信息TAB */}
                    <div id="tab-order" className="col s12">
                        {/** 存在订单数据时，显示下面具体内容 */}
                        {orderManagerDetailReducer.orderInfo.length > 0 &&
                        <div>
                            {/** 外部订单：回到待完善信息/完善价格 按钮 */}
                            {orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[1].value && orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[1].value &&
                            <div className="row margin-top20 margin-right60 margin-bottom0 right-align">
                                <button type="button" className="btn cancel-btn width-auto" onClick={() => {this.changeOrderStatus(sysConst.ORDER_STATUS[0].value)}}>回到待完善信息</button>
                                <button type="button" className="btn confirm-btn margin-left20" onClick={() => {this.changeOrderStatus(sysConst.ORDER_STATUS[2].value)}}>完善价格</button>
                            </div>}

                            {/** 外部订单：生成运输需求/重新完善价格 按钮 */}
                            {orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[1].value && orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[2].value &&
                            <div className="row margin-top20 margin-right60 margin-bottom0 right-align">
                                <button type="button" className="btn cancel-btn width-auto" onClick={() => {this.changeOrderStatus(sysConst.ORDER_STATUS[3].value)}}>生成运输需求</button>
                                <button type="button" className="btn confirm-btn width-auto margin-left20" onClick={() => {this.changeOrderStatus(sysConst.ORDER_STATUS[1].value)}}>重新完善价格</button>
                            </div>}

                            {/** 内部订单：增加车辆 按钮 */}
                            {orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[0].value && orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[0].value &&
                            <div className="row margin-top20 margin-right60 margin-bottom0 right-align">
                                <button type="button" className="btn confirm-btn" onClick={() => {this.showEditOrderCarModal('new')}}>增加车辆</button>
                            </div>}

                            <EditOrderCarModal/>

                            {/* 运送车辆 */}
                            <div className={`row margin-left50 margin-right50 ${(orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[1].value
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
                                            <th className="center">是否新车</th>
                                            <th className="right-align">估值 ( 元 )</th>
                                            <th className="right-align padding-right50 width-300">实际费用 ( 元 )</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {commonReducer.orderCarArray.map(function (item, key) {
                                            return (
                                                <tr className="grey-text text-darken-1">
                                                    <td className="padding-left10">{item.vin}</td>
                                                    <td className="center">{commonUtil.getJsonValue(sysConst.CAR_MODEL, item.model_type)}</td>
                                                    <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.old_car)}</td>
                                                    <td className="right-align">{formatUtil.formatNumber(item.valuation,2)}</td>
                                                    <td className="right-align padding-right10 width-300">
                                                        {orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[1].value &&
                                                        <div>
                                                            <input id={`index${key}`} defaultValue={item.act_price} className="margin-bottom0 width-200 right-align"/>
                                                            <i className="mdi mdi-checkbox-marked-circle margin-left20 fz24 purple-font pointer" onClick={()=> {this.saveOrderItemInfo(`index${key}`,`index${key}`)}}/>
                                                        </div>}
                                                        {orderManagerDetailReducer.orderInfo[0].status !== sysConst.ORDER_STATUS[1].value &&
                                                        <span className="margin-right50">{formatUtil.formatNumber(item.act_price, 2)}</span>}
                                                    </td>
                                                </tr>
                                            )
                                        }, this)}
                                        </tbody>
                                    </table>
                                </div>}

                                {/* 运送车辆 总计 */}
                                {commonReducer.orderCarArray.length > 0 &&
                                <div className="col s12 margin-top20 grey-text text-darken-2">
                                    <div className="col s6">
                                        估值总额：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalValuation,2)}</span> 元
                                    </div>
                                    <div className="col s6 right-align">
                                        总运费：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.totalActFreight,2)}</span> 元
                                    </div>
                                </div>}

                                {/* 分割线 */}
                                <div className="col s12"><div className="col s12 margin-top5 divider bold-divider"/></div>

                                {/* 无 运送车辆 时，提示文字 */}
                                {commonReducer.orderCarArray.length === 0 &&
                                <div className="col s12 margin-top10 grey-text text-lighten-1">等待用户完善车辆信息</div>}
                            </div>

                            {/* 收发货信息 */}
                            <div className="row margin-top40 margin-left50 margin-right50">
                                <div className="col s12 pink-font">
                                    <i className="mdi mdi-truck fz20"/>
                                    <span className="margin-left10 fz16">收发货信息</span>
                                </div>
                                <div className="col s12"><div className="col s12 margin-top5 divider bold-divider"/></div>

                                {/* 发货信息 内部订单/外部订单(存在内容)时，显示详情 */}
                                {/* 发货信息 内部订单/外部订单(存在内容)时，显示详情 */}
                                {(orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[0].value ||
                                    (orderManagerDetailReducer.orderInfo[0].send_name !== null && orderManagerDetailReducer.orderInfo[0].send_name !== '')) &&
                                <div>
                                    <div className="col s3 margin-top10">
                                        <i className="mdi mdi-account-outline fz20 pink-font"/>
                                        <span className="margin-left10">发货人：{orderManagerDetailReducer.orderInfo[0].send_name} {orderManagerDetailReducer.orderInfo[0].send_phone}</span>
                                    </div>

                                    <div className="col s8 margin-top10">
                                        <i className="mdi mdi-map-marker-outline fz20 pink-font"/>
                                        <span className="margin-left10">地址：{orderManagerDetailReducer.orderInfo[0].send_address}</span>
                                    </div>
                                    {(orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[0].value ||
                                        orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[1].value ||
                                        orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[2].value) &&
                                    <div className="col s1 margin-top10 right-align pink-font"><i className="mdi mdi-pencil fz20 pointer" onClick={() => {this.showEditUserAddressModal('send')}}/></div>}

                                    <div className="col s12"><div className="col s12 margin-top10 divider"/></div>
                                </div>}

                                {/* 收货信息 详情 */}
                                {/* 发货信息 内部订单/外部订单(存在内容)时，显示详情 */}
                                {(orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[0].value ||
                                    (orderManagerDetailReducer.orderInfo[0].recv_name !== null && orderManagerDetailReducer.orderInfo[0].recv_name !== '')) &&
                                <div>
                                    <div className="col s3 margin-top10">
                                        <i className="mdi mdi-account-outline fz20 orange-text text-lighten-3"/>
                                        <span className="margin-left10">收货人：{orderManagerDetailReducer.orderInfo[0].recv_name} {orderManagerDetailReducer.orderInfo[0].recv_phone}</span>
                                    </div>
                                    <div className="col s8 margin-top10">
                                        <i className="mdi mdi-map-marker-outline fz20 orange-text text-lighten-3"/>
                                        <span className="margin-left10">地址：{orderManagerDetailReducer.orderInfo[0].recv_address}</span>
                                    </div>
                                    {(orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[0].value ||
                                        orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[1].value ||
                                        orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[2].value) &&
                                    <div className="col s1 margin-top10 right-align pink-font"><i className="mdi mdi-pencil fz20 pointer" onClick={() => {this.showEditUserAddressModal('receive')}}/></div>}

                                    <div className="col s12"><div className="col s12 margin-top10 divider"/></div>
                                    <EditUserAddressModal/>
                                </div>}
                            </div>

                            {/* 客户备注 (仅外部订单 显示)*/}
                            {orderManagerDetailReducer.orderInfo[0].created_type === sysConst.ORDER_TYPE[1].value &&
                            <div className="row margin-top40 margin-left50 margin-right50">
                                <div className="col s12 pink-font">
                                    <i className="mdi mdi-square-edit-outline fz20"/>
                                    <span className="margin-left10 fz16">客户备注</span>
                                </div>
                                <div className="col s12"><div className="col s12 margin-top5 divider bold-divider"/></div>

                                {/* 客户备注 详情 */}
                                {orderManagerDetailReducer.orderInfo[0].mark !== null && orderManagerDetailReducer.orderInfo[0].mark !== '' &&
                                <div>
                                    <div className="col s12 margin-top10">{orderManagerDetailReducer.orderInfo[0].mark}</div>
                                    <div className="col s12"><div className="col s12 margin-top10 divider"/></div>
                                </div>}
                            </div>}

                            {/* 客服备注 */}
                            <div className="row margin-top40 margin-left50 margin-right50">
                                <div className="col s12 pink-font">
                                    <i className="mdi mdi-square-edit-outline fz20"/>
                                    <span className="margin-left10 fz16">客服备注</span>
                                </div>
                                <div className="col s12"><div className="col s12 margin-top5 divider bold-divider"/></div>
                                {/* 客服备注 已取消/已完成 状态时，直接显示详情 */}
                                {orderManagerDetailReducer.orderInfo.length > 0
                                && orderManagerDetailReducer.orderInfo[0].admin_mark !== null && orderManagerDetailReducer.orderInfo[0].admin_mark !== '' &&
                                (orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[5].value ||
                                    orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[6].value) &&
                                <div>
                                    <div className="col s12 margin-top10">{orderManagerDetailReducer.orderInfo[0].admin_mark}</div>
                                    <div className="col s12"><div className="col s12 margin-top10 divider"/></div>
                                </div>}
                            </div>

                            {/* 客服备注 已取消/已完成 以外状态时，可以编辑 */}
                            {(orderManagerDetailReducer.orderInfo[0].status !== sysConst.ORDER_STATUS[5].value &&
                                orderManagerDetailReducer.orderInfo[0].status !== sysConst.ORDER_STATUS[6].value) &&
                            <div className="row margin-top40 margin-left50 margin-right50 position-relative">
                                <Input s={12} label="备注" value={orderManagerDetailReducer.orderRemark} onChange={this.changeOrderRemark}/>
                                <i className="mdi mdi-checkbox-marked-circle confirm-icon fz30 purple-font pointer" onClick={saveOrderRemark}/>
                            </div>}

                            {/** 取消订单 按钮 */}
                            {(orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[0].value || orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[1].value
                                || orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[2].value || orderManagerDetailReducer.orderInfo[0].status === sysConst.ORDER_STATUS[3].value) &&
                            <div className="row margin-right60 right-align">
                                <CancelOrderModal/>
                                <button type="button" className="btn cancel-btn" onClick={this.showCancelOrderModal}>取消订单</button>
                            </div>}

                            {/* 取消原因 已取消 状态时，显示详情 */}
                            {orderManagerDetailReducer.orderInfo.length > 0
                            && orderManagerDetailReducer.orderInfo[0].cancel_reason !== null && orderManagerDetailReducer.orderInfo[0].cancel_reason !== '' &&
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
                        {orderManagerDetailReducer.logInfoArray.length === 0 &&
                        <div className="row center grey-text margin-top40 fz18">
                            该用户暂无收发货信息
                        </div>}
                        <div className="row margin-top40 margin-left50 margin-right50">
                            {orderManagerDetailReducer.logInfoArray.map(function (item) {
                                return (
                                    <div className="row margin-bottom0">
                                        <div className="row detail-box-header margin-bottom0">
                                            {/* 地址信息：名称 */}
                                            <div className="col s12">
                                                <i className="mdi mdi-city fz20"/><span className="margin-left10">{item.city}</span>
                                            </div>
                                        </div>
                                        <div className="row margin-top10 margin-bottom10 padding-left10 padding-right10">
                                            {/* 地址信息：收货人 */}
                                            <div className="col s2">
                                                <i className="mdi fz20 pink-text text-lighten-4 mdi-account-outline"/>
                                                <span className="margin-left10 grey-text text-darken-1">{item.name}</span>
                                            </div>
                                            {/* 地址信息：收货电话 */}
                                            <div className="col s2">
                                                <i className="mdi fz20 pink-text text-lighten-4 mdi-cellphone"/>
                                                <span className="margin-left10 grey-text text-darken-1">{item.phone}</span>
                                            </div>
                                            {/* 地址信息：收货地址 */}
                                            <div className="col s8 right-align">
                                                <i className="mdi fz20 pink-text text-lighten-4 mdi-map-marker"/>
                                                <span className="margin-left10 grey-text text-darken-1">{item.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }, this)}
                            {orderManagerDetailReducer.logInfoArray.length > 0 &&
                            <div className="row divider grey-border"/>}
                        </div>
                    </div>

                    {/* TAB 3 : 运输信息TAB */}
                    <div id="tab-log-info" className="col s12">
                        {orderManagerDetailReducer.bankCardArray.length === 0 &&
                        <div className="row center grey-text margin-top40 fz18">
                            该用户暂未绑定银行卡
                        </div>}
                        {orderManagerDetailReducer.bankCardArray.length > 0 && <div className="row margin-top40 margin-bottom0 margin-left50 margin-right50 divider grey-border"/>}
                        {orderManagerDetailReducer.bankCardArray.map(function (item) {
                            return (
                                <div className="row margin-bottom0 margin-left50 margin-right50 grey-text text-darken-1">
                                    <div className="row margin-top10 margin-bottom10 padding-left10 padding-right10">
                                        <div className="col s11">
                                            <i className={`mdi mdi-credit-card fz20 ${item.status === 1 ? "purple-font" : "grey-text"}`}/>
                                            <span className="margin-left50">{item.bank}</span>
                                            <span className="margin-left30">{item.bank_code}</span>
                                            <span className="margin-left50">{item.account_name}</span>
                                        </div>
                                        <div className="col s1 right-align pink-font margin-top5">
                                            {item.status === 1 && '默认'}
                                        </div>
                                    </div>
                                    <div className="row margin-bottom0 divider grey-border"/>
                                </div>
                            )
                        })}
                    </div>

                    {/* TAB 4 : 发票信息TAB */}
                    <div id="tab-invoice" className="col s12">
                        {orderManagerDetailReducer.invoiceArray.length === 0 &&
                        <div className="row center grey-text margin-top40 fz18">
                            该用户暂未添加发票信息
                        </div>}
                        {orderManagerDetailReducer.invoiceArray.length > 0 && <div className="row margin-top40 margin-bottom0 margin-left50 margin-right50 divider grey-border"/>}
                        {orderManagerDetailReducer.invoiceArray.map(function (item) {
                            return (
                                <div className="row margin-bottom0 margin-left50 margin-right50 grey-text text-darken-1">
                                    <div className="row margin-top10 padding-left10 padding-right10">
                                        {/* 地址信息：收货人 */}
                                        <div className="col s-percent-4 margin-top10">
                                            <i className={`mdi mdi-file-document-box fz20 ${item.status === 1 ? "purple-font" : "grey-text"}`}/>
                                        </div>
                                        <div className="col s-percent-96 no-padding margin-top5 fz14 grey-text">
                                            <div className="col s12 margin-top10">
                                                <div className="col s10 fz18 purple-font">{item.company_name}</div>
                                                <div className="col s2 right-align fz15 pink-font">{item.status === 1 && '默认'}</div>
                                            </div>
                                            <div className="col s12 margin-top15">
                                                <div className="col s4">企业税号：{item.tax_number}</div>
                                                <div className="col s8 right-align">
                                                    <span>开户银行：{item.bank}</span>
                                                    <span className="margin-left30">银行账户：{item.bank_code}</span>
                                                </div>
                                            </div>
                                            <div className="col s12 margin-top10">
                                                <div className="col s9">企业地址：{item.company_address}</div>
                                                <div className="col s3 right-align">企业电话：{item.company_phone}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row margin-bottom0 divider grey-border"/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orderManagerDetailReducer: state.OrderManagerDetailReducer,
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
    // TAB1：订单信息
    getOrderInfo: () => {
        dispatch(orderManagerDetailAction.getOrderInfo(ownProps.match.params.id));
        dispatch(commonAction.getOrderCarList(ownProps.match.params.id));
    },
    initEditOrderCarModalData: (pageType, orderInfo) => {
        dispatch(EditOrderCarModalActionType.setPageType(pageType));
        dispatch(EditOrderCarModalActionType.setOrderInfo(orderInfo));

        if (pageType === 'new') {
            dispatch(editOrderCarModalAction.initOrderCarData());
        } else {

        }
    },
    changeOrderStatus: (value) => {
        dispatch(orderManagerDetailAction.changeOrderStatus(ownProps.match.params.id, value))
    },
    initEditUserAddressModalData: (pageType, orderInfo) => {
        dispatch(EditUserAddressModalActionType.setOrderId(ownProps.match.params.id));
        dispatch(EditUserAddressModalActionType.setPageType(pageType));
        if (pageType === 'send') {
            dispatch(EditUserAddressModalActionType.setOrderUser(orderInfo.send_name));
            dispatch(EditUserAddressModalActionType.setOrderPhone(orderInfo.send_phone));
            dispatch(EditUserAddressModalActionType.setOrderAddress(orderInfo.send_address));
        } else {
            dispatch(EditUserAddressModalActionType.setOrderUser(orderInfo.recv_name));
            dispatch(EditUserAddressModalActionType.setOrderPhone(orderInfo.recv_phone));
            dispatch(EditUserAddressModalActionType.setOrderAddress(orderInfo.recv_address));
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
        dispatch(orderManagerDetailAction.getPaymentInfo(ownProps.match.params.id))
    },
    // TAB3：运输信息
    getLogInfo: () => {
        dispatch(orderManagerDetailAction.getBankCardList(ownProps.match.params.id))
    },
    // TAB4：发票信息
    getInvoiceList: () => {
        dispatch(orderManagerDetailAction.getInvoiceList(ownProps.match.params.id))
    },
    // TAB5：操作记录
    getOperationList: () => {
        dispatch(orderManagerDetailAction.getInvoiceList(ownProps.match.params.id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderManagerDetail)