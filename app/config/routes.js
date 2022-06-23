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
                    }else if(route.name === 'MyProfile'){
                        iconName = "person"
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
            <Tabs.Screen name="MyProfile" component={UserAuth} />
        </Tabs.Navigator>
    )
}

const HomeStack = () => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="MyProfile" component={UserAuth} />
            
        </Stack.Navigator>
    )
}

//now handling the admin
const AdminStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AdminAuth" component={AdminAuth} />
            <Stack.Screen name="Admin" component={Admin} />
            {/* <Stack.Screen name="MyProfile" component={UserAuth} /> */}
            
        </Stack.Navigator> 
    )
}

// const UserStack = () => {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="UserAuth" component={UserAuth} />
//             {/* <Stack.Screen name="MyProfile" component={UserAuth} /> */}
            
//         </Stack.Navigator> 
//     )
// }
//now the wallet stack
const WalletStack = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name="Dashboard" navigation={navigation} component={Dashboard}  />
            <Stack.Screen  name="Deposit" component={DepositWallet}  />
            <Stack.Screen  name="MobileMoney" component={MobileMoney}  />
            <Stack.Screen  name="BankDeposit" component={BankDeposit}  />
            <Stack.Screen  name="Transactions" component={Transactions}  />
            <Stack.Screen options={{headerShown:false}} name="Statistics" component={Statistics}  />
            <Stack.Screen options={{headerShown:false}} name="AddCard" component={AddCard}  />
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
                <Stack.Screen  name="AdminStack" component={AdminStack} />
                <Stack.Screen  name="UserAuth" component={UserAuth} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

// const Navigator = () => {
//     return(
//         <NavigationContainer>
//           <Stack.Navigator screenOptions={{headerShown:false}} >
//             <Stack.Screen name='Welcome' component={Welcome} />
//             <Stack.Screen name ='Home' component={Home} />
//           </Stack.Navigator>
//         </NavigationContainer>
//     );
// } 


export default Navigator;