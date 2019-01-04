import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {ConfirmRefundModalActionType} from "../../actionTypes";

const confirmRefundModalAction = require('../../actions/modules/ConfirmRefundModalAction');
const formatUtil = require('../../util/FormatUtil');

/**
 * UI组件：退款信息(同意退款) 模块。
 */
class ConfirmRefundModal extends React.Component {

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
    changeRefundMoney = (event) => {
        this.props.setRefundMoney(event.target.value);
    };

    /**
     * 更新 退款描述
     */
    changeRefundRemark = (event) => {
        this.props.setRefundRemark(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {confirmRefundModalReducer, closeModal, confirmRefund} = this.props;
        return (
            <div id="confirmRefundModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">退款信息</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top20">
                        <div className="col s12">
                            <div className="col input-field s6">
                                <div className="col s12 custom-label-field grey-text left-align">
                                    申请金额：
                                    {confirmRefundModalReducer.refundApplyInfo != null &&
                                    <span className="fz16 pink-font">{formatUtil.formatNumber(confirmRefundModalReducer.refundApplyInfo.apply_fee,2)}</span>} 元
                                </div>
                            </div>
                            <Input s={6} label="退款金额 ( 元 )" className="right-align pink-font" type="number" value={confirmRefundModalReducer.refundMoney} onChange={this.changeRefundMoney}/>
                        </div>

                        <div className="col s12">
                            <Input s={12} label="退款描述" maxLength="200" value={confirmRefundModalReducer.refundRemark} onChange={this.changeRefundRemark}/>
                        </div>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={confirmRefund}>确定</button>
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
        confirmRefundModalReducer: state.ConfirmRefundModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setRefundMoney: (value) => {
        dispatch(ConfirmRefundModalActionType.setRefundMoney(value))
    },
    setRefundRemark: (value) => {
        dispatch(ConfirmRefundModalActionType.setRefundRemark(value))
    },
    confirmRefund: () => {
        dispatch(confirmRefundModalAction.confirmRefund())
    },
    closeModal: () => {
        $('#confirmRefundModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRefundModal);