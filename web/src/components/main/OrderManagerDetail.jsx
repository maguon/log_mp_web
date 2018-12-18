import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {OrderManagerDetailActionType, InquiryInfoModalActionType} from '../../actionTypes';
import {InquiryInfoModal} from '../modules/index';

const orderManagerDetailAction = require('../../actions/main/OrderManagerDetailAction');
const inquiryInfoModalAction = require('../../actions/modules/InquiryInfoModalAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

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
        // 取得TAB1 询价记录列表
        this.onClickOrderTab();
        $('ul.tabs').tabs();
    }

    /**
     * 订单信息TAB：点击事件
     */
    onClickOrderTab = () => {
        // 默认第一页
        this.props.setInquiryStartNumber(0);
        // 清空检索条件
        this.props.changeInquiryConditionStartCity(null);
        this.props.changeInquiryConditionEndCity(null);
        this.props.changeInquiryConditionServiceType(null);
        this.props.changeInquiryConditionStatus(null);
        // 检索消息记录列表
        this.props.getUserInquiryList();
    };

    /**
     * 询价记录TAB：查询用户询价记录列表
     */
    queryUserInquiryList = () => {
        // 默认第一页
        this.props.setInquiryStartNumber(0);
        this.props.getUserInquiryList();
    };

    /**
     * 询价记录TAB：上一页
     */
    inquiryPreBtn = () => {
        this.props.setInquiryStartNumber(this.props.orderManagerDetailReducer.inquiryStart - (this.props.orderManagerDetailReducer.inquirySize - 1));
        this.props.getUserInquiryList();
    };

    /**
     * 询价记录TAB：下一页
     */
    inquiryNextBtn = () => {
        this.props.setInquiryStartNumber(this.props.orderManagerDetailReducer.inquiryStart + (this.props.orderManagerDetailReducer.inquirySize - 1));
        this.props.getUserInquiryList();
    };

    /**
     * 询价记录TAB：显示询价信息详细内容
     */
    showInquiryInfoModal = () => {
        this.props.initInquiryInfoModalData(this.props.orderManagerDetailReducer.orderInfo[0].inquiry_id,this.props.orderManagerDetailReducer.orderInfo[0].user_id);
        $('#inquiryInfoModal').modal('open');
    };

    render() {
        const {
            orderManagerDetailReducer,
            commonReducer,
            changeInquiryConditionStartCity, changeInquiryConditionEndCity,
            changeInquiryConditionServiceType, changeInquiryConditionStatus,
            getLogInfoList, getBankCardList, getInvoiceList
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
                                <div className="margin-top5">
                                    <span className="fz20 purple-font">{orderManagerDetailReducer.orderInfo[0].start_city}</span>
                                    <img className="margin-left30 margin-right30" src="../../../assets/images/transport.png"/>
                                    <span className="fz20 purple-font">{orderManagerDetailReducer.orderInfo[0].end_city}</span>
                                    <span className="margin-left30">
                                        {(orderManagerDetailReducer.orderInfo[0].service_type !== 1 && orderManagerDetailReducer.orderInfo[0].service_type !== 2)
                                            ? '未知' : sysConst.SERVICE_MODE[orderManagerDetailReducer.orderInfo[0].service_type - 1].label}
                                    </span>
                                    {orderManagerDetailReducer.orderInfo[0].created_type === 1 &&
                                    <button type="button" className="margin-left30 btn purple-btn btn-height24 fz14" onClick={this.showInquiryInfoModal}>询价信息</button>}
                                </div>

                                <div className="margin-top15">
                                    <span className="purple-font">
                                        {(orderManagerDetailReducer.orderInfo[0].created_type !== 0 && orderManagerDetailReducer.orderInfo[0].created_type !== 1)
                                        ? '未知' : sysConst.ORDER_TYPE[orderManagerDetailReducer.orderInfo[0].created_type].label}
                                    </span>

                                    <i className="margin-left30 fz20 pink-font mdi mdi-account"/>
                                    <span className="margin-left10">{orderManagerDetailReducer.orderInfo[0].user_name} ( ID：{orderManagerDetailReducer.orderInfo[0].user_id} )</span>

                                    <i className="margin-left30 fz20 pink-font mdi mdi-cellphone"/>
                                    <span className="margin-left10">{orderManagerDetailReducer.orderInfo[0].phone}</span>
                                </div>
                            </div>

                            <div className="col s5 grey-text text-darken-1 right-align">
                                <div>订单编号：{orderManagerDetailReducer.orderInfo[0].id}</div>
                                <div className="margin-top10">
                                    <span>创建时间：{formatUtil.getDateTime(orderManagerDetailReducer.orderInfo[0].created_on)}</span>
                                    <span className="margin-left30">创建人：{orderManagerDetailReducer.orderInfo[0].created_user}</span>
                                </div>
                                <div className="margin-top10 pink-font">
                                    {(orderManagerDetailReducer.orderInfo[0].status !== 0
                                        && orderManagerDetailReducer.orderInfo[0].status !== 1
                                        && orderManagerDetailReducer.orderInfo[0].status !== 2
                                        && orderManagerDetailReducer.orderInfo[0].status !== 3
                                        && orderManagerDetailReducer.orderInfo[0].status !== 4
                                        && orderManagerDetailReducer.orderInfo[0].status !== 5
                                        && orderManagerDetailReducer.orderInfo[0].status !== 6)
                                        ? '未知' : sysConst.ORDER_STATUS[orderManagerDetailReducer.orderInfo[0].status].label}
                                </div>
                            </div>
                        </div>}
                        <InquiryInfoModal/>
                        <ul className="tabs">
                            <li className="tab col s3"><a className="active" href="#tab-order" onClick={this.onClickOrderTab}>订单信息</a></li>
                            <li className="tab col s3"><a href="#tab-log-info" onClick={getLogInfoList}>收发货信息</a></li>
                            <li className="tab col s3"><a href="#tab-bank-card" onClick={getBankCardList}>银行卡</a></li>
                            <li className="tab col s3"><a href="#tab-invoice" onClick={getInvoiceList}>发票信息</a></li>
                        </ul>
                    </div>

                    {/* TAB 1 : 订单信息TAB */}
                    <div id="tab-order" className="col s12">
                        {/* 询价记录：检索条件 */}
                        <div className="row z-depth-1 detail-box margin-top20 margin-left50 margin-right50">
                            <div className="col s11 search-condition-box margin-top20">
                                {/* 查询条件：起始城市 */}
                                <div className="input-field col s3">
                                    <Select
                                        options={commonReducer.cityList}
                                        onChange={changeInquiryConditionStartCity}
                                        value={orderManagerDetailReducer.inquiryConditionStartCity}
                                        isSearchable={true}
                                        placeholder={"请选择"}
                                        styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                        isClearable={true}
                                    />
                                    <label className="active">起始城市</label>
                                </div>

                                {/* 查询条件：目的城市 */}
                                <div className="input-field col s3">
                                    <Select
                                        options={commonReducer.cityList}
                                        onChange={changeInquiryConditionEndCity}
                                        value={orderManagerDetailReducer.inquiryConditionEndCity}
                                        isSearchable={true}
                                        placeholder={"请选择"}
                                        styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                        isClearable={true}
                                    />
                                    <label className="active">目的城市</label>
                                </div>

                                {/* 查询条件：服务方式 */}
                                <div className="input-field col s3">
                                    <Select
                                        options={sysConst.SERVICE_MODE}
                                        onChange={changeInquiryConditionServiceType}
                                        value={orderManagerDetailReducer.inquiryConditionServiceType}
                                        isSearchable={false}
                                        placeholder={"请选择"}
                                        styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                        isClearable={true}
                                    />
                                    <label className="active">服务方式</label>
                                </div>

                                {/* 查询条件：状态 */}
                                <div className="input-field col s3">
                                    <Select
                                        options={sysConst.INQUIRY_STATUS}
                                        onChange={changeInquiryConditionStatus}
                                        value={orderManagerDetailReducer.inquiryConditionStatus}
                                        isSearchable={false}
                                        placeholder={"请选择"}
                                        styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                        isClearable={true}
                                    />
                                    <label className="active">状态</label>
                                </div>
                            </div>
                            {/* 查询按钮 */}
                            <div className="col s1">
                                <a className="btn-floating btn-large waves-light waves-effect btn margin-top20 query-btn" onClick={this.queryUserInquiryList}>
                                    <i className="mdi mdi-magnify"/>
                                </a>
                            </div>
                        </div>

                        {/* 询价记录：记录列表 */}
                        <div className="row margin-top10 margin-left50 margin-right50">
                            <table className="fixed-table bordered">
                                <thead className="custom-grey border-top-line">
                                <tr className="grey-text text-darken-2">
                                    <th className="padding-left20">线路</th>
                                    <th>车辆数</th>
                                    <th className="center">服务方式</th>
                                    <th className="right-align">预计费用</th>
                                    <th className="center">询价时间</th>
                                    <th className="center">状态</th>
                                    <th className="center">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orderManagerDetailReducer.inquiryArray.map(function (item) {
                                    return (
                                        <tr className="grey-text text-darken-1">
                                            <td className="padding-left20">{item.route_start} - {item.route_end}</td>
                                            <td>{formatUtil.formatNumber(item.car_num)}</td>
                                            <td className="center">{(item.service_type !== 1 && item.service_type !== 2) ? '未知' : sysConst.SERVICE_MODE[item.service_type - 1].label}</td>
                                            <td className="right-align">{formatUtil.formatNumber(item.fee,2)}</td>
                                            <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                            <td className="center">{sysConst.INQUIRY_STATUS[item.status].label}</td>
                                            <td className="operation center">
                                                <i className="mdi mdi-table-search purple-font pointer" onClick={() => {
                                                    this.showInquiryInfoModal(item.id)
                                                }}/>
                                            </td>
                                        </tr>
                                    )
                                }, this)}
                                {orderManagerDetailReducer.inquiryArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="7">暂无数据</td>
                                </tr>}
                                </tbody>
                            </table>
                        </div>

                        {/* 上下页按钮 */}
                        <div className="row margin-top10 margin-bottom0 margin-left50 margin-right50">
                            <div className="right">
                                {orderManagerDetailReducer.inquiryStart > 0 && orderManagerDetailReducer.inquiryDataSize > 0 &&
                                <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.inquiryPreBtn}>上一页</a>}
                                {orderManagerDetailReducer.inquiryDataSize >= orderManagerDetailReducer.inquirySize &&
                                <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.inquiryNextBtn}>下一页</a>}
                            </div>
                        </div>
                    </div>

                    {/* TAB 2 : 收发货信息TAB */}
                    <div id="tab-log-info" className="col s12">
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

                    {/* TAB 3 : 银行卡TAB */}
                    <div id="tab-bank-card" className="col s12">
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
    // 基本信息
    getOrderInfo: () => {
        dispatch(commonAction.getCityList());
        dispatch(orderManagerDetailAction.getOrderInfo(ownProps.match.params.id))
    },
    // TAB1：询价记录
    setInquiryStartNumber: (start) => {
        dispatch(OrderManagerDetailActionType.setInquiryStartNumber(start))
    },
    changeInquiryConditionStartCity: (value) => {
        dispatch(OrderManagerDetailActionType.setInquiryConditionStartCity(value))
    },
    changeInquiryConditionEndCity: (value) => {
        dispatch(OrderManagerDetailActionType.setInquiryConditionEndCity(value))
    },
    changeInquiryConditionServiceType: (value) => {
        dispatch(OrderManagerDetailActionType.setInquiryConditionServiceType(value))
    },
    changeInquiryConditionStatus: (value) => {
        dispatch(OrderManagerDetailActionType.setInquiryConditionStatus(value))
    },
    getUserInquiryList: () => {
        dispatch(orderManagerDetailAction.getUserInquiryList(ownProps.match.params.id))
    },
    initInquiryInfoModalData: (inquiryId, userId) => {
        dispatch(InquiryInfoModalActionType.setPrePage('order'));
        dispatch(inquiryInfoModalAction.getInquiryInfo(inquiryId, userId));
        dispatch(inquiryInfoModalAction.getInquiryCarList(inquiryId, userId));
    },
    // TAB2：收发货信息
    getLogInfoList: () => {
        dispatch(orderManagerDetailAction.getLogInfoList(ownProps.match.params.id))
    },
    // TAB3：银行卡
    getBankCardList: () => {
        dispatch(orderManagerDetailAction.getBankCardList(ownProps.match.params.id))
    },
    // TAB4：发票信息
    getInvoiceList: () => {
        dispatch(orderManagerDetailAction.getInvoiceList(ownProps.match.params.id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderManagerDetail)