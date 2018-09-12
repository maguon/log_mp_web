import React from 'react';
import {connect} from 'react-redux';
import {Enquiry} from '../main/index';

const localUtil = require('../../util/LocalUtil');
const httpHeaders = require('../../util/HttpHeaders');
const headerAction = require('../../actions/layout/HeaderAction');
const enquiryAction = require('../../actions/main/EnquiryAction');
const sysConst = require('../../util/SysConst');

/**
 * UI组件：主画面头部。
 */
class Header extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     * @param props
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        const {getUserDetail} = this.props;
        let userId = localUtil.getLocalItem(sysConst.USER_ID);
        const token = localUtil.getLocalItem(sysConst.AUTH_TOKEN);
        httpHeaders.set(sysConst.AUTH_TOKEN, token);
        $('.sidenav').sidenav();
        $('.collapsible').collapsible();
        // $('select').formSelect();
        if (userId == null || token == null) {
            window.location.href = '/login.html';
        } else {
            getUserDetail(userId);
        }
    }

    /**
     * 渲染(挂载)画面。
     */
    render() {
        //
        const {headerReducer,enquiryReducer, initData, logout} = this.props;
        return (
            <div>
                <nav>
                    <div className="nav-wrapper z-depth-3 purple">

                        <a href="#" data-target="slide-out" className="sidenav-trigger brand-logo"
                           style={{display: 'block'}}>
                            <i className="mdi mdi-menu mdi-36px"></i>
                        </a>

                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li>
                                <a className="right-align">
                                    <i className="mdi mdi-home-currency-usd mdi-36px modal-trigger" data-target="enquiryModal" onClick={initData}></i>
                                </a>
                            </li>
                            <li>
                                <a className="right-align">
                                    <i className="mdi mdi-account mdi-36px"></i>
                                </a>
                            </li>
                            <li>
                                <a><i className="mdi mdi-exit-to-app mdi-36px" onClick={logout}></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Enquiry/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        headerReducer: state.HeaderReducer,
        enquiryReducer: state.EnquiryReducer
    }
};

const mapDispatchToProps = (dispatch) => ({

    getUserDetail: (userId) => {
        dispatch(headerAction.getUserDetail({userId: userId}))
    },
    initData: () => {
        dispatch(enquiryAction.resetForm())
    },
    logout: () => {
        dispatch(headerAction.logout())
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(Header)
