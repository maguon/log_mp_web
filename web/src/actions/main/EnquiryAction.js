import {EnquiryActionType} from "../../actionTypes";
// import { reset } from'redux-form'
// export const enquiry = () => async (dispatch) => {
//     try {
//
//         console.log('enquiry innser');
//         dispatch({type: EnquiryActionType.enquiryModal, payload: true})
//
//     } catch (err) {
//         // alert message
//         swal({
//             type: 'error',
//             title: '系统异常',
//             text: '服务器内部错误!'
//         })
//     }
// };

export const openModal = () => async (dispatch) => {
    console.log('enquiry open');
    dispatch({type: EnquiryActionType.enquiryModal, payload: true})
};

export const closeModal = () => async (dispatch) => {
    console.log('enquiry close');
    dispatch({type: EnquiryActionType.enquiryModal, payload: false})
     // dispatch(reset('enquiryForm'))
};

export const calculateFreight = (value) => async (dispatch) => {
    console.log('enquiry calculateFreight dispatch ');
    console.log(value);
    dispatch({type: EnquiryActionType.enquiryFreight, payload: value})
};