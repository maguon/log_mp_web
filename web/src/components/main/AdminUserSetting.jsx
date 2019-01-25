import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {AdminUserSettingActionType} from '../../actionTypes';
import {NewAdminModal} from '../modules/index';

const commonAction = require('../../actions/main/CommonAction');
const adminUserSettingAction = require('../../actions/main/AdminUserSettingAction');
const newAdminModalAction = require('../../actions/modules/NewAdminModalAction');

const sysConst = require('../../util/SysConst');
const commonUtil = require('../../util/CommonUtil');

class AdminUserSetting extends React.Component {

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
            this.props.setConditionNo('');
            this.props.setConditionAdminName('');
            this.props.changeConditionDepartment(null);
            this.props.changeConditionStatus(null);
        }
        this.props.getDepartmentList();
        this.props.getAdminList();
    }

    /**
     * 更新 检索条件：员工编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：姓名
     */
    changeConditionAdminName = (event) => {
        this.props.setConditionAdminName(event.target.value);
    };

    /**
     * 查询员工列表
     */
    queryAdminList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getAdminList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.adminUserSettingReducer.start - (this.props.adminUserSettingReducer.size - 1));
        this.props.getAdminList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.adminUserSettingReducer.start + (this.props.adminUserSettingReducer.size - 1));
        this.props.getAdminList();
    };

    /**
     * 显示 新建/编辑 供应商信息
     */
    showNewAdminModal = () => {
        this.props.initModalData();
        $('#newAdminModal').modal('open');
    };

    render() {
        const {adminUserSettingReducer, commonReducer, changeConditionDepartment, changeConditionStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">员工管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">
                        <Input s={3} label="员工编号" value={adminUserSettingReducer.conditionNo} onChange={this.changeConditionNo}/>

                        <Input s={3} label="姓名" value={adminUserSettingReducer.conditionAdminName} onChange={this.changeConditionAdminName}/>

                        <div className="input-field col s3">
                            <Select
                                options={commonReducer.departmentList}
                                onChange={changeConditionDepartment}
                                value={adminUserSettingReducer.conditionDepartment}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">部门</label>
                        </div>

                        <div className="input-field col s3">
                            <Select
                                options={sysConst.USE_FLAG}
                                onChange={changeConditionStatus}
                                value={adminUserSettingReducer.conditionStatus}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">状态</label>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryAdminList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn add-btn" onClick={this.showNewAdminModal}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                    <NewAdminModal/>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">
                        <table className="bordered striped">
                            <thead className="custom-dark-grey table-top-line">
                            <tr className="grey-text text-darken-2">
                                <th>员工编号</th>
                                <th>手机</th>
                                <th>姓名</th>
                                <th>性别</th>
                                <th>部门</th>
                                <th>状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {adminUserSettingReducer.adminArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.real_name}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.GENDER, item.gender)}</td>
                                        <td>{item.department_name}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.USE_FLAG, item.status)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/admin_user_setting/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            { adminUserSettingReducer.adminArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="7">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {adminUserSettingReducer.start > 0 && adminUserSettingReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {adminUserSettingReducer.dataSize >= adminUserSettingReducer.size &&
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
        adminUserSettingReducer: state.AdminUserSettingReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getDepartmentList: () => {
        dispatch(commonAction.getDepartmentList())
    },
    getAdminList: () => {
        dispatch(adminUserSettingAction.getAdminList())
    },
    setStartNumber: (start) => {
        dispatch(AdminUserSettingActionType.setStartNumber(start))
    },
    setConditionNo: (value) => {
        dispatch(AdminUserSettingActionType.setConditionNo(value))
    },
    setConditionAdminName: (value) => {
        dispatch(AdminUserSettingActionType.setConditionAdminName(value))
    },
    changeConditionDepartment: (value) => {
        dispatch(AdminUserSettingActionType.setConditionDepartment(value))
    },
    changeConditionStatus: (value) => {
        dispatch(AdminUserSettingActionType.setConditionStatus(value))
    },
    initModalData: () => {
        dispatch(newAdminModalAction.initNewAdminModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserSetting)