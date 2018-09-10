import React from 'react';

import {connect} from 'react-redux'
import {Field, reduxForm, reset} from "redux-form";
import ReactModal from 'react-modal';
import Select from 'react-select';

const enquiryAction = require('../../actions/main/EnquiryAction');

// const vvv = msg => value => (!value && value != 0 && value != '') ? msg : undefined
// const vn = vvv('不能为空！')

const validate = (values) => {
    const errors = {};
    const requiredFields = [
        'startCity',
    ];
    const requiredTexts = [
        'valuation'
    ];
    // requiredFields.forEach(field => {
    //     console.log('selected value')
    //     console.log(values[field]);
    //     if (!values[field]) {
    //         errors[field] = '必填'
    //     }
    // });
    requiredTexts.forEach(field => {
        console.log('text')
        console.log(values[field]);
        if (!values[field]) {
            errors[field] = '必填'
        }
    });
    return errors
};

const renderField = ({
                         input,
                         label,
                         type,
                         meta: {touched, error},
                         id,
                     }) => {

    const labelClass = "validate " + (touched && error ? 'invalid' : '');
    const {value} = input.value;
    return (
        <div className="input-field col s12">
            <input id={id} {...input} type={type} value={value} className={labelClass} required/>
            <label for={id}>{label}</label>
            {(touched && (error && <span className="helper-text" data-error={error}></span>))}
        </div>
    )
};

// const MySelect = ({
//                       input,
//                       label,
//                       type,
//                       meta: {touched, error},
//                       id,
//                       sets
//                   }) => {
//     // const {value} = input.value;
//     console.log(props);
//
//     const {options, input: {onChange}, defaultValue, styleMode, searchable} = props;
//     return (
//         (error && <div className="temp">)
//             <Select
//                 options={options}
//                 onChange={onChange}
//                 defaultValue={defaultValue}
//                 styles={styleMode}
//                 isSearchable={searchable}
//             />
//         (error && </div>)
//     )
// };

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


// const selectField = ({
//                          input,
//                          label,
//                          selects,
//                          meta: { touched, error, warning }
//                      }) => (
//     <div className={touched && error ? 'has-error form-group':'form-group'}>
//         <div className="input-group">
//             <span className="input-group-addon">{label}</span>
//             <select {...input} className="form-control">
//                 {
//                     selects.map((item, i) => (
//                         <option key={i} value={item.value}>{item.text}</option>
//                     ))
//                 }
//             </select>
//         </div>
//         {touched &&
//         ((error && <div className="help-block with-errors">{error}</div>) ||
//             (warning && <div className="help-block with-errors">{warning}</div>))}
//     </div>
// )

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
        // this.afterOpenModal = this.afterOpenModal.bind(this);
    }


    // afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
    // }

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

    // componentWillUnmount() {
    //     this.props.clearForm()
    // }

    /**
     * 渲染(挂载)画面。
     */
    render() {
        // pristine : true 表示表单数据为原始数据没被修改过，反之为 dirty。
        // submitting : 用于表示您的表单提交状态，他只会在您的表单提交后返回一个 promise 对象时起作用。 false 表示 promise 对象为 resolved 或 rejected 状态。
        // handleSubmit(eventOrSubmit) : Function : 提交表单的函数，如果表单需要验证，验证方法会被执行(包括同步和异步)。

        const {enquiryReducer, closeModal, handleSubmit, enquiry, selectedStartCity} = this.props;

        return (
            <div>
                <ReactModal
                    isOpen={true}
                    // onAfterOpen={this.afterOpenModal}
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
                                    <Field id="startCity" name="startCity" component={MySelect}
                                           props={{
                                               value: enquiryReducer.startCity,
                                               defaultValue: enquiryReducer.defaultStartCity,
                                               searchable: false,
                                               styleMode: singleStyles,
                                               options: enquiryReducer.cityList
                                           }}/>
                                </div>
                            </div>
                            <div className="input-field col s4">
                                <div className="input-field col s12">
                                    <Field name="endCity" component={MySelect}
                                           props={{
                                               value: enquiryReducer.endCity,
                                               defaultValue: enquiryReducer.defaultEndCity,
                                               searchable: false,
                                               styleMode: singleStyles,
                                               options: enquiryReducer.cityList
                                           }}/>
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
                                           }}/>
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
                                           }}/>
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
                                           }}/>
                                </div>
                            </div>
                            <div className="input-field col s6">
                                <Field label="估值" name="valuation" id="valuation" type="text"
                                       component={renderField}/>
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
            form: 'enquiryForm',
            // 验证
            validate,
            // 可选参数 onChange : Function [optional] : 表单触发 onChange 事件后的回调。
            // 可选参数 onSubmit : Function [optional[ : 表单提交配置，可以配置需要提交哪些参数，还有提交时触发的 dispatch等
            onSubmit: (values, dispatch, props) => {
                console.log("reduxForm onSubmit inner");
                console.log('values is : ', values);

                dispatch(enquiryAction.calculateFreight(100));
            }

        }
    )(Enquiry)
);