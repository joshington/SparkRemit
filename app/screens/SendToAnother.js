import React, {Component} from 'react'
import {MaterialCommunityIcons,AntDesign,Ionicons} from '@expo/vector-icons'
import {Flag} from 'react-native-svg-flagkit'
import {View,Text,TextInput,StatusBar,TouchableOpacity} from 'react-native';
import LoginTextInput from '../components/LoginTextInput/LoginTextInput';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const SendToAnother =({route,navigation}) => {
        return (
            <View style={{padding:hp('4%'),alignSelf:"center"}}>
                <StatusBar translucent={false} barStyle="light-content"/>
                <View style={{marginHorizontal:30,marginTop:30}}>
                    <View style={{alignSelf:"center"}}>
                        <Ionicons name="ios-person" size={80} color="black" />
                    </View>
                    <View style={{flexDirection:"row",marginTop:hp('6%'),alignItems:"flex-end"}}>
                        <Text style={{textAlign:"right",fontSize:20,marginRight:50}}>UGX:</Text>
                        <TextInput 
                            editable={true}
                            // value={value}
                            // onChangeText={text => onChangeAmount(text)}
                            placeholder="E.g 10,000"
                            placeholderTextColor="#000"
                            underlineColorAndroid="#000"
                            width={150}
                            height={35}
                            textAlign="center"
                            keyboardType="numeric"
                            autoFocus={true}
                        />
                    </View>
                    
                    <Text style={{fontSize:15,textAlign:"center"}}>Min 2000 & Max 1,000,000</Text>

                    <View style={{marginVertical:hp('6%'),display:"flex",flexDirection:"row"}}>
                        <Text style={{fontSize:20}}>Mobile No: </Text>
                        <TextInput
                            placeholder="Recipient Number"
                            style={{display:"flex",
                                height:hp('5%'),width:wp('50%'),borderRadius:wp('8%'),borderWidth:wp('0.3%')
                            }}
                        />
                        {/* <TextInput 
                            editable={true}
                            // value={value}
                            // onChangeText={text => onChangeAmount(text)}
                            placeholder="E.g 10,000"
                            placeholderTextColor="#000"
                            underlineColorAndroid="#000"
                            width={150}
                            height={35}
                            textAlign="center"
                            keyboardType="numeric"
                            autoFocus={true}
                        /> */}
                    </View>
                   
                    <TouchableOpacity style={{borderRadius:18,backgroundColor:"#20B2AA",
                        width:wp('60%'),height:40,alignItems:"center",alignSelf:"center"
                    }}
                        onPress={() => navigation.navigate('MyWallet')}
                    >
                        <Text style={{fontSize:22,fontWeight:"bold"}}>Next</Text>
                    </TouchableOpacity>
                </View>
            
            </View>
        )
        
}
export default SendToAnother;