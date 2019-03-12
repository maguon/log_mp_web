import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {Redirect} from 'react-router-dom';
import {NewOrderModalActionType} from "../../actionTypes";

const newOrderModalAction = require('../../actions/modules/NewOrderModalAction');
const sysConst = require('../../util/SysConst');

class NewOrderModal extends React.Component {

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
     * 更新 发运日期
     */
    changeDepartDate = (event) => {
        this.props.setDepartDate(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newOrderModalReducer, commonReducer, changeStartCity, changeEndCity, changeServiceType, closeModal, saveOrder} = this.props;
        if (newOrderModalReducer.newOrderId !== '') {
            return <Redirect push to={{pathname: '/order/' + newOrderModalReducer.newOrderId}}/>;
        }
        return (
            <div id="newOrderModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">增加订单</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top50">

                        <div className="input-field col s6">
                            <Select
                                options={commonReducer.cityList}
                                onChange={changeStartCity}
                                value={newOrderModalReducer.startCity}
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
                                value={newOrderModalReducer.endCity}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active"><span className="must-input">*</span>目的城市</label>
                        </div>

                        <div className="input-field col s6">
                            <Select
                                options={sysConst.SERVICE_MODE}
                                onChange={changeServiceType}
                                value={newOrderModalReducer.serviceType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active"><span className="must-input">*</span>服务方式</label>
                        </div>

                        <div className="input-field col s6 custom-input-field">
                            <Input s={12} label={<span><span className="must-input">*</span>发运日期</span>} type='date' options={sysConst.DATE_PICKER_OPTION}
                                   value={newOrderModalReducer.departDate} onChange={this.changeDepartDate} />
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>
                    </div>

                    {/** 最终行：预计运费 */}
                    {newOrderModalReducer.errorRouteFlg &&
                    <div className="row margin-bottom0 bold red-text">
                        <div className="col left-align s-percent-4">
                            <span className="mdi mdi-alert-circle red-text fz30"/>
                        </div>
                        <div className="col left-align s-percent-96 margin-top10">
                            当前线路暂未开通，请重新选择线路或到线路设置中对该线路进行设置
                        </div>
                    </div> }
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className={`btn confirm-btn margin-left20 ${newOrderModalReducer.errorRouteFlg ? "disabled" : ""}`}
                            onClick={saveOrder}>确定</button>
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
        newOrderModalReducer: state.NewOrderModalReducer,
        commonReducer: state.CommonReducer,
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    changeStartCity: (value) => {
        dispatch(NewOrderModalActionType.setStartCity(value));
        dispatch(newOrderModalAction.calculateMileage());
    },
    changeEndCity: (value) => {
        dispatch(NewOrderModalActionType.setEndCity(value));
        dispatch(newOrderModalAction.calculateMileage());
    },
    changeServiceType: (value) => {
        dispatch(NewOrderModalActionType.setServiceType(value))
    },
    setDepartDate: (value) => {
        dispatch(NewOrderModalActionType.setDepartDate(value))
    },
    saveOrder: () => {
        // 设置保存成功后的订单编号，默认值：空
        dispatch(NewOrderModalActionType.setNewOrderId(''));
        dispatch(newOrderModalAction.saveOrder());
    },
    closeModal: () => {
        $('#newOrderModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderModal);