import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {InquiryModalActionType} from "../../actionTypes";

const inquiryModalAction = require('../../actions/modules/InquiryModalAction');
const sysConst = require('../../util/SysConst');

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
     * 渲染(挂载)画面。
     */
    render() {
        const {inquiryModalReducer, changeStartCity, changeEndCity, changeServiceMode, changeCarModel, changeCarFlag, closeModal} = this.props;
        return (
            <div>
                <div id="enquiryModal" className="modal modal-fixed-footer row">

                    {/** Modal头部：Title */}
                    <div className="modal-title center-align white-text">询&nbsp;价</div>

                    {/** Modal主体 */}
                    <div className="modal-content white">

                        {/** 第一行 */}
                        <div className="row margin-top20">
                            <div className="input-field col s6">
                                <Select
                                    options={inquiryModalReducer.cityList}
                                    onChange={changeStartCity}
                                    value={inquiryModalReducer.startCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                                <label className="active">始发城市</label>
                            </div>
                            <div className="input-field col s4">
                                <Select
                                    options={inquiryModalReducer.cityList}
                                    onChange={changeEndCity}
                                    value={inquiryModalReducer.endCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
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
                                />
                                <label className="active">车型</label>
                            </div>
                        </div>

                        {/** 第三行 */}
                        <div className="row">
                            <div className="input-field col s6">
                                <Select
                                    options={sysConst.YES_NO}
                                    onChange={changeCarFlag}
                                    value={inquiryModalReducer.carFlag}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                                <label className="active">是否新车</label>
                            </div>
                            <div className="custom-input-field col s6">
                                <Input s={12} label="估值" type="number" value={inquiryModalReducer.valuation} onChange={this.changeValuation}/>
                            </div>
                        </div>

                        {/** 最终行：预计运费 */}
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

                            <div className="col right-align" style={{width: '36%', marginTop: '12px'}}>
                                预计运费：<span className="red-font margin-left5 fz18">{inquiryModalReducer.freight}</span>元
                            </div>
                        </div>
                    </div>

                    {/** Modal固定底部：取消确定按钮 */}
                    <div className="modal-footer">
                        <button type="button" className="btn close-btn" onClick={closeModal}>关闭</button>
                    </div>

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
        inquiryModalReducer: state.InquiryModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    changeStartCity: (value) => {
        dispatch(InquiryModalActionType.setStartCity(value));
        dispatch(inquiryModalAction.calculateMileage())
    },
    changeEndCity: (value) => {
        dispatch(InquiryModalActionType.setEndCity(value));
        dispatch(inquiryModalAction.calculateMileage())
    },
    changeServiceMode: (serviceMode) => {
        dispatch(InquiryModalActionType.setServiceMode(serviceMode));
        dispatch(inquiryModalAction.calculateFreight());
    },
    changeCarModel: (carModel) => {
        dispatch(InquiryModalActionType.setCarModel(carModel));
        dispatch(inquiryModalAction.calculateFreight());
    },
    changeCarFlag: (carFlag) => {
        dispatch(InquiryModalActionType.setCarFlag(carFlag));
        dispatch(inquiryModalAction.calculateFreight());
    },
    changeValuation: (valuation) => {
        dispatch(InquiryModalActionType.setValuation(valuation));
        dispatch(inquiryModalAction.calculateFreight());
    },
    closeModal: () => {
        $('#enquiryModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InquiryModal);