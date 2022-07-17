

import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
// import {Flag} from 'react-native-svg-flagkit'
import {View,Text,TextInput,StatusBar,TouchableOpacity,ActivityIndicator,
    StyleSheet,Platform,ViewPropTypes} from 'react-native';
// import PhoneInput from "react-native-phone-number-input";
// import Separator from '../components/Wallet/Separator';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {GenericStyles} from './GenericStyles';
// import CustomTextInput from './CustomTextInput';
import colors from './colors';
import {useSelector,useDispatch} from 'react-redux';




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


const SparkPin = ({route,navigation}) => {

    const [otpArray, setOtpArray] = useState(['','','','']);

    //tEXTiNPUT REFS TO FOCUS PROGRAMMATICALLY WHILE  ENTERING THE otp
    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);


    const refCallback = textInputRef => node => {
        textInputRef.current = node;
    }

    
    const store_email = useSelector(state => state.wallet.user_email)

    //somethings to use to manage the state
    const [submitting, setSubmitting] = useState(false);

    const [success, setSuccess] = useState(false);

    const [fail, setFail] = useState(false);
    const [message, setMessage] = useState("");
    const [created, setCreated] = useState(false)

    const onSubmitButtonPress = () => {
        //===API calll
        //======
        console.log(otpArray)
        //===convert the pin to string since its an array
        let PIN = otpArray.join('')
        // console.log(PIN)
        // console.log(store_email)
        //====go ahead and push to the api====
        setSubmitting(true);
        fetch('https://pregcare.pythonanywhere.com/api/auth/create-pin/',{
                                method:'POST',
                                body:JSON.stringify({PIN:PIN,email:store_email}),
                                headers:{'Content-type': 'application/json;',}
                            }).then(response => response.json())
                            .then(data => {
                                if(data.status === true){
                                    setSubmitting(false)
                                    setSuccess(true)
                                    setMessage(data.message)
                                    navigation.navigate("SparkUsername")
                                }else{
                                    setSubmitting(false)
                                    setFail(true);
                                    setMessage(data.message)
                                }
                            }).catch(error => {
                                setFail(true)
                                setMessage(error.message)
                            })  
    }

    //====printing the otp array======
    //===have to print the otp array
    //===calling the useSelector
   

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
        }
    })

        useEffect(() => {
            //==its better to handle this when the cpt mounts=====
           
            return () => {
                setSubmitting(false);
                setMessage("")
                setSuccess(false);
                setFail(false);
            }
        }, []);
        return (
            <View style={{flex:1,backgroundColor:"green"}}>
                <StatusBar translucent={true} barStyle="light-content"/>
                <View style={{marginHorizontal:10,marginTop:30,paddingVertical:hp('10%')}}>
                    <Text style={{fontSize:25,textAlign:"center",marginBottom:hp('6%')}}>
                        Create 4 digit Spark PIN
                    </Text>

                    <View style={{flexDirection:"row",display:"flex",
                       justifyContent:"space-around",marginHorizontal:wp('6%')}}>
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
                                        
                    <TouchableOpacity style={{borderRadius:18,backgroundColor:"yellow",
                        width:200,height:40,alignItems:"center",alignSelf:"center",marginTop:hp('6%')}}
                        onPress={() => {
                            // 
                            onSubmitButtonPress()
                        }}
                    >
                        <Text style={{fontSize:22,fontWeight:"bold"}}>Create PIN</Text>
                    </TouchableOpacity>
                    <Text style={{textAlign:"center"}}>
                        {
                            submitting
                            ? (
                                <ActivityIndicator size="large" color="green" 
                                    style={{marginTop:10,fontWeight:"bold"}} 
                                />
                            ) : <Text>{message}</Text>
                        
                        }
                    </Text>
                </View>
            
            </View>
        )
        
    }

export default  SparkPin;
 
