import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {
    NewSupplierModalActionType,
    NewSupplierContactModalActionType,
    NewSupplierBankModalActionType,
    SupplierSettingDetailActionType
} from "../../actionTypes";
import {NewSupplierModal, NewSupplierContactModal, NewSupplierBankModal} from '../modules/index';

const newSupplierModalAction = require('../../actions/modules/NewSupplierModalAction');
const supplierSettingDetailAction = require('../../actions/main/SupplierSettingDetailAction');
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
        // 取得供应商信息
        this.props.getSupplierInfo();
    }

    /**
     * 显示 编辑 供应商信息
     */
    showNewSupplierModal = (logCompanyId) => {
        this.props.initNewSupplierModalData(logCompanyId);
        $('#newSupplierModal').modal('open');
    };

    /**
     * 显示 新建 联系方式
     */
    showNewSupplierContactModal = () => {
        this.props.initNewSupplierContactModalData();
        $('#newSupplierContactModal').modal('open');
    };

    /**
     * 显示 新建 银行账号
     */
    showNewSupplierBankModal = () => {
        this.props.initNewSupplierBankModalData();
        $('#newSupplierBankModal').modal('open');
    };

    /**
     * 删除 联系方式
     */
    deleteContact = (contactId) => {
        this.props.deleteSupplierContact(contactId);
    };

    /**
     * 删除 银行账号
     */
    deleteBank = (bankId) => {
        this.props.deleteSupplierBank(bankId);
    };

    /**
     * 更新 URL
     */
    changeAppUrl = (event) => {
        this.props.setAppUrl(event.target.value);
    };

    /**
     * 更新 ID
     */
    changeAppId = (event) => {
        this.props.setAppId(event.target.value);
    };

    /**
     * 更新 密钥
     */
    changeAppSecret = (event) => {
        this.props.setAppSecret(event.target.value);
    };

    /**
     * 更新 发运地ID
     */
    changeBaseAddrId = (event) => {
        this.props.setBaseAddrId(event.target.value);
    };

    /**
     * 更新 经销商ID
     */
    changeReceiveId = (event) => {
        this.props.setReceiveId(event.target.value);
    };

    /**
     * 更新 品牌ID
     */
    changeCarModuleId = (event) => {
        this.props.setCarModuleId(event.target.value);
    };

    render() {
        const {supplierSettingDetailReducer, changeStatus, saveAdvancedSetting} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/supplier_setting', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">供应商设置 - 详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体: 供应商信息 */}
                {supplierSettingDetailReducer.supplierInfo.length > 0 &&
                <div className="row margin-top40 margin-left150 margin-right150 detail-box z-depth-1 grey-text">
                    <div className="col s12 padding-top15 padding-bottom15 custom-grey purple-font border-bottom-line">
                        <div className="col s6 fz16 bold-font margin-top5">{supplierSettingDetailReducer.supplierInfo[0].supplier_short}</div>
                        <div className="col s6 fz16 pink-font right-align">
                            <i className="mdi mdi-pencil fz20 pointer" onClick={()=>{this.showNewSupplierModal(supplierSettingDetailReducer.supplierInfo[0].id)}}/>
                        </div>
                    </div>

                    <div className="col s12 margin-top5 padding-top15 padding-bottom15 border-bottom-line">
                        <div className="col s6">{supplierSettingDetailReducer.supplierInfo[0].supplier_full}</div>
                        <div className="col s6 right-align pink-font">
                            {(supplierSettingDetailReducer.supplierInfo[0].trans_type !== 1
                                && supplierSettingDetailReducer.supplierInfo[0].trans_type !== 2
                                && supplierSettingDetailReducer.supplierInfo[0].trans_type !== 3)
                                ? '未知'
                                : sysConst.TRANSPORT_MODE[supplierSettingDetailReducer.supplierInfo[0].trans_type - 1].label}
                        </div>
                    </div>

                    <div className="col s12 padding-top15 padding-bottom15">
                        <div className="col s12">备注：{supplierSettingDetailReducer.supplierInfo[0].remark}</div>
                    </div>
                    <NewSupplierModal/>
                </div>}

                {/* 主体: 联系方式 列表 */}
                <div className="row margin-top40 margin-left150 margin-right150 detail-box z-depth-1 grey-text">
                    <div className="col s12 padding-top15 padding-bottom15 custom-grey purple-font border-bottom-line">
                        <div className="col s9 fz16 bold-font">联系方式</div>
                        <div className="col s3 fz16 pink-font right-align">
                            <span className="pointer" onClick={this.showNewSupplierContactModal}>+ 增加联系人</span>
                        </div>
                    </div>
                    {supplierSettingDetailReducer.contactArray.map(function (item) {
                        return (
                            <div className="col s12 padding-top10 padding-bottom10 border-bottom-line">
                                <div className="col s4"><i className="mdi mdi-account-outline fz24 pink-font"/><span className="margin-left20">{item.name}</span></div>
                                <div className="col s4 margin-top10">{item.position}</div>
                                <div className="col s3 margin-top10">{item.phone}</div>
                                <div className="col s1 right-align">
                                    <a onClick={() => (this.deleteContact(item.id))}><i className="mdi mdi-close-circle pointer pink-font fz24"/></a>
                                </div>
                            </div>
                        )
                    }, this)}
                    <NewSupplierContactModal/>
                </div>

                {/* 主体: 银行账号 列表 */}
                <div className="row margin-top40 margin-left150 margin-right150 detail-box z-depth-1 grey-text">
                    <div className="col s12 padding-top15 padding-bottom15 custom-grey purple-font border-bottom-line">
                        <div className="col s9 fz16 bold-font">银行账号</div>
                        <div className="col s3 fz16 pink-font right-align">
                            <span className="pointer" onClick={this.showNewSupplierBankModal}>+ 增加银行账号</span>
                        </div>
                    </div>
                    {supplierSettingDetailReducer.bankArray.map(function (item) {
                        return (
                            <div className="col s12 padding-top10 padding-bottom10 border-bottom-line">
                                <div className="col s5"><i className="mdi mdi-credit-card fz24 pink-font"/><span className="margin-left50">{item.bank_code}</span></div>
                                <div className="col s4 margin-top10">{item.bank}</div>
                                <div className="col s2 margin-top10">{item.account_name}</div>
                                <div className="col s1 right-align">
                                    <a onClick={() => (this.deleteBank(item.id))}><i className="mdi mdi-close-circle pointer pink-font fz24"/></a>
                                </div>
                            </div>
                        )
                    }, this)}
                    <NewSupplierBankModal/>
                </div>

                {/* 主体: 高级设置 */}
                <div className="row margin-top40 margin-left150 margin-right150 detail-box z-depth-1 grey-text">
                    <div className="col s12 padding-top15 padding-bottom15 custom-grey purple-font border-bottom-line">
                        <div className={`col s6 fz16 bold-font ${supplierSettingDetailReducer.advancedStatus === 1 ? "grey-text" : ""}`}>高级设置</div>
                        <div className="col s6 padding-right0 right-align">
                            {/* 状态：开关 */}
                            <span className="switch">
                                <label>
                                <input type="checkbox" checked={supplierSettingDetailReducer.advancedStatus === 0}
                                       onClick={() => {changeStatus(supplierSettingDetailReducer.advancedStatus)}}/>
                                <span className="lever"/>
                                </label>
                            </span>
                        </div>
                    </div>

                    <div className="col s12 padding-top15 padding-bottom15">
                        <Input s={4} label="URL" maxLength="50" value={supplierSettingDetailReducer.appUrl} onChange={this.changeAppUrl}/>
                        <Input s={4} label="ID" type="number" value={supplierSettingDetailReducer.appId} onChange={this.changeAppId}/>
                        <Input s={4} label="密钥" maxLength="50" value={supplierSettingDetailReducer.appSecret} onChange={this.changeAppSecret}/>

                        <Input s={4} label="发运地ID" type="number" value={supplierSettingDetailReducer.baseAddrId} onChange={this.changeBaseAddrId}/>
                        <Input s={4} label="经销商ID" type="number" value={supplierSettingDetailReducer.receiveId} onChange={this.changeReceiveId}/>
                        <Input s={4} label="品牌ID" type="number" value={supplierSettingDetailReducer.carModuleId} onChange={this.changeCarModuleId}/>

                        <div className="col s12 right-align">
                            {supplierSettingDetailReducer.advancedStatus === 0 &&
                            <button type="button" className="btn confirm-btn" onClick={saveAdvancedSetting}>确定</button>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        supplierSettingDetailReducer: state.SupplierSettingDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getSupplierInfo: () => {
        dispatch(supplierSettingDetailAction.getSupplierInfo(ownProps.match.params.id));
        dispatch(supplierSettingDetailAction.getSupplierBankList(ownProps.match.params.id));
        dispatch(supplierSettingDetailAction.getSupplierContactList(ownProps.match.params.id));
    },
    deleteSupplierContact: (contactId) => {
        dispatch(supplierSettingDetailAction.deleteSupplierContact(ownProps.match.params.id, contactId));
    },
    deleteSupplierBank: (contactId) => {
        dispatch(supplierSettingDetailAction.deleteSupplierBank(ownProps.match.params.id, contactId));
    },
    initNewSupplierModalData: (supplierId) => {
        dispatch(NewSupplierModalActionType.setPageType('edit'));
        dispatch(newSupplierModalAction.getSupplierInfo(supplierId));
    },
    initNewSupplierContactModalData: () => {
        dispatch(NewSupplierContactModalActionType.setSupplierId(ownProps.match.params.id));
        dispatch(NewSupplierContactModalActionType.setName(''));
        dispatch(NewSupplierContactModalActionType.setPosition(''));
        dispatch(NewSupplierContactModalActionType.setPhone(''));
    },
    initNewSupplierBankModalData: () => {
        dispatch(NewSupplierContactModalActionType.setSupplierId(ownProps.match.params.id));
        dispatch(NewSupplierBankModalActionType.setBankCode(''));
        dispatch(NewSupplierBankModalActionType.setBank(''));
        dispatch(NewSupplierBankModalActionType.setAccountName(''));
    },
    changeStatus: (status) => {
        dispatch(supplierSettingDetailAction.changeAdvancedStatus(ownProps.match.params.id, status))
    },
    setAppUrl: (value) => {
        dispatch(SupplierSettingDetailActionType.setAppUrl(value))
    },
    setAppId: (value) => {
        dispatch(SupplierSettingDetailActionType.setAppId(value))
    },
    setAppSecret: (value) => {
        dispatch(SupplierSettingDetailActionType.setAppSecret(value))
    },
    setBaseAddrId: (value) => {
        dispatch(SupplierSettingDetailActionType.setBaseAddrId(value))
    },
    setReceiveId: (value) => {
        dispatch(SupplierSettingDetailActionType.setReceiveId(value))
    },
    setCarModuleId: (value) => {
        dispatch(SupplierSettingDetailActionType.setCarModuleId(value))
    },
    saveAdvancedSetting: () => {
        dispatch(supplierSettingDetailAction.saveAdvancedSetting(ownProps.match.params.id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SupplierSettingDetail)