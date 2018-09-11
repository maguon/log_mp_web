import {EnquiryActionType} from "../../actionTypes";
import { reset } from'redux-form'
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
    console.log('open modal')
    dispatch(reset('enquiryForm'))
    $('.modal').modal(
        {
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            // opacity: .5, // Opacity of modal background
            // in_duration: 300, // Transition in duration
            // out_duration: 200, // Transition out duration
            // starting_top: '4%', // Starting top style attribute
            // ending_top: '10%', // Ending top style attribute
            // ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            //     alert("Ready");
            //     console.log(modal, trigger);
            // },
            // onCloseStart: function() { dispatch({type: EnquiryActionType.enquiryModal, payload: false}) },
            onCloseEnd: function() {
                $('#enquiryDiv').modal('destroy');

                console.log('close...........')
                console.log('aaaaaaaaaaa')
                // this.props.closeModal();

                // this.hiddenModal();
                //dispatch({type: EnquiryActionType.enquiryModal, payload: false})
            } // Callback for Modal close
        }
    );
    $('#enquiryDiv').modal('open');
};

export const closeModal = () => async (dispatch) => {
    console.log('closeModal............................. close ')
    // $('.modal').modal();
    // $('#enquiryDiv').modal('close');
    dispatch({type: EnquiryActionType.enquiryModal, payload: false})
     // dispatch(reset('enquiryForm'))
};

export const calculateFreight = (value) => async (dispatch) => {
    dispatch({type: EnquiryActionType.enquiryFreight, payload: value})
};