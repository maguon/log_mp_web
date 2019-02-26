import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {RecommendBusinessManagerActionType} from '../../actionTypes';

const recommendBusinessManagerAction = require('../../actions/main/RecommendBusinessManagerAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class RecommendBusinessManager extends React.Component {

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
            this.props.setConditionRecommendId('');
            this.props.setConditionRecommendName('');
            this.props.setConditionRecommendOnStart('');
            this.props.setConditionRecommendOnEnd('');
        }
        this.props.getRecommendBusinessList();
    }

    /**
     * 更新 检索条件：推荐人编号
     */
    changeConditionRecommendId = (event) => {
        this.props.setConditionRecommendId(event.target.value);
    };

    /**
     * 更新 检索条件：推荐人
     */
    changeConditionRecommendName = (event) => {
        this.props.setConditionRecommendName(event.target.value);
    };

    /**
     * 更新 检索条件：推荐时间(始)
     */
    changeConditionRecommendOnStart = (event, value) => {
        this.props.setConditionRecommendOnStart(value);
    };

    /**
     * 更新 检索条件：推荐时间(始)
     */
    changeConditionRecommendOnEnd = (event, value) => {
        this.props.setConditionRecommendOnEnd(value);
    };

    /**
     * 查询用户列表
     */
    queryRecommendBusiness = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getRecommendBusinessList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.recommendBusinessManagerReducer.start - (this.props.recommendBusinessManagerReducer.size - 1));
        this.props.getRecommendBusinessList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.recommendBusinessManagerReducer.start + (this.props.recommendBusinessManagerReducer.size - 1));
        this.props.getRecommendBusinessList();
    };

    render() {
        const {recommendBusinessManagerReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">推广业绩</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        <Input s={3} label="推荐人编号" value={recommendBusinessManagerReducer.conditionRecommendId} onChange={this.changeConditionRecommendId}/>

                        <Input s={3} label="推荐人" value={recommendBusinessManagerReducer.conditionRecommendName} onChange={this.changeConditionRecommendName}/>

                        {/* 查询条件：推荐时间(始) */}
                        <div className="input-field col s3 custom-input-field">
                            <Input s={12} label="推荐时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                   value={recommendBusinessManagerReducer.conditionRecommendOnStart} onChange={this.changeConditionRecommendOnStart} />
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        {/* 查询条件：推荐时间(终) */}
                        <div className="input-field col s3 custom-input-field">
                            <Input s={12} label="推荐时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                   value={recommendBusinessManagerReducer.conditionRecommendOnEnd} onChange={this.changeConditionRecommendOnEnd} />
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryRecommendBusiness}>
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
                                <th>推荐人编号</th>
                                <th>推荐人</th>
                                <th>授权用户</th>
                                <th>认证用户</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {recommendBusinessManagerReducer.recommendBusinessArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{formatUtil.formatNumber(item.user_count)}</td>
                                        <td>{formatUtil.formatNumber(item.auth_count)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/recommend_business/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            {recommendBusinessManagerReducer.recommendBusinessArray.length === 0 &&
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
                            {recommendBusinessManagerReducer.start > 0 && recommendBusinessManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {recommendBusinessManagerReducer.dataSize >= recommendBusinessManagerReducer.size &&
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
        recommendBusinessManagerReducer: state.RecommendBusinessManagerReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getRecommendBusinessList: () => {
        dispatch(recommendBusinessManagerAction.getRecommendBusinessList());
    },
    setStartNumber: (start) => {
        dispatch(RecommendBusinessManagerActionType.setStartNumber(start))
    },
    setConditionRecommendId: (value) => {
        dispatch(RecommendBusinessManagerActionType.setConditionRecommendId(value))
    },
    setConditionRecommendName: (value) => {
        dispatch(RecommendBusinessManagerActionType.setConditionRecommendName(value))
    },
    setConditionRecommendOnStart: (value) => {
        dispatch(RecommendBusinessManagerActionType.setConditionRecommendOnStart(value))
    },
    setConditionRecommendOnEnd: (value) => {
        dispatch(RecommendBusinessManagerActionType.setConditionRecommendOnEnd(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendBusinessManager)