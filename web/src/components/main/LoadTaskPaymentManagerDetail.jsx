import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const loadTaskPaymentManagerDetailAction = require('../../actions/main/LoadTaskPaymentManagerDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class LoadTaskPaymentManagerDetail extends React.Component {

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
        this.props.getLoadTaskInfo();
    }

    render() {
        const {loadTaskPaymentManagerDetailReducer, commonReducer, paymentLoadTask} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/load_task_payment', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">运输结算 - 线路详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {loadTaskPaymentManagerDetailReducer.loadTaskInfo.length > 0 &&
                <div className="row">

                    {/* 主体 */}
                    <div className="col s12 margin-top20 padding-left50 padding-right50">
                        <div className="row margin-top20 detail-box z-depth-1 grey-text">
                            <div className="col s12 padding-bottom10 custom-grey border-bottom-line">
                                <div className="col s6 margin-top15 grey-text text-darken-2">
                                    线路编号：{loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].id}
                                </div>
                                <div className="col s6 pink-font margin-top15 right-align">
                                    {commonUtil.getJsonValue(sysConst.PAYMENT_FLAG,loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].payment_flag)}
                                </div>
                            </div>

                            <div className="col s12 padding-top15 padding-bottom10">
                                <div className="col s6">
                                    <span className="fz16 purple-font bold-font">
                                        {loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].route_start} -- {loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].route_end}
                                    </span>
                                    {loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].trans_type === 1 && <i className="mdi mdi-truck-fast fz20 pink-font margin-left30"/>}
                                    {loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].trans_type === 2 && <i className="mdi mdi-ferry fz20 pink-font margin-left30"/>}
                                    {/*<span className="margin-left30 grey-text text-darken-2">{loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].supplier_short}</span>*/}
                                </div>
                                <div className="col s6 pink-font right-align">
                                    {commonUtil.getJsonValue(sysConst.LOAD_TASK_STATUS,loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].load_task_status)}
                                </div>
                            </div>

                            <div className="col s12 padding-bottom15 grey-text text-darken-2">
                                <div className="col s6">计划发货日期：{loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].plan_date}</div>
                                <div className="col s6 right-align">线路创建时间：{formatUtil.getDateTime(loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].created_on)}</div>
                            </div>

                            <div className="col s12 padding-bottom15 border-bottom-line grey-text text-darken-2">
                                <div className="col s12">发运日期：{loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].load_date}</div>
                            </div>

                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-line">
                                <div className="col s4">供应商运费：<span className="fz16 pink-font">{formatUtil.formatNumber(loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].supplier_trans_price, 2)}</span> 元</div>
                                <div className="col s4">供应商保费：<span className="fz16 pink-font">{formatUtil.formatNumber(loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].supplier_insure_price, 2)}</span> 元</div>
                                <div className="col s4 right-align">
                                    支付供应商：<span className="fz16 pink-font">{formatUtil.formatNumber(loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].supplier_trans_price + loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].supplier_insure_price, 2)}</span> 元
                                </div>
                            </div>

                            <div className="col s12 padding-bottom10 custom-grey border-bottom-line">
                                <div className="col s12 margin-top10 pink-font">
                                    安排车辆：{formatUtil.formatNumber(loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].car_count)}
                                </div>
                            </div>

                            {loadTaskPaymentManagerDetailReducer.scheduledCarList.length > 0 &&
                            <div className="col s12">
                                <table className="bordered">
                                    <thead className="">
                                    <tr className="grey-text text-darken-2">
                                        <th className="padding-left10">VIN</th>
                                        <th className="center">车型</th>
                                        <th className="center">品牌</th>
                                        <th className="center">型号</th>
                                        <th className="right-align">估值</th>
                                        <th className="center">新车</th>
                                        <th className="center">保险</th>
                                        <th className="right-align">供应商运费</th>
                                        <th className="right-align">供应商保费</th>
                                        <th className="right-align">总运费</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {loadTaskPaymentManagerDetailReducer.scheduledCarList.map(function (item, key) {
                                        return (
                                            <tr className="grey-text text-darken-1">
                                                <td className="padding-left10">{item.vin}</td>
                                                <td className="center">{commonUtil.getJsonValue(sysConst.CAR_MODEL, item.model_type)}</td>
                                                <td className="center">{item.brand}</td>
                                                <td className="center">{item.brand_type}</td>
                                                <td className="right-align">{formatUtil.formatNumber(item.valuation,2)}</td>
                                                {/* 是否新车 */}
                                                <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.old_car)}</td>
                                                {/* 是否保险 */}
                                                <td className="center">{commonUtil.getJsonValue(sysConst.YES_NO, item.safe_status)}</td>
                                                {/* 供应商运费 */}
                                                <td className="right-align pink-font">
                                                    {formatUtil.formatNumber(item.supplier_trans_price, 2)}
                                                </td>
                                                {/* 供应商保费 */}
                                                <td className="right-align pink-font">
                                                    {formatUtil.formatNumber(item.supplier_insure_price, 2)}
                                                </td>
                                                <td className="right-align pink-font">
                                                    {formatUtil.formatNumber(item.supplier_trans_price + item.supplier_insure_price, 2)}
                                                </td>
                                            </tr>
                                        )
                                    }, this)}
                                    </tbody>
                                </table>
                            </div>}
                        </div>

                        {commonReducer.orderInfo.length > 0 &&
                        <div className="col s12 no-padding margin-top20 detail-box z-depth-1">

                            <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                <div className="col s6 purple-font">
                                    {commonUtil.getJsonValue(sysConst.ORDER_TYPE, commonReducer.orderInfo[0].created_type)}
                                    <span className="margin-left10 grey-text">编号：{commonReducer.orderInfo[0].id}</span>
                                </div>
                                {/* 订单状态 */}
                                <div className="col s6 pink-font right-align">
                                    {commonUtil.getJsonValue(sysConst.ORDER_STATUS, commonReducer.orderInfo[0].status)}
                                </div>
                            </div>
                            <div className="col s12 padding-top15">
                                <div className="col s4">车辆总数：{formatUtil.formatNumber(commonReducer.orderInfo[0].car_num)}</div>
                                <div className="col s4">发运日期：{formatUtil.getDate(commonReducer.orderInfo[0].departure_time)}</div>
                                <div className="col s4 right-align">{commonUtil.getJsonValue(sysConst.SERVICE_MODE, commonReducer.orderInfo[0].service_type)}</div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-line">
                                <div className="col s4">运费：{formatUtil.formatNumber(commonReducer.orderInfo[0].total_trans_price, 2)} 元</div>
                                <div className="col s4">保费：{formatUtil.formatNumber(commonReducer.orderInfo[0].total_insure_price, 2)} 元</div>
                                <div className="col s4 right-align">订单总费用：{formatUtil.formatNumber(commonReducer.orderInfo[0].total_trans_price + commonReducer.orderInfo[0].total_insure_price, 2)} 元</div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15">
                                <div className="col s6">订单创建人：{commonReducer.orderInfo[0].admin_name}</div>
                                <div className="col s6 right-align">订单创建时间：{formatUtil.getDateTime(commonReducer.orderInfo[0].created_on)}</div>
                            </div>
                        </div>}

                        {/*{loadTaskPaymentManagerDetailReducer.loadTaskInfo[0].payment_flag === sysConst.PAYMENT_FLAG[0].value &&*/}
                        {/*<div className="col s12 no-padding margin-top20 margin-bottom0 right-align">*/}
                            {/*<button type="button" className="btn confirm-btn margin-left30" onClick={paymentLoadTask}>付款</button>*/}
                        {/*</div>}*/}
                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loadTaskPaymentManagerDetailReducer: state.LoadTaskPaymentManagerDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 取得线路详情
    getLoadTaskInfo: () => {
        dispatch(loadTaskPaymentManagerDetailAction.getLoadTaskInfo(ownProps.match.params.id));
    },
    // 付款
    paymentLoadTask: () => {
        dispatch(loadTaskPaymentManagerDetailAction.paymentLoadTask(ownProps.match.params.id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadTaskPaymentManagerDetail)