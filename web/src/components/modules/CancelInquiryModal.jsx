import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {CancelInquiryModalActionType} from "../../actionTypes";

const cancelInquiryModalAction = require('../../actions/modules/CancelInquiryModalAction');
const formatUtil = require('../../util/FormatUtil');

class CancelInquiryModal extends React.Component {

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
     * 更新 备注
     */
    changeRemark = (event) => {
        this.props.setRemark(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {cancelInquiryModalReducer, closeModal, cancelInquiry} = this.props;
        return (
            <div id="cancelInquiryModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">取消询价</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">

                    <div className="row margin-top30 grey-text margin-bottom10">
                        <div className="col s3">预计运费：<span className="fz16 pink-font">{formatUtil.formatNumber(cancelInquiryModalReducer.freight,2)}</span> 元</div>
                        <div className="col s4 right-align">预计保费：<span className="fz16 pink-font">{formatUtil.formatNumber(cancelInquiryModalReducer.insuranceFee,2)}</span> 元</div>
                        <div className="col s5 right-align">预计总费用：<span className="fz16 pink-font">{formatUtil.formatNumber(cancelInquiryModalReducer.freight + cancelInquiryModalReducer.insuranceFee,2)}</span> 元</div>
                    </div>
                    <div className="row"><div className="col s12"><div className="col s12 margin-top3 dotted-line"/></div></div>

                    <div className="row margin-top30 grey-text margin-bottom10">
                        <div className="col s3">协商运费：<span className="fz16 pink-font">{formatUtil.formatNumber(cancelInquiryModalReducer.actFreight,2)}</span> 元</div>
                        <div className="col s4 right-align">协商保费：<span className="fz16 pink-font">{formatUtil.formatNumber(cancelInquiryModalReducer.actInsuranceFee,2)}</span> 元</div>
                        <div className="col s5 right-align">协商总费用：<span className="fz16 pink-font">{formatUtil.formatNumber(cancelInquiryModalReducer.actFreight + cancelInquiryModalReducer.actInsuranceFee,2)}</span> 元</div>
                    </div>
                    <div className="row"><div className="col s12"><div className="col s12 margin-top3 dotted-line"/></div></div>

                    <div className="row">
                        <Input s={12} label="取消原因" maxLength="200" value={cancelInquiryModalReducer.remark} onChange={this.changeRemark}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={cancelInquiry}>确定</button>
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
        cancelInquiryModalReducer: state.CancelInquiryModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setRemark: (value) => {
        dispatch(CancelInquiryModalActionType.setRemark(value))
    },
    cancelInquiry: () => {
        dispatch(cancelInquiryModalAction.cancelInquiry())
    },
    closeModal: () => {
        $('#cancelInquiryModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CancelInquiryModal);