import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {EditDepartmentModalActionType} from "../../actionTypes";

const editDepartmentModalAction = require('../../actions/modules/EditDepartmentModalAction');

/**
 * UI组件：修改部门 模块。
 */
class EditDepartmentModal extends React.Component {

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
     * 更新 部门
     */
    changeDepartmentName = (event) => {
        this.props.setDepartmentName(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {editDepartmentModalReducer, closeModal, saveDepartment} = this.props;
        return (
            <div id="editDepartmentModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">修改部门</div>

                {/** Modal主体 */}
                <div className="modal-content padding-bottom0 white grey-text text-darken-2">
                    <div className="row margin-top30">
                        <Input s={12} label="部门名称" maxLength="20" className="right-align" value={editDepartmentModalReducer.departmentName} onChange={this.changeDepartmentName}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveDepartment}>确定</button>
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
        editDepartmentModalReducer: state.EditDepartmentModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setDepartmentName: (value) => {
        dispatch(EditDepartmentModalActionType.setDepartmentName(value));
    },
    saveDepartment: () => {
        dispatch(editDepartmentModalAction.saveDepartment());
    },
    closeModal: () => {
        $('#editDepartmentModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDepartmentModal);