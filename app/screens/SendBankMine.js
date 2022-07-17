import React,{useEffect, useState} from 'react';
import {View,Text,TouchableOpacity,StatusBar,TextInput,StyleSheet,FlatList,ActivityIndicator} from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Toast from "react-native-simple-toast";
import { Picker } from "@react-native-picker/picker";
import PropTypes from 'prop-types'

import { useDispatch,useSelector } from 'react-redux';
import {all_spark_users,storeSparkUser,check_text} from '../actions';
import axios from 'axios';
import Separator from '../components/Separator';

const LabelInput = ({label,placeText,keyboard,secure,onChangeText,value}) => {
    return (
        <View style={{marginHorizontal:wp('5%'),marginBottom:hp('3%'),alignSelf:"center"}}>
            <Text style={{fontSize:20,color:"green"}}>{label}</Text>
            <TextInput
                placeholder={placeText}
                style={{display:"flex",
                // textAlign:"center",
                    paddingHorizontal:wp('3%'),
                    height:50,width:wp('80%'),
                    borderRadius:wp('5%'),borderWidth:wp('0.5%'),
                    textAlign:"center"
                }}
                keyboardType={keyboard}
                secureTextEntry={secure ? true : false}
                onChangeText={onChangeText}
                value={value}
                autoFocus={true}
              
            />
            
        </View>
    )
}

const SendBankMine = ({route,navigation}) => {

    const [amount, setAmount] = useState(0);

    const [submitting, setSubmitting] = useState(false);

    handleAmount = (amount) => {
        setAmount(amount);
    }

    const email = useSelector(state => state.wallet.user_email)
    console.log(email)
    return (
        <View>
            <View
                style={{ backgroundColor:"green",borderBottomLeftRadius:30,
                borderBottomRightRadius:30,height:hp('15%'),paddingHorizontal:wp('5%'),alignItems:"center"}}
            >
                <Text style={{fontSize:20,marginTop:hp('7%'),color:"white",fontWeight:"bold"}}>Withdraw</Text>
            </View>
            <View style={{marginTop:hp('5%')}}>
                <LabelInput 
                    label="Amount to withdraw"
                    placeText="E.g 20000"
                    onChangeText={handleAmount}
                    value={amount}
                    
                />
            </View>
            <View style={{padding:hp('5%'),width:wp('80%'),marginHorizontal:wp('6%')}}>
                <Text style={{fontSize:20}}>You are attempting to withdraw <Text style={{color:"green",fontWeight:"bold"}}>{amount}</Text> from your wallet</Text>
            </View>
            <TouchableOpacity style={{height:hp('5%'),marginTop:hp('6%'),
                backgroundColor:"green",width:wp('70%'),alignSelf:"center",borderRadius:hp('5%')}}>
                <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20,color:"white",padding:hp('1%')}}
                onPress={
                    () => {
                        setSubmitting(true);
                        axios.post(`https://pregcare.pythonanywhere.com/api/wallet/self-withdraw/?email=${email}}&amount=${amount}`,{
                            method:'POST',
                           
                            headers:{'Content-type': 'application/json;',}
                        })
                        .then((response) => {
                            if(response.data.status === true){
                                setSubmitting(false)
                                Toast.show(response.data.message)
                                navigation.navigate("Dashboard")
                            }else{
                                setSubmitting(false)
                                Toast.show(response.data.message)
                            }
                        }).catch(error => {
                            setSubmitting(false);
                            Toast.show(response.data.message)
                        })

                    }
                }
            >
                    Confirm
                </Text>
            </TouchableOpacity>
            <Text style={{textAlign:"center"}}>
                    {
                        submitting 
                        ? (
                            <ActivityIndicator size="large" color="green" 
                                style={{marginTop:10,fontWeight:"bold"}}   
                            />
                        ):<Text style={{marginTop:hp('3%'),fontSize:20}}></Text>
                    }
            </Text>
        </View>
    )
}

export default SendBankMine;