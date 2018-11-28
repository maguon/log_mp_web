import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {EnquiryModalActionType} from "../../actionTypes";

const enquiryModalAction = require('../../actions/modules/EnquiryModalAction');
const sysConst = require('../../util/SysConst');

/**
 * UI组件：询价模块。
 */
class EnquiryModal extends React.Component {

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
        const {enquiryModalReducer, changeStartCity, changeEndCity, changeServiceMode, changeCarModel, changeCarFlag, closeModal} = this.props;
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
                                    options={enquiryModalReducer.cityList}
                                    onChange={changeStartCity}
                                    value={enquiryModalReducer.startCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                                <label className="active">始发城市</label>
                            </div>
                            <div className="input-field col s4">
                                <Select
                                    options={enquiryModalReducer.cityList}
                                    onChange={changeEndCity}
                                    value={enquiryModalReducer.endCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                                <label className="active">终到城市</label>
                            </div>
                            <div className="input-field col s2 right-align">
                                <div className="input-field col s12" style={{paddingLeft: 0, paddingRight: 0}}>
                                    <span className="red-font margin-left5 fz18">{enquiryModalReducer.mileage}</span>公里
                                </div>
                            </div>
                        </div>

                        {/** 第二行 */}
                        <div className="row">
                            <div className="input-field col s6">
                                <Select
                                    options={sysConst.SERVICE_MODE}
                                    onChange={changeServiceMode}
                                    value={enquiryModalReducer.serviceMode}
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
                                    value={enquiryModalReducer.carModel}
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
                                    value={enquiryModalReducer.carFlag}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                                <label className="active">是否新车</label>
                            </div>
                            <div className="custom-input-field col s6">
                                <Input s={12} label="估值" type="number" value={enquiryModalReducer.valuation} onChange={this.changeValuation}/>
                            </div>
                        </div>

                        {/** 最终行：预计运费 */}
                        <div className="row input-field col s12">
                            <div className="col left-align" style={{width: '4%'}}>
                                {enquiryModalReducer.errorRouteFlg &&
                                <div className="bold red-text">
                                    <span className="mdi mdi-alert-circle red-text fz30"/>
                                </div>
                                }
                            </div>
                            <div className="col left-align" style={{width: '60%', marginTop: '12px'}}>
                                {enquiryModalReducer.errorRouteFlg &&
                                <div className="bold red-text">
                                    当前线路暂未开通，请重新选择线路或到线路设置中对该线路进行设置
                                </div>
                                }
                            </div>

                            <div className="col right-align" style={{width: '36%', marginTop: '12px'}}>
                                预计运费：<span className="red-font margin-left5 fz18">{enquiryModalReducer.freight}</span>元
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
        enquiryModalReducer: state.EnquiryModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    changeStartCity: (value) => {
        dispatch(EnquiryModalActionType.setStartCity(value));
        dispatch(enquiryModalAction.calculateMileage())
    },
    changeEndCity: (value) => {
        dispatch(EnquiryModalActionType.setEndCity(value));
        dispatch(enquiryModalAction.calculateMileage())
    },
    changeServiceMode: (serviceMode) => {
        dispatch(EnquiryModalActionType.setServiceMode(serviceMode));
        dispatch(enquiryModalAction.calculateFreight());
    },
    changeCarModel: (carModel) => {
        dispatch(EnquiryModalActionType.setCarModel(carModel));
        dispatch(enquiryModalAction.calculateFreight());
    },
    changeCarFlag: (carFlag) => {
        dispatch(EnquiryModalActionType.setCarFlag(carFlag));
        dispatch(enquiryModalAction.calculateFreight());
    },
    changeValuation: (valuation) => {
        dispatch(EnquiryModalActionType.setValuation(valuation));
        dispatch(enquiryModalAction.calculateFreight());
    },
    closeModal: () => {
        $('#enquiryModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EnquiryModal);