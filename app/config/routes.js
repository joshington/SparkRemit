import React from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';

//import {NavigationContainer,DefaultTheme,DarkTheme, useTheme} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


import {NavigationContainer,DefaultTheme,DarkTheme, useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


//import Welcome from '../screens/Welcome';
import Admin  from '../screens/Admin';
import AdminAuth from '../screens/AdminAuth';
import BankDeposit from '../screens/BankDeposit';
import DepositWallet from '../screens/DepositWallet';
import MobileMoney from '../screens/MobileMoney';
import MyWallet from '../screens/MyWallet';
// import SendToAnother from '../screens/SendToAnother';
import UserAuth from '../screens/UserAuth';
// import WithdrawAmount from '../screens/WithdrawAmount'
import { Ionicons } from '@expo/vector-icons';
//import MobileMoney from '../screens/MobileMoney';

// import {NavigationContainer} from '@react-navigation/native'
//import {createNativeStackNavigator} from '@react-navigation/native-stack'
// import {createStackNavigator} from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Transactions from '../screens/Transactions';
import Welcome from '../screens/Welcome2'
import Home from '../screens/Home';
import Dashboard from '../screens/Dashboard'
import Statistics from '../screens/Statistics';
// const Stack = createStackNavigator();
import AddCard from '../screens/AddCard';
import EmailAndNumber from '../screens/EmailAndNumber';
import VerifyEmail from '../screens/VerifyEmail';
import SparkPin from '../screens/SparkPin';
import SparkUsername from '../screens/SparkUsername';
import MyProfile from '../screens/MyProfile';
import SendMoney from '../screens/Send';
import Login from '../screens/Login';
import ForgotPin from '../screens/ForgotPin';
import FinalSend from '../screens/FinalSend';
import AdminProfile from '../screens/AdminProfile';
import AdminDash from '../screens/AdminDash'
import AdminRegister from '../screens/AdminRegister';
import SendNonUser from '../screens/SendToNonUser';
import CheckPin from '../screens/CheckPin';
import WithdrawAmount from '../screens/WithdrawAmount'
import CheckNon from '../screens/CheckNon';
import ChooseMethod from '../screens/ChooseMthd';
import SendBankNon from '../screens/SendBankNon';
import SendBankMine from '../screens/SendBankMine';
import SelfMthd from '../screens/SelfMthd';
import UserSettings from '../screens/UserSettings';
import VirtualAct from '../screens/VirtualAct';
import AddAccount from '../screens/AddAccount';


const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const RootHome = () => {
    return (
        <Tabs.Navigator
            screenOptions={({route}) => ({
                tabBarIcon:({color}) => {
                    let iconName;
                    if(route.name === 'Home'){
                        iconName = "home";
                    }else if(route.name === 'Wallet'){
                        iconName = "wallet"
                    }
                    return (
                        <Ionicons name={iconName} size={32} color="black" />
                    )
                },
            })}
            tabBarOptions={{
                activeTintColor:"#20B2AA",
                inactiveTintColor: 'black',
            }}
        >
            <Tabs.Screen 
                name="Home" 
                component={HomeStack} 
                options={{
                    tabBarStyle:{display:'none'}
                }}
            />
            <Tabs.Screen  name="Dashboard" component={WalletStack} />
            {/* <Tabs.Screen name="MyProfile" component={UserAuth} /> */}
        </Tabs.Navigator>
    )
}

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name="Welcome" component={Welcome} />
            <Stack.Screen options={{headerShown:false}}  name="Register" component={EmailAndNumber} />
            <Stack.Screen  options={{headerShown:false}} name="Login" component={Login} />
            <Stack.Screen   options={{headerShown:false}} name="ForgotPin" component={ForgotPin} />
            <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
            <Stack.Screen name="SparkPin" component={SparkPin} />
            <Stack.Screen options={{headerShown:false}} name="SparkUsername" component={SparkUsername} />
            <Stack.Screen options={{headerShown:false}} name="Dashboard" component={Dashboard} />
            <Stack.Screen  name="MyProfile" component={MyProfile}  />
            <Stack.Screen  name="AddCard" component={AddCard}  />
            <Stack.Screen  name="SendMoney" component={SendMoney}  />
            <Stack.Screen  name="FinalSend" component={FinalSend}  />
            <Stack.Screen  name="MobileMoney" component={MobileMoney}  />
            <Stack.Screen  options={{headerShown:false}} name="AdminDash" component={AdminDash}  />
            <Stack.Screen  name="AdminProfile" component={AdminProfile}  />
            <Stack.Screen options={{headerShown:false}}  name="AdminRegister" component={AdminRegister}  />
            <Stack.Screen  name="SendNonUser" component={SendNonUser}  />
            <Stack.Screen  options={{headerShown:false}} name="CheckPin" component={CheckPin}  />
            <Stack.Screen   name="WithdrawAmount" component={WithdrawAmount}  />
            <Stack.Screen   options={{headerShown:false}} name="CheckNon" component={CheckNon}  />
            <Stack.Screen   name="ChooseMethod" component={ChooseMethod}  />
            <Stack.Screen   name="SendBankNon" component={SendBankNon}  />
            <Stack.Screen   options={{headerShown:false}}  name="BankWithdraw" component={SendBankMine}  />
            <Stack.Screen   name="Method" component={SelfMthd}  />
            <Stack.Screen   name="UserSettings" component={UserSettings}  />
            <Stack.Screen  options={{headerShown:false}}  name="VirtualAccount" component={VirtualAct}  />
            <Stack.Screen  options={{headerShown:false}}  name="AddAccount" component={AddAccount}  />
            
        </Stack.Navigator>
    )
}


const WalletStack = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name="Dashboard" navigation={navigation} component={Dashboard}  />
            <Stack.Screen  name="MyProfile" component={MyProfile}  />
            <Stack.Screen  name="Deposit" component={DepositWallet}  />
            <Stack.Screen  name="MobileMoney" component={MobileMoney}  />
            <Stack.Screen  name="BankDeposit" component={BankDeposit}  />
            <Stack.Screen  name="Transactions" component={Transactions}  />
            <Stack.Screen options={{headerShown:false}} name="Statistics" component={Statistics}  />
          
            {/* <Stack.Screen  name="Send" component={SendToAnother}  /> */}
        </Stack.Navigator>
    )
}

const Navigator = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator headerMode="none">
                {/* <Stack.Screen  options={{headerShown:false}} name="rootHome" component={RootHome} /> */}
                <Stack.Screen  name="Home" component={HomeStack} />
                <Stack.Screen  name="Dashboard" component={WalletStack} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}




export default Navigator;