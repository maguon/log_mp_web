import React from 'react';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date(),message:"abc",count:0};
    }
    componentDidMount(){


    }
    render() {
        return (
            <footer className="page-footer">
                <div className="container">
                    <h5>Footer</h5>
                </div>
            </footer>
        )


    }
}

module.exports = Footer;