import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {LogSiteSettingActionType, NewLogSiteModalActionType} from '../../actionTypes';
import {NewLogSiteModal} from '../modules/index';

const logSiteSettingAction = require('../../actions/main/LogSiteSettingAction');
const newLogSiteModalAction = require('../../actions/modules/NewLogSiteModalAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');

class LogSiteSetting extends React.Component {

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
            this.props.setConditionLogSiteName('');
            this.props.changeConditionLogSiteCity(null);
        }
        this.props.getLogSiteSettingList();
    }

    /**
     * 更新 检索条件：收发货地点名称
     */
    changeConditionLogSiteName = (event) => {
        this.props.setConditionLogSiteName(event.target.value);
    };

    /**
     * 显示 增加收发货地点
     */
    showNewLogSiteModal = () => {
        this.props.initModalData();
        $('#newLogSiteModal').modal('open');
    };

    render() {
        const {logSiteSettingReducer, commonReducer, changeConditionLogSiteCity, getLogSiteSettingList} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">收发货地点</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row z-depth-1 margin-left50 margin-right50 detail-box">
                    <div className="col s10 margin-top20 search-condition-box">
                        {/* 查询条件：所在城市 */}
                        <div className="input-field col s6">
                            <Select
                                options={commonReducer.cityList}
                                onChange={changeConditionLogSiteCity}
                                value={logSiteSettingReducer.conditionLogSiteCity}
                                isSearchable={true}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">所在城市</label>
                        </div>

                        {/* 查询条件：收发货地点名称 */}
                        <Input s={6} label="收发货地点名称" value={logSiteSettingReducer.conditionLogSiteName} onChange={this.changeConditionLogSiteName}/>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top20 query-btn" onClick={getLogSiteSettingList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top20 add-btn" onClick={this.showNewLogSiteModal}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                {logSiteSettingReducer.logSiteArray.length > 0 &&
                <div className="row margin-left40 margin-right40">
                    {logSiteSettingReducer.logSiteArray.map(function (item) {
                        return (
                            <div className="col s4 margin-top20 position-relative">
                                <div className="row white z-depth-1 detail-box height150">

                                    {/* 明细上部分：地点名称 */}
                                    <div className="col s12 custom-purple white-text fz16" >

                                        <div className="col s12 context-ellipsis fz18 margin-top10 margin-bottom10">{item.name}</div>

                                        {/* 明细右侧：编辑按钮 */}
                                        <Link to={{pathname: '/log_site_setting/' + item.id}}>
                                            <a className="btn btn-floating waves-effect waves-light custom-pink position-absolute middle-btn">
                                                <i className="mdi mdi-pencil white-text lighten-1"/>
                                            </a>
                                        </Link>
                                    </div>

                                    <div className="col s12 padding-top10 padding-bottom10 fz14 purple-font">
                                        <div className="col s12 margin-top5 padding-right0">
                                            <div className="col s-percent-20 no-padding">所属城市：</div>
                                            <div className="col s-percent-80 no-padding bold-font">{item.city}</div>

                                        </div>
                                        <div className="col s12 margin-top10 padding-right0">
                                            <div className="col s-percent-20 no-padding">详细地址：</div>
                                            <div className="col s-percent-80 no-padding grey-text word-wrap">{item.address}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    },this)}
                </div>}
                <NewLogSiteModal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logSiteSettingReducer: state.LogSiteSettingReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getLogSiteSettingList: () => {
        dispatch(commonAction.getCityList());
        dispatch(logSiteSettingAction.getLogSiteSettingList())
    },
    setConditionLogSiteName: (value) => {
        dispatch(LogSiteSettingActionType.setConditionLogSiteName(value))
    },
    changeConditionLogSiteCity: (value) => {
        dispatch(LogSiteSettingActionType.setConditionLogSiteCity(value))
    },
    initModalData: () => {
        dispatch(commonAction.getCityList());
        dispatch(newLogSiteModalAction.showMap());
        dispatch(NewLogSiteModalActionType.setLogSiteName(''));
        dispatch(NewLogSiteModalActionType.setLogSiteCity(''));
        dispatch(NewLogSiteModalActionType.setLogSiteAddress(''));
        dispatch(NewLogSiteModalActionType.setLogSiteRemark(''));
        dispatch(NewLogSiteModalActionType.setLogSiteLon(''));
        dispatch(NewLogSiteModalActionType.setLogSiteLat(''));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogSiteSetting)