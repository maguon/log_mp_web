import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {ConfirmPaymentModalActionType} from "../../actionTypes";

const confirmPaymentModalAction = require('../../actions/modules/ConfirmPaymentModalAction');

/**
 * UI组件：支付审核 模块。
 */
class ConfirmPaymentModal extends React.Component {

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
     * 更新 金额
     */
    changePaymentMoney = (event) => {
        this.props.setPaymentMoney(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {confirmPaymentModalReducer, closeModal, confirmPayment} = this.props;
        return (
            <div id="confirmPaymentModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">支付审核</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top30">
                        <div className="col s12 margin-top20">
                            <div className="col s12 no-padding min-height50">
                                <Input s={12} label="金额 ( 元 )" className="right-align pink-font" type="number" value={confirmPaymentModalReducer.paymentMoney} onChange={this.changePaymentMoney}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={confirmPayment}>确定</button>
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
        confirmPaymentModalReducer: state.ConfirmPaymentModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setPaymentMoney: (value) => {
        dispatch(ConfirmPaymentModalActionType.setPaymentMoney(value))
    },
    confirmPayment: () => {
        dispatch(confirmPaymentModalAction.confirmPayment())
    },
    closeModal: () => {
        $('#confirmPaymentModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPaymentModal);