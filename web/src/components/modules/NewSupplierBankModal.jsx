import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {NewSupplierBankModalActionType} from "../../actionTypes";

const newSupplierBankModalAction = require('../../actions/modules/NewSupplierBankModalAction');

class NewSupplierBankModal extends React.Component {

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
     * 更新 账号
     */
    changeBankCode = (event) => {
        this.props.setBankCode(event.target.value);
    };

    /**
     * 更新 银行
     */
    changeBank = (event) => {
        this.props.setBank(event.target.value);
    };

    /**
     * 更新 姓名
     */
    changeAccountName = (event) => {
        this.props.setAccountName(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newSupplierBankModalReducer, closeModal, saveSupplierBank} = this.props;
        return (
            <div id="newSupplierBankModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">增加银行账号</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top40">
                        <Input s={4} label="账号" maxLength="50" value={newSupplierBankModalReducer.bankCode} onChange={this.changeBankCode}/>
                        <Input s={4} label="银行" maxLength="100" value={newSupplierBankModalReducer.bank} onChange={this.changeBank}/>
                        <Input s={4} label="姓名" maxLength="20" value={newSupplierBankModalReducer.accountName} onChange={this.changeAccountName}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveSupplierBank}>确定</button>
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
        newSupplierBankModalReducer: state.NewSupplierBankModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setBank: (value) => {
        dispatch(NewSupplierBankModalActionType.setBank(value))
    },
    setBankCode: (value) => {
        dispatch(NewSupplierBankModalActionType.setBankCode(value))
    },
    setAccountName: (value) => {
        dispatch(NewSupplierBankModalActionType.setAccountName(value))
    },
    saveSupplierBank: () => {
        dispatch(newSupplierBankModalAction.saveSupplierBank())
    },
    closeModal: () => {
        $('#newSupplierBankModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSupplierBankModal);