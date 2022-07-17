import { 
    REGISTER_START,REGISTER_SUCCESS,REGISTER_FAIL,
    LOGIN_START,LOGIN_SUCCESS,LOGIN_FAIL,STORE_EMAIL,WALLET_TOP_SUCCESS,WALLET_TOP_FAIL,STORE_REG_EMAIL,

    GET_WALLET_SUCCESS,GET_WALLET_FAIL,
    GET_TRANSACTIONS_SUCCESS,GET_TRANSACTIONS_FAIL,
    GET_SPARK_USERS_SUCCESS,GET_SPARK_USERS_FAIL,STORE_SPARK_USER,
    STORE_NON_SPARK,STORE_COMMAND,GET_ADMIN_SUCCESS,GET_ADMIN_FAIL


} from "./actionTypes"
import axios from 'axios';


export const checkCommand = (spark_user) => {
    return {
        type:STORE_COMMAND,
        spark_user
    }
}


export const check_text = (uname) => {
    console.log('hey there')
}


//====dispatch all users that start with the username when trying to type
export const all_spark_users = (uname) => {
    return (dispatch) => {
        axios.get(`https://pregcare.pythonanywhere.com/api/wallet/wallet_users/?uname=${uname}`)
        .then(response => {
            dispatch({
                type:GET_SPARK_USERS_SUCCESS,
                payload:response.data
            }).catch(error => {
                dispatch({
                    type:GET_SPARK_USERS_FAIL,
                    payload:error.payload
                })
            })
        })
    }
}


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

export const getAdminDetails = () => {
    return (dispatch) => {
        axios.get('https://pregcare.pythonanywhere.com/api/auth/user-analytics/')
        .then(response => {
            dispatch({
                type:GET_ADMIN_SUCCESS,
                payload:response.data
            })  
        }).catch(error => {
            dispatch({
                type:GET_ADMIN_FAIL,
                payload:error.payload
            })
        })
    }
}





//we are going to ue this action when storing the spark user
export const storeSparkUser = (user) => {
    return{
        type:STORE_SPARK_USER,
        user
    }
}
//action is to store email in state 


export const storeNonSpark = (receiver_phone, country,amount) => {
    return {
        type:STORE_NON_SPARK,
        receiver_phone,
        country,
        amount
    }
}

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
        fetch(`https://pregcare.pythonanywhere.com/api/wallet/wallet_topup_success/?email=${user_email}&amount=${amount}`,{
            method:'POST',
            headers:{'Content-type': 'application/json;',}
        })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type:WALLET_TOP_SUCCESS,
                payload:data
            })
        }).catch(error => {
            dispatch({
                type:WALLET_TOP_FAIL,
                payload:error
            })
        })
    }
}

//==action to login user through their pin=====
export const loginUser = (PIN) => {
    return (dispatch) => {
        dispatch({
            type:LOGIN_START
        })
        console.log('logging the user now')
        axios.post(`https://pregcare.pythonanywhere.com/api/auth/login-user/?PIN=${PIN}`)
        .then(response => {
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


//==action for reffgistering user====
export const registerUser = (email,phone) => {
    return (dispatch) => {
        dispatch({
            type:REGISTER_START
        })
        console.log('registering the user now')

        fetch('https://pregcare.pythonanywhere.com/api/auth/register',{
            method:'POST',
            body:JSON.stringify({email,phone}),
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



