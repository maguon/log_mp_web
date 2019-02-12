import {handleActions} from 'redux-actions';
import {NewLoadTaskModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 画面标记
    pageId: '',
    // 画面TAB标记
    tabId: '',
    // 订单编号
    orderId: '',
    // 运输需求ID
    requireId: '',
    // 线路安排ID
    loadTaskId: '',

    // TAB 线路信息：起始城市
    startCity: null,
    // TAB 线路信息：目的城市
    endCity: null,
    // TAB 线路信息：供应商
    supplier: null,
    // TAB 线路信息：运送方式列表
    transportModeList: [],
    // TAB 线路信息：运送方式
    transportMode: null,
    // TAB 线路信息：计划发运日期
    planDate: '',
    // TAB 线路信息：备注
    remark: '',

    // TAB 运输车辆：线路安排基本信息
    loadTaskInfo: [],
    // TAB 运输车辆：未安排车辆
    unscheduledCarList: [],
    // TAB 运输车辆：已安排车辆
    scheduledCarList: [],

    // TAB 信息同步：是否同步标记
    syncFlag: false
};

export default handleActions({
    [NewLoadTaskModalActionType.setPageId]: (state, action) => {
        return {
            ...state,
            pageId: action.payload
        }
    },
    [NewLoadTaskModalActionType.setTabId]: (state, action) => {
        return {
            ...state,
            tabId: action.payload
        }
    },
    [NewLoadTaskModalActionType.setOrderId]: (state, action) => {
        return {
            ...state,
            orderId: action.payload
        }
    },
    [NewLoadTaskModalActionType.setRequireId]: (state, action) => {
        return {
            ...state,
            requireId: action.payload
        }
    },
    [NewLoadTaskModalActionType.setLoadTaskId]: (state, action) => {
        return {
            ...state,
            loadTaskId: action.payload
        }
    },
    [NewLoadTaskModalActionType.setStartCity]: (state, action) => {
        return {
            ...state,
            startCity: action.payload
        }
    },
    [NewLoadTaskModalActionType.setEndCity]: (state, action) => {
        return {
            ...state,
            endCity: action.payload
        }
    },
    [NewLoadTaskModalActionType.setSupplier]: (state, action) => {
        return {
            ...state,
            supplier: action.payload
        }
    },
    [NewLoadTaskModalActionType.setTransportModeList]: (state, action) => {
        return {
            ...state,
            transportModeList: action.payload
        }
    },
    [NewLoadTaskModalActionType.setTransportMode]: (state, action) => {
        return {
            ...state,
            transportMode: action.payload
        }
    },
    [NewLoadTaskModalActionType.setPlanDate]: (state, action) => {
        return {
            ...state,
            planDate: action.payload
        }
    },
    [NewLoadTaskModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    },
    [NewLoadTaskModalActionType.getLoadTaskInfo]: (state, action) => {
        return {
            ...state,
            loadTaskInfo: action.payload
        }
    },
    [NewLoadTaskModalActionType.getUnscheduledCarList]: (state, action) => {
        return {
            ...state,
            unscheduledCarList: action.payload
        }
    },
    [NewLoadTaskModalActionType.getScheduledCarList]: (state, action) => {
        return {
            ...state,
            scheduledCarList: action.payload
        }
    },
    [NewLoadTaskModalActionType.setSyncFlag]: (state, action) => {
        return {
            ...state,
            syncFlag: action.payload
        }
    }
}, initialState)