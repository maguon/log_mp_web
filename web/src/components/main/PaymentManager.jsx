import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {PaymentManagerActionType} from '../../actionTypes';

const commonAction = require('../../actions/main/CommonAction');
const paymentManagerAction = require('../../actions/main/PaymentManagerAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class PaymentManager extends React.Component {

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
            this.props.setConditionNo('');
            this.props.setConditionOrderId('');
            this.props.changeConditionPaymentMode(null);
            this.props.changeConditionPaymentType(null);
            this.props.setConditionCreateUser('');
            this.props.setConditionBank('');
            this.props.setConditionBankUser('');
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.changeConditionPaymentStatus(null);
        }
        this.props.getPaymentList();
    }

    /**
     * 更新 检索条件：编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：订单编号
     */
    changeConditionOrderId = (event) => {
        this.props.setConditionOrderId(event.target.value);
    };

    /**
     * 更新 检索条件：创建人
     */
    changeConditionCreateUser = (event) => {
        this.props.setConditionCreateUser(event.target.value);
    };

    /**
     * 更新 检索条件：付款银行
     */
    changeConditionBank = (event) => {
        this.props.setConditionBank(event.target.value);
    };

    /**
     * 更新 检索条件：户主
     */
    changeConditionBankUser = (event) => {
        this.props.setConditionBankUser(event.target.value);
    };

    /**
     * 更新 检索条件：提交时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：提交时间(始)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 查询订单列表
     */
    queryOrderList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getPaymentList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.paymentManagerReducer.start - (this.props.paymentManagerReducer.size - 1));
        this.props.getPaymentList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.paymentManagerReducer.start + (this.props.paymentManagerReducer.size - 1));
        this.props.getPaymentList();
    };

    render() {
        const {
            paymentManagerReducer, commonReducer,
            changeConditionPaymentMode, changeConditionPaymentType, changeConditionPaymentStatus,
        } = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">支付管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        {/* 查询条件：第一行 */}
                        <div>
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="支付编号" value={paymentManagerReducer.conditionNo} onChange={this.changeConditionNo}/>
                            </div>

                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="订单编号" value={paymentManagerReducer.conditionOrderId} onChange={this.changeConditionOrderId}/>
                            </div>

                            <div className="input-field col s-percent-20">
                                <Select
                                    options={sysConst.PAYMENT_MODE}
                                    onChange={changeConditionPaymentMode}
                                    value={paymentManagerReducer.conditionPaymentMode}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">支付方式</label>
                            </div>

                            <div className="input-field col s-percent-20">
                                <Select
                                    options={sysConst.PAYMENT_TYPE}
                                    onChange={changeConditionPaymentType}
                                    value={paymentManagerReducer.conditionPaymentType}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">支付类型</label>
                            </div>

                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="订单创建人" value={paymentManagerReducer.conditionCreateUser} onChange={this.changeConditionCreateUser}/>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="付款银行" value={paymentManagerReducer.conditionBank} onChange={this.changeConditionBank}/>
                            </div>

                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="户主" value={paymentManagerReducer.conditionBankUser} onChange={this.changeConditionBankUser}/>
                            </div>

                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="创建时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={paymentManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="创建时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={paymentManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>
                            <div className="input-field col s-percent-20">
                                <Select
                                    options={sysConst.PAYMENT_STATUS}
                                    onChange={changeConditionPaymentStatus}
                                    value={paymentManagerReducer.conditionPaymentStatus}
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
                                <th>支付编号</th>
                                <th>订单编号</th>
                                <th>支付类型</th>
                                <th>支付方式</th>

                                <th>付款银行</th>
                                <th>银行账号</th>
                                <th>户名</th>
                                <th>支付金额 ( 元 )</th>

                                <th>订单创建人</th>
                                <th className="center">提交时间</th>
                                <th className="center">状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paymentManagerReducer.paymentArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.order_id}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.PAYMENT_TYPE, item.type)}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.PAYMENT_MODE, item.payment_type)}</td>

                                        <td>{item.bank}</td>
                                        <td>{item.bank_code}</td>
                                        <td>{item.account_name}</td>
                                        <td>{item.total_fee}</td>

                                        {/*<td>{item.phone}</td>*/}
                                        {/*<td>{formatUtil.formatNumber(item.fee_price,2)}</td>*/}
                                        {/*<td className="center">{commonUtil.getJsonValue(sysConst.ORDER_TYPE, item.created_type)}</td>*/}
                                        {/*<td>{item.phone}</td>*/}
                                        {/*<td>{item.user_name}</td>*/}

                                        <td>{item.admin_name}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className={`center ${item.status === 0 ? "pink-font" : ""}`}>{commonUtil.getJsonValue(sysConst.PAYMENT_STATUS,item.status)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/payment/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            {paymentManagerReducer.paymentArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="13">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {paymentManagerReducer.start > 0 && paymentManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {paymentManagerReducer.dataSize >= paymentManagerReducer.size &&
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
        paymentManagerReducer: state.PaymentManagerReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getPaymentList: () => {
        dispatch(commonAction.getCityList());
        dispatch(paymentManagerAction.getPaymentList())
    },




    setStartNumber: (start) => {
        dispatch(PaymentManagerActionType.setStartNumber(start))
    },


    setConditionNo: (value) => {
        dispatch(PaymentManagerActionType.setConditionNo(value))
    },
    setConditionOrderId: (value) => {
        dispatch(PaymentManagerActionType.setConditionOrderId(value))
    },
    changeConditionPaymentMode: (value) => {
        dispatch(PaymentManagerActionType.setConditionPaymentMode(value))
    },
    changeConditionPaymentType: (value) => {
        dispatch(PaymentManagerActionType.setConditionPaymentType(value))
    },
    setConditionCreateUser: (value) => {
        dispatch(PaymentManagerActionType.setConditionCreateUser(value))
    },


    setConditionBank: (value) => {
        dispatch(PaymentManagerActionType.setConditionBank(value))
    },
    setConditionBankUser: (value) => {
        dispatch(PaymentManagerActionType.setConditionBankUser(value))
    },
    setConditionCreatedOnStart: (time) => {
        dispatch(PaymentManagerActionType.setConditionCreatedOnStart(time))
    },
    setConditionCreatedOnEnd: (time) => {
        dispatch(PaymentManagerActionType.setConditionCreatedOnEnd(time))
    },
    changeConditionPaymentStatus: (value) => {
        dispatch(PaymentManagerActionType.setConditionPaymentStatus(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentManager)