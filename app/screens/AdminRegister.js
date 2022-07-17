import React, {useEffect, useState} from 'react'
import {View,Text,StatusBar,TextInput,StyleSheet,ActivityIndicator,
    SafeAreaView,TouchableOpacity,Image} from 'react-native';
import ButtonWIthText from '../components/ButtonWithText/ButtonWithText';
import TextHeader from '../components/TextHeader/TextHeader';
import Icon from 'react-native-vector-icons/Feather';
import Toast from "react-native-simple-toast";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import sparkhome from '../../assets/sparkbg.png';
// import {useSelector,useDispatch} from  'react-redux';






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





const AdminRegister = ({route,navigation}) => {
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
            marginBottom:hp('4%'),
            height:hp('50%')

        },title:{
            fontWeight:'bold',
            fontSize:18,
            color:'#2d2d2d',
            paddingVertical:hp('2%'),
            textAlign:"center"
        }
    });
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("")
 
    const [startReg, setStartReg] = useState(false);
    const [registered, setRegistered] = useState(false)

    const [regiData, setRegData] = useState({});
    const [typing, setTyping] = useState(false);
    //===above is to help me get the details


    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false)



    const [message, setMessage] = useState("")
    // const dispatch = useDispatch()

    // console.log(message);
    console.log("===now submitting===")
    console.log(success);
    console.log("displayed the info")

    const handleUsername = (username) => {
        setUsername(username)
    }
    const handlePassword=(password) => {
        setPassword(password)
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
                        <Text style={styles.headerText}>Admin Login</Text>
                    </View>
                    <View  style={{width:wp('2%')}} />
                </View>
                <View style={{alignItems:"center"}}>
                   <Image resizeMode='cover' style={{width:wp('50%'),height:hp('10%')}} source={sparkhome} />
                </View>
            </SafeAreaView>
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>Admin Information &gt;</Text>
                </View>
                <View style={{marginHorizontal:wp('5%')}}>
                    <LabelInput 
                        label="username"
                        placeText="e.g admin"
                        value={username}
                        onChangeText={handleUsername}
                    />
                    <LabelInput 
                        label="Password"
                        secure={true}
                        // keyboard="numeric"
                        value={password}
                    
                        onChangeText={handlePassword}
                    /> 
                    <TouchableOpacity style={{backgroundColor:"green",
                        paddingVertical:hp('2%'),borderRadius:hp('3%'),marginTop:hp('2%')}}
                        
                        onPress={() => {
                            setSubmitting(true)
                            fetch(`https://pregcare.pythonanywhere.com/api/auth/login-admin/?username=${username}&password=${password}`,{
                                method:'POST',
                                headers:{'Content-type': 'application/json;',}
                            })
                            .then(response => response.json())
                            .then(data => {
                                if(data.status === true){
                                    setSubmitting(false)
                                    setSuccess(true)
                                    setMessage(data.message)
                                    Toast.show(data.message)
                                    // dispatch(storeRegEmail(email))
                                    //==have to instead store the admin username
                                    navigation.navigate('AdminDash')
                                }else{
                                    setSubmitting(false);
                                    setFail(true)
                                    Toast.show(data.message)
                                }
                            }).catch(error => {
                                setSubmitting(false);
                                setFail(true)
                                Toast.show(data.message)
                            })
                            //====only navigate if status is true
                            
                            
                        }}
                    >
                        <Text style={{textAlign:"center",fontSize:15,color:"white",fontWeight:"bold"}}>
                            Login
                        </Text>
                    </TouchableOpacity>
                        <Text style={{textAlign:"center"}}>
                            { 
                                submitting 
                                ? (
                                <ActivityIndicator size="large" color="green" 
                                    style={{marginTop:10,fontWeight:"bold"}}   
                                />) 
                                :(<Text>''</Text>)
                            }
                            
                        </Text>
                    
                </View>
            </View>
        </View>
      
         
    )
}

export default AdminRegister;