import React,{useState,useEffect} from 'react';
import {View,Text,TouchableOpacity,TextInput,StyleSheet,ActivityIndicator} from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { setWarningFilter } from 'react-native/Libraries/LogBox/Data/LogBoxData';
import { useDispatch,useSelector } from 'react-redux';
import {all_spark_users,storeSparkUser} from '../actions';
import Toast from "react-native-simple-toast";




const LabelInput = ({label,placeText,keyboard,secure,onChangeText,value}) => {
    return (
        <View style={{marginHorizontal:wp('6%'),marginTop:hp('5%'),alignItems:"center"}}>
            <Text style={{fontSize:20,color:"green"}}>{label}</Text>
            <TextInput
                placeholder={placeText}
                style={{textAlign:"center",borderRadius:wp('2%'),borderWidth:wp('0.5%'),width:wp('57%'),height:hp('7%')}}
                // style={{
                //     textAlign:"center",
                //     // paddingHorizontal:wp('3%'),
                //     height:50,width:wp('70%'),borderRadius:wp('5%'),borderWidth:wp('0.5%')
                // }}
                keyboardType={keyboard}
                secureTextEntry={secure ? true : false}
                onChangeText={onChangeText}
                value={value}
                autoFocus={true}
              
            />
            
        </View>
    )
}

const FinalSend = ({navigation}) => {
    const [amount, setAmount] = useState("")

    //==to help control listing the spark remit users
    



    //===for dispatcing actions=====
    const dispatch = useDispatch()

    const email = useSelector(state => state.wallet.user_email)

    //====get the users from the reducer=====
    const spark_user = useSelector(state => state.wallet.user)
    //==the above gets me all the spark users=====

    const [submitting, setSubmitting] =useState(false)

    const [success, setSuccess] = useState(false);

    const [fail, setFail] = useState(false);

    const [message, setMessage] = useState("");

    const handleAmount = (amount) => {
        setAmount(amount)
    }
    useEffect(() => {
        return () => {
            setSubmitting(false)
            setMessage("");

            // 
        }
    }, []);
    return (
        <View style={{paddingVertical:hp('10%')}}>
            
            <Text style={{textAlign:"center",marginTop:hp('3%'),fontSize:20,marginHorizontal:wp('4%')}}>
                You are attempting to send money to ....<Text style={{color:"green",fontWeight:"bold"}}>{spark_user}</Text></Text>
            <LabelInput 
                label="Enter Amount"
                Enter Amount
                placeText="E.g 1000"
                value={amount}
                onChangeText={
                    handleAmount
                }
                keyboard="name-phone-pad"
                
            />
            
                <TouchableOpacity style={{backgroundColor:"green",
                    marginHorizontal:wp('10%'),borderRadius:15,marginTop:hp('7%'),padding:hp('1%'),
                    height:hp('7%'),margin:hp('4%')}}
                    onPress={() => {
                        setSubmitting(true);
                        fetch(`https://pregcare.pythonanywhere.com/api/wallet/send-wallet-user/?email=${email}&amount=${amount}&recipient=${spark_user}`,{
                            method:'POST',
                            // body:JSON.stringify({otp:otp}),
                            headers:{'Content-type': 'application/json;',}
                        }).then(response => response.json())
                        .then(data => {
                            if(data.status === true){
                                setSubmitting(false)
                                setSuccess(true)
                                setMessage(data.message)
                                Toast.show(data.message)
                                navigation.navigate("Dashboard")
                            }else{
                                setSubmitting(false)
                                setFail(true)
                                Toast.show(data.message)
                                setMessage(data.message)
                            }
                        }).catch(error => {
                            setSubmitting(false)
                            setFail(true)
                        })
                    }}
                >
                    <Text style={{textAlign:"center",fontSize:18,color:"white",fontWeight:"bold"}}>
                        Confirm Send
                    </Text>
                </TouchableOpacity>
                <Text style={{textAlign:"center"}}>
                    {
                        submitting ? 
                        (
                            <ActivityIndicator size="large" color="green" 
                                style={{marginTop:10,fontWeight:"bold"}}   
                            />
                        ):Toast.show(message)
                    }
                    
                </Text>
          
        </View>
    )
}


export default FinalSend