import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {CouponManagerActionType} from '../../actionTypes';
import {EditUserCouponModal} from '../modules/index';
import Select from "react-select";

const couponManagerAction = require('../../actions/main/CouponManagerAction');
const editUserCouponModalAction = require('../../actions/modules/EditUserCouponModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class CouponManager extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        this.props.setConditionNo('');
        this.props.changeConditionCouponNo(null);
        this.props.setConditionGrantUser('');
        this.props.changeConditionStatus(null);
        this.props.setConditionUserId('');
        this.props.setConditionWeChatNm('');
        this.props.setConditionCreatedOnStart('');
        this.props.setConditionCreatedOnEnd('');
        this.props.getCouponList();
        this.props.getUserCouponList();
    }

    /**
     * 更新 检索条件：领取编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：发放人
     */
    changeConditionGrantUser = (event) => {
        this.props.setConditionGrantUser(event.target.value);
    };

    /**
     * 更新 检索条件：用户编号
     */
    changeConditionUserId = (event) => {
        this.props.setConditionUserId(event.target.value);
    };

    /**
     * 更新 检索条件：昵称
     */
    changeConditionWeChatNm = (event) => {
        this.props.setConditionWeChatNm(event.target.value);
    };

    /**
     * 更新 检索条件：领取时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：领取时间(始)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 查询优惠券列表
     */
    queryUserCouponList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getUserCouponList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.couponManagerReducer.start - (this.props.couponManagerReducer.size - 1));
        this.props.getUserCouponList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.couponManagerReducer.start + (this.props.couponManagerReducer.size - 1));
        this.props.getUserCouponList();
    };

    /**
     * 显示 新建/修改优惠券信息
     */
    showEditUserCouponModal = (type, userCoupon) => {
        this.props.initUserCouponModalData(type, userCoupon);
        $('#editUserCouponModal').modal('open');
    };

    render() {
        const {couponManagerReducer, changeConditionCouponNo, changeConditionStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">优惠券领取</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">
                        <Input s={3} label="优惠券编号" value={couponManagerReducer.conditionNo} onChange={this.changeConditionNo}/>
                        <div className="input-field col s3">
                            <Select
                                options={couponManagerReducer.couponNoList}
                                onChange={changeConditionCouponNo}
                                value={couponManagerReducer.conditionCouponNo}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">优惠券</label>
                        </div>

                        <Input s={3} label="发放人" value={couponManagerReducer.conditionGrantUser} onChange={this.changeConditionGrantUser}/>
                        <div className="input-field col s3">
                            <Select
                                options={sysConst.USED_FLAG}
                                onChange={changeConditionStatus}
                                value={couponManagerReducer.conditionStatus}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">状态</label>
                        </div>

                        <Input s={3} label="用户ID" value={couponManagerReducer.conditionUserId} onChange={this.changeConditionUserId}/>
                        <Input s={3} label="昵称" value={couponManagerReducer.conditionWeChatNm} onChange={this.changeConditionWeChatNm}/>

                        <div className="input-field col s3 custom-input-field">
                            <Input s={12} label="领取时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                   value={couponManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        <div className="input-field col s3 custom-input-field">
                            <Input s={12} label="领取时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                   value={couponManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn margin-top40" onClick={this.queryUserCouponList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn add-btn margin-top40" onClick={() => {this.showEditUserCouponModal('new',null)}}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">
                        <table className="bordered striped">
                            <thead className="custom-dark-grey table-top-line">
                            <tr className="grey-text text-darken-2">
                                <th>领取编号</th>
                                <th>优惠券编号</th>
                                <th>优惠券名称</th>
                                <th>用户ID</th>
                                <th>手机</th>
                                <th>昵称</th>
                                <th>发放人</th>
                                <th>领取日期</th>
                                <th>生效日期</th>
                                <th>无效日期</th>
                                <th>门槛费用</th>
                                <th>金额(元)</th>
                                <th>状态</th>
                                <th className="right-align padding-right30">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                                {couponManagerReducer.userCouponArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.coupon_id}</td>
                                        <td>{item.coupon_name}</td>
                                        <td>{item.user_id}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.user_name}</td>
                                        <td>{item.admin_name}</td>
                                        <td>{formatUtil.getDate(item.created_on)}</td>
                                        <td>{formatUtil.getDate(item.start_date)}</td>
                                        <td>{formatUtil.getDate(item.end_date)}</td>
                                        <td>{formatUtil.formatNumber(item.floor_price, 2)}</td>
                                        <td>{formatUtil.formatNumber(item.price, 2)}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.USED_FLAG, item.status)}</td>
                                        <td className="operation right-align padding-right20">
                                            <i className="mdi mdi-table-search purple-font pointer" onClick={() => {this.showEditUserCouponModal('edit',item)}}/>
                                        </td>
                                    </tr>
                                )
                            },this)}
                            { couponManagerReducer.userCouponArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="14">暂无数据</td>
                            </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {couponManagerReducer.start > 0 && couponManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {couponManagerReducer.dataSize >= couponManagerReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                下一页
                            </a>}
                        </div>
                    </div>
                </div>
                <EditUserCouponModal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        couponManagerReducer: state.CouponManagerReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCouponList: () => {
        dispatch(couponManagerAction.getCouponList())
    },
    getUserCouponList: () => {
        dispatch(couponManagerAction.getUserCouponList())
    },
    setStartNumber: (start) => {
        dispatch(CouponManagerActionType.setStartNumber(start))
    },
    setConditionNo: (value) => {
        dispatch(CouponManagerActionType.setConditionNo(value))
    },
    changeConditionCouponNo: (value) => {
        dispatch(CouponManagerActionType.setConditionCouponNo(value))
    },
    setConditionGrantUser: (value) => {
        dispatch(CouponManagerActionType.setConditionGrantUser(value))
    },
    changeConditionStatus: (value) => {
        dispatch(CouponManagerActionType.setConditionStatus(value))
    },
    setConditionUserId: (value) => {
        dispatch(CouponManagerActionType.setConditionUserId(value))
    },
    setConditionWeChatNm: (value) => {
        dispatch(CouponManagerActionType.setConditionWeChatNm(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(CouponManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(CouponManagerActionType.setConditionCreatedOnEnd(value))
    },
    initUserCouponModalData: (type, userCoupon) => {
        dispatch(editUserCouponModalAction.initEditUserCouponModal(type, userCoupon));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponManager)