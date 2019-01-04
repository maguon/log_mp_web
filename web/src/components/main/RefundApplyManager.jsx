import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {RefundApplyManagerActionType} from '../../actionTypes';

const refundApplyManagerAction = require('../../actions/main/RefundApplyManagerAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class RefundApplyManager extends React.Component {

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
            this.props.changeConditionOrderType(null);
            this.props.changeConditionRefundMode(null);
            this.props.setConditionCreateUser('');
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.setConditionOperationStart('');
            this.props.setConditionOperationEnd('');
            this.props.changeConditionStatus(null);
        }
        this.props.getRefundApplyList();
    }

    /**
     * 更新 检索条件：退款编号
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
     * 更新 检索条件：订单创建人
     */
    changeConditionCreateUser = (event) => {
        this.props.setConditionCreateUser(event.target.value);
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
    changeConditionOperationStart = (event, value) => {
        this.props.setConditionOperationStart(value);
    };

    /**
     * 更新 检索条件：处理时间(始)
     */
    changeConditionOperationEnd = (event, value) => {
        this.props.setConditionOperationEnd(value);
    };

    /**
     * 查询订单列表
     */
    queryRefundApplyList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getRefundApplyList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.refundApplyManagerReducer.start - (this.props.refundApplyManagerReducer.size - 1));
        this.props.getRefundApplyList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.refundApplyManagerReducer.start + (this.props.refundApplyManagerReducer.size - 1));
        this.props.getRefundApplyList();
    };

    render() {
        const {
            refundApplyManagerReducer, changeConditionRefundMode, changeConditionOrderType, changeConditionStatus,
        } = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">订单退款</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        {/* 查询条件：第一行 */}
                        <div>
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="退款编号" value={refundApplyManagerReducer.conditionNo} onChange={this.changeConditionNo}/>
                            </div>

                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="订单编号" value={refundApplyManagerReducer.conditionOrderId} onChange={this.changeConditionOrderId}/>
                            </div>

                            <div className="input-field col s-percent-20">
                                <Select
                                    options={sysConst.ORDER_TYPE}
                                    onChange={changeConditionOrderType}
                                    value={refundApplyManagerReducer.conditionOrderType}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">订单类型</label>
                            </div>

                            <div className="input-field col s-percent-20">
                                <Select
                                    options={sysConst.PAYMENT_MODE}
                                    onChange={changeConditionRefundMode}
                                    value={refundApplyManagerReducer.conditionRefundMode}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">退款方式</label>
                            </div>

                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="订单创建人" value={refundApplyManagerReducer.conditionCreateUser} onChange={this.changeConditionCreateUser}/>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="申请时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={refundApplyManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="申请时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={refundApplyManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="处理时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={refundApplyManagerReducer.conditionOperationStart} onChange={this.changeConditionOperationStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="处理时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={refundApplyManagerReducer.conditionOperationEnd} onChange={this.changeConditionOperationEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            <div className="input-field col s-percent-20">
                                <Select
                                    options={sysConst.REFUND_STATUS}
                                    onChange={changeConditionStatus}
                                    value={refundApplyManagerReducer.conditionStatus}
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
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryRefundApplyList}>
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
                                <th>退款编号</th>
                                <th>订单编号</th>
                                <th>订单类型</th>
                                <th>退款方式</th>
                                <th>申请金额(元)</th>
                                <th>申请时间</th>
                                <th>退款金额(元)</th>
                                <th>处理时间</th>
                                <th>订单创建人</th>
                                <th className="center">状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {refundApplyManagerReducer.refundApplyArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.order_id}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.ORDER_TYPE, item.created_type)}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.PAYMENT_MODE, item.payment_type)}</td>
                                        <td>{formatUtil.formatNumber(item.apply_fee, 2)}</td>
                                        <td>{formatUtil.getDateTime(item.created_on)}</td>
                                        <td>{formatUtil.formatNumber(item.refund_fee, 2)}</td>
                                        <td>{formatUtil.getDateTime(item.updated_on)}</td>
                                        <td>{item.real_name}</td>
                                        <td className={`center ${item.status === sysConst.REFUND_STATUS[2].value ? "pink-font" : ""}`}>{commonUtil.getJsonValue(sysConst.REFUND_STATUS,item.status)}</td>
                                        <td className="operation right-align padding-right20 purple-font">
                                            <Link to={{pathname: '/refund/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            },this)}
                            {refundApplyManagerReducer.refundApplyArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="11">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {refundApplyManagerReducer.start > 0 && refundApplyManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {refundApplyManagerReducer.dataSize >= refundApplyManagerReducer.size &&
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
        refundApplyManagerReducer: state.RefundApplyManagerReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getRefundApplyList: () => {
        dispatch(refundApplyManagerAction.getRefundApplyList())
    },
    setStartNumber: (start) => {
        dispatch(RefundApplyManagerActionType.setStartNumber(start))
    },
    setConditionNo: (value) => {
        dispatch(RefundApplyManagerActionType.setConditionNo(value))
    },
    setConditionOrderId: (value) => {
        dispatch(RefundApplyManagerActionType.setConditionOrderId(value))
    },
    changeConditionOrderType: (value) => {
        dispatch(RefundApplyManagerActionType.setConditionOrderType(value))
    },
    changeConditionRefundMode: (value) => {
        dispatch(RefundApplyManagerActionType.setConditionRefundMode(value))
    },
    setConditionCreateUser: (value) => {
        dispatch(RefundApplyManagerActionType.setConditionCreateUser(value))
    },
    setConditionCreatedOnStart: (time) => {
        dispatch(RefundApplyManagerActionType.setConditionCreatedOnStart(time))
    },
    setConditionCreatedOnEnd: (time) => {
        dispatch(RefundApplyManagerActionType.setConditionCreatedOnEnd(time))
    },
    setConditionOperationStart: (time) => {
        dispatch(RefundApplyManagerActionType.setConditionOperationStart(time))
    },
    setConditionOperationEnd: (time) => {
        dispatch(RefundApplyManagerActionType.setConditionOperationEnd(time))
    },
    changeConditionStatus: (value) => {
        dispatch(RefundApplyManagerActionType.setConditionStatus(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RefundApplyManager)