import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {EditProductRemindModalActionType} from "../../actionTypes";

const editProductRemindModalAction = require('../../actions/modules/EditProductRemindModalAction');

/**
 * UI组件：修改提醒 模块。
 */
class EditProductRemindModal extends React.Component {

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
     * 更新 提醒描述
     */
    changeRemark = (event, value) => {
        this.props.setProductRemindRemark(value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {editProductRemindModalReducer, closeModal, saveProductRemind} = this.props;
        return (
            <div id="editProductRemindModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">修改提醒</div>

                {/** Modal主体 */}
                <div className="modal-content padding-bottom0 white grey-text text-darken-2">
                    <div className="row margin-top40">
                        <Input s={12} label="提醒描述" maxLength="200" value={editProductRemindModalReducer.remark} onChange={this.changeRemark}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveProductRemind}>确定</button>
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
        editProductRemindModalReducer: state.EditProductRemindModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setProductRemindRemark: (value) => {
        dispatch(EditProductRemindModalActionType.setProductRemindRemark(value))
    },
    saveProductRemind: () => {
        dispatch(editProductRemindModalAction.saveProductRemind());
    },
    closeModal: () => {
        $('#editProductRemindModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductRemindModal);