import React, {useState,useEffect} from "react";
import PropTypes from 'prop-types'
import { Animated,View,Text,StatusBar,StyleSheet,Dimensions,
    TouchableHighlight,Image,TouchableOpacity
 } from "react-native";
// import TextHeader from "../components/TextHeader/TextHeader";
import Container from "../components/Container/Container";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Easing } from "react-native-reanimated";
// import ButtonWIthText from '../components/ButtonWithText/ButtonWithText';
import wallet from './images/truewallet.png'
import { FontAwesome, Entypo} from '@expo/vector-icons';

import {LinearGradient} from 'expo-linear-gradient'
import sparkhome from '../../assets/sparkbg.png';

const Icon = ({ iconBackground,direction,margPercent,margRight,marBot}) => {
    return (
        <View  style={{
            borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 3,
            width: Dimensions.get('window').width * 0.05,
            height: Dimensions.get('window').width * 0.05,
            backgroundColor:iconBackground ? iconBackground :'#fff',
                // justifyContent: 'center',
            alignSelf: direction,
            marginLeft:wp(margPercent),
            marginTop:wp('9%'),
            // paddingTop:hp('5%')
            marginRight:margRight,
            marginBottom:marBot,
            }}  
        />
    )
};
  
Icon.propTypes = {
    visible: PropTypes.bool,
    checkmark: PropTypes.bool,
    iconBackground: PropTypes.string,
};
  


const ButtonWIthText =({text,background,textColor,onPress}) => {
    return(
        <>
            <TouchableHighlight 
                style={{backgroundColor:background,
                    alignSelf:"center",
                    width:wp('60%'),
                    height:hp('10%'),
                    alignItems:"center",
                    justifyContent:"center",
                    borderRadius:12,
                    marginVertical:hp('2%'),
                    fontWeight:"bold",
                    activeOpacity:0.6,
                    underlayColor:"#DDDDDD",

                }}
                onPress={onPress}
            >
                <Text style={{fontSize:hp('4%'),color:textColor}}>
                    {text}
                </Text>
            </TouchableHighlight>
        </>
    )
}

ButtonWIthText.propTypes={
    text:PropTypes.string,
    background:PropTypes.string,
   
}

const Welcome = ({route,navigation}) => {
 

    return(
        <Container>
            <LinearGradient start={{x:0.0,y:0.4}} end={{x:0.5,y:1.0}} location={[0,1]} colors={['#2D97DA','#2249D6']} style={{flex:1}} >
                {/* Top Section */}
                <StatusBar barstyle="light-content" translucent={true} backgroundColor="transparent" />
                <TouchableOpacity
                    onPress={() => navigation.navigate('AdminStack')}
                >
                    <View>
                        <Entypo 
                            name="menu" 
                            size={50} 
                            color="black" 
                            style={{
                                alignSelf:"flex-end",
                                marginTop:hp('4%'),
                                marginRight:wp('10%')
                            }}
                        />
                        
                    </View>
                </TouchableOpacity> 
                {/* <View>
                    <Text style={{textAlign:"center",marginBottom:hp('3%'),fontSize:hp('5%'),color:"green",fontWeight:"bold"}}>
                        Spark Remit
                    </Text>
                </View> */}
                <View style={{flex:2,flexDirection:'row',
                    justifyContent:'center',alignItems:'flex-start'
                }} >
                   <Image resizeMode='contain' style={{width:wp('90%'),height:hp('40%')}} source={sparkhome} />
                </View>
                {/* Button and text section */}
                <View style={{flex:3,justifyContent:'center',paddingHorizontal:wp('6%')}} >
                    <View style={{position:'relative',flexDirection:'column',
                    backgroundColor:'rgba(255,255,255,0.3)',height:hp('45%'),
                    borderRadius:15,paddingTop:20,paddingHorizontal:wp('5%')}} >
                        <Text style={{
                            fontSize:25,
                            color:'#FFD93D',
                            fontWeight:"bold",
                            alignSelf:'center',
                            textAlign:'center',fontWeight:"bold"
                        }} >
                            Send and receive money seamlessly
                        </Text>

                        {/* <Text style={{fontSize:15,fontFamily:'Roboto-Regular',
                            alignSelf:'center',
                            paddingTop:20,color:'#fff',textAlign:'center',width:wp('40%')
                        }} > onPress={() => navigation.navigate('UserAuth')}
                            you can trade and buy and sell crypto coins here very easily and reliably
                        </Text> */}
                        <TouchableOpacity onPress={()=> navigation.navigate('UserAuth')} 
                            style={{position:'relative',width:'100%',backgroundColor:'#fff',height:50,borderRadius:10,
                            justifyContent:'center',alignItems:'center',marginTop:hp('5%')}} >
                            <Text style={{
                                fontSize:20,fontWeight:"bold",color:'#357C3C'}} >
                                Wallet</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> navigation.navigate('Home')} 
                            style={{position:'relative',width:'100%',backgroundColor:'#fff',height:50,borderRadius:10,
                            justifyContent:'center',alignItems:'center',marginTop:hp('3%')}} >
                            <Text style={{
                                fontSize:20,fontWeight:"bold",color:'#357C3C'}} >
                                My Profile</Text>

                        </TouchableOpacity>

                    </View>

                </View>    

            </LinearGradient>
            
        </Container>
    )
  
}

const styles = StyleSheet.create({
    header:{
        // fontFamily:"Questrial",
        fontSize:hp('5%'),
        paddingTop:hp('2.7%'),
        alignSelf:"center"
    },
    headerBig:{
        fontSize:hp('5%'),
        alignSelf:"center"
    },
    // image:{
    //     resizeMode:"contain",
    //     alignSelf:"center",
    //     height:hp('28%'),
    //     width:wp('70%'),
    // },
    imageContainer:{
        alignItems:"center",
    }
})

export default Welcome; 

//najeera, hoima road 070
