import {apiHost} from '../../config/HostConfig';
import Highcharts from "highcharts/highstock";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getInquiryStatByMonth = () => async (dispatch, getState) => {
    try {
        // 统计开始月份
        let monthStart = $('#monthStart').val();
        if (monthStart === "" || monthStart === undefined) {
            monthStart = getState().InquiryStatisticReducer.monthStart;
        }
        // 统计结束月份
        let monthEnd = $('#monthEnd').val();
        if (monthEnd === "" || monthEnd === undefined) {
            monthEnd = getState().InquiryStatisticReducer.monthEnd;
        }

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/statisticsInquiryCountByMonth?startMonth=' + monthStart + '&endMonth=' + monthEnd;
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 月份
            let xAxisData = [];
            // 初始化 y轴数据 按月统计
            let yAxisMoneyData = [];

            // 询价次数
            let allInquiryData = {name: '询价次数', data: []};
            for (let i = res.result.length -1; i >= 0; i--) {
                // x轴月份
                xAxisData.push(res.result[i].y_month);
                allInquiryData.data.push(Math.ceil(res.result[i].inquiry_counts));
            }
            yAxisMoneyData.push(allInquiryData);

            dispatch(showMonthChart(xAxisData, yAxisMoneyData));
        } else if (res.success === false) {
            swal('获取询价按月统计信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getInquiryStatByDay = () => async (dispatch, getState) => {
    try {
        let daySize = getState().InquiryStatisticReducer.daySize.value;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/statisticsInquiryCountByDay?selectDays=' + daySize;
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 月份
            let xAxisData = [];
            // 初始化 y轴数据 按日统计
            let yAxisMoneyData = [];

            // 询价次数
            let allInquiryData = {name: '询价次数', data: []};
            for (let i = res.result.length -1; i >= 0; i--) {
                // x轴月份
                xAxisData.push(res.result[i].id);
                allInquiryData.data.push(Math.ceil(res.result[i].inquiry_counts));
            }
            yAxisMoneyData.push(allInquiryData);

            // 订单金额 统计
            dispatch(showDayChart(xAxisData, yAxisMoneyData));
        } else if (res.success === false) {
            swal('获取询价按日统计信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

const highChartOptions = (title, xAxisData, yAxisData) => {
    return {
        // bar: 条形图，line：折线图，column：柱状图
        chart: {
            type: 'line',
        },
        title: {
            text: null
        },
        xAxis: {
            categories: xAxisData,
            crosshair: true
        },
        yAxis: {
            title: {
                text: title,
                // 可用的值有 "low"，"middle" 和 "high"，分别表示于最小值对齐、居中对齐、与最大值对齐。 默认是：middle.
                align: 'middle'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        credits: {
            enabled: false
        },
        series: yAxisData
    };
};

// 初始化图表 订单金额统计
export const showMonthChart = (xAxisData, yAxisData) => () => {
    Highcharts.chart('inquiry-month-chart', highChartOptions('', xAxisData, yAxisData));
};

// 初始化图表 订单笔数统计
export const showDayChart = (xAxisData, yAxisData) => () => {
    Highcharts.chart('inquiry-day-chart', highChartOptions('', xAxisData, yAxisData));
};