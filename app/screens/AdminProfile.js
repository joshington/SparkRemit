
import React, {useState,useEffect} from 'react';
import {Text,View,StatusBar,TouchableOpacity,StyleSheet,TextInput,ActivityIndicator} from 'react-native';
import { Fontisto,Entypo,FontAwesome,Ionicons,
    MaterialCommunityIcons} from '@expo/vector-icons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
// import {useSelector} from 'react-redux'





const AdminProfile = ({navigation}) => {


    const LeftRight = ({item1,item2, check=false,onPress,money=false,value,onChangeText,placeText,keyboard}) => {
        return (
            <View>
                    <View style={{marginVertical:hp('3%'),marginHorizontal:wp('5%')}} onPress={onPress}>
                        <View style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                            <Text style={{fontSize:20}}>{item1}</Text>
                            {
                                edit ? (
                                    <TextInput 
                                        value={value}
                                        onChangeText={onChangeText}
                                        placeholder={placeText}
                                        // autoFocus={true}
                                        blurOnSubmit
                                        keyboardType={keyboard}


                                    />
                                ):(
                                    <Text style={{fontSize:20,color:check ? "green" : "",fontWeight:"bold"}}>
                                        {item2}
                                    </Text>
                                )
                            }
                           
                        </View>
                    </View>
                <View  style={{height:StyleSheet.hairlineWidth,width:wp('95%'),backgroundColor:"black",marginHorizontal:wp('5%')}}  />
            </View>
            
        )
    }




    const [details, setDetails] = useState({});
    const [edit, setEdit] = useState(false);

    // const email = useSelector(state => state.wallet.user_email)

    const fetchUserDetails =  () => {
            fetch('https://pregcare.pythonanywhere.com/api/auth/get_admin_details/')
            .then(response => response.json())
            .then(data => {
                if(data.status === true){
                    console.log(data)
                    setDetails(data);
                }
            }).catch(error => {
                console.log(error)
            })
            
            
       
    }

    useEffect(() => {
        let isMount = true;
     
        //call the fetch details
        fetchUserDetails();

        //also get the transactions
        return () => {
            isMount = false
        }
    }, []);
    const {username,email,PIN,pk} = details;

    const [m_username, setUsername] = useState(username)
    const [updating, setUpdating] = useState(false);


    const [message, setMessage] = useState("");

    const handleUsername = (m_username) => {
        setUsername(m_username)
    }

    const [m_email, setEmail] = useState(email);

    const handleEmail = (m_email) => {
        setEmail(m_email)
    }

    const [pin, setPIn] = useState(PIN)
    const handlePin = (pin) => {
        setPIn(pin)
    }


    console.log(m_email !== email)


    useEffect(() => {
        return () => {
            setUpdating(false);
            setMessage("")
            // 
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
           
            <Text style={{fontSize:20,textAlign:"center",color:"green"}}>Admin</Text>
            
            <View style={{marginTop:hp('6%')}}>
                <View  style={{height:StyleSheet.hairlineWidth,width:wp('95%'),backgroundColor:"black",marginHorizontal:wp('5%')}}  />

               
                <LeftRight  
                    item1="username" 
                   item2={username}
                   check
                   value={m_username}
                   onChangeText={handleUsername}
                   placeText={username}
                />
                {/* <LeftRight  
                    item1="Email" 
                   item2={email}
                   check
                   value={m_email}
                   onChangeText={handleEmail}
                   placeText={email}
                /> */}
                <LeftRight  
                    item1="pin" 
                    item2={PIN}
                    check
                    value={pin}
                    placeText={PIN}
                    onChangeText={handlePin}
                    keyboard="phone-pad"
                />
                
               
               
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                <TouchableOpacity style={{backgroundColor: edit ? "gray":"green",borderRadius:10,
                        height:hp('6%'),width:wp('35%'),marginTop:hp('8%'),marginLeft:wp('5%')}}
                        onPress={() => 
                            setEdit(true)
                        }
                    >
                        <Text style={{textAlign:"center",fontSize:20,color:"white",fontWeight:"bold"}}>Edit</Text>
                </TouchableOpacity>
                {
                    edit ? (
                        <>
                        <TouchableOpacity style={{backgroundColor:"green",borderRadius:10,
                            height:hp('6%'),width:wp('35%'),marginTop:hp('8%'),marginLeft:wp('5%')}}
                            onPress={() => {
                                setUpdating(true)
                                console.log(pin,m_username)
                                fetch(`https://pregcare.pythonanywhere.com/api/auth/update-admin/${pk}/`,{
                                    method:'PUT',
                                    body:JSON.stringify({             
                                        username:m_username,
                                        PIN:pin
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
                            <Text style={{textAlign:"center",fontSize:20,color:"white",fontWeight:"bold"}}>Update</Text>
                        </TouchableOpacity>
                        
                    </>
                    ):(
                        <TouchableOpacity style={{backgroundColor:"green",borderRadius:10,
                            height:hp('6%'),width:wp('35%'),marginTop:hp('8%'),marginLeft:wp('5%')}}
                            onPress={() => navigation.navigate('Welcome')}
                        >
                            <Text style={{textAlign:"center",fontSize:20,color:"white",fontWeight:"bold"}}>Logout</Text>
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
            
        </View>
    )
}


export default AdminProfile;

