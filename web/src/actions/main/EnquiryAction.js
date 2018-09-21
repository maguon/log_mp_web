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
    dispatch(reset('EnquiryFormValues'));
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
export const calculateMileage = () => async (dispatch, getState) => {
    try {
        console.log('getState()', getState());
        // const enquiryFormValues = getState().form.EnquiryFormValues.values;

        const startCityId = getState().EnquiryReducer.startCity.value;
        const endCityId = getState().EnquiryReducer.endCity.value;

        // 当 始发城市，终到城市 都选择的时候，调用接口
        if (startCityId !== '' && endCityId !== '') {
            // 'http://stg.myxxjs.com:9101/api/route?routeStartId=101&routeEndId=102'
            const url = apiHost + '/api/route?routeStartId=' + startCityId + '&routeEndId=' + endCityId;
            const res = await httpUtil.httpGet(url);

            console.log('res is : ',res)
            if (res.success) {
                // dispatch({type: EnquiryActionType.getCityList, payload: res.result})
                // 有数据时，更新里程，清除画面提示文字
                if (res.result.length > 0) {
                    dispatch({type: EnquiryActionType.setErrorRouteFlg, payload: false})
                    dispatch({type: EnquiryActionType.setMileage, payload: res.result[0].distance})
                } else {
                    // 无数据时，更新里程，清除画面提示文字
                    dispatch({type: EnquiryActionType.setErrorRouteFlg, payload: true})
                    dispatch({type: EnquiryActionType.setMileage, payload: 0})
                }
            } else {
                swal({
                    type: 'warning',
                    title: '错误',
                    text: '获取城市信息失败'
                })
            }
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

/**
 * 设定画面预计运费结果。
 */
export const calculateFreight = () => async (dispatch, getState) => {
    // 里程
    const mileage = getState().EnquiryReducer.mileage.value;
    // 服务方式
    const serviceMode = getState().EnquiryReducer.serviceMode.value;
    // 车型
    const carModel = getState().EnquiryReducer.carModel.value;
    // 是否新车
    const carFlag = getState().EnquiryReducer.carFlag.value;
    // 估值
    const valuation = getState().EnquiryReducer.valuation;

    console.log('mileage',mileage)
    console.log('serviceMode',serviceMode)
    console.log('carModel',carModel)
    console.log('carFlag',carFlag)
    console.log('valuation',valuation)

    let freight = 0;
    if (mileage !== '' && serviceMode !== ''  && carModel !== '' && carFlag !== ''&& valuation !== '') {
        freight = 9990;

    }
    // 计算公式暂无

    // 暂定公式：里程 * 里程单价(暂定 1.2 元) * 车型系数（标准SUV：1.0 ，标准轿车：0.9，大型SUV：1.1，标准商务车：1.1，大型商务车：1.2）* 是否新车系数(新车：1.0，旧车：0.8) * 估值的0.5%  + 服务方式费用(自提：0，指定地点：500)


    dispatch({type: EnquiryActionType.setFreight, payload: freight})
};

