import React from 'react';
import { connect } from 'react-redux';
const localUtil = require('../../util/LocalUtil');
const httpHeaders = require( '../../util/HttpHeaders');
const headerAction = require('../../actions/layout/HeaderAction');
const sysConst = require('../../util/SysConst');



class Header extends React.Component {

    constructor(props) {
        super(props);

    }
    componentDidMount(){


        const { getUserDetail} = this.props;
        let userId = localUtil.getLocalItem(sysConst.USER_ID);
        const token = localUtil.getLocalItem(sysConst.AUTH_TOKEN);
        httpHeaders.set(sysConst.AUTH_TOKEN,token);
        $('.sidenav').sidenav();
        $('.collapsible').collapsible();
        if (userId == null || token == null) {
            window.location.href ='/login.html';
        }else{
            getUserDetail(userId);
        }

    }
    render() {
        const {headerReducer,logout} = this.props;
        console.log(this.props);

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
                                    <i className="mdi mdi-bell mdi-36px"></i>
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
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        headerReducer: state.HeaderReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

    getUserDetail: (userId) => {
        dispatch(headerAction.getUserDetail({userId:userId}))
    },
    logout : ()=>{
        dispatch(headerAction.logout())
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
