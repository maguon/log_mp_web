import {apiHost} from '../../config/HostConfig';
import Highcharts from "highcharts/highstock";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getInvoiceStatByMonth = () => async (dispatch, getState) => {
    try {
        // 统计开始月份
        let monthStart = $('#monthStart').val();
        if (monthStart === "" || monthStart === undefined) {
            monthStart = getState().InvoiceStatisticReducer.monthStart;
        }
        // 统计结束月份
        let monthEnd = $('#monthEnd').val();
        if (monthEnd === "" || monthEnd === undefined) {
            monthEnd = getState().InvoiceStatisticReducer.monthEnd;
        }

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/statisticsInvoiceMsgByMonth?startMonth=' + monthStart + '&endMonth=' + monthEnd;
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 月份
            let xAxisData = [];
            // 初始化 y轴数据 笔数-按月统计
            let yAxisCountData = [];
            // 初始化 y轴数据 金额-按月统计
            let yAxisMoneyData = [];

            // 所有订单
            let allOrderCountData = {name: '所有订单', data: []};
            let allOrderMoneyData = {name: '所有订单', data: []};
            for (let i = res.result.all.length -1; i >= 0; i--) {
                // x轴月份
                xAxisData.push(res.result.all[i].y_month);
                // 订单数
                allOrderCountData.data.push(Math.ceil(res.result.all[i].invoice_count));
                // 订单金额
                allOrderMoneyData.data.push(Math.ceil(res.result.all[i].invoice_price));
            }
            yAxisCountData.push(allOrderCountData);
            yAxisMoneyData.push(allOrderMoneyData);

            // 内部订单
            let innerOrderCountData = {name: '内部订单', data: []};
            let innerOrderMoneyData = {name: '内部订单', data: []};
            for (let i = res.result.internal.length -1; i >= 0; i--) {
                innerOrderCountData.data.push(Math.ceil(res.result.internal[i].invoice_count));
                innerOrderMoneyData.data.push(Math.ceil(res.result.internal[i].invoice_price));
            }
            yAxisCountData.push(innerOrderCountData);
            yAxisMoneyData.push(innerOrderMoneyData);

            // 外部订单
            let outerOrderCountData = {name: '外部订单',data: []};
            let outerOrderMoneyData = {name: '外部订单',data: []};
            for (let i = res.result.extrnal.length -1; i >= 0; i--) {
                outerOrderCountData.data.push(Math.ceil(res.result.extrnal[i].invoice_count));
                outerOrderMoneyData.data.push(Math.ceil(res.result.extrnal[i].invoice_price));
            }
            yAxisCountData.push(outerOrderCountData);
            yAxisMoneyData.push(outerOrderMoneyData);

            // 自助订单
            let ownerOrderCountData = {name: '自助订单',data: []};
            let ownerOrderMoneyData = {name: '自助订单',data: []};
            for (let i = res.result.owner.length -1; i >= 0; i--) {
                ownerOrderCountData.data.push(Math.ceil(res.result.owner[i].invoice_count));
                ownerOrderMoneyData.data.push(Math.ceil(res.result.owner[i].invoice_price));
            }
            yAxisCountData.push(ownerOrderCountData);
            yAxisMoneyData.push(ownerOrderMoneyData);

            // 笔数 统计
            dispatch(showCountMonthChart(xAxisData, yAxisCountData));
            // 金额 统计
            dispatch(showMoneyMonthChart(xAxisData, yAxisMoneyData));
        } else if (res.success === false) {
            swal('获取发票按月统计信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getInvoiceStatByDay = () => async (dispatch, getState) => {
    try {
        let daySize = getState().InvoiceStatisticReducer.daySize.value;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/statisticsInvoiceMsgByDay?selectDays=' + daySize;
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 月份
            let xAxisData = [];
            // 初始化 y轴数据 笔数-按日统计
            let yAxisCountData = [];
            // 初始化 y轴数据 金额-按日统计
            let yAxisMoneyData = [];

            // 所有订单
            let allOrderCountData = {name: '所有订单', data: []};
            let allOrderMoneyData = {name: '所有订单', data: []};
            for (let i = res.result.all.length -1; i >= 0; i--) {
                // x轴月份
                xAxisData.push(res.result.all[i].id);
                // 订单数
                allOrderCountData.data.push(Math.ceil(res.result.all[i].invoice_count));
                // 订单金额
                allOrderMoneyData.data.push(Math.ceil(res.result.all[i].invoice_price));
            }
            yAxisCountData.push(allOrderCountData);
            yAxisMoneyData.push(allOrderMoneyData);

            // 内部订单
            let innerOrderCountData = {name: '内部订单', data: []};
            let innerOrderMoneyData = {name: '内部订单', data: []};
            for (let i = res.result.internal.length - 1; i >= 0; i--) {
                innerOrderCountData.data.push(Math.ceil(res.result.internal[i].invoice_count));
                innerOrderMoneyData.data.push(Math.ceil(res.result.internal[i].invoice_price));
            }
            yAxisCountData.push(innerOrderCountData);
            yAxisMoneyData.push(innerOrderMoneyData);

            // 外部订单
            let outerOrderCountData = {name: '外部订单', data: []};
            let outerOrderMoneyData = {name: '外部订单', data: []};
            for (let i = res.result.extrnal.length -1; i >= 0; i--) {
                outerOrderCountData.data.push(Math.ceil(res.result.extrnal[i].invoice_count));
                outerOrderMoneyData.data.push(Math.ceil(res.result.extrnal[i].invoice_price));
            }
            yAxisCountData.push(outerOrderCountData);
            yAxisMoneyData.push(outerOrderMoneyData);

            // 自助订单
            let ownerOrderCountData = {name: '自助订单', data: []};
            let ownerOrderMoneyData = {name: '自助订单', data: []};
            for (let i = res.result.owner.length -1; i >= 0; i--) {
                ownerOrderCountData.data.push(Math.ceil(res.result.owner[i].invoice_count));
                ownerOrderMoneyData.data.push(Math.ceil(res.result.owner[i].invoice_price));
            }
            yAxisCountData.push(ownerOrderCountData);
            yAxisMoneyData.push(ownerOrderMoneyData);

            // 笔数 统计
            dispatch(showCountDayChart(xAxisData, yAxisCountData));
            // 金额 统计
            dispatch(showMoneyDayChart(xAxisData, yAxisMoneyData));
        } else if (res.success === false) {
            swal('获取发票按日统计信息失败', res.msg, 'warning');
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

// 初始化图表 发票笔数
export const showCountMonthChart = (xAxisData, yAxisData) => () => {
    Highcharts.chart('invoice-count-month-chart', highChartOptions('发票笔数', xAxisData, yAxisData));
};

// 初始化图表 发票金额
export const showMoneyMonthChart = (xAxisData, yAxisData) => () => {
    Highcharts.chart('invoice-money-month-chart', highChartOptions('发票金额', xAxisData, yAxisData));
};

// 初始化图表 发票笔数
export const showCountDayChart = (xAxisData, yAxisData) => () => {
    Highcharts.chart('invoice-count-day-chart', highChartOptions('发票笔数', xAxisData, yAxisData));
};

// 初始化图表 发票金额
export const showMoneyDayChart = (xAxisData, yAxisData) => () => {
    Highcharts.chart('invoice-money-day-chart', highChartOptions('发票金额', xAxisData, yAxisData));
};