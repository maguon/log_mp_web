import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {NewOfferModalActionType} from "../../actionTypes";

const newOfferModalAction = require('../../actions/modules/NewOfferModalAction');
const formatUtil = require('../../util/FormatUtil');

class NewOfferModal extends React.Component {

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
     * 更新 协商运费
     */
    changeFeePrice = (event) => {
        this.props.setFeePrice(event.target.value);
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
        const {newOfferModalReducer, closeModal, saveOffer} = this.props;
        return (
            <div id="newOfferModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">报价</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top30">
                        <div className="col input-field s6">
                            <div className="col s12 custom-label-field grey-text">
                                预计运费：<span className="fz16 pink-font">{formatUtil.formatNumber(newOfferModalReducer.freight,2)}</span> 元
                            </div>
                        </div>
                        <Input s={6} label="协商运费(元)" type="number" maxLength="10" value={newOfferModalReducer.feePrice} onChange={this.changeFeePrice}/>

                        <div className="col s12 margin-top20">
                            <div className="col s12 detail-box no-padding min-height50">
                                <Input s={12} type='textarea' placeholder="协商描述" className="no-border-bottom" maxLength="200" value={newOfferModalReducer.remark} onChange={this.changeRemark}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveOffer}>确定</button>
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
        newOfferModalReducer: state.NewOfferModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setFeePrice: (value) => {
        dispatch(NewOfferModalActionType.setFeePrice(value))
    },
    setRemark: (value) => {
        dispatch(NewOfferModalActionType.setRemark(value))
    },
    saveOffer: () => {
        dispatch(newOfferModalAction.saveOffer())
    },
    closeModal: () => {
        $('#newOfferModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewOfferModal);