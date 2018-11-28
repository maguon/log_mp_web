import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import {ReactSelect} from '../utils/index';
import {EnquiryActionType} from "../../actionTypes";

const enquiryAction = require('../../actions/main/EnquiryAction');

const renderField = ({
                         input,
                         label,
                         type,
                         meta: {touched, error},
                         id
                     }) => {
    return (
        <div>
            <input id={id} {...input} type={type}/>
            <label for={id}>{label}</label>
            {(touched && (error && <span className="error-msg">{error}</span>))}
        </div>
    )
};

/**
 * UI组件：询价模块。
 */
class EnquiryForm extends React.Component {

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
     * 改变估值
     */
    changeValuation = (event) => {
        this.props.changeValuation(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        // pristine : true 表示表单数据为原始数据没被修改过，反之为 dirty。
        // submitting : 用于表示您的表单提交状态，他只会在您的表单提交后返回一个 promise 对象时起作用。 false 表示 promise 对象为 resolved 或 rejected 状态。
        // handleSubmit(eventOrSubmit) : Function : 提交表单的函数，如果表单需要验证，验证方法会被执行(包括同步和异步)。
        const {enquiryReducer, changeStartCity, changeEndCity, changeServiceMode, changeCarModel, changeCarFlag, closeModal} = this.props;
        return (
            <div>
                <div id="enquiryModal" className="modal modal-fixed-footer row">

                    <form>

                        {/** Modal头部：Title */}
                        <div className="modal-title center-align white-text">询&nbsp;价</div>

                        {/** Modal主体 */}
                        <div className="modal-content">

                            {/** 第一行 */}
                            <div className="row">
                                <div className="input-field col s6">
                                    <Field name="startCity" component={ReactSelect} onChange={changeStartCity}
                                           props={{
                                               options: enquiryReducer.cityList,
                                               placeholder: "始发城市",
                                               searchable: true,
                                           }}/>
                                </div>
                                <div className="input-field col s4">
                                    <Field name="endCity" component={ReactSelect} onChange={changeEndCity}
                                           props={{
                                               options: enquiryReducer.cityList,
                                               placeholder: "终到城市",
                                               searchable: true,
                                           }}/>
                                </div>
                                <div className="input-field col s2 right-align">
                                    <div className="input-field col s12" style={{paddingLeft: 0, paddingRight: 0}}>
                                        <span className="red-font margin-left5 fz18">{enquiryReducer.mileage}</span>公里
                                    </div>
                                </div>
                            </div>

                            {/** 第二行 */}
                            <div className="row">
                                <div className="input-field col s6">
                                    <Field name="serviceMode" component={ReactSelect} onChange={changeServiceMode}
                                           props={{
                                               options: enquiryReducer.serviceModeList,
                                               placeholder: "服务方式",
                                               searchable: false
                                           }}/>
                                </div>
                                <div className="input-field col s6">
                                    <Field name="carModel" component={ReactSelect} onChange={changeCarModel}
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
                                    <Field name="carFlag" component={ReactSelect} onChange={changeCarFlag}
                                           props={{
                                               options: enquiryReducer.carFlagList,
                                               placeholder: "是否新车",
                                               searchable: false
                                           }}/>
                                </div>
                                <div className="input-field col s6">
                                    <Field type="number" label="估值" id="valuation" name="valuation"
                                           onChange={this.changeValuation}
                                           component={renderField}/>
                                </div>
                            </div>

                            {/** 最终行：预计运费 */}
                            <div className="row input-field col s12">
                                <div className="col left-align" style={{width: '4%'}}>
                                    {enquiryReducer.errorRouteFlg &&
                                    <div className="bold red-text">
                                        <span className="mdi mdi-alert-circle red-text fz30"/>
                                    </div>
                                    }
                                </div>
                                <div className="col left-align" style={{width: '60%', marginTop: '12px'}}>
                                    {enquiryReducer.errorRouteFlg &&
                                    <div className="bold red-text">
                                        当前线路暂未开通，请重新选择线路或到线路设置中对该线路进行设置
                                    </div>
                                    }
                                </div>

                                <div className="col right-align" style={{width: '36%', marginTop: '12px'}}>
                                    预计运费：<span className="red-font margin-left5 fz18">{enquiryReducer.freight}</span>元
                                </div>
                            </div>
                        </div>

                        {/** Modal固定底部：取消确定按钮 */}
                        <div className="modal-footer">
                            <button type="button" className="btn close-btn" onClick={closeModal}>关闭</button>
                        </div>

                    </form>
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
        enquiryReducer: state.EnquiryReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    changeStartCity: (startCity) => {
        dispatch(EnquiryActionType.setStartCity(startCity));
        dispatch(enquiryAction.calculateMileage())
    },
    changeEndCity: (endCity) => {
        dispatch(EnquiryActionType.setEndCity(endCity));
        dispatch(enquiryAction.calculateMileage())
    },
    changeServiceMode: (serviceMode) => {
        dispatch(EnquiryActionType.setServiceMode(serviceMode));
        dispatch(enquiryAction.calculateFreight());
    },
    changeCarModel: (carModel) => {
        dispatch(EnquiryActionType.setCarModel(carModel));
        dispatch(enquiryAction.calculateFreight());
    },
    changeCarFlag: (carFlag) => {
        dispatch(EnquiryActionType.setCarFlag(carFlag));
        dispatch(enquiryAction.calculateFreight());
    },
    changeValuation: (valuation) => {
        dispatch(EnquiryActionType.setValuation(valuation));
        dispatch(enquiryAction.calculateFreight());
    },
    closeModal: () => {
        $('#enquiryModal').modal('close');
    }
});

/**
 * 从 UI 组件生成容器组件。
 */
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'EnquiryFormValues'})(EnquiryForm));
