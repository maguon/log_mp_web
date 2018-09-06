import React from 'react';
import {Link} from "react-router-dom";

/**
 * UI组件：注册用户。
 */
class Register extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     * @param props
     */
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    /**
     * 渲染(挂载)画面。
     */
    render() {
        return (
            <div className="container" style={{paddingTop: 80}}>
                <div className="col s8 m4 l4 z-depth-4 card-panel">
                    <form>
                        <div className="row center">
                            欢迎注册
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <i className="mdi mdi-account prefix"></i>
                                <input id="username" type="text"/>
                                <label for="username" className="center-align">用户名</label>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="input-field col s12">
                                <i className="mdi mdi-lock prefix"></i>
                                <input id="password" type="password"/>
                                <label for="password">密码</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <a href="index.html" className="btn waves-effect waves-light cyan col s12">注册</a>
                            </div>
                        </div>
                        <div className="row" style={{marginBottom: -30}}>
                            <div className="input-field col s12">
                                <p className="margin right-align medium-small"><Link to="/">返回登陆</Link></p>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

module.exports = Register;