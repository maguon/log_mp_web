import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
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
     * 渲染(挂载)画面。
     */
    render() {
        const {newOrderModalReducer, commonReducer, changeStartCity, changeEndCity, changeServiceType, closeModal, saveOrder} = this.props;
        return (
            <div id="newOrderModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">增加订单</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top40">

                        <div className="input-field col s4">
                            <Select
                                options={commonReducer.cityList}
                                onChange={changeStartCity}
                                value={newOrderModalReducer.startCity}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE_FOR_MODAL}
                                isClearable={false}
                            />
                            <label className="active">起始城市</label>
                        </div>

                        <div className="input-field col s4">
                            <Select
                                options={commonReducer.cityList}
                                onChange={changeEndCity}
                                value={newOrderModalReducer.endCity}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE_FOR_MODAL}
                                isClearable={false}
                            />
                            <label className="active">目的城市</label>
                        </div>

                        <div className="input-field col s4">
                            <Select
                                options={sysConst.SERVICE_MODE}
                                onChange={changeServiceType}
                                value={newOrderModalReducer.serviceType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE_FOR_MODAL}
                                isClearable={false}
                            />
                            <label className="active">服务方式</label>
                        </div>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveOrder}>确定</button>
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
        dispatch(NewOrderModalActionType.setStartCity(value))
    },
    changeEndCity: (value) => {
        dispatch(NewOrderModalActionType.setEndCity(value))
    },
    changeServiceType: (value) => {
        dispatch(NewOrderModalActionType.setServiceType(value))
    },
    saveOrder: () => {
        dispatch(newOrderModalAction.saveOrder())
    },
    closeModal: () => {
        $('#newOrderModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderModal);