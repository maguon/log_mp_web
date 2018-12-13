import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {NewLogSiteModalActionType} from "../../actionTypes";

const newLogSiteModalAction = require('../../actions/modules/NewLogSiteModalAction');
const sysConst = require('../../util/SysConst');

class NewLogSiteModal extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor() {
        super();
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        $('.modal').modal();
        // 给画面的地址控件追加监听
        this.props.addAutoCompleteListener();
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
     * 渲染(挂载)画面。
     */
    render() {
        const {newLogSiteModalReducer, commonReducer, changeLogSiteCity, setLocationMaker, closeModal, saveLogSiteInfo} = this.props;
        return (
            <div id="newLogSiteModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">增加收发货地点</div>

                {/** Modal主体 */}
                <div className="modal-content no-padding white grey-text text-darken-2">
                    <div className="col s12 no-padding">

                        <div className="col s5 margin-top40 padding-bottom15">
                            <Input s={12} label="收发货站" maxLength="20" value={newLogSiteModalReducer.logSiteName} onChange={this.changeLogSiteName}/>

                            <div className="input-field col s12">
                                <Select
                                    options={commonReducer.cityList}
                                    onChange={changeLogSiteCity}
                                    value={newLogSiteModalReducer.logSiteCity}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                                <label className="active">城市</label>
                            </div>

                            <div className="col s12 no-padding">
                                <Input s={11} label="地址" id="amapAddress" maxLength="100" value={newLogSiteModalReducer.logSiteAddress} onChange={this.changeLogSiteAddress}/>
                                <div className="col s1 margin-top20">
                                    <i className="mdi mdi-map-marker-circle pointer pink-font fz24" onClick={setLocationMaker}/>
                                </div>
                            </div>

                            <Input s={12} label="备注" maxLength="200" value={newLogSiteModalReducer.logSiteRemark} onChange={this.changeLogSiteRemark}/>
                        </div>

                        <div className="col s7 no-padding">
                            <span className="map-info fz14"><i className="mdi mdi-map-marker fz15 grey-text margin-right10"/>
                                经度：<span className="fz16 red-font margin-right10">{newLogSiteModalReducer.logSiteLon}</span>
                                纬度：<span className="fz16 red-font">{newLogSiteModalReducer.logSiteLat}</span>
                            </span>
                            <div id="new-log-site-map" className="col s12 border-left-line"/>
                        </div>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveLogSiteInfo}>确定</button>
                </div>
            </div>
        );
    }
}

/**
 * 输入逻辑：外部的数据（即state对象）转换为 UI 组件的参数。
 */
const mapStateToProps = (state) => {
    return {
        newLogSiteModalReducer: state.NewLogSiteModalReducer,
        commonReducer: state.CommonReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    addAutoCompleteListener: () => {
        dispatch(newLogSiteModalAction.addAutoCompleteListener())
    },

    setLogSiteName: (value) => {
        dispatch(NewLogSiteModalActionType.setLogSiteName(value))
    },
    changeLogSiteCity: (value) => {
        dispatch(NewLogSiteModalActionType.setLogSiteCity(value))
    },
    setLogSiteAddress: (value) => {
        dispatch(NewLogSiteModalActionType.setLogSiteAddress(value))
    },
    setLogSiteRemark: (value) => {
        dispatch(NewLogSiteModalActionType.setLogSiteRemark(value))
    },

    setLocationMaker: () => {
        dispatch(newLogSiteModalAction.getDetailAddress());
    },
    saveLogSiteInfo: () => {
        dispatch(newLogSiteModalAction.saveLogSiteInfo());
    },
    closeModal: () => {
        $('#newLogSiteModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewLogSiteModal);