import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {RefundStatisticActionType} from "../../actionTypes";

const refundStatisticAction = require('../../actions/main/RefundStatisticAction');
const formatUtil = require('../../util/FormatUtil');
const sysConst = require('../../util/SysConst');

class RefundStatistic extends React.Component {

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
        this.props.getRefundStatByMonth();
        // 按日统计
        this.props.getRefundStatByDay();

        // 初期化 month-picker 组件
        $('#monthStart,#monthEnd').MonthPicker({
            Button: false,
            MonthFormat: 'yymm'
        });
    }

    render() {
        const {refundStatisticReducer, getRefundStatByMonth, changeDaySize} = this.props;
        return (
            <div>
                {/* 上部分：退款-按月统计 */}
                <div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">
                    <div className="col s12 custom-purple bold white-text text-darken-1 no-padding">
                        <div className="col s6 margin-top15">退款-按月统计</div>

                        <div className="col s6 right">
                            <div className="col s4 left"/>

                            <div className="col s3 position-relative">
                                <input type="text" className="margin-bottom0" readOnly id="monthStart" value={refundStatisticReducer.monthStart}/>
                                <i className="mdi mdi-table-large date-icon"/>
                            </div>

                            <div className="col s1 center"><p>至</p></div>

                            <div className="col s3 position-relative">
                                <input type="text" className="margin-bottom0" readOnly id="monthEnd" value={refundStatisticReducer.monthEnd}/>
                                <i className="mdi mdi-table-large date-icon"/>
                            </div>
                            <div className="col s1 center padding-top10">
                                <i className="mdi mdi-magnify fz24 pointer" onClick={getRefundStatByMonth}/>
                            </div>

                        </div>
                    </div>
                    <div id="refund-money-month-chart" className="statistic-half-page"/>
                </div>

                {/* 下部分：退款-按日统计 */}
                <div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">
                    <div className="col s12 custom-purple no-padding">
                        <div className="col s6 margin-top15 margin-bottom15 bold white-text text-darken-1">退款-按日统计</div>
                        <div className="col s2 margin-top8 padding-right10 right">
                            <Select
                                options={sysConst.STATISTIC_DAYS}
                                onChange={changeDaySize}
                                value={refundStatisticReducer.daySize}
                                isSearchable={false}
                                styles={sysConst.STATISTIC_SELECT_STYLE}
                                isClearable={false}
                            />
                        </div>
                    </div>
                    <div id="refund-money-day-chart" className="statistic-half-page"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        refundStatisticReducer: state.RefundStatisticReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getRefundStatByMonth: () => {
        dispatch(refundStatisticAction.getRefundStatByMonth());
    },
    getRefundStatByDay: () => {
        dispatch(refundStatisticAction.getRefundStatByDay());
    },
    setMonthStart: (value) => {
        dispatch(RefundStatisticActionType.setMonthStart(value));
    },
    setMonthEnd: (value) => {
        dispatch(RefundStatisticActionType.setMonthEnd(value));
    },
    changeDaySize: (value) => {
        dispatch(RefundStatisticActionType.setDaySize(value));
        dispatch(refundStatisticAction.getRefundStatByDay());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RefundStatistic)