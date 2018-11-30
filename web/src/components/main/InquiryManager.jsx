import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {InquiryManagerActionType} from '../../actionTypes';

const inquiryManagerAction = require('../../actions/main/InquiryManagerAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class EnquiryManager extends React.Component {

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
            this.props.setConditionStartCity('');
            this.props.setConditionEndCity('');
            this.props.changeConditionServiceType(null);
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.changeConditionInquiryStatus(null);
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
     * 更新 检索条件：起始城市
     */
    changeConditionStartCity = (event) => {
        this.props.setConditionStartCity(event.target.value);
    };

    /**
     * 更新 检索条件：目的城市
     */
    changeConditionEndCity = (event) => {
        this.props.setConditionEndCity(event.target.value);
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
        const {inquiryManagerReducer, changeConditionServiceType, changeConditionEnquiryStatus} = this.props;
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
                            <Input s={3} label="起始城市" value={inquiryManagerReducer.conditionStartCity} onChange={this.changeConditionStartCity()}/>

                            {/* 查询条件：目的城市 */}
                            <Input s={3} label="目的城市" value={inquiryManagerReducer.conditionEndCity} onChange={this.changeConditionEndCity()}/>
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

                            {/* 查询条件：下单时间(始) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="下单时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={inquiryManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：下单时间(终) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="下单时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={inquiryManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：状态 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.INQUIRY_STATUS}
                                    onChange={changeConditionEnquiryStatus}
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

                        <div className="divider custom-divider"/>
                        <table className="bordered striped">
                            <thead className="blue-grey lighten-5">
                            <tr className="grey-text text-darken-2">
                                <th>订单编号</th>
                                <th>购买人</th>
                                <th className="center">绑定手机</th>
                                <th className="center">下单时间</th>
                                <th>应付金额(元)</th>
                                <th className="center">付款状态</th>
                                <th className="center">发货状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                inquiryManagerReducer.orderArray.map(function (item) {
                                    return (
                                            <tr className="grey-text text-darken-1">
                                                <td>{item.id}</td>
                                                <td>{item.user_name}</td>
                                                <td className="center">{item.phone}</td>
                                                <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                                <td>{formatUtil.formatNumber(item.total_price + item.total_freight,2)}</td>
                                                <td className={`center ${item.payment_status === 0 ?"red-font":""}`}>{sysConst.PAYMENT_STATUS[item.payment_status].label}</td>
                                                <td className="center">{sysConst.LOG_STATUS[item.log_status].label}</td>
                                                <td className="operation center">
                                                    <Link to={{pathname: '/order/'+ item.id}} >
                                                        <i className="mdi mdi-table-search light-blue-text"/>
                                                    </Link>
                                                </td>
                                            </tr>
                                    )
                                })
                            }
                            { inquiryManagerReducer.orderArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="8">暂无数据</td>
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
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getInquiryList: () => {
        // dispatch(inquiryManagerAction.getInquiryList())
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
    setConditionStartCity: (value) => {
        dispatch(InquiryManagerActionType.setConditionStartCity(value))
    },
    setConditionEndCity: (value) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(EnquiryManager)