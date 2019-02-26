import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {RecommenderSettingDetailActionType} from "../../actionTypes";
import {AdvertisingModal} from '../modules/index';

const recommenderSettingDetailAction = require('../../actions/main/RecommenderSettingDetailAction');
const advertisingModalAction = require('../../actions/modules/AdvertisingModalAction');

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

    /**
     * 显示 生成广告语
     */
    showAdvertisingModal = () => {
        this.props.initAdvertisingModalData(this.props.recommenderSettingDetailReducer.content);
        $('#advertisingModal').modal('open');
    };

    render() {
        const {recommenderSettingDetailReducer, saveRecommend, crateRecommendCode, downloadRecommend} = this.props;
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

                    <div className="col s12 padding-top20">
                        <Input s={12} label="推荐人名称" maxLength="20" value={recommenderSettingDetailReducer.recommendName} onChange={this.changeRecommendName}/>
                        <Input s={12} label="推荐人简介" maxLength="50" value={recommenderSettingDetailReducer.introduction} onChange={this.changeIntroduction}/>
                    </div>
                    <div className="col s12 padding-top10 padding-bottom20 right-align">
                        <button type="button" className="btn confirm-btn margin-right10" onClick={saveRecommend}>修改</button>
                    </div>
                </div>

                <div className="row margin-top40 margin-left150 margin-right150 detail-box z-depth-1 grey-text">
                    <div className="col s12 padding-top15 padding-bottom15 custom-grey purple-font border-bottom-line">
                        <div className="col s12">推荐码效果图</div>
                    </div>
                    <div className="col s12 padding-top10 padding-bottom10 border-bottom-line">
                        <div className="col s12 position-relative">
                            <div id="recommend-div" className="recommend-div">
                                <span className="position-absolute recommend-content">{recommenderSettingDetailReducer.content}</span>
                                <img className="position-absolute recommend-img" src="../../../assets/images/recommend_bg.jpg"/>
                                {recommenderSettingDetailReducer.mpUrl != null &&
                                <img className="position-absolute recommend-code" src={recommenderSettingDetailReducer.mpUrl}/>}
                            </div>
                        </div>
                    </div>
                    <div className="col s12 padding-top20 padding-bottom20 right-align">
                        <button type="button" className="btn custom-btn" onClick={crateRecommendCode}>生成推荐码</button>
                        <button type="button" className="btn confirm-btn margin-left20" onClick={this.showAdvertisingModal}>生成广告语</button>
                        <button type="button" className="btn orange-btn margin-left20 margin-right10" onClick={downloadRecommend}>下载</button>
                    </div>
                    <AdvertisingModal/>
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
    // 取得基本信息
    getRecommendInfo: () => {
        dispatch(recommenderSettingDetailAction.getRecommendInfo(ownProps.match.params.id));
    },
    setRecommendName: (value) => {
        dispatch(RecommenderSettingDetailActionType.setRecommendName(value));
    },
    setIntroduction: (value) => {
        dispatch(RecommenderSettingDetailActionType.setIntroduction(value));
    },
    // 修改基本信息
    saveRecommend: () => {
        dispatch(recommenderSettingDetailAction.saveRecommend());
    },
    // 生成推荐码
    crateRecommendCode: () => {
        dispatch(recommenderSettingDetailAction.crateRecommendCode(ownProps.match.params.id));
    },
    // 打开 生成广告语 模态画面
    initAdvertisingModalData: (advertisement) => {
        dispatch(advertisingModalAction.initAdvertisingModal(ownProps.match.params.id, advertisement));
    },
    // 下载 推荐码图片
    downloadRecommend: () => {
        dispatch(recommenderSettingDetailAction.downloadRecommend());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommenderSettingDetail)