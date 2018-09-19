import React from 'react';

import {connect} from 'react-redux'
import {Field, reduxForm} from "redux-form";
import {ReactSelect} from '../utils/index';
import {EnquiryActionType} from "../../actionTypes";

const enquiryAction = require('../../actions/main/EnquiryAction');

// const vvv = msg => value => (!value && value != 0 && value != '') ? msg : undefined;
// const vn = vvv('不能为空！!!!!');
// const hasSelect = msg => value => (value === '') ? msg : undefined;
// const vn2 = hasSelect('error!!!!!!');

const validate = values => {
    const errors = {};
    // 始发城市
    if (!values.startCity || values.startCity.length === 0 || values.startCity.value === "") {
        errors.startCity = '必填'
    }
    // 终到城市
    if (!values.endCity || values.endCity.length === 0 || values.endCity.value === "") {
        errors.endCity = '必填'
    }
    // 服务方式
    if (!values.serviceMode || values.serviceMode.length === 0 || values.serviceMode.value === "") {
        errors.serviceMode = '必填'
    }
    // 车型
    if (!values.carModel || values.carModel.length === 0 || values.carModel.value === "") {
        errors.carModel = '必填'
    }
    // 是否新车
    if (!values.carFlag || values.carFlag.length === 0 || values.carFlag.value === "") {
        errors.carFlag = '必填'
    }
    // if (!values.email) {
    //     errors.email = 'Required'
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address'
    // }
    // if (!values.age) {
    //     errors.age = 'Required'
    // } else if (isNaN(Number(values.age))) {
    //     errors.age = 'Must be a number'
    // } else if (Number(values.age) < 18) {
    //     errors.age = 'Sorry, you must be at least 18 years old'
    // }
    // 估值
    if (!values.valuation) {
        errors.valuation = '必填'
    }
    return errors
};

const renderField = ({
                         input,
                         label,
                         type,
                         meta: {touched, error},
                         id
                     }) => {

    // const labelClass = "validate " + (touched && error ? 'invalid' : '');
    return (
        <div>
            {/*<input id={id} {...input} type={type} className={labelClass}/>*/}
            <input id={id} {...input} type={type}/>
            <label for={id}><span className="red-text">*</span>{label}</label>
            {/*{(touched && (error && <span className="helper-text" data-error={error}></span>))}*/}
            {(touched && (error && <span className="error-msg">{error}</span>))}
        </div>
    )
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
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        const {changeStartCity} = this.props;
        console.log('componentDidMount');
        $('.modal').modal();
        // $('select').formSelect();
        // 模拟ajax调用，成功之后把需要改变的默认值赋值给this.state.value
        // setTimeout(() => {
        //     this.setState({
        //         projects: [{ id: 1, name: '花生' }, { id: 2, name: '苹果' }, { id: 3, name: '杨桃' }],
        //         value: 1
        //     })
        // }, 1000)
        // $('select').formSelect();
    }

    // componentWillUnmount() {
    //     console.log('componentWillUnmount');
    //     // this.props.clearForm()
    // }


    /**
     * 渲染(挂载)画面。
     */
    render() {
        // pristine : true 表示表单数据为原始数据没被修改过，反之为 dirty。
        // submitting : 用于表示您的表单提交状态，他只会在您的表单提交后返回一个 promise 对象时起作用。 false 表示 promise 对象为 resolved 或 rejected 状态。
        // handleSubmit(eventOrSubmit) : Function : 提交表单的函数，如果表单需要验证，验证方法会被执行(包括同步和异步)。
        const {enquiryReducer, handleSubmit, closeModal, pristine, submitting, setStartCity, setEndCity, calculateMileage, calculateFreight} = this.props;

        const handleInputChange = (value, actionMeta) => {
            // 如果action 是 set-value 时（避免重复调用），执行计算里程
            console.log('actionMeta',actionMeta);
            console.log('value',value);
            if (actionMeta.action === 'set-value') {
                console.log('计算里程开始。。。。',enquiryReducer);
                calculateMileage(enquiryReducer.startCity, enquiryReducer.endCity);
            }
        };

        return (
            <div>
                <div id="enquiryModal" className="modal modal-fixed-footer row">

                    <form onSubmit={handleSubmit(calculateFreight)}>

                        {/** Modal头部：Title */}
                        <div className="modal-title center-align white-text">询&nbsp;价</div>

                        {/** Modal主体 */}
                        <div className="modal-content">

                            {/** 第一行 */}
                            <div className="row">
                                <div className="input-field col s6">
                                    <Field name="startCity" component={ReactSelect}
                                           props={{
                                               options: enquiryReducer.cityList,
                                               // selectValue : enquiryReducer.startCity,
                                               placeholder: "始发城市",
                                               searchable: true,
                                               onInputChange: handleInputChange
                                           }}/>
                                </div>
                                <div className="input-field col s4">
                                    <Field name="endCity" component={ReactSelect}
                                           props={{
                                               options: enquiryReducer.cityList,
                                               placeholder: "终到城市",
                                               searchable: true,
                                               // onInputChange: changeStartCity
                                           }}/>
                                </div>
                                <div className="input-field col s2 right-align">
                                    <div className="input-field col s12">
                                        <span className="red-font">{enquiryReducer.mileage}</span>公里
                                    </div>
                                </div>
                            </div>

                            {/** 第二行 */}
                            <div className="row">
                                <div className="input-field col s6">
                                    <Field name="serviceMode" component={ReactSelect}
                                           props={{
                                               options: enquiryReducer.serviceModeList,
                                               placeholder: "服务方式",
                                               searchable: false
                                           }}/>
                                </div>
                                <div className="input-field col s6">
                                    <Field name="carModel" component={ReactSelect}
                                           props={{
                                               options: enquiryReducer.carModelList,
                                               placeholder: "车型",
                                               searchable: false
                                           }}/>
                                </div>
                            </div>

                            {/** 第三行 */}
                            <div className="row">
                                <div className="input-field col s6">
                                    <Field name="carFlag" component={ReactSelect}
                                           props={{
                                               options: enquiryReducer.carFlagList,
                                               placeholder: "是否新车",
                                               searchable: false
                                           }}/>
                                </div>
                                <div className="input-field col s6">
                                    <Field type="text" label="估值" id="valuation" name="valuation" component={renderField}/>
                                </div>
                            </div>

                            {/** 最终行：预计运费 */}
                            <div className="row input-field col s12 right-align">
                                <div className="input-field col s12">
                                    预计运费：<span className="red-font">{enquiryReducer.freight}</span>元
                                </div>
                            </div>
                        </div>

                        {/** Modal固定底部：取消确定按钮 */}
                        <div className="modal-footer">
                            <button type="button" className="btn close-btn" onClick={closeModal}>关闭</button>
                            <button type="submit" className="btn confirm-btn" disabled={submitting | pristine}>确定</button>
                        </div>

                    </form>
                </div>
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
        // initialValues: state.EnquiryReducer.data,
        enquiryReducer: state.EnquiryReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 * @param dispatch
 * @returns {{login: function(*=)}}
 */
const mapDispatchToProps = (dispatch) => ({
    //
    setStartCity: (startCity) => {
        dispatch(EnquiryActionType.setStartCity(startCity))
    },
    setEndCity: (endCity) => {
        dispatch(EnquiryActionType.setEndCity(endCity))
    },



    closeModal: () => {
        $('#enquiryModal').modal('close');
    },
    calculateMileage: () => {
        // dispatch(enquiryAction.calculateMileage())
    },
    calculateFreight: (values) => {
        console.log('values is : ', values);
        dispatch(enquiryAction.calculateFreight(100));
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
            }
        }
    )(Enquiry)
);