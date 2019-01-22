import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {EditLoginUserModalActionType} from "../../actionTypes";

const editLoginUserModalAction = require('../../actions/modules/EditLoginUserModalAction');

/**
 * UI组件：修改个人信息。
 */
class EditLoginUserModal extends React.Component {

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
     * 改变原始密码
     */
    changeLoginPassword = (event) => {
        this.props.setLoginPassword(event.target.value);
    };

    /**
     * 改变新密码
     */
    changeNewLoginPassword = (event) => {
        this.props.setNewLoginPassword(event.target.value);
    };

    /**
     * 改变确认密码
     */
    changeRepeatLoginPassword = (event) => {
        this.props.setRepeatLoginPassword(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {editLoginUserModalReducer, changePassword, closeModal} = this.props;
        return (
            <div id="editLoginUserModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">修改密码</div>

                {/** Modal主体 */}
                <div className="modal-content white">
                    <div className="row">
                        <Input s={12} label="原始密码" type="password" value={editLoginUserModalReducer.loginPassword} onChange={this.changeLoginPassword}/>
                        <Input s={12} label="新密码" type="password" value={editLoginUserModalReducer.newLoginPassword} onChange={this.changeNewLoginPassword}/>
                        <Input s={12} label="确认密码" type="password" value={editLoginUserModalReducer.repeatLoginPassword} onChange={this.changeRepeatLoginPassword}/>
                    </div>
                </div>

                {/** Modal固定底部：取消确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>关闭</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={changePassword}>确定</button>
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
        editLoginUserModalReducer: state.EditLoginUserModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    // 原始密码
    setLoginPassword: (value) => {
        dispatch(EditLoginUserModalActionType.setLoginPassword(value));
    },
    // 新密码
    setNewLoginPassword: (value) => {
        dispatch(EditLoginUserModalActionType.setNewLoginPassword(value));
    },
    // 确认密码
    setRepeatLoginPassword: (value) => {
        dispatch(EditLoginUserModalActionType.setRepeatLoginPassword(value));
    },
    changePassword: () => {
        dispatch(editLoginUserModalAction.changePassword())
    },
    closeModal: () => {
        $('#editLoginUserModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLoginUserModal);