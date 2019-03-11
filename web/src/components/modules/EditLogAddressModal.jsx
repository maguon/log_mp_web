import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {EditLogAddressModalActionType} from "../../actionTypes";

const editLogAddressModalAction = require('../../actions/modules/EditLogAddressModalAction');
const sysConst = require('../../util/SysConst');

/**
 * UI组件：收发货地址 模块。
 */
class EditLogAddressModal extends React.Component {

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
        const {editLogAddressModalReducer, changeSendAddress, changeRecvAddress, closeModal, saveLogAddress} = this.props;
        return (
            <div id="editLogAddressModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">收发货地址</div>

                {/** Modal主体 */}
                <div className="modal-content padding-bottom0 white grey-text text-darken-2">
                    <div className="row margin-top30">
                        <div className="col s12 fz16"><span className="must-input">*</span> 发货城市<span className="margin-left20 purple-font">{editLogAddressModalReducer.sendCity}</span></div>
                        <div className="input-field col s12 margin-top30">
                            <Select
                                options={editLogAddressModalReducer.sendAddressArray}
                                onChange={changeSendAddress}
                                value={editLogAddressModalReducer.sendAddress}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">发货地址</label>
                        </div>

                        <div className="col s12 fz16 margin-top30">收货城市<span className="margin-left20 purple-font">{editLogAddressModalReducer.recvCity}</span></div>
                        <div className="input-field col s12 margin-top30">
                            <Select
                                options={editLogAddressModalReducer.recvAddressArray}
                                onChange={changeRecvAddress}
                                value={editLogAddressModalReducer.recvAddress}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                                backspaceRemovesValue={false}
                            />
                            <label className="active">收货地址</label>
                        </div>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveLogAddress}>确定</button>
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
        editLogAddressModalReducer: state.EditLogAddressModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    changeSendAddress: (value) => {
        dispatch(EditLogAddressModalActionType.setSendAddress(value));
    },
    changeRecvAddress: (value) => {
        dispatch(EditLogAddressModalActionType.setRecvAddress(value));
    },
    saveLogAddress: () => {
        dispatch(editLogAddressModalAction.saveLogAddress());
    },
    closeModal: () => {
        $('#editLogAddressModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLogAddressModal);