import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {NewLogSiteContactModalActionType} from "../../actionTypes";

const newLogSiteContactModalAction = require('../../actions/modules/NewLogSiteContactModalAction');

class NewLogSiteContactModal extends React.Component {

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
     * 更新 联系人
     */
    changeName = (event) => {
        this.props.setName(event.target.value);
    };

    /**
     * 更新 职务
     */
    changePosition = (event) => {
        this.props.setPosition(event.target.value);
    };

    /**
     * 更新 电话
     */
    changePhone = (event) => {
        this.props.setPhone(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newLogSiteContactModalReducer, closeModal, saveLogSiteContact} = this.props;
        return (
            <div id="newLogSiteContactModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">增加联系方式</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top40">
                        <Input s={4} label="电话" maxLength="20" value={newLogSiteContactModalReducer.phone} onChange={this.changePhone}/>
                        <Input s={4} label="联系人" maxLength="20" value={newLogSiteContactModalReducer.name} onChange={this.changeName}/>
                        <Input s={4} label="职务" maxLength="100" value={newLogSiteContactModalReducer.position} onChange={this.changePosition}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveLogSiteContact}>确定</button>
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
        newLogSiteContactModalReducer: state.NewLogSiteContactModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setName: (value) => {
        dispatch(NewLogSiteContactModalActionType.setName(value))
    },
    setPosition: (value) => {
        dispatch(NewLogSiteContactModalActionType.setPosition(value))
    },
    setPhone: (value) => {
        dispatch(NewLogSiteContactModalActionType.setPhone(value))
    },
    saveLogSiteContact: () => {
        dispatch(newLogSiteContactModalAction.saveLogSiteContact())
    },
    closeModal: () => {
        $('#newLogSiteContactModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewLogSiteContactModal);