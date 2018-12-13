import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {LogSiteSettingDetailActionType, NewLogSiteContactModalActionType} from "../../actionTypes";
import {NewLogSiteContactModal} from '../modules/index';

const logSiteSettingDetailAction = require('../../actions/main/LogSiteSettingDetailAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');

class SupplierSettingDetail extends React.Component {

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
        // 取得收发货地点信息
        this.props.getLogSiteInfo();
    }

    /**
     * 更新 收发货站
     */
    changeLogSiteName = (event) => {
        this.props.setLogSiteName(event.target.value);
    };

    /**
     * 更新 地址
     */
    changeLogSiteAddress = (event) => {
        this.props.setLogSiteAddress(event.target.value);
    };

    /**
     * 更新 备注
     */
    changeLogSiteRemark = (event) => {
        this.props.setLogSiteRemark(event.target.value);
    };

    /**
     * 显示 新建 联系方式
     */
    showNewLogSiteContactModal = () => {
        this.props.initNewLogSiteContactModalData();
        $('#newLogSiteContactModal').modal('open');
    };

    /**
     * 删除 联系方式
     */
    deleteContact = (contactId) => {
        this.props.deleteLogSiteContact(contactId);
    };

    render() {
        const {logSiteSettingDetailReducer, commonReducer, changeLogSiteCity, setLocationMaker, saveLogSiteInfo} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/log_site_setting', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">收发货地点 - 详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体: 收发货地点 - 详情 / 地图 */}
                <div className="row margin-top40 margin-left50 margin-right50 detail-box z-depth-1 grey-text">
                    <div className="col s12 padding-top15 padding-bottom15 custom-grey purple-font border-bottom-line">
                        <div className="col s12 fz16 bold-font margin-top5">编号：{logSiteSettingDetailReducer.logSiteId}</div>
                    </div>

                    <div className="col s12 no-padding">

                        <div className="col s5 margin-top30 padding-bottom15">
                            <Input s={12} label="收发货站" maxLength="20" value={logSiteSettingDetailReducer.logSiteName} onChange={this.changeLogSiteName}/>
                            <div className="input-field col s12">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeLogSiteCity}
                                    value={logSiteSettingDetailReducer.logSiteCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                                <label className="active">城市</label>
                            </div>
                            <div className="col s12 no-padding">
                                <Input s={11} label="地址" id="aMapAutoComplete" maxLength="100" value={logSiteSettingDetailReducer.logSiteAddress} onChange={this.changeLogSiteAddress}/>
                                <div className="col s1 margin-top20">
                                    <i className="mdi mdi-map-marker-circle pointer pink-font fz24" onClick={setLocationMaker}/>
                                </div>
                            </div>

                            <Input s={12} label="备注" maxLength="200" value={logSiteSettingDetailReducer.logSiteRemark} onChange={this.changeLogSiteRemark}/>

                            <div className="col s12 right-align">
                                <button type="button" className="btn confirm-btn" onClick={saveLogSiteInfo}>确定</button>
                            </div>
                        </div>

                        <div className="col s7 no-padding position-relative">
                            <span className="map-info fz14"><i className="mdi mdi-map-marker fz15 grey-text margin-right10"/>
                                经度：<span className="fz16 red-font margin-right10">{logSiteSettingDetailReducer.logSiteLon}</span>
                                纬度：<span className="fz16 red-font">{logSiteSettingDetailReducer.logSiteLat}</span>
                            </span>
                            <div id="log-site-map" className="col s12 border-left-line"/>
                        </div>
                    </div>
                </div>

                {/* 主体: 联系方式 列表 */}
                <div className="row margin-top40 margin-left50 margin-right50 detail-box z-depth-1 grey-text">
                    <div className="col s12 padding-top15 padding-bottom15 custom-grey purple-font border-bottom-line">
                        <div className="col s9 fz16 bold-font">联系方式</div>
                        <div className="col s3 fz16 pink-font right-align">
                            <span className="pointer" onClick={this.showNewLogSiteContactModal}>+ 增加联系方式</span>
                        </div>
                    </div>
                    {logSiteSettingDetailReducer.logSiteContactArray.map(function (item) {
                        return (
                            <div className="col s12 padding-top10 padding-bottom10 border-bottom-line">
                                <div className="col s4"><i className="mdi mdi-phone fz24 pink-font"/><span className="margin-left20">{item.phone}</span></div>
                                <div className="col s4 margin-top10">{item.position}</div>
                                <div className="col s3 margin-top10">{item.user_name}</div>
                                <div className="col s1 right-align">
                                    <a onClick={() => (this.deleteContact(item.id))}><i className="mdi mdi-close-circle pointer pink-font fz24"/></a>
                                </div>
                            </div>
                        )
                    }, this)}
                    <NewLogSiteContactModal/>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logSiteSettingDetailReducer: state.LogSiteSettingDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getLogSiteInfo: () => {
        dispatch(commonAction.getCityList());
        dispatch(logSiteSettingDetailAction.getLogSiteInfo(ownProps.match.params.id));
        dispatch(logSiteSettingDetailAction.getLogSiteContactList(ownProps.match.params.id));
        dispatch(logSiteSettingDetailAction.addAutoCompleteListener())
    },
    setLogSiteName: (value) => {
        dispatch(LogSiteSettingDetailActionType.setLogSiteName(value))
    },
    changeLogSiteCity: (value) => {
        dispatch(LogSiteSettingDetailActionType.setLogSiteCity(value))
    },
    setLogSiteAddress: (value) => {
        dispatch(LogSiteSettingDetailActionType.setLogSiteAddress(value))
    },
    setLogSiteRemark: (value) => {
        dispatch(LogSiteSettingDetailActionType.setLogSiteRemark(value))
    },
    setLocationMaker: () => {
        dispatch(logSiteSettingDetailAction.getDetailAddress());
    },
    saveLogSiteInfo: () => {
        dispatch(logSiteSettingDetailAction.saveLogSiteInfo(ownProps.match.params.id));
    },
    deleteLogSiteContact: (contactId) => {
        dispatch(logSiteSettingDetailAction.deleteLogSiteContact(ownProps.match.params.id, contactId));
    },
    initNewLogSiteContactModalData: () => {
        dispatch(NewLogSiteContactModalActionType.setLogSiteId(ownProps.match.params.id));
        dispatch(NewLogSiteContactModalActionType.setName(''));
        dispatch(NewLogSiteContactModalActionType.setPosition(''));
        dispatch(NewLogSiteContactModalActionType.setPhone(''));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SupplierSettingDetail)