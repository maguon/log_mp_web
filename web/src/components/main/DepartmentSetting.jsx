import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {DepartmentSettingActionType} from '../../actionTypes';
import {EditDepartmentModal} from '../modules/index';

const departmentSettingAction = require('../../actions/main/DepartmentSettingAction');
const editDepartmentModalAction = require('../../actions/modules/EditDepartmentModalAction');

class DepartmentSetting extends React.Component {

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
        this.props.setDepartmentName('');
        this.props.getDepartmentList();
    }

    /**
     * 更新 追加内容：部门名称
     */
    changeDepartmentName = (event) => {
        this.props.setDepartmentName(event.target.value);
    };

    // /**
    //  * 显示 修改账户信息
    //  */
    // showEditDepartmentModal = (departmentInfo) => {
    //     this.props.initDepartmentModalData(departmentInfo);
    //     $('#editDepartmentModal').modal('open');
    // };

    render() {
        const {departmentSettingReducer, addDepartment} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">部门管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：新建数据 输入区域 */}
                <div className="row z-depth-1 margin-left50 margin-right50 detail-box">
                    <div className="col s10 margin-top20 search-condition-box">
                        <Input s={12} label="部门" maxLength="20" value={departmentSettingReducer.departmentName} onChange={this.changeDepartmentName}/>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s2 right-align">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top20 add-btn" onClick={addDepartment}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                {departmentSettingReducer.departmentArray.length > 0 &&
                <div className="row margin-left40 margin-right40">
                    {departmentSettingReducer.departmentArray.map(function (item) {
                        return (
                            <div className="col s4 margin-top15 position-relative">
                                <div className="row white z-depth-1 detail-box">

                                    {/* 明细上部分：名称 */}
                                    <div className={`col s12 white-text fz16 ${item.status === 0 ? "custom-purple" : "grey"}`}>
                                        <div className="col s9 context-ellipsis fz18 margin-top10 margin-bottom10">{item.department_name}</div>

                                        <div className="col s3 margin-top10 fz20 right-align">
                                            <i className="mdi mdi-pencil pointer white-text lighten-1" onClick={() => {this.showEditDepartmentModal(item)}}/>
                                        </div>
                                    </div>

                                    {/*<div className="col s12 padding-top15 padding-bottom15 right-align">*/}
                                        {/*/!* 状态：开关 *!/*/}
                                        {/*<span className="switch">*/}
                                            {/*<label>*/}
                                              {/*<input type="checkbox" checked={item.status === 0} onClick={() => {changeStatus(item.id, item.status)}}/>*/}
                                              {/*<span className="lever"/>*/}
                                            {/*</label>*/}
                                        {/*</span>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        )
                    },this)}
                </div>}
                <EditDepartmentModal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        departmentSettingReducer: state.DepartmentSettingReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getDepartmentList: () => {
        dispatch(departmentSettingAction.getDepartmentList())
    },
    setDepartmentName: (value) => {
        dispatch(DepartmentSettingActionType.setDepartmentName(value))
    },
    addDepartment: () => {
        dispatch(departmentSettingAction.addDepartment())
    },
    // changeStatus: (id, status) => {
    //     dispatch(departmentSettingAction.changeDepartmentStatus(id, status))
    // },
    // initDepartmentModalData: (departmentInfo) => {
    //     dispatch(editDepartmentModalAction.initEditDepartmentModal(departmentInfo));
    // }
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentSetting)