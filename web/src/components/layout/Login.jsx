import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form'

const loginAction = require('../../actions/layout/LoginAction');

const validate = (values) => {
    const errors = {};
    const requiredFields = [
        'userName',
        'password'
    ];
    requiredFields.forEach(field => {
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
                         icon
                     }) => {

    const labelClass = "validate " + (touched && error ? 'invalid' : '');
    return (
        <div className="input-field col s12">
            <i className={icon}/>
            <input id={id} {...input} type={type} className={labelClass} required/>
            <label htmlFor={id}>{label}</label>
            {(touched && (error && <span className="helper-text" data-error={error}/>))}
        </div>
    )
};

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {handleSubmit, submitting, login} = this.props;
        return (
            <div className="container" style={{paddingTop: 80}}>
                <div className="col s8 m4 l4 z-depth-4 card-panel">
                    <form onSubmit={handleSubmit(login)}>
                        <div className="row">
                            <Field label="用户名" name="userName" type="text" id="userName" icon="mdi mdi-account prefix"
                                   component={renderField}/>

                        </div>
                        <div className="row ">
                            <Field label="密码" name="password" type="password" id="password" icon="mdi mdi-lock prefix"
                                   component={renderField}/>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <button type="submit" disabled={submitting}
                                        className="btn waves-effect waves-light cyan col s12 ">登陆
                                </button>
                            </div>
                        </div>
                        <div className="row" style={{marginBottom: -10}}>
                            <div className="input-field col s6 m6 l6">
                                <p className="margin medium-small"><Link to="/register">注册</Link></p>
                            </div>
                            <div className="input-field col s6 m6 l6">
                                <p className="margin right-align medium-small"><Link to="/reset">忘记密码</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: state.LoginReducer.data
    }
};

const mapDispatchToProps = (dispatch) => ({
    login: (values) => {
        dispatch(loginAction.login(values));
        //dispatch({type:loginActionType.loginInit,payload:values})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
            form: 'loginForm',
            validate
        }
    )(Login));

