import { APPOINTMENT_REQUEST, CANCEL_APPOINTMENT, CONFIRM_APPOINTMENT, GET_APPOINTMENTS, GET_TODAYS_APPOINTMENTS } from '../Actions/appointmentActions'

let initialState={
    appointments: [],
    todaysAppointments: [],
    loading: false
}

const appointmentReducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_APPOINTMENTS:
            return {...state, appointments: action.payload, loading: false}
        case GET_TODAYS_APPOINTMENTS:
            return {...state, todaysAppointments: action.payload, loading: false}
        case CONFIRM_APPOINTMENT:
        case CANCEL_APPOINTMENT:
            return {...state, appointments: state.appointments.map((appointment)=>
                appointment._id=== action.payload.id? 
                {...appointment, status: action.payload.status}
                : appointment
            )}
        case APPOINTMENT_REQUEST:
            return {...state, loading: true}
        default:
            return state
    }

    

}

export default appointmentReducer;