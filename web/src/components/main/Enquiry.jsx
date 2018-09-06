import React from 'react';

import { connect } from 'react-redux'
import {reduxForm} from "redux-form";
import ReactModal from 'react-modal';

const enquiryAction = require('../../actions/main/EnquiryAction');

/**
 * UI组件：询价模块。
 */
class Enquiry extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor() {
        super();
        this.afterOpenModal = this.afterOpenModal.bind(this);
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    /**
     * 渲染(挂载)画面。
     */
    render() {
        // pristine : true 表示表单数据为原始数据没被修改过，反之为 dirty。
        // submitting : 用于表示您的表单提交状态，他只会在您的表单提交后返回一个 promise 对象时起作用。 false 表示 promise 对象为 resolved 或 rejected 状态。
        // handleSubmit(eventOrSubmit) : Function : 提交表单的函数，如果表单需要验证，验证方法会被执行(包括同步和异步)。

        const {enquiryReducer,closeModal} = this.props;
        return (
            <div>
                <ReactModal
                    isOpen={enquiryReducer.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={closeModal}
                    className="Modal z-depth-3"
                    // overlayClassName="Overlay"
                    contentLabel="Example Modal"
                >

                    <div className="modal-title center-align white-text">询&nbsp;价</div>
                    {/*<h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>*/}

                    <div className="modal-content">
                        I am a modal
                        <form>
                            <button>tab navigation</button>
                            <button>stays</button>
                            <button>inside</button>


                        </form>
                    </div>


                    <div className="modal-footer">
                        <a onClick={closeModal} className="btn confirm-btn">确定</a>
                        <a onClick={closeModal} className="btn close-btn">关闭</a>
                    </div>
                </ReactModal>
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