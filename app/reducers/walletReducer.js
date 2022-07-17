import { STORE_EMAIL,GET_WALLET_SUCCESS,
    GET_WALLET_FAIL,GET_TRANSACTIONS_SUCCESS,GET_TRANSACTIONS_FAIL,
    GET_SPARK_USERS_SUCCESS,GET_SPARK_USERS_FAIL,STORE_SPARK_USER,STORE_NON_SPARK,STORE_COMMAND,

 } from "../actions/actionTypes";


const INITIAL_STATE = {
    user_email:"",
    wallet_details:{},
    error:null,
    last7:{},
    sparkUsers:{}, //since its a list
    user:"",
    receiver_phone:"",
    country:"",
    amount:"",
    spark_user:true,
    user_analytics:{}
}


const walletReducer = (state=INITIAL_STATE,action) => {
    switch(action.type){
        case  "STORE_COMMMAND":
            return {
                ...state,
                spark_user:action.spark_user
            }
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
        case "STORE_NON_SPARK":
            return {
                ...state,
                receiver_phone:action.receiver_phone,
                country:action.country,
                amount:action.amount,

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
        case "GET_ADMIN_SUCCESS":
            return {
                ...state,
                user_analytics:action.payload
            }
        case "GET_ADMIN_FAIL":
            return {
                ...state,
                error:action.payload
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