import React from 'react';

class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    render() {
        return (
            <footer>
                <div className="footer">
                    <span className="footer-msg">洺源信息技术</span>
                    <span className="footer-msg">车辆运输微信小程序后台管理系统1.0版</span>
                </div>
            </footer>
        )
    }
}

module.exports = Footer;