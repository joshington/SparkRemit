
import React, {useState,useEffect} from 'react';
import {Text,View,StatusBar,TouchableOpacity,StyleSheet,TextInput,ActivityIndicator} from 'react-native';
import { Fontisto,Entypo,FontAwesome,Ionicons,
    MaterialCommunityIcons} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux'
import Toast from "react-native-simple-toast";



const UserSettings = ({navigation}) => {

    const [details, setDetails] = useState({});

    //==help me do editing====
    const [edit, setEdit] = useState(false);

    const n_email = useSelector(state => state.wallet.user_email)

   
            
            
       
    // }
    const fetchUserDetails = async () => {
        try{
            const response = await fetch(`https://pregcare.pythonanywhere.com/api/wallet/wallet_details/?email=${n_email}`);
            const data = await response.json();
            setDetails(data);
            // console.log(details);//getting the details
        }catch(e){
            // console.log(e);
        }
    }

   
    const {owner,phone,pin,country,account_no,pk} = details;
    
    // console.log(pk)
    // const isNigerian = country === "Nigeria" ? true : false
  
    // const co = country 
    // const [m_country, setCountry] = useState(country);
    // // const [email,setEmail] = useState(n_email);
    const [m_phone, setPhone] = useState(phone);
    const [m_pin, setPin] = useState(pin);
    const [m_account_no, setAccount] = useState(account_no);
    // const [m_bank_code, setBankCode] = useState(bank_code);
    
    
    const handleCountry = (country) => {
        setCountry(country)
    }

  

    const handlePhone = (phone) => {
        setPhone(phone)
    }

    const handlePin = (pin) => {
        setPin(pin)
    }
    const handleAccount =(account_no) => {
        setAccount(account_no)
    }
    const handleBankCode = (bank_code) => {
        setBankCode(bank_code);
    }

    const [updating, setUpdating] = useState(false)
    const [message, setMessage] = useState("");

    const LeftRight = ({item1,item2,onChangeText,keyboard,value, check=false,onPress,money=false,placeText}) => {
        return (
            <View>
                    <View style={{marginVertical:hp('2%'),marginHorizontal:wp('5%')}} onPress={onPress}>
                        <View style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                            <Text style={{fontSize:20}}>{item1}</Text>
                            <View>
                                {
                                    edit ? (
                                        <TextInput
                                            value={value}
                                            onChangeText={onChangeText}
                                            keyboardType={keyboard}
                                            placeholder={placeText}
                                            // autoCorrect={true}
                                        />
                                    ):(
                                        <Text style={{fontSize:20,color:check ? "green" : "",fontWeight:"bold"}}>
                                            {item2} 
                                        </Text>
                                    )
                                }
                            </View>
                           
                        </View>
                    </View>
                <View  style={{height:StyleSheet.hairlineWidth,width:wp('95%'),backgroundColor:"black",marginHorizontal:wp('5%')}}  />
            </View>
            
        )
    }
    



    useEffect(() => {
        let isMount = true;
     
        //call the fetch details
        fetchUserDetails();


        //also get the transactions
        return () => {
            isMount = false
            setUpdating(false);
            setMessage("");

        }
    }, []);

    return (
        <View style={{flex:1}}>
            <StatusBar translucent={true} barStyle="light-content"/>
            {/* <View
                style={{ backgroundColor:"green",borderBottomLeftRadius:30,
                borderBottomRightRadius:30,height:hp('15%'),paddingHorizontal:wp('5%'),alignItems:"center"}}
            >
                <Text style={{fontSize:20,marginTop:hp('7%'),color:"white",fontWeight:"bold"}}>My Profile</Text>
            </View> */}
            <View style={{alignItems:"center",marginTop:hp('5%')}}>
                <FontAwesome name="user-circle-o" 
                    size={70} color="black" style={{marginHorizontal:wp('5%')}}
                />
            </View>
           
            <Text style={{fontSize:20,textAlign:"center",color:"green"}}>{owner}</Text>
            
            <View style={{marginTop:hp('6%')}}>
                <View  style={{height:StyleSheet.hairlineWidth,width:wp('95%'),backgroundColor:"black",marginHorizontal:wp('5%')}}  />

               
                {/* <LeftRight  
                    item1="country" 
                   item2={country}
                   check
                   onChangeText={handleCountry}
                   place
                /> */}
                <LeftRight  
                    item1="phonenumber" 
                    item2={phone}
                    value={m_phone}
                    check
                    onChangeText={handlePhone}
                    keyboard="phone-pad"
                    placeText={phone}
                />
                <LeftRight  
                    item1="pin" 
                    item2={pin}
                    value={m_pin}
                    check
                    onChangeText={handlePin}
                    placeText="5194"
                    keyboard="numeric"
                />
               
                {/* <LeftRight  
                    item1="Acccount number" 
                    item2={account_no}
                    check
                    value={m_account_no}
                    onChangeText={handleAccount}
                    // keyboard="numeric"
                /> */}
                {/* <LeftRight  
                    item1="Bank code" 
                    item2={bank_code}
                    check
                    onChangeText={handleBankCode}
                    // keyboard="numeric"
                /> */}
               
            </View>
            <View>
                {
                    edit 
                    ? (
                        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                            <TouchableOpacity style={{backgroundColor:edit ? "gray":"green",borderRadius:10,padding:hp('1%'),
                                height:hp('6%'),width:wp('25%'),marginTop:hp('4%'),marginLeft:wp('5%')}}
                                onPress={() =>{
                                    setEdit(true)
                                }}
                            >
                                <Text style={{textAlign:"center",fontSize:20,color:"white",fontWeight:"bold"}}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:"green",borderRadius:10,padding:hp('1%'),
                                height:hp('6%'),width:wp('25%'),marginTop:hp('4%'),marginLeft:wp('5%')}}
                                onPress={() => {
                                    setUpdating(true)
                                    
                                    fetch(`https://pregcare.pythonanywhere.com/api/auth/update-user/${pk}/`,{
                                        method:'PUT',
                                        body:JSON.stringify({             
                                            PIN:m_pin,
                                            phone:m_phone
                                        }),
                                        headers:{'Content-type': 'application/json;',}
                                    }).then(response => response.json())
                                    .then(data => {
                                        if(data.status === true){
                                            setUpdating(false)
                                            console.log(data)
                                            setMessage(data.message)
                                            Toast.show(data.message)
                                        }else{
                                            console.log(data)
                                            setUpdating(false)
                                            setMessage(data.message)
                                            Toast.show(data.message)
                                        }
                                    }).catch(error => {
                                        setUpdating(false)
                                        Toast.show("Updating failed")
                                    })
                                }}
                                
                            >
                                <Text style={{textAlign:"center",fontSize:20,color:"white",fontWeight:"bold"}}>Save all</Text>
                            </TouchableOpacity>
                        </View>
                    ) :(
                        <TouchableOpacity style={{backgroundColor:"green",borderRadius:10,padding:hp('1%'),
                            height:hp('6%'),width:wp('25%'),marginTop:hp('4%'),marginLeft:wp('5%')}}
                            onPress={() =>{
                                setEdit(true)
                            }}
                        >
                            <Text style={{textAlign:"center",fontSize:20,color:"white",fontWeight:"bold"}}>Edit</Text>
                        </TouchableOpacity>
                    )
                }
                
            </View>
            <Text style={{textAlign:"center"}}>
                { 
                    updating
                    ? (
                        <ActivityIndicator size="large" color="green" 
                            style={{marginTop:10,fontWeight:"bold"}}   
                        />) 
                    :(Toast.show(message))
                }          
            </Text>

            <View style={{marginTop:hp('3%')}}>
                <Text style={{fontSize:20,marginHorizontal:wp('5%'),fontWeight:"bold"}}>Follow us on</Text>
                <View style={{marginHorizontal:wp('5%'),flexDirection:"row"}}>
                    <Entypo name="facebook" size={50} color="blue" style={{margin:hp('1%')}} />
                    <FontAwesome name="twitter-square" size={50} color="blue"  style={{margin:hp('1%')}} />
                    <Entypo name="youtube" size={60} color="red"  style={{margin:hp('1%')}}  />
                    <FontAwesome5 name="instagram-square" size={50} color="purple" style={{margin:hp('1%')}} />
                </View>
            </View>
        </View>
    )
}


export default UserSettings;

