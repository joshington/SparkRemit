

import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
// import {Flag} from 'react-native-svg-flagkit'
import {View,Text,TextInput,StatusBar,TouchableOpacity,ActivityIndicator,SafeAreaView,
    StyleSheet,Platform,ViewPropTypes,Image} from 'react-native';
// import PhoneInput from "react-native-phone-number-input";
// import Separator from '../components/Wallet/Separator';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Toast from "react-native-simple-toast";
import {GenericStyles} from './GenericStyles';
// import CustomTextInput from './CustomTextInput';
import colors from './colors';
import {useSelector,useDispatch} from 'react-redux';
import {storeEmail} from '../actions';
import Icon from 'react-native-vector-icons/Feather';
import sparkhome from '../../assets/sparkbg.png';

const CustomTextInput = function(props) {
    const {
      containerStyle,
      style,
      LeftComponent,
      RightComponent,
      refCallback,
      ...remainingProps
    } = props;
  
    return (
      <View style={[styles.containerStyle, containerStyle]}>
        {LeftComponent}
        <TextInput
          {...remainingProps}
          style={[styles.textInputStyle, GenericStyles.fill, style]}
          ref={refCallback}
        />
        {RightComponent}
      </View>
    );5
  };
  
  const styles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      borderColor: colors.WHITE_GREY,
      borderWidth: 1,
      borderRadius: 4,
      padding: 8,
    },
    textInputStyle: {
      padding: 0,
    },
  });
  
  CustomTextInput.defaultProps = {
    LeftComponent: <></>,
    RightComponent: <></>,
  };
  
  CustomTextInput.propTypes = {
    containerStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,
    LeftComponent: PropTypes.object,
    RightComponent: PropTypes.object,
    refCallback: PropTypes.func,
  };



const LabelInput = ({label,placeText,keyboard,secure,onChangeText,value}) => {
    return (
        <View style={{marginTop:hp('5%')}}>
            <Text style={{color:"green",fontWeight:"bold",marginLeft:wp('7%')}}>{label}</Text>
            <TextInput
                placeholder={placeText}
                style={{display:"flex",
                    marginHorizontal:wp('6%'),textAlign:"center",
                    height:50,width:wp('70%'),borderRadius:wp('5%'),borderWidth:wp('0.5%')
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



const Login = ({route,navigation}) => {
    const [otpArray, setOtpArray] = useState(['','','','']);

    //tEXTiNPUT REFS TO FOCUS PROGRAMMATICALLY WHILE  ENTERING THE otp
    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);


    const refCallback = textInputRef => node => {
        textInputRef.current = node;
    }

    //dispatch to get the data for loggin in

   const dispatch = useDispatch();

   const isLoggedIn = useSelector(state => state.register.loggedIn)
    //somethings to use to manage the state
    const [submitting, setSubmitting] = useState(false);
    const [created, setCreated] = useState(false)

    const [Data, setData] = useState({});

    const [message, setMessage] = useState("");


    const [email, setEmail] = useState("");

    const handleEmail = (email) => {
        setEmail(email);
    }


    function onSubmitButtonPress() {
        //===API calll
        //======
        console.log(otpArray);
        //===convert the pin to string since its an array
        let PIN = otpArray.join('');
        console.log(PIN);
        // console.log(store_email)
        //====go ahead and push to the api====
        setSubmitting(true);
        fetch(`https://pregcare.pythonanywhere.com/api/auth/login-user/?PIN=${PIN}&email=${email}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json;' }
        })
            .then(response => response.json())
            .then(data => {
                if (data.admin === true) {
                    setSubmitting(false);
                    console.log(data);
                    setMessage(data.message);
                    Toast.show(data.message);
                    navigation.navigate('AdminDash');
                }
                if (data.status === true) {
                    setSubmitting(false);
                    console.log(data);
                    setMessage(data.message);
                    Toast.show(data.message);
                    dispatch(storeEmail(data.email));
                    navigation.navigate('Dashboard');
                } else {
                    setSubmitting(false);
                    setMessage(data.message);
                    Toast.show(data.message);
                }
            }).catch(error => {
                console.log(error);
                setSubmitting(false);
                Toast.show(data.message);
            });
    }


   

    // this event won't be fired when text changes from '' to '' i.e. backspace is pressed
    // using onOtpKeyPress for this purpose
    const onOtpChange = index => {
        return value => {
            if(isNaN(Number(value))){
                //do nothing when a non digit is presses
                return;
            }
            const otpArrayCopy = otpArray.concat();
            otpArrayCopy[index] = value;
            setOtpArray(otpArrayCopy);

            //auto focus to next InputText if value is not blank
            if(value !== ''){
                if(index === 0){
                    secondTextInputRef.current.focus();

                }else if(index === 1){
                    thirdTextInputRef.current.focus();
                }else if(index === 2){
                    fourthTextInputRef.current.focus();
                }
            }
        }
    }


    /// only backspace key press event is fired on Android
  // to have consistency, using this event just to detect backspace key press and
  // onOtpChange for other digits press
  const onOtpKeyPress = index => {
      return ({nativeEvent: {key: value}}) => {
          //auto focus to previous InputText if value is blank and existing value is also blank
          if(value === 'Backspace' && otpArray[index] === ''){
                if(index === 1){
                  firstTextInputRef.current.focus();
                }else if(index === 2){
                    secondTextInputRef.current.focus();
                }else if(index === 3){
                    thirdTextInputRef.current.focus();
                }

                if(Platform.OS === 'android' && index > 0){
                    const otpArrayCopy = otpArray.concat();
                    otpArrayCopy[index-1]  = '';//clear previous box which will be in focus
                    setOtpArray(otpArrayCopy);
                }


          }
      }
  }

    const styles = StyleSheet.create({
        otpWrapper:{
            flexDirection:"row",
            marginVertical:10
        },
        otpButton:{
            width:60,
            height:60,
            borderRadius:60,
            marginHorizontal:5,
            alignItems:'center',
            justifyContent:'center',
        },
        textOtp:{
            fontSize:25,
            fontWeight:'bold'
        },
        container:{
            backgroundColor:'#f7f7f7',
        },
        headerWrapper:{
            backgroundColor:"green",
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            height:hp('25%')
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
    })

        // useEffect(() => {
        //     //==its better to handle this when the cpt mounts=====
           
        //     return () => {
        //         setSubmitting(false);
        //         setCreated(false);
        //         //tring to do a cleanup
        //         // 
        //     }
        // }, []);
        return (
            <View  style={{flex:1}}>
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
                            <Text style={styles.headerText}>Login</Text>
                        </View>
                        <View  style={{width:wp('2%')}} />
                    </View>
                    <View style={{alignItems:"center"}}>
                    <Image resizeMode='cover' style={{width:wp('50%'),height:hp('10%')}} source={sparkhome} />
                    </View>
                </SafeAreaView>
                {/* <StatusBar translucent={true} barStyle="light-content"/> */}
                <View style={{marginHorizontal:10,marginTop:5}}>
                    <Text style={{fontSize:25,textAlign:"center",marginBottom:hp('6%')}}>
                        Enter Spark PIN to Login
                    </Text>

                    <View style={{flexDirection:"row",display:"flex",justifyContent:"space-around",
                        marginHorizontal:wp('8%')
                    }}>
                       {/* now here i add my pins ===*/}
                       {
                           [
                               firstTextInputRef,
                               secondTextInputRef,
                               thirdTextInputRef,
                               fourthTextInputRef,
                           ].map((textInputRef,index) => (
                                <CustomTextInput
                                    containerStyle={[GenericStyles.fill, GenericStyles.mr12]}
                                    value={otpArray[index]}
                                    onKeyPress={onOtpKeyPress(index)}
                                    onChangeText={onOtpChange(index)}
                                    keyboardType={'numeric'}
                                    maxLength={1}
                                    style={[styles.otpText, GenericStyles.centerAlignedText]}
                                    autoFocus={index === 0 ? true : undefined}
                                    refCallback={refCallback(textInputRef)}
                                    key={index}
                                />
                           ))
                       }
                    </View>

                    <LabelInput 
                        label="EMAIL"
                        placeText="e.g user@gmail.com"
                        value={email}
                        onChangeText={handleEmail}
                    />
                              
                    <TouchableOpacity style={{borderRadius:18,backgroundColor:"yellow",
                        width:200,height:40,alignItems:"center",alignSelf:"center",marginTop:hp('10%')}}
                        onPress={() => {
                            // 
                            onSubmitButtonPress()
                        }}
                    >
                        <Text style={{fontSize:22,fontWeight:"bold"}}>Login</Text>
                    </TouchableOpacity>
                    {/* <Text>
                        {
                        submitting
                        ? (
                            <ActivityIndicator size="large" color="green" 
                                style={{marginTop:10,fontWeight:"bold"}} 
                            />
                        ) : ''   
                    
                    }
                    </Text> */}
                    <TouchableOpacity style={{borderRadius:18,backgroundColor:"green",
                        width:200,height:40,alignItems:"center",alignSelf:"center",marginTop:hp('5%')}}
                        onPress={() => navigation.navigate('ForgotPin')}
                    >
                        <Text style={{fontSize:22,fontWeight:"bold"}}>Forgot Pin</Text>
                    </TouchableOpacity>
                    <Text style={{textAlign:"center"}}>
                        {
                            submitting 
                            ?  (<ActivityIndicator size="large" color="red" 
                                style={{marginTop:10,fontWeight:"bold"}}   
                            />):''
                        }
                    </Text>
                </View>
            
            </View>
        )
        
    }

export default  Login;

