import React, {useEffect, useState} from 'react'
import {View,Text,StatusBar,TextInput,StyleSheet,ActivityIndicator,
    SafeAreaView,TouchableOpacity,Image} from 'react-native';
import ButtonWIthText from '../components/ButtonWithText/ButtonWithText';
import TextHeader from '../components/TextHeader/TextHeader';
import Icon from 'react-native-vector-icons/Feather';


import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import sparkhome from '../../assets/sparkbg.png';
import {useSelector,useDispatch} from  'react-redux';
import {registerUser,storeEmail,storeRegEmail} from '../actions';





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
                autoFocus={true}
            />
            
        </View>
    )
}





const EmailAndNumber = ({route,navigation}) => {

    // useEffect(() => {
    //     return () => {
    //         setSubmitting(false);
    //         setMessage("");
    //         setFail(false);
    //         setSuccess(false);
    //         // 
    //     }
    // }, []);
    const styles = StyleSheet.create({
        container:{
            backgroundColor:'#f7f7f7',
        },
        headerWrapper:{
            backgroundColor:"green",
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            height:hp('45%')
        },
        header:{
            padding:17,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            marginTop:hp('3%')
        },
        iconWhite:{
            color:"white"
        },
        headerText:{
            fontWeight:"bold",
            color:"#fff",
            fontSize:18,
            textAlign:"center"
        },content:{
            marginHorizontal:wp('5%'),
            borderRadius:wp('3%'),
            backgroundColor:"#fff",
            borderRadius:wp('2%'),
            marginTop:-120,
            marginBottoom:hp('4%'),
            height:hp('70%')

        },title:{
            fontWeight:'bold',
            fontSize:18,
            color:'#2d2d2d',
            paddingVertical:hp('2%'),
            textAlign:"center"
        }
    });
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("")
 
    const [startReg, setStartReg] = useState(false);
    const [registered, setRegistered] = useState(false)

    const [regiData, setRegData] = useState({});
    const [typing, setTyping] = useState(false);
    //===above is to help me get the details


    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false)



    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

    

    const handleEmail = (email) => {
        setEmail(email)
    }
    const handlePhone=(phone) => {
        setPhone(phone)
    }

    useEffect(() => {
        return () => {
            setStartReg(false);
            setSubmitting(false);
            setMessage("");
            setSuccess(false);
            setFail(false);
            // 
        }
    }, []);
    return(
        <View style={styles.container}>
            <SafeAreaView style={styles.headerWrapper}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <View>
                            <Icon name="chevron-left" size={24} style={styles.iconWhite} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerText}>Register</Text>
                    </View>
                    <View  style={{width:wp('2%')}} />
                </View>
                <View style={{alignItems:"center"}}>
                   <Image resizeMode='cover' style={{width:wp('50%'),height:hp('10%')}} source={sparkhome} />
                </View>
            </SafeAreaView>
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>Personal Information &gt;</Text>
                </View>
                <View style={{marginHorizontal:wp('5%')}}>
                    <LabelInput 
                        label="Email"
                        placeText="e.g sparkremit@gmail.com"
                        value={email}
                        onChangeText={handleEmail}
                    />
                    <LabelInput 
                        label="Phone"
                        placeText="e.g +256706626855"
                        keyboard="numeric"
                        value={phone}
                        onChangeText={handlePhone}
                    />
                    <View style={{marginHorizontal:wp('5%'),marginTop:hp('1%')}}>
                        <Text style={{textAlign:"center"}}>We will send u a code to your email to verify</Text>
                    </View>
                    
                    <TouchableOpacity style={{backgroundColor:"green",
                        paddingVertical:hp('2%'),borderRadius:hp('3%'),marginTop:hp('2%')}}
                        
                        onPress={() => {
                            //dispatch(registerUser(email,phone))
                            setSubmitting(true)
                            fetch('https://pregcare.pythonanywhere.com/api/auth/register/',{
                                method:'POST',
                                body:JSON.stringify({             
                                    email:email,
                                    phone:phone
                                }),
                                headers:{'Content-type': 'application/json;',}
                            }).then(response => response.json())
                            .then(data => {
                                if(data.status === true){
                                    setSubmitting(false)
                                    setSuccess(true)
                                    setMessage(data.message)
                                    dispatch(storeRegEmail(email))
                                    navigation.navigate('VerifyEmail')
                                }else{
                                    setSubmitting(false);
                                    setFail(true)
                                }
                            }).catch(error => {
                                setSubmitting(false);
                                setFail(true)
                            })
                            //====only navigate if status is true
                            
                            
                        }}
                    >
                        <Text style={{textAlign:"center",fontSize:15,color:"white",fontWeight:"bold"}}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                        <Text style={{textAlign:"center"}}>
                            { 
                                submitting 
                                ? (
                                <ActivityIndicator size="large" color="green" 
                                    style={{marginTop:10,fontWeight:"bold"}}   
                                />) 
                                :(<Text>{message}</Text>)
                            }
                            
                        </Text>
                    
                </View>
            </View>
        </View>
      
            // <Text style={{fontSize:15}}>By opening an account, u agree to our terms and conditions</Text>
            // <ButtonWIthText  text="Open Account" 
            //     background="blue" textColor="white" maTop={hp('3%')} 
            //     onPress={() => navigation.navigate('MobileMoney')}
            // />
        /* <ButtonWIthText  text="Bank" 
                background="blue" textColor="white" 
                onPress={() => navigation.navigate('BankDeposit')}
            />  */
        // </View>
    )
}

export default EmailAndNumber;