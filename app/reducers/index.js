import {combineReducers} from 'redux';
import userReducer from './registerReducer';
import walletReducer from './walletReducer';

const rootReducer = combineReducers({
    register:userReducer,
    wallet:walletReducer
})

export default rootReducer;