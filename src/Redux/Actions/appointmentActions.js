import axios from "axios";
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL;

export const GET_APPOINTMENTS= 'GET_APPOINTMENTS';
export const CONFIRM_APPOINTMENT= 'CONFIRM_APPOINTMENT';
export const CANCEL_APPOINTMENT= 'CANCEL_APPOINTMENT';

const fetchAppointments=(appointments)=>({
    type: GET_APPOINTMENTS,
    payload: appointments
})

export const getAppointments= ()=> async(dispatch)=>{
    try {
        const response= await axios.get(`${BACKEND_URL}/appointment/all-appointments`);
        dispatch(fetchAppointments(response.data.appointments))
        // console.log(response.data.appointments)
    } catch (error) {
        console.log(error.message)
    }
}


export const confirmAppointment=(appointmentId)=> async(dispatch)=>{
try {
    const response= await axios.patch(`${BACKEND_URL}/appointment/confirm/${appointmentId}`);
    alert(response.data.message)
    dispatch({
        type: CONFIRM_APPOINTMENT,
        payload: {id: appointmentId, status: 'Confirmed'}
    })
} catch (error) {
    alert(error.message)
    
}
}

export const cancelAppointment=(appointmentId)=> async(dispatch)=>{
    try {
        const response= await axios.patch(`${BACKEND_URL}/appointment/cancel/${appointmentId}`);
        alert(response.data.message)
        dispatch({
            type: CANCEL_APPOINTMENT,
            payload: {id: appointmentId, status: 'Cancelled'}
        })
    } catch (error) {
        alert(error.message)
    }
}