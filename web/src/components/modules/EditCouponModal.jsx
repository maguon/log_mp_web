import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {EditCouponModalActionType} from "../../actionTypes";
import Select from "react-select";

const editCouponModalAction = require('../../actions/modules/EditCouponModalAction');
const sysConst = require('../../util/SysConst');
const commonUtil = require('../../util/CommonUtil');

/**
 * UI组件：新建/修改 优惠券信息 模块。
 */
class EditCouponModal extends React.Component {

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
     * 更新 名称
     */
    changeCouponName = (event) => {
        this.props.setCouponName(event.target.value);
    };

    /**
     * 更新 门槛金额
     */
    changeThreshold = (event) => {
        this.props.setCouponThreshold(event.target.value);
    };

    /**
     * 更新 金额
     */
    changeCouponAmount = (event) => {
        this.props.setCouponAmount(event.target.value);
    };

    /**
     * 更新 有效天数
     */
    changeEffectiveDays = (event) => {
        this.props.setEffectiveDays(event.target.value);
    };

    /**
     * 更新 有效日期(始)
     */
    changeValidityPeriodStart = (event) => {
        this.props.setValidityPeriodStart(event.target.value);
    };

    /**
     * 更新 有效日期(终)
     */
    changeValidityPeriodEnd = (event) => {
        this.props.setValidityPeriodEnd(event.target.value);
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
        const {editCouponModalReducer, closeModal, changeValidityPeriodType, saveCoupon} = this.props;
        return (
            <div id="editCouponModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">{editCouponModalReducer.couponId === '' ? '新增优惠券' : '优惠券详情'}</div>

                {/** Modal主体 */}
                <div className="modal-content padding-bottom0 white grey-text text-darken-2">
                    {/* 优惠券详情 信息 */}
                    {editCouponModalReducer.couponId !== '' &&
                    <div className="row detail-box custom-dark-grey">
                        <div className="col s12">
                            <div className="col s6 pink-font fz36">{editCouponModalReducer.couponId}</div>
                            <div className="col s6 right-align padding-top10">{commonUtil.getJsonValue(sysConst.USE_FLAG, editCouponModalReducer.couponStatus)}</div>
                        </div>
                        <div className="col s12 right-align">使用/领取<span className="pink-font fz36 padding-left10">TODO/TODO</span></div>
                    </div>}

                    <div className="row margin-top30">
                        <Input s={4} label="名称" maxLength="20" value={editCouponModalReducer.couponName} onChange={this.changeCouponName}/>
                        <Input s={4} label="门槛金额" className="right-align" type="number" value={editCouponModalReducer.threshold} onChange={this.changeThreshold}/>
                        <Input s={4} label="金额 ( 元 )" className="right-align pink-font" type="number" value={editCouponModalReducer.couponAmount} onChange={this.changeCouponAmount}/>

                        <div className="input-field col s4">
                            <Select
                                options={sysConst.VALIDITY_PERIOD_TYPE}
                                onChange={changeValidityPeriodType}
                                value={editCouponModalReducer.validityPeriodType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                            />
                            <label className="active">有效期类型</label>
                        </div>

                        {editCouponModalReducer.validityPeriodType.value === sysConst.VALIDITY_PERIOD_TYPE[0].value &&
                        <Input s={4} label="天数" className="right-align" type="number" value={editCouponModalReducer.effectiveDays} onChange={this.changeEffectiveDays}/>}

                        {editCouponModalReducer.validityPeriodType.value === sysConst.VALIDITY_PERIOD_TYPE[1].value &&
                        <div>
                            <div className="input-field col s4 custom-input-field">
                                <Input s={12} label="起始日期" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={editCouponModalReducer.validityPeriodStart} onChange={this.changeValidityPeriodStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            <div className="input-field col s4 custom-input-field">
                                <Input s={12} label="终止日期" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={editCouponModalReducer.validityPeriodEnd} onChange={this.changeValidityPeriodEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>
                        </div>}

                        <Input s={12} label="备注" maxLength="50" value={editCouponModalReducer.remark} onChange={this.changeRemark}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    {editCouponModalReducer.couponStatus !== sysConst.USE_FLAG[0].value &&
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveCoupon}>确定</button>}
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
        editCouponModalReducer: state.EditCouponModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setCouponName: (value) => {
        dispatch(EditCouponModalActionType.setCouponName(value));
    },
    setCouponThreshold: (value) => {
        dispatch(EditCouponModalActionType.setCouponThreshold(value));
    },
    setCouponAmount: (value) => {
        dispatch(EditCouponModalActionType.setCouponAmount(value));
    },
    changeValidityPeriodType: (value) => {
        dispatch(EditCouponModalActionType.setValidityPeriodType(value))
    },
    setEffectiveDays: (value) => {
        dispatch(EditCouponModalActionType.setEffectiveDays(value));
    },
    setValidityPeriodStart: (value) => {
        dispatch(EditCouponModalActionType.setValidityPeriodStart(value));
    },
    setValidityPeriodEnd: (value) => {
        dispatch(EditCouponModalActionType.setValidityPeriodEnd(value));
    },
    setRemark: (value) => {
        dispatch(EditCouponModalActionType.setRemark(value));
    },

    saveCoupon: () => {
        dispatch(editCouponModalAction.saveCoupon());
    },
    closeModal: () => {
        $('#editCouponModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCouponModal);