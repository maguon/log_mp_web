import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

class InvoiceManagerDetail extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        // 取得订单信息
        // this.props.getInvoiceInfo();
        // 初始化TAB
        $('ul.tabs').tabs();
    }

    render() {
        const {inquiryManagerDetailReducer, updateFeedBack} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/inquiry', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">用户发票信息管理 - 详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体 */}
                <div className="row margin-top40 margin-left150 margin-right150 detail-box z-depth-1 grey-text">
                    <div className="col s12 padding-top20 padding-bottom20 custom-grey purple-font border-bottom-line">
                        <div className="col s12 margin-top5">编号：XXXXXX</div>
                        <div className="col s6 fz16 bold-font margin-top10">公司名称名称名称名称名称</div>
                        <div className="col s6 fz16 bold-font margin-top10 right-align">税号：XXXXXXXX XXXXXX</div>
                    </div>

                    <div className="col s12 margin-top5 padding-top20 padding-bottom20">
                        <div className="col s6">开户银行：XXXXXXXX XXXXXXXX</div>
                        <div className="col s6 right-align">银行账户：XXXXXXXX XXXXXX</div>
                    </div>

                    <div className="col s12 padding-left20 padding-right20"><div className="col s12 dotted-line"/></div>

                    <div className="col s12 padding-top20 padding-bottom20">
                        <div className="col s12">电话号码：XXXXXXXX XXXXXXXX</div>
                    </div>

                    <div className="col s12 padding-left20 padding-right20"><div className="col s12 dotted-line"/></div>

                    <div className="col s12 padding-top20 padding-bottom20">
                        <div className="col s12">单位地址：XXXXXXXX XXXXXXXX</div>
                    </div>

                    <div className="col s12 padding-left20 padding-right20"><div className="col s12 divider"/></div>

                    <div className="col s12 padding-top20 padding-bottom20 right-align">
                        <div className="col s12">所属用户：XXXXXXXX</div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        inquiryManagerDetailReducer: state.InvoiceManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // getInvoiceInfo: () => {
    //     dispatch(orderDetailAction.getInvoiceInfo(ownProps.match.params.id));
    // }
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceManagerDetail)