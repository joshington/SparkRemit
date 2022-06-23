import {combineReducers} from 'redux';
import userReducer from './registerReducer';
import walletReducer from './walletReducer';

const rootReducer = combineReducers({
    regDetails:userReducer,
    wallet:walletReducer
})

export default rootReducer;