import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {NewSupplierModalActionType} from "../../actionTypes";

const newSupplierModalAction = require('../../actions/modules/NewSupplierModalAction');

class NewSupplierModal extends React.Component {

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
     * 更新 供应商简称
     */
    changeSupplierShort = (event) => {
        this.props.setSupplierShort(event.target.value);
    };

    /**
     * 更新 供应商全称
     */
    changeSupplierName = (event) => {
        this.props.setSupplierName(event.target.value);
    };

    /**
     * 更新 陆运
     */
    changeTransportModeRoad = (event) => {
        this.props.setTransportModeRoad(event.target.checked);
    };

    /**
     * 更新 海运
     */
    changeTransportModeShip = (event) => {
        this.props.setTransportModeShip(event.target.checked);
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
        const {newSupplierModalReducer, closeModal, saveSupplier} = this.props;
        return (
            <div id="newSupplierModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">{newSupplierModalReducer.pageType === 'new' ? '增加供应商' : '供应商信息'}</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top30">
                        <Input s={6} label="供应商简称" maxLength="100" value={newSupplierModalReducer.supplierShort} onChange={this.changeSupplierShort}/>
                        <Input s={6} label="供应商全称" maxLength="200" value={newSupplierModalReducer.supplierName} onChange={this.changeSupplierName}/>
                    </div>
                    <div className="row">
                        <div className="col s-percent10 grey-text">运输方式：</div>
                        <div className="col s-percent90">
                            <input type="checkbox" id="road" className="filled-in"
                                   checked={newSupplierModalReducer.transportModeRoad}
                                   onChange={this.changeTransportModeRoad}/>
                            <label htmlFor="road">陆运</label>

                            <input type="checkbox" id="ship" className="filled-in"
                                   checked={newSupplierModalReducer.transportModeShip}
                                   onChange={this.changeTransportModeShip}/>
                            <label htmlFor="ship" className="margin-left30">海运</label>
                        </div>
                    </div>
                    <div className="row">
                        <Input s={12} label="备注" maxLength="255" value={newSupplierModalReducer.remark} onChange={this.changeRemark}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveSupplier}>确定</button>
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
        newSupplierModalReducer: state.NewSupplierModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setSupplierShort: (value) => {
        dispatch(NewSupplierModalActionType.setSupplierShort(value))
    },
    setSupplierName: (value) => {
        dispatch(NewSupplierModalActionType.setSupplierName(value))
    },
    setTransportModeRoad: (value) => {
        dispatch(NewSupplierModalActionType.setTransportModeRoad(value))
    },
    setTransportModeShip: (value) => {
        dispatch(NewSupplierModalActionType.setTransportModeShip(value))
    },
    setRemark: (value) => {
        dispatch(NewSupplierModalActionType.setRemark(value))
    },
    saveSupplier: () => {
        dispatch(newSupplierModalAction.saveSupplier())
    },
    closeModal: () => {
        $('#newSupplierModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSupplierModal);