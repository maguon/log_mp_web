import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {NewLoadTaskModalActionType} from "../../actionTypes";

const newLoadTaskModalAction = require('../../actions/modules/NewLoadTaskModalAction');
const formatUtil = require('../../util/FormatUtil');
const sysConst = require('../../util/SysConst');
const commonUtil = require('../../util/CommonUtil');

class NewLoadTaskModal extends React.Component {

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
        $('ul.tabs').tabs();
    }

    /**
     * 更新 计划发运日期
     */
    changePlanDate = (event) => {
        this.props.setPlanDate(event.target.value);
    };

    /**
     * 更新 备注
     */
    changeRemark = (event) => {
        this.props.setRemark(event.target.value);
    };

    /**
     * 运输车辆TAB：增加安排车辆 实际运费，实际保费
     */
    addLoadTaskDetail = (loadTaskDetail, transFee, insureFee) => {
        this.props.addLoadTaskDetail(loadTaskDetail.order_item_id, loadTaskDetail.vin, $('#' + transFee).val(), $('#' + insureFee).val());
    };

    /**
     * 运输车辆TAB：修改安排车辆 实际运费，实际保费
     */
    editLoadTaskDetail = (loadTaskDetail, transFee, insureFee) => {
        this.props.editLoadTaskDetail(loadTaskDetail.load_task_detail_id, $('#' + transFee).val(), $('#' + insureFee).val());
    };

    /**
     * 运输车辆TAB：删除安排车辆
     */
    deleteLoadTaskDetail = (loadTaskDetailId) => {
        this.props.deleteLoadTaskDetail(loadTaskDetailId);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {
            newLoadTaskModalReducer, commonReducer, changeStartCity, changeEndCity, changeSupplier, changeTransportMode,
            closeModal, goNext, confirmLoadTask, showLoadTaskTab, showTransCarTab, changeSyncFlag
        } = this.props;
        return (
            <div id="newLoadTaskModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">线路安排</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <ul className="tabs">
                        {newLoadTaskModalReducer.pageId === 'new' &&
                        <div>
                            <li className={`tab col s4 ${newLoadTaskModalReducer.tabId !== 'base' ? "disabled" : ""}`}>
                                <a href="#tab-load" className={`${newLoadTaskModalReducer.tabId === 'base' ? "active" : ""}`}>线路信息</a>
                            </li>
                            <li className={`tab col s4 ${newLoadTaskModalReducer.tabId !== 'trans' ? "disabled" : ""}`}>
                                <a href="#tab-trans" className={`${newLoadTaskModalReducer.tabId === 'trans' ? "active" : ""}`}>运输车辆</a>
                            </li>
                            <li className={`tab col s4 ${newLoadTaskModalReducer.tabId !== 'sync' ? "disabled" : ""}`}>
                                <a href="#tab-sync" className={`${newLoadTaskModalReducer.tabId === 'sync' ? "active" : ""}`}>信息同步</a>
                            </li>
                        </div>}

                        {(newLoadTaskModalReducer.pageId === 'edit' || newLoadTaskModalReducer.pageId === 'load_task_detail') &&
                        <div>
                            <li className={`tab col s6`}>
                                <a href="#tab-load" onClick={showLoadTaskTab} className={`${newLoadTaskModalReducer.tabId === 'base' ? "active" : ""}`}>线路信息</a>
                            </li>
                            <li className={`tab col s6`}>
                                <a href="#tab-trans" onClick={showTransCarTab} className={`${newLoadTaskModalReducer.tabId === 'trans' ? "active" : ""}`}>运输车辆</a>
                            </li>
                        </div>}
                    </ul>

                    {/* TAB 1 : 线路信息TAB */}
                    <div id="tab-load" className={`col s12 margin-top50 ${newLoadTaskModalReducer.tabId === 'base' ? "display-block" : "display-none"}`}>
                        <div className="input-field col s6">
                            <Select
                                options={commonReducer.cityList}
                                onChange={changeStartCity}
                                value={newLoadTaskModalReducer.startCity}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active"><span className="must-input">*</span>起始城市</label>
                        </div>

                        <div className="input-field col s6">
                            <Select
                                options={commonReducer.cityList}
                                onChange={changeEndCity}
                                value={newLoadTaskModalReducer.endCity}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active"><span className="must-input">*</span>目的城市</label>
                        </div>

                        <div className="input-field col s4">
                            <Select
                                options={commonReducer.supplierList}
                                onChange={changeSupplier}
                                value={newLoadTaskModalReducer.supplier}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active"><span className="must-input">*</span>供应商</label>
                        </div>
                        <div className="input-field col s2">
                            <Select
                                options={newLoadTaskModalReducer.transportModeList}
                                onChange={changeTransportMode}
                                value={newLoadTaskModalReducer.transportMode}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active"><span className="must-input">*</span>运输方式</label>
                        </div>

                        <div className="input-field col s6 custom-input-field">
                            <Input s={12} label={<span><span className="must-input">*</span>计划发运日期</span>} type='date' options={sysConst.DATE_PICKER_OPTION}
                                   value={newLoadTaskModalReducer.planDate} onChange={this.changePlanDate} />
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        <div className="row">
                            <Input s={12} label="备注" maxLength="200" value={newLoadTaskModalReducer.remark} onChange={this.changeRemark}/>
                        </div>
                    </div>

                    {/* TAB 2 : 运输信息TAB */}
                    <div id="tab-trans" className={`col s12 margin-top20 ${newLoadTaskModalReducer.tabId === 'trans' ? "display-block" : "display-none"}`}>
                        {newLoadTaskModalReducer.loadTaskInfo.length > 0 &&
                        <div>
                            <div className="modal-content-header">
                                <div className="col s8">
                                    <span className="fz16 pink-font">{newLoadTaskModalReducer.loadTaskInfo[0].route_start} -- {newLoadTaskModalReducer.loadTaskInfo[0].route_end}</span>
                                    <span className="margin-left30">{newLoadTaskModalReducer.loadTaskInfo[0].supplier_short}</span>
                                    <span className="margin-left30">{commonUtil.getJsonValue(sysConst.TRANSPORT_MODE, newLoadTaskModalReducer.loadTaskInfo[0].trans_type)}</span>
                                </div>
                                <div className="col s4 right-align">计划发运日期：{newLoadTaskModalReducer.loadTaskInfo[0].plan_date}</div>
                            </div>

                            <div className="modal-content-body margin-top30">
                                {/* 已安排车辆 列表 */}
                                {(newLoadTaskModalReducer.pageId === 'edit' || newLoadTaskModalReducer.pageId === 'load_task_detail') &&
                                <div className="col s12 detail-box z-depth-1 no-padding margin-bottom20">
                                    <div className="col s6 custom-grey padding-top10 padding-bottom10 border-top-line border-bottom-line purple-font">已安排车辆</div>
                                    <div className="col s6 custom-grey padding-top10 padding-bottom10 border-top-line border-bottom-line pink-font right-align">
                                        {formatUtil.formatNumber(newLoadTaskModalReducer.scheduledCarList.length)}
                                    </div>
                                    {newLoadTaskModalReducer.scheduledCarList.length > 0 &&
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
                                            <th className="right-align width-150">供应商运费</th>
                                            <th className="right-align width-200">供应商保费</th>
                                            <th className="center"/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {newLoadTaskModalReducer.scheduledCarList.map(function (item, key) {
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
                                                    <td className="right-align width-150">
                                                        <input id={`trans_scheduled_index${key}`} defaultValue={item.supplier_trans_price} type="number" className="scheduled-input margin-bottom0 width-100 right-align"/>
                                                    </td>
                                                    {/* 供应商保费 */}
                                                    <td className="right-align width-200">
                                                        <input id={`insure_scheduled_index${key}`} defaultValue={item.supplier_insure_price} type="number" className="scheduled-input margin-bottom0 width-100 right-align"/>
                                                    </td>
                                                    <td className="center">
                                                        <i className="mdi mdi-checkbox-marked-circle margin-left20 fz24 purple-font pointer"
                                                           onClick={()=> {this.editLoadTaskDetail(item,`trans_scheduled_index${key}`,`insure_scheduled_index${key}`)}}/>
                                                        <i className="mdi mdi-minus-circle margin-left20 fz24 orange-text text-darken-3 pointer"
                                                           onClick={()=> {this.deleteLoadTaskDetail(item.load_task_detail_id)}}/>
                                                    </td>
                                                </tr>
                                            )
                                        }, this)}
                                        </tbody>
                                    </table>}
                                </div>}

                                {/* 未安排车辆 列表 */}
                                <div className="col s12 detail-box z-depth-1 no-padding margin-bottom20">
                                    <div className="col s6 custom-grey padding-top10 padding-bottom10 border-top-line border-bottom-line purple-font">未安排车辆</div>
                                    <div className="col s6 custom-grey padding-top10 padding-bottom10 border-top-line border-bottom-line pink-font right-align">
                                        {formatUtil.formatNumber(newLoadTaskModalReducer.unscheduledCarList.length)}
                                    </div>
                                    {newLoadTaskModalReducer.unscheduledCarList.length > 0 &&
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
                                            <th className="right-align width-150">供应商运费</th>
                                            <th className="right-align width-200">供应商保费</th>
                                            <th className="center"/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {newLoadTaskModalReducer.unscheduledCarList.map(function (item, key) {
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
                                                    <td className="right-align width-150">
                                                        <input id={`trans_unscheduled_index${key}`} defaultValue="0" type="number" className="unscheduled-input margin-bottom0 width-100 right-align"/>
                                                    </td>
                                                    {/* 供应商保费 */}
                                                    <td className="right-align width-200">
                                                        <input id={`insure_unscheduled_index${key}`} defaultValue="0" type="number" className="unscheduled-input margin-bottom0 width-100 right-align"/>
                                                    </td>
                                                    <td className="center">
                                                        <i className="mdi mdi-plus-circle margin-left20 fz24 purple-font pointer"
                                                           onClick={()=> {this.addLoadTaskDetail(item,`trans_unscheduled_index${key}`,`insure_unscheduled_index${key}`)}}/>
                                                    </td>
                                                </tr>
                                            )
                                        }, this)}
                                        </tbody>
                                    </table>}
                                </div>

                                {/* 已安排车辆 列表 */}
                                {newLoadTaskModalReducer.pageId === 'new' &&
                                <div className="col s12 detail-box z-depth-1 no-padding">
                                    <div className="col s6 custom-grey padding-top10 padding-bottom10 border-top-line border-bottom-line purple-font">已安排车辆</div>
                                    <div className="col s6 custom-grey padding-top10 padding-bottom10 border-top-line border-bottom-line pink-font right-align">
                                        {formatUtil.formatNumber(newLoadTaskModalReducer.scheduledCarList.length)}
                                    </div>
                                    {newLoadTaskModalReducer.scheduledCarList.length > 0 &&
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
                                            <th className="right-align width-150">供应商运费</th>
                                            <th className="right-align width-200">供应商保费</th>
                                            <th className="center"/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {newLoadTaskModalReducer.scheduledCarList.map(function (item, key) {
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
                                                    <td className="right-align width-150">
                                                        <input id={`trans_scheduled_index${key}`} defaultValue={item.supplier_trans_price} type="number" className="scheduled-input margin-bottom0 width-100 right-align"/>
                                                    </td>
                                                    {/* 供应商保费 */}
                                                    <td className="right-align width-200">
                                                        <input id={`insure_scheduled_index${key}`} defaultValue={item.supplier_insure_price} type="number" className="scheduled-input margin-bottom0 width-100 right-align"/>
                                                    </td>
                                                    <td className="center">
                                                        <i className="mdi mdi-checkbox-marked-circle margin-left20 fz24 purple-font pointer"
                                                           onClick={()=> {this.editLoadTaskDetail(item,`trans_scheduled_index${key}`,`insure_scheduled_index${key}`)}}/>
                                                        <i className="mdi mdi-minus-circle margin-left20 fz24 orange-text text-darken-3 pointer"
                                                           onClick={()=> {this.deleteLoadTaskDetail(item.load_task_detail_id)}}/>
                                                    </td>
                                                </tr>
                                            )
                                        }, this)}
                                        </tbody>
                                    </table>}
                                </div>}
                            </div>

                            <div className="modal-content-footer padding-top10 right-align">
                                总运输费用：
                                <span className="fz16 pink-font">
                                    {formatUtil.formatNumber(newLoadTaskModalReducer.loadTaskInfo[0].supplier_trans_price + newLoadTaskModalReducer.loadTaskInfo[0].supplier_insure_price,2)}
                                </span> 元
                            </div>

                        </div>}
                    </div>

                    {/* TAB 3 : 信息同步TAB */}
                    <div id="tab-sync" className={`col s12 margin-top20 ${newLoadTaskModalReducer.tabId === 'sync' ? "display-block" : "display-none"}`}>
                        {newLoadTaskModalReducer.loadTaskInfo.length > 0 &&
                        <div className="margin-top50 margin-left300 margin-right300">
                            {newLoadTaskModalReducer.loadTaskInfo[0].close_flag === 1 &&
                            <div className="detail-box">
                                <div className="center pink-font margin-top20 margin-bottom20">该供应商需求信息不可同步</div>
                            </div>}

                            {newLoadTaskModalReducer.loadTaskInfo[0].close_flag === 0 &&
                            <div className="detail-box">
                                <div className="center pink-font margin-top20">该供应商支持信息同步，可将需求直接提交至供应商</div>
                                <div className="center margin-top20 fz24">需求同步至供应商？</div>

                                <div className="center margin-top40 margin-bottom40">
                                    {/* 状态：开关 */}
                                    <span className="switch">
                                        <label className="fz14">
                                            不同步
                                            <input type="checkbox" checked={newLoadTaskModalReducer.syncFlag}
                                                   onClick={() => {changeSyncFlag(!newLoadTaskModalReducer.syncFlag)}}/>
                                            <span className="lever"/>
                                            同步
                                        </label>
                                    </span>
                                </div>
                            </div>}
                        </div>}
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    {newLoadTaskModalReducer.tabId !== 'sync' &&
                    <button type="button" className="btn close-btn" onClick={closeModal}>关闭</button>}
                    {newLoadTaskModalReducer.pageId === 'new' &&
                    <button type="button" className="btn confirm-btn margin-left20" onClick={goNext}>
                        {newLoadTaskModalReducer.tabId === 'sync' ? "完成" : "下一步"}
                    </button>}

                    {(newLoadTaskModalReducer.pageId === 'edit' || newLoadTaskModalReducer.pageId === 'load_task_detail') &&
                    <button type="button" className="btn confirm-btn margin-left20" onClick={confirmLoadTask}>确定</button>}
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
        newLoadTaskModalReducer: state.NewLoadTaskModalReducer,
        commonReducer: state.CommonReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    changeStartCity: (value) => {
        dispatch(NewLoadTaskModalActionType.setStartCity(value))
    },
    changeEndCity: (value) => {
        dispatch(NewLoadTaskModalActionType.setEndCity(value))
    },
    changeSupplier: (supplier) => {
        dispatch(NewLoadTaskModalActionType.setSupplier(supplier));
        dispatch(newLoadTaskModalAction.getTransMode(supplier.value));
        // TAB 线路信息：清空，运送方式
        dispatch(NewLoadTaskModalActionType.setTransportMode(null));
    },
    changeTransportMode: (value) => {
        dispatch(NewLoadTaskModalActionType.setTransportMode(value))
    },
    setPlanDate: (value) => {
        dispatch(NewLoadTaskModalActionType.setPlanDate(value))
    },
    setRemark: (value) => {
        dispatch(NewLoadTaskModalActionType.setRemark(value))
    },
    // 新建画面用 (下一步/完成 按钮)
    goNext: () => {
        dispatch(newLoadTaskModalAction.goNext())
    },
    // 编辑画面用 (确定)
    confirmLoadTask: () => {
        dispatch(newLoadTaskModalAction.confirmLoadTask());
    },
    showLoadTaskTab: () => {
        dispatch(newLoadTaskModalAction.showLoadTaskTab())
    },
    showTransCarTab: () => {
        dispatch(newLoadTaskModalAction.showTransCarTab())
    },
    addLoadTaskDetail: (orderItemId, vin, supplierTransPrice, supplierInsurePrice) => {
        dispatch(newLoadTaskModalAction.addLoadTaskDetail(orderItemId, vin, supplierTransPrice, supplierInsurePrice))
    },
    editLoadTaskDetail: (loadTaskDetailId, supplierTransPrice, supplierInsurePrice) => {
        dispatch(newLoadTaskModalAction.editLoadTaskDetail(loadTaskDetailId, supplierTransPrice, supplierInsurePrice))
    },
    deleteLoadTaskDetail: (loadTaskDetailId) => {
        dispatch(newLoadTaskModalAction.deleteLoadTaskDetail(loadTaskDetailId))
    },
    changeSyncFlag: (syncFlag) => {
        dispatch(NewLoadTaskModalActionType.setSyncFlag(syncFlag));
    },
    closeModal: () => {
        $('#newLoadTaskModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewLoadTaskModal);