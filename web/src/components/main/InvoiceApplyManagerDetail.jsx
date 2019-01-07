import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const invoiceTitleManagerDetailAction = require('../../actions/main/InvoiceTitleManagerDetailAction');

class InvoiceTitleManagerDetail extends React.Component {

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
        this.props.getInvoiceInfo();
    }

    render() {
        const {invoiceTitleManagerDetailReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/invoiceApply', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">开票申请 - 详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体 */}
                {invoiceTitleManagerDetailReducer.invoiceInfo.length > 0 &&
                <div className="row margin-top40 margin-left150 margin-right150 detail-box z-depth-1 grey-text">
                    <div className="col s12 padding-top20 padding-bottom20 custom-grey purple-font border-bottom-line">
                        <div className="col s12 margin-top5">编号：{invoiceTitleManagerDetailReducer.invoiceInfo[0].id}</div>
                        <div className="col s6 fz16 bold-font margin-top10">{invoiceTitleManagerDetailReducer.invoiceInfo[0].company_name}</div>
                        <div className="col s6 fz16 bold-font margin-top10 right-align">税号：{invoiceTitleManagerDetailReducer.invoiceInfo[0].tax_number}</div>
                    </div>

                    <div className="col s12 margin-top5 padding-top20 padding-bottom20">
                        <div className="col s6">开户银行：{invoiceTitleManagerDetailReducer.invoiceInfo[0].bank}</div>
                        <div className="col s6 right-align">银行账户：{invoiceTitleManagerDetailReducer.invoiceInfo[0].bank_code}</div>
                    </div>

                    <div className="col s12 padding-left20 padding-right20"><div className="col s12 dotted-line"/></div>

                    <div className="col s12 padding-top20 padding-bottom20">
                        <div className="col s12">电话号码：{invoiceTitleManagerDetailReducer.invoiceInfo[0].company_phone}</div>
                    </div>

                    <div className="col s12 padding-left20 padding-right20"><div className="col s12 dotted-line"/></div>

                    <div className="col s12 padding-top20 padding-bottom20">
                        <div className="col s12">单位地址：{invoiceTitleManagerDetailReducer.invoiceInfo[0].company_address}</div>
                    </div>

                    <div className="col s12 padding-left20 padding-right20"><div className="col s12 divider"/></div>

                    <div className="col s12 padding-top20 padding-bottom20 right-align">
                        <div className="col s12">所属用户：{invoiceTitleManagerDetailReducer.invoiceInfo[0].user_name}</div>
                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        invoiceTitleManagerDetailReducer: state.InvoiceTitleManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getInvoiceInfo: () => {
        dispatch(invoiceTitleManagerDetailAction.getInvoiceInfo(ownProps.match.params.id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceTitleManagerDetail)