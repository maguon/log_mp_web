import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {
    NewLoadTaskModal,
    LoadTaskCarDetailModal,
    EditLogAddressModal,
    SyncInfoModal
} from '../modules/index';

const commonAction = require('../../actions/main/CommonAction');
const loadTaskManagerDetailAction = require('../../actions/main/LoadTaskManagerDetailAction');
const newLoadTaskModalAction = require('../../actions/modules/NewLoadTaskModalAction');
const loadTaskCarDetailModalAction = require('../../actions/modules/LoadTaskCarDetailModalAction');
const syncInfoModalAction = require('../../actions/modules/SyncInfoModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class LoadTaskManagerDetail extends React.Component {

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
        // 取得订单信息
        this.props.getLoadTaskInfo();
    }

    /**
     * 显示 线路安排 模态画面
     */
    showNewLoadTaskModal = (pageId) => {
        let orderId = this.props.loadTaskManagerDetailReducer.loadTaskInfo[0].order_id;
        let requireId = this.props.loadTaskManagerDetailReducer.loadTaskInfo[0].require_id;
        let loadTaskStatus = this.props.loadTaskManagerDetailReducer.loadTaskInfo[0].load_task_status;
        this.props.initNewLoadTaskModalData(pageId, orderId, requireId, loadTaskStatus);
        $('#newLoadTaskModal').modal('open');
    };

    /**
     * 显示 车辆安排 模态画面
     */
    showLoadTaskCarDetailModal = () => {
        let orderId = this.props.loadTaskManagerDetailReducer.loadTaskInfo[0].order_id;
        let requireId = this.props.loadTaskManagerDetailReducer.loadTaskInfo[0].require_id;
        this.props.initLoadTaskCarDetailModal(orderId, requireId);
        $('#loadTaskCarDetailModal').modal('open');
    };

    render() {
        const {loadTaskManagerDetailReducer, commonReducer, syncLoadTask, changeLoadTaskStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/load_task', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">运输线路 - 线路详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {loadTaskManagerDetailReducer.loadTaskInfo.length > 0 &&
                <div className="row">

                    {/* 主体 */}
                    <div className="col s12 margin-top20 padding-left50 padding-right50">
                        <SyncInfoModal/>
                        <EditLogAddressModal/>
                        <NewLoadTaskModal/>
                        <LoadTaskCarDetailModal/>
                        <div className="row margin-top20 detail-box z-depth-1 grey-text">
                            <div className="col s12 padding-bottom10 custom-grey border-bottom-line">
                                <div className="col s6 margin-top15 grey-text text-darken-2">
                                    线路编号：{loadTaskManagerDetailReducer.loadTaskInfo[0].id}
                                </div>
                                <div className="col s6 fz20 pink-font margin-top10 right-align">
                                    {/* 同步 */}
                                    {loadTaskManagerDetailReducer.loadTaskInfo[0].close_flag === 0 &&
                                    <i className="mdi mdi-sync pointer" onClick={() => {
                                        syncLoadTask(loadTaskManagerDetailReducer.loadTaskInfo[0].hook_id, loadTaskManagerDetailReducer.loadTaskInfo[0].require_status)
                                    }}/>}

                                    {/* 编辑 */}
                                    {loadTaskManagerDetailReducer.loadTaskInfo[0].require_status === sysConst.TRANS_DEMAND_STATUS[1].value && loadTaskManagerDetailReducer.loadTaskInfo[0].hook_id === 0 &&
                                    <i className="mdi mdi-pencil margin-left30 pointer" onClick={() => {this.showNewLoadTaskModal('load_task_detail')}}/>}
                                    {/* 车辆信息 */}
                                    {((loadTaskManagerDetailReducer.loadTaskInfo[0].require_status === sysConst.TRANS_DEMAND_STATUS[1].value && loadTaskManagerDetailReducer.loadTaskInfo[0].hook_id !== 0)
                                    || loadTaskManagerDetailReducer.loadTaskInfo[0].require_status === sysConst.TRANS_DEMAND_STATUS[2].value) &&
                                    <i className="mdi mdi-car margin-left30 pointer" onClick={() => {this.showLoadTaskCarDetailModal()}}/>}
                                </div>
                            </div>

                            <div className="col s12 padding-top15 padding-bottom10">
                                <div className="col s12">

                                    <span className="fz16 purple-font bold-font">
                                        {loadTaskManagerDetailReducer.loadTaskInfo[0].route_start} -- {loadTaskManagerDetailReducer.loadTaskInfo[0].route_end}
                                    </span>
                                    {loadTaskManagerDetailReducer.loadTaskInfo[0].trans_type === 1 && <i className="mdi mdi-truck-fast fz20 pink-font margin-left30"/>}
                                    {loadTaskManagerDetailReducer.loadTaskInfo[0].trans_type === 2 && <i className="mdi mdi-ferry fz20 pink-font margin-left30"/>}
                                    <span className="margin-left30 grey-text text-darken-2">{loadTaskManagerDetailReducer.loadTaskInfo[0].supplier_short}</span>
                                </div>
                            </div>

                            <div className="col s12 padding-bottom15 border-bottom-line grey-text text-darken-2">
                                <div className="col s6">计划发货日期：{loadTaskManagerDetailReducer.loadTaskInfo[0].plan_date}</div>
                                <div className="col s6 right-align">线路创建时间：{formatUtil.getDateTime(loadTaskManagerDetailReducer.loadTaskInfo[0].created_on)}</div>
                            </div>

                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-line">
                                <div className="col s11 no-padding">
                                    {/* 待发运 */}
                                    <div className="col s-percent-5"><i className="mdi mdi-checkbox-marked-circle fz36 pink-font"/></div>
                                    <div className="col s-percent-7 no-padding">
                                        <div className="margin-top5 pink-font">{sysConst.LOAD_TASK_STATUS[0].label}</div>
                                        <div>{formatUtil.getDate(loadTaskManagerDetailReducer.loadTaskInfo[0].created_on)}</div>
                                    </div>

                                    {/* 分割线 */}
                                    <div className="col s-percent-31"><div className="col s12 bold-divider margin-top25"/></div>

                                    {/* 已发运 */}
                                    <div className="col s-percent-5">
                                        <i className={`mdi mdi-checkbox-marked-circle fz36 ${loadTaskManagerDetailReducer.loadTaskInfo[0].load_task_status !== sysConst.LOAD_TASK_STATUS[0].value ? "pink-font" : ""}`}/>
                                    </div>
                                    <div className="col s-percent-7 no-padding">
                                        <div className={`${loadTaskManagerDetailReducer.loadTaskInfo[0].load_task_status !== sysConst.LOAD_TASK_STATUS[0].value ? "margin-top5 pink-font" : "margin-top15"}`}>
                                            {sysConst.LOAD_TASK_STATUS[1].label}
                                        </div>
                                        <div>{loadTaskManagerDetailReducer.loadTaskInfo[0].load_date}</div>
                                    </div>

                                    {/* 分割线 */}
                                    <div className="col s-percent-31"><div className="col s12 bold-divider margin-top25"/></div>

                                    {/* 已送达 */}
                                    <div className="col s-percent-5"><i className={`mdi mdi-checkbox-marked-circle fz36 ${loadTaskManagerDetailReducer.loadTaskInfo[0].load_task_status === sysConst.LOAD_TASK_STATUS[2].value ? "pink-font" : ""}`}/></div>
                                    <div className="col s-percent-7 no-padding">
                                        <div className={`${loadTaskManagerDetailReducer.loadTaskInfo[0].load_task_status === sysConst.LOAD_TASK_STATUS[2].value ? "margin-top5 pink-font" : "margin-top15"}`}>{sysConst.LOAD_TASK_STATUS[2].label}</div>
                                        <div>{loadTaskManagerDetailReducer.loadTaskInfo[0].arrive_date}</div>
                                    </div>
                                </div>

                                <div className="col s1 no-padding margin-top15 center">
                                    {loadTaskManagerDetailReducer.loadTaskInfo[0].load_task_status !== sysConst.LOAD_TASK_STATUS[2].value &&
                                    <button type="button" className="btn purple-btn btn-height24 fz14" onClick={() => {changeLoadTaskStatus(loadTaskManagerDetailReducer.loadTaskInfo[0].load_task_status)}}>变更状态</button>}
                                </div>
                            </div>


                            <div className="col s12 padding-bottom10 custom-grey border-bottom-line">
                                <div className="col s6 margin-top10 pink-font">
                                    安排车辆：{formatUtil.formatNumber(loadTaskManagerDetailReducer.loadTaskInfo[0].car_count)}
                                </div>
                                <div className="col s6 margin-top10 right-align">
                                    运输费用：<span className="fz16 pink-font">
                                    {formatUtil.formatNumber(loadTaskManagerDetailReducer.loadTaskInfo[0].supplier_trans_price + loadTaskManagerDetailReducer.loadTaskInfo[0].supplier_insure_price, 2)} 元</span>
                                </div>
                            </div>

                            {loadTaskManagerDetailReducer.scheduledCarList.length > 0 &&
                            <div className="col s12">
                                <table className="bordered">
                                    <thead className="">
                                    <tr className="grey-text text-darken-2">
                                        <th className="padding-left10">VIN</th>
                                        <th className="center">车型</th>
                                        <th className="center">品牌</th>
                                        <th className="center">型号</th>
                                        <th className="right-align">估值</th>
                                        <th className="center">新车</th>
                                        <th className="center">保险</th>
                                        <th className="right-align">供应商运费</th>
                                        <th className="right-align">供应商保费</th>
                                        <th className="right-align">总运费</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {loadTaskManagerDetailReducer.scheduledCarList.map(function (item, key) {
                                        return (
                                            <tr className="grey-text text-darken-1">
                                                <td className="padding-left10">{item.vin}</td>
                                                <td className="center">{commonUtil.getJsonValue(sysConst.CAR_MODEL, item.model_type)}</td>
                                                <td className="center">{item.brand}</td>
                                                <td className="center">{item.brand_type}</td>
                                                <td className="right-align">{formatUtil.formatNumber(item.valuation,2)}</td>
                                                {/* 是否新车 */}
                                                <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.old_car)}</td>
                                                {/* 是否保险 */}
                                                <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.safe_status)}</td>
                                                {/* 供应商运费 */}
                                                <td className="right-align pink-font">
                                                    {formatUtil.formatNumber(item.supplier_trans_price, 2)}
                                                </td>
                                                {/* 供应商保费 */}
                                                <td className="right-align pink-font">
                                                    {formatUtil.formatNumber(item.supplier_insure_price, 2)}
                                                </td>
                                                <td className="right-align pink-font">
                                                    {formatUtil.formatNumber(item.supplier_trans_price + item.supplier_insure_price, 2)}
                                                </td>
                                            </tr>
                                        )
                                    }, this)}
                                    </tbody>
                                </table>
                            </div>}
                        </div>

                        {commonReducer.orderInfo.length > 0 &&
                        <div className="col s12 no-padding margin-top20 detail-box z-depth-1">

                            <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                <div className="col s6 purple-font">
                                    {commonUtil.getJsonValue(sysConst.ORDER_TYPE, commonReducer.orderInfo[0].created_type)}
                                    <span className="margin-left10 grey-text">编号：{commonReducer.orderInfo[0].id}</span>
                                </div>
                                {/* 订单状态 */}
                                <div className="col s6 pink-font right-align">
                                    {commonUtil.getJsonValue(sysConst.ORDER_STATUS, commonReducer.orderInfo[0].status)}
                                </div>
                            </div>
                            <div className="col s12 padding-top15">
                                <div className="col s6">车辆总数：{formatUtil.formatNumber(commonReducer.orderInfo[0].car_num)}</div>
                                <div className="col s6 right-align">{commonUtil.getJsonValue(sysConst.SERVICE_MODE, commonReducer.orderInfo[0].service_type)}</div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-line">
                                <div className="col s4">运费：{formatUtil.formatNumber(commonReducer.orderInfo[0].total_trans_price, 2)} 元</div>
                                <div className="col s4">保费：{formatUtil.formatNumber(commonReducer.orderInfo[0].total_insure_price, 2)} 元</div>
                                <div className="col s4 right-align">订单总费用：{formatUtil.formatNumber(commonReducer.orderInfo[0].total_trans_price + commonReducer.orderInfo[0].total_insure_price, 2)} 元</div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15">
                                <div className="col s6">订单创建人：{commonReducer.orderInfo[0].admin_name}</div>
                                <div className="col s6 right-align">订单创建时间：{formatUtil.getDateTime(commonReducer.orderInfo[0].created_on)}</div>
                            </div>
                        </div>}
                    </div>

                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loadTaskManagerDetailReducer: state.LoadTaskManagerDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 取得需求基本信息
    getLoadTaskInfo: () => {
        dispatch(loadTaskManagerDetailAction.getLoadTaskInfo(ownProps.match.params.id));
    },
    // 进行同步/显示同步信息
    syncLoadTask: (hookId, status) => {
        // 没同步的进行同步
        if (hookId === 0) {
            if (status === sysConst.TRANS_DEMAND_STATUS[1].value) {
                dispatch(loadTaskManagerDetailAction.syncLoadTask(ownProps.match.params.id));
            } else {
                swal('需求已完成，暂无同步信息', '', 'warning');
            }
        } else {
            dispatch(syncInfoModalAction.initSyncInfoModal(ownProps.match.params.id));
            // 显示同步信息
            $('#syncInfoModal').modal('open');
        }
    },
    // 增加/修改 线路安排
    initNewLoadTaskModalData: (pageId, orderId, requireId, loadTaskStatus) => {
        // 初始化画面
        dispatch(newLoadTaskModalAction.initNewLoadTaskModal(pageId, orderId, requireId, ownProps.match.params.id, loadTaskStatus));
        // 城市列表
        dispatch(commonAction.getCityList());
        // 供应商列表
        dispatch(commonAction.getSupplierList());
    },
    // 车辆安排
    initLoadTaskCarDetailModal: (orderId, requireId) => {
        // 初始化画面
        dispatch(loadTaskCarDetailModalAction.initLoadTaskCarDetailModal(orderId, requireId, ownProps.match.params.id));
    },
    // 更新线路状态
    changeLoadTaskStatus: (status) => {
        dispatch(loadTaskManagerDetailAction.changeLoadTaskStatus(ownProps.match.params.id, status));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadTaskManagerDetail)