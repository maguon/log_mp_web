import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {NewInvoiceModalActionType} from "../../actionTypes";

const newInvoiceModalAction = require('../../actions/modules/NewInvoiceModalAction');

/**
 * UI组件：申请开票 模块。
 */
class NewInvoiceModal extends React.Component {

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
     * 更新 发票抬头
     */
    changeInvoiceTitle = (event) => {
        this.props.setInvoiceTitle(event.target.value);
    };

    /**
     * 更新 税号
     */
    changeCompanyTax = (event) => {
        this.props.setCompanyTax(event.target.value);
    };

    /**
     * 更新 电话号码
     */
    changeCompanyPhone = (event) => {
        this.props.setCompanyPhone(event.target.value);
    };

    /**
     * 更新 开户银行
     */
    changeBank = (event) => {
        this.props.setBank(event.target.value);
    };

    /**
     * 更新 银行账号
     */
    changeBankNum = (event) => {
        this.props.setBankNum(event.target.value);
    };

    /**
     * 更新 单位地址
     */
    changeCompanyAddress = (event) => {
        this.props.setCompanyAddress(event.target.value);
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
        const {newInvoiceModalReducer, closeModal, saveInvoice} = this.props;
        return (
            <div id="newInvoiceModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">申请开票</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-bottom10">
                        <Input s={12} label={<span><span className="must-input">*</span>发票抬头</span>} maxLength="50" value={newInvoiceModalReducer.invoiceTitle} onChange={this.changeInvoiceTitle}/>
                        <Input s={6} label={<span><span className="must-input">*</span>税号</span>} maxLength="20" value={newInvoiceModalReducer.companyTax} onChange={this.changeCompanyTax}/>
                        <Input s={6} label="电话号码" maxLength="20" value={newInvoiceModalReducer.companyPhone} onChange={this.changeCompanyPhone}/>
                        <Input s={6} label="开户银行" maxLength="20" value={newInvoiceModalReducer.bank} onChange={this.changeBank}/>
                        <Input s={6} label="银行账号" maxLength="20" value={newInvoiceModalReducer.bankNum} onChange={this.changeBankNum}/>
                        <Input s={12} label="单位地址" maxLength="100" value={newInvoiceModalReducer.companyAddress} onChange={this.changeCompanyAddress}/>
                        <Input s={12} label="备注" maxLength="200" value={newInvoiceModalReducer.remark} onChange={this.changeRemark}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveInvoice}>确定</button>
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
        newInvoiceModalReducer: state.NewInvoiceModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setInvoiceTitle: (value) => {
        dispatch(NewInvoiceModalActionType.setInvoiceTitle(value));
    },
    setCompanyTax: (value) => {
        dispatch(NewInvoiceModalActionType.setCompanyTax(value));
    },
    setCompanyPhone: (value) => {
        dispatch(NewInvoiceModalActionType.setCompanyPhone(value));
    },
    setBank: (value) => {
        dispatch(NewInvoiceModalActionType.setBank(value));
    },
    setBankNum: (value) => {
        dispatch(NewInvoiceModalActionType.setBankNum(value));
    },
    setCompanyAddress: (value) => {
        dispatch(NewInvoiceModalActionType.setCompanyAddress(value));
    },
    setRemark: (value) => {
        dispatch(NewInvoiceModalActionType.setRemark(value));
    },
    saveInvoice: () => {
        dispatch(newInvoiceModalAction.saveInvoice());
    },
    closeModal: () => {
        $('#newInvoiceModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewInvoiceModal);