import React from 'react';

import { connect } from 'react-redux';
import {Field, reduxForm} from "redux-form";
const citySettingAction = require('../../actions/main/CitySettingAction');
import {ReactSelect} from "../utils";
import { Input ,Button, Card, Row, Col } from 'react-materialize';

const renderField = ({
                         input,
                         label,
                         type,
                         meta: { touched, error},
                         id,
                         icon
                     }) => {

    const labelClass ="validate " + (touched &&error?'invalid':'');
    return (
        <div className="input-field col s12">
            <i class={icon}></i>
            <input id={id} {...input} type={type} className={labelClass} required/>
            <label for={id}>{label}</label>
            {( touched &&(error && <span className="helper-text" data-error={error}></span>))}
        </div>
    )
}

// const RenderPicker= (props) => {
//
//     // $('.datepicker').datepicker();
//     // const labelClass = "validate " + (touched && error ? 'invalid' : '');
//     return (
//
//         <div>
//             <input id={id} {...input} type={type} className="datepicker"/>
//             {/*<input type="text" className="datepicker"/>*/}
//         </div>
//     )
// };


const RenderPicker = ({
                         input,
                         label,
                         type,
                         meta: { touched, error},
                         id
                     }) => {

    return (
        <div className="input-field col s12">
            <input id={id} {...input} type={type} className="datepicker"/>
            <label for={id}>{label}</label>
            {( touched &&(error && <span className="helper-text" data-error={error}></span>))}
        </div>
    )
}

class TempComponent extends React.Component {

    constructor() {
        super();
        // $('.datepicker').datepicker();

    }
    componentDidMount(){
        // const {getCityList,setCityFormFlag} = this.props;
        // getCityList();
        // setCityFormFlag(false);

        // $('.datepicker').datepicker(
        //     {
        //         format: 'yyyy-mm-dd',
        //         showClearBtn : true,
        //         // onSelect: function (value) {
        //         //     $('#enquiryDiv').modal('destroy');
        //         //
        //         //     console.log('value',value)
        //         //     console.log('aaaaaaaaaaa')
        //         //     // this.props.closeModal();
        //         //
        //         //     // this.hiddenModal();
        //         //     //dispatch({type: EnquiryActionType.enquiryModal, payload: false})
        //         // }
        //     }
        //     );
        // $('.datepicker').pickadate({
        //     format: 'yyyy-mm-dd',
        //     onSet: function (arg) {
        //         if ('select' in arg) {
        //             this.close();
        //         }
        //     },
        //     selectMonths: false, // Creates a dropdown to control month
        //     selectYears: 0 // Creates a dropdown of 15 years to control year
        // });
        // });
    }

    render() {
        const {enquiryReducer} = this.props;

        // const showCityForm = ()=>{
        //     setCityFormFlag(true);
        // };
        // const hideCityForm =()=>{
        //     setCityFormFlag(false);
        //     setCityName('');
        // };

        const changeStartDate = (event, value) => {
            // setCityName(event.target.value);
            console.log('event',event)
            console.log('value',value)
        }
        const {initialValues,handleSubmit,submitting,pristine} = this.props;
        return (

            <div>
                <div className="row">
                    aaaaaaaaaaaaaaaaaa

                    <form onSubmit={handleSubmit}>
                    <div className="input-field col s3">
                        <input type="text" name="startDate" onChange={changeStartDate}></input>

                        {/*<input type="text" id="createdOnStartText" className="datepicker">*/}
                            {/*<i className="mdi dataIcon mdi-table-large"></i>*/}
                            {/*<label for="createdOnStartText">贷入日期(始)</label>*/}
                        {/*</input>*/}
                    </div>

                    <div className="input-field col s3">
                        <input type="text" name="endDate" className="datepicker" onChange={changeStartDate}></input>
                        {/*<Input s={6} label="First Name" name="tempName" validate defaultValue='Alvin' />*/}
                        <Input name='on' label="React-datepicker测试日期" type='date' id='tttDate' options={{format: 'yyyy-mm-dd',autoClose: true}} onChange={changeStartDate} />
                        {/*<input type="text" id="createdOnStartText" className="datepicker">*/}
                        {/*<i className="mdi dataIcon mdi-table-large"></i>*/}
                        {/*<label for="createdOnStartText">贷入日期(始)</label>*/}
                        {/*</input>*/}
                    </div>


                    <div className="input-field col s3">
                        <Field label="测试日期" type="text" id="startDateTT" name="startDateTT" component={RenderPicker} onChange={changeStartDate}/>
                    </div>

                        <div className="input-field col s3">
                            <Field label="用户名" name="mobile" type="text" id="mobile" icon="mdi mdi-account prefix"
                                   component={renderField}/>
                        </div>

                        <button type="submit" className="btn confirm-btn" disabled={submitting }>确定</button>
                        <Button waves='light'>button</Button>
                        <Input name='on' type='date' id='tttDat1e' onChange={changeStartDate} />
                    </form>


                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: state.TempReducer.data
    }
}

const mapDispatchToProps = (dispatch) => ({
    // getCityList: () => {
    //     dispatch(citySettingAction.getCityList())
    // },
    // addCity: () => {
    //     dispatch(citySettingAction.addCity())
    // },
    // setCityFormFlag: (flag) => {
    //     dispatch(CitySettingActionType.setCityFormFlag(flag))
    // },
    // setCityName :(cityName) => {
    //     dispatch(CitySettingActionType.setCityName(cityName))
    // }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
            // 必要参数，表单命名
            form: 'testForm',
            // 验证
            // validate,
            // 可选参数 onChange : Function [optional] : 表单触发 onChange 事件后的回调。
            // 可选参数 onSubmit : Function [optional[ : 表单提交配置，可以配置需要提交哪些参数，还有提交时触发的 dispatch等
            onSubmit: (values, dispatch, props) => {
                console.log("testForm onSubmit inner");
                console.log('values is : ', values);
            }
        }
    )(TempComponent)
);
