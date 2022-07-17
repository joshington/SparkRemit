import React, {Component,useState,useEffect} from 'react'
import {MaterialCommunityIcons,AntDesign} from '@expo/vector-icons'
import {View,Text,TextInput,StatusBar,TouchableOpacity,ActivityIndicator} from 'react-native';
import LoginTextInput from '../components/LoginTextInput/LoginTextInput';
// import PhoneInput from "react-native-phone-number-input";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { useSelector,useDispatch } from 'react-redux';
import { ToastAndroid } from 'react-native-web';
import axios from 'axios'

const LabelInput = ({label,placeText,keyboard,secure,onChangeText,value}) => {
    return (
        <View style={{marginHorizontal:wp('6%')}}>
            <Text style={{fontSize:20,color:"green",textAlign:"center"}}>{label}</Text>
            <TextInput
                placeholder={placeText}
                style={{display:"flex",
                // textAlign:"center",
                    paddingHorizontal:wp('3%'),textAlign:"center",
                    height:50,width:wp('90%'),borderRadius:wp('5%'),borderWidth:wp('0.5%'),
                    width:wp('50%')
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


const WithdrawAmount = ({route,navigation}) => {

    const email = useSelector(state => state.wallet.user_email)

    const [amount, setAmount] = useState(1000);

    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const [details, setDetails] = useState({});
    handleChangeAmount = (amount) => {
        setAmount(amount)
    }

    const fetchUserDetails = () => {
        
            fetch(`https://pregcare.pythonanywhere.com/api/wallet/wallet_details/?email=${email}`)
            .then(response => response.json())
            .then(data => {
                if(data.status === true){
                    console.log(data)
                    setDetails(data);
                }
            }).catch(error => {
                console.log(error)
            })
            
            
            // .then(response => response.json());
            // .then(data => {

            // })
            // setDetails(data);
            // // console.log(details);//getting the details
            
        
    }

    useEffect(() => {
        //==its better to handle this when the cpt mounts=====

        fetchUserDetails()
        return () => {
            setSubmitting(false);
            setMessage("")
            setSuccess(false);
            setFail(false);
        }
    }, []);
        const {balance,owner,phone} = details
        return (
            <View style={{padding:hp('3%')}}>
            <StatusBar translucent={false} barStyle="light-content"/>
            <View style={{alignItems:"center",marginTop:hp('6%')}}>
                <Text style={{textAlign:"center",marginBottom:hp('7%'),color:"green",fontWeight:"bold"}}>MOBILE MONEY NUMBER</Text>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:20,marginBottom:hp('3%'),textAlign:"center"}}>{phone}</Text>
                </View>
                <Text style={{fontSize:14,marginTop:10,color:"green",fontWeight:"bold"}}>AMOUNT TO WITHDRAW FROM WALLET</Text>
                <View style={{flexDirection:"row",marginTop:hp('1%'),alignItems:"flex-end"}}>
                    <Text style={{textAlign:"right",fontSize:20}}>UGX:</Text>
                    <LabelInput 
                       
                        placeText="e.g 3000"
                        value={amount}
                        onChangeText={handleChangeAmount}
                        keyboard="numeric"
                    />
                </View>
                <Text style={{fontSize:15,textAlign:"right",color:"red",fontWeight:"bold"}}>Balance: {balance}</Text>
                {/* <Text style={{fontSize:15,textAlign:"right"}}>Min 2000 & Max 1,000,000</Text> */}
                
                <TouchableOpacity style={{borderRadius:wp('5%'),backgroundColor:"#20B2AA",
                    width:wp('80%'),height:hp('7%'),alignItems:"center",alignSelf:"center",marginTop:40,
                }} 
                    onPress={() => {
                       
                        setSubmitting(true)
                        axios.post(`https://pregcare.pythonanywhere.com/api/wallet/withdraw/?email=${email}&amount=${amount}`,{
                                method:'POST',
                               
                                headers:{'Content-type': 'application/json;',}
                            })
                            .then((response) => {
                                console.log(response.data)
                                setSubmitting(false)
                                setMessage(response.data.message)
                            }).catch(error => {
                                setSubmitting(false);
                                setFail(true)
                            })   
                    }}
                >
                    <Text style={{fontSize:22,fontWeight:"bold",marginTop:hp('2%'),
                      textAlign:"center",color:"white"}}>
                        Confirm Withdraw</Text>
                </TouchableOpacity>
                <Text style={{textAlign:"center"}}>
                    {
                        submitting 
                        ? (
                            <ActivityIndicator size="large" color="green" 
                                style={{marginTop:10,fontWeight:"bold"}}   
                            />
                        ):<Text style={{marginTop:hp('3%'),fontSize:20}}>{message}</Text>
                    }
                </Text>
            </View>
            
            </View>
        )
}

export default WithdrawAmount;