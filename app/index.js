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

import store from './store'

export default () => (
    <Provider store={store}>
        <Navigator  />
    </Provider>
)