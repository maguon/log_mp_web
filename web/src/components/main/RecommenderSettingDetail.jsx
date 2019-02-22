import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {RecommenderSettingDetailActionType} from "../../actionTypes";

const recommenderSettingDetailAction = require('../../actions/main/RecommenderSettingDetailAction');
const sysConst = require('../../util/SysConst');

class RecommenderSettingDetail extends React.Component {

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
        // 取得推荐人信息
        this.props.getRecommendInfo();
    }

    /**
     * 更新 推荐人名称
     */
    changeRecommendName = (event) => {
        this.props.setRecommendName(event.target.value);
    };

    /**
     * 更新 推荐人简介
     */
    changeIntroduction = (event) => {
        this.props.setIntroduction(event.target.value);
    };

    render() {
        const {recommenderSettingDetailReducer, saveRecommend} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/recommend_setting', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">推荐人管理 - 详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体 */}
                <div className="row margin-top40 margin-left150 margin-right150 detail-box z-depth-1 grey-text">
                    <div className="col s12 padding-top15 padding-bottom15 custom-grey purple-font border-bottom-line">
                        <div className="col s12">推荐人编号：{recommenderSettingDetailReducer.recommendId}</div>
                    </div>

                    <div className="col s12 padding-top20 padding-bottom20">
                        <Input s={12} label="推荐人名称" maxLength="20" value={recommenderSettingDetailReducer.recommendName} onChange={this.changeRecommendName}/>
                        <Input s={12} label="推荐人简介" maxLength="50" value={recommenderSettingDetailReducer.introduction} onChange={this.changeIntroduction}/>
                    </div>
                    <div className="col s12 padding-top20 padding-bottom20 right-align">
                        <button type="button" className="btn confirm-btn margin-right10" onClick={saveRecommend}>修改</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        recommenderSettingDetailReducer: state.RecommenderSettingDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getRecommendInfo: () => {
        dispatch(recommenderSettingDetailAction.getRecommendInfo(ownProps.match.params.id));
    },
    setRecommendName: (value) => {
        dispatch(RecommenderSettingDetailActionType.setRecommendName(value));
    },
    setIntroduction: (value) => {
        dispatch(RecommenderSettingDetailActionType.setIntroduction(value));
    },
    saveRecommend: () => {
        dispatch(recommenderSettingDetailAction.saveRecommend());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommenderSettingDetail)