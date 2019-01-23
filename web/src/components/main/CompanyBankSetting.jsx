import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {CompanyBankSettingActionType} from '../../actionTypes';
import {EditCompanyBankModal} from '../modules/index';

const companyBankSettingAction = require('../../actions/main/CompanyBankSettingAction');
const editCompanyBankModalAction = require('../../actions/modules/EditCompanyBankModalAction');

class CompanyBankSetting extends React.Component {

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
        this.props.setCompanyBank('');
        this.props.setCompanyBankCode('');
        this.props.setCompanyBankUser('');
        this.props.getCompanyBankList();
    }

    /**
     * 更新 追加内容：银行
     */
    changeCompanyBank = (event) => {
        this.props.setCompanyBank(event.target.value);
    };

    /**
     * 更新 追加内容：卡号
     */
    changeCompanyBankCode = (event) => {
        this.props.setCompanyBankCode(event.target.value);
    };

    /**
     * 更新 追加内容：收款人
     */
    changeCompanyBankUser = (event) => {
        this.props.setCompanyBankUser(event.target.value);
    };

    /**
     * 显示 修改账户信息
     */
    showEditCompanyBankModal = (companyBank) => {
        this.props.initCompanyBankModalData(companyBank);
        $('#editCompanyBankModal').modal('open');
    };

    render() {
        const {companyBankSettingReducer, addCompanyBank, changeStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">公司银行账户管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：新建数据 输入区域 */}
                <div className="row z-depth-1 margin-left50 margin-right50 detail-box">
                    <div className="col s11 margin-top20 search-condition-box">
                        <Input s={4} label="银行" maxLength="20" value={companyBankSettingReducer.companyBank} onChange={this.changeCompanyBank}/>
                        <Input s={4} label="卡号" maxLength="30" value={companyBankSettingReducer.companyBankCode} onChange={this.changeCompanyBankCode}/>
                        <Input s={4} label="收款人" maxLength="20" value={companyBankSettingReducer.companyBankUser} onChange={this.changeCompanyBankUser}/>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top20 add-btn" onClick={addCompanyBank}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                {companyBankSettingReducer.companyBankArray.length > 0 &&
                <div className="row margin-left40 margin-right40">
                    {companyBankSettingReducer.companyBankArray.map(function (item) {
                        return (
                            <div className="col s4 margin-top15 position-relative">
                                <div className="row white z-depth-1 detail-box height150">

                                    {/* 明细上部分：名称 */}
                                    <div className={`col s12 white-text fz16 padding-right0 ${item.status === 0 ? "custom-purple" : "grey"}`}>
                                        <div className="col s8 context-ellipsis fz18 margin-top10 margin-bottom10">{item.bank}</div>

                                        {/* 状态：开关 */}
                                        <div className="col s4 margin-top10 right-align">
                                            <i className="mdi mdi-pencil pointer white-text lighten-1" onClick={() => {this.showEditCompanyBankModal(item)}}/>
                                            <span className="switch">
                                                <label>
                                                  <input type="checkbox" checked={item.status === 0} onClick={() => {changeStatus(item.id, item.status)}}/>
                                                  <span className="lever"/>
                                                </label>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col s12 padding-top10 padding-bottom10 fz14 purple-font">
                                        <div className="col s12 margin-top5 fz18">{item.bank_code}</div>
                                        <div className="col s12 margin-top10 right-align">收款人：{item.account_name}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    },this)}
                </div>}
                <EditCompanyBankModal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        companyBankSettingReducer: state.CompanyBankSettingReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCompanyBankList: () => {
        dispatch(companyBankSettingAction.getCompanyBankList())
    },
    setCompanyBank: (value) => {
        dispatch(CompanyBankSettingActionType.setCompanyBank(value))
    },
    setCompanyBankCode: (value) => {
        dispatch(CompanyBankSettingActionType.setCompanyBankCode(value))
    },
    setCompanyBankUser: (value) => {
        dispatch(CompanyBankSettingActionType.setCompanyBankUser(value))
    },
    addCompanyBank: () => {
        dispatch(companyBankSettingAction.addCompanyBank())
    },
    changeStatus: (id, status) => {
        dispatch(companyBankSettingAction.changeCompanyBankStatus(id, status))
    },
    initCompanyBankModalData: (companyBank) => {
        dispatch(editCompanyBankModalAction.initEditCompanyBankModal(companyBank));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyBankSetting)