import React, {Component} from 'react'
import {MaterialCommunityIcons,AntDesign} from '@expo/vector-icons'
import {Flag} from 'react-native-svg-flagkit'
import {View,Text,TextInput,StatusBar,TouchableOpacity} from 'react-native';
import LoginTextInput from '../components/LoginTextInput/LoginTextInput';
// import PhoneInput from "react-native-phone-number-input";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const WithdrawAmount = ({route,navigation}) => {
        return (
            <View style={{padding:hp('3%')}}>
            <StatusBar translucent={false} barStyle="light-content"/>
            <View style={{alignItems:"center",marginTop:hp('6%')}}>
                <Text style={{textAlign:"center",marginBottom:hp('7%')}}>MOBILE MONEY NUMBER</Text>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:20,marginBottom:hp('3%'),textAlign:"center"}}>+256773943826</Text>
                </View>
                <Text style={{fontSize:14,marginTop:10}}>AMOUNT TO WITHDRAW FROM WALLET</Text>
                <View style={{flexDirection:"row",marginTop:40,alignItems:"flex-end"}}>
                    <Text style={{textAlign:"right",fontSize:20,marginRight:50}}>UGX:</Text>
                    <TextInput 
                        editable={true}
                        // value={value}
                        // onChangeText={text => onChangeAmount(text)}
                        placeholder="E.g 10,000"
                        placeholderTextColor="#000"
                        underlineColorAndroid="#000"
                        width={150}
                        height={35}
                        textAlign="center"
                        keyboardType="numeric"
                        autoFocus={true}
                    />
                </View>
                <Text style={{fontSize:15,textAlign:"right",color:"red",fontWeight:"bold"}}>Balance: UGX 100,000</Text>
                <Text style={{fontSize:15,textAlign:"right"}}>Min 2000 & Max 1,000,000</Text>
                
                <TouchableOpacity style={{borderRadius:wp('5%'),backgroundColor:"#20B2AA",
                    width:wp('80%'),height:hp('7%'),alignItems:"center",alignSelf:"center",marginTop:40,
                }} 
                    onPress={() => navigation.navigate('MyWallet')}
                >
                    <Text style={{fontSize:22,fontWeight:"bold",textAlign:"center",color:"white"}}>Confirm Withdraw</Text>
                </TouchableOpacity>
            </View>
            
            </View>
        )
}

export default WithdrawAmount;