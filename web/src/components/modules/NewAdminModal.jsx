import React from 'react';
import Select from 'react-select';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {NewAdminModalActionType} from "../../actionTypes";

const commonAction = require('../../actions/main/CommonAction');
const newAdminModalAction = require('../../actions/modules/NewAdminModalAction');
const sysConst = require('../../util/SysConst');

class NewAdminModal extends React.Component {

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
        this.props.getDepartmentList();
    }

    /**
     * 更新 手机
     */
    changePhone = (event) => {
        this.props.setPhone(event.target.value);
    };

    /**
     * 更新 密码
     */
    changePassword = (event) => {
        this.props.setPassword(event.target.value);
    };


    /**
     * 更新 姓名
     */
    changeAdminName = (event) => {
        this.props.setAdminName(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newAdminModalReducer, commonReducer, setAdminGender, changeDepartment,closeModal, saveAdmin} = this.props;
        return (
            <div id="newAdminModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">新增员工</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top40">
                        <Input s={6} label={<span><span className="must-input">*</span>手机</span>} maxLength="20" value={newAdminModalReducer.phone} onChange={this.changePhone}/>
                        <Input s={6} label={<span><span className="must-input">*</span>密码</span>} maxLength="20" value={newAdminModalReducer.password} onChange={this.changePassword}/>

                        <div className="custom-input-field col s6">
                            <Input s={9} label="姓名" maxLength="20" value={newAdminModalReducer.adminName} onChange={this.changeAdminName}/>
                            <div className="input-field col s3 fz30 right-align">
                                <i className={`pointer mdi mdi-human-male ${newAdminModalReducer.gender === 1 ? "blue-text" : ""}`} onClick={() => {setAdminGender(1)}}/>
                                <i className={`pointer mdi mdi-human-female margin-left10 ${newAdminModalReducer.gender === 0 ? "pink-font" : ""}`} onClick={() => {setAdminGender(0)}}/>
                            </div>
                        </div>

                        <div className="input-field col s6">
                            <Select
                                options={commonReducer.departmentList}
                                onChange={changeDepartment}
                                value={newAdminModalReducer.department}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE_FOR_MODAL}
                                backspaceRemovesValue={false}
                                isClearable={false}
                            />
                            <label className="active">部门</label>
                        </div>
                    </div>

                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className={`btn confirm-btn margin-left20 ${newAdminModalReducer.errorRouteFlg ? "disabled" : ""}`}
                            onClick={saveAdmin}>确定</button>
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
        newAdminModalReducer: state.NewAdminModalReducer,
        commonReducer: state.CommonReducer,
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    getDepartmentList: () => {
        dispatch(commonAction.getDepartmentList())
    },
    setPhone: (value) => {
        dispatch(NewAdminModalActionType.setPhone(value));
    },
    setPassword: (value) => {
        dispatch(NewAdminModalActionType.setPassword(value));
    },
    setAdminName: (value) => {
        dispatch(NewAdminModalActionType.setAdminName(value));
    },
    setAdminGender: (value) => {
        dispatch(NewAdminModalActionType.setAdminGender(value));
    },
    changeDepartment: (value) => {
        dispatch(NewAdminModalActionType.setDepartment(value));
    },
    saveAdmin: () => {
        dispatch(newAdminModalAction.saveAdmin());
    },
    closeModal: () => {
        $('#newAdminModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAdminModal);