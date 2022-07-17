

import React, {useState,useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons';
// import {Flag} from 'react-native-svg-flagkit'
import {View,Text,TextInput,StatusBar,TouchableOpacity,ActivityIndicator} from 'react-native';
// import PhoneInput from "react-native-phone-number-input";
// import Separator from '../components/Wallet/Separator';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';





const VerifyEmail = ({route,navigation}) => {
    const [otp, setOtp] = useState("");


    const [submitting, setSubmitting] = useState(false)

    const [submittingAno, setSubmittingAno] = useState(false)

    const [otpData, setOtpData] = useState({}) 

    const [verified, setVerified] = useState(false);


    const [success, setSuccess] = useState(true);
    const [fail, setFail] = useState(false);
    const [message, setMessage] = useState("");


    const handleOtp = (otp) => {
        setOtp(otp)
    }


    // const dispatch = useDispatch()

    const wallet_state = useSelector(state => state.wallet)
    const email =  useSelector(state => state.wallet.user_email)
    console.log(wallet_state)

    useEffect(() => {
        return () => {
            setSubmitting(false);
            setMessage("");
            setFail(false);
            setSuccess(false);
            // 
        }
    }, []);
        return (
            <>
                <StatusBar translucent={false} barStyle="light-content"/>
                <View style={{marginHorizontal:30,marginTop:30,paddingVertical:hp('10%')}}>
                    <Text style={{fontSize:20,marginHorizontal:wp('3%')}}>Enter 4 digit code sent to Email for verification</Text>

                    <TextInput
                        style={{display:"flex",
                            paddingHorizontal:wp('3%'),marginTop:hp('4%'),
                            height:hp('12%'),
                            textAlign:"center",
                            height:50,width:wp('80%'),borderRadius:wp('5%'),borderWidth:wp('0.5%')
                        }}
                        keyboardType="number-pad"
                        onChangeText={handleOtp}
                        value={otp}
                        autoFocus={true}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            fetch(`https://pregcare.pythonanywhere.com/api/auth/resend-otp/?email=${email}`,{
                                method:'POST',
                                // body:JSON.stringify({             
                                //     email:email,
                                //     phone:phone
                                // }),
                                headers:{'Content-type': 'application/json;',}
                            }) .then(response => response.json())
                            .then(data => {
                                if(data.status === true){
                                    setSubmittingAno(false)
                                    setSuccess(true)
                                    setMessage(data.message)
                                }else{
                                    setSubmittingAno(false)
                                    setFail(true)
                                    setMessage(data.message)
                                }
                           
                            }).catch(error => {
                                setSubmittingAno(false)
                                setFail(true)
                            })
                        }}
                    >
                        <Text style={{textAlign:"center",fontSize:20,marginTop:hp('5%'),color:"green"}}>Resend Code?</Text>
                    </TouchableOpacity>
                    <Text style={{textAlign:"center"}}>
                        {
                            submittingAno ? <ActivityIndicator size="large" color="green" 
                                            style={{marginTop:10,fontWeight:"bold"}}   
                                        /> : <Text>{message}</Text>
                        }
                    </Text>
                    <TouchableOpacity style={{borderRadius:18,backgroundColor:submitting ? "green":"#20B2AA",
                        width:200,height:40,alignItems:"center",alignSelf:"center",marginTop:70}}
                        onPress={() => {
                            setSubmitting(true);
                            fetch('https://pregcare.pythonanywhere.com/api/auth/validate-otp/',{
                                method:'POST',
                                body:JSON.stringify({otp:otp}),
                                headers:{'Content-type': 'application/json;',}
                            }).then(response => {
                                if(response.ok){
                                    const Data = response.json()
                                    setOtpData(Data)
                                    //==getting the verfied email====
                                    console.log(otpData.verified_email)
                                    //dispatch to store the email
                                    const user_email = otpData.verified_email
                                  
                                    setVerified(true)
                                    
                                    setSubmitting(false);
                                    //=======navigate====
                                    navigation.navigate('SparkPin')
                                }else{
                                    setVerified(false)
                                    setSubmitting(false)
                                }
                            }).catch(error => {
                                console.log("error",error)
                                setSubmitting(false)
                                setVerified(false);
                            })
                        }}
                    >
                        <Text style={{fontSize:22,fontWeight:"bold"}}>Continue</Text>
                    </TouchableOpacity>
                    <Text style={{textAlign:"center"}}>
                        {
                            submitting 
                            ?  (<ActivityIndicator size="large" color="green" 
                                style={{marginTop:10,fontWeight:"bold"}}   
                            />):''
                        }
                    </Text>
                </View>
            
            </>
        )
        
    }

export default  VerifyEmail;
 
