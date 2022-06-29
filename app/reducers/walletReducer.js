import { STORE_EMAIL,GET_WALLET_SUCCESS,
    GET_WALLET_FAIL,GET_TRANSACTIONS_SUCCESS,GET_TRANSACTIONS_FAIL,
    GET_SPARK_USERS_SUCCESS,GET_SPARK_USERS_FAIL,STORE_SPARK_USER
 } from "../actions/actionTypes";


const INITIAL_STATE = {
    user_email:"",
    wallet_details:{},
    error:null,
    last7:{},
    sparkUsers:{}, //since its a list
    user:"",
}


const walletReducer = (state=INITIAL_STATE,action) => {
    switch(action.type){
        case  "GET_SPARK_USERS_SUCCESS":
            return {
                ...state,
                sparkUsers:action.payload
            }
        case "GET_SPARK_USERS_FAIL":
            return {
                ...state,
                error:action.payload
            }
        case "STORE_SPARK_USER":
            return {
                ...state,
                user:action.user
            }
        case "STORE_EMAIL":
            return {
                ...state,
                user_email:action.user_email
            }
        case "STORE_REG_EMAIL":
            return {
                ...state,
                user_email:action.user_email
            }
        case "GET_WALLET_SUCCESS":
            return {
                ...state,
                wallet_details:action.payload
            }
        case "GET_WALLET_FAIL":
            return {
                ...state,
                error:action.payload
            }
        case "GET_TRANSACTIONS_SUCCESS":
            return {
                ...state,
                last7:action.payload
            }
        case "GET_TRANSACTIONS_FAIL":
            return {
                ...state,
                error:action.payload
            }

        default:
            return state

    }
}

export default walletReducer;