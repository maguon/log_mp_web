import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {EditCompanyBankModalActionType} from "../../actionTypes";

const editCompanyBankModalAction = require('../../actions/modules/EditCompanyBankModalAction');

/**
 * UI组件：修改账户信息 模块。
 */
class EditCompanyBankModal extends React.Component {

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
     * 更新 银行名称
     */
    changeCompanyBank = (event) => {
        this.props.setCompanyBank(event.target.value);
    };

    /**
     * 更新 卡号
     */
    changeCompanyBankCode = (event) => {
        this.props.setCompanyBankCode(event.target.value);
    };

    /**
     * 更新 收款人
     */
    changeCompanyBankUser = (event) => {
        this.props.setCompanyBankUser(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {editCompanyBankModalReducer, closeModal, saveCompanyBank} = this.props;
        return (
            <div id="editCompanyBankModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">修改账户信息</div>

                {/** Modal主体 */}
                <div className="modal-content padding-bottom0 white grey-text text-darken-2">
                    <div className="row margin-top30">
                        <Input s={12} label="银行名称" maxLength="20" className="right-align" value={editCompanyBankModalReducer.companyBank} onChange={this.changeCompanyBank}/>
                        <Input s={12} label="银行账号" maxLength="30" className="right-align" value={editCompanyBankModalReducer.companyBankCode} onChange={this.changeCompanyBankCode}/>
                        <Input s={12} label="收款人"   maxLength="20" className="right-align" value={editCompanyBankModalReducer.companyBankUser} onChange={this.changeCompanyBankUser}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveCompanyBank}>确定</button>
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
        editCompanyBankModalReducer: state.EditCompanyBankModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setCompanyBank: (value) => {
        dispatch(EditCompanyBankModalActionType.setCompanyBank(value));
    },
    setCompanyBankCode: (value) => {
        dispatch(EditCompanyBankModalActionType.setCompanyBankCode(value));
    },
    setCompanyBankUser: (value) => {
        dispatch(EditCompanyBankModalActionType.setCompanyBankUser(value));
    },
    saveCompanyBank: () => {
        dispatch(editCompanyBankModalAction.saveCompanyBank());
    },
    closeModal: () => {
        $('#editCompanyBankModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyBankModal);