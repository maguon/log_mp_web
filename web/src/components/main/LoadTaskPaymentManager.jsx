import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {LoadTaskPaymentManagerActionType} from '../../actionTypes';

const loadTaskPaymentManagerAction = require('../../actions/main/LoadTaskPaymentManagerAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class LoadTaskPaymentManager extends React.Component {

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
            this.props.setConditionLoadTaskId('');
            this.props.changeConditionSupplier(null);
            this.props.changeConditionStartCity(null);
            this.props.changeConditionEndCity(null);
            this.props.setConditionOrderId('');
            this.props.setConditionPaymentOnStart('');
            this.props.setConditionPaymentOnEnd('');
            this.props.changeConditionPaymentStatus(null);
        }
        this.props.getLoadTaskPaymentList();
    }

    /**
     * 更新 检索条件：线路编号
     */
    changeConditionLoadTaskId = (event) => {
        this.props.setConditionLoadTaskId(event.target.value);
    };

    /**
     * 更新 检索条件：订单编号
     */
    changeConditionOrderId = (event) => {
        this.props.setConditionOrderId(event.target.value);
    };

    /**
     * 更新 检索条件：付款时间(始)
     */
    changeConditionPaymentOnStart = (event, value) => {
        this.props.setConditionPaymentOnStart(value);
    };

    /**
     * 更新 检索条件：付款时间(始)
     */
    changeConditionPaymentOnEnd = (event, value) => {
        this.props.setConditionPaymentOnEnd(value);
    };

    /**
     * 查询线路列表
     */
    queryLoadTaskPaymentList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getLoadTaskPaymentList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.loadTaskPaymentManagerReducer.start - (this.props.loadTaskPaymentManagerReducer.size - 1));
        this.props.getLoadTaskPaymentList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.loadTaskPaymentManagerReducer.start + (this.props.loadTaskPaymentManagerReducer.size - 1));
        this.props.getLoadTaskPaymentList();
    };

    render() {
        const {
            loadTaskPaymentManagerReducer,
            commonReducer,
            changeConditionSupplier,
            changeConditionStartCity,
            changeConditionEndCity,
            changeConditionPaymentStatus,
            paymentLoadTask
        } = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">线路结算</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：线路编号 */}
                            <Input s={3} label="线路编号" value={loadTaskPaymentManagerReducer.conditionLoadTaskId} onChange={this.changeConditionLoadTaskId}/>

                            {/* 查询条件：供应商 */}
                            <div className="input-field col s3">
                                <Select
                                    options={commonReducer.supplierList}
                                    onChange={changeConditionSupplier}
                                    value={loadTaskPaymentManagerReducer.conditionSupplier}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">供应商</label>
                            </div>

                            {/* 查询条件：起始城市 */}
                            <div className="input-field col s3">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeConditionStartCity}
                                    value={loadTaskPaymentManagerReducer.conditionStartCity}
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
                                    onChange={changeConditionEndCity}
                                    value={loadTaskPaymentManagerReducer.conditionEndCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">目的城市</label>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：订单编号 */}
                            <Input s={3} label="订单编号" value={loadTaskPaymentManagerReducer.conditionOrderId} onChange={this.changeConditionOrderId}/>

                            {/* 查询条件：付款时间(始) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="付款时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={loadTaskPaymentManagerReducer.conditionPaymentOnStart} onChange={this.changeConditionPaymentOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：付款时间(终) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="付款时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={loadTaskPaymentManagerReducer.conditionPaymentOnEnd} onChange={this.changeConditionPaymentOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：结算状态 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.PAYMENT_FLAG}
                                    onChange={changeConditionPaymentStatus}
                                    value={loadTaskPaymentManagerReducer.conditionPaymentStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">结算状态</label>
                            </div>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryLoadTaskPaymentList}>
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
                                <th>线路编号</th>
                                <th>线路</th>
                                <th className="right-align">车辆数</th>
                                <th className="center">订单编号</th>
                                <th>供应商</th>
                                <th className="right-align">供应商运费</th>
                                <th className="right-align">供应商保费</th>
                                <th className="right-align">支付供应商</th>
                                <th className="center">发运状态</th>
                                <th className="center">结算状态</th>
                                <th className="center">付款时间</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loadTaskPaymentManagerReducer.loadTaskArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.route_start} - {item.route_end}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.car_count)}</td>
                                        <td className="center">{item.order_id}</td>
                                        <td>{item.supplier_short}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.supplier_trans_price, 2)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.supplier_insure_price, 2)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.supplier_trans_price + item.supplier_insure_price, 2)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.LOAD_TASK_STATUS,item.load_task_status)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.PAYMENT_FLAG,item.payment_flag)}</td>
                                        <td className="center">{formatUtil.getDateTime(item.payment_on)}</td>
                                        <td className="operation right-align padding-right20">
                                            {item.payment_flag === sysConst.PAYMENT_FLAG[0].value &&
                                            <button type="button" className="btn purple-btn margin-right10 btn-height24 fz14" onClick={() => {paymentLoadTask(item.id)}}>付款</button>}
                                            <Link to={{pathname: '/load_task_payment/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            { loadTaskPaymentManagerReducer.loadTaskArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="12">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {loadTaskPaymentManagerReducer.start > 0 && loadTaskPaymentManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {loadTaskPaymentManagerReducer.dataSize >= loadTaskPaymentManagerReducer.size &&
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
        loadTaskPaymentManagerReducer: state.LoadTaskPaymentManagerReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getLoadTaskPaymentList: () => {
        dispatch(commonAction.getCityList());
        dispatch(commonAction.getSupplierList());
        dispatch(loadTaskPaymentManagerAction.getLoadTaskPaymentList())
    },
    setStartNumber: (start) => {
        dispatch(LoadTaskPaymentManagerActionType.setStartNumber(start))
    },
    setConditionLoadTaskId: (value) => {
        dispatch(LoadTaskPaymentManagerActionType.setConditionLoadTaskId(value))
    },
    changeConditionSupplier: (value) => {
        dispatch(LoadTaskPaymentManagerActionType.setConditionSupplier(value))
    },
    changeConditionStartCity: (value) => {
        dispatch(LoadTaskPaymentManagerActionType.setConditionStartCity(value))
    },
    changeConditionEndCity: (value) => {
        dispatch(LoadTaskPaymentManagerActionType.setConditionEndCity(value))
    },
    setConditionOrderId: (value) => {
        dispatch(LoadTaskPaymentManagerActionType.setConditionOrderId(value))
    },
    setConditionPaymentOnStart: (value) => {
        dispatch(LoadTaskPaymentManagerActionType.setConditionPaymentOnStart(value))
    },
    setConditionPaymentOnEnd: (value) => {
        dispatch(LoadTaskPaymentManagerActionType.setConditionPaymentOnEnd(value))
    },
    changeConditionPaymentStatus: (value) => {
        dispatch(LoadTaskPaymentManagerActionType.setConditionPaymentStatus(value))
    },
    // 付款
    paymentLoadTask: (loadTaskId) => {
        dispatch(loadTaskPaymentManagerAction.paymentLoadTask(loadTaskId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadTaskPaymentManager)