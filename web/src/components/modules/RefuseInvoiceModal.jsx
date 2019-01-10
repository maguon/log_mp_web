import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {RefuseInvoiceModalActionType} from "../../actionTypes";

const refuseInvoiceModalAction = require('../../actions/modules/RefuseInvoiceModalAction');

/**
 * UI组件：拒绝开票 模块。
 */
class RefuseInvoiceModal extends React.Component {

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
     * 更新 拒绝原因
     */
    changeRefuseReason = (event) => {
        this.props.setRefuseReason(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {refuseInvoiceModalReducer, closeModal, refuseInvoice} = this.props;
        return (
            <div id="refuseInvoiceModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">拒绝开票</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top40">
                        <div className="col s12">
                            <Input s={12} label="拒绝原因" maxLength="200" value={refuseInvoiceModalReducer.refundRemark} onChange={this.changeRefuseReason}/>
                        </div>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={refuseInvoice}>确定</button>
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
        refuseInvoiceModalReducer: state.RefuseInvoiceModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setRefuseReason: (value) => {
        dispatch(RefuseInvoiceModalActionType.setRefuseReason(value))
    },
    refuseInvoice: () => {
        dispatch(refuseInvoiceModalAction.refuseInvoice())
    },
    closeModal: () => {
        $('#refuseInvoiceModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RefuseInvoiceModal);