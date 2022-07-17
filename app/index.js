import React from "react";
import {Provider} from 'react-redux';

import Navigator from './config/routes';
import Welcome from "./screens/Welcome";
import Dashboard from './screens/Dashboard'
import { Home } from "./screens";
import Transactions from "./screens/Transactions";
import Statistics from "./screens/Statistics";
import AddCard from "./screens/AddCard";
import Transfer from "./screens/Transfer";
import UserAuth from './screens/UserAuth'
import EmailAndNumber from "./screens/EmailAndNumber";
import VerifyEmail from "./screens/VerifyEmail";
import SparkPin from "./screens/SparkPin";
import SparkUsername from "./screens/SparkUsername";
import MyProfile from "./screens/MyProfile";
import SendMoney from "./screens/Send";
import AdminDash from './screens/AdminDash'
import AdminProfile from './screens/AdminProfile';
import AdminRegister from "./screens/AdminRegister";
import SendNonUser from "./screens/SendToNonUser";
import CheckPin from "./screens/CheckPin";
import SendBankNon from "./screens/SendBankNon"
import store from './store'
import WithdrawAmount from "./screens/WithdrawAmount";
import SendBankMine from "./screens/SendBankMine";
import SelfMthd from "./screens/SelfMthd";


export default () => (
    // <AddCard />
    <Provider store={store}>
        <Navigator  />
    </Provider>
)