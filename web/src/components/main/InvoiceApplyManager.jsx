import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {InvoiceApplyManagerActionType} from '../../actionTypes';
import {NewInvoiceModal} from '../modules/index';

const commonAction = require('../../actions/main/CommonAction');
const invoiceApplyManagerAction = require('../../actions/main/InvoiceApplyManagerAction');
const newInvoiceModalAction = require('../../actions/modules/NewInvoiceModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class InvoiceApplyManager extends React.Component {

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
        $('ul.tabs').tabs();
        if (!this.props.fromDetail) {
            this.props.setInvoiceStartNumber(0);
            this.props.setConditionInvoiceApplyNo('');
            this.props.setConditionCompanyTax('');
            this.props.setConditionInvoiceTitle('');
            this.props.setConditionInvoiceOrderCreateUser('');
            this.props.setConditionInvoiceOrderNo('');
            this.props.setConditionInvoiceCreatedOnStart('');
            this.props.setConditionInvoiceCreatedOnEnd('');
            this.props.changeConditionInvoiceApplyStatus(null);

            this.props.setOrderStartNumber(0);
            this.props.setConditionOrderNo('');
            this.props.changeConditionOrderStartCity(null);
            this.props.changeConditionOrderEndCity(null);
            this.props.changeConditionOrderPaymentStatus(null);
            this.props.setConditionOrderCreatedOnStart('');
            this.props.setConditionOrderCreatedOnEnd('');
            this.props.setConditionOrderCreateUser('');
        }
        this.props.getInvoiceList();
    }

    /**
     * TAB 开票申请：更新 检索条件：发票申请编号
     */
    changeConditionInvoiceApplyNo = (event) => {
        this.props.setConditionInvoiceApplyNo(event.target.value);
    };

    /**
     * TAB 开票申请：更新 检索条件：企业税号
     */
    changeConditionCompanyTax = (event) => {
        this.props.setConditionCompanyTax(event.target.value);
    };

    /**
     * TAB 开票申请：更新 检索条件：发票抬头
     */
    changeConditionInvoiceTitle = (event) => {
        this.props.setConditionInvoiceTitle(event.target.value);
    };

    /**
     * TAB 开票申请：更新 检索条件：创建人
     */
    changeConditionInvoiceOrderCreateUser = (event) => {
        this.props.setConditionInvoiceOrderCreateUser(event.target.value);
    };

    /**
     * TAB 开票申请：更新 检索条件：订单编号
     */
    changeConditionInvoiceOrderNo = (event) => {
        this.props.setConditionInvoiceOrderNo(event.target.value);
    };

    /**
     * TAB 开票申请：更新 检索条件：创建时间(始)
     */
    changeConditionInvoiceCreatedOnStart = (event, value) => {
        this.props.setConditionInvoiceCreatedOnStart(value);
    };

    /**
     * TAB 开票申请：更新 检索条件：创建时间(始)
     */
    changeConditionInvoiceCreatedOnEnd = (event, value) => {
        this.props.setConditionInvoiceCreatedOnEnd(value);
    };

    /**
     * TAB 开票申请：查询列表
     */
    queryInvoiceList = () => {
        // 默认第一页
        this.props.setInvoiceStartNumber(0);
        this.props.getInvoiceList();
    };

    /**
     * TAB 开票申请：上一页
     */
    invoicePreBtn = () => {
        this.props.setInvoiceStartNumber(this.props.invoiceApplyManagerReducer.invoiceStart - (this.props.invoiceApplyManagerReducer.size - 1));
        this.props.getInvoiceList();
    };

    /**
     * TAB 开票申请：下一页
     */
    invoiceNextBtn = () => {
        this.props.setInvoiceStartNumber(this.props.invoiceApplyManagerReducer.invoiceStart + (this.props.invoiceApplyManagerReducer.size - 1));
        this.props.getInvoiceList();
    };

    /**
     * TAB 未开票订单：更新 检索条件：订单编号
     */
    changeConditionOrderNo = (event) => {
        this.props.setConditionOrderNo(event.target.value);
    };

    /**
     * TAB 未开票订单：更新 检索条件：创建时间(始)
     */
    changeConditionOrderCreatedOnStart = (event, value) => {
        this.props.setConditionOrderCreatedOnStart(value);
    };

    /**
     * TAB 未开票订单：更新 检索条件：创建时间(始)
     */
    changeConditionOrderCreatedOnEnd = (event, value) => {
        this.props.setConditionOrderCreatedOnEnd(value);
    };

    /**
     * TAB 未开票订单：更新 检索条件：创建人
     */
    changeConditionOrderCreateUser = (event) => {
        this.props.setConditionOrderCreateUser(event.target.value);
    };

    /**
     * TAB 未开票订单：查询订单列表
     */
    queryOrderList = () => {
        // 默认第一页
        this.props.setOrderStartNumber(0);
        this.props.getOrderList();
    };

    /**
     * TAB 未开票订单：上一页
     */
    orderPreBtn = () => {
        this.props.setOrderStartNumber(this.props.invoiceApplyManagerReducer.orderStart - (this.props.invoiceApplyManagerReducer.size - 1));
        this.props.getOrderList();
    };

    /**
     * TAB 未开票订单：下一页
     */
    orderNextBtn = () => {
        this.props.setOrderStartNumber(this.props.invoiceApplyManagerReducer.orderStart + (this.props.invoiceApplyManagerReducer.size - 1));
        this.props.getOrderList();
    };

    /**
     * TAB 未开票订单：显示 申请开票 模态画面
     */
    showNewInvoiceModal = (orderId) => {
        this.props.initNewInvoiceModalData(orderId);
        $('#newInvoiceModal').modal('open');
    };

    render() {
        const {
            invoiceApplyManagerReducer, commonReducer,
            changeConditionInvoiceApplyStatus,
            changeConditionOrderStartCity, changeConditionOrderEndCity, changeConditionOrderPaymentStatus
        } = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">开票申请</span>
                        <div className="divider custom-divider margin-top10"/>
                        <ul className="tabs">
                            <li className="tab col s6"><a className="active" href="#tab-invoice" onClick={this.getInvoiceList}>开票申请</a></li>
                            <li className="tab col s6"><a href="#tab-order" onClick={this.queryOrderList}>未开票订单</a></li>
                        </ul>
                    </div>
                </div>

                <div id="tab-invoice" className="col s12">
                    {/* 上部分：检索条件输入区域 */}
                    <div className="row grey-text text-darken-1">
                        <div className="col s11 search-condition-box">
                            {/* 查询条件：第一行 */}
                            <div>
                                <Input s={3} label="发票申请编号" value={invoiceApplyManagerReducer.conditionInvoiceApplyNo} onChange={this.changeConditionInvoiceApplyNo}/>
                                <Input s={3} label="税号" value={invoiceApplyManagerReducer.conditionCompanyTax} onChange={this.changeConditionCompanyTax}/>
                                <Input s={3} label="发票抬头" value={invoiceApplyManagerReducer.conditionInvoiceTitle} onChange={this.changeConditionInvoiceTitle}/>
                                <Input s={3} label="订单创建人" value={invoiceApplyManagerReducer.conditionInvoiceOrderCreateUser} onChange={this.changeConditionInvoiceOrderCreateUser}/>
                            </div>

                            {/* 查询条件：第二行 */}
                            <div>
                                <Input s={3} label="订单编号" value={invoiceApplyManagerReducer.conditionInvoiceOrderNo} onChange={this.changeConditionInvoiceOrderNo}/>
                                <div className="input-field col s3 custom-input-field">
                                    <Input s={12} label="处理时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                           value={invoiceApplyManagerReducer.conditionInvoiceCreatedOnStart} onChange={this.changeConditionInvoiceCreatedOnStart} />
                                    <span className="mdi data-icon mdi-table-large"/>
                                </div>
                                <div className="input-field col s3 custom-input-field">
                                    <Input s={12} label="处理时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                           value={invoiceApplyManagerReducer.conditionInvoiceCreatedOnEnd} onChange={this.changeConditionInvoiceCreatedOnEnd} />
                                    <span className="mdi data-icon mdi-table-large"/>
                                </div>
                                <div className="input-field col s3">
                                    <Select
                                        options={sysConst.INVOICE_STATUS}
                                        onChange={changeConditionInvoiceApplyStatus}
                                        value={invoiceApplyManagerReducer.conditionInvoiceApplyStatus}
                                        isSearchable={false}
                                        placeholder={"请选择"}
                                        styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                        isClearable={true}
                                    />
                                    <label className="active">状态</label>
                                </div>
                            </div>
                        </div>

                        {/* 查询按钮 */}
                        <div className="col s1">
                            <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryInvoiceList}>
                                <i className="mdi mdi-magnify"/>
                            </a>
                        </div>
                    </div>

                    {/* 下部分：检索结果显示区域 */}
                    <div className="row">
                        <div className="col s12">
                            <table className="bordered striped">
                                <thead className="custom-dark-grey table-top-line">
                                <tr className="grey-text text-darken-2">
                                    <th>发票申请编号</th>
                                    <th>订单编号</th>
                                    <th>订单类型</th>
                                    <th>运费</th>
                                    <th>保费</th>
                                    <th>实际支付</th>
                                    <th>发票抬头</th>
                                    <th>订单创建人</th>
                                    <th className="center">申请时间</th>
                                    <th className="center">处理时间</th>
                                    <th className="center">状态</th>
                                    <th className="center">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {invoiceApplyManagerReducer.invoiceArray.map(function (item) {
                                    return (
                                        <tr className="grey-text text-darken-1">
                                            <td>{item.invoice_apply_id}</td>
                                            <td>{item.id}</td>
                                            <td>{commonUtil.getJsonValue(sysConst.ORDER_TYPE, item.created_type)}</td>
                                            <td>{formatUtil.formatNumber(item.total_trans_price,2)}</td>
                                            <td>{formatUtil.formatNumber(item.total_insure_price,2)}</td>
                                            <td>{formatUtil.formatNumber(item.real_payment_price,2)}</td>
                                            <td>{item.title}</td>
                                            <td>{item.real_name}</td>
                                            <td className="center">{formatUtil.getDateTime(item.apply_time)}</td>
                                            <td className="center">{formatUtil.getDateTime(item.invoiced_time)}</td>
                                            <td className={`center ${item.invoiced_status === sysConst.INVOICE_STATUS[0].value ? "pink-font" : ""}`}>
                                                {commonUtil.getJsonValue(sysConst.INVOICE_STATUS, item.invoiced_status)}
                                            </td>
                                            <td className="operation center">
                                                <Link to={{pathname: '/invoiceApply/' + item.invoice_apply_id}}>
                                                    <i className="mdi mdi-table-search purple-font"/>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                                { invoiceApplyManagerReducer.invoiceArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="12">暂无数据</td>
                                </tr>}
                                </tbody>
                            </table>
                        </div>

                        {/* 上下页按钮 */}
                        <div className="col s12 margin-top10">
                            <div className="right">
                                {invoiceApplyManagerReducer.invoiceStart > 0 && invoiceApplyManagerReducer.invoiceDataSize > 0 &&
                                <a className="waves-light waves-effect custom-blue btn margin-right10" id="invoice_pre" onClick={this.invoicePreBtn}>
                                    上一页
                                </a>}
                                {invoiceApplyManagerReducer.invoiceDataSize >= invoiceApplyManagerReducer.size &&
                                <a className="waves-light waves-effect custom-blue btn" id="invoice_next" onClick={this.invoiceNextBtn}>
                                    下一页
                                </a>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* TAB：未开票订单 */}
                <div id="tab-order" className="col s12">
                    {/* 上部分：检索条件输入区域 */}
                    <div className="row grey-text text-darken-1">
                        <div className="col s11 search-condition-box">
                            {/* 查询条件：第一行 */}
                            <div>
                                <Input s={3} label="订单编号" value={invoiceApplyManagerReducer.conditionOrderNo} onChange={this.changeConditionOrderNo}/>
                                <div className="input-field col s3">
                                    <Select
                                        options={commonReducer.cityList}
                                        onChange={changeConditionOrderStartCity}
                                        value={invoiceApplyManagerReducer.conditionOrderStartCity}
                                        isSearchable={true}
                                        placeholder={"请选择"}
                                        styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                        isClearable={true}
                                    />
                                    <label className="active">起始城市</label>
                                </div>
                                <div className="input-field col s3">
                                    <Select
                                        options={commonReducer.cityList}
                                        onChange={changeConditionOrderEndCity}
                                        value={invoiceApplyManagerReducer.conditionOrderEndCity}
                                        isSearchable={true}
                                        placeholder={"请选择"}
                                        styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                        isClearable={true}
                                    />
                                    <label className="active">目的城市</label>
                                </div>
                                <div className="input-field col s3">
                                    <Select
                                        options={sysConst.ORDER_PAYMENT_STATUS}
                                        onChange={changeConditionOrderPaymentStatus}
                                        value={invoiceApplyManagerReducer.conditionOrderPaymentStatus}
                                        isSearchable={false}
                                        placeholder={"请选择"}
                                        styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                        isClearable={true}
                                    />
                                    <label className="active">支付状态</label>
                                </div>
                            </div>

                            {/* 查询条件：第二行 */}
                            <div>
                                <div className="input-field col s3 custom-input-field">
                                    <Input s={12} label="创建时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                           value={invoiceApplyManagerReducer.conditionOrderCreatedOnStart} onChange={this.changeConditionOrderCreatedOnStart} />
                                    <span className="mdi data-icon mdi-table-large"/>
                                </div>

                                <div className="input-field col s3 custom-input-field">
                                    <Input s={12} label="创建时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                           value={invoiceApplyManagerReducer.conditionOrderCreatedOnEnd} onChange={this.changeConditionOrderCreatedOnEnd} />
                                    <span className="mdi data-icon mdi-table-large"/>
                                </div>
                                <Input s={3} label="创建人" value={invoiceApplyManagerReducer.conditionOrderCreateUser} onChange={this.changeConditionOrderCreateUser}/>
                            </div>
                        </div>

                        {/* 查询按钮 */}
                        <div className="col s1">
                            <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryOrderList}>
                                <i className="mdi mdi-magnify"/>
                            </a>
                        </div>
                    </div>

                    {/* 下部分：检索结果显示区域 */}
                    <div className="row">
                        <div className="col s12">
                            <table className="bordered striped">
                                <thead className="custom-dark-grey table-top-line">
                                <tr className="grey-text text-darken-2">
                                    <th>订单编号</th>
                                    <th>线路</th>
                                    <th>运费</th>
                                    <th>保费</th>
                                    <th>实际支付</th>
                                    <th>创建人</th>
                                    <th className="center">创建时间</th>
                                    <th className="center">支付状态</th>
                                    <th className="center">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {invoiceApplyManagerReducer.orderArray.map(function (item) {
                                    return (
                                        <tr className="grey-text text-darken-1">
                                            <td>{item.id}</td>
                                            <td>{item.route_start} - {item.route_end}</td>
                                            <td>{formatUtil.formatNumber(item.total_trans_price,2)}</td>
                                            <td>{formatUtil.formatNumber(item.total_insure_price,2)}</td>
                                            <td>{formatUtil.formatNumber(item.real_payment_price,2)}</td>
                                            <td>{item.real_name}</td>
                                            <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                            <td className="center">{commonUtil.getJsonValue(sysConst.ORDER_PAYMENT_STATUS, item.payment_status)}</td>
                                            <td className="operation center">
                                                <i className="mdi mdi-plus-circle pink-font pointer" onClick={() => {this.showNewInvoiceModal(item.id)}}/>
                                            </td>
                                        </tr>
                                    )
                                },this)}
                                { invoiceApplyManagerReducer.orderArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="9">暂无数据</td>
                                </tr>}
                                </tbody>
                            </table>
                            <NewInvoiceModal/>
                        </div>

                        {/* 上下页按钮 */}
                        <div className="col s12 margin-top10">
                            <div className="right">
                                {invoiceApplyManagerReducer.orderStart > 0 && invoiceApplyManagerReducer.orderDataSize > 0 &&
                                <a className="waves-light waves-effect custom-blue btn margin-right10" id="order_pre" onClick={this.orderPreBtn}>
                                    上一页
                                </a>}
                                {invoiceApplyManagerReducer.orderDataSize >= invoiceApplyManagerReducer.size &&
                                <a className="waves-light waves-effect custom-blue btn" id="order_next" onClick={this.orderNextBtn}>
                                    下一页
                                </a>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let fromDetail = false;
    if (typeof ownProps.location.state !== 'undefined' && ownProps.location.state.fromDetail === true) {
        fromDetail = true;
    }
    return {
        invoiceApplyManagerReducer: state.InvoiceApplyManagerReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getInvoiceList: () => {
        dispatch(commonAction.getCityList());
        dispatch(invoiceApplyManagerAction.getInvoiceList())
    },
    setInvoiceStartNumber: (start) => {
        dispatch(InvoiceApplyManagerActionType.setInvoiceStartNumber(start))
    },
    setConditionInvoiceApplyNo: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionInvoiceApplyNo(value))
    },
    setConditionCompanyTax: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionCompanyTax(value))
    },
    setConditionInvoiceTitle: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionInvoiceTitle(value))
    },
    setConditionInvoiceOrderCreateUser: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionInvoiceOrderCreateUser(value))
    },
    setConditionInvoiceOrderNo: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionInvoiceOrderNo(value))
    },
    setConditionInvoiceCreatedOnStart: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionInvoiceCreatedOnStart(value))
    },
    setConditionInvoiceCreatedOnEnd: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionInvoiceCreatedOnEnd(value))
    },
    changeConditionInvoiceApplyStatus: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionInvoiceApplyStatus(value))
    },

    getOrderList: () => {
        dispatch(invoiceApplyManagerAction.getOrderList())
    },
    setOrderStartNumber: (start) => {
        dispatch(InvoiceApplyManagerActionType.setOrderStartNumber(start))
    },
    setConditionOrderNo: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionOrderNo(value))
    },
    changeConditionOrderStartCity: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionOrderStartCity(value))
    },
    changeConditionOrderEndCity: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionOrderEndCity(value))
    },
    changeConditionOrderPaymentStatus: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionOrderPaymentStatus(value))
    },
    setConditionOrderCreatedOnStart: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionOrderCreatedOnStart(value))
    },
    setConditionOrderCreatedOnEnd: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionOrderCreatedOnEnd(value))
    },
    setConditionOrderCreateUser: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionOrderCreateUser(value))
    },
    initNewInvoiceModalData: (orderId) => {
        dispatch(newInvoiceModalAction.initNewInvoiceModal('invoiceApply', orderId, ''));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceApplyManager)