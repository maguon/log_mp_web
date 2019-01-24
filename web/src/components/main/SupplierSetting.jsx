import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {SupplierSettingActionType, NewSupplierModalActionType} from '../../actionTypes';
import {NewSupplierModal} from '../modules/index';

const supplierSettingAction = require('../../actions/main/SupplierSettingAction');
const sysConst = require('../../util/SysConst');

class SupplierSetting extends React.Component {

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
            this.props.setConditionSupplierShort('');
            this.props.setConditionSupplierName('');
            this.props.changeConditionTransportMode(null);
        }
        this.props.getSupplierSettingList();
    }

    /**
     * 更新 检索条件：供应商简称
     */
    changeConditionSupplierShort = (event) => {
        this.props.setConditionSupplierShort(event.target.value);
    };

    /**
     * 更新 检索条件：供应商全称
     */
    changeConditionSupplierName = (event) => {
        this.props.setConditionSupplierName(event.target.value);
    };

    /**
     * 显示 新建/编辑 供应商信息
     */
    showNewSupplierModal = () => {
        this.props.initModalData();
        $('#newSupplierModal').modal('open');
    };

    render() {
        const {supplierSettingReducer, getSupplierSettingList, changeConditionTransportMode} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">供应商设置</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row z-depth-1 margin-left50 margin-right50 margin-bottom40 detail-box">
                    <div className="col s10 margin-top20 search-condition-box">
                        {/* 查询条件：供应商简称 */}
                        <Input s={4} label="供应商简称" value={supplierSettingReducer.conditionSupplierShort} onChange={this.changeConditionSupplierShort}/>

                        {/* 查询条件：供应商全称 */}
                        <Input s={4} label="供应商全称" value={supplierSettingReducer.conditionSupplierName} onChange={this.changeConditionSupplierName}/>

                        {/* 查询条件：运输方式 */}
                        <div className="input-field col s4">
                            <Select
                                options={sysConst.TRANSPORT_MODE}
                                onChange={changeConditionTransportMode}
                                value={supplierSettingReducer.conditionTransportMode}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">运输方式</label>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top20 query-btn" onClick={getSupplierSettingList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top20 add-btn" onClick={this.showNewSupplierModal}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                {supplierSettingReducer.supplierArray.length > 0 &&
                <div className="row z-depth-1 margin-left50 margin-right50 detail-box margin-top20">
                    {supplierSettingReducer.supplierArray.map(function (item) {
                        return (
                            <div className="row margin-bottom0 padding-top20 padding-bottom20 border-bottom-line">
                                <div className="col s10 purple-font">
                                    <i className="mdi mdi-truck-fast margin-left20 fz20"/>
                                    <span className="margin-left30 fz16">{item.supplier_short}</span>
                                    <span className="margin-left30 grey-text text-darken-1">{item.supplier_full}</span>
                                </div>
                                <div className="col s1 pink-font margin-top5">
                                    {(item.trans_type !== 1 && item.trans_type !== 2 && item.trans_type !== 3)? '未知' : sysConst.TRANSPORT_MODE[item.trans_type - 1].label}
                                </div>
                                <div className="col s1 right-align padding-right20">
                                    <Link to={{pathname: '/supplier_setting/' + item.id}}>
                                        <i className="mdi mdi-pencil fz20 pink-font"/>
                                    </Link>
                                </div>
                            </div>
                        )
                    },this)}
                </div>}
                <NewSupplierModal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        supplierSettingReducer: state.SupplierSettingReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getSupplierSettingList: () => {
        dispatch(supplierSettingAction.getSupplierSettingList())
    },
    setConditionSupplierShort: (value) => {
        dispatch(SupplierSettingActionType.setConditionSupplierShort(value))
    },
    setConditionSupplierName: (value) => {
        dispatch(SupplierSettingActionType.setConditionSupplierName(value))
    },
    changeConditionTransportMode: (value) => {
        dispatch(SupplierSettingActionType.setConditionTransportMode(value))
    },
    initModalData: () => {
        dispatch(NewSupplierModalActionType.setPageType('new'));
        dispatch(NewSupplierModalActionType.setSupplierShort(''));
        dispatch(NewSupplierModalActionType.setSupplierName(''));
        dispatch(NewSupplierModalActionType.setTransportModeRoad(false));
        dispatch(NewSupplierModalActionType.setTransportModeShip(false));
        dispatch(NewSupplierModalActionType.setRemark(''));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SupplierSetting)