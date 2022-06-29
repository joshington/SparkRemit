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



const AddCard = () => {
    return (
        <View style={{flex:1}}>

            <View style={{alignItems:"center",marginVertical:hp('5%')}}>
                <FontAwesome name="credit-card-alt" size={70} color="black" />
            </View>
            <View style={{marginHorizontal:wp('7%')}}>
                <Text style={{fontSize:25}}>ADD CARD</Text>
                <View>
                    <View style={{marginVertical:hp('2.3%'),display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}>
                        <View>
                            <Text style={{fontSize:15}}>Card Name</Text>
                            <TextInput
                                style={{borderWidth:1,height:40,width:wp('40%')}} 
                                placeholder='BBOSA'  />
                        </View>
                        <View>
                            <Text style={{fontSize:15}}>Security Code</Text>
                            <TextInput
                                style={{borderWidth:1,height:40,width:wp('40%')}} 
                                placeholder='5678'  />
                        </View>
                        
                    </View>
                    <View style={{marginVertical:hp('5%'),display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}>
                        <View>
                            <Text style={{fontSize:15}}>Card Number</Text>
                            <TextInput
                                style={{borderWidth:1,height:40,width:wp('40%')}} 
                                placeholder='BBOSA'  />
                        </View>
                        <View>
                            <Text style={{fontSize:15}}>Expiry Date</Text>
                            <TextInput
                                style={{borderWidth:1,height:40,width:wp('40%')}} 
                                placeholder='5678'  />
                        </View>
                    </View>
                </View>
                <TouchableHighlight style={{height:hp('6%'),borderRadius:hp('3%'),
                    alignSelf:"center",width:wp('80%'),backgroundColor:"green"}}>
                    <Text style={{textAlign:"center",fontSize:20,color:"white",fontWeight:"bold"}}>ADD CARD</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default AddCard;