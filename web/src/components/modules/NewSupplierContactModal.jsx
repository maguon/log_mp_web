import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {NewSupplierContactModalActionType} from "../../actionTypes";

const newSupplierContactModalAction = require('../../actions/modules/NewSupplierContactModalAction');

class NewSupplierContactModal extends React.Component {

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
     * 更新 联系人
     */
    changeName = (event) => {
        this.props.setName(event.target.value);
    };

    /**
     * 更新 职务
     */
    changePosition = (event) => {
        this.props.setPosition(event.target.value);
    };

    /**
     * 更新 电话
     */
    changePhone = (event) => {
        this.props.setPhone(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newSupplierContactModalReducer, closeModal, saveSupplierContact} = this.props;
        return (
            <div id="newSupplierContactModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">增加联系人</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top40">
                        <Input s={4} label="联系人" maxLength="20" value={newSupplierContactModalReducer.name} onChange={this.changeName}/>
                        <Input s={4} label="职务" maxLength="20" value={newSupplierContactModalReducer.position} onChange={this.changePosition}/>
                        <Input s={4} label="电话" maxLength="20" value={newSupplierContactModalReducer.phone} onChange={this.changePhone}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveSupplierContact}>确定</button>
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
        newSupplierContactModalReducer: state.NewSupplierContactModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setName: (value) => {
        dispatch(NewSupplierContactModalActionType.setName(value))
    },
    setPosition: (value) => {
        dispatch(NewSupplierContactModalActionType.setPosition(value))
    },
    setPhone: (value) => {
        dispatch(NewSupplierContactModalActionType.setPhone(value))
    },
    saveSupplierContact: () => {
        dispatch(newSupplierContactModalAction.saveSupplierContact())
    },
    closeModal: () => {
        $('#newSupplierContactModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSupplierContactModal);