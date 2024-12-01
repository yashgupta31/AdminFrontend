import { CANCEL_APPOINTMENT, CONFIRM_APPOINTMENT, GET_APPOINTMENTS } from '../Actions/appointmentActions'

let initialState={
    appointments: []
}

const appointmentReducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_APPOINTMENTS:
            return {...state, appointments: action.payload}
        case CONFIRM_APPOINTMENT:
        case CANCEL_APPOINTMENT:
            return {...state, appointments: state.appointments.map((appointment)=>
                appointment._id=== action.payload.id? 
                {...appointment, status: action.payload.status}
                : appointment
            )}
        default:
            return state
    }

    

}

export default appointmentReducer;