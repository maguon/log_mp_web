import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {EditUserCouponModalActionType} from "../../actionTypes";
import Select from "react-select";

const editUserCouponModalAction = require('../../actions/modules/EditUserCouponModalAction');
const sysConst = require('../../util/SysConst');
const commonUtil = require('../../util/CommonUtil');
const formatUtil = require('../../util/FormatUtil');

/**
 * UI组件：新建/显示 专属优惠券信息 模块。
 */
class EditUserCouponModal extends React.Component {

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
     * 更新 接收人手机号
     */
    changeUserPhone = (event) => {
        this.props.setUserPhone(event.target.value);
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
        const {editUserCouponModalReducer, commonReducer, closeModal, changeValidityPeriodType, addCouponUser, delCouponUser, showOrderInfo, saveCoupon} = this.props;
        return (
            <div id="editUserCouponModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">{editUserCouponModalReducer.couponId === '' ? '新增专属优惠券' : '优惠券领取详情'}</div>

                {/** Modal主体 */}
                <div className="modal-content padding-bottom0 white grey-text text-darken-2">
                    {/* 优惠券领取详情 */}
                    {editUserCouponModalReducer.userCouponId !== '' &&
                    <div>
                        <div className="row">
                            <div className="col s8 purple-font">领取编号：{editUserCouponModalReducer.userCouponId}</div>
                            <div className="col s4 right-align pink-font">{commonUtil.getJsonValue(sysConst.USED_FLAG, editUserCouponModalReducer.userCouponInfo.status)}</div>
                        </div>

                        <div className="row detail-box custom-dark-grey padding-top10 padding-bottom10 margin-left10 margin-right10">
                            <div className="col s12">用户ID：{editUserCouponModalReducer.userCouponInfo.user_id}</div>
                            <div className="col s12 margin-top10">
                                <div className="col s6 padding-left0 pink-font fz18">{editUserCouponModalReducer.userCouponInfo.user_name}</div>
                                <div className="col s6 padding-right0 right-align">绑定手机号：{editUserCouponModalReducer.userCouponInfo.phone}</div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s8">
                                <div>优惠券编号：{editUserCouponModalReducer.userCouponInfo.coupon_id}</div>
                                <div className="fz18 pink-font margin-top10">{editUserCouponModalReducer.userCouponInfo.coupon_name}</div>
                                <div className="margin-top10">领取时间：{formatUtil.getDate(editUserCouponModalReducer.userCouponInfo.created_on)}</div>
                                <div className="margin-top10">创建人：{editUserCouponModalReducer.userCouponInfo.admin_name}</div>
                            </div>
                            <div className="col s4 right-align">
                                <div><span className="pink-font fz24">{formatUtil.formatNumber(editUserCouponModalReducer.userCouponInfo.price, 2)}</span>元</div>
                                <div className="margin-top10">门槛费用：{formatUtil.formatNumber(editUserCouponModalReducer.userCouponInfo.floor_price, 2)}元</div>
                                <div className="margin-top10">有效期：{formatUtil.getDate(editUserCouponModalReducer.userCouponInfo.start_date)} 至 {formatUtil.getDate(editUserCouponModalReducer.userCouponInfo.end_date)}</div>
                            </div>
                            <div className="col s12 margin-top10">备注：{editUserCouponModalReducer.userCouponInfo.remarks}</div>

                            {/* 分割线 */}
                            <div className="col s12 margin-top10"><div className="col s12 margin-top10 divider"/></div>
                        </div>

                        <div className="row margin-top30">
                            <div className="col s12 no-padding pink-font">
                                <div className="col s6 fz16">订单信息</div>
                                <div className="col s6 right-align">
                                    <span className="margin-left20 pink-font pointer" onClick={showOrderInfo}>
                                        详情 {editUserCouponModalReducer.showOrderInfoFlag ? <i className="mdi mdi-chevron-up fz15"/> : <i className="mdi mdi-chevron-down fz15"/>}
                                    </span>
                                </div>
                            </div>

                            {/* 分割线 */}
                            {!editUserCouponModalReducer.showOrderInfoFlag &&
                            <div className="col s12 margin-top10"><div className="col s12 margin-top10 divider"/></div>}

                            {editUserCouponModalReducer.showOrderInfoFlag && commonReducer.orderInfo.length > 0 &&
                            <div className="col s12 no-padding margin-top10 detail-box z-depth-1">

                                <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                    <div className="col s6 purple-font">
                                        {commonUtil.getJsonValue(sysConst.ORDER_TYPE, commonReducer.orderInfo[0].created_type)}
                                        <span className="margin-left10 grey-text">编号：{commonReducer.orderInfo[0].id}</span>
                                    </div>
                                    {/* 订单状态 */}
                                    <div className="col s6 pink-font right-align">
                                        {commonUtil.getJsonValue(sysConst.ORDER_STATUS, commonReducer.orderInfo[0].status)}
                                    </div>
                                </div>
                                <div className="col s12 padding-top15">
                                    <div className="col s6">
                                        {/* 线路 */}
                                        <span className="fz18 purple-font">{commonReducer.orderInfo[0].start_city} - {commonReducer.orderInfo[0].end_city}</span>
                                        {/* 服务类型 */}
                                        <span className="margin-left30">{commonUtil.getJsonValue(sysConst.SERVICE_MODE, commonReducer.orderInfo[0].service_type)}</span>
                                        <span className="margin-left30">运输车辆：{formatUtil.formatNumber(commonReducer.orderInfo[0].car_num)}</span>
                                    </div>
                                    <div className="col s6 right-align">发运日期：{formatUtil.getDate(commonReducer.orderInfo[0].departure_time)}</div>
                                </div>
                                <div className="col s12 padding-top10">
                                    <div className="col s6">创建人：{commonReducer.orderInfo[0].admin_name}</div>
                                    <div className="col s6 right-align">创建时间：{formatUtil.getDateTime(commonReducer.orderInfo[0].created_on)}</div>
                                </div>
                                <div className="col s12 padding-top10 padding-bottom10 border-bottom-dotted-line">
                                    <div className="col s4">
                                        运费：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.orderInfo[0].total_trans_price, 2)}</span> 元
                                    </div>
                                    <div className="col s4">
                                        保费：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.orderInfo[0].total_insure_price, 2)}</span> 元
                                    </div>
                                    <div className="col s4 right-align">
                                        订单金额：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.orderInfo[0].total_trans_price + commonReducer.orderInfo[0].total_insure_price, 2)}</span> 元
                                    </div>
                                </div>

                                {/* 支付信息 */}
                                {commonReducer.paymentInfo.length > 0 &&
                                <div className="col s12 padding-top15 padding-bottom15">
                                    <div className="col s6">支付编号：{commonReducer.paymentInfo[0].id}</div>
                                    <div className="col s6 right-align">支付方式：{commonUtil.getJsonValue(sysConst.PAYMENT_MODE, commonReducer.paymentInfo[0].payment_type)}</div>
                                    <div className="col s6 margin-top10">支付时间：{formatUtil.getDateTime(commonReducer.paymentInfo[0].created_on)}</div>
                                    <div className="col s6 margin-top10 right-align">实付金额：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.paymentInfo[0].total_fee, 2)}</span> 元</div>
                                </div>}
                            </div>}
                        </div>
                    </div>}

                    {/* 新增专属优惠券 */}
                    {editUserCouponModalReducer.userCouponId === '' &&
                    <div>
                        {/* 接收人手机号 */}
                        <div className="row margin-bottom0 position-relative">
                            {editUserCouponModalReducer.userInfo.length === 0 &&
                            <Input s={12} label="接收人手机号" value={editUserCouponModalReducer.userPhone} onChange={this.changeUserPhone}/>}
                            {editUserCouponModalReducer.userInfo.length > 0 &&
                            <Input s={12} label="接收人手机号" value={editUserCouponModalReducer.userPhone} disabled/>}
                            {/* 添加用户信息 按钮 */}
                            {editUserCouponModalReducer.userInfo.length === 0 &&
                            <i className="mdi mdi-checkbox-marked-circle confirm-icon fz30 purple-font pointer" onClick={addCouponUser}/>}
                        </div>

                        {/* 用户信息 */}
                        {editUserCouponModalReducer.userInfo.length > 0 &&
                        <div className="row detail-box custom-dark-grey margin-left10 margin-right10 padding-top10 padding-bottom5">
                            <div className="col s10">
                                用户ID：{editUserCouponModalReducer.userInfo[0].id}
                                <span className="margin-left30">昵称：{editUserCouponModalReducer.userInfo[0].wechat_name}</span>
                            </div>
                            <div className="col s2 right-align">
                                <i className="mdi mdi-close pink-font pointer fz18" onClick={delCouponUser}/>
                            </div>
                        </div>}

                        <div className="row margin-top30">
                            <Input s={6} label="金额 ( 元 )" className="right-align pink-font" type="number" value={editUserCouponModalReducer.couponAmount} onChange={this.changeCouponAmount}/>
                            <Input s={6} label="门槛金额" className="right-align" type="number" value={editUserCouponModalReducer.threshold} onChange={this.changeThreshold}/>

                            <div className="input-field col s6">
                                <Select
                                    options={sysConst.VALIDITY_PERIOD_TYPE}
                                    onChange={changeValidityPeriodType}
                                    value={editUserCouponModalReducer.validityPeriodType}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                                <label className="active">有效期类型</label>
                            </div>

                            {editUserCouponModalReducer.validityPeriodType.value === sysConst.VALIDITY_PERIOD_TYPE[0].value &&
                            <Input s={6} label="天数" className="right-align" type="number" value={editUserCouponModalReducer.effectiveDays} onChange={this.changeEffectiveDays}/>}

                            {editUserCouponModalReducer.validityPeriodType.value === sysConst.VALIDITY_PERIOD_TYPE[1].value &&
                            <div>
                                <div className="input-field col s3 custom-input-field">
                                    <Input s={12} label="起始日期" type='date' options={sysConst.DATE_PICKER_OPTION}
                                           value={editUserCouponModalReducer.validityPeriodStart} onChange={this.changeValidityPeriodStart} />
                                    <span className="mdi data-icon mdi-table-large"/>
                                </div>

                                <div className="input-field col s3 custom-input-field">
                                    <Input s={12} label="终止日期" type='date' options={sysConst.DATE_PICKER_OPTION}
                                           value={editUserCouponModalReducer.validityPeriodEnd} onChange={this.changeValidityPeriodEnd} />
                                    <span className="mdi data-icon mdi-table-large"/>
                                </div>
                            </div>}

                            <Input s={12} label="备注" maxLength="50" value={editUserCouponModalReducer.remark} onChange={this.changeRemark}/>
                        </div>
                    </div>}
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                {editUserCouponModalReducer.userCouponId === '' &&
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button"
                            className={`btn confirm-btn margin-left20 ${editUserCouponModalReducer.userInfo.length > 0 ? '' : 'disabled'}`}
                            onClick={saveCoupon}>确定</button>
                </div>}

                {editUserCouponModalReducer.userCouponId !== '' &&
                <div className="modal-footer">
                    <button type="button" className="btn confirm-btn" onClick={closeModal}>确定</button>
                </div>}
            </div>
        );
    }
}

/**
 * 输入逻辑：外部的数据（即state对象）转换为 UI 组件的参数。
 */
const mapStateToProps = (state) => {
    return {
        editUserCouponModalReducer: state.EditUserCouponModalReducer,
        commonReducer: state.CommonReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setUserPhone: (value) => {
        dispatch(EditUserCouponModalActionType.setUserPhone(value));
    },
    setCouponThreshold: (value) => {
        dispatch(EditUserCouponModalActionType.setCouponThreshold(value));
    },
    setCouponAmount: (value) => {
        dispatch(EditUserCouponModalActionType.setCouponAmount(value));
    },
    changeValidityPeriodType: (value) => {
        dispatch(EditUserCouponModalActionType.setValidityPeriodType(value))
    },
    setEffectiveDays: (value) => {
        dispatch(EditUserCouponModalActionType.setEffectiveDays(value));
    },
    setValidityPeriodStart: (value) => {
        dispatch(EditUserCouponModalActionType.setValidityPeriodStart(value));
    },
    setValidityPeriodEnd: (value) => {
        dispatch(EditUserCouponModalActionType.setValidityPeriodEnd(value));
    },
    setRemark: (value) => {
        dispatch(EditUserCouponModalActionType.setRemark(value));
    },
    showOrderInfo: () => {
        dispatch(editUserCouponModalAction.showOrderInfo());
    },
    addCouponUser: () => {
        dispatch(editUserCouponModalAction.addCouponUser());
    },
    delCouponUser: () => {
        dispatch(EditUserCouponModalActionType.setUserInfo([]));
    },
    saveCoupon: () => {
        dispatch(editUserCouponModalAction.saveCoupon());
    },
    closeModal: () => {
        $('#editUserCouponModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserCouponModal);