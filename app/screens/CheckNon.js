import React, {useEffect,useRef, useState} from 'react'
import PropTypes from 'prop-types';
import {View,Text,StatusBar,TextInput,StyleSheet,ActivityIndicator,
    SafeAreaView,TouchableOpacity,Image,ViewPropTypes} from 'react-native';
import ButtonWIthText from '../components/ButtonWithText/ButtonWithText';
import TextHeader from '../components/TextHeader/TextHeader';
import Icon from 'react-native-vector-icons/Feather';
import Toast from "react-native-simple-toast";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import sparkhome from '../../assets/sparkbg.png';
import {useSelector,useDispatch} from  'react-redux';
import {registerUser,storeEmail,storeRegEmail} from '../actions';

import {GenericStyles} from './GenericStyles';
// import CustomTextInput from './CustomTextInput';
import colors from './colors';






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
    );
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



const CheckNon = ({route,navigation}) => {


    const email = useSelector(state => state.wallet.user_email)
    //== getting the value of spark user
    const spark_user = useSelector(state => state.wallet.spark_user)
    console.log(spark_user)


    const [otpArray, setOtpArray] = useState(['','','','']);

    //tEXTiNPUT REFS TO FOCUS PROGRAMMATICALLY WHILE  ENTERING THE otp
    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);


    const refCallback = textInputRef => node => {
        textInputRef.current = node;
    }


    const onOtpChange = index => {
        return value => {
            if(isNaN(Number(value))){
                //do nothing when a non digit is pressed
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



   


    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false)
    const [message, setMessage] = useState("")

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
        fetch(`https://pregcare.pythonanywhere.com/api/wallet/check-pin/?email=${email}&PIN=${PIN}`,{
            method:'POST',
            // body:JSON.stringify({             
            //     email:email,
            //     phone:phone
            // }),
            headers:{'Content-type': 'application/json;',}
        }).then(response => response.json())
        .then(data => {
            if(data.status === true){
                setSubmitting(false)
                setSuccess(true)
                setMessage(data.message)
                //dispatch(storeEmail(email))
                navigation.navigate("ChooseMethod")
            }else{
                setSubmitting(false)
                setFail(true)
                setMessage(data.message)
            }
       
        }).catch(error => {
            setSubmitting(false)
            setFail(true)
        })
                               
    }

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
                        <Text style={styles.headerText}>PIN Verification</Text>
                    </View>
                    <View  style={{width:wp('2%')}} />
                </View>
                <View style={{alignItems:"center"}}>
                   <Image resizeMode='cover' style={{width:wp('50%'),height:hp('10%')}} source={sparkhome} />
                </View>
            </SafeAreaView>
            <View style={styles.content}>
                <View style={{marginHorizontal:wp('5%')}}>
                    <Text style={{fontWeight:"bold",marginTop:hp('5%'),
                        color:"green",textAlign:"center",fontSize:20}}>
                        ENTER PIN 
                    </Text>
                    <View style={{flexDirection:"row",display:"flex",marginHorizontal:wp('7%'),
                        justifyContent:"space-around",marginTop:hp('3%')}}>
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
                    <TouchableOpacity style={{backgroundColor:"green",
                        paddingVertical:hp('2%'),borderRadius:hp('3%'),marginTop:hp('9%')}}
                        
                        onPress={() => onSubmitButtonPress()} 
                    >
                        <Text style={{textAlign:"center",fontSize:15,color:"white",fontWeight:"bold"}}>
                            Continue
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
            </View>
        </View>
    )
}

export default CheckNon;