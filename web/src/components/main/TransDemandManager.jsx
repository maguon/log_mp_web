import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {TransDemandManagerActionType} from '../../actionTypes';

const transDemandManagerAction = require('../../actions/main/TransDemandManagerAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class TransDemandManager extends React.Component {

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
        this.props.getTransDemandList();
    }

    /**
     * 更新 检索条件：客户ID
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
     * 查询运输需求列表
     */
    queryTransDemandList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getTransDemandList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.transDemandManagerReducer.start - (this.props.transDemandManagerReducer.size - 1));
        this.props.getTransDemandList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.transDemandManagerReducer.start + (this.props.transDemandManagerReducer.size - 1));
        this.props.getTransDemandList();
    };

    render() {
        const {
            transDemandManagerReducer,
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
                        <span className="margin-left10">运输需求</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：订单编号 */}
                            <Input s={3} label="订单编号" value={transDemandManagerReducer.conditionOrderId} onChange={this.changeConditionOrderId}/>

                            {/* 查询条件：起始城市 */}
                            <div className="input-field col s3">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeConditionStartCity}
                                    value={transDemandManagerReducer.conditionStartCity}
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
                                    value={transDemandManagerReducer.conditionEndCity}
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
                                    value={transDemandManagerReducer.conditionServiceType}
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
                                    value={transDemandManagerReducer.conditionOrderCreatedUser}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">订单创建人</label>
                            </div>

                            {/* 查询条件：需求创建时间(始) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="需求创建时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={transDemandManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：需求创建时间(终) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="需求创建时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={transDemandManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：状态 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.TRANS_DEMAND_STATUS}
                                    onChange={changeConditionStatus}
                                    value={transDemandManagerReducer.conditionStatus}
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
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryTransDemandList}>
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
                                <th>线路</th>
                                <th>车辆数</th>
                                <th className="center">服务方式</th>
                                <th>订单创建人</th>
                                <th className="center">需求创建时间</th>
                                <th className="center">状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {transDemandManagerReducer.transDemandArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.order_id}</td>
                                        <td>{item.route_start} - {item.route_end}</td>
                                        <td>{formatUtil.formatNumber(item.car_num)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.SERVICE_MODE,item.service_type)}</td>
                                        <td>{item.real_name}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.TRANS_DEMAND_STATUS,item.status)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/trans_demand/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            { transDemandManagerReducer.transDemandArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="8">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {transDemandManagerReducer.start > 0 && transDemandManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {transDemandManagerReducer.dataSize >= transDemandManagerReducer.size &&
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
        transDemandManagerReducer: state.TransDemandManagerReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getTransDemandList: () => {
        dispatch(commonAction.getCityList());
        dispatch(commonAction.getAdminUserList());
        dispatch(transDemandManagerAction.getTransDemandList())
    },
    setStartNumber: (start) => {
        dispatch(TransDemandManagerActionType.setStartNumber(start))
    },

    setConditionOrderId: (value) => {
        dispatch(TransDemandManagerActionType.setConditionOrderId(value))
    },
    changeConditionStartCity: (value) => {
        dispatch(TransDemandManagerActionType.setConditionStartCity(value))
    },
    changeConditionEndCity: (value) => {
        dispatch(TransDemandManagerActionType.setConditionEndCity(value))
    },
    changeConditionServiceType: (value) => {
        dispatch(TransDemandManagerActionType.setConditionServiceType(value))
    },
    changeConditionOrderCreatedUser: (value) => {
        dispatch(TransDemandManagerActionType.setConditionOrderCreatedUser(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(TransDemandManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(TransDemandManagerActionType.setConditionCreatedOnEnd(value))
    },
    changeConditionStatus: (value) => {
        dispatch(TransDemandManagerActionType.setConditionStatus(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TransDemandManager)