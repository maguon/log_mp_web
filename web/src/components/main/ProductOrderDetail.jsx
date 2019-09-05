import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from "react-materialize";
import {ProductInfoModal} from '../modules/index';
import {ProductOrderDetailActionType} from "../../actionTypes";

const productOrderDetailAction = require('../../actions/main/ProductOrderDetailAction');
const productInfoModalAction = require('../../actions/modules/ProductInfoModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class ProductOrderDetail extends React.Component {

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
        $('ul.tabs').tabs();
        // 取得订单信息
        this.props.getProductOrderInfo();
    }

    /**
     * 订单信息TAB：更新 订单备注
     */
    changeOrderRemark = (event) => {
        this.props.setOrderRemark(event.target.value);
    };

    render() {
        const {
            productOrderDetailReducer,
            getProductOrderInfo,
            getProductOrderPaymentInfo,
            showProductDetailModal,
            saveProductOrderRemark,
            changeProductOrderStatus,
            cancelProductOrderStatus,
            showProductOrderRefundModal
        } = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/product_order', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">商品订单 - 订单详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row">
                    {/* TAB 头部 */}
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s6"><a href="#tab-base" className="active" onClick={getProductOrderInfo}>订单信息</a></li>
                            <li className="tab col s6"><a href="#tab-payment" onClick={getProductOrderPaymentInfo}>支付信息</a></li>
                        </ul>
                    </div>

                    {/* TAB 1 : 订单信息 */}
                    <div id="tab-base" className="col s12">
                        {productOrderDetailReducer.productOrderInfo.length > 0 &&
                        <div>
                            {/* 订单信息 */}
                            <div className="row margin-top40 margin-left150 margin-right150 detail-box z-depth-1">
                                <div className="col s12 padding-top10 padding-bottom10 custom-grey border-bottom-line">
                                    <div className="col s6 purple-font">订单编号：{productOrderDetailReducer.productOrderInfo[0].id}</div>
                                    <div className="col s6 grey-text right-align">创建时间：{formatUtil.getDateTime(productOrderDetailReducer.productOrderInfo[0].created_on)}</div>
                                </div>

                                {/* 订单基本信息 */}
                                <div className="col s12 margin-top5 padding-top20 padding-bottom20 border-bottom-line">
                                    <div className="col s9">
                                        {productOrderDetailReducer.productOrderInfo[0].user_name} (ID：{productOrderDetailReducer.productOrderInfo[0].user_id})
                                        <span className="margin-left20">手机：{productOrderDetailReducer.productOrderInfo[0].phone}</span>
                                    </div>
                                    <div className="col s3 right-align pink-font">{commonUtil.getJsonValue(sysConst.PRODUCT_ORDER_STATUS,productOrderDetailReducer.productOrderInfo[0].status)}</div>

                                    <div className="col s12 margin-top10 fz14 grey-text">
                                        收货信息：{productOrderDetailReducer.productOrderInfo[0].send_address} {productOrderDetailReducer.productOrderInfo[0].send_name} {productOrderDetailReducer.productOrderInfo[0].send_phone}
                                    </div>
                                    <div className="col s6 margin-top10 grey-text">
                                        应付金额：<span className="red-text fz18">{formatUtil.formatNumber(productOrderDetailReducer.productOrderInfo[0].earnest_money)}</span> 元
                                    </div>
                                    <div className="col s6 margin-top10 grey-text right-align">
                                        已支付：<span className="red-text fz18">{formatUtil.formatNumber(productOrderDetailReducer.productOrderInfo[0].real_payment_price)}</span> 元
                                    </div>
                                </div>

                                {/* 商品基本信息 */}
                                <div className="col s12 margin-top5 padding-top20 padding-bottom20">
                                    <div className="col s6">商品编号：{productOrderDetailReducer.productOrderInfo[0].commodity_id}</div>
                                    <div className="col s6 right-align">
                                        <button type="button" className="btn list-pink-border-btn btn-height24 fz14"
                                                onClick={() => {showProductDetailModal(productOrderDetailReducer.productOrderInfo[0].commodity_id)}}>商品详情
                                        </button>
                                        <ProductInfoModal/>
                                    </div>

                                    <div className="col s12 margin-top10">{productOrderDetailReducer.productOrderInfo[0].commodity_name}</div>
                                    <div className="col s5 margin-top10 grey-text">
                                        城市：{productOrderDetailReducer.productOrderInfo[0].city_name}
                                        <span className="margin-left20">销售类型：{commonUtil.getJsonValue(sysConst.PRODUCT_SALE_TYPE,productOrderDetailReducer.productOrderInfo[0].type)}</span>
                                    </div>
                                    <div className="col s7 margin-top10 grey-text right-align">
                                        <span className="fz14 grey-text">定金：{formatUtil.formatNumber(productOrderDetailReducer.productOrderInfo[0].earnest_money)}元</span>
                                        <span className="fz14 grey-text margin-left20">指导价：{formatUtil.formatNumber(productOrderDetailReducer.productOrderInfo[0].ora_trans_price/10000,2)}万元</span>
                                        <span className="margin-left20">
                                            实际售价：<span className="red-text fz18">{formatUtil.formatNumber(productOrderDetailReducer.productOrderInfo[0].act_trans_price/10000,2)}</span>万元
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 各种处理时间 待发货 以外状态时，显示 */}
                            {productOrderDetailReducer.productOrderInfo[0].status !== sysConst.PRODUCT_ORDER_STATUS[0].value &&
                            <div className="row margin-top20 margin-left150 margin-right150">
                                {(productOrderDetailReducer.productOrderInfo[0].status === sysConst.PRODUCT_ORDER_STATUS[1].value
                                    || productOrderDetailReducer.productOrderInfo[0].status === sysConst.PRODUCT_ORDER_STATUS[3].value) &&
                                <div className="col s6">发货时间：{formatUtil.getDateTime(productOrderDetailReducer.productOrderInfo[0].departure_time)}</div>}
                                {productOrderDetailReducer.productOrderInfo[0].status === sysConst.PRODUCT_ORDER_STATUS[3].value &&
                                <div className="col s6 right-align">送达时间：{formatUtil.getDateTime(productOrderDetailReducer.productOrderInfo[0].arrive_time)}</div>}

                                {productOrderDetailReducer.productOrderInfo[0].status === sysConst.PRODUCT_ORDER_STATUS[2].value &&
                                <div className="col s12">取消时间：{formatUtil.getDateTime(productOrderDetailReducer.productOrderInfo[0].cancel_time)}</div>}
                            </div>}

                            {/* 备注 */}
                            <div className="row margin-top20 margin-left150 margin-right150 padding-top10 detail-box z-depth-1 position-relative">
                                <Input s={12} label="备注" value={productOrderDetailReducer.orderRemark} onChange={this.changeOrderRemark}/>
                                <i className="mdi mdi-checkbox-marked-circle confirm-icon fz30 purple-font pointer" onClick={saveProductOrderRemark}/>
                            </div>

                            {/* 按钮 */}
                            <div className="row margin-top40 margin-right150 right-align">
                                {productOrderDetailReducer.productOrderInfo[0].status === sysConst.PRODUCT_ORDER_STATUS[0].value &&
                                <button type="button" className="btn confirm-btn" onClick={() => {changeProductOrderStatus(sysConst.PRODUCT_ORDER_STATUS[1].value )}}>发货</button>}
                                {productOrderDetailReducer.productOrderInfo[0].status === sysConst.PRODUCT_ORDER_STATUS[1].value &&
                                <button type="button" className="btn confirm-btn" onClick={() => {changeProductOrderStatus(sysConst.PRODUCT_ORDER_STATUS[3].value )}}>送达</button>}
                                {productOrderDetailReducer.productOrderInfo[0].status !== sysConst.PRODUCT_ORDER_STATUS[2].value &&
                                <button type="button" className="btn purple-btn margin-left20 width-100" onClick={() => {changeProductOrderStatus(sysConst.PRODUCT_ORDER_STATUS[2].value )}}>取消订单</button>}
                            </div>
                        </div>}
                    </div>

                    {/* TAB 2 : 支付信息 */}
                    <div id="tab-payment" className="col s12">
                        {productOrderDetailReducer.productOrderPaymentInfo.map(function (item) {
                            return (
                                <div className="row margin-top40 margin-left150 margin-right150 detail-box z-depth-1">
                                    <div className="col s12 padding-top10 padding-bottom10 custom-grey border-bottom-line">
                                        <div className="col s6 purple-font">支付编号：{productOrderDetailReducer.productOrderPaymentInfo[0].id}</div>
                                        <div className="col s6 pink-font right-align">{commonUtil.getJsonValue(sysConst.PRODUCT_ORDER_PAYMENT_TYPE, productOrderDetailReducer.productOrderPaymentInfo[0].type)}</div>
                                    </div>

                                    <div className="col s12 margin-top5 padding-top10 padding-bottom20">
                                        <div className="col s6 grey-text">
                                            {productOrderDetailReducer.productOrderPaymentInfo[0].type === sysConst.PRODUCT_ORDER_PAYMENT_TYPE[0].value ? '支付金额：' : '退款金额：'}
                                            <span className="red-text fz18">{formatUtil.formatNumber(productOrderDetailReducer.productOrderPaymentInfo[0].total_fee)}</span> 元
                                        </div>
                                        <div className="col s6 grey-text right-align">支付时间：{formatUtil.getDateTime(productOrderDetailReducer.productOrderPaymentInfo[0].payment_time)}</div>

                                        {productOrderDetailReducer.productOrderPaymentInfo[0].type === sysConst.PRODUCT_ORDER_PAYMENT_TYPE[0].value &&
                                        (productOrderDetailReducer.productOrderPaymentInfo[0].p_id == null || productOrderDetailReducer.productOrderPaymentInfo[0].p_id === '')}
                                        <div className="col s12 margin-top10 grey-text right-align">
                                            <button type="button" className="btn list-pink-border-btn btn-height24 fz14"
                                                    onClick={() => {showProductOrderRefundModal(productOrderDetailReducer.productOrderPaymentInfo[0].commodity_id)}}>退款
                                            </button>
                                            <ProductInfoModal/>
                                        </div>
                                    </div>
                                </div>
                            )
                        },this)}
                        {productOrderDetailReducer.productOrderPaymentInfo.length === 0 &&
                        <div className="row center margin-top50 grey-text fz18">暂无支付信息</div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        productOrderDetailReducer: state.ProductOrderDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 取得商品订单详情
    getProductOrderInfo: () => {
        dispatch(productOrderDetailAction.getProductOrderInfo(ownProps.match.params.id));
    },
    // 取得商品订单详情
    getProductOrderPaymentInfo: () => {
        dispatch(productOrderDetailAction.getProductOrderPaymentInfo(ownProps.match.params.id));
    },
    setOrderRemark: (value) => {
        dispatch(ProductOrderDetailActionType.setProductOrderRemark(value))
    },
    showProductDetailModal: (id) => {
        dispatch(productInfoModalAction.initProductInfo(id));
        $('#productInfoModal').modal('open');
    },
    // 保存订单备注
    saveProductOrderRemark: () => {
        dispatch(productOrderDetailAction.saveProductOrderRemark(ownProps.match.params.id));
    },
    // 修改订单状态
    changeProductOrderStatus: (newStatus) => {
        dispatch(productOrderDetailAction.changeProductOrderStatus(ownProps.match.params.id, newStatus));
    },
    showProductOrderRefundModal: (id) => {
        dispatch(productInfoModalAction.initProductInfo(id));
        $('#productInfoModal').modal('open');
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrderDetail)