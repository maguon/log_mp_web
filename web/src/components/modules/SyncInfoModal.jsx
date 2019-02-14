import React from 'react';
import {connect} from 'react-redux';

const syncInfoModalAction = require('../../actions/modules/SyncInfoModalAction');
const formatUtil = require('../../util/FormatUtil');
const sysConst = require('../../util/SysConst');
const commonUtil = require('../../util/CommonUtil');

class SyncInfoModal extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor() {
        super();
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        $('.modal').modal();
    }

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {syncInfoModalReducer, getLoadTaskCarList, syncComplete, closeModal} = this.props;
        return (
            <div id="syncInfoModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">同步信息</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">

                    {syncInfoModalReducer.syncRequireInfo.length > 0 &&
                    <div className="row detail-box z-depth-1 margin-top20 grey-text">
                        <div className="col s12 padding-top10 padding-bottom10 custom-grey border-bottom-line">
                            <div className="col s6 purple-font">
                                需求编号：{syncInfoModalReducer.syncRequireInfo[0].id}
                            </div>
                            <div className="col s6 pink-font right-align">
                                {commonUtil.getJsonValue(sysConst.SUPPLIER_DEMAND_STATUS, syncInfoModalReducer.syncRequireInfo[0].demand_status)}
                            </div>
                        </div>

                        <div className="col s12 padding-top15 padding-bottom10">
                            <div className="col s6 fz18 purple-font">
                                {syncInfoModalReducer.syncRequireInfo[0].route_start} -- {syncInfoModalReducer.syncRequireInfo[0].route_end}
                            </div>
                            <div className="col s6 right-align">需求生成时间：{formatUtil.getDateTime(syncInfoModalReducer.syncRequireInfo[0].created_on)}</div>
                        </div>

                        <div className="col s12 padding-bottom15 border-bottom-line">
                            <div className="col s4">派送车辆：{formatUtil.formatNumber(syncInfoModalReducer.syncRequireInfo[0].pre_count)}</div>
                            <div className="col s4">已派车辆：{formatUtil.formatNumber(syncInfoModalReducer.syncRequireInfo[0].plan_count)}</div>
                            <div className="col s4 right-align">指令日期：{formatUtil.number2date(syncInfoModalReducer.syncRequireInfo[0].date_id)}</div>
                        </div>
                    </div>}

                    {syncInfoModalReducer.routeLoadTaskList.length === 0 &&
                    <div className="row margin-top50 center fz18 grey-text">车辆暂未安排</div>}

                    {syncInfoModalReducer.routeLoadTaskList.length > 0 &&
                    <div className="row detail-box z-depth-1">
                        {syncInfoModalReducer.routeLoadTaskList.map(function (item, key) {
                            return (
                                <div>
                                    <div className="col s12 border-bottom-line padding-top10 padding-bottom10">
                                        <div className="col s3">
                                            <i className="mdi mdi-routes purple-font"/>
                                            <span className="margin-left10">{item.id}</span>
                                            <span className="margin-left40">{item.demand_route_start} - {item.demand_route_end}</span>
                                        </div>

                                        <div className="col s2 context-ellipsis">司机：{item.drive_name}</div>
                                        <div className="col s3 no-padding">
                                            货车：{item.truck_num}
                                            <span className="margin-left40">装车数：{item.car_count}</span>
                                        </div>

                                        <div className="col s4 right-align">
                                            计划执行日期：{formatUtil.getDate(item.task_plan_date)}
                                            <span className="margin-left40 pink-font">{commonUtil.getJsonValue(sysConst.SUPPLIER_LOAD_TASK_STATUS, item.load_task_status)}</span>
                                            <i className="margin-left40 mdi mdi-chevron-down purple-font pointer" onClick={() => {getLoadTaskCarList(item.id)}}/>
                                        </div>
                                    </div>
                                    <div className={`col s12 border-bottom-line padding-top10 custom-grey point city-${item.id}`}>
                                        {syncInfoModalReducer.loadTaskCarList.length === 0 &&
                                        <div className="col s12 center padding-bottom10">暂无车辆</div>}
                                        {syncInfoModalReducer.loadTaskCarList.map(function (child) {
                                            return (
                                                <div className="col s4 padding-bottom10">
                                                    <i className="mdi mdi-car pink-font"/>
                                                    <span className="margin-left20">{child.vin}</span>
                                                </div>
                                            )
                                        }, this)}
                                    </div>
                                </div>
                            )
                        }, this)}
                    </div>}

                    {syncInfoModalReducer.routeLoadTaskList.length > 0 && syncInfoModalReducer.syncRequireInfo.length > 0 && syncInfoModalReducer.syncRequireInfo[0].demand_status === sysConst.SUPPLIER_DEMAND_STATUS[1].value &&
                    <div className="row margin-bottom10 right-align">
                        <button type="button" className="btn orange-btn" onClick={syncComplete}>完成</button>
                    </div>}
                </div>

                {/** Modal固定底部：确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn confirm-btn" onClick={closeModal}>确定</button>
                </div>
            </div>
        );
    }
}

/**
 * 输入逻辑：外部的数据（即state对象）转换为 UI 组件的参数。
 */
const mapStateToProps = (state) => {
    return {
        syncInfoModalReducer: state.SyncInfoModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    getLoadTaskCarList: (syncLoadTaskId) => {
        dispatch(syncInfoModalAction.getLoadTaskCarList(syncLoadTaskId))
    },
    syncComplete: () => {
        dispatch(syncInfoModalAction.syncComplete())
    },
    closeModal: () => {
        $('#syncInfoModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SyncInfoModal);