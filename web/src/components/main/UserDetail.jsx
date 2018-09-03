import React from 'react';

class UserDetail extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount(){
        console.log(this.props.match.params)

    }
    render() {
        return (

            <div>UserDetail:<h1>{this.props.match.params.id}</h1></div>
        )


    }
}

module.exports = UserDetail;