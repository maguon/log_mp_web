import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {LoadTaskManagerActionType} from '../../actionTypes';

const loadTaskManagerAction = require('../../actions/main/LoadTaskManagerAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class LoadTaskManager extends React.Component {

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
            this.props.setConditionOrderId('');
            this.props.changeConditionServiceType(null);
            this.props.changeConditionStartCity(null);
            this.props.changeConditionEndCity(null);
            this.props.changeConditionTransMode(null);
            this.props.changeConditionSupplier(null);
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.setConditionPlanStart('');
            this.props.setConditionPlanEnd('');
            this.props.changeConditionStatus(null);
        }
        this.props.getLoadTaskList();
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
     * 更新 检索条件：需求创建时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：需求创建时间(始)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 更新 检索条件：计划发运日期(始)
     */
    changeConditionPlanStart = (event, value) => {
        this.props.setConditionPlanStart(value);
    };

    /**
     * 更新 检索条件：计划发运日期(始)
     */
    changeConditionPlanEnd = (event, value) => {
        this.props.setConditionPlanEnd(value);
    };

    /**
     * 查询线路列表
     */
    queryLoadTaskList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getLoadTaskList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.loadTaskManagerReducer.start - (this.props.loadTaskManagerReducer.size - 1));
        this.props.getLoadTaskList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.loadTaskManagerReducer.start + (this.props.loadTaskManagerReducer.size - 1));
        this.props.getLoadTaskList();
    };

    render() {
        const {
            loadTaskManagerReducer,
            commonReducer,
            changeConditionServiceType,
            changeConditionStartCity,
            changeConditionEndCity,
            changeConditionTransMode,
            changeConditionSupplier,
            changeConditionStatus,
            deleteLoadTask
        } = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">线路管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：线路编号 */}
                            <Input s={2} label="线路编号" value={loadTaskManagerReducer.conditionLoadTaskId} onChange={this.changeConditionLoadTaskId}/>

                            {/* 查询条件：订单编号 */}
                            <Input s={2} label="订单编号" value={loadTaskManagerReducer.conditionOrderId} onChange={this.changeConditionOrderId}/>

                            {/* 查询条件：服务方式 */}
                            <div className="input-field col s2">
                                <Select
                                    options={sysConst.SERVICE_MODE}
                                    onChange={changeConditionServiceType}
                                    value={loadTaskManagerReducer.conditionServiceType}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">服务方式</label>
                            </div>

                            {/* 查询条件：起始城市 */}
                            <div className="input-field col s2">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeConditionStartCity}
                                    value={loadTaskManagerReducer.conditionStartCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">起始城市</label>
                            </div>

                            {/* 查询条件：目的城市 */}
                            <div className="input-field col s2">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeConditionEndCity}
                                    value={loadTaskManagerReducer.conditionEndCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">目的城市</label>
                            </div>

                            {/* 查询条件：运输方式 */}
                            <div className="input-field col s2">
                                <Select
                                    options={sysConst.TRANSPORT_TYPE}
                                    onChange={changeConditionTransMode}
                                    value={loadTaskManagerReducer.conditionTransMode}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">运输方式</label>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：供应商 */}
                            <div className="input-field col s2">
                                <Select
                                    options={commonReducer.supplierList}
                                    onChange={changeConditionSupplier}
                                    value={loadTaskManagerReducer.conditionSupplier}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">供应商</label>
                            </div>

                            {/* 查询条件：创建时间(始) */}
                            <div className="input-field col s2 custom-input-field">
                                <Input s={12} label="创建时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={loadTaskManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：创建时间(终) */}
                            <div className="input-field col s2 custom-input-field">
                                <Input s={12} label="创建时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={loadTaskManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：计划发运日期(始) */}
                            <div className="input-field col s2 custom-input-field">
                                <Input s={12} label="计划发运日期(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={loadTaskManagerReducer.conditionPlanStart} onChange={this.changeConditionPlanStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：计划发运日期(终) */}
                            <div className="input-field col s2 custom-input-field">
                                <Input s={12} label="计划发运日期(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={loadTaskManagerReducer.conditionPlanEnd} onChange={this.changeConditionPlanEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：状态 */}
                            <div className="input-field col s2">
                                <Select
                                    options={sysConst.LOAD_TASK_STATUS}
                                    onChange={changeConditionStatus}
                                    value={loadTaskManagerReducer.conditionStatus}
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
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryLoadTaskList}>
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
                                <th>订单编号</th>
                                <th>服务方式</th>
                                <th>供应商</th>
                                <th>线路</th>
                                <th className="center">运输方式</th>
                                <th className="right-align">车辆数</th>
                                <th className="right-align">运输费用</th>
                                <th className="center">计划发运日期</th>
                                <th className="center">创建时间</th>
                                <th className="center">状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loadTaskManagerReducer.loadTaskArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.order_id}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.SERVICE_MODE,item.service_type)}</td>
                                        <td>{item.supplier_short}</td>
                                        <td>{item.route_start} - {item.route_end}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.TRANSPORT_TYPE,item.trans_type)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.car_count)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.total_trans_price + item.total_insure_price, 2)}</td>
                                        <td className="center">{item.plan_date}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.LOAD_TASK_STATUS,item.load_task_status)}</td>
                                        <td className="operation center">
                                            <i className="mdi mdi-close margin-right20 pink-font pointer" onClick={() => {deleteLoadTask(item.id)}}/>
                                            <Link to={{pathname: '/load_task/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            { loadTaskManagerReducer.loadTaskArray.length === 0 &&
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
                            {loadTaskManagerReducer.start > 0 && loadTaskManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {loadTaskManagerReducer.dataSize >= loadTaskManagerReducer.size &&
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
        loadTaskManagerReducer: state.LoadTaskManagerReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getLoadTaskList: () => {
        dispatch(commonAction.getCityList());
        dispatch(commonAction.getSupplierList());
        dispatch(loadTaskManagerAction.getLoadTaskList())
    },
    setStartNumber: (start) => {
        dispatch(LoadTaskManagerActionType.setStartNumber(start))
    },
    setConditionLoadTaskId: (value) => {
        dispatch(LoadTaskManagerActionType.setConditionLoadTaskId(value))
    },
    setConditionOrderId: (value) => {
        dispatch(LoadTaskManagerActionType.setConditionOrderId(value))
    },
    changeConditionServiceType: (value) => {
        dispatch(LoadTaskManagerActionType.setConditionServiceType(value))
    },
    changeConditionStartCity: (value) => {
        dispatch(LoadTaskManagerActionType.setConditionStartCity(value))
    },
    changeConditionEndCity: (value) => {
        dispatch(LoadTaskManagerActionType.setConditionEndCity(value))
    },
    changeConditionTransMode: (value) => {
        dispatch(LoadTaskManagerActionType.setConditionTransMode(value))
    },
    changeConditionSupplier: (value) => {
        dispatch(LoadTaskManagerActionType.setConditionSupplier(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(LoadTaskManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(LoadTaskManagerActionType.setConditionCreatedOnEnd(value))
    },
    setConditionPlanStart: (value) => {
        dispatch(LoadTaskManagerActionType.setConditionPlanStart(value))
    },
    setConditionPlanEnd: (value) => {
        dispatch(LoadTaskManagerActionType.setConditionPlanEnd(value))
    },
    changeConditionStatus: (value) => {
        dispatch(LoadTaskManagerActionType.setConditionStatus(value))
    },
    // 删除指定线路
    deleteLoadTask: (loadTaskId) => {
        dispatch(loadTaskManagerAction.deleteLoadTask(loadTaskId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadTaskManager)