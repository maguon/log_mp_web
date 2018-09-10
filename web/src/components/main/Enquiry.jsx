import React from 'react';

import {connect} from 'react-redux'
import {Field, reduxForm} from "redux-form";
import ReactModal from 'react-modal';
import Select from 'react-select';


const enquiryAction = require('../../actions/main/EnquiryAction');

const renderField = ({
                         input,
                         label,
                         type,
                         meta: {touched, error},
                         id,
                     }) => {

    const labelClass = "validate " + (touched && error ? 'invalid' : '');
    console.log(input)
    const {value} = input.value;
    return (
        <div className="input-field col s12">
            <input id={id} type={type} value={value} className={labelClass} required/>
            <label for={id}>{label}</label>
            {(touched && (error && <span className="helper-text" data-error={error}></span>))}
        </div>
    )
}

const MySelect = props => {
    const {options, input: {onChange}, defaultValue, styleMode, searchable} = props;
    return (
        <Select
            options={options}
            onChange={onChange}
            defaultValue={defaultValue}
            styles={styleMode}
            isSearchable={searchable}
        />
    )
};

// const customStyles = {
//     option: (base, state) => ({
//         ...base,
//         borderBottom: '1px dotted pink',
//         padding: 20,
//     }),
//     control: () => ({
//         // none of react-selects styles are passed to <View />
//         width: 200,
//     }),
//     singleValue: (base, state) => {
//         const opacity = state.isDisabled ? 0.5 : 1;
//         const transition = 'opacity 300ms';
//
//         return {...base, opacity, transition};
//     }
// }

const singleStyles = {
    control: styles => ({
        ...styles,
        height: '47px',
        borderRadius: "0",
        borderTop: "0",
        borderLeft: "0",
        borderRight: "0"
    }),
    indicatorSeparator: styles => ({...styles, display: 'none'}),
    valueContainer: styles => ({...styles, paddingLeft: '0'})
};



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


    changeStartCity;

    handleChange = (selectedStartCity) => {
        console.log(`Option selected:`, selectedStartCity);
        this.setState({selectedStartCity});
    }

    // handleChange = e => {
    //     this.setState({
    //         value: e.target.value
    //     })
    // }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        // 模拟ajax调用，成功之后把需要改变的默认值赋值给this.state.value
        // setTimeout(() => {
        //     this.setState({
        //         projects: [{ id: 1, name: '花生' }, { id: 2, name: '苹果' }, { id: 3, name: '杨桃' }],
        //         value: 1
        //     })
        // }, 1000)
    }

    /**
     * 渲染(挂载)画面。
     */
    render() {
        // pristine : true 表示表单数据为原始数据没被修改过，反之为 dirty。
        // submitting : 用于表示您的表单提交状态，他只会在您的表单提交后返回一个 promise 对象时起作用。 false 表示 promise 对象为 resolved 或 rejected 状态。
        // handleSubmit(eventOrSubmit) : Function : 提交表单的函数，如果表单需要验证，验证方法会被执行(包括同步和异步)。

        const {enquiryReducer, closeModal, handleSubmit, changeStartCity, enquiry, handleChange, selectedStartCity} = this.props;

// console.log('formReducer',this.props.formReducer)
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
                    <form>

                        <div className="modal-title center-align white-text">询&nbsp;价</div>

                        <div className="modal-content row">
                            <div className="input-field col s6">
                                <div className="input-field col s12">
                                    <Field name="startCity" component={MySelect}
                                           props={{
                                               value:enquiryReducer.startCity,
                                               defaultValue: enquiryReducer.defaultStartCity,
                                               searchable: false,
                                               styleMode: singleStyles,
                                               options: enquiryReducer.cityList
                                           }}
                                    />
                                </div>
                            </div>
                            <div className="input-field col s4">
                                <div className="input-field col s12">
                                    <Field name="endCity" component={MySelect}
                                           props={{
                                               value:enquiryReducer.endCity,
                                               defaultValue: enquiryReducer.defaultEndCity,
                                               searchable: false,
                                               styleMode: singleStyles,
                                               options: enquiryReducer.cityList
                                           }}
                                    />
                                </div>
                            </div>
                            <div className="input-field col s2 right-align">
                                <div className="input-field col s12">
                                    <span>{enquiryReducer.mileage}</span>公里
                                </div>
                            </div>

                            <div className="input-field col s6">
                                <div className="input-field col s12">
                                    <Field name="serviceMode" component={MySelect}
                                           props={{
                                               value: enquiryReducer.serviceMode,
                                               defaultValue: enquiryReducer.defaultServiceMode,
                                               searchable: false,
                                               styleMode: singleStyles,
                                               options: enquiryReducer.serviceModeList
                                           }}
                                    />

                                </div>
                            </div>
                            <div className="input-field col s6">
                                <div className="input-field col s12">
                                    <Field name="carModel" component={MySelect}
                                           props={{
                                               value: enquiryReducer.carModel,
                                               defaultValue: enquiryReducer.defaultCarModel,
                                               searchable: false,
                                               styleMode: singleStyles,
                                               options: enquiryReducer.carModelList
                                           }}
                                    />
                                </div>
                            </div>

                            <div className="input-field col s6">
                                <div className="input-field col s12">
                                    <Field name="carFlag" component={MySelect}
                                           props={{
                                               value: enquiryReducer.carFlag,
                                               defaultValue: enquiryReducer.defaultCarFlag,
                                               searchable: false,
                                               styleMode: singleStyles,
                                               options: enquiryReducer.carFlagList
                                           }}
                                    />
                                </div>
                            </div>
                            <div className="input-field col s6">
                                <Field label="估值" name="valuation" id="valuation" type="text" component={renderField}/>
                            </div>

                            <div className="input-field col s12 right-align">
                                <div className="input-field col s12">
                                    预计运费：<span>{enquiryReducer.freight}</span>元
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn confirm-btn" type="submit" onClick={handleSubmit}>确定</button>
                            <button className="btn close-btn" onClick={closeModal}>关闭</button>
                        </div>
                    </form>
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
            onSubmit: (values, dispatch, props) => {
                console.log("reduxForm onSubmit inner");
                console.log('values is : ', values)

                if (typeof(values.startCity) === "undefined" || typeof(values.endCity) === "undefined" === ""
                    || typeof(values.serviceMode) === "undefined" === "" || typeof(values.carModel) === "undefined" === ""
                    || typeof(values.carFlag) === "undefined" === "" || typeof(values.valuation) === "undefined" === "") {

                    console.log('--------------------------------has error--------------------------------');

                } else {
                    console.log('calculation success');
                    dispatch(enquiryAction.calculateFreight(100));
                }
            }
            // 验证
            // validate

        }
    )(Enquiry)
);