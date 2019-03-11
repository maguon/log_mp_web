import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {EditCustomerPhoneModalActionType} from "../../actionTypes";

const editCustomerPhoneModalAction = require('../../actions/modules/EditCustomerPhoneModalAction');

/**
 * UI组件：修改客服电话 模块。
 */
class EditCustomerPhoneModal extends React.Component {

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
     * 更新 客服电话
     */
    changeCustomerPhone = (event) => {
        this.props.setCustomerPhone(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {editCustomerPhoneModalReducer, closeModal, saveCustomerPhone} = this.props;
        return (
            <div id="editCustomerPhoneModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">修改客服电话</div>

                {/** Modal主体 */}
                <div className="modal-content padding-bottom0 white grey-text text-darken-2">
                    <div className="row margin-top30">
                        <Input s={12} label="客服电话" maxLength="20" value={editCustomerPhoneModalReducer.customerPhone} onChange={this.changeCustomerPhone}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveCustomerPhone}>确定</button>
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
        editCustomerPhoneModalReducer: state.EditCustomerPhoneModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setCustomerPhone: (value) => {
        dispatch(EditCustomerPhoneModalActionType.setCustomerPhone(value));
    },
    saveCustomerPhone: () => {
        dispatch(editCustomerPhoneModalAction.saveCustomerPhone());
    },
    closeModal: () => {
        $('#editCustomerPhoneModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomerPhoneModal);