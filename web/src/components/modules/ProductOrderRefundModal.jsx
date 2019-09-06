import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {ProductOrderRefundModalActionType} from "../../actionTypes";

const productOrderRefundModalAction = require('../../actions/modules/ProductOrderRefundModalAction');

/**
 * UI组件：商品退款 模块。
 */
class ProductOrderRefundModal extends React.Component {

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
     * 更新 退款金额
     */
    changeRefundFee = (event) => {
        this.props.setRefundFee(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {productOrderRefundModalReducer, closeModal, refuseRefund} = this.props;
        return (
            <div id="productOrderRefundModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">退款</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top20">
                        <div className="col s12">
                            <Input s={12} label="退款金额(元)" type="number" value={productOrderRefundModalReducer.refundFee} onChange={this.changeRefundFee}/>
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
        productOrderRefundModalReducer: state.ProductOrderRefundModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setRefundFee: (value) => {
        dispatch(ProductOrderRefundModalActionType.setRefundFee(value))
    },
    refuseRefund: () => {
        dispatch(productOrderRefundModalAction.productOrderRefund())
    },
    closeModal: () => {
        $('#productOrderRefundModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrderRefundModal);