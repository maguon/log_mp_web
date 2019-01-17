import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {InquiryStatisticActionType} from "../../actionTypes";

const inquiryStatisticAction = require('../../actions/main/InquiryStatisticAction');
const formatUtil = require('../../util/FormatUtil');
const sysConst = require('../../util/SysConst');

class InquiryStatistic extends React.Component {

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
        this.props.getInquiryStatByMonth();
        // 按日统计
        this.props.getInquiryStatByDay();

        // 初期化 month-picker 组件
        $('#monthStart,#monthEnd').MonthPicker({
            Button: false,
            MonthFormat: 'yymm'
        });
    }

    render() {
        const {inquiryStatisticReducer, getInquiryStatByMonth, changeDaySize} = this.props;
        return (
            <div>
                {/* 上部分：询价-按月统计 */}
                <div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">
                    <div className="col s12 custom-purple bold white-text text-darken-1 no-padding">
                        <div className="col s6 margin-top15">询价-按月统计</div>

                        <div className="col s6 right">
                            <div className="col s4 left"/>

                            <div className="col s3 position-relative">
                                <input type="text" className="margin-bottom0" readOnly id="monthStart" value={inquiryStatisticReducer.monthStart}/>
                                <i className="mdi mdi-table-large date-icon"/>
                            </div>

                            <div className="col s1 center"><p>至</p></div>

                            <div className="col s3 position-relative">
                                <input type="text" className="margin-bottom0" readOnly id="monthEnd" value={inquiryStatisticReducer.monthEnd}/>
                                <i className="mdi mdi-table-large date-icon"/>
                            </div>
                            <div className="col s1 center padding-top10">
                                <i className="mdi mdi-magnify fz24 pointer" onClick={getInquiryStatByMonth}/>
                            </div>

                        </div>
                    </div>
                    <div id="inquiry-month-chart" className="statistic-half-page"/>
                </div>

                {/* 下部分：询价-按日统计 */}
                <div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">
                    <div className="col s12 custom-purple no-padding">
                        <div className="col s6 margin-top15 margin-bottom15 bold white-text text-darken-1">询价-按日统计</div>
                        <div className="col s2 margin-top8 padding-right10 right">
                            <Select
                                options={sysConst.STATISTIC_DAYS}
                                onChange={changeDaySize}
                                value={inquiryStatisticReducer.daySize}
                                isSearchable={false}
                                styles={sysConst.STATISTIC_SELECT_STYLE}
                                isClearable={false}
                            />
                        </div>
                    </div>
                    <div id="inquiry-day-chart" className="statistic-half-page"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        inquiryStatisticReducer: state.InquiryStatisticReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getInquiryStatByMonth: () => {
        dispatch(inquiryStatisticAction.getInquiryStatByMonth());
    },
    getInquiryStatByDay: () => {
        dispatch(inquiryStatisticAction.getInquiryStatByDay());
    },
    setMonthStart: (value) => {
        dispatch(InquiryStatisticActionType.setMonthStart(value));
    },
    setMonthEnd: (value) => {
        dispatch(InquiryStatisticActionType.setMonthEnd(value));
    },
    changeDaySize: (value) => {
        dispatch(InquiryStatisticActionType.setDaySize(value));
        dispatch(inquiryStatisticAction.getInquiryStatByDay());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InquiryStatistic)