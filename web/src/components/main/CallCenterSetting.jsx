import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {CallCenterSettingActionType} from '../../actionTypes';
import {EditCustomerPhoneModal} from '../modules/index';

const callCenterSettingAction = require('../../actions/main/CallCenterSettingAction');
const editCustomerPhoneModalAction = require('../../actions/modules/EditCustomerPhoneModalAction');

class CallCenterSetting extends React.Component {

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
        this.props.setCustomerPhone('');
        this.props.getCustomerPhoneList();
    }

    /**
     * 更新 追加内容：客服电话
     */
    changeCustomerPhone = (event) => {
        this.props.setCustomerPhone(event.target.value);
    };

    /**
     * 显示 修改客服电话
     */
    showEditCustomerPhoneModal = (customerPhoneInfo) => {
        this.props.initCustomerPhoneModalData(customerPhoneInfo);
        $('#editCustomerPhoneModal').modal('open');
    };

    render() {
        const {callCenterSettingReducer, addCustomerPhone, deleteCustomerPhone} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">客服电话</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：新建数据 输入区域 */}
                <div className="row z-depth-1 margin-left50 margin-right50 detail-box">
                    <div className="col s10 margin-top20 search-condition-box">
                        <Input s={12} label="客服电话" maxLength="20" value={callCenterSettingReducer.customerPhone} onChange={this.changeCustomerPhone}/>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s2 right-align">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top20 add-btn" onClick={addCustomerPhone}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                {callCenterSettingReducer.customerPhoneArray.length > 0 &&
                <div className="row margin-left40 margin-right40">
                    {callCenterSettingReducer.customerPhoneArray.map(function (item) {
                        return (
                            <div className="col s4 margin-top15 position-relative">
                                <div className="row white z-depth-1 detail-box">

                                    {/* 明细上部分：名称 */}
                                    <div className="col s12 purple-font fz16">
                                        <div className="col s8 context-ellipsis fz18 margin-top10 margin-bottom10">
                                            {item.phone}
                                        </div>
                                        <div className="col s4 margin-top10 fz20 right-align">
                                            <i className="mdi mdi-pencil pointer" onClick={() => {this.showEditCustomerPhoneModal(item)}}/>
                                            <i className="mdi mdi-close pointer margin-left20" onClick={() => {deleteCustomerPhone(item.id)}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    },this)}
                </div>}
                <EditCustomerPhoneModal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        callCenterSettingReducer: state.CallCenterSettingReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCustomerPhoneList: () => {
        dispatch(callCenterSettingAction.getCustomerPhoneList())
    },
    setCustomerPhone: (value) => {
        dispatch(CallCenterSettingActionType.setCustomerPhone(value))
    },
    addCustomerPhone: () => {
        dispatch(callCenterSettingAction.addCustomerPhone())
    },
    deleteCustomerPhone: (id) => {
        dispatch(callCenterSettingAction.deleteCustomerPhone(id))
    },
    initCustomerPhoneModalData: (customerPhoneInfo) => {
        dispatch(editCustomerPhoneModalAction.initEditCustomerPhoneModal(customerPhoneInfo));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CallCenterSetting)