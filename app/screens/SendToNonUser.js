import React,{useEffect, useState} from 'react';
import {View,Text,TouchableOpacity,TextInput,StyleSheet,FlatList,ActivityIndicator} from 'react-native'
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
        <View style={{marginHorizontal:wp('6%')}}>
            <Text style={{fontSize:20,color:"green",textAlign:"center"}}>{label}</Text>
            <TextInput
                placeholder={placeText}
                style={{display:"flex",
                    textAlign:"center",
                    paddingHorizontal:wp('3%'),
                    alignSelf:"center",
                    height:50,width:wp('60%'),borderRadius:wp('5%'),borderWidth:wp('0.5%')
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
        <Picker.Item label="Rwanda" value="Rwanda" />
        <Picker.Item label="Tanzania" value="Tanzania" />
        <Picker.Item label="Uganda" value="Uganda" />
        <Picker.Item label="Zambia" value="Zambia" />
        <Picker.Item label="Kenya" value="Kenya" />
        <Picker.Item label="Ghana" value="Ghana" />
        <Picker.Item label="Cameroon" value="Cameroon" />
        <Picker.Item label="Cote d'Ivoire" value="Cote d'Ivoire" />
       
    </Picker>
);

CountryPicker.propTypes = {
    country: PropTypes.string,
    onValueChange: PropTypes.func,
};

const SendNonUser = ({navigation}) => {
    const [phone, setPhone] = useState("")


    const [country, setCountry] = useState("Uganda");
    const [amount, setAmount] = useState(1000)


    handleChangeCountry = (country) => {
        setCountry(country)
    }


    handleChangePhone = (phone) => {
        setPhone(phone)
    }
    handleChangeAmount = (amount) => {
        setAmount(amount)
    }

    const email = useSelector(state => state.wallet.user_email)


    //==to help control listing the spark remit users
    const [searching, setSearching] = useState(false);



    //===for dispatcing actions=====
    // const dispatch = useDispatch()


    //====get the users from the reducer=====
    
    //==the above gets me all the spark users=====
    let counter = 1//==to help us list the users

    const check_text =(text) =>{
        console.log(text)
    }

    const [selected, setSelected] = useState(false);
    const [Data, setData] = useState([]);
   
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    
    
    

    const [recipient, setRecepient] = useState("");
    useEffect(() => {
        return () => {
            setSelected(false)
            setRecepient("");
            // 
        }
    }, []);
    return (
        <>
            
            <View style={{paddingVertical:hp('10%')}}>
                <LabelInput 
                    label="Receiver phone"
                    placeText="e.g 256786345637"
                    value={phone}
                    onChangeText={handleChangePhone}
                    keyboard="name-phone-pad"
                    
                />
                <View style={{alignSelf:"center",marginVertical:hp('5%')}}>
                    <Text style={{marginHorizontal:wp('6%'),fontSize:20,marginTop:hp('4%')}}>
                        Choose the country of recipient
                    </Text>
                    <CountryPicker
                        country={country}
                        onValueChange={handleChangeCountry}
                    />
                </View>
                <LabelInput 
                    label="Amount to send"
                    placeText="e.g 3000"
                    value={amount}
                    onChangeText={handleChangeAmount}
                    keyboard="name-phone-pad"
                    
                />
                <TouchableOpacity style={{height:hp('5%'),width:wp('50%'),alignSelf:"center",borderRadius:hp('6%'),
                    backgroundColor:"green",marginTop:hp('5%')}}
                    onPress={() => {
                        setSubmitting(true);
                        axios.post(`https://pregcare.pythonanywhere.com/api/wallet/send-to-non/
                            ?email=${email}&country=${country}&amount=${amount}&phone=${phone}`,{
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
                    <Text style={{textAlign:"center",fontSize:20,color:"white"}}>Send</Text>
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
           
           
        </>
    )
}


export default SendNonUser