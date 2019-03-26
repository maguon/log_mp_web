import {handleActions} from 'redux-actions';
import {OrderPanelActionType} from '../../actionTypes';

const initialState = {
    // 待协商订单
    unConsultOrderCount: 0,
    // 待完善信息订单
    msgImproved: 0,
    // 待完善价格订单
    priceImproved: 0,

    // 待生成需求订单
    unGenerated: 0,
    // 待执行订单
    unExecuted: 0,
    // 执行中订单
    inExecution: 0,

    // 待安排需求
    arrange: 0,
    // 安排中需求
    arranging: 0,
    // 待发运车辆
    noLoadCarCount: 0,
    // 运输中车辆
    loadingCarCount: 0
};

export default handleActions({
    [OrderPanelActionType.setUnConsultOrderCount]: (state, action) => {
        return {
            ...state,
            unConsultOrderCount: action.payload
        }
    },
    [OrderPanelActionType.setMsgImproved]: (state, action) => {
        return {
            ...state,
            msgImproved: action.payload
        }
    },
    [OrderPanelActionType.setPriceImproved]: (state, action) => {
        return {
            ...state,
            priceImproved: action.payload
        }
    },
    [OrderPanelActionType.setUnGenerated]: (state, action) => {
        return {
            ...state,
            unGenerated: action.payload
        }
    },
    [OrderPanelActionType.setUnExecuted]: (state, action) => {
        return {
            ...state,
            unExecuted: action.payload
        }
    },
    [OrderPanelActionType.setInExecution]: (state, action) => {
        return {
            ...state,
            inExecution: action.payload
        }
    },
    [OrderPanelActionType.setArrange]: (state, action) => {
        return {
            ...state,
            arrange: action.payload
        }
    },
    [OrderPanelActionType.setArranging]: (state, action) => {
        return {
            ...state,
            arranging: action.payload
        }
    },
    [OrderPanelActionType.setNoLoadCarCount]: (state, action) => {
        return {
            ...state,
            noLoadCarCount: action.payload
        }
    },
    [OrderPanelActionType.setLoadingCarCount]: (state, action) => {
        return {
            ...state,
            loadingCarCount: action.payload
        }
    }
}, initialState)