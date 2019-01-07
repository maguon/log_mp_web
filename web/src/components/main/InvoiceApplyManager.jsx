import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {InvoiceApplyManagerActionType} from '../../actionTypes';

const commonAction = require('../../actions/main/CommonAction');
const invoiceApplyManagerAction = require('../../actions/main/InvoiceApplyManagerAction');
const sysConst = require('../../util/SysConst');

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
        if (!this.props.fromDetail) {
            this.props.setInvoiceStartNumber(0);
            this.props.setConditionInvoiceNo('');
            this.props.setConditionCompany('');
            this.props.setConditionCompanyTax('');
            this.props.setConditionUser('');
        }
        this.props.getInvoiceList();
        $('ul.tabs').tabs();
    }

    /**
     * TAB 开票申请：更新 检索条件：发票抬头编号
     */
    changeConditionInvoiceNo = (event) => {
        this.props.setConditionInvoiceNo(event.target.value);
    };

    /**
     * TAB 开票申请：更新 检索条件：企业抬头
     */
    changeConditionCompany = (event) => {
        this.props.setConditionCompany(event.target.value);
    };

    /**
     * TAB 开票申请：更新 检索条件：企业税号
     */
    changeConditionCompanyTax = (event) => {
        this.props.setConditionCompanyTax(event.target.value);
    };

    /**
     * TAB 开票申请：更新 检索条件：所属用户
     */
    changeConditionUser = (event) => {
        this.props.setConditionUser(event.target.value);
    };

    /**
     * TAB 开票申请：查询绑定车辆列表
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

    render() {
        const {invoiceApplyManagerReducer,commonReducer,

            changeConditionOrderStartCity,changeConditionOrderEndCity,changeConditionOrderPaymentStatus

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
                            <li className="tab col s6"><a href="#tab-order" onClick={this.queryInvoiceList}>未开票订单</a></li>
                        </ul>
                    </div>
                </div>

                <div id="tab-invoice" className="col s12">
                    {/* 上部分：检索条件输入区域 */}
                    <div className="row grey-text text-darken-1">
                        <div className="col s11 search-condition-box">
                            {/* 查询条件：发票抬头编号 */}
                            <Input s={3} label="发票抬头编号" value={invoiceApplyManagerReducer.conditionInvoiceNo} onChange={this.changeConditionInvoiceNo}/>

                            {/* 查询条件：企业抬头 */}
                            <Input s={3} label="企业抬头" value={invoiceApplyManagerReducer.conditionCompany} onChange={this.changeConditionCompany}/>

                            {/* 查询条件：企业税号 */}
                            <Input s={3} label="企业税号" value={invoiceApplyManagerReducer.conditionCompanyTax} onChange={this.changeConditionCompanyTax}/>

                            {/* 查询条件：所属用户 */}
                            <Input s={3} label="所属用户" value={invoiceApplyManagerReducer.conditionUser} onChange={this.changeConditionUser}/>
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
                                    <th>发票信息编号</th>
                                    <th>企业抬头</th>
                                    <th>税号</th>
                                    <th>企业电话</th>
                                    <th>所属用户</th>
                                    <th className="center">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {invoiceApplyManagerReducer.invoiceArray.map(function (item) {
                                    return (
                                        <tr className="grey-text text-darken-1">
                                            <td>{item.id}</td>
                                            <td>{item.company_name}</td>
                                            <td>{item.tax_number}</td>
                                            <td>{item.company_phone}</td>
                                            <td>{item.user_name}</td>
                                            <td className="operation center">
                                                <Link to={{pathname: '/invoiceApply/' + item.id}}>
                                                    <i className="mdi mdi-table-search purple-font"/>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                                { invoiceApplyManagerReducer.invoiceArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="6">暂无数据</td>
                                </tr>
                                }
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
                                {/* 查询条件：订单编号 */}
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

                                {/* 查询条件：创建人 */}
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
                                    <th>发票信息编号</th>
                                    <th>企业抬头</th>
                                    <th>税号</th>
                                    <th>企业电话</th>
                                    <th>所属用户</th>
                                    <th className="center">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {invoiceApplyManagerReducer.orderArray.map(function (item) {
                                    return (
                                        <tr className="grey-text text-darken-1">
                                            <td>{item.id}</td>
                                            <td>{item.company_name}</td>
                                            <td>{item.tax_number}</td>
                                            <td>{item.company_phone}</td>
                                            <td>{item.user_name}</td>
                                            <td className="operation center">
                                                <Link to={{pathname: '/invoiceApply/' + item.id}}>
                                                    <i className="mdi mdi-table-search purple-font"/>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                                { invoiceApplyManagerReducer.orderArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="6">暂无数据</td>
                                </tr>
                                }
                                </tbody>
                            </table>
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
    setConditionInvoiceNo: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionInvoiceNo(value))
    },
    setConditionCompany: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionCompany(value))
    },
    setConditionCompanyTax: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionCompanyTax(value))
    },
    setConditionUser: (value) => {
        dispatch(InvoiceApplyManagerActionType.setConditionUser(value))
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
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceApplyManager)