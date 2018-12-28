import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {NewPaymentModalActionType} from "../../actionTypes";

const newPaymentModalAction = require('../../actions/modules/NewPaymentModalAction');
const formatUtil = require('../../util/FormatUtil');

/**
 * UI组件：支付 模块。
 */
class NewPaymentModal extends React.Component {

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
     * 更新 付款银行
     */
    changePaymentBank = (event) => {
        this.props.setPaymentBank(event.target.value);
    };

    /**
     * 更新 银行账号
     */
    changeBankNum = (event) => {
        this.props.setBankNum(event.target.value);
    };

    /**
     * 更新 户主姓名
     */
    changeBankUser = (event) => {
        this.props.setBankUser(event.target.value);
    };

    /**
     * 更新 本次支付
     */
    changePaymentFee = (event) => {
        this.props.setPaymentFee(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newPaymentModalReducer, closeModal, savePayment} = this.props;
        return (
            <div id="newPaymentModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">支付</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">

                    <div className="row margin-top20 detail-box">
                        <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                            <div className="col s3">
                                应付运费：<span className="fz16 pink-font">{formatUtil.formatNumber(newPaymentModalReducer.freight,2)}</span> 元
                            </div>
                            <div className="col s3">
                                应付保费：<span className="fz16 pink-font">{formatUtil.formatNumber(newPaymentModalReducer.insuranceFee,2)}</span> 元
                            </div>
                            <div className="col s3">
                                应付总额：<span className="fz16 pink-font">{formatUtil.formatNumber(newPaymentModalReducer.totalFee,2)}</span> 元
                            </div>
                            <div className="col s3 right-align">
                                剩余应付：<span className="fz16 pink-font">{formatUtil.formatNumber(newPaymentModalReducer.leftPayment,2)}</span> 元
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <Input s={6} label="付款银行" maxLength="50" value={newPaymentModalReducer.paymentBank} onChange={this.changePaymentBank}/>
                        <Input s={6} label="银行账号" maxLength="50" value={newPaymentModalReducer.bankNum} onChange={this.changeBankNum}/>
                    </div>

                    <div className="row margin-bottom0">
                        <Input s={6} label="户主姓名" maxLength="50" value={newPaymentModalReducer.bankUser} onChange={this.changeBankUser}/>
                        <Input s={6} label="本次支付" maxLength="50" value={newPaymentModalReducer.paymentFee} onChange={this.changePaymentFee}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={savePayment}>确定</button>
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
    setPaymentBank: (value) => {
        dispatch(NewPaymentModalActionType.setPaymentBank(value));
    },
    setBankNum: (value) => {
        dispatch(NewPaymentModalActionType.setBankNum(value));
    },
    setBankUser: (value) => {
        dispatch(NewPaymentModalActionType.setBankUser(value));
    },
    setPaymentFee: (value) => {
        dispatch(NewPaymentModalActionType.setPaymentFee(value));
    },
    savePayment: () => {
        dispatch(newPaymentModalAction.savePayment());
    },
    closeModal: () => {
        $('#newPaymentModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPaymentModal);