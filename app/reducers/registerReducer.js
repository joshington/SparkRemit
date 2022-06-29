import {
    REGISTER_START,REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_START,
    LOGIN_SUCCESS,LOGIN_FAIL
} from '../actions/actionTypes';

const INITIAL_STATE = {
    registerStart:false,
    registered:false,
    regUserDetails:{},
    loginStart:false,
    logEmail:"",
    loggedIn:false,
    regFailed:false,
    logFailed:false
    
}

const userReducer = (state=INITIAL_STATE,action) => {
    switch(action.type){
        case "REGISTER_START":
            return {
                ...state,
                registerStart:true
            }
        case "REGISTER_SUCCESS":
            return{
                ...state,
                registered:true,
                regUserDetails:action.payload,
            }
        case "REGISTER_FAIL":
            return {
                ...state,
                registered:false,
                regFailed:true
            }

        case "LOGIN_START":
            return {
                ...state,
                loginStart:true
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                loggedIn:true,
                logEmail:payload.email     //helps us get the email from the payload
            }
        case "LOGIN_FAIL":
            return {
                ...state,
                loggedIn:false,
                logFailed:true
            }
        default:
            return state
    }
}

export default userReducer;