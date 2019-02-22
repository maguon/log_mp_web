import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {Link} from "react-router-dom";
import {RecommenderSettingActionType} from '../../actionTypes';
import {NewReCommenderModal} from '../modules/index';

const recommenderSettingAction = require('../../actions/main/RecommenderSettingAction');
const newRecommenderModalAction = require('../../actions/modules/NewRecommenderModalAction');

class RecommenderSetting extends React.Component {

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
            this.props.setRecommendId('');
            this.props.setRecommendName('');
        }
        this.props.getRecommendList();
    }

    /**
     * 更新 追加内容：推荐人编号
     */
    changeRecommendId = (event) => {
        this.props.setRecommendId(event.target.value);
    };

    /**
     * 更新 追加内容：推荐人
     */
    changeRecommendName = (event) => {
        this.props.setRecommendName(event.target.value);
    };

    /**
     * 显示 新增推荐人
     */
    showNewReCommendModal = () => {
        this.props.initNewCommendModalData();
        $('#newReCommendModal').modal('open');
    };

    render() {
        const {recommenderSettingReducer, getRecommendList} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">推荐人管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：新建数据 输入区域 */}
                <div className="row z-depth-1 margin-left50 margin-right50 detail-box">
                    <div className="col s10 margin-top20 search-condition-box">
                        <Input s={6} label="推荐人编号" value={recommenderSettingReducer.recommendId} onChange={this.changeRecommendId}/>
                        <Input s={6} label="推荐人" value={recommenderSettingReducer.recommendName} onChange={this.changeRecommendName}/>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top20 query-btn" onClick={getRecommendList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top20 add-btn" onClick={this.showNewReCommendModal}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                {recommenderSettingReducer.recommendArray.length > 0 &&
                <div className="row margin-left40 margin-right40">
                    {recommenderSettingReducer.recommendArray.map(function (item) {
                        return (
                            <div className="col s4 margin-top15 position-relative">
                                <div className="row white z-depth-1 detail-box height150">

                                    {/* 明细上部分：ID 名称 */}
                                    <div className="col s12 white-text fz16 custom-purple">
                                        <div className="col s8 context-ellipsis fz18 margin-top10 margin-bottom10">{item.id} <span className="margin-left20">{item.name}</span></div>

                                        {/* 编辑按钮 */}
                                        <div className="col s4 margin-top10 right-align">
                                            <Link to={{pathname: '/recommend_setting/' + item.id}}>
                                                <i className="mdi mdi-pencil pointer white-text lighten-1"/>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col s12 padding-top10 padding-bottom10 purple-font">
                                        <div className="col s12 margin-top5">{item.introduction}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    },this)}
                </div>}
                <NewReCommenderModal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let fromDetail = false;
    if (typeof ownProps.location.state !== 'undefined' && ownProps.location.state.fromDetail === true) {
        fromDetail = true;
    }
    return {
        recommenderSettingReducer: state.RecommenderSettingReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getRecommendList: () => {
        dispatch(recommenderSettingAction.getRecommendList())
    },
    setRecommendId: (value) => {
        dispatch(RecommenderSettingActionType.setRecommendId(value))
    },
    setRecommendName: (value) => {
        dispatch(RecommenderSettingActionType.setRecommendName(value))
    },
    initNewCommendModalData: () => {
        dispatch(newRecommenderModalAction.initNewReCommendModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommenderSetting)