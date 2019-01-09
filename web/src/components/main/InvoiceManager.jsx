import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {InvoiceManagerActionType} from '../../actionTypes';

const invoiceManagerAction = require('../../actions/main/InvoiceManagerAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class InvoiceManager extends React.Component {

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

            this.props.setConditionInvoiceApplyNo('');
            this.props.setConditionInvoiceOrderNo('');
            this.props.setConditionCompanyTax('');
            this.props.setConditionInvoiceTitle('');
            this.props.setConditionInvoiceOrderCreateUser('');

            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.setConditionInvoiceCreatedOnStart('');
            this.props.setConditionInvoiceCreatedOnEnd('');
            this.props.changeConditionInvoiceApplyStatus(null);

        }
        this.props.getInvoiceList();
    }

    /**
     * 更新 检索条件：发票申请编号
     */
    changeConditionInvoiceApplyNo = (event) => {
        this.props.setConditionInvoiceApplyNo(event.target.value);
    };

    /**
     * 更新 检索条件：订单编号
     */
    changeConditionInvoiceOrderNo = (event) => {
        this.props.setConditionInvoiceOrderNo(event.target.value);
    };

    /**
     * 更新 检索条件：企业税号
     */
    changeConditionCompanyTax = (event) => {
        this.props.setConditionCompanyTax(event.target.value);
    };

    /**
     * 更新 检索条件：发票抬头
     */
    changeConditionInvoiceTitle = (event) => {
        this.props.setConditionInvoiceTitle(event.target.value);
    };

    /**
     * 更新 检索条件：创建人
     */
    changeConditionInvoiceOrderCreateUser = (event) => {
        this.props.setConditionInvoiceOrderCreateUser(event.target.value);
    };

    /**
     * 更新 检索条件：申请时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：申请时间(始)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 更新 检索条件：处理时间(始)
     */
    changeConditionInvoiceCreatedOnStart = (event, value) => {
        this.props.setConditionInvoiceCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：处理时间(始)
     */
    changeConditionInvoiceCreatedOnEnd = (event, value) => {
        this.props.setConditionInvoiceCreatedOnEnd(value);
    };

    /**
     * 查询列表
     */
    queryInvoiceList = () => {
        // 默认第一页
        this.props.setInvoiceStartNumber(0);
        this.props.getInvoiceList();
    };

    /**
     * 上一页
     */
    invoicePreBtn = () => {
        this.props.setInvoiceStartNumber(this.props.invoiceManagerReducer.start - (this.props.invoiceManagerReducer.size - 1));
        this.props.getInvoiceList();
    };

    /**
     * 下一页
     */
    invoiceNextBtn = () => {
        this.props.setInvoiceStartNumber(this.props.invoiceManagerReducer.start + (this.props.invoiceManagerReducer.size - 1));
        this.props.getInvoiceList();
    };


    /**
     * TAB 未开票订单：显示 申请开票 模态画面
     */
    showNewInvoiceModal = (orderId) => {
        this.props.initNewInvoiceModalData(orderId);
        $('#newInvoiceModal').modal('open');
    };

    render() {
        const {invoiceManagerReducer, changeConditionInvoiceApplyStatus,} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">发票管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        {/* 查询条件：第一行 */}
                        <div>
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="发票申请编号" value={invoiceManagerReducer.conditionInvoiceApplyNo} onChange={this.changeConditionInvoiceApplyNo}/>
                            </div>
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="订单编号" value={invoiceManagerReducer.conditionInvoiceOrderNo} onChange={this.changeConditionInvoiceOrderNo}/>
                            </div>
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="税号" value={invoiceManagerReducer.conditionCompanyTax} onChange={this.changeConditionCompanyTax}/>
                            </div>
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="发票抬头" value={invoiceManagerReducer.conditionInvoiceTitle} onChange={this.changeConditionInvoiceTitle}/>
                            </div>
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="订单创建人" value={invoiceManagerReducer.conditionInvoiceOrderCreateUser} onChange={this.changeConditionInvoiceOrderCreateUser}/>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="申请时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={invoiceManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>
                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="申请时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={invoiceManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>
                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="处理时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={invoiceManagerReducer.conditionInvoiceCreatedOnStart} onChange={this.changeConditionInvoiceCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>
                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="处理时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={invoiceManagerReducer.conditionInvoiceCreatedOnEnd} onChange={this.changeConditionInvoiceCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>
                            <div className="input-field col s-percent-20">
                                <Select
                                    options={sysConst.INVOICE_STATUS}
                                    onChange={changeConditionInvoiceApplyStatus}
                                    value={invoiceManagerReducer.conditionInvoiceApplyStatus}
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
                            {invoiceManagerReducer.invoiceArray.map(function (item) {
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
                                            <Link to={{pathname: '/invoice/' + item.invoice_apply_id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            { invoiceManagerReducer.invoiceArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="12">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {invoiceManagerReducer.start > 0 && invoiceManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="invoice_pre" onClick={this.invoicePreBtn}>
                                上一页
                            </a>}
                            {invoiceManagerReducer.dataSize >= invoiceManagerReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="invoice_next" onClick={this.invoiceNextBtn}>
                                下一页
                            </a>}
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
        invoiceManagerReducer: state.InvoiceManagerReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getInvoiceList: () => {
        dispatch(invoiceManagerAction.getInvoiceList())
    },
    setInvoiceStartNumber: (start) => {
        dispatch(InvoiceManagerActionType.setInvoiceStartNumber(start))
    },


    setConditionInvoiceApplyNo: (value) => {
        dispatch(InvoiceManagerActionType.setConditionInvoiceApplyNo(value))
    },
    setConditionInvoiceOrderNo: (value) => {
        dispatch(InvoiceManagerActionType.setConditionInvoiceOrderNo(value))
    },
    setConditionCompanyTax: (value) => {
        dispatch(InvoiceManagerActionType.setConditionCompanyTax(value))
    },
    setConditionInvoiceTitle: (value) => {
        dispatch(InvoiceManagerActionType.setConditionInvoiceTitle(value))
    },
    setConditionInvoiceOrderCreateUser: (value) => {
        dispatch(InvoiceManagerActionType.setConditionInvoiceOrderCreateUser(value))
    },

    setConditionCreatedOnStart: (value) => {
        dispatch(InvoiceManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(InvoiceManagerActionType.setConditionCreatedOnEnd(value))
    },
    setConditionInvoiceCreatedOnStart: (value) => {
        dispatch(InvoiceManagerActionType.setConditionInvoiceCreatedOnStart(value))
    },
    setConditionInvoiceCreatedOnEnd: (value) => {
        dispatch(InvoiceManagerActionType.setConditionInvoiceCreatedOnEnd(value))
    },
    changeConditionInvoiceApplyStatus: (value) => {
        dispatch(InvoiceManagerActionType.setConditionInvoiceApplyStatus(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceManager)