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
            <footer>
                <div className="footer">
                    <span className="footer-msg">洺源信息技术</span>
                    <span className="footer-msg">物流系统1.0版</span>
                </div>
            </footer>
        )
    }
}

module.exports = Footer;