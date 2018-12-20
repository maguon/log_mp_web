import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {EditUserAddressModalActionType} from "../../actionTypes";

const editUserAddressModalAction = require('../../actions/modules/EditUserAddressModalAction');

class EditUserAddressModal extends React.Component {

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
    }

    /**
     * 更新 用户名
     */
    changeOrderUser = (event) => {
        this.props.setOrderUser(event.target.value);
    };

    /**
     * 更新 电话
     */
    changeOrderPhone = (event) => {
        this.props.setOrderPhone(event.target.value);
    };

    /**
     * 更新 地址
     */
    changeOrderAddress = (event) => {
        this.props.setOrderAddress(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {editUserAddressModalReducer, closeModal, saveOrderUserAddress} = this.props;
        return (
            <div id="editUserAddressModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">{editUserAddressModalReducer.pageType === 'send' ? '发货信息' : '收货信息'}</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row">
                        <div className="col s12 margin-top20">
                            <Input s={6} label={editUserAddressModalReducer.pageType === 'send' ? '发货人' : '收货人'} maxLength="20" value={editUserAddressModalReducer.orderUser} onChange={this.changeOrderUser}/>
                            <Input s={6} label="电话" maxLength="20" value={editUserAddressModalReducer.orderPhone} onChange={this.changeOrderPhone}/>
                            <Input s={12} label="地址" maxLength="100" value={editUserAddressModalReducer.orderAddress} onChange={this.changeOrderAddress}/>
                        </div>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveOrderUserAddress}>确定</button>
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
        editUserAddressModalReducer: state.EditUserAddressModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setOrderUser: (value) => {
        dispatch(EditUserAddressModalActionType.setOrderUser(value))
    },
    setOrderPhone: (value) => {
        dispatch(EditUserAddressModalActionType.setOrderPhone(value))
    },
    setOrderAddress: (value) => {
        dispatch(EditUserAddressModalActionType.setOrderAddress(value))
    },
    saveOrderUserAddress: () => {
        dispatch(editUserAddressModalAction.saveOrderUserAddress())
    },
    closeModal: () => {
        $('#editUserAddressModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserAddressModal);