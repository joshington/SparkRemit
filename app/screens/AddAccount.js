import React, { useState,useEffect } from "react";

import {View,Text,SafeAreaView,TouchableOpacity,Image,
    TextInput,StyleSheet,StatusBar,ActivityIndicator} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch,useSelector } from 'react-redux';
import sparkhome from '../../assets/sparkbg.png';
import Icon from 'react-native-vector-icons/Feather';
import Toast from "react-native-simple-toast";

const LabelInput = ({label,placeText,keyboard,secure,onChangeText,value}) => {
    return (
        <View style={{marginTop:hp('2%')}}>
            <Text style={{fontSize:20,color:"green",fontWeight:"bold"}}>{label}</Text>
            <TextInput
                placeholder={placeText}
                style={{display:"flex",
                    paddingHorizontal:wp('3%'),
                    height:50,width:wp('60%'),borderRadius:wp('5%'),borderWidth:wp('0.5%'),
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

const AddAccount = ({route,navigation}) => {

    const email = useSelector(state => state.wallet.user_email)


    const [actno, setActNo]  = useState("");
    const [bank, setBank]  = useState("");
    const [submitting,setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const handleAct = (actno) => {
        setActNo(actno)
    }
    const handleBank = (bank) => {
        setBank(bank)
    }
    return (
        <View>
            {/* <StatusBar translucent={false} barStyle="light-content"/> */}
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
                        <Text style={styles.headerText}>create account number</Text>
                    </View>
                    <View  style={{width:wp('2%')}} />
                </View>
                <View style={{alignItems:"center",marginTop:hp('1.6%')}}>
                   <Image resizeMode='cover' style={{width:wp('50%'),height:hp('10%')}} source={sparkhome} />
                </View>
            </SafeAreaView>
            <View style={{marginTop:hp('1%'),alignSelf:"center"}}>
                <LabelInput 
                    label="Account Number"
                    placeText="Example; I234567RG"
                    value={actno}
                    onChangeText={handleAct}
                />
                <LabelInput 
                    label="Bank"
                    placeText="Example; I234567RG"
                    value={bank}
                    onChangeText={handleBank}
                />
                
            </View>
            <TouchableOpacity style={{backgroundColor:"green",padding:hp('1%'),
               borderRadius:hp('3%'),marginTop:hp('9%'),width:wp('60%'),height:hp('6%'),alignSelf:"center"}}      
                onPress={() => {
                    setSubmitting(true)
                    fetch(`https://pregcare.pythonanywhere.com/api/wallet/add-account/?email=${email}&actno=${actno}&bank=${bank}`,{
                        method:'POST',
                        headers:{'Content-type': 'application/json;',}
                    }).then(response => response.json())
                    .then(data => {
                        if(data.status === true){
                            setSubmitting(false)
                            setMessage(data.message)
                            Toast.show(data.message)
                            navigation.navigate("Dashboard")
                        }else{
                            setSubmitting(false)
                            setMessage(data.message)
                            Toast.show(data.message)
                        }
                    }).catch(error => {
                        setSubmitting(false)
                        setMessage(error.message)
                        Toast.show(data.message)
                    })
                }} 
            >
                <Text style={{textAlign:"center",fontSize:20,color:"white",fontWeight:"bold"}}>
                    Add Account
                </Text>
            </TouchableOpacity>
            <Text style={{textAlign:"center"}}>
                {
                    submitting 
                    ? (
                        <ActivityIndicator size="large" color="green" 
                            style={{marginTop:10,fontWeight:"bold"}}   
                        />
                    ):Toast.show(message)
                }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f7f7f7',
    },
    headerWrapper:{
        backgroundColor:"green",
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        height:hp('30%')
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

export default AddAccount;