import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {EditOrderCarModalActionType} from "../../actionTypes";

const editOrderCarModalAction = require('../../actions/modules/EditOrderCarModalAction');
const sysConst = require('../../util/SysConst');
const commonUtil = require('../../util/CommonUtil');
const formatUtil = require('../../util/FormatUtil');

/**
 * UI组件：增加车辆/车辆信息 修改模块。
 */
class EditOrderCarModal extends React.Component {

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
     * 改变VIN
     */
    changeVin = (event) => {
        this.props.changeVin(event.target.value);
    };

    /**
     * 改变估值
     */
    changeValuation = (event) => {
        this.props.changeValuation(event.target.value);
    };

    /**
     * 改变是否新车
     */
    changeCarFlag = (event) => {
        this.props.changeCarFlag(event.target.checked);
    };

    /**
     * 改变是否保险
     */
    changeInsuranceFlag = (event) => {
        this.props.changeInsuranceFlag(event.target.checked);
    };

    /**
     * 实际运费
     */
    changeActFreight = (event) => {
        this.props.changeActFreight(event.target.value);
    };

    /**
     * 实际运费
     */
    changeActInsureFee = (event) => {
        this.props.changeActInsureFee(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {editOrderCarModalReducer, commonReducer, changeCarModel, saveOrderCar, closeModal} = this.props;
        return (
            <div id="editOrderCarModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">{editOrderCarModalReducer.pageType === 'new' ? '增加车辆' : '车辆信息'}</div>

                {/** Modal主体 */}
                <div className="modal-content white">

                    {/** 头部 */}
                    {editOrderCarModalReducer.orderInfo.length > 0 &&
                    <div className="row margin-top20 detail-box custom-grey grey-text text-darken-2">
                        <div className="col s6 margin-top20 margin-bottom20 purple-font">
                            <span className="fz16">{editOrderCarModalReducer.orderInfo[0].start_city}</span>
                            <i className="margin-left10 margin-right10 blue-text text-lighten-2 mdi mdi-chevron-double-right"/>
                            <span className="fz16">{editOrderCarModalReducer.orderInfo[0].end_city}</span>
                        </div>
                        <div className="col s6 margin-top20 right-align">
                            服务方式：{commonUtil.getJsonValue(sysConst.SERVICE_MODE, editOrderCarModalReducer.orderInfo[0].service_type)}
                        </div>
                    </div>}

                    {/** 第一行 */}
                    <div className="row margin-top20 margin-bottom10">

                        <div className="custom-input-field col s6">
                            <Input s={12} label="VIN" maxLength="17" value={editOrderCarModalReducer.vin} onChange={this.changeVin}/>
                        </div>

                        <div className="input-field col s6">
                            <Select
                                options={sysConst.CAR_MODEL}
                                onChange={changeCarModel}
                                value={editOrderCarModalReducer.carModel}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">车型</label>
                        </div>
                    </div>

                    {/** 第二行 */}
                    <div className="row margin-bottom10">
                        <div className="col s6 margin-top16">
                            <div className="col s12 custom-label-field grey-text">
                                <input type="checkbox" id="new-car-flag" className="filled-in"
                                       checked={editOrderCarModalReducer.carFlag}
                                       onChange={this.changeCarFlag}/>
                                <label htmlFor="new-car-flag">新车</label>

                                <input type="checkbox" id="insurance-flag" className="filled-in"
                                       checked={editOrderCarModalReducer.insuranceFlag}
                                       onChange={this.changeInsuranceFlag}/>
                                <label htmlFor="insurance-flag" className="margin-left30">保险</label>
                            </div>
                        </div>

                        <div className="custom-input-field col s6">
                            <Input s={12} label="估值" type="number" value={editOrderCarModalReducer.valuation} onChange={this.changeValuation}/>
                        </div>
                    </div>

                    {/** 第三行：预计保费，实际保费 */}
                    <div className="row margin-bottom10">
                        <div className="col input-field s6">
                            <div className="col s12 custom-label-field grey-text">
                                预计保费：<span className="pink-font margin-left5 fz18">{formatUtil.formatNumber(editOrderCarModalReducer.insureFee, 2)}</span> 元
                            </div>
                        </div>
                        <Input s={6} label="实际保费" className="right-align" type="number" value={editOrderCarModalReducer.actInsureFee} onChange={this.changeActInsureFee}/>
                    </div>

                    {/** 最终行：预计运费，实际运费 */}
                    <div className="row margin-bottom10">
                        <div className="col input-field s6">
                            <div className="col s12 custom-label-field grey-text">
                                预计运费：<span className="pink-font margin-left5 fz18">{formatUtil.formatNumber(editOrderCarModalReducer.freight, 2)}</span> 元
                            </div>
                        </div>
                        <Input s={6} label="实际运费" className="right-align" type="number" value={editOrderCarModalReducer.actFreight} onChange={this.changeActFreight}/>
                    </div>

                    {/** 最终行：实际总费用 */}
                    <div className="row margin-bottom0">
                        <div className="col input-field s12 right-align">
                            实际总费用：<span className="pink-font margin-left5 fz18">{formatUtil.formatNumber(parseInt(editOrderCarModalReducer.actInsureFee) + parseInt(editOrderCarModalReducer.actFreight), 2)}</span> 元
                        </div>
                    </div>
                </div>

                {/** Modal固定底部：取消确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>关闭</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveOrderCar}>确定</button>
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
        editOrderCarModalReducer: state.EditOrderCarModalReducer,
        commonReducer: state.CommonReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    changeVin: (value) => {
        dispatch(EditOrderCarModalActionType.setVin(value));
        dispatch(editOrderCarModalAction.calculateFreight())
    },
    // changeEndCity: (value) => {
    //     dispatch(EditOrderCarModalActionType.setEndCity(value));
    //     dispatch(editOrderCarModalAction.calculateMileage())
    // },
    // changeServiceMode: (serviceMode) => {
    //     dispatch(EditOrderCarModalActionType.setServiceMode(serviceMode));
    //     dispatch(editOrderCarModalAction.calculateFreight());
    // },
    changeCarModel: (carModel) => {
        dispatch(EditOrderCarModalActionType.setCarModel(carModel));
        dispatch(editOrderCarModalAction.calculateFreight());
    },
    changeCarFlag: (carFlag) => {
        dispatch(EditOrderCarModalActionType.setCarFlag(carFlag));
        dispatch(editOrderCarModalAction.calculateFreight());
    },
    changeInsuranceFlag: (value) => {
        dispatch(EditOrderCarModalActionType.setInsuranceFlag(value));
        dispatch(editOrderCarModalAction.calculateFreight());
    },
    changeValuation: (valuation) => {
        dispatch(EditOrderCarModalActionType.setValuation(valuation));
        dispatch(editOrderCarModalAction.calculateFreight());
    },

    changeActFreight: (value) => {
        dispatch(EditOrderCarModalActionType.setActFreight(value));
    },
    changeActInsureFee: (value) => {
        dispatch(EditOrderCarModalActionType.setActInsureFee(value));
    },

    saveOrderCar: () => {
        dispatch(editOrderCarModalAction.saveOrderCar())
    },
    closeModal: () => {
        $('#editOrderCarModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderCarModal);