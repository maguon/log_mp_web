import React from 'react';

import {  Link } from "react-router-dom";

import { connect } from 'react-redux'
const userAction = require('../../actions/main/UserAction')
class User extends React.Component {

    constructor(props) {
        super(props);

    }
    componentDidMount(){

        //const {userReducer} = this.props
        console.log(this.props)
    }
    render() {
        return (

            <div className="row">
                <div className="col s12 center">
                    <Link to="/user/1" className="waves-effect waves-light btn">用户1</Link>
                    <Link to="/user/2" className="waves-effect waves-light btn">用户2</Link>
                    <Link to="/user/3" className="waves-effect waves-light btn">用户3</Link>
                </div>
            </div>
        )


    }
}

const mapStateToProps = (state) => {
    return {
        userReducer: 'abc'
    }
}

const mapDispatchToProps = (dispatch) => ({

    getUserList: (userId) => {
        dispatch(userAction.getUserList({userId:userId}))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
