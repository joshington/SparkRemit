import React,{useState,useEffect} from 'react';
import {View,Text,TouchableOpacity} from "react-native";
import { 
    heightPercentageToDP  as hp,
    widthPercentageToDP as wp} from 'react-native-responsive-screen';





const SelfMthd = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <View style={{padding:hp('6%'),alignSelf:"center"}}>
                <TouchableOpacity style={{height:hp('5%'),
                    backgroundColor:"green",width:wp('60%'),
                    borderRadius:hp('1%'),marginBottom:hp('3%')}}
                    onPress={() => navigation.navigate("BankWithdraw")}
                >
                    <Text style={{textAlign:"center",color:"white",fontSize:20,fontWeight:"bold"}}>Bank Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:hp('5%'),
                    backgroundColor:"green",width:wp('60%'),borderRadius:hp('1%')}}
                    onPress={() => navigation.navigate("WithdrawAmount")}
                >
                    <Text style={{textAlign:"center",color:"white",fontSize:20,fontWeight:"bold"}}>MobileMoney</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SelfMthd;