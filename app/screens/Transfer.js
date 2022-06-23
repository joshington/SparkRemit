import React from 'react';
import {Text,View,StyleSheet,Image,
    TouchableOpacity,TouchableHighlight,StatusBar,ScrollView, Touchable, FlatList,TextInput} from 'react-native'
import { VictoryBar, VictoryChart,VictoryLine, VictoryTheme } from "victory-native";
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {
    LineChart
} from "react-native-chart-kit"
import EStyleSheet from 'react-native-extended-stylesheet';
import { FontAwesome } from '@expo/vector-icons';
import avatar from '../../assets/images/avatar.jpg'
import { Entypo } from '@expo/vector-icons';


const contacts = [
    {
        "name":"Bbosa",
        "avatar":avatar
    },
    {
        "name":"Lutalo",
        "avatar":avatar
    },
    {
        "name":"Mapeera",
        "avatar":avatar
    },
    {
        "name":"Raymond",
        "avatar":avatar
    }
]

const Transfer = () => {
    return (
        <View style={{flex:1}}>
            <View style={{height:hp('12%'),backgroundColor:"green"}}>
            </View>
            <Text style={{fontSize:25,textAlign:"center"}}>TRANSFER</Text>
            <Text style={{fontSize:20}}>Select a Contact</Text>
            <Text style={{fontSize:15}}>Transfer to:</Text>
            <View style={{display:"flex",flexDirection:"row",
                marginTop:hp('3%'),alignItems:"center"}}>
                <Entypo name="user" size={28} color="black" />
                <TextInput
                    style={{borderWidth:1,height:30,width:wp('40%')}} 
                    placeholder='BBOSA'  
                /> 
            </View>
            <Text>Enter Amount</Text>
            <TextInput
                style={{borderWidth:1,height:30,width:wp('40%')}} 
                placeholder='UGX 200000'  
            /> 
            <Text>Description</Text>
            <TextInput
                style={{borderWidth:1,height:30,width:wp('40%')}} 
                placeholder='Enter description here'
                multiline={true}  
            /> 
            
        </View>
    )
}

export default Transfer;