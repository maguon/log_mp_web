import React from 'react';
import {connect} from 'react-redux';

const formatUtil = require('../../util/FormatUtil');
const orderPanelAction = require('../../actions/main/OrderPanelAction');

class OrderPanel extends React.Component {

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
        const {orderPanelReducer} = this.props;
        return (
            <div>
                {/* 行1： 待协商订单 待完善信息订单 待完善价格订单 */}
                <div className="row margin-top20 padding-left20 padding-right20 white-text">

                    {/* 待协商订单 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 custom-pink z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s3 margin-top5">
                                <div className="main-panel-icon white vc-center"><i className="mdi mdi-headset pink-font"/></div>
                            </div>
                            <div className="col s9 no-padding">
                                <div className="col s12 fz16">待协商订单</div>
                                <div className="col s12 right-align fz24">{formatUtil.formatNumber(orderPanelReducer.unConsultOrderCount)}</div>
                            </div>
                        </div>
                    </div>

                    {/* 待完善信息订单 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 custom-pink z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s3 margin-top5">
                                <div className="main-panel-icon white vc-center"><i className="mdi mdi-playlist-edit pink-font"/></div>
                            </div>
                            <div className="col s9 no-padding">
                                <div className="col s12 fz16">待完善信息订单</div>
                                <div className="col s12 right-align fz24">{formatUtil.formatNumber(orderPanelReducer.msgImproved)}</div>
                            </div>
                        </div>
                    </div>

                    {/* 待完善价格订单 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 custom-pink z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s3 margin-top5">
                                <div className="main-panel-icon white vc-center"><i className="mdi mdi-currency-cny pink-font"/></div>
                            </div>
                            <div className="col s9 no-padding">
                                <div className="col s12 fz16">待完善价格订单</div>
                                <div className="col s12 right-align fz24">{formatUtil.formatNumber(orderPanelReducer.priceImproved)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 行2： 待生成需求订单 待执行订单 执行中订单 */}
                <div className="row margin-top40 padding-left20 padding-right20 white-text">

                    {/* 待生成需求订单 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 custom-pink z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s3 margin-top5">
                                <div className="main-panel-icon white vc-center"><i className="mdi mdi-sitemap pink-font"/></div>
                            </div>
                            <div className="col s9 no-padding">
                                <div className="col s12 fz16">待生成需求订单</div>
                                <div className="col s12 right-align fz24">{formatUtil.formatNumber(orderPanelReducer.unGenerated)}</div>
                            </div>
                        </div>
                    </div>

                    {/* 待执行订单 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 custom-pink z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s3 margin-top5">
                                <div className="main-panel-icon white vc-center"><i className="mdi mdi-map-marker-plus pink-font"/></div>
                            </div>
                            <div className="col s9 no-padding">
                                <div className="col s12 fz16">待执行订单</div>
                                <div className="col s12 right-align fz24">{formatUtil.formatNumber(orderPanelReducer.unExecuted)}</div>
                            </div>
                        </div>
                    </div>

                    {/* 执行中订单 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 custom-pink z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s3 margin-top5">
                                <div className="main-panel-icon white vc-center"><i className="mdi mdi-map-marker-distance pink-font"/></div>
                            </div>
                            <div className="col s9 no-padding">
                                <div className="col s12 fz16">执行中订单</div>
                                <div className="col s12 right-align fz24">{formatUtil.formatNumber(orderPanelReducer.inExecution)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 行3： 待安排需求 安排中需求 */}
                <div className="row margin-top40 padding-left20 padding-right20 pink-font">

                    {/* 待安排需求 */}
                    <div className="col s6 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s2">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-television-guide white-text"/>
                                </div>
                            </div>
                            <div className="col s10 no-padding margin-top5 vc-center">
                                <div className="col s4 fz16 grey-text text-darken-2">待安排需求</div>
                                <div className="col s8 right-align fz24">{formatUtil.formatNumber(orderPanelReducer.arrange)}</div>
                            </div>
                        </div>
                    </div>

                    {/* 安排中需求 */}
                    <div className="col s6 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s2">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-television-guide white-text"/>
                                </div>
                            </div>
                            <div className="col s10 no-padding margin-top5 vc-center">
                                <div className="col s4 fz16 grey-text text-darken-2">安排中需求</div>
                                <div className="col s8 right-align fz24">{formatUtil.formatNumber(orderPanelReducer.arranging)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 行4： 待发运车辆 运输中车辆 */}
                <div className="row margin-top40 padding-left20 padding-right20 pink-font">

                    {/* 待发运车辆 */}
                    <div className="col s6 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s2">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-car white-text"/>
                                </div>
                            </div>
                            <div className="col s10 no-padding margin-top5 vc-center">
                                <div className="col s4 fz16 grey-text text-darken-2">待发运车辆</div>
                                <div className="col s8 right-align fz24">{formatUtil.formatNumber(orderPanelReducer.noLoadCarCount)}</div>
                            </div>
                        </div>
                    </div>

                    {/* 运输中车辆 */}
                    <div className="col s6 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s2">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-car white-text"/>
                                </div>
                            </div>
                            <div className="col s10 no-padding margin-top5 vc-center">
                                <div className="col s4 fz16 grey-text text-darken-2">运输中车辆</div>
                                <div className="col s8 right-align fz24">{formatUtil.formatNumber(orderPanelReducer.loadingCarCount)}</div>
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
        orderPanelReducer: state.OrderPanelReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    initData: () => {
        dispatch(orderPanelAction.getUnConsultOrderCount());
        dispatch(orderPanelAction.getStatisticsOrder());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPanel)