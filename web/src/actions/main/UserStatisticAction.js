import {apiHost} from '../../config/HostConfig';
import Highcharts from "highcharts/highstock";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getUserStatByMonth = () => async (dispatch, getState) => {
    try {
        // 统计开始月份
        let monthStart = $('#monthStart').val();
        if (monthStart === "" || monthStart === undefined) {
            monthStart = getState().UserStatisticReducer.monthStart;
        }
        // 统计结束月份
        let monthEnd = $('#monthEnd').val();
        if (monthEnd === "" || monthEnd === undefined) {
            monthEnd = getState().UserStatisticReducer.monthEnd;
        }
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/userStatByMonth?yMonthStart=' + monthStart + '&yMonthEnd=' + monthEnd;
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 月份
            let xAxisData = [];
            // 初始化 y轴数据 新增用户-按月统计
            let yAxisData = [
                {
                    name: '新增用户',
                    data: []
                }
            ];

            // 数据反转
            res.result.reverse();
            for (let i = 0; i < res.result.length; i++) {
                // x轴月份
                xAxisData.push(res.result[i].y_month);
                // 用户数
                yAxisData[0].data.push(Math.ceil(res.result[i].user_count));
            }
            dispatch(showMonthChart(xAxisData, yAxisData));
        } else if (res.success === false) {
            swal('获取新增用户按月统计信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getUserStatByDay = () => async (dispatch, getState) => {
    try {
        let dateSize = getState().UserStatisticReducer.dataSize;
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/userStatByDay?dateSize=' + dateSize;
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 日期
            let xAxisData = [];
            // 初始化 y轴数据 新增用户-按日统计
            let yAxisData = [
                {
                    name: '新增用户',
                    data: []
                }
            ];

            // 数据反转
            res.result.reverse();
            for (let i = 0; i < res.result.length; i++) {
                // x轴月份
                xAxisData.push(res.result[i].id);
                // 用户数
                yAxisData[0].data.push(Math.ceil(res.result[i].user_count));
            }
            dispatch(showDayChart(xAxisData, yAxisData));
        } else if (res.success === false) {
            swal('获取新增用户按日统计信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

const highChartOptions = (xAxisData, yAxisData) => {
    return {
        // bar: 条形图，line：折线图，column：柱状图
        chart: {
            type: 'column',
        },
        title: {
            text: null
        },
        xAxis: {
            // categories: xAxisData,
            categories: ['2018-01','2018-02','2018-03','2018-04','2018-05','2018-06','2018-07','2018-08','2018-09','2018-10','2018-11','2018-12'],
            crosshair: true
        },
        yAxis: {
            title: {
                text: '用户数',
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
        series: [{
            name: '东京',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }, {
            name: '纽约',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        }, {
            name: '伦敦',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        }, {
            name: '柏林',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        }]
        // series: yAxisData
    };
};

export const showMonthChart = (xAxisData, yAxisData) => () => {
    // 初始化图表
    Highcharts.chart('month-chart', highChartOptions(xAxisData, yAxisData));
};

export const showDayChart = (xAxisData, yAxisData) => () => {
    // 初始化图表
    Highcharts.chart('day-chart', highChartOptions(xAxisData, yAxisData));
};