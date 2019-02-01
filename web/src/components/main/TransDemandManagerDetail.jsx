import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {NewOfferModalActionType, CancelInquiryModalActionType, CommonActionType} from '../../actionTypes';
import {NewLoadTaskModal, CancelInquiryModal, OrderInfoModal} from '../modules/index';

const commonAction = require('../../actions/main/CommonAction');
const transDemandManagerDetailAction = require('../../actions/main/TransDemandManagerDetailAction');
const newLoadTaskModalAction = require('../../actions/modules/NewLoadTaskModalAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class TransDemandManagerDetail extends React.Component {

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
        this.props.getTransDemandInfo();
    }

    /**
     * 订单详情 按钮
     */
    showOrderInfo = () => {
        // 初期化数据
        this.props.initOrderInfoModalData(this.props.transDemandManagerDetailReducer.transDemandInfo[0].order_id);
        $('#orderInfoModal').modal('open');
    };

    /**
     * 收发货地址 按钮
     */
    showNewOfferModal = () => {
        let userId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].user_id;
        let totalFreight = this.props.transDemandManagerDetailReducer.totalFreight;
        let totalInsuranceFee = this.props.transDemandManagerDetailReducer.totalInsuranceFee;
        this.props.initNewOfferModalData(userId, totalFreight, totalInsuranceFee, 0, 0, '');
        $('#newOfferModal').modal('open');
    };

    /**
     * 安排线路 按钮
     */
    showNewLoadTaskModal = () => {
        let orderId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].order_id;
        let requireId = this.props.transDemandManagerDetailReducer.transDemandInfo[0].id;
        this.props.initNewLoadTaskModalData(orderId, requireId);
        $('#newLoadTaskModal').modal('open');
    };

    /**
     * 取消报价按钮 点击事件
     */
    showCancelInquiryModal = () => {
        let freight = this.props.transDemandManagerDetailReducer.totalFreight;
        let insuranceFee = this.props.transDemandManagerDetailReducer.totalInsuranceFee;
        let actTotalFreight = this.props.transDemandManagerDetailReducer.transDemandInfo[0].total_trans_price;
        let actTotalInsuranceFee = this.props.transDemandManagerDetailReducer.transDemandInfo[0].total_insure_price;

        this.props.initCancelInquiryModalData(freight, insuranceFee, actTotalFreight, actTotalInsuranceFee);
        $('#cancelInquiryModal').modal('open');
    };



    render() {
        const {transDemandManagerDetailReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/trans_demand', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">
                            运输需求 - 线路安排
                            {transDemandManagerDetailReducer.transDemandInfo.length > 0 && <span> - {transDemandManagerDetailReducer.transDemandInfo[0].id}</span>}
                        </span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {transDemandManagerDetailReducer.transDemandInfo.length > 0 &&
                <div className="row">
                    {/* 头部 */}
                    <div className="col s12">
                        {/* 询价详情：基本信息 */}
                        <div className="trans-demand-header">
                            <div className="col s9 margin-top5 grey-text text-darken-1">
                                <div className="pink-font">订单编号：{transDemandManagerDetailReducer.transDemandInfo[0].order_id}</div>

                                <div className="margin-top10 grey-text text-darken-1">
                                    <span className="fz20 purple-font">{transDemandManagerDetailReducer.transDemandInfo[0].route_start} - {transDemandManagerDetailReducer.transDemandInfo[0].route_end}</span>
                                    <span className="margin-left30">{commonUtil.getJsonValue(sysConst.SERVICE_MODE,transDemandManagerDetailReducer.transDemandInfo[0].service_type)}</span>
                                </div>

                                <div className="col s7 margin-top10 grey-text text-darken-1 no-padding">
                                    运费：<span className="fz16 pink-font">{formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].total_trans_price, 2)}</span> 元
                                </div>
                                <div className="col s5 margin-top10 grey-text text-darken-1">
                                    保费：<span className="fz16 pink-font">{formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].total_insure_price, 2)}</span> 元
                                </div>
                                <div className="col s12 no-padding margin-top5 grey-text text-darken-1">
                                    创建人：{transDemandManagerDetailReducer.transDemandInfo[0].real_name}
                                </div>
                            </div>

                            <div className="col s3 margin-top5 right-align grey-text text-darken-1">
                                <div>
                                    订单创建时间：{formatUtil.getDateTime(transDemandManagerDetailReducer.transDemandInfo[0].order_created_on)}
                                </div>
                                <div className="margin-top10">
                                    运送车辆：<span className="fz16 pink-font">{transDemandManagerDetailReducer.transDemandInfo[0].car_num}</span>
                                </div>

                                <div className="margin-top10">
                                    总费用：<span className="fz16 pink-font">
                                    {formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].total_trans_price + transDemandManagerDetailReducer.transDemandInfo[0].total_insure_price, 2)}
                                    </span> 元
                                </div>

                                <div className="margin-top5">
                                    <button type="button" className="btn purple-btn btn-height24 fz14" onClick={this.showOrderInfo}>订单详情</button>
                                </div>
                            </div>
                        </div>

                        <div className="padding-top10 grey-text text-darken-1">
                            <div className="col s6 padding-left30">需求创建时间：{formatUtil.getDateTime(transDemandManagerDetailReducer.transDemandInfo[0].created_on)}</div>
                            <div className="col s6 padding-right30 right-align pink-font">
                                {commonUtil.getJsonValue(sysConst.TRANS_DEMAND_STATUS,transDemandManagerDetailReducer.transDemandInfo[0].status)}
                            </div>
                            <div className="col s12 divider custom-divider margin-top10"/>
                        </div>
                        <OrderInfoModal/>
                    </div>

                    {/* 主体 */}
                    <div className="col s12 margin-top20 padding-left50 padding-right50">
                        {/** 收发货地址/安排线路 按钮 */}
                        <div className="row margin-bottom10 right-align">
                            {transDemandManagerDetailReducer.transDemandInfo[0].service_type === sysConst.SERVICE_MODE[1].value &&
                            <button type="button" className="btn custom-btn" onClick={this.showCancelInquiryModal}>收发货地址</button>}
                            {(transDemandManagerDetailReducer.transDemandInfo[0].status === sysConst.TRANS_DEMAND_STATUS[0].value ||
                              transDemandManagerDetailReducer.transDemandInfo[0].status === sysConst.TRANS_DEMAND_STATUS[1].value) &&
                            <button type="button" className="btn confirm-btn margin-left20" onClick={this.showNewLoadTaskModal}>安排线路</button>}
                        </div>
                        <NewLoadTaskModal/>
                        <CancelInquiryModal/>

                        <div className="row margin-top20 margin-bottom5 pink-font">
                            <div className="col s6">
                                <i className="mdi mdi-truck fz20"/>
                                <span className="margin-left10 fz16">运输线路</span>
                            </div>
                            <div className="col s6 margin-top5 right-align">线路数：{formatUtil.formatNumber(transDemandManagerDetailReducer.transDemandInfo[0].status)}</div>
                        </div>
                        <div className="row divider bold-divider"/>


                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        transDemandManagerDetailReducer: state.TransDemandManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getTransDemandInfo: () => {
        dispatch(transDemandManagerDetailAction.getTransDemandInfo(ownProps.match.params.id));
    },
    initOrderInfoModalData: (orderId) => {
        dispatch(CommonActionType.setShowOrderCarListFlag(false));
        dispatch(commonAction.getOrderInfo(orderId));
        dispatch(commonAction.getOrderCarList(orderId));
    },






    // 收发货地址
    initCancelInquiryModalData: (freight, insuranceFee, actTotalFreight, actTotalInsuranceFee) => {
        dispatch(CancelInquiryModalActionType.setInquiryId(ownProps.match.params.id));
        dispatch(CancelInquiryModalActionType.setFreight(freight));
        dispatch(CancelInquiryModalActionType.setInsuranceFee(insuranceFee));
        dispatch(CancelInquiryModalActionType.setActFreight(actTotalFreight));
        dispatch(CancelInquiryModalActionType.setActInsuranceFee(actTotalInsuranceFee));
        dispatch(CancelInquiryModalActionType.setRemark(''));
    },
    // 线路安排
    initNewLoadTaskModalData: (orderId, requireId) => {
        // 初始化画面
        dispatch(newLoadTaskModalAction.initNewLoadTaskModal('new',orderId, requireId));
        // 城市列表
        dispatch(commonAction.getCityList());
        // 供应商列表
        dispatch(commonAction.getSupplierList());
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(TransDemandManagerDetail)