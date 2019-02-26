import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {RecommendBusinessManagerDetailActionType} from '../../actionTypes';

const recommendBusinessManagerDetailAction = require('../../actions/main/RecommendBusinessManagerDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class RecommendBusinessManagerDetail extends React.Component {

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
        // 默认第一页
        this.props.setDetailStartNumber(0);
        // 清空检索条件
        this.props.setConditionCreatedOnStart('');
        this.props.setConditionCreatedOnEnd('');

        // 取得推广人基本信息
        this.props.getRecommendInfo();
        // 检索改推广人，推荐用户
        this.props.getUserList();
    }

    /**
     * 更新 检索条件：选择时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：选择时间(始)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 查询线路列表
     */
    queryLoadTaskList = () => {
        // 默认第一页
        this.props.setDetailStartNumber(0);
        // 取得推广人基本信息
        this.props.getRecommendInfo();
        // 检索改推广人，推荐用户
        this.props.getUserList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setDetailStartNumber(this.props.recommendBusinessManagerDetailReducer.detailStart - (this.props.recommendBusinessManagerDetailReducer.detailSize - 1));
        this.props.getUserList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setDetailStartNumber(this.props.recommendBusinessManagerDetailReducer.detailStart + (this.props.recommendBusinessManagerDetailReducer.detailSize - 1));
        this.props.getUserList();
    };

    render() {
        const {recommendBusinessManagerDetailReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/recommend_business', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">推广业绩 - 详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row">
                    {/* TAB 头部 */}
                    <div className="col s12">
                        {/* 用户详情：基本信息 */}
                        {recommendBusinessManagerDetailReducer.recommendInfo.length > 0 &&
                        <div className="recommend-business-detail-header grey-text text-darken-1">
                            {/* 推广人ID，姓名 */}
                            <div className="col s6">
                                <div className="margin-top15">{recommendBusinessManagerDetailReducer.recommendInfo[0].id}</div>
                                <div className="margin-top10 fz18 purple-font">{recommendBusinessManagerDetailReducer.recommendInfo[0].name}</div>
                            </div>
                            {/* 推广码 */}
                            <div className="col s6 right-align padding-top5">
                                <img className="img-size-80" src={recommendBusinessManagerDetailReducer.recommendInfo[0].mp_url}/>
                            </div>
                        </div>}
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1 margin-bottom0">
                    <div className="col s11 search-condition-box">
                        {/* 查询条件：选择时间(始) */}
                        <div className="input-field col s3 custom-input-field">
                            <Input s={12} label="选择时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                   value={recommendBusinessManagerDetailReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        {/* 查询条件：选择时间(终) */}
                        <div className="input-field col s3 custom-input-field">
                            <Input s={12} label="选择时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                   value={recommendBusinessManagerDetailReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryLoadTaskList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    {/* 用户统计数据 */}
                    {recommendBusinessManagerDetailReducer.recommendInfo.length > 0 &&
                    <div className="col s12 grey-text text-darken-1">
                        <div className="col s12 custom-grey grey-text text-darken-1 border-top-line border-bottom-line padding-top15 padding-bottom15">
                            <div className="col s6">授权用户：<span className="pink-font">{formatUtil.formatNumber(recommendBusinessManagerDetailReducer.recommendInfo[0].user_count)}</span></div>
                            <div className="col s6 right-align">认证用户：<span className="pink-font">{formatUtil.formatNumber(recommendBusinessManagerDetailReducer.recommendInfo[0].auth_count)}</span></div>
                        </div>
                    </div>}
                    <div className="col s12">
                        <table className="bordered">
                            <thead>
                            <tr className="grey-text text-darken-2">
                                <th className="padding-left20">用户ID</th>
                                <th>昵称</th>
                                <th>手机</th>
                                <th className="center">授权时间</th>
                                <th className="center">认证时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            {recommendBusinessManagerDetailReducer.userArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td className="padding-left20">{item.id}</td>
                                        <td>{item.wechat_name}</td>
                                        <td>{item.phone}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className="center">{formatUtil.getDateTime(item.auth_time)}</td>
                                    </tr>
                                )
                            },this)}
                            { recommendBusinessManagerDetailReducer.userArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="5">暂无数据</td>
                            </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {recommendBusinessManagerDetailReducer.detailStart > 0 && recommendBusinessManagerDetailReducer.detailDataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {recommendBusinessManagerDetailReducer.detailDataSize >= recommendBusinessManagerDetailReducer.detailSize &&
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

const mapStateToProps = (state) => {
    return {
        recommendBusinessManagerDetailReducer: state.RecommendBusinessManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 基本信息
    getRecommendInfo: () => {
        dispatch(recommendBusinessManagerDetailAction.getRecommendInfo(ownProps.match.params.id))
    },
    getUserList: () => {
        dispatch(recommendBusinessManagerDetailAction.getUserList(ownProps.match.params.id))
    },
    setDetailStartNumber: (start) => {
        dispatch(RecommendBusinessManagerDetailActionType.setDetailStartNumber(start))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(RecommendBusinessManagerDetailActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(RecommendBusinessManagerDetailActionType.setConditionCreatedOnEnd(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendBusinessManagerDetail)