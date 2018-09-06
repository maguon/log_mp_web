import React from 'react';

import { connect } from 'react-redux'
import {reduxForm} from "redux-form";
import Modal from 'react-modal';

const enquiryAction = require('../../actions/main/EnquiryAction');

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

/**
 * UI组件：询价模块。
 */
class Enquiry extends React.Component {
    constructor() {
        super();
        this.afterOpenModal = this.afterOpenModal.bind(this);
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    render() {
        const {enquiryReducer,closeModal} = this.props;
        return (
            <div>
                <Modal
                    isOpen={enquiryReducer.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                    <button onClick={closeModal}>close</button>
                    <div>I am a modal</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                </Modal>
            </div>
        );
    }
}

/**
 * 输入逻辑：外部的数据（即state对象）转换为 UI 组件的参数。
 * @param state
 * @returns {{initialValues}} 初期数据
 */
const mapStateToProps = (state) => {
    console.log('Enquiry mapStateToProps');
    return {
        enquiryReducer: state.EnquiryReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 * @param dispatch
 * @returns {{login: function(*=)}}
 */
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        // console.log(values)
        // console.log(dispatch)
        dispatch(enquiryAction.closeModal())
    }
});

/**
 * 从 UI 组件生成容器组件。
 */
export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
            // 必要参数，表单命名
            form: 'loginForm',
            // 可选参数 onChange : Function [optional] : 表单触发 onChange 事件后的回调。
            // 可选参数 onSubmit : Function [optional[ : 表单提交配置，可以配置需要提交哪些参数，还有提交时触发的 dispatch等
            // 验证
            // validate
        }
    )(Enquiry)
);