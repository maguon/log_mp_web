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
     * 渲染(挂载)画面。
     */
    render() {
        const {newLoadTaskModalReducer, commonReducer, changeStartCity, changeEndCity, changeSupplier, changeTransportMode, closeModal, goNext} = this.props;
        return (
            <div id="newLoadTaskModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">线路安排</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <ul className="tabs">
                        <li className={`tab col s4 ${newLoadTaskModalReducer.tabId !== 'base' ? "disabled" : ""}`}>
                            <a href="#tab-load" className={`${newLoadTaskModalReducer.tabId === 'base' ? "active" : ""}`}>线路信息</a>
                        </li>
                        <li className={`tab col s4 ${newLoadTaskModalReducer.tabId !== 'trans' ? "disabled" : ""}`}>
                            <a href="#tab-trans" className={`${newLoadTaskModalReducer.tabId === 'trans' ? "active" : ""}`}>运输车辆</a>
                        </li>
                        <li className={`tab col s4 ${newLoadTaskModalReducer.tabId !== 'sync' ? "disabled" : ""}`}>
                            <a href="#tab-sync" className={`${newLoadTaskModalReducer.tabId === 'sync' ? "active" : ""}`}>信息同步</a>
                        </li>
                    </ul>

                    {/* TAB 1 : 订单信息TAB */}
                    <div id="tab-load" className={`col s12 margin-top20 ${newLoadTaskModalReducer.tabId === 'base' ? "display-block" : "display-none"}`}>
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

                    <div id="tab-trans" className={`col s12 margin-top20 ${newLoadTaskModalReducer.tabId === 'trans' ? "display-block" : "display-none"}`}>
                        <div className="col s8">运输车辆 TODO 起始城市 -- 目的城市  物流公司  运输方式</div>
                        <div className="col s4 right-align">时间。。。。</div>



                        {/* 运送车辆 列表 */}
                        {newLoadTaskModalReducer.unscheduledCarList.length > 0 &&
                        <div className="col s12 margin-top5">
                            <table className="detail-box bordered">
                                <thead className="custom-grey border-top-line">
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
                                                <input id={`trans_index${key}`} defaultValue={item.act_trans_price} className="margin-bottom0 width-100 right-align"/>
                                            </td>
                                            {/* 供应商保费 */}
                                            <td className="right-align width-200">
                                                <input id={`insure_index${key}`} defaultValue={item.act_insure_price} className="margin-bottom0 width-100 right-align"/>
                                            </td>
                                            <td className="center">
                                                <i className="mdi mdi-checkbox-marked-circle margin-left20 fz24 purple-font pointer"
                                                   onClick={()=> {this.saveOrderItemInfo(item,`trans_index${key}`,`insure_index${key}`)}}/>
                                            </td>
                                        </tr>
                                    )
                                }, this)}
                                </tbody>
                            </table>
                        </div>}



                    </div>

                    <div id="tab-sync" className={`col s12 margin-top20 ${newLoadTaskModalReducer.tabId === 'sync' ? "display-block" : "display-none"}`}>
                        信息同步
                    </div>

                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>关闭</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={goNext}>
                        {newLoadTaskModalReducer.tabId === 'sync' ? "完成" : "下一步"}
                    </button>
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
    changeSupplier: (value) => {
        dispatch(NewLoadTaskModalActionType.setSupplier(value));
        dispatch(newLoadTaskModalAction.getTransMode(value));
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



    goNext: () => {
        dispatch(newLoadTaskModalAction.goNext())
    },
    closeModal: () => {
        $('#newLoadTaskModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewLoadTaskModal);