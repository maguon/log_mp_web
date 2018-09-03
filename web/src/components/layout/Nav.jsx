import React from 'react';
import {  Link } from "react-router-dom";
class Nav extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount(){


    }
    render() {
        return (

            <ul id="slide-out" className="sidenav">
                <li>
                    <div className="user-view">

                        <a href="#name">
                            <span className="white-text name">John Doe</span>
                        </a>
                        <a href="#email">
                            <span className="white-text email">jdandturk@gmail.com</span>
                        </a>
                    </div>
                </li>
                <li> <i className="mdi mdi-account"></i><Link to="/user">用户</Link></li>
                <li><div class="divider"></div></li>
                <li> <a to="/panel"><i className="mdi mdii-alarm-check"></i>面板</a></li>
                <li><div className="divider"></div></li>
                <li className="no-padding">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header"><i className="mdi mdi-lock"></i>选项</a>
                            <div className="collapsible-body">
                                <ul>
                                    <li><Link to="/setting">设置</Link></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>

        )


    }
}

module.exports = Nav;