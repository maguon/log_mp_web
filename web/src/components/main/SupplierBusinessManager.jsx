import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {SupplierBusinessManagerActionType} from '../../actionTypes';

const commonAction = require('../../actions/main/CommonAction');
const supplierBusinessManagerAction = require('../../actions/main/SupplierBusinessManagerAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class SupplierBusinessManager extends React.Component {

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
        if (!this.props.fromDetail) {
            this.props.setStartNumber(0);
            this.props.changeConditionSupplier(null);
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
        }
        this.props.getSupplierBusinessList();
    }

    /**
     * 更新 检索条件：业务生成时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：业务生成时间(始)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 查询用户列表
     */
    querySupplierBusiness = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getSupplierBusinessList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.supplierBusinessManagerReducer.start - (this.props.supplierBusinessManagerReducer.size - 1));
        this.props.getSupplierBusinessList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.supplierBusinessManagerReducer.start + (this.props.supplierBusinessManagerReducer.size - 1));
        this.props.getSupplierBusinessList();
    };

    render() {
        const {supplierBusinessManagerReducer, commonReducer, changeConditionSupplier} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">供应商业务</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：供应商 */}
                            <div className="input-field col s4">
                                <Select
                                    options={commonReducer.supplierList}
                                    onChange={changeConditionSupplier}
                                    value={supplierBusinessManagerReducer.conditionSupplier}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">供应商</label>
                            </div>

                            {/* 查询条件：业务生成时间(始) */}
                            <div className="input-field col s4 custom-input-field">
                                <Input s={12} label="业务生成时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={supplierBusinessManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：业务生成时间(终) */}
                            <div className="input-field col s4 custom-input-field">
                                <Input s={12} label="业务生成时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={supplierBusinessManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.querySupplierBusiness}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">
                        <table className="bordered striped">
                            <thead className="custom-dark-grey table-top-line">
                            <tr className="grey-text text-darken-2">
                                <th>供应商</th>
                                <th className="right-align">业务笔数</th>
                                <th className="right-align">运输车辆</th>
                                <th className="right-align">供应商运费</th>
                                <th className="right-align">供应商保费</th>
                                <th className="right-align">支付供应商</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {supplierBusinessManagerReducer.supplierBusinessArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.supplier_short}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.load_task_count)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.total_car_num)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.total_supplier_trans_price,2)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.total_supplier_insure_price,2)}</td>
                                        <td className="right-align">{formatUtil.formatNumber(item.total_supplier_trans_price + item.total_supplier_insure_price,2)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/supplier_business/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            {supplierBusinessManagerReducer.supplierBusinessArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="7">暂无数据</td>
                            </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {supplierBusinessManagerReducer.start > 0 && supplierBusinessManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {supplierBusinessManagerReducer.dataSize >= supplierBusinessManagerReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                下一页
                            </a>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let fromDetail = false;
    if (typeof ownProps.location.state !== 'undefined' && ownProps.location.state.fromDetail === true) {
        fromDetail = true;
    }
    return {
        supplierBusinessManagerReducer: state.SupplierBusinessManagerReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getSupplierBusinessList: () => {
        dispatch(commonAction.getSupplierList());
        dispatch(supplierBusinessManagerAction.getSupplierBusinessList());
    },
    setStartNumber: (start) => {
        dispatch(SupplierBusinessManagerActionType.setStartNumber(start))
    },
    changeConditionSupplier: (value) => {
        dispatch(SupplierBusinessManagerActionType.setConditionSupplier(value))
    },
    setConditionCreatedOnStart: (time) => {
        dispatch(SupplierBusinessManagerActionType.setConditionCreatedOnStart(time))
    },
    setConditionCreatedOnEnd: (time) => {
        dispatch(SupplierBusinessManagerActionType.setConditionCreatedOnEnd(time))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SupplierBusinessManager)