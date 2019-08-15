import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {CouponSettingActionType} from '../../actionTypes';
import {EditCouponModal} from '../modules/index';
import Select from "react-select";

const couponSettingAction = require('../../actions/main/CouponSettingAction');
const editCouponModalAction = require('../../actions/modules/EditCouponModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class CouponSetting extends React.Component {

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
        this.props.changeConditionStatus(null);
        this.props.getCouponList();
    }

    /**
     * 更新 检索条件：优惠券编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 查询优惠券列表
     */
    queryCouponList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getCouponList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.couponSettingReducer.start - (this.props.couponSettingReducer.size - 1));
        this.props.getCouponList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.couponSettingReducer.start + (this.props.couponSettingReducer.size - 1));
        this.props.getCouponList();
    };

    /**
     * 显示 新建/修改优惠券信息
     */
    showEditCouponModal = (type, companyBank) => {
        this.props.initCouponModalData(type, companyBank);
        $('#editCouponModal').modal('open');
    };

    render() {
        const {couponSettingReducer, changeConditionStatus, changeStatus, deleteCoupon} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">优惠券设置</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">
                        <Input s={3} label="优惠券编号" value={couponSettingReducer.conditionNo} onChange={this.changeConditionNo}/>

                        <div className="input-field col s3">
                            <Select
                                options={sysConst.USE_FLAG}
                                onChange={changeConditionStatus}
                                value={couponSettingReducer.conditionStatus}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">状态</label>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryCouponList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn add-btn" onClick={() => {this.showEditCouponModal('new',null)}}>
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
                                <th>优惠券编号</th>
                                <th>优惠券名称</th>
                                <th>有效天数</th>
                                <th>有效日期(始)</th>
                                <th>有效日期(终)</th>
                                <th>门槛费用</th>
                                <th>金额(元)</th>
                                <th className="center">状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {couponSettingReducer.couponArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.coupon_name}</td>
                                        <td>{item.effective_days}</td>
                                        <td>{formatUtil.getDate(item.valid_date_from)}</td>
                                        <td>{formatUtil.getDate(item.valid_date_to)}</td>
                                        <td>{formatUtil.formatNumber(item.threshold_cost, 2)}</td>
                                        <td>{formatUtil.formatNumber(item.price, 2)}</td>
                                        {/* 状态：开关 */}
                                        <td className="center">
                                            <span className="switch">
                                                <label>
                                                  <input type="checkbox" checked={item.status === 1} onClick={() => {changeStatus(item.id, item.status)}}/>
                                                  <span className="lever"/>
                                                </label>
                                            </span>
                                        </td>
                                        <td className="operation center">
                                            {item.del_status === 0 &&
                                            <i className="mdi mdi-close margin-right20 pink-font pointer" onClick={() => {deleteCoupon(item.id)}}/>}
                                            <i className="mdi mdi-table-search purple-font pointer" onClick={() => {this.showEditCouponModal('edit',item)}}/>
                                        </td>
                                    </tr>
                                )
                            },this)}
                            { couponSettingReducer.couponArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="9">暂无数据</td>
                            </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {couponSettingReducer.start > 0 && couponSettingReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {couponSettingReducer.dataSize >= couponSettingReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                下一页
                            </a>}
                        </div>
                    </div>
                </div>
                <EditCouponModal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        couponSettingReducer: state.CouponSettingReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCouponList: () => {
        dispatch(couponSettingAction.getCouponList())
    },
    setStartNumber: (start) => {
        dispatch(CouponSettingActionType.setStartNumber(start))
    },
    setConditionNo: (value) => {
        dispatch(CouponSettingActionType.setConditionNo(value))
    },
    changeConditionStatus: (value) => {
        dispatch(CouponSettingActionType.setConditionStatus(value))
    },
    changeStatus: (id, status) => {
        dispatch(couponSettingAction.changeCouponStatus(id, status))
    },
    deleteCoupon: (id) => {
        dispatch(couponSettingAction.deleteCoupon(id));
    },
    initCouponModalData: (type, companyBank) => {
        dispatch(editCouponModalAction.initEditCouponModal(type, companyBank));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponSetting)