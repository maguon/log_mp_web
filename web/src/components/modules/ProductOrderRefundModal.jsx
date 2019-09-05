import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {RefuseRefundModalActionType} from "../../actionTypes";

const refuseRefundModalAction = require('../../actions/modules/RefuseRefundModalAction');
const formatUtil = require('../../util/FormatUtil');

/**
 * UI组件：拒绝退款 模块。
 */
class RefuseRefundModal extends React.Component {

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
        const {refuseRefundModalReducer, closeModal, refuseRefund} = this.props;
        return (
            <div id="refuseRefundModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">退款</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top20">
                        <div className="col s12">
                            <Input s={12} label="退款金额(元)" type="number" value={refuseRefundModalReducer.refundRemark} onChange={this.changeRefuseReason}/>
                        </div>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={refuseRefund}>确定</button>
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
        refuseRefundModalReducer: state.RefuseRefundModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setRefuseReason: (value) => {
        dispatch(RefuseRefundModalActionType.setRefuseReason(value))
    },
    refuseRefund: () => {
        dispatch(refuseRefundModalAction.refuseRefund())
    },
    closeModal: () => {
        $('#refuseRefundModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RefuseRefundModal);