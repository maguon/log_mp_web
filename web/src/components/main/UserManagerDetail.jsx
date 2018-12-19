import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {UserManagerDetailActionType, InquiryInfoModalActionType} from '../../actionTypes';
import {InquiryInfoModal} from '../modules/index';

const userManagerDetailAction = require('../../actions/main/UserManagerDetailAction');
const inquiryInfoModalAction = require('../../actions/modules/InquiryInfoModalAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class UserManagerDetail extends React.Component {

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
        this.props.getUserInfo();
        // 取得TAB1 询价记录列表
        this.onClickInquiryTab();
        $('ul.tabs').tabs();
    }

    /**
     * 询价记录TAB：点击事件
     */
    onClickInquiryTab = () => {
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
        this.props.setInquiryStartNumber(this.props.userManagerDetailReducer.inquiryStart - (this.props.userManagerDetailReducer.inquirySize - 1));
        this.props.getUserInquiryList();
    };

    /**
     * 询价记录TAB：下一页
     */
    inquiryNextBtn = () => {
        this.props.setInquiryStartNumber(this.props.userManagerDetailReducer.inquiryStart + (this.props.userManagerDetailReducer.inquirySize - 1));
        this.props.getUserInquiryList();
    };

    /**
     * 询价记录TAB：显示询价信息详细内容
     */
    showInquiryInfoModal = (inquiryId) => {
        this.props.initInquiryInfoModalData(inquiryId);
        $('#inquiryInfoModal').modal('open');
    };

    render() {
        const {
            userManagerDetailReducer,
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
                        <Link to={{pathname: '/user', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">用户管理 - 用户详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row">
                    {/* TAB 头部 */}
                    <div className="col s12">
                        {/* 用户详情：基本信息 */}
                        {userManagerDetailReducer.userInfo.length > 0 &&
                        <div className="user-detail-header">
                            {/* 左侧：图标 */}
                            <div className="col s1 margin-top10 center grey-text text-darken-1">
                                <div className="main-panel-icon grey lighten-1 vc-center">
                                    <i className="mdi mdi-account"/>
                                </div>
                            </div>

                            {/* 中间：基本信息 */}
                            <div className="col s8 grey-text text-darken-1">
                                <div className="margin-top8">
                                    {/* 用户名 */}
                                    <span className={`fz20 ${userManagerDetailReducer.userInfo[0].auth_status === 1 ? "pink-font" : ""}`}>
                                        {userManagerDetailReducer.userInfo[0].user_name}
                                    </span>
                                    <span className="margin-left20">ID：{userManagerDetailReducer.userInfo[0].id}</span>
                                    {userManagerDetailReducer.userInfo[0].gender === sysConst.GENDER[0].value ?
                                        <i className="mdi margin-left30 fz20 mdi-gender-female pink-font"/> :
                                        <i className="mdi margin-left30 fz20 mdi-gender-male blue-font"/>}
                                    {/* 授权状态：已授权/未授权 */}
                                    <span className="margin-left30">
                                        {(userManagerDetailReducer.userInfo[0].wechat_status !== 0 && userManagerDetailReducer.userInfo[0].wechat_status !== 1)
                                            ? '未知' : sysConst.WE_CHAT_STATUS[userManagerDetailReducer.userInfo[0].wechat_status].label}
                                    </span>
                                </div>
                                <div className="margin-top15 pink-font">
                                    {/* 认证状态：已认证/未认证 */}
                                    {(userManagerDetailReducer.userInfo[0].auth_status !== 0 && userManagerDetailReducer.userInfo[0].auth_status !== 1)
                                        ? '未知' : sysConst.AUTH_STATUS[userManagerDetailReducer.userInfo[0].auth_status].label}
                                    {/* 用户电话：已认证时，显示 */}
                                    {userManagerDetailReducer.userInfo[0].auth_status === 1 &&
                                    <span>
                                        <i className="mdi mdi-cellphone margin-left30 fz20"/>
                                        <span className="fz16 margin-left10 grey-text text-darken-1">{userManagerDetailReducer.userInfo[0].phone}</span>
                                    </span>}
                                </div>
                            </div>

                            {/* 右侧：授权时间/认证时间/最后登录时间 */}
                            {userManagerDetailReducer.userInfo[0].auth_status === 0 &&
                            <div className="col s3 grey-text text-darken-1 right-align">
                                <div className="margin-top10">授权时间：{formatUtil.getDateTime(userManagerDetailReducer.userInfo[0].created_on)}</div>
                                <div className="margin-top15">最后登录时间：{formatUtil.getDateTime(userManagerDetailReducer.userInfo[0].last_login_on)}</div>
                            </div>}
                            {userManagerDetailReducer.userInfo[0].auth_status === 1 &&
                            <div className="col s3 grey-text text-darken-1 right-align">
                                <div>授权时间：{formatUtil.getDateTime(userManagerDetailReducer.userInfo[0].created_on)}</div>
                                <div className="margin-top10">认证时间：{formatUtil.getDateTime(userManagerDetailReducer.userInfo[0].auth_time)}</div>
                                <div className="margin-top10">最后登录时间：{formatUtil.getDateTime(userManagerDetailReducer.userInfo[0].last_login_on)}</div>
                            </div>}
                        </div>}

                        <ul className="tabs">
                            <li className="tab col s3"><a className="active" href="#tab-inquiry" onClick={this.onClickInquiryTab}>询价记录</a></li>
                            <li className="tab col s3"><a href="#tab-log-info" onClick={getLogInfoList}>收发货信息</a></li>
                            <li className="tab col s3"><a href="#tab-bank-card" onClick={getBankCardList}>银行卡</a></li>
                            <li className="tab col s3"><a href="#tab-invoice" onClick={getInvoiceList}>发票信息</a></li>
                        </ul>
                    </div>

                    {/* TAB 1 : 询价记录TAB */}
                    <div id="tab-inquiry" className="col s12">
                        {/* 询价记录：检索条件 */}
                        <div className="row z-depth-1 detail-box margin-top20 margin-left50 margin-right50">
                            <div className="col s11 search-condition-box margin-top20">
                                {/* 查询条件：起始城市 */}
                                <div className="input-field col s3">
                                    <Select
                                        options={commonReducer.cityList}
                                        onChange={changeInquiryConditionStartCity}
                                        value={userManagerDetailReducer.inquiryConditionStartCity}
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
                                        value={userManagerDetailReducer.inquiryConditionEndCity}
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
                                        value={userManagerDetailReducer.inquiryConditionServiceType}
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
                                        value={userManagerDetailReducer.inquiryConditionStatus}
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
                                {userManagerDetailReducer.inquiryArray.map(function (item) {
                                    return (
                                        <tr className="grey-text text-darken-1">
                                            <td className="padding-left20">{item.start_city} - {item.end_city}</td>
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
                                {userManagerDetailReducer.inquiryArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="7">暂无数据</td>
                                </tr>}
                                </tbody>
                            </table>
                            <InquiryInfoModal/>
                        </div>

                        {/* 上下页按钮 */}
                        <div className="row margin-top10 margin-bottom0 margin-left50 margin-right50">
                            <div className="right">
                                {userManagerDetailReducer.inquiryStart > 0 && userManagerDetailReducer.inquiryDataSize > 0 &&
                                <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.inquiryPreBtn}>上一页</a>}
                                {userManagerDetailReducer.inquiryDataSize >= userManagerDetailReducer.inquirySize &&
                                <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.inquiryNextBtn}>下一页</a>}
                            </div>
                        </div>
                    </div>

                    {/* TAB 2 : 收发货信息TAB */}
                    <div id="tab-log-info" className="col s12">
                        {userManagerDetailReducer.logInfoArray.length === 0 &&
                        <div className="row center grey-text margin-top40 fz18">
                            该用户暂无收发货信息
                        </div>}
                        <div className="row margin-top40 margin-left50 margin-right50">
                            {userManagerDetailReducer.logInfoArray.map(function (item) {
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
                            {userManagerDetailReducer.logInfoArray.length > 0 &&
                            <div className="row divider grey-border"/>}
                        </div>
                    </div>

                    {/* TAB 3 : 银行卡TAB */}
                    <div id="tab-bank-card" className="col s12">
                        {userManagerDetailReducer.bankCardArray.length === 0 &&
                        <div className="row center grey-text margin-top40 fz18">
                            该用户暂未绑定银行卡
                        </div>}
                        {userManagerDetailReducer.bankCardArray.length > 0 && <div className="row margin-top40 margin-bottom0 margin-left50 margin-right50 divider grey-border"/>}
                        {userManagerDetailReducer.bankCardArray.map(function (item) {
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
                        {userManagerDetailReducer.invoiceArray.length === 0 &&
                        <div className="row center grey-text margin-top40 fz18">
                            该用户暂未添加发票信息
                        </div>}
                        {userManagerDetailReducer.invoiceArray.length > 0 && <div className="row margin-top40 margin-bottom0 margin-left50 margin-right50 divider grey-border"/>}
                        {userManagerDetailReducer.invoiceArray.map(function (item) {
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
        userManagerDetailReducer: state.UserManagerDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 基本信息
    getUserInfo: () => {
        dispatch(commonAction.getCityList());
        dispatch(userManagerDetailAction.getUserInfo(ownProps.match.params.id))
    },
    // TAB1：询价记录
    setInquiryStartNumber: (start) => {
        dispatch(UserManagerDetailActionType.setInquiryStartNumber(start))
    },
    changeInquiryConditionStartCity: (value) => {
        dispatch(UserManagerDetailActionType.setInquiryConditionStartCity(value))
    },
    changeInquiryConditionEndCity: (value) => {
        dispatch(UserManagerDetailActionType.setInquiryConditionEndCity(value))
    },
    changeInquiryConditionServiceType: (value) => {
        dispatch(UserManagerDetailActionType.setInquiryConditionServiceType(value))
    },
    changeInquiryConditionStatus: (value) => {
        dispatch(UserManagerDetailActionType.setInquiryConditionStatus(value))
    },
    getUserInquiryList: () => {
        dispatch(userManagerDetailAction.getUserInquiryList(ownProps.match.params.id))
    },
    initInquiryInfoModalData: (inquiryId) => {
        dispatch(InquiryInfoModalActionType.setPrePage('user'));
        dispatch(InquiryInfoModalActionType.setShowOrderInfoFlag(false));
        dispatch(inquiryInfoModalAction.getInquiryInfo(inquiryId,ownProps.match.params.id));
        dispatch(inquiryInfoModalAction.getInquiryCarList(inquiryId,ownProps.match.params.id));
        dispatch(inquiryInfoModalAction.getOrderInfo(inquiryId,ownProps.match.params.id));
    },
    // TAB2：收发货信息
    getLogInfoList: () => {
        dispatch(userManagerDetailAction.getLogInfoList(ownProps.match.params.id))
    },
    // TAB3：银行卡
    getBankCardList: () => {
        dispatch(userManagerDetailAction.getBankCardList(ownProps.match.params.id))
    },
    // TAB4：发票信息
    getInvoiceList: () => {
        dispatch(userManagerDetailAction.getInvoiceList(ownProps.match.params.id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagerDetail)