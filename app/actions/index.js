import { 
    REGISTER_START,REGISTER_SUCCESS,REGISTER_FAIL,
    LOGIN_START,LOGIN_SUCCESS,LOGIN_FAIL,STORE_EMAIL,WALLET_TOP_SUCCESS,WALLET_TOP_FAIL,STORE_REG_EMAIL,

    GET_WALLET_SUCCESS,GET_WALLET_FAIL,
    GET_TRANSACTIONS_SUCCESS,GET_TRANSACTIONS_FAIL


} from "./actionTypes"
import axios from 'axios';

//==task is to fetch the transactions of the 
export const getTransactions = (user_email) => {
    return (dispatch) => {
        axios.get(`https://pregcare.pythonanywhere.com/api/wallet/last7/?email=${user_email}`)
        .then(response => {
            dispatch({
                type:GET_TRANSACTIONS_SUCCESS,
                payload:response.data
            })  
        }).catch(error => {
            dispatch({
                type:GET_TRANSACTIONS_FAIL,
                payload:error.payload
            })
        })
    }
}




export const getWalletDetails = (user_email) => {
    return (dispatch) => {
        axios.get(`https://pregcare.pythonanywhere.com/api/wallet/wallet_details/?email=${user_email}`)
        .then(response => {
            dispatch({
                type:GET_WALLET_SUCCESS,
                payload:response.data
            })  
        }).catch(error => {
            dispatch({
                type:GET_WALLET_FAIL,
                payload:error.payload
            })
        })
    }
}


//action is to store email in state 


export const storeEmail = (user_email) => {
    return {
        type:STORE_EMAIL,
        user_email
    }
}

export const storeRegEmail = (user_email) => {
    return {
        type:STORE_REG_EMAIL,
        user_email
    }
}

//===action is to make a successful topup to the wallet

export const walletTopUp = (user_email,amount) => {
    return(dispatch) => {
        console.log('=====starting topup=====')
        axios.post(`https://pregcare.pythonanywhere.com/api/wallet/wallet_topup_success/?email=${user_email}&amount=${amount}`)
        .then(response => {
            dispatch({
                type:WALLET_TOP_SUCCESS,
                payload:response.data
            })
        }).catch(error => {
            dispatch({
                type:WALLET_TOP_FAIL,
                payload:error
            })
        })
    }
}



//==action for reffgistering user====
export const registerUser = ({username,email,phone,password}) => {
    return (dispatch) => {
        dispatch({
            type:REGISTER_START
        })
        console.log('registering the user now')

        fetch('http://localhost:8000/api/auth/register',{
            method:'POST',
            body:JSON.stringify({username,email,phone,password}),
            headers:{
                'Content-type': 'application/json;',
            }
        }).then(response => {
            dispatch({
                type:REGISTER_SUCCESS,
                payload:response.data
            })
            console.log('registered')
        }).catch(error => {
            console.log('didnt register')
            dispatch({
                type:REGISTER_FAIL,
                error:error.message
            }) 
        })
    }
}

export const loginUser = ({email,password}) => {
    return (dispatch) => {
        dispatch({
            type:LOGIN_START
        })
        console.log('logging the user now')

        fetch('http://localhost:8000/api/auth/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(response => {
            dispatch({
                type:LOGIN_SUCCESS,
                payload:response.data
            })
            console.log('logged in====')
        }).catch(error => {
            console.log('didnt login')
            dispatch({
                type:LOGIN_FAIL,
                error:error.message
            }) 
        })
    }
}
