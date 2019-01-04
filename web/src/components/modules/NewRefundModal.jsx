import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {NewRefundModalActionType} from "../../actionTypes";

const NewRefundModalAction = require('../../actions/modules/NewRefundModalAction');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');
const sysConst = require('../../util/SysConst');

/**
 * UI组件：申请退款 模块。
 */
class NewRefundModal extends React.Component {

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
     * 更新 申请金额
     */
    changeRefundFee = (event) => {
        this.props.setRefundFee(event.target.value);
    };

    /**
     * 更新 退款账户
     */
    changePaymentId = (orderItem) => {
        this.props.setSelectedItem(orderItem);
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
        const {newRefundModalReducer, closeModal, saveRefund} = this.props;
        return (
            <div id="newRefundModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">申请退款</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">

                    <div className="row margin-top20">
                        <Input s={12} label="申请金额 ( 元 )" type="number" value={newRefundModalReducer.refundFee} onChange={this.changeRefundFee}/>
                    </div>

                    <div className="row margin-bottom0">
                        <div className="col s12 pink-font fz16">选择退回的一笔支付</div>
                        <div className="col s12"><div className="col s12 margin-top5 divider grey-divider"/></div>
                    </div>

                    <div className="row">
                        {newRefundModalReducer.paymentArray.map(function (item) {
                            return (
                                <div className="col s12 grey-text text-darken-1">
                                    <input type="radio" name="payment" id={`index${item.id}`} className='with-gap select-payment' onChange={() => {this.changePaymentId(item)}}/>
                                    <label className="col s12 margin-top10 height-35 border-bottom-line" htmlFor={`index${item.id}`}>
                                        <div className="col s6 no-padding">{item.bank} {item.bank_code} {item.account_name}</div>
                                        <div className="col s3 no-padding">支付时间：{formatUtil.getDateTime(item.created_on)}</div>
                                        <div className="col s3 no-padding right-align">支付金额：{formatUtil.formatNumber(item.total_fee,2)} 元</div>
                                    </label>
                                </div>
                            )
                        }, this)}
                    </div>

                    <div className="row margin-bottom0">
                        <Input s={12} label="申请原因" maxLength="50" value={newRefundModalReducer.remark} onChange={this.changeRemark}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveRefund}>确定</button>
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
        newRefundModalReducer: state.NewRefundModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setRefundFee: (value) => {
        dispatch(NewRefundModalActionType.setRefundFee(value));
    },
    setSelectedItem: (value) => {
        dispatch(NewRefundModalActionType.setSelectedItem(value));
    },
    setRemark: (value) => {
        dispatch(NewRefundModalActionType.setRemark(value));
    },
    saveRefund: () => {
        dispatch(NewRefundModalAction.saveRefund());
    },
    closeModal: () => {
        $('#newRefundModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRefundModal);