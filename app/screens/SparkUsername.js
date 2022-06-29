

import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
// import {Flag} from 'react-native-svg-flagkit'
import {View,Text,TextInput,StatusBar,TouchableOpacity,SafeAreaView,ActivityIndicator} from 'react-native';
// import PhoneInput from "react-native-phone-number-input";
// import Separator from '../components/Wallet/Separator';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ButtonWIthText from '../components/ButtonWithText/ButtonWithText';
import { useSelector} from 'react-redux';

const LabelInput = ({label,placeText,keyboard,secure,onChangeText,value}) => {
    return (
        <View style={{marginTop:hp('2%')}}>
            <Text style={{fontSize:20,color:"green"}}>{label}</Text>
            <TextInput
                placeholder={placeText}
                style={{display:"flex",
                    paddingHorizontal:wp('3%'),
                    height:50,width:wp('80%'),borderRadius:wp('5%'),borderWidth:wp('0.5%')
                }}
                keyboardType={keyboard}
                secureTextEntry={secure ? true : false}
                onChangeText={onChangeText}
                value={value}
            />
            
        </View>
    )
}

const SparkUsername = ({route,navigation}) => {
    const [username,setUsername] = useState("");
    
    const [submitting,setSubmitting] = useState(false);
    const [message, setMessage] = useState(""); 

    const [created,setCreated] = useState(false);

    const store_email = useSelector(state => state.wallet.user_email)

    const handleUsername = (username) => {
        setUsername(username)
    }
    
    return(
        <View>
            <View
                style={{ backgroundColor:"green",borderBottomLeftRadius:30,
                borderBottomRightRadius:30,height:hp('15%'),paddingHorizontal:wp('5%'),alignItems:"center"}}
            >
                <Text style={{fontSize:20,marginTop:hp('7%'),color:"white",fontWeight:"bold"}}>Username</Text>
            </View>

            
            <Text style={{fontSize:20,textAlign:"center",marginTop:hp('5%')}}>Create spark remit username</Text>
         
            <View style={{marginHorizontal:wp('5%')}}>
                <LabelInput 
                    placeText="e.g @bosajosh"
                    value={username}
                    onChangeText={handleUsername}
                />

                
            </View>
            
           
            {/* <ButtonWIthText  text="Open Account" 
                background="blue" textColor="white" maTop={hp('3%')} 
                onPress={() => navigation.navigate('MobileMoney')}
            /> */}
             <TouchableOpacity
                style={{
                        backgroundColor:"green",width:wp('80%'),marginTop:hp('18%'),
                        height:hp('8%'),alignItems:"center",paddingVertical:hp('2%'),
                        borderRadius:10,marginHorizontal:wp('7%')
                    
                    }}
                        // onPress={() => {
                        //     setLogin(false)
                        //     setRegister(true)
                        // }}
                    onPress={() => {
                        setSubmitting(true)
                            fetch('https://pregcare.pythonanywhere.com/api/auth/create-username/',{
                                method:'POST',
                                body:JSON.stringify({email:store_email,uname:username}),
                                headers:{'Content-type': 'application/json;',}
                            }).then(response => response.json())
                            .then(data => {
                                if(data.status === true){
                                    setSubmitting(false)
                                    setMessage(data.message)
                                    navigation.navigate('Dashboard')
                                }else{
                                    setSubmitting(false)
                                    setMessage(data.message)
                                }
                            }).catch(error => {
                                setSubmitting(false)
                                setMessage(error.message)
                            })
                        
                    }}
                >
                    <Text style={{color:"white",fontSize:20}}>Continue</Text>
                </TouchableOpacity>
                <Text style={{textAlign:"center"}}>
                    {
                        submitting 
                        ? (
                            <ActivityIndicator size="large" color="green" 
                                style={{marginTop:10,fontWeight:"bold"}}   
                            />
                        ):<Text>{message}</Text>
                    }
                </Text>
        </View>
    )
}

export default SparkUsername;