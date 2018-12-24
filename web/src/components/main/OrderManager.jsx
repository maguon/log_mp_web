import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {NewOrderModalActionType, OrderManagerActionType} from '../../actionTypes';
import {NewOrderModal} from '../modules/index';

const commonAction = require('../../actions/main/CommonAction');
const orderManagerAction = require('../../actions/main/OrderManagerAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class OrderManager extends React.Component {

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
            this.props.setConditionOrderUser('');
            this.props.setConditionCreateUser('');
            this.props.changeConditionStartCity(null);
            this.props.changeConditionEndCity(null);
            this.props.changeConditionServiceType(null);
            this.props.changeConditionOrderType(null);
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.changeConditionLogStatus(null);
            this.props.changeConditionPaymentStatus(null);
            this.props.changeConditionOrderStatus(null);
        }
        this.props.getOrderList();
    }

    /**
     * 更新 检索条件：编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：下单人
     */
    changeConditionOrderUser = (event) => {
        this.props.setConditionOrderUser(event.target.value);
    };

    /**
     * 更新 检索条件：电话
     */
    changeConditionCreateUser = (event) => {
        this.props.setConditionCreateUser(event.target.value);
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
     * 查询订单列表
     */
    queryOrderList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getOrderList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.orderManagerReducer.start - (this.props.orderManagerReducer.size - 1));
        this.props.getOrderList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.orderManagerReducer.start + (this.props.orderManagerReducer.size - 1));
        this.props.getOrderList();
    };

    /**
     * 显示 新建/编辑 供应商信息
     */
    showNewOrderModal = () => {
        this.props.initModalData();
        $('#newOrderModal').modal('open');
    };

    render() {
        const {
            orderManagerReducer, commonReducer,
            changeConditionStartCity, changeConditionEndCity, changeConditionServiceType,
            changeConditionOrderType, changeConditionLogStatus, changeConditionPaymentStatus, changeConditionOrderStatus
        } = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">订单管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">
                        {/* 查询条件：第一行 */}
                        <div>
                            <Input s={2} label="编号" value={orderManagerReducer.conditionNo} onChange={this.changeConditionNo}/>
                            <div className="input-field col s2">
                                <Select
                                    options={sysConst.ORDER_TYPE}
                                    onChange={changeConditionOrderType}
                                    value={orderManagerReducer.conditionOrderType}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">创建类型</label>
                            </div>
                            <Input s={2} label="下单账号" value={orderManagerReducer.conditionOrderUser} onChange={this.changeConditionOrderUser}/>
                            <Input s={2} label="创建人" value={orderManagerReducer.conditionCreateUser} onChange={this.changeConditionCreateUser}/>
                            <div className="input-field col s2">
                                <Select
                                    options={sysConst.SERVICE_MODE}
                                    onChange={changeConditionServiceType}
                                    value={orderManagerReducer.conditionServiceType}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">服务方式</label>
                            </div>
                            <div className="input-field col s2">
                                <Select
                                    options={sysConst.ORDER_STATUS}
                                    onChange={changeConditionOrderStatus}
                                    value={orderManagerReducer.conditionOrderStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">订单状态</label>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            <div className="input-field col s2">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeConditionStartCity}
                                    value={orderManagerReducer.conditionStartCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">起始城市</label>
                            </div>
                            <div className="input-field col s2">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeConditionEndCity}
                                    value={orderManagerReducer.conditionEndCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">目的城市</label>
                            </div>
                            <div className="input-field col s2 custom-input-field">
                                <Input s={12} label="创建时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={orderManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            <div className="input-field col s2 custom-input-field">
                                <Input s={12} label="创建时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={orderManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>
                            <div className="input-field col s2">
                                <Select
                                    options={sysConst.LOG_STATUS}
                                    onChange={changeConditionLogStatus}
                                    value={orderManagerReducer.conditionLogStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">物流状态</label>
                            </div>
                            <div className="input-field col s2">
                                <Select
                                    options={sysConst.PAYMENT_STATUS}
                                    onChange={changeConditionPaymentStatus}
                                    value={orderManagerReducer.conditionPaymentStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">支付状态</label>
                            </div>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryOrderList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 add-btn" onClick={this.showNewOrderModal}>
                            <i className="mdi mdi-plus"/>
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
                                <th>车辆数</th>
                                <th>服务方式</th>
                                <th>支付费用</th>
                                <th className="center">创建类型</th>
                                <th>下单账号</th>
                                <th>用户昵称</th>
                                <th>创建人</th>
                                <th className="center">创建时间</th>
                                <th className="center">支付 / 物流</th>
                                <th className="center">状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orderManagerReducer.orderArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.start_city} - {item.end_city}</td>
                                        <td>{item.count}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.SERVICE_MODE, item.service_type)}</td>
                                        <td>{formatUtil.formatNumber(item.fee_price,2)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.ORDER_TYPE, item.created_type)}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.user_name}</td>
                                        <td>{item.admin_name}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.PAYMENT_STATUS, item.payment_status)} / {commonUtil.getJsonValue(sysConst.LOG_STATUS, item.log_status)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.ORDER_STATUS, item.status)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/order/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            {orderManagerReducer.orderArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="13">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {orderManagerReducer.start > 0 && orderManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {orderManagerReducer.dataSize >= orderManagerReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                下一页
                            </a>}
                        </div>
                    </div>
                </div>
                <NewOrderModal/>
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
        orderManagerReducer: state.OrderManagerReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getOrderList: () => {
        dispatch(commonAction.getCityList());
        dispatch(orderManagerAction.getOrderList())
    },
    setStartNumber: (start) => {
        dispatch(OrderManagerActionType.setStartNumber(start))
    },
    setConditionNo: (value) => {
        dispatch(OrderManagerActionType.setConditionNo(value))
    },
    setConditionOrderUser: (value) => {
        dispatch(OrderManagerActionType.setConditionOrderUser(value))
    },
    setConditionCreateUser: (value) => {
        dispatch(OrderManagerActionType.setConditionCreateUser(value))
    },
    changeConditionStartCity: (value) => {
        dispatch(OrderManagerActionType.setConditionStartCity(value))
    },
    changeConditionEndCity: (value) => {
        dispatch(OrderManagerActionType.setConditionEndCity(value))
    },
    changeConditionServiceType: (value) => {
        dispatch(OrderManagerActionType.setConditionServiceType(value))
    },
    changeConditionOrderType: (value) => {
        dispatch(OrderManagerActionType.setConditionOrderType(value))
    },
    setConditionCreatedOnStart: (time) => {
        dispatch(OrderManagerActionType.setConditionCreatedOnStart(time))
    },
    setConditionCreatedOnEnd: (time) => {
        dispatch(OrderManagerActionType.setConditionCreatedOnEnd(time))
    },
    changeConditionLogStatus: (value) => {
        dispatch(OrderManagerActionType.setConditionLogStatus(value))
    },
    changeConditionPaymentStatus: (value) => {
        dispatch(OrderManagerActionType.setConditionPaymentStatus(value))
    },
    changeConditionOrderStatus: (value) => {
        dispatch(OrderManagerActionType.setConditionOrderStatus(value))
    },
    initModalData: () => {
        // dispatch(commonAction.getCityList());
        dispatch(NewOrderModalActionType.setStartCity(null));
        dispatch(NewOrderModalActionType.setEndCity(null));
        dispatch(NewOrderModalActionType.setServiceType(null));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderManager)