import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {SupplierBusinessManagerDetailActionType} from '../../actionTypes';
import {LoadTaskInfoModal} from '../modules/index';

const supplierBusinessManagerDetailAction = require('../../actions/main/SupplierBusinessManagerDetailAction');
const loadTaskInfoModalAction = require('../../actions/modules/LoadTaskInfoModalAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class SupplierBusinessManagerDetail extends React.Component {

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
        // 取得供应商业务基本信息
        this.props.getSupplierBusinessDetail();
        // 默认第一页
        this.props.setDetailStartNumber(0);
        // 清空检索条件
        this.props.setConditionLoadTaskId('');
        this.props.setConditionOrderId('');
        this.props.changeConditionStartCity(null);
        this.props.changeConditionEndCity(null);
        this.props.changeConditionTransMode(null);
        this.props.setConditionCreatedOnStart('');
        this.props.setConditionCreatedOnEnd('');
        this.props.setConditionArriveStart('');
        this.props.setConditionArriveEnd('');
        this.props.changeConditionPaymentStatus(null);
        // 检索供应商线路列表
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
     * 更新 检索条件：送达日期(始)
     */
    changeConditionArriveStart = (event, value) => {
        this.props.setConditionArriveStart(value);
    };

    /**
     * 更新 检索条件：送达日期(始)
     */
    changeConditionArriveEnd = (event, value) => {
        this.props.setConditionArriveEnd(value);
    };

    /**
     * 查询线路列表
     */
    queryLoadTaskList = () => {
        // 默认第一页
        this.props.setDetailStartNumber(0);
        this.props.getLoadTaskList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setDetailStartNumber(this.props.supplierBusinessManagerDetailReducer.detailStart - (this.props.supplierBusinessManagerDetailReducer.detailSize - 1));
        this.props.getLoadTaskList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setDetailStartNumber(this.props.supplierBusinessManagerDetailReducer.detailStart + (this.props.supplierBusinessManagerDetailReducer.detailSize - 1));
        this.props.getLoadTaskList();
    };

    /**
     * 显示线路详细
     */
    showLoadTaskInfoModal = (loadTaskId) => {
        this.props.initLoadTaskInfoModalData(loadTaskId);
        $('#loadTaskInfoModal').modal('open');
    };

    render() {
        const {
            supplierBusinessManagerDetailReducer,
            commonReducer,
            changeConditionStartCity,
            changeConditionEndCity,
            changeConditionTransMode,
            changeConditionPaymentStatus
        } = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/supplier_business', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">供应商业务 - 业务详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row">
                    {/* TAB 头部 */}
                    <div className="col s12">
                        {/* 用户详情：基本信息 */}
                        {supplierBusinessManagerDetailReducer.supplierBusinessInfo.length > 0 &&
                        <div className="supplier-business-detail-header grey-text text-darken-1">
                            <div className="col s12">
                                <div className="col s8">
                                    <span className="fz16 purple-font">{supplierBusinessManagerDetailReducer.supplierBusinessInfo[0].supplier_short}</span>
                                    <span className="margin-left30">{supplierBusinessManagerDetailReducer.supplierBusinessInfo[0].supplier_full}</span>
                                </div>
                                <div className="col s4 right-align">{commonUtil.getJsonValue(sysConst.TRANSPORT_MODE, supplierBusinessManagerDetailReducer.supplierBusinessInfo[0].trans_type)}</div>
                            </div>

                            <div className="col s12 margin-top10">
                                <div className="col s6">业务笔数：{formatUtil.formatNumber(supplierBusinessManagerDetailReducer.supplierBusinessInfo[0].load_task_count)}</div>
                                <div className="col s6 right-align">运输车辆：{formatUtil.formatNumber(supplierBusinessManagerDetailReducer.supplierBusinessInfo[0].total_car_num)}</div>
                            </div>

                            <div className="col s12 margin-top10">
                                <div className="col s3">
                                    供应商运费：<span className="fz16 pink-font">{formatUtil.formatNumber(supplierBusinessManagerDetailReducer.supplierBusinessInfo[0].total_supplier_trans_price,2)}</span> 元
                                </div>
                                <div className="col s3">
                                    供应商保费：<span className="fz16 pink-font">{formatUtil.formatNumber(supplierBusinessManagerDetailReducer.supplierBusinessInfo[0].total_supplier_insure_price,2)}</span> 元
                                </div>
                                <div className="col s3">
                                    总费用：<span className="fz16 pink-font">{formatUtil.formatNumber(supplierBusinessManagerDetailReducer.supplierBusinessInfo[0].total_supplier_trans_price + supplierBusinessManagerDetailReducer.supplierBusinessInfo[0].total_supplier_insure_price,2)}</span> 元
                                </div>
                                <div className="col s3 right-align">
                                    未结金额：<span className="fz16 pink-font">{formatUtil.formatNumber(supplierBusinessManagerDetailReducer.supplierBusinessInfo[0].total_supplier_trans_price + supplierBusinessManagerDetailReducer.supplierBusinessInfo[0].total_supplier_insure_price - supplierBusinessManagerDetailReducer.supplierBusinessInfo[0].payment_price,2)}</span> 元
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：线路编号 */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="线路编号" value={supplierBusinessManagerDetailReducer.conditionLoadTaskId} onChange={this.changeConditionLoadTaskId}/>
                            </div>

                            {/* 查询条件：订单编号 */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="订单编号" value={supplierBusinessManagerDetailReducer.conditionOrderId} onChange={this.changeConditionOrderId}/>
                            </div>

                            {/* 查询条件：起始城市 */}
                            <div className="input-field col s-percent-20">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeConditionStartCity}
                                    value={supplierBusinessManagerDetailReducer.conditionStartCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">起始城市</label>
                            </div>

                            {/* 查询条件：目的城市 */}
                            <div className="input-field col s-percent-20">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeConditionEndCity}
                                    value={supplierBusinessManagerDetailReducer.conditionEndCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">目的城市</label>
                            </div>

                            {/* 查询条件：运输方式 */}
                            <div className="input-field col s-percent-20">
                                <Select
                                    options={sysConst.TRANSPORT_TYPE}
                                    onChange={changeConditionTransMode}
                                    value={supplierBusinessManagerDetailReducer.conditionTransMode}
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
                            {/* 查询条件：创建时间(始) */}
                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="创建时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={supplierBusinessManagerDetailReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：创建时间(终) */}
                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="创建时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={supplierBusinessManagerDetailReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：送达日期(始) */}
                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="送达日期(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={supplierBusinessManagerDetailReducer.conditionArriveStart} onChange={this.changeConditionArriveStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：送达日期(终) */}
                            <div className="input-field col s-percent-20 custom-input-field">
                                <Input s={12} label="送达日期(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={supplierBusinessManagerDetailReducer.conditionArriveEnd} onChange={this.changeConditionArriveEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：结算状态 */}
                            <div className="input-field col s-percent-20">
                                <Select
                                    options={sysConst.PAYMENT_FLAG}
                                    onChange={changeConditionPaymentStatus}
                                    value={supplierBusinessManagerDetailReducer.conditionPaymentStatus}
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
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryLoadTaskList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <LoadTaskInfoModal/>
                    <div className="col s12">
                        <table className="bordered striped">
                            <thead className="custom-dark-grey table-top-line">
                            <tr className="grey-text text-darken-2">
                                <th>线路编号</th>
                                <th>订单编号</th>
                                <th>线路</th>
                                <th className="right-align">车辆数</th>
                                <th className="right-align">供应商运费</th>
                                <th className="right-align">供应商保费</th>
                                <th className="right-align">总费用</th>
                                <th className="center">计划发运日期</th>
                                <th className="center">送达日期</th>
                                <th className="center">运输状态</th>
                                <th className="center">结算状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {supplierBusinessManagerDetailReducer.loadTaskArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.order_id}</td>
                                        <td>{item.route_start} - {item.route_end}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.car_count)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.total_trans_price, 2)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.total_insure_price, 2)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.total_trans_price + item.total_insure_price, 2)}</td>
                                        <td className="center">{item.plan_date}</td>
                                        <td className="center">{item.arrive_date}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.LOAD_TASK_STATUS,item.load_task_status)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.PAYMENT_FLAG,item.payment_flag)}</td>
                                        <td className="operation center">
                                            <i className="mdi mdi-table-search purple-font pointer" onClick={() => {this.showLoadTaskInfoModal(item.id)}}/>
                                        </td>
                                    </tr>
                                )
                            },this)}
                            { supplierBusinessManagerDetailReducer.loadTaskArray.length === 0 &&
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
                            {supplierBusinessManagerDetailReducer.detailStart > 0 && supplierBusinessManagerDetailReducer.detailDataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {supplierBusinessManagerDetailReducer.detailDataSize >= supplierBusinessManagerDetailReducer.detailSize &&
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

const mapStateToProps = (state) => {
    return {
        supplierBusinessManagerDetailReducer: state.SupplierBusinessManagerDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 基本信息
    getSupplierBusinessDetail: () => {
        dispatch(commonAction.getCityList());
        dispatch(supplierBusinessManagerDetailAction.getSupplierBusinessDetail(ownProps.match.params.id))
    },
    getLoadTaskList: () => {
        dispatch(supplierBusinessManagerDetailAction.getLoadTaskList(ownProps.match.params.id))
    },
    setDetailStartNumber: (start) => {
        dispatch(SupplierBusinessManagerDetailActionType.setDetailStartNumber(start))
    },
    setConditionLoadTaskId: (value) => {
        dispatch(SupplierBusinessManagerDetailActionType.setConditionLoadTaskId(value))
    },
    setConditionOrderId: (value) => {
        dispatch(SupplierBusinessManagerDetailActionType.setConditionOrderId(value))
    },
    changeConditionStartCity: (value) => {
        dispatch(SupplierBusinessManagerDetailActionType.setConditionStartCity(value))
    },
    changeConditionEndCity: (value) => {
        dispatch(SupplierBusinessManagerDetailActionType.setConditionEndCity(value))
    },
    changeConditionTransMode: (value) => {
        dispatch(SupplierBusinessManagerDetailActionType.setConditionTransMode(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(SupplierBusinessManagerDetailActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(SupplierBusinessManagerDetailActionType.setConditionCreatedOnEnd(value))
    },
    setConditionArriveStart: (value) => {
        dispatch(SupplierBusinessManagerDetailActionType.setConditionArriveStart(value))
    },
    setConditionArriveEnd: (value) => {
        dispatch(SupplierBusinessManagerDetailActionType.setConditionArriveEnd(value))
    },
    changeConditionPaymentStatus: (value) => {
        dispatch(SupplierBusinessManagerDetailActionType.setConditionPaymentStatus(value))
    },
    initLoadTaskInfoModalData: (loadTaskId) => {
        dispatch(loadTaskInfoModalAction.getLoadTaskInfo(loadTaskId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SupplierBusinessManagerDetail)