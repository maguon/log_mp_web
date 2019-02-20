import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {OrderProfitManagerActionType} from '../../actionTypes';

const orderProfitManagerAction = require('../../actions/main/OrderProfitManagerAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class OrderProfitManager extends React.Component {

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
            this.props.setConditionOrderId('');
            this.props.changeConditionStartCity(null);
            this.props.changeConditionEndCity(null);
            this.props.changeConditionServiceType(null);
            this.props.changeConditionOrderCreatedUser(null);
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.changeConditionStatus(null);
        }
        this.props.getOrderProfitList();
    }

    /**
     * 更新 检索条件：订单编号
     */
    changeConditionOrderId = (event) => {
        this.props.setConditionOrderId(event.target.value);
    };

    /**
     * 更新 检索条件：创建时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：创建时间(始)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 查询订单利润列表
     */
    queryOrderProfitList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getOrderProfitList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.orderProfitManagerReducer.start - (this.props.orderProfitManagerReducer.size - 1));
        this.props.getOrderProfitList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.orderProfitManagerReducer.start + (this.props.orderProfitManagerReducer.size - 1));
        this.props.getOrderProfitList();
    };

    render() {
        const {
            orderProfitManagerReducer,
            commonReducer,
            changeConditionStartCity,
            changeConditionEndCity,
            changeConditionServiceType,
            changeConditionOrderCreatedUser,
            changeConditionStatus
        } = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">订单利润</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：订单编号 */}
                            <Input s={3} label="订单编号" value={orderProfitManagerReducer.conditionOrderId} onChange={this.changeConditionOrderId}/>

                            {/* 查询条件：起始城市 */}
                            <div className="input-field col s3">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeConditionStartCity}
                                    value={orderProfitManagerReducer.conditionStartCity}
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
                                    value={orderProfitManagerReducer.conditionEndCity}
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
                                    onChange={changeConditionServiceType}
                                    value={orderProfitManagerReducer.conditionServiceType}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">服务方式</label>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：订单创建人 */}
                            <div className="input-field col s3">
                                <Select
                                    options={commonReducer.adminUserList}
                                    onChange={changeConditionOrderCreatedUser}
                                    value={orderProfitManagerReducer.conditionOrderCreatedUser}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">订单创建人</label>
                            </div>

                            {/* 查询条件：创建时间(始) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="创建时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={orderProfitManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：创建时间(终) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="创建时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={orderProfitManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：收支状态 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.PROFIT_STATUS}
                                    onChange={changeConditionStatus}
                                    value={orderProfitManagerReducer.conditionStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">收支状态</label>
                            </div>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryOrderProfitList}>
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
                                <th className="center">线路</th>
                                <th className="right-align">车辆数</th>
                                <th className="center">服务方式</th>
                                <th>创建人</th>
                                <th className="center">订单创建时间</th>
                                <th className="right-align">订单收入</th>
                                <th className="right-align">支付供应商</th>
                                <th className="right-align">利润</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orderProfitManagerReducer.orderProfitArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td className="center">{item.route_start} - {item.route_end}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.car_num)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.SERVICE_MODE,item.service_type)}</td>
                                        <td>{item.real_name}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.total_trans_price + item.total_insure_price,2)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.supplier_trans_price + item.supplier_insure_price,2)}</td>
                                        <td className={`right-align ${item.profit_price > 0 ? "teal-text text-accent-4" : "red-font"}`}>{formatUtil.formatNumber(item.order_real_profit,2)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/order_profit/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            {orderProfitManagerReducer.orderProfitArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="10">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {orderProfitManagerReducer.start > 0 && orderProfitManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {orderProfitManagerReducer.dataSize >= orderProfitManagerReducer.size &&
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
        orderProfitManagerReducer: state.OrderProfitManagerReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getOrderProfitList: () => {
        dispatch(commonAction.getCityList());
        dispatch(commonAction.getAdminUserList());
        dispatch(orderProfitManagerAction.getOrderProfitList())
    },
    setStartNumber: (start) => {
        dispatch(OrderProfitManagerActionType.setStartNumber(start))
    },
    setConditionOrderId: (value) => {
        dispatch(OrderProfitManagerActionType.setConditionOrderId(value))
    },
    changeConditionStartCity: (value) => {
        dispatch(OrderProfitManagerActionType.setConditionStartCity(value))
    },
    changeConditionEndCity: (value) => {
        dispatch(OrderProfitManagerActionType.setConditionEndCity(value))
    },
    changeConditionServiceType: (value) => {
        dispatch(OrderProfitManagerActionType.setConditionServiceType(value))
    },
    changeConditionOrderCreatedUser: (value) => {
        dispatch(OrderProfitManagerActionType.setConditionOrderCreatedUser(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(OrderProfitManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(OrderProfitManagerActionType.setConditionCreatedOnEnd(value))
    },
    changeConditionStatus: (value) => {
        dispatch(OrderProfitManagerActionType.setConditionStatus(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderProfitManager)