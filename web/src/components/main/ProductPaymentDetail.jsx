import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const productPaymentDetailAction = require('../../actions/main/ProductPaymentDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class ProductPaymentDetail extends React.Component {

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
        this.props.getProductPaymentInfo();
    }

    render() {
        const {productPaymentDetailReducer, commonReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/product_payment', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">商品支付 - 支付详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row margin-left50 margin-right50">
                    {/* 上部：支付信息 */}
                    <div className="row margin-top40">
                        <div className="col s12 no-padding pink-font">
                            <i className="mdi mdi-currency-cny fz20"/>
                            <span className="margin-left10 fz16">支付</span>
                        </div>
                        {/* 分割线 */}
                        <div className="col s12 no-padding">
                            <div className="col s12 margin-top5 divider bold-divider"/>
                        </div>

                        {productPaymentDetailReducer.productPaymentInfo.length > 0 &&
                        <div className="col s12 no-padding margin-top20 detail-box z-depth-1">
                            <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                <div className="col s6 purple-font">
                                    支付编号：{productPaymentDetailReducer.productPaymentInfo[0].id}
                                </div>
                                {/* 支付类型 */}
                                <div className="col s6 pink-font right-align">
                                    {commonUtil.getJsonValue(sysConst.PRODUCT_ORDER_PAYMENT_TYPE, productPaymentDetailReducer.productPaymentInfo[0].type)}
                                </div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-dotted-line">
                                <div className="col s2">
                                    支付状态：{commonUtil.getJsonValue(sysConst.PRODUCT_PAYMENT_FLAG, productPaymentDetailReducer.productPaymentInfo[0].status)}
                                </div>

                                <div className="col s7 no-padding">
                                    {productPaymentDetailReducer.productPaymentInfo[0].user_name} (ID：{productPaymentDetailReducer.productPaymentInfo[0].user_id})
                                    <span className="margin-left20">手机：{productPaymentDetailReducer.productPaymentInfo[0].phone}</span>
                                </div>

                                <div className="col s3 right-align">
                                    金额：<span className="fz16 pink-font">{formatUtil.formatNumber(productPaymentDetailReducer.productPaymentInfo[0].total_fee, 2)}</span> 元
                                </div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15">
                                <div className="col s6">
                                    {productPaymentDetailReducer.productPaymentInfo[0].type === sysConst.PRODUCT_ORDER_PAYMENT_TYPE[1].value &&
                                    <div>上级编号：{productPaymentDetailReducer.productPaymentInfo[0].p_id}</div>}
                                </div>
                                <div className="col s6 right-align">
                                    支付时间：{formatUtil.getDateTime(productPaymentDetailReducer.productPaymentInfo[0].payment_time)}
                                </div>
                            </div>
                        </div>}
                    </div>

                    {/* 下部：订单信息 */}
                    <div className="row margin-top40">
                        <div className="col s12 no-padding pink-font">
                            <i className="mdi mdi-currency-cny fz20"/>
                            <span className="margin-left10 fz16">订单信息</span>
                        </div>
                        {/* 分割线 */}
                        <div className="col s12 no-padding">
                            <div className="col s12 margin-top5 divider bold-divider"/>
                        </div>

                        {commonReducer.productOrderInfo.length > 0 &&
                        <div className="col s12 no-padding margin-top20 detail-box z-depth-1">

                            <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                <div className="col s6 purple-font">订单编号：{commonReducer.productOrderInfo[0].id}</div>
                                <div className="col s6 grey-text right-align">创建时间：{formatUtil.getDateTime(commonReducer.productOrderInfo[0].created_on)}</div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15">
                                <div className="col s9">
                                    {commonReducer.productOrderInfo[0].user_name} (ID：{commonReducer.productOrderInfo[0].user_id})
                                    <span className="margin-left20">手机：{commonReducer.productOrderInfo[0].phone}</span>
                                </div>
                                <div className="col s3 right-align pink-font">{commonUtil.getJsonValue(sysConst.PRODUCT_ORDER_STATUS,commonReducer.productOrderInfo[0].status)}</div>

                                <div className="col s12 margin-top10 fz14 grey-text">
                                    收货信息：{commonReducer.productOrderInfo[0].send_address} {commonReducer.productOrderInfo[0].send_name} {commonReducer.productOrderInfo[0].send_phone}
                                </div>
                                <div className="col s6 margin-top10 grey-text">
                                    应付金额：<span className="red-text fz18">{formatUtil.formatNumber(commonReducer.productOrderInfo[0].earnest_money)}</span> 元
                                </div>
                                <div className="col s6 margin-top10 grey-text right-align">
                                    已支付：<span className="red-text fz18">{formatUtil.formatNumber(commonReducer.productOrderInfo[0].real_payment_price)}</span> 元
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        productPaymentDetailReducer: state.ProductPaymentDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getProductPaymentInfo: () => {
        dispatch(productPaymentDetailAction.getProductPaymentInfo(ownProps.match.params.id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPaymentDetail)