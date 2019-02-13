import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {CommonActionType} from '../../actionTypes';
import {NewLoadTaskModal, LoadTaskCarDetailModal, CancelInquiryModal, OrderInfoModal, EditLogAddressModal} from '../modules/index';

const commonAction = require('../../actions/main/CommonAction');
const transDemandManagerDetailAction = require('../../actions/main/TransDemandManagerDetailAction');
const newLoadTaskModalAction = require('../../actions/modules/NewLoadTaskModalAction');
const loadTaskCarDetailModalAction = require('../../actions/modules/LoadTaskCarDetailModalAction');
const editLogAddressModalAction = require('../../actions/modules/EditLogAddressModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class TransDemandManagerDetail extends React.Component {

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
        this.props.getTransDemandInfo();
    }

    /**
     * 订单详情 按钮
     */
    showOrderInfo = () => {
        // 初期化数据
        this.props.initOrderInfoModalData(this.props.transDemandManagerDetailReducer.transDemandInfo[0].order_id);
        $('#orderInfoModal').modal('open');
    };

    /**
     * 收发货地址 按钮
     */
    showEditLogAddressModal = () => {
        let orderId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].order_id;
        let startCity = this.props.transDemandManagerDetailReducer.transDemandInfo[0].route_start;
        let endCity = this.props.transDemandManagerDetailReducer.transDemandInfo[0].route_end;
        let startCityId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].route_start_id;
        let endCityId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].route_end_id;

        this.props.initEditLogAddressModalData(orderId, startCity, endCity, startCityId, endCityId);
        $('#editLogAddressModal').modal('open');
    };

    /**
     * 显示 线路安排 模态画面
     */
    showNewLoadTaskModal = (pageId, loadTaskId) => {
        let orderId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].order_id;
        let requireId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].id;
        this.props.initNewLoadTaskModalData(pageId, orderId, requireId, loadTaskId);
        $('#newLoadTaskModal').modal('open');
    };

    /**
     * 显示 车辆安排 模态画面
     */
    showLoadTaskCarDetailModal = (loadTaskId) => {
        let orderId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].order_id;
        let requireId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].id;
        this.props.initLoadTaskCarDetailModal(orderId, requireId, loadTaskId);
        $('#loadTaskCarDetailModal').modal('open');
    };

    render() {
        const {transDemandManagerDetailReducer, changeStatus, syncLoadTask, deleteLoadTask, changeLoadTaskStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/trans_demand', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">
                            运输需求 - 线路安排
                            {transDemandManagerDetailReducer.transDemandInfo.length > 0 && <span> - {transDemandManagerDetailReducer.transDemandInfo[0].id}</span>}
                        </span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {transDemandManagerDetailReducer.transDemandInfo.length > 0 &&
                <div className="row">
                    {/* 头部 */}
                    <div className="col s12">
                        {/* 询价详情：基本信息 */}
                        <div className="trans-demand-header">
                            <div className="col s9 margin-top5 grey-text text-darken-1">
                                <div className="pink-font">订单编号：{transDemandManagerDetailReducer.transDemandInfo[0].order_id}</div>

                                <div className="margin-top10 grey-text text-darken-1">
                                    <span className="fz20 purple-font">{transDemandManagerDetailReducer.transDemandInfo[0].route_start} - {transDemandManagerDetailReducer.transDemandInfo[0].route_end}</span>
                                    <span className="margin-left30">{commonUtil.getJsonValue(sysConst.SERVICE_MODE,transDemandManagerDetailReducer.transDemandInfo[0].service_type)}</span>
                                </div>

                                <div className="col s7 margin-top10 grey-text text-darken-1 no-padding">
                                    运费：<span className="fz16 pink-font">{formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].total_trans_price, 2)}</span> 元
                                </div>
                                <div className="col s5 margin-top10 grey-text text-darken-1">
                                    保费：<span className="fz16 pink-font">{formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].total_insure_price, 2)}</span> 元
                                </div>
                                <div className="col s12 no-padding margin-top5 grey-text text-darken-1">
                                    创建人：{transDemandManagerDetailReducer.transDemandInfo[0].real_name}
                                </div>
                            </div>

                            <div className="col s3 margin-top5 right-align grey-text text-darken-1">
                                <div>
                                    订单创建时间：{formatUtil.getDateTime(transDemandManagerDetailReducer.transDemandInfo[0].order_created_on)}
                                </div>
                                <div className="margin-top10">
                                    运送车辆：<span className="fz16 pink-font">{transDemandManagerDetailReducer.transDemandInfo[0].car_num}</span>
                                </div>

                                <div className="margin-top10">
                                    总费用：<span className="fz16 pink-font">
                                    {formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].total_trans_price + transDemandManagerDetailReducer.transDemandInfo[0].total_insure_price, 2)}
                                    </span> 元
                                </div>

                                <div className="margin-top5">
                                    <button type="button" className="btn purple-btn btn-height24 fz14" onClick={this.showOrderInfo}>订单详情</button>
                                </div>
                            </div>
                        </div>

                        <div className="padding-top10 grey-text text-darken-1">
                            <div className="col s6 padding-left30">需求创建时间：{formatUtil.getDateTime(transDemandManagerDetailReducer.transDemandInfo[0].created_on)}</div>
                            <div className="col s6 padding-right30 right-align pink-font">
                                {commonUtil.getJsonValue(sysConst.TRANS_DEMAND_STATUS,transDemandManagerDetailReducer.transDemandInfo[0].status)}
                            </div>
                            <div className="col s12 divider custom-divider margin-top10"/>
                        </div>
                        <OrderInfoModal/>
                    </div>

                    {/* 主体 */}

                    {/* 待安排 */}
                    {transDemandManagerDetailReducer.transDemandInfo[0].status === sysConst.TRANS_DEMAND_STATUS[0].value &&
                    <div className="col s12 margin-top20 padding-left50 padding-right50">
                        {/** 开始安排 按钮 */}
                        <div className="row margin-bottom10 right-align">
                            <button type="button" className="btn confirm-btn margin-left20" onClick={changeStatus}>开始安排</button>
                        </div>
                    </div>}

                    {/* 已安排 */}
                    {transDemandManagerDetailReducer.transDemandInfo[0].status === sysConst.TRANS_DEMAND_STATUS[1].value &&
                    <div className="col s12 margin-top20 padding-left50 padding-right50">
                        {/** 收发货地址/增加线路 按钮 */}
                        <div className="row margin-bottom10 right-align">
                            {transDemandManagerDetailReducer.transDemandInfo[0].service_type === sysConst.SERVICE_MODE[1].value &&
                            <button type="button" className="btn custom-btn" onClick={this.showEditLogAddressModal}>收发货地址</button>}
                            {(transDemandManagerDetailReducer.transDemandInfo[0].status === sysConst.TRANS_DEMAND_STATUS[0].value ||
                              transDemandManagerDetailReducer.transDemandInfo[0].status === sysConst.TRANS_DEMAND_STATUS[1].value) &&
                            <button type="button" className="btn confirm-btn margin-left20" onClick={() => {this.showNewLoadTaskModal('new','')}}>增加线路</button>}
                        </div>
                        <EditLogAddressModal/>
                        <NewLoadTaskModal/>
                        <LoadTaskCarDetailModal/>
                        <CancelInquiryModal/>

                        <div className="row margin-top20 margin-bottom5 pink-font">
                            <div className="col s6">
                                <i className="mdi mdi-truck fz20"/>
                                <span className="margin-left10 fz16">运输线路</span>
                            </div>
                            <div className="col s6 margin-top5 right-align">线路数：{formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].status)}</div>
                        </div>
                        <div className="row divider bold-divider"/>

                        {/* 运输线路列表 */}
                        {transDemandManagerDetailReducer.loadTaskArray.map(function (item) {
                            return (
                                <div className="row margin-top20 detail-box z-depth-1 grey-text">
                                    <div className="col s12 padding-bottom10 custom-grey border-bottom-line">
                                        <div className="col s6 margin-top10">
                                            <span className="fz16 purple-font bold-font">{item.route_start} -- {item.route_end}</span>
                                            {item.trans_type === 1 && <i className="mdi mdi-truck-fast fz20 pink-font margin-left30"/>}
                                            {item.trans_type === 2 && <i className="mdi mdi-ferry fz20 pink-font margin-left30"/>}
                                            <span className="margin-left30 grey-text text-darken-2">{item.supplier_short}</span>
                                        </div>
                                        <div className="col s6 fz20 pink-font margin-top10 right-align">
                                            {item.close_flag === 0 && <i className="mdi mdi-sync pointer" onClick={() => {syncLoadTask(item.id)}}/>}

                                            {item.hook_id == null && <i className="mdi mdi-pencil margin-left30 pointer" onClick={() => {this.showNewLoadTaskModal('edit',item.id)}}/>}
                                            {item.hook_id != null && <i className="mdi mdi-car margin-left30 pointer" onClick={() => {this.showLoadTaskCarDetailModal(item.id)}}/>}
                                            <i className="mdi mdi-close margin-left30 pointer" onClick={() => {deleteLoadTask(item.order_id, item.id)}}/>
                                        </div>
                                    </div>

                                    <div className="col s12 padding-top15 padding-bottom10">
                                        <div className="col s6">线路编号：{item.id}</div>
                                        <div className="col s6 right-align">线路创建时间：{formatUtil.getDateTime(item.created_on)}</div>
                                    </div>

                                    <div className="col s12 padding-bottom15 border-bottom-line grey-text text-darken-2">
                                        <div className="col s6">安排车辆数：<span className="fz16 pink-font">{formatUtil.formatNumber(item.car_count)}</span></div>
                                        <div className="col s6 right-align">预计发货时间：{item.plan_date}</div>
                                    </div>

                                    <div className="col s12 padding-top15 padding-bottom15">
                                        <div className="col s11 no-padding">
                                            {/* 待发运 */}
                                            <div className="col s-percent-5"><i className="mdi mdi-checkbox-marked-circle fz36 pink-font"/></div>
                                            <div className="col s-percent-7 no-padding">
                                                <div className="margin-top5 pink-font">{sysConst.LOAD_TASK_STATUS[0].label}</div>
                                                <div>{formatUtil.getDate(item.created_on)}</div>
                                            </div>

                                            {/* 分割线 */}
                                            <div className="col s-percent-31"><div className="col s12 bold-divider margin-top25"/></div>

                                            {/* 已发运 */}
                                            <div className="col s-percent-5"><i className={`mdi mdi-checkbox-marked-circle fz36 ${item.load_task_status !== sysConst.LOAD_TASK_STATUS[0].value ? "pink-font" : ""}`}/></div>
                                            <div className="col s-percent-7 no-padding">
                                                <div className={`${item.load_task_status !== sysConst.LOAD_TASK_STATUS[0].value ? "margin-top5 pink-font" : "margin-top15"}`}>{sysConst.LOAD_TASK_STATUS[1].label}</div>
                                                <div>{item.load_date}</div>
                                            </div>

                                            {/* 分割线 */}
                                            <div className="col s-percent-31"><div className="col s12 bold-divider margin-top25"/></div>

                                            {/* 已送达 */}
                                            <div className="col s-percent-5"><i className={`mdi mdi-checkbox-marked-circle fz36 ${item.load_task_status === sysConst.LOAD_TASK_STATUS[2].value ? "pink-font" : ""}`}/></div>
                                            <div className="col s-percent-7 no-padding">
                                                <div className={`${item.load_task_status === sysConst.LOAD_TASK_STATUS[2].value ? "margin-top5 pink-font" : "margin-top15"}`}>{sysConst.LOAD_TASK_STATUS[2].label}</div>
                                                <div>{item.arrive_date}</div>
                                            </div>
                                        </div>

                                        <div className="col s1 no-padding margin-top15 center">
                                            <button type="button" className="btn purple-btn btn-height24 fz14" onClick={() => {changeLoadTaskStatus(item.id, item.load_task_status)}}>变更状态</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }, this)}
                    </div>}






                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        transDemandManagerDetailReducer: state.TransDemandManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getTransDemandInfo: () => {
        dispatch(transDemandManagerDetailAction.getTransDemandInfo(ownProps.match.params.id));
    },
    // 更新线路状态
    changeStatus: () => {
        dispatch(transDemandManagerDetailAction.changeStatus(ownProps.match.params.id));
    },
    // 显示订单详情
    initOrderInfoModalData: (orderId) => {
        dispatch(CommonActionType.setShowOrderCarListFlag(false));
        dispatch(commonAction.getOrderInfo(orderId));
        dispatch(commonAction.getOrderCarList(orderId));
    },
    // 收发货地址
    initEditLogAddressModalData: (orderId, startCity, endCity, startCityId, endCityId) => {
        dispatch(editLogAddressModalAction.initEditLogAddressModal(orderId, startCity, endCity, startCityId, endCityId));
    },







    // 线路安排
    initNewLoadTaskModalData: (pageId, orderId, requireId, loadTaskId) => {
        // 初始化画面
        dispatch(newLoadTaskModalAction.initNewLoadTaskModal(pageId, orderId, requireId, loadTaskId));
        // 城市列表
        dispatch(commonAction.getCityList());
        // 供应商列表
        dispatch(commonAction.getSupplierList());
    },
    // 车辆安排
    initLoadTaskCarDetailModal: (orderId, requireId, loadTaskId) => {
        // 初始化画面
        dispatch(loadTaskCarDetailModalAction.initLoadTaskCarDetailModal(orderId, requireId, loadTaskId));
    },
    // 删除指定线路
    syncLoadTask: (loadTaskId) => {
        dispatch(transDemandManagerDetailAction.syncLoadTask(ownProps.match.params.id, loadTaskId));
    },
    // 删除指定线路
    deleteLoadTask: (orderId, loadTaskId) => {
        dispatch(transDemandManagerDetailAction.deleteLoadTask(orderId, ownProps.match.params.id, loadTaskId));
    },
    // 更新线路状态
    changeLoadTaskStatus: (loadTaskId, status) => {
        dispatch(transDemandManagerDetailAction.changeLoadTaskStatus(ownProps.match.params.id, loadTaskId, status));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TransDemandManagerDetail)