import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {InquiryModalActionType} from "../../actionTypes";

const inquiryModalAction = require('../../actions/modules/InquiryModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

/**
 * UI组件：询价模块。
 */
class InquiryModal extends React.Component {

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
     * 渲染(挂载)画面。
     */
    render() {
        const {inquiryModalReducer, commonReducer, changeStartCity, changeEndCity, changeServiceMode, changeCarModel, changeCarFlag, closeModal} = this.props;
        return (
            <div id="inquiryModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">询&nbsp;价</div>

                {/** Modal主体 */}
                <div className="modal-content white">

                    {/** 第一行 */}
                    <div className="row margin-top30">
                        <div className="input-field col s6">
                            <Select
                                options={commonReducer.cityList}
                                onChange={changeStartCity}
                                value={inquiryModalReducer.startCity}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">始发城市</label>
                        </div>
                        <div className="input-field col s4">
                            <Select
                                options={commonReducer.cityList}
                                onChange={changeEndCity}
                                value={inquiryModalReducer.endCity}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">终到城市</label>
                        </div>
                        <div className="input-field col s2 right-align">
                            <div className="input-field col s12" style={{paddingLeft: 0, paddingRight: 0}}>
                                <span className="red-font margin-left5 fz18">{inquiryModalReducer.mileage}</span>公里
                            </div>
                        </div>
                    </div>

                    {/** 第二行 */}
                    <div className="row">
                        <div className="input-field col s6">
                            <Select
                                options={sysConst.SERVICE_MODE}
                                onChange={changeServiceMode}
                                value={inquiryModalReducer.serviceMode}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">服务方式</label>
                        </div>
                        <div className="input-field col s6">
                            <Select
                                options={sysConst.CAR_MODEL}
                                onChange={changeCarModel}
                                value={inquiryModalReducer.carModel}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">车型</label>
                        </div>
                    </div>

                    {/** 第三行 */}
                    <div className="row">
                        <div className="col s6 margin-top16">
                            <div className="col s12 custom-label-field grey-text">
                                <input type="checkbox" id="new-car" className="filled-in"
                                       checked={inquiryModalReducer.carFlag}
                                       onChange={this.changeCarFlag}/>
                                <label htmlFor="new-car">新车</label>

                                <input type="checkbox" id="insurance" className="filled-in"
                                       checked={inquiryModalReducer.insuranceFlag}
                                       onChange={this.changeInsuranceFlag}/>
                                <label htmlFor="insurance" className="margin-left30">保险</label>
                            </div>
                        </div>

                        <div className="custom-input-field col s6">
                            <Input s={12} label="估值" type="number" value={inquiryModalReducer.valuation} onChange={this.changeValuation}/>
                        </div>
                    </div>

                    {/** 第四行：是否保险，预计保费 */}
                    <div className="row">
                        <div className="col s6">
                            预计保费：<span className="red-font margin-left5 fz18">{formatUtil.formatNumber(inquiryModalReducer.insuranceFee, 2)}</span>元
                        </div>

                        <div className="col s6 right-align">
                            预计运费：<span className="red-font margin-left5 fz18">{formatUtil.formatNumber(inquiryModalReducer.freight, 2)}</span>元
                        </div>
                    </div>
                    <div className="row col s12"><div className="col s12 dotted-line"/></div>

                    {/** 最终行：提示信息 */}
                    <div className="row margin-bottom0">
                        <div className="row input-field col s12">
                            <div className="col left-align" style={{width: '4%'}}>
                                {inquiryModalReducer.errorRouteFlg &&
                                <div className="bold red-text">
                                    <span className="mdi mdi-alert-circle red-text fz30"/>
                                </div>
                                }
                            </div>
                            <div className="col left-align" style={{width: '60%', marginTop: '12px'}}>
                                {inquiryModalReducer.errorRouteFlg &&
                                <div className="bold red-text">
                                    当前线路暂未开通，请重新选择线路或到线路设置中对该线路进行设置
                                </div>
                                }
                            </div>

                            <div className="col right-align no-padding" style={{width: '36%', marginTop: '12px'}}>
                                预计总费用：<span className="red-font margin-left5 fz18">{formatUtil.formatNumber(inquiryModalReducer.freight + inquiryModalReducer.insuranceFee, 2)}</span>元
                            </div>
                        </div>
                    </div>
                </div>

                {/** Modal固定底部：取消确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>关闭</button>
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
        inquiryModalReducer: state.InquiryModalReducer,
        commonReducer: state.CommonReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    // 始发城市
    changeStartCity: (value) => {
        dispatch(InquiryModalActionType.setStartCity(value));
        dispatch(inquiryModalAction.calculateMileage())
    },
    // 目的城市
    changeEndCity: (value) => {
        dispatch(InquiryModalActionType.setEndCity(value));
        dispatch(inquiryModalAction.calculateMileage())
    },
    // 服务方式
    changeServiceMode: (serviceMode) => {
        dispatch(InquiryModalActionType.setServiceMode(serviceMode));
        dispatch(inquiryModalAction.calculateFreight());
    },
    // 车型
    changeCarModel: (carModel) => {
        dispatch(InquiryModalActionType.setCarModel(carModel));
        dispatch(inquiryModalAction.calculateFreight());
    },
    // 是否新车
    changeCarFlag: (carFlag) => {
        dispatch(InquiryModalActionType.setCarFlag(carFlag));
        dispatch(inquiryModalAction.calculateFreight());
    },
    // 是否保险
    changeInsuranceFlag: (value) => {
        dispatch(InquiryModalActionType.setInsuranceFlag(value));
        dispatch(inquiryModalAction.calculateFreight());
    },
    // 估值
    changeValuation: (valuation) => {
        dispatch(InquiryModalActionType.setValuation(valuation));
        dispatch(inquiryModalAction.calculateFreight());
    },
    closeModal: () => {
        $('#inquiryModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InquiryModal);