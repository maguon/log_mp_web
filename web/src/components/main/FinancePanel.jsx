import React from 'react';
import {connect} from 'react-redux';

const formatUtil = require('../../util/FormatUtil');
const financePanelAction = require('../../actions/main/FinancePanelAction');

class FinancePanel extends React.Component {

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
        this.props.initData();
    }

    render() {
        const {financePanelReducer} = this.props;
        return (
            <div>
                {/* 上： 本月收入 本月利润 本月支付供应商 */}
                <div className="row margin-top20 padding-left20 padding-right20 white-text">
                    {/* 本月收入 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 custom-pink z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s3 margin-top5">
                                <div className="main-panel-icon white vc-center"><i className="mdi mdi-currency-cny pink-font"/></div>
                            </div>
                            <div className="col s9 no-padding">
                                <div className="col s12 fz16">本月收入</div>
                                <div className="col s12 right-align">¥ <span className="margin-left5 fz24">{formatUtil.formatNumber(financePanelReducer.income,2)}</span></div>
                            </div>
                        </div>
                    </div>

                    {/* 本月利润 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 custom-pink z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s3 margin-top5">
                                <div className="main-panel-icon white vc-center"><i className="mdi mdi-currency-cny pink-font"/></div>
                            </div>
                            <div className="col s9 no-padding">
                                <div className="col s12 fz16">本月利润</div>
                                <div className="col s12 right-align">¥ <span className="margin-left5 fz24">{formatUtil.formatNumber(financePanelReducer.profit,2)}</span></div>
                            </div>
                        </div>
                    </div>

                    {/* 本月支付供应商 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 custom-pink z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s3 margin-top5">
                                <div className="main-panel-icon white vc-center"><i className="mdi mdi-currency-cny pink-font"/></div>
                            </div>
                            <div className="col s9 no-padding">
                                <div className="col s12 fz16">本月支付供应商</div>
                                <div className="col s12 right-align">¥ <span className="margin-left5 fz24">{formatUtil.formatNumber(financePanelReducer.pay,2)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 中： 支付待审核 待退款 待开票 */}
                <div className="row margin-top40 padding-left20 padding-right20 pink-font">

                    {/* 支付待审核 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">

                            <div className="col s12 vc-center">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-square-edit-outline white-text"/>
                                </div>
                            </div>
                            <div className="col s12 margin-top5 center fz16">支付待审核</div>
                            <div className="col s12"><div className="col s12 divider custom-divider margin-top10"/></div>

                            <div className="col s12 margin-top15">
                                <div className="col s6 center border-right-pink-line">
                                    <div className="margin-top5 grey-text text-darken-2">笔数</div>
                                    <div className="margin-top10">{formatUtil.formatNumber(financePanelReducer.waitForPayCnt)}</div>
                                </div>
                                <div className="col s6 center">
                                    <div className="margin-top5 grey-text text-darken-2">金额</div>
                                    <div className="margin-top10">{formatUtil.formatNumber(financePanelReducer.waitForPayMoney,2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 待退款 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">

                            <div className="col s12 vc-center">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-backspace white-text"/>
                                </div>
                            </div>
                            <div className="col s12 margin-top5 center fz16">待退款</div>
                            <div className="col s12"><div className="col s12 divider custom-divider margin-top10"/></div>

                            <div className="col s12 margin-top15">
                                <div className="col s6 center border-right-pink-line">
                                    <div className="margin-top5 grey-text text-darken-2">笔数</div>
                                    <div className="margin-top10">{formatUtil.formatNumber(financePanelReducer.waitForRefundCnt)}</div>
                                </div>
                                <div className="col s6 center">
                                    <div className="margin-top5 grey-text text-darken-2">金额</div>
                                    <div className="margin-top10">{formatUtil.formatNumber(financePanelReducer.waitForRefundMoney,2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 待开票 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">

                            <div className="col s12 vc-center">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-printer white-text"/>
                                </div>
                            </div>
                            <div className="col s12 margin-top5 center fz16">待开票</div>
                            <div className="col s12"><div className="col s12 divider custom-divider margin-top10"/></div>

                            <div className="col s12 margin-top15">
                                <div className="col s6 center border-right-pink-line">
                                    <div className="margin-top5 grey-text text-darken-2">笔数</div>
                                    <div className="margin-top10">{formatUtil.formatNumber(financePanelReducer.waitForInvoiceCnt)}</div>
                                </div>
                                <div className="col s6 center">
                                    <div className="margin-top5 grey-text text-darken-2">金额</div>
                                    <div className="margin-top10">{formatUtil.formatNumber(financePanelReducer.waitForInvoiceMoney,2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 下： 待支付线路 待支付供应商金额 */}
                <div className="row margin-top40 padding-left20 padding-right20 pink-font">

                    {/* 待支付线路 */}
                    <div className="col s6 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s2 margin-top5">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-routes white-text"/>
                                </div>
                            </div>
                            <div className="col s10 no-padding">
                                <div className="col s12 fz16 grey-text text-darken-2">待支付线路</div>
                                <div className="col s12 right-align fz24">{formatUtil.formatNumber(financePanelReducer.waitForPayLoadTask)}</div>
                            </div>
                        </div>
                    </div>

                    {/* 待支付供应商金额 */}
                    <div className="col s6 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s2 margin-top5">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-truck-fast white-text"/>
                                </div>
                            </div>
                            <div className="col s10 no-padding">
                                <div className="col s12 fz16 grey-text text-darken-2">待支付供应商金额</div>
                                <div className="col s12 right-align fz24">{formatUtil.formatNumber(financePanelReducer.waitForPaySupplier,2)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        financePanelReducer: state.FinancePanelReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    initData: () => {
        dispatch(financePanelAction.getPaymentInMonth());
        dispatch(financePanelAction.getRefundInMonth());
        dispatch(financePanelAction.getPrice());
        dispatch(financePanelAction.getUnInvoice());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FinancePanel)