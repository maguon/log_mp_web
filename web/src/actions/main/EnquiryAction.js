import {EnquiryActionType} from "../../actionTypes";
import {reset} from 'redux-form'
import {apiHost} from '../../config/HostConfig';
import {createAction} from "redux-actions";

const httpUtil = require('../../util/HttpUtil');

export const getCityList = () => async (dispatch) => {
    try {
        const url = apiHost + '/api/city';
        const res = await httpUtil.httpGet(url)

        if (res.success) {
            dispatch({type: EnquiryActionType.getCityList, payload: res.result})
        } else {
            swal({
                type: 'warning',
                title: '错误',
                text: '获取城市信息失败'
            })
        }

    } catch (err) {
        // alert message
        swal({
            type: 'error',
            title: '系统异常',
            text: '服务器内部错误!'
        })
    }
};

export const openEnquiryModal = () => async (dispatch) => {
    console.log('resetForm inner');
    // 清空reduxForm
    dispatch(reset('enquiryForm'));
    // 询价画面 初期时，【里程】和【预计运费】默认为：0
    dispatch({type: EnquiryActionType.setMileage, payload: 0});
    dispatch({type: EnquiryActionType.setFreight, payload: 0});
};

// export const openModal = () => async (dispatch) => {
//     console.log('open modal')
//     // dispatch(reset('enquiryForm'))
//     $('.modal').modal(
//         {
//             dismissible: true, // Modal can be dismissed by clicking outside of the modal
//             // opacity: .5, // Opacity of modal background
//             // in_duration: 300, // Transition in duration
//             // out_duration: 200, // Transition out duration
//             // starting_top: '4%', // Starting top style attribute
//             // ending_top: '10%', // Ending top style attribute
//             // ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
//             //     alert("Ready");
//             //     console.log(modal, trigger);
//             // },
//             // onCloseStart: function() { dispatch({type: EnquiryActionType.enquiryModal, payload: false}) },
//             onCloseEnd: function () {
//                 $('#enquiryDiv').modal('destroy');
//
//                 console.log('close...........')
//                 console.log('aaaaaaaaaaa')
//                 // this.props.closeModal();
//
//                 // this.hiddenModal();
//                 //dispatch({type: EnquiryActionType.enquiryModal, payload: false})
//             } // Callback for Modal close
//         }
//     );
//     $('#enquiryDiv').modal('open');
// };

/**
 * 根据开始城市-终到城市，设定画面里程显示。
 */
export const calculateMileage = (startCity, endCity) => async (dispatch,getState) => {
    try {
        console.log('getState',getState)
        console.log('startCity',getState().EnquiryReducer.startCity)
        // 'http://stg.myxxjs.com:9101/api/route?routeStartId=101&routeEndId=102'
        const url = apiHost + '/api/route?routeStartId=' + startCity + '&routeEndId=' + endCity;
        // const res = await httpUtil.httpGet(url);
        //
        // if (res.success) {
        //     // dispatch({type: EnquiryActionType.getCityList, payload: res.result})
        //
        //     dispatch({type: EnquiryActionType.setMileage, payload: value})
        // } else {
        //     swal({
        //         type: 'warning',
        //         title: '错误',
        //         text: '获取城市信息失败'
        //     })
        // }

    } catch (err) {
        // alert message
        swal({
            type: 'error',
            title: '系统异常',
            text: '服务器内部错误!'
        })
    }
};

/**
 * 设定画面预计运费结果。
 */
export const calculateFreight = (value) => async (dispatch) => {
    dispatch({type: EnquiryActionType.setFreight, payload: value})
};

