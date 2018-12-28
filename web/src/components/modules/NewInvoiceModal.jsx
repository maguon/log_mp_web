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
     * 更新 收货人
     */
    changeReceiveUser = (event) => {
        this.props.setReceiveUser(event.target.value);
    };

    /**
     * 更新 联系电话
     */
    changeReceivePhone = (event) => {
        this.props.setReceivePhone(event.target.value);
    };

    /**
     * 更新 收货地址
     */
    changeReceiveAddress = (event) => {
        this.props.setReceiveAddress(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newPaymentModalReducer, closeModal, saveInvoice} = this.props;
        return (
            <div id="newInvoiceModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">申请开票</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-bottom10">
                        <Input s={12} label="发票抬头" maxLength="50" className="right-align margin-bottom10" value={newPaymentModalReducer.invoiceTitle} onChange={this.changeInvoiceTitle}/>
                        <Input s={6} label="税号" maxLength="50" className="right-align margin-bottom10" value={newPaymentModalReducer.companyTax} onChange={this.changeBankNum}/>
                        <Input s={6} label="电话号码" maxLength="50" className="right-align margin-bottom10" value={newPaymentModalReducer.companyPhone} onChange={this.changeBankNum}/>

                        <Input s={6} label="开户银行" maxLength="50" className="right-align margin-bottom10" value={newPaymentModalReducer.bank} onChange={this.changeBankNum}/>
                        <Input s={6} label="银行账号" maxLength="50" className="right-align margin-bottom10" value={newPaymentModalReducer.bankNum} onChange={this.changeBankNum}/>

                        <Input s={12} label="单位地址" maxLength="50" className="right-align margin-bottom10" value={newPaymentModalReducer.companyAddress} onChange={this.changeInvoiceTitle}/>
                        <Input s={12} label="备注" maxLength="50" className="right-align margin-bottom10" value={newPaymentModalReducer.remark} onChange={this.changeInvoiceTitle}/>
                    </div>

                    <div className="row margin-bottom0 detail-box">
                        <div className="col s12 padding-top10 padding-bottom10 custom-grey pink-font left-align padding-left20 border-bottom-line">
                            接收信息
                        </div>
                        <div className="col s12 padding-top10 padding-bottom10">
                            <Input s={6} label="收货人" maxLength="50" className="right-align margin-bottom10" value={newPaymentModalReducer.receiveUser} onChange={this.changePaymentBank}/>
                            <Input s={6} label="联系电话" maxLength="50" className="right-align margin-bottom10" value={newPaymentModalReducer.receivePhone} onChange={this.changeBankNum}/>
                            <Input s={12} label="收货地址" maxLength="50" className="right-align margin-bottom10" value={newPaymentModalReducer.receiveAddress} onChange={this.changeBankNum}/>
                        </div>
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
        newPaymentModalReducer: state.NewPaymentModalReducer
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
    setReceiveUser: (value) => {
        dispatch(NewInvoiceModalActionType.setReceiveUser(value));
    },
    setReceivePhone: (value) => {
        dispatch(NewInvoiceModalActionType.setReceivePhone(value));
    },
    setReceiveAddress: (value) => {
        dispatch(NewInvoiceModalActionType.setReceiveAddress(value));
    },
    saveInvoice: () => {
        dispatch(newInvoiceModalAction.saveInvoice());
    },
    closeModal: () => {
        $('#newInvoiceModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewInvoiceModal);