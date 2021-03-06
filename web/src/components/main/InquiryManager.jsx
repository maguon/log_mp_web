import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {InquiryManagerActionType} from '../../actionTypes';

const inquiryManagerAction = require('../../actions/main/InquiryManagerAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class InquiryManager extends React.Component {

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
            this.props.setConditionUser('');
            this.props.setConditionPhone('');
            this.props.changeConditionStartCity(null);
            this.props.changeConditionEndCity(null);
            this.props.changeConditionServiceType(null);
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            // 默认选择条件：待报价
            this.props.changeConditionInquiryStatus({value: sysConst.INQUIRY_STATUS[0].value, label: sysConst.INQUIRY_STATUS[0].label});
        }
        this.props.getInquiryList();
    }

    /**
     * 更新 检索条件：客户ID
     */
    changeConditionUser = (event) => {
        this.props.setConditionUser(event.target.value);
    };

    /**
     * 更新 检索条件：客户电话
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 更新 检索条件：绑定时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：绑定时间(始)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 查询绑定车辆列表
     */
    queryInquiryList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getInquiryList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.inquiryManagerReducer.start - (this.props.inquiryManagerReducer.size - 1));
        this.props.getInquiryList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.inquiryManagerReducer.start + (this.props.inquiryManagerReducer.size - 1));
        this.props.getInquiryList();
    };

    render() {
        const {inquiryManagerReducer, commonReducer, changeConditionStartCity, changeConditionEndCity, changeConditionServiceType, changeConditionInquiryStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">询价管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：客户ID */}
                            <Input s={3} label="客户ID" value={inquiryManagerReducer.conditionUser} onChange={this.changeConditionUser}/>

                            {/* 查询条件：客户电话 */}
                            <Input s={3} label="客户电话" value={inquiryManagerReducer.conditionPhone} onChange={this.changeConditionPhone}/>

                            {/* 查询条件：起始城市 */}
                            <div className="input-field col s3">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeConditionStartCity}
                                    value={inquiryManagerReducer.conditionStartCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">起始城市</label>
                            </div>

                            {/* 查询条件：目的城市 */}
                            <div className="input-field col s3">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeConditionEndCity}
                                    value={inquiryManagerReducer.conditionEndCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">目的城市</label>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：服务方式 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.SERVICE_MODE}
                                    onChange={changeConditionServiceType}
                                    value={inquiryManagerReducer.conditionServiceType}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">服务方式</label>
                            </div>

                            {/* 查询条件：询价时间(始) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="询价时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={inquiryManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：询价时间(终) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="询价时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={inquiryManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：状态 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.INQUIRY_STATUS}
                                    onChange={changeConditionInquiryStatus}
                                    value={inquiryManagerReducer.conditionInquiryStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">状态</label>
                            </div>

                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryInquiryList}>
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
                                <th>询价编号</th>
                                <th>线路</th>
                                <th>车辆数</th>
                                <th className="center">服务方式</th>
                                <th className="center">预计费用</th>
                                <th>询价用户</th>
                                <th className="center">电话</th>
                                <th className="center">询价时间</th>
                                <th>协商费用</th>
                                <th className="center">协商时间</th>
                                <th className="center">状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {inquiryManagerReducer.inquiryArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.start_city} - {item.end_city}</td>
                                        <td>{formatUtil.formatNumber(item.car_num)}</td>
                                        <td className="center">{commonUtil.getJsonValue(sysConst.SERVICE_MODE,item.service_type)}</td>
                                        <td className="center">{formatUtil.formatNumber(item.ora_trans_price + item.ora_insure_price,2)}</td>
                                        <td>{item.user_name}</td>
                                        <td className="center">{item.phone}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td>{formatUtil.formatNumber(item.total_trans_price + item.total_insure_price,2)}</td>
                                        <td className="center">{formatUtil.getDateTime(item.inquiry_time)}</td>
                                        <td className={`center ${item.status === 0 ? "pink-font" : ""}`}>{commonUtil.getJsonValue(sysConst.INQUIRY_STATUS,item.status)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/inquiry/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            { inquiryManagerReducer.inquiryArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="12">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {inquiryManagerReducer.start > 0 && inquiryManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {inquiryManagerReducer.dataSize >= inquiryManagerReducer.size &&
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
        inquiryManagerReducer: state.InquiryManagerReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getInquiryList: () => {
        dispatch(commonAction.getCityList());
        dispatch(inquiryManagerAction.getInquiryList())
    },
    setStartNumber: (start) => {
        dispatch(InquiryManagerActionType.setStartNumber(start))
    },
    setConditionUser: (value) => {
        dispatch(InquiryManagerActionType.setConditionUser(value))
    },
    setConditionPhone: (value) => {
        dispatch(InquiryManagerActionType.setConditionPhone(value))
    },
    changeConditionStartCity: (value) => {
        dispatch(InquiryManagerActionType.setConditionStartCity(value))
    },
    changeConditionEndCity: (value) => {
        dispatch(InquiryManagerActionType.setConditionEndCity(value))
    },
    changeConditionServiceType: (value) => {
        dispatch(InquiryManagerActionType.setConditionServiceType(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(InquiryManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(InquiryManagerActionType.setConditionCreatedOnEnd(value))
    },
    changeConditionInquiryStatus: (value) => {
        dispatch(InquiryManagerActionType.setConditionInquiryStatus(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InquiryManager)