import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {NewInvoiceModal} from '../modules/index';
import {InvoiceApplyManagerDetailActionType} from "../../actionTypes";

const invoiceApplyManagerDetailAction = require('../../actions/main/InvoiceApplyManagerDetailAction');
const newInvoiceModalAction = require('../../actions/modules/NewInvoiceModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class InvoiceApplyManagerDetail extends React.Component {

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
        // 开票订单
        this.props.setInvoiceOrderId('');
        // 取得订单信息
        this.props.getInvoiceApplyInfo();
    }

    /**
     * 显示 申请开票 模态画面
     */
    showNewInvoiceModal = (invoiceApplyInfo) => {
        this.props.initNewInvoiceModalData(invoiceApplyInfo.id, invoiceApplyInfo);
        $('#newInvoiceModal').modal('open');
    };

    /**
     * 更改 订单编号
     */
    changeInvoiceApplyOrderId = (event) => {
        this.props.setInvoiceOrderId(event.target.value);
    };

    render() {
        const {invoiceApplyManagerDetailReducer, changeInvoiceApplyOrder} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/invoice_apply', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">开票申请 - 发票详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体 */}
                {invoiceApplyManagerDetailReducer.invoiceApplyInfo.length > 0 &&
                <div className="row margin-top40 margin-left50 margin-right50">

                    {/* 发票申请编号 */}
                    <div className="col s6 no-padding fz16 purple-font">发票申请编号：{invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].invoice_apply_id}</div>
                    <div className="col s6 no-padding pink-font right-align">{commonUtil.getJsonValue(sysConst.INVOICE_STATUS, invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].invoiced_status)}</div>
                    {/* 分割线 */}
                    <div className="col s12 no-padding">
                        <div className="col s12 margin-top10 divider bold-divider"/>
                    </div>
                    {invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].invoiced_status === sysConst.INVOICE_STATUS[2].value &&
                    <div>
                        <div className="col s12 no-padding margin-top10 grey-text">
                            拒绝原因：{invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].refuse_reason}
                        </div>
                        {/* 分割线 */}
                        <div className="col s12 no-padding">
                            <div className="col s12 margin-top10 divider"/>
                        </div>
                    </div>}
                    <div className="col s6 no-padding margin-top10 grey-text">
                        申请时间：{formatUtil.getDateTime(invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].apply_time)}
                    </div>
                    <div className="col s6 no-padding margin-top10 grey-text right-align">
                        {invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].invoiced_status !== sysConst.INVOICE_STATUS[0].value &&
                        <span>处理时间：{formatUtil.getDateTime(invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].invoiced_time)}</span>}
                    </div>

                    {/* 发票信息 */}
                    <div className="col s12 no-padding margin-top30 pink-font">发票信息</div>
                    {/* 分割线 */}
                    <div className="col s12 no-padding">
                        <div className="col s12 margin-top5 divider bold-divider"/>
                    </div>
                    <div className="col s12 no-padding margin-top20 detail-box z-depth-1">
                        <div className="col s12 padding-top10 padding-bottom5 custom-grey border-bottom-line">
                            <div className="col s8">发票抬头：{invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].title}</div>
                            {/* 编辑按钮 */}
                            {invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].invoiced_status === sysConst.INVOICE_STATUS[0].value &&
                            <div className="col s4 pink-font right-align">
                                <i className="mdi mdi-pencil pink-font pointer fz20"
                                   onClick={() => {this.showNewInvoiceModal(invoiceApplyManagerDetailReducer.invoiceApplyInfo[0])}}/>
                                <NewInvoiceModal/>
                            </div>}
                        </div>
                        <div className="col s12 padding-top20 padding-bottom20">
                            <div className="col s4">税号：{invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].tax_number}</div>
                            <div className="col s4 no-padding">开户银行：{invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].bank}</div>
                            <div className="col s4 right-align">银行账户：{invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].bank_code}</div>

                            <div className="col s9 margin-top10">企业地址：{invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].company_address}</div>
                            <div className="col s3 margin-top10 right-align">电话号码：{invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].company_phone}</div>

                            <div className="col s12 margin-top10">备注：{invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].remark}</div>
                        </div>
                    </div>

                    {/* 开票订单 */}
                    {invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].invoiced_status !== sysConst.INVOICE_STATUS[0].value &&
                    <div>
                        <div className="col s12 no-padding margin-top40 pink-font">开票订单</div>
                        {/* 分割线 */}
                        <div className="col s12 no-padding"><div className="col s12 margin-top5 divider bold-divider"/></div>
                    </div>}

                    {invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].invoiced_status === sysConst.INVOICE_STATUS[0].value &&
                    <div className="col s12 no-padding margin-top30 margin-bottom0 position-relative">
                        <Input s={12} label="开票订单" value={invoiceApplyManagerDetailReducer.invoiceOrderId} onChange={this.changeInvoiceApplyOrderId}/>
                        <i className="mdi mdi-checkbox-marked-circle confirm-icon fz30 purple-font pointer" onClick={changeInvoiceApplyOrder}/>
                    </div>}

                    <div className="col s12 no-padding margin-top20 detail-box z-depth-1">

                        <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                            <div className="col s12 purple-font">订单编号：{invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].id}</div>
                        </div>
                        <div className="col s12 padding-top15 padding-bottom15 border-bottom-dotted-line">
                            <div className="row margin-bottom10">
                                <div className="col s6">
                                    {/* 线路 */}
                                    <span className="fz18 purple-font">{invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].route_start} - {invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].route_end}</span>
                                    {/* 发运日期 */}
                                    <span className="margin-left30">发运日期：{formatUtil.getDate(invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].departure_time)}</span>
                                    {/* 服务类型 */}
                                    <span className="margin-left30">{commonUtil.getJsonValue(sysConst.SERVICE_MODE, invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].service_type)}</span>
                                </div>
                                <div className="col s6 right-align">创建时间：{formatUtil.getDateTime(invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].created_on)}</div>
                            </div>

                            <div className="row margin-bottom0">
                                <div className="col s6">运输车辆：{formatUtil.formatNumber(invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].car_num)}</div>
                                <div className="col s6 right-align">创建人：{invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].real_name}</div>
                            </div>
                        </div>
                        <div className="col s12 padding-top15 padding-bottom15">
                            <div className="col s4">
                                运费：<span className="fz16 pink-font">{formatUtil.formatNumber(invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].total_trans_price, 2)}</span> 元
                            </div>
                            <div className="col s4">
                                保费：<span className="fz16 pink-font">{formatUtil.formatNumber(invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].total_insure_price, 2)}</span> 元
                            </div>
                            <div className="col s4 right-align">
                                实际支付：<span className="fz16 pink-font">{formatUtil.formatNumber(invoiceApplyManagerDetailReducer.invoiceApplyInfo[0].real_payment_price, 2)}</span> 元
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        invoiceApplyManagerDetailReducer: state.InvoiceApplyManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getInvoiceApplyInfo: () => {
        dispatch(invoiceApplyManagerDetailAction.getInvoiceApplyInfo(ownProps.match.params.id));
    },
    initNewInvoiceModalData: (orderId, invoiceApplyInfo) => {
        dispatch(newInvoiceModalAction.initNewInvoiceModal('invoiceApplyDetail', orderId, invoiceApplyInfo));
    },
    setInvoiceOrderId: (value) => {
        dispatch(InvoiceApplyManagerDetailActionType.setInvoiceOrderId(value))
    },
    changeInvoiceApplyOrder: () => {
        dispatch(invoiceApplyManagerDetailAction.changeInvoiceApplyOrder());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceApplyManagerDetail)