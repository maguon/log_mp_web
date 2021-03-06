import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {InvoiceTitleManagerActionType} from '../../actionTypes';

const invoiceTitleManagerAction = require('../../actions/main/InvoiceTitleManagerAction');

class InvoiceTitleManager extends React.Component {

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
            this.props.setStartNumber(0);
            this.props.setConditionInvoiceNo('');
            this.props.setConditionCompany('');
            this.props.setConditionCompanyTax('');
            this.props.setConditionUser('');
        }
        this.props.getInvoiceList();
    }

    /**
     * 更新 检索条件：发票抬头编号
     */
    changeConditionInvoiceNo = (event) => {
        this.props.setConditionInvoiceNo(event.target.value);
    };

    /**
     * 更新 检索条件：企业抬头
     */
    changeConditionCompany = (event) => {
        this.props.setConditionCompany(event.target.value);
    };

    /**
     * 更新 检索条件：企业税号
     */
    changeConditionCompanyTax = (event) => {
        this.props.setConditionCompanyTax(event.target.value);
    };

    /**
     * 更新 检索条件：所属用户
     */
    changeConditionUser = (event) => {
        this.props.setConditionUser(event.target.value);
    };

    /**
     * 查询绑定车辆列表
     */
    queryInvoiceList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getInvoiceList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.invoiceTitleManagerReducer.start - (this.props.invoiceTitleManagerReducer.size - 1));
        this.props.getInvoiceList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.invoiceTitleManagerReducer.start + (this.props.invoiceTitleManagerReducer.size - 1));
        this.props.getInvoiceList();
    };

    render() {
        const {invoiceTitleManagerReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">用户发票信息管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        {/* 查询条件：发票抬头编号 */}
                        <Input s={3} label="发票抬头编号" value={invoiceTitleManagerReducer.conditionInvoiceNo} onChange={this.changeConditionInvoiceNo}/>

                        {/* 查询条件：企业抬头 */}
                        <Input s={3} label="企业抬头" value={invoiceTitleManagerReducer.conditionCompany} onChange={this.changeConditionCompany}/>

                        {/* 查询条件：企业税号 */}
                        <Input s={3} label="企业税号" value={invoiceTitleManagerReducer.conditionCompanyTax} onChange={this.changeConditionCompanyTax}/>

                        {/* 查询条件：所属用户 */}
                        <Input s={3} label="所属用户" value={invoiceTitleManagerReducer.conditionUser} onChange={this.changeConditionUser}/>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryInvoiceList}>
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
                            {invoiceTitleManagerReducer.invoiceArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.company_name}</td>
                                        <td>{item.tax_number}</td>
                                        <td>{item.company_phone}</td>
                                        <td>{item.user_name}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/invoice_title/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            { invoiceTitleManagerReducer.invoiceArray.length === 0 &&
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
                            {invoiceTitleManagerReducer.start > 0 && invoiceTitleManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {invoiceTitleManagerReducer.dataSize >= invoiceTitleManagerReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
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
        invoiceTitleManagerReducer: state.InvoiceTitleManagerReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getInvoiceList: () => {
        dispatch(invoiceTitleManagerAction.getInvoiceList())
    },
    setStartNumber: (start) => {
        dispatch(InvoiceTitleManagerActionType.setStartNumber(start))
    },
    setConditionInvoiceNo: (value) => {
        dispatch(InvoiceTitleManagerActionType.setConditionInvoiceNo(value))
    },
    setConditionCompany: (value) => {
        dispatch(InvoiceTitleManagerActionType.setConditionCompany(value))
    },
    setConditionCompanyTax: (value) => {
        dispatch(InvoiceTitleManagerActionType.setConditionCompanyTax(value))
    },
    setConditionUser: (value) => {
        dispatch(InvoiceTitleManagerActionType.setConditionUser(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceTitleManager)