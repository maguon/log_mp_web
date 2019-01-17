import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {OrderStatisticActionType} from "../../actionTypes";

const orderStatisticAction = require('../../actions/main/OrderStatisticAction');
const formatUtil = require('../../util/FormatUtil');
const sysConst = require('../../util/SysConst');

class OrderStatistic extends React.Component {

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
        // 初期化 开始月/终了月
        this.props.setMonthStart(formatUtil.formatDate(new Date(), 'yyyy') + '01');
        this.props.setMonthEnd(formatUtil.formatDate(new Date(), 'yyyyMM'));
        // 初期化 统计日数（暂定10）
        this.props.changeDaySize(sysConst.STATISTIC_DAYS[0]);
        // 按月统计
        this.props.getOrderStatByMonth();
        // 按日统计
        this.props.getOrderStatByDay();

        // 初期化 month-picker 组件
        $('#monthStart,#monthEnd').MonthPicker({
            Button: false,
            MonthFormat: 'yymm'
        });
    }

    render() {
        const {orderStatisticReducer, getOrderStatByMonth, changeDaySize} = this.props;
        return (
            <div>
                {/* 上部分：订单-按月统计 */}
                <div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">
                    <div className="col s12 custom-purple bold white-text text-darken-1 no-padding">
                        <div className="col s6 margin-top15">订单-按月统计</div>

                        <div className="col s6 right">
                            <div className="col s4 left"/>

                            <div className="col s3 position-relative">
                                <input type="text" className="margin-bottom0" readOnly id="monthStart" value={orderStatisticReducer.monthStart}/>
                                <i className="mdi mdi-table-large date-icon"/>
                            </div>

                            <div className="col s1 center"><p>至</p></div>

                            <div className="col s3 position-relative">
                                <input type="text" className="margin-bottom0" readOnly id="monthEnd" value={orderStatisticReducer.monthEnd}/>
                                <i className="mdi mdi-table-large date-icon"/>
                            </div>
                            <div className="col s1 center padding-top10">
                                <i className="mdi mdi-magnify fz24 pointer" onClick={getOrderStatByMonth}/>
                            </div>

                        </div>
                    </div>
                    <div id="order-count-month-chart" className="statistic-half-page"/>
                    <div id="order-money-month-chart" className="statistic-half-page"/>
                </div>

                {/* 下部分：订单-按日统计 */}
                <div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">
                    <div className="col s12 custom-purple no-padding">
                        <div className="col s6 margin-top15 margin-bottom15 bold white-text text-darken-1">订单-按日统计</div>
                        <div className="col s2 margin-top8 padding-right10 right">
                            <Select
                                options={sysConst.STATISTIC_DAYS}
                                onChange={changeDaySize}
                                value={orderStatisticReducer.daySize}
                                isSearchable={false}
                                styles={sysConst.STATISTIC_SELECT_STYLE}
                                isClearable={false}
                            />
                        </div>
                    </div>
                    <div id="order-count-day-chart" className="statistic-half-page"/>
                    <div id="order-money-day-chart" className="statistic-half-page"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orderStatisticReducer: state.OrderStatisticReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getOrderStatByMonth: () => {
        dispatch(orderStatisticAction.getOrderStatByMonth());
    },
    getOrderStatByDay: () => {
        dispatch(orderStatisticAction.getOrderStatByDay());
    },
    setMonthStart: (value) => {
        dispatch(OrderStatisticActionType.setMonthStart(value));
    },
    setMonthEnd: (value) => {
        dispatch(OrderStatisticActionType.setMonthEnd(value));
    },
    changeDaySize: (value) => {
        dispatch(OrderStatisticActionType.setDaySize(value));
        dispatch(orderStatisticAction.getOrderStatByDay());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatistic)