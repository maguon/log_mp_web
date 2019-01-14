import {apiHost} from '../../config/HostConfig';
import Highcharts from "highcharts/highstock";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getOrderStatByMonth = () => async (dispatch, getState) => {
    try {
        // 统计开始月份
        let monthStart = $('#monthStart').val();
        if (monthStart === "" || monthStart === undefined) {
            monthStart = getState().OrderStatisticReducer.monthStart;
        }
        // 统计结束月份
        let monthEnd = $('#monthEnd').val();
        if (monthEnd === "" || monthEnd === undefined) {
            monthEnd = getState().OrderStatisticReducer.monthEnd;
        }

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/statisticsOrderMsgByMonth?startMonth=' + monthStart + '&endMonth=' + monthEnd;
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 月份
            let xAxisData = [];
            // 初始化 y轴数据 订单笔数-按月统计
            let yAxisCountData = [];
            // 初始化 y轴数据 订单金额-按月统计
            let yAxisMoneyData = [];

            // 所有订单
            let allOrderCountData = {name: '所有订单', data: []};
            let allOrderMoneyData = {name: '所有订单', data: []};
            for (let i = res.result.all.length -1; i >= 0; i--) {
                // x轴月份
                xAxisData.push(res.result.all[i].y_month);
                // 订单数
                allOrderCountData.data.push(Math.ceil(res.result.all[i].order_counts));
                // 订单金额
                allOrderMoneyData.data.push(Math.ceil(res.result.all[i].order_price));
            }
            yAxisCountData.push(allOrderCountData);
            yAxisMoneyData.push(allOrderMoneyData);

            // 内部订单
            let innerOrderCountData = {name: '内部订单', data: []};
            let innerOrderMoneyData = {name: '内部订单', data: []};
            for (let i = res.result.internal.length -1; i >= 0; i--) {
                innerOrderCountData.data.push(Math.ceil(res.result.internal[i].order_counts));
                innerOrderMoneyData.data.push(Math.ceil(res.result.internal[i].order_price));
            }
            yAxisCountData.push(innerOrderCountData);
            yAxisMoneyData.push(innerOrderMoneyData);

            // 外部订单
            let outerOrderCountData = {name: '外部订单',data: []};
            let outerOrderMoneyData = {name: '外部订单',data: []};
            for (let i = res.result.extrnal.length -1; i >= 0; i--) {
                outerOrderCountData.data.push(Math.ceil(res.result.extrnal[i].order_counts));
                outerOrderMoneyData.data.push(Math.ceil(res.result.extrnal[i].order_price));
            }
            yAxisCountData.push(outerOrderCountData);
            yAxisMoneyData.push(outerOrderMoneyData);

            // 订单笔数 统计
            dispatch(showCountMonthChart(xAxisData, yAxisCountData));
            // 订单金额 统计
            dispatch(showMoneyMonthChart(xAxisData, yAxisMoneyData));
        } else if (res.success === false) {
            swal('获取订单按月统计信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getOrderStatByDay = () => async (dispatch, getState) => {
    try {
        let daySize = getState().OrderStatisticReducer.daySize.value;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/statisticsOrderMsgByDay?selectDays=' + daySize;
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 月份
            let xAxisData = [];
            // 初始化 y轴数据 订单笔数-按日统计
            let yAxisCountData = [];
            // 初始化 y轴数据 订单金额-按日统计
            let yAxisMoneyData = [];

            // 所有订单
            let allOrderCountData = {name: '所有订单', data: []};
            let allOrderMoneyData = {name: '所有订单', data: []};
            for (let i = res.result.all.length -1; i >= 0; i--) {
                // x轴月份
                xAxisData.push(res.result.all[i].id);
                // 订单数
                allOrderCountData.data.push(Math.ceil(res.result.all[i].order_counts));
                // 订单金额
                allOrderMoneyData.data.push(Math.ceil(res.result.all[i].order_price));
            }
            yAxisCountData.push(allOrderCountData);
            yAxisMoneyData.push(allOrderMoneyData);

            // 内部订单
            let innerOrderCountData = {name: '内部订单', data: []};
            let innerOrderMoneyData = {name: '内部订单', data: []};
            for (let i = res.result.internal.length - 1; i >= 0; i--) {
                innerOrderCountData.data.push(Math.ceil(res.result.internal[i].order_counts));
                innerOrderMoneyData.data.push(Math.ceil(res.result.internal[i].order_price));
            }
            yAxisCountData.push(innerOrderCountData);
            yAxisMoneyData.push(innerOrderMoneyData);

            // 外部订单
            let outerOrderCountData = {name: '外部订单', data: []};
            let outerOrderMoneyData = {name: '外部订单', data: []};
            for (let i = res.result.extrnal.length -1; i >= 0; i--) {
                outerOrderCountData.data.push(Math.ceil(res.result.extrnal[i].order_counts));
                outerOrderMoneyData.data.push(Math.ceil(res.result.extrnal[i].order_price));
            }
            yAxisCountData.push(outerOrderCountData);
            yAxisMoneyData.push(outerOrderMoneyData);

            // 订单笔数 统计
            dispatch(showCountDayChart(xAxisData, yAxisCountData));
            // 订单金额 统计
            dispatch(showMoneyDayChart(xAxisData, yAxisMoneyData));
        } else if (res.success === false) {
            swal('获取订单按日统计信息失败', res.msg, 'warning');
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

// 初始化图表 订单笔数统计
export const showCountMonthChart = (xAxisData, yAxisData) => () => {
    Highcharts.chart('order-count-month-chart', highChartOptions('订单笔数', xAxisData, yAxisData));
};

// 初始化图表 订单金额统计
export const showMoneyMonthChart = (xAxisData, yAxisData) => () => {
    Highcharts.chart('order-money-month-chart', highChartOptions('订单金额', xAxisData, yAxisData));
};

// 初始化图表 订单笔数统计
export const showCountDayChart = (xAxisData, yAxisData) => () => {
    Highcharts.chart('order-count-day-chart', highChartOptions('订单笔数', xAxisData, yAxisData));
};

// 初始化图表 订单笔数统计
export const showMoneyDayChart = (xAxisData, yAxisData) => () => {
    Highcharts.chart('order-money-day-chart', highChartOptions('订单金额', xAxisData, yAxisData));
};