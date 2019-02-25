import React from 'react';
import {Input} from 'react-materialize';
import {connect} from 'react-redux';
import {AdvertisingModalActionType} from "../../actionTypes";

const advertisingModalAction = require('../../actions/modules/AdvertisingModalAction');

/**
 * UI组件：广告语 模块。
 */
class AdvertisingModal extends React.Component {

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
     * 更新 广告语
     */
    changeAdvertisement = (event) => {
        this.props.setAdvertisement(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {advertisingModalReducer, closeModal, editAdvertisement} = this.props;
        return (
            <div id="advertisingModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">广告语</div>

                {/** Modal主体 */}
                <div className="modal-content padding-bottom0 white grey-text text-darken-2">
                    <div className="row margin-top40">
                        <Input s={12} label="广告语" maxLength="16" value={advertisingModalReducer.advertisement} onChange={this.changeAdvertisement}/>
                        <div className="right-align padding-right10 pink-font">最多可写16个字</div>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={editAdvertisement}>确定</button>
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
        advertisingModalReducer: state.AdvertisingModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setAdvertisement: (value) => {
        dispatch(AdvertisingModalActionType.setAdvertisement(value));
    },
    editAdvertisement: () => {
        dispatch(advertisingModalAction.editAdvertisement());
    },
    closeModal: () => {
        $('#advertisingModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvertisingModal);