import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {LoadTaskProfitManagerActionType} from '../../actionTypes';

const loadTaskProfitManagerAction = require('../../actions/main/LoadTaskProfitManagerAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class LoadTaskProfitManager extends React.Component {

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
            this.props.setConditionVin('');
            this.props.changeConditionStartCity(null);
            this.props.changeConditionEndCity(null);
            this.props.changeConditionServiceType(null);
            this.props.setConditionOrderId('');
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.changeConditionStatus(null);
        }
        this.props.getLoadTaskProfitList();
    }

    /**
     * 更新 检索条件：VIN
     */
    changeConditionVin = (event) => {
        this.props.setConditionVin(event.target.value);
    };

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
     * 查询车辆运输利润列表
     */
    queryLoadTaskProfitList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getLoadTaskProfitList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.loadTaskProfitManagerReducer.start - (this.props.loadTaskProfitManagerReducer.size - 1));
        this.props.getLoadTaskProfitList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.loadTaskProfitManagerReducer.start + (this.props.loadTaskProfitManagerReducer.size - 1));
        this.props.getLoadTaskProfitList();
    };

    render() {
        const {
            loadTaskProfitManagerReducer,
            commonReducer,
            changeConditionStartCity,
            changeConditionEndCity,
            changeConditionServiceType,
            changeConditionStatus
        } = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">车辆运输利润</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：VIN */}
                            <Input s={3} label="VIN" value={loadTaskProfitManagerReducer.conditionVin} onChange={this.changeConditionVin}/>

                            {/* 查询条件：起始城市 */}
                            <div className="input-field col s3">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeConditionStartCity}
                                    value={loadTaskProfitManagerReducer.conditionStartCity}
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
                                    value={loadTaskProfitManagerReducer.conditionEndCity}
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
                                    value={loadTaskProfitManagerReducer.conditionServiceType}
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
                            {/* 查询条件：订单编号 */}
                            <Input s={3} label="订单编号" value={loadTaskProfitManagerReducer.conditionOrderId} onChange={this.changeConditionOrderId}/>

                            {/* 查询条件：创建时间(始) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="创建时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={loadTaskProfitManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：创建时间(终) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="创建时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={loadTaskProfitManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：收支状态 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.LOAD_TASK_PROFIT_STATUS}
                                    onChange={changeConditionStatus}
                                    value={loadTaskProfitManagerReducer.conditionStatus}
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
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryLoadTaskProfitList}>
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
                                <th>VIN</th>
                                <th>订单编号</th>
                                <th className="center">线路</th>
                                <th className="center">服务方式</th>
                                <th>创建人</th>
                                <th className="center">订单创建时间</th>
                                <th className="right-align">订单运费</th>
                                <th className="right-align">订单保费</th>
                                <th className="right-align">供应商运费</th>
                                <th className="right-align">供应商保费</th>
                                <th className="right-align">利润</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loadTaskProfitManagerReducer.loadTaskProfitArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.vin}</td>
                                        <td>{item.order_id}</td>
                                        <td className="center">{item.route_start} - {item.route_end}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.SERVICE_MODE,item.service_type)}</td>
                                        <td>{item.real_name}</td>
                                        <td className="center">{formatUtil.getDateTime(item.order_created_on)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.act_trans_price,2)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.act_insure_price,2)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.supplier_trans_price,2)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.supplier_insure_price,2)}</td>
                                        <td className={`right-align ${item.profit_price > 0 ? "teal-text text-accent-4" : "red-font"}`}>{formatUtil.formatNumber(item.profit_price,2)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/load_task_profit/' + item.order_item_id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            {loadTaskProfitManagerReducer.loadTaskProfitArray.length === 0 &&
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
                            {loadTaskProfitManagerReducer.start > 0 && loadTaskProfitManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {loadTaskProfitManagerReducer.dataSize >= loadTaskProfitManagerReducer.size &&
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
        loadTaskProfitManagerReducer: state.LoadTaskProfitManagerReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getLoadTaskProfitList: () => {
        dispatch(commonAction.getCityList());
        dispatch(loadTaskProfitManagerAction.getLoadTaskProfitList())
    },
    setStartNumber: (start) => {
        dispatch(LoadTaskProfitManagerActionType.setStartNumber(start))
    },
    setConditionVin: (value) => {
        dispatch(LoadTaskProfitManagerActionType.setConditionVin(value))
    },
    changeConditionStartCity: (value) => {
        dispatch(LoadTaskProfitManagerActionType.setConditionStartCity(value))
    },
    changeConditionEndCity: (value) => {
        dispatch(LoadTaskProfitManagerActionType.setConditionEndCity(value))
    },
    changeConditionServiceType: (value) => {
        dispatch(LoadTaskProfitManagerActionType.setConditionServiceType(value))
    },
    setConditionOrderId: (value) => {
        dispatch(LoadTaskProfitManagerActionType.setConditionOrderId(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(LoadTaskProfitManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(LoadTaskProfitManagerActionType.setConditionCreatedOnEnd(value))
    },
    changeConditionStatus: (value) => {
        dispatch(LoadTaskProfitManagerActionType.setConditionStatus(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadTaskProfitManager)