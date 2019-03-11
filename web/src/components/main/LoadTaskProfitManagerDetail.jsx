import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const loadTaskProfitManagerDetailAction = require('../../actions/main/LoadTaskProfitManagerDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');
const commonUtil = require('../../util/CommonUtil');

class LoadTaskProfitManagerDetail extends React.Component {

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
        this.props.getDetailInfo();
    }

    render() {
        const {loadTaskProfitManagerDetailReducer, commonReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/load_task_profit', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">车辆利润 - 详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row">
                    {/* 主体 */}
                    <div className="col s12 margin-top20 padding-left50 padding-right50">

                        {/* 基本信息 */}
                        {loadTaskProfitManagerDetailReducer.loadTaskProfitInfo.length > 0 &&
                        <div className="col s12 no-padding margin-top20 detail-box z-depth-1">
                            <div className="col s12 padding-top15 padding-bottom10 custom-grey border-bottom-line">
                                <div className="col s8">
                                    <i className="mdi mdi-car fz20 pink-font"/>
                                    <span className="margin-left30 pink-font">VIN：{loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].vin}</span>
                                    <span className="margin-left40">{commonUtil.getJsonValue(sysConst.CAR_MODEL, loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].model_type)}</span>
                                    <span className="margin-left40">{loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].brand}{loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].brand_type}</span>
                                </div>

                                <div className="col s4 right-align">
                                    {loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].old_car === sysConst.YES_NO[1].value &&
                                    <span className="margin-right20 circle-font purple lighten-3">新</span>}
                                    {loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].safe_status === sysConst.YES_NO[1].value &&
                                    <span className="margin-right20 circle-font green lighten-2">保</span>}
                                    <span className="margin-left20">估值：{formatUtil.formatNumber(loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].valuation, 2)} 元</span>
                                </div>
                            </div>

                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-line">
                                <div className="col s4">订单运费：{formatUtil.formatNumber(loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].act_trans_price, 2)} 元</div>
                                <div className="col s4">订单保费：{formatUtil.formatNumber(loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].act_insure_price, 2)} 元</div>
                                <div className="col s4 right-align">
                                    订单收取：<span className="fz16 pink-font">{formatUtil.formatNumber(loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].act_trans_price + loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].act_insure_price, 2)}</span> 元
                                </div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-line">
                                <div className="col s4">供应商运费：{formatUtil.formatNumber(loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].supplier_trans_price, 2)} 元</div>
                                <div className="col s4">供应商保费：{formatUtil.formatNumber(loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].supplier_insure_price, 2)} 元</div>
                                <div className="col s4 right-align">
                                    支付供应商：<span className="fz16 pink-font">{formatUtil.formatNumber(loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].supplier_trans_price + loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].supplier_insure_price, 2)}</span> 元
                                </div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15">
                                <div className="col s12 right-align">
                                    收支：<span className="fz16 pink-font">{formatUtil.formatNumber(loadTaskProfitManagerDetailReducer.loadTaskProfitInfo[0].profit_price, 2)}</span> 元
                                </div>
                            </div>
                        </div>}

                        {/* 订单信息 */}
                        <div className="col s12 margin-top30 no-padding pink-font">
                            <i className="mdi mdi-currency-cny fz20"/>
                            <span className="margin-left10 fz16">订单信息</span>
                        </div>
                        {/* 分割线 */}
                        <div className="col s12 no-padding"><div className="col s12 margin-top5 divider bold-divider"/></div>

                        {commonReducer.orderInfo.length > 0 &&
                        <div className="col s12 no-padding margin-top20 detail-box z-depth-1">
                            <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                <div className="col s6">订单编号：{commonReducer.orderInfo[0].id}</div>
                                <div className="col s6 right-align">创建时间：{formatUtil.getDateTime(commonReducer.orderInfo[0].created_on)}</div>
                            </div>

                            <div className="col s12 padding-top15">
                                <div className="col s6">
                                    {/* 线路 */}
                                    <span className="fz18 purple-font">{commonReducer.orderInfo[0].start_city} - {commonReducer.orderInfo[0].end_city}</span>
                                    {/* 服务类型 */}
                                    <span className="margin-left30">{commonUtil.getJsonValue(sysConst.SERVICE_MODE, commonReducer.orderInfo[0].service_type)}</span>
                                </div>
                                <div className="col s6 right-align">运输车辆：{formatUtil.formatNumber(commonReducer.orderInfo[0].car_num)}</div>
                            </div>
                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-line">
                                <div className="col s6">创建人：{commonReducer.orderInfo[0].admin_name}</div>
                                <div className="col s6 right-align">
                                    订单总金额：<span className="fz16 pink-font">{formatUtil.formatNumber(commonReducer.orderInfo[0].total_trans_price + commonReducer.orderInfo[0].total_insure_price, 2)}</span> 元
                                </div>
                            </div>

                            <div className="col s12 padding-top15 padding-bottom15 border-bottom-line">
                                <div className="col s12">发货地址：{commonReducer.orderInfo[0].send_address} {commonReducer.orderInfo[0].send_name} {commonReducer.orderInfo[0].send_phone}</div>
                            </div>

                            <div className="col s12 padding-top15 padding-bottom15">
                                <div className="col s12">收货地址：{commonReducer.orderInfo[0].recv_address} {commonReducer.orderInfo[0].recv_name} {commonReducer.orderInfo[0].recv_phone}</div>
                            </div>
                        </div>}

                        {/* 线路信息 */}
                        <div className="col s12 margin-top30 no-padding pink-font">
                            <i className="mdi mdi-currency-cny fz20"/>
                            <span className="margin-left10 fz16">线路信息</span>
                        </div>
                        {/* 分割线 */}
                        <div className="col s12 no-padding"><div className="col s12 margin-top5 divider bold-divider"/></div>

                        {loadTaskProfitManagerDetailReducer.loadTaskArray.map(function (item) {
                            return (
                                <div className="col s12 no-padding margin-top20 detail-box z-depth-1">
                                    <div className="col s12 padding-top15 padding-bottom15 custom-grey border-bottom-line">
                                        <div className="col s6">线路编号：{item.id}</div>
                                        <div className="col s6 right-align">发运时间：{formatUtil.getDateTime(item.load_date)}</div>
                                    </div>

                                    <div className="col s12 padding-top15 padding-bottom15 border-bottom-line">
                                        <div className="col s6">
                                            <span className="fz16 purple-font bold-font">{item.route_start} -- {item.route_end}</span>
                                            {item.trans_type === 1 && <i className="mdi mdi-truck-fast fz20 pink-font margin-left30"/>}
                                            {item.trans_type === 2 && <i className="mdi mdi-ferry fz20 pink-font margin-left30"/>}
                                            <span className="margin-left30 grey-text text-darken-2">{item.supplier_short}</span>
                                        </div>
                                        <div className="col s6 right-align">送达时间：{formatUtil.getDateTime(item.arrive_date)}</div>
                                    </div>
                                    <div className="col s12 padding-top15 padding-bottom15">
                                        <div className="col s4">供应商运费：{formatUtil.formatNumber(item.supplier_trans_price, 2)} 元</div>
                                        <div className="col s4">供应商保费：{formatUtil.formatNumber(item.supplier_insure_price, 2)} 元</div>
                                        <div className="col s4 right-align">
                                            支付供应商：<span className="fz16 pink-font">{formatUtil.formatNumber(item.supplier_trans_price + item.supplier_insure_price, 2)}</span> 元
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loadTaskProfitManagerDetailReducer: state.LoadTaskProfitManagerDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 取得车辆利润 详情
    getDetailInfo: () => {
        dispatch(loadTaskProfitManagerDetailAction.getLoadTaskProfitInfo(ownProps.match.params.id));
        dispatch(loadTaskProfitManagerDetailAction.getLoadTaskList(ownProps.match.params.id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadTaskProfitManagerDetail)