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
        <View style={{marginHorizontal:wp('3%'),marginBottom:hp('3%'),alignSelf:"center"}}>
            <Text style={{fontSize:20,color:"green"}}>{label}</Text>
            <TextInput
                placeholder={placeText}
                style={{display:"flex",
                // textAlign:"center",
                    paddingHorizontal:wp('3%'),
                    height:50,width:wp('60%'),
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

const CountryPicker = ({ country, onValueChange }) => (
    <Picker
        selectedValue={country}
        style={{ height: 40, width: 200,marginHorizontal:wp('6%') }}
        onValueChange={onValueChange}
    >
        <Picker.Item label="Uganda" value="Uganda" />
        <Picker.Item label="Ghana" value="Ghana" />
        <Picker.Item label="UAE" value="UAE" />
        <Picker.Item label="Nigeria" value="Nigeria" />
       
    </Picker>
);

CountryPicker.propTypes = {
    country: PropTypes.string,
    onValueChange: PropTypes.func,
};


const CurrencyPicker = ({currency, onValueChange}) => (
    <Picker
        selectedValue={currency}
        style={{ height: 40, width: 200,marginHorizontal:wp('6%') }}
        onValueChange={onValueChange}
    >
        <Picker.Item label="UGX" value="UGX" />
        <Picker.Item label="GHS" value="GHS" />
        <Picker.Item label="AED" value="AED" />
        <Picker.Item label="NGN" value="NGN" />
    </Picker>
)
CurrencyPicker.propTypes = {
    currency: PropTypes.string,
    onValueChange: PropTypes.func,
};


const SendBankNon = ({navigation}) => {
    const [country, setCountry] = useState("Uganda")

    const [currency, setCurrency] = useState("UGX")

    const [account, setAccount] = useState("")
    const [name, setName] = useState("");

    const [amount, setAmount] = useState(0);
    const [bankcode, setBankCode] = useState("");


    const [submitting, setSubmitting] = useState(false);


    const handleBankCode = (bankcode) => {
        setBankCode(bankcode)
    }

    const handleAmount = (amount) => {
        setAmount(amount)
    }
    const handleAccount = (account) => {
        setAccount(account)
    }

    const handleName = (name) => {
        setName(name)
    }
   
    const handleChangeCountry = (country) => {
        setCountry(country)
    }
    const handleChangeCurrency = (currency) => {
        setCurrency(currency)
    }
    // handleAccount = (country) => {
    //     setCountry(country)
    // }

    //==get the email from the state====
    const email = useSelector(state => state.wallet.user_email)

    return (
        <View style={{marginTop:hp('4%')}}>
            <StatusBar translucent={false} barStyle="light-content"/>
            <LabelInput 
                label="Recipient Account Number"
                onChangeText={handleAccount}
                keyboard="numeric"
                value={account}
                placeText="E.g 04235678901"
            />
            <LabelInput 
                label="Amount to send"
                onChangeText={handleAmount}
                keyboard="numeric"
                value={amount}
                placeText="E.g 20000"
            />
            <LabelInput 
                label="Recipient name"
                onChangeText={handleName}
                value={name}
                placeText="E.g spark"
            />
            <LabelInput 
                label="Recipient Bank code"
                onChangeText={handleBankCode}
                keyboard="numeric"
                value={bankcode}
                placeText="E.g 0435"
            />
            <View style={{marginHorizontal:wp('10%'),flexDirection:"row",alignSelf:"center",
                justifyContent:"space-around",alignSelf:"center",marginTop:hp('8%')}}>
                <View>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>Recipient country</Text>
                    <CountryPicker 
                        country={country}
                        onValueChange={handleChangeCountry}
                    />
                </View>
                <View>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>Recipient currency</Text>
                    <CurrencyPicker 
                        currency={currency}
                        onValueChange={handleChangeCurrency}
                    />
                </View>
                
            </View>
            <TouchableOpacity style={{height:hp('5%'),marginTop:hp('3%'),
                backgroundColor:"green",width:wp('70%'),alignSelf:"center",borderRadius:hp('5%')}}
                
                onPress={() => {
                    setSubmitting(false)
                    axios.post(`https://pregcare.pythonanywhere.com/api/wallet/send-to-bankuser/?email=${email}&country=${country}&amount=${amount}&receiver_account_number=${account}&receiver_branch_code=${bankcode}&receiver_currency=${currency}&receiver_name=${name}`,{
                            method:'POST',
                           
                            headers:{'Content-type': 'application/json;',}
                        })
                        .then((response) => {
                            if(response.data.status === true){
                                setSubmitting(false)
                                Toast.show(response.data.message)
                            }else{
                                setSubmitting(false)
                                Toast.show(response.data.message)
                            }
                        }).catch(error => {
                            setSubmitting(false);
                            Toast.show(response.data.message)
                        })
                }}
            >
                <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20,color:"white",padding:hp('1%')}}>Send</Text>
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



export default SendBankNon;