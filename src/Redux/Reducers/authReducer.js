// import {ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE} from './authReducer'
import { ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE, LOGOUT } from "../Actions/authActions";

const initialState={
    token: null, 
    userData: null, 
    isAuthenticated: false,
    error: null,
    loading: false,
}

const authReducer=(state= initialState, action)=>{
    switch(action.type){
        case ADMIN_LOGIN_REQUEST:
            return {...state, loading: true}
        case ADMIN_LOGIN_SUCCESS:
            return {...state, token: action.payload.token, userData: action.payload.userData, loading: false, isAuthenticated: true}
        case LOGOUT:
            return {...state, token: null, userData: null, isAuthenticated: false}
        case ADMIN_LOGIN_FAILURE:
            return {...state, error: action.payload, isAuthenticated: false}
        default:
            return state;
    }
}

export default authReducer;