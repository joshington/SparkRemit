import React,{useState} from 'react';
import {View,Text,TextInput,TouchableHighlight,TouchableOpacity,ActivityIndicator} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import Container from '../components/Container/Container';
import { Entypo } from '@expo/vector-icons';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Picker } from "@react-native-picker/picker";
import PropTypes from 'prop-types';

//am gonna use the picker for the country
import {useSelector,useDispatch} from  'react-redux';

import {storeEmail,storeRegEmail} from '../actions';


import Spinner from '../components/Spinner';
// import { ScrollView } from 'react-native-gesture-handler';



const CurrencyPicker = ({country, onValueChange }) => (
    <Picker
        selectedValue={country}
        style={{  width: wp('30%') }}
        onValueChange={onValueChange}
    >
        <Picker.Item label="Uganda" value="UGA" />
        <Picker.Item label="Kenya" value="KEN" />
        <Picker.Item label="Tanzania" value="TAN" />
        <Picker.Item label="Nigeria" value="NIG" />
    </Picker>
);
CurrencyPicker.propTypes = {
    country: PropTypes.string,
    onValueChange: PropTypes.func,
};

// import { heightPercentageToDP,widthPercentageToDP } from 'react-native-responsive-screen';


//=====cpt of label and input

const LabelInput = ({label,placeText,keyboard,secure,onChangeText,value}) => {
    return (
        <View style={{marginTop:hp('2%')}}>
            <Text>{label}</Text>
            <TextInput
                placeholder={placeText}
                style={{display:"flex",
                    paddingHorizontal:wp('3%'),
                    height:40,width:wp('80%'),borderRadius:wp('8%'),borderWidth:wp('0.3%')
                }}
                keyboardType={keyboard}
                secureTextEntry={secure ? true : false}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    )
}

const ButtonWithText = ({command, onPress}) => {
    return (
    
            <TouchableHighlight
                style={{height:hp('5%'),width:wp('80%'),marginTop:hp('3%'),margin:hp('4%'),
                backgroundColor:"blue",
                borderRadius:hp('1.5%'),marginHorizontal:wp('12%')}}
                onPress={onPress}
            >
                <Text style={{textAlign:"center",fontSize:hp('2.5%'),
                    color:"white",fontWeight:"bold"}}>
                    {command}
                </Text>
            </TouchableHighlight>
    )
}


// const  Register = ({route,navigation}) => {
//     return (
//         <Container>
//             <View style={{justifyContent:"center",alignItems:"center"}}>
                
//                 <Text style={{fontSize:20,fontWeight:"bold",textAlign:"center"}}>User Register</Text>
//                 <LabelInput label="Username" placeText="Username" />
//                 <LabelInput label="Password" placeText="Enter password" />
//                 <LabelInput label="Phone " placeText="Enter phone number" />
//                 <ButtonWithText command="Register" onPress={() => navigation.navigate('MyWallet')} />
//             </View>
//         </Container>
//     )
// }

// const Login = ({route,navigation}) => {
//     return (
//         <Container>
//             <View style={{justifyContent:"center",alignItems:"center",padding:hp('6%')}}>
//                 {/* <Entypo name="user" size={70} color="black" /> */}
//                 <Text style={{fontSize:hp('4%')}}>User Login</Text>
//                 <LabelInput label="Username" placeText="Username" />
//                 <LabelInput label="Password" placeText="Enter password" />
//                 <ButtonWithText command="Login" onPress={() => navigation.navigate('MyWallet')} />
//             </View>
//         </Container>
//     )
// }

const UserAuth = ({route,navigation}) => {
    const [country, setCountry] = useState("UGA");


    //control the variables username
    const [username, setUsername] = useState("");
    //===setting email
    const [email, setEmail] = useState("")
    //==phone
    const [phone, setPhone] = useState("");
    //===pasword
    const [password, setPassword] = useState("");



    ///=================
    const changeName = (name) => {
    //    e && e.preventDefault && e.preventDefault()
        setUsername(name)
    }


    const changeEmail = (email) => {
        // e && e.preventDefault && e.preventDefault()
        setEmail(email)
    }


    const changePhone = (phone) => {
        // e && e.preventDefault && e.preventDefault()
        setPhone(phone)
    }

    const changePassword = (password) => {
        // e && e.preventDefault && e.preventDefault()
        setPassword(password)
    }


    const [register, setRegister] = useState(true);

    const [login, setLogin] = useState(false);

    const handleChangeCountry = (itemValue) => {
        setCountry(itemValue);
    };


    const [registered, setRegistered] = useState(false);

    //====controllig the spinnner
    const [startReg, setStartReg] = useState(false);

    //===handling the dispatch and use selector=====
    const dispatch = useDispatch()
    //gonna use this here to dispatch action and store the email



    //==using state to check if user is registered
    // const isRegistered = useSelector(state => state.regDetails.registered)
    // const started = useSelector(state => state.regDetails.registerStart)


    const [regiData, setRegData] = useState({})

    // const handleSubmit = (e) => {
    //     e.preventDefault();//prevent rerender o posting
    //     dispatch(registerUser({username,email,phone,password}))
    // }


    //login credentials
    const [logEmail, setlogEmail] = useState("");
    const [logPassword, setLogPassword] = useState("");

    const handleLoginEmail = (logEmail) => {
        // e.preventDefault();
        setlogEmail(logEmail)
    }
    const handleLoginPassword = (logPassword) => {
        // e.preventDefault()
        setLogPassword(logPassword)
    }

   //==handling login
   const [startLogin, setStartLogin] = useState(false);

   const [mess, setMess] = useState("")//for the login messages
   const [loggedIn, setLoggedIn] = useState(false)
   const [loginData, setLoginData] = useState({})
    return (
        <View style={{alignItems:"center",padding:hp('10s%'),flex:1}}>
            
            <Entypo name="user" size={50} color="black" />
            <View style={{flexDirection:"row",display:"flex",marginTop:hp('2.5%'),borderRadius:15}}>
               
                <TouchableOpacity
                    style={{
                        backgroundColor:register ? "blue":"gray",width:wp('40%'),
                        height:hp('5%'),alignItems:"center"}}
                        onPress={() => {
                            setLogin(false)
                            setRegister(true)
                        }}
                    
                >
                    <Text style={{color:"white"}}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{backgroundColor:login ? "blue":"gray",width:wp('40%'),height:hp('5%'),alignItems:"center",}}
                    onPress={
                        () => {
                            setRegister(false)
                            setLogin(true);
                        }
                    }
                >
                    <Text style={{color:"white"}}>Login</Text>
                </TouchableOpacity>
            </View>
            <View>
                {
                    register ? (
                        <Container>
                            <View style={{justifyContent:"center",alignItems:"center"}}>
                                
                                <Text style={{fontSize:20,fontWeight:"bold",textAlign:"center",paddingTop:10}}>
                                    User Register
                                </Text>
                                <LabelInput 
                                    label="Username" 
                                    placeText="E.g Josh" 
                                    onChangeText={changeName}
                                    value={username}
                                />
                                <LabelInput 
                                    label="Email" 
                                    placeText="E.g bbosalj@gmail.com" 
                                    onChangeText={changeEmail}
                                    value={email}
                                />
                                
                                <LabelInput 
                                    label="Phone" 
                                    placeText="E.g 0706626855" 
                                    keyboard='numeric' 
                                    onChangeText={changePhone}
                                    value={phone}
                                />
                                <LabelInput 
                                    label="Password" 
                                    placeText="Enter password" 
                                    secure={true}
                                    onChangeText={changePassword}
                                    value={password}
                                />
                                <TouchableOpacity
                                    style={{height:hp('8%'),width:wp('80%'),marginTop:hp('3%'),margin:hp('4%'),
                                    
                                    backgroundColor:"blue",
                                    borderRadius:hp('1.5%'),marginHorizontal:wp('12%')}}
                                    onPress={() => {
                                            setStartReg(true);
                                            fetch('https://pregcare.pythonanywhere.com/api/auth/register',{
                                                method:'POST',
                                                body:JSON.stringify({
                                                    username:username,
                                                    email:email,
                                                    phone:phone,
                                                    password:password
                                                }),
                                                headers:{
                                                    'Content-type': 'application/json;',
                                                }
                                            }).then(response => {
                                                const regData = response.json()
                                                // console.log('data',regData)
                                                setRegData(regData)
                                                setRegistered(true);
                                                console.log('====register')
                                                console.log(registered)
                                                console.log("==now another for reg data=====")
                                                console.log(regiData)
                                                console.log("====now regData======")
                                                setStartReg(false)


                                                //first push the email to the state
                                                registered && dispatch(storeRegEmail(email))
                                                registered &&  navigation.navigate('Dashboard')
                                            }).catch(error => {
                                                console.log("error",error)
                                                setStartReg(false)
                                                setRegistered(false);
                                            })
                                            // console.log({username},email,phone,password)
                                            
                                        }
                                    } 
                                >
                                    <Text style={{textAlign:"center",fontSize:hp('4%'),
                                        color:"white",fontWeight:"bold"}}>
                                        Register
                                    </Text>
                                    <Text>
                                        {
                                            startReg ? <ActivityIndicator size="large" color="green" 
                                            style={{marginTop:10,fontWeight:"bold",marginHorizontal:wp('10%')}}   /> :''}
                                    </Text>
                                   
                                </TouchableOpacity>
                            </View>
                        </Container>
                    ) : (
                        <Container>
                            <View style={{justifyContent:"center",alignItems:"center",padding:hp('6%')}}>
                                {/* <Entypo name="user" size={70} color="black" /> */}
                                <Text style={{fontSize:hp('4%')}}>User Login</Text>
                                <LabelInput 
                                    label="Email" 
                                    placeText="Email" 
                                    onChangeText={handleLoginEmail}
                                    value={logEmail}
                                />
                                <LabelInput 
                                    label="Password" 
                                    placeText="Enter password" 
                                    onChangeText={handleLoginPassword}
                                    value={logPassword}
                                />
                                <TouchableOpacity
                                    style={{height:hp('8%'),width:wp('80%'),marginTop:hp('3%'),margin:hp('4%'),
                                    backgroundColor:"blue",
                                    borderRadius:hp('1.5%'),marginHorizontal:wp('12%')}}
                                    onPress={
                                        async () => {
                                            
                                                setStartLogin(true) //start the spinner
                                        
                                                fetch('https://pregcare.pythonanywhere.com/api/auth/login',{
                                                    method:'POST',
                                                    body:JSON.stringify({
                                                        email:logEmail,
                                                        password:logPassword
                                                    }),
                                                    headers:{
                                                        'Content-Type': 'application/json;',
                                                    }
                                                }).then(response => {
                                                    const logData = response.json()
                                                    setLoginData(logData);
                                                    //==set the login data
                                                    setLoggedIn(true);
                                                    //loggedin the user
                                                    setStartLogin(false);


                                                    //now dispatch
                                                    loggedIn && dispatch(storeEmail(logEmail))
                                                    //after navigate but only do that if user is logged in
                                                    loggedIn && navigation.navigate('Dashboard')
                                                    //==now at this stage we are in the dashboard
                                                }).catch(error => {
                                                    console.log("error",error)
                                                    setRegistered(false);
                                                    setStart(false)
                                                })
                                           
                                        }
                                        
                                    }>

                                   <Text style={{textAlign:"center",fontSize:20,color:"white",fontWeight:"bold"}}>
                                       Login
                                    </Text>

                                  
                                </TouchableOpacity>
                                <Text>
                                    {
                                        startLogin ? <ActivityIndicator size="large" color="green" 
                                                    style={{marginTop:10,fontWeight:"bold",marginHorizontal:wp('10%')}} /> : ''
                                    
                                    }
                                </Text>
                               
                            </View>
                        </Container>
                    )}
            </View>
        </View>
    )
}
export default UserAuth;