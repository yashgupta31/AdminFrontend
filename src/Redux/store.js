import {combineReducers, legacy_createStore, applyMiddleware} from 'redux'
import authReducer from './Reducers/AuthReducer'
import { thunk } from 'redux-thunk'
import appointmentReducer from './Reducers/appointmentReducer'

const rootReducer= combineReducers({
    auth: authReducer,
    appointments: appointmentReducer
    // Add other reducers if necessary
})

const store= legacy_createStore(rootReducer, applyMiddleware(thunk))
export default store;