import React, {useState,useEffect} from "react";
import PropTypes from 'prop-types';
import { Switch,StatusBar,View,Text,Platform,CheckBox, TouchableOpacity, TouchableHighlight, 
    Image,Dimensions,TextInput} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Container from "../components/Container/Container";
import { AntDesign,FontAwesome5,Ionicons} from '@expo/vector-icons';
import TextHeader from "../components/TextHeader/TextHeader";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto} from '@expo/vector-icons';
import ButtonWIthText from "../components/ButtonWithText/ButtonWithText";

import image from './images/contact.png';

import TextInLine from "../components/TextInLine/TextInLine";


const Separator = ({dashColor,viewHeight,maTop}) => {
    return(
        <View  
            style={{backgroundColor:dashColor,height:viewHeight,
                marginTop:maTop
            }}
        />
    )
}



const WalletCard = ({amount,amountBTC,dollarAmount,percent}) => {
    return(
        <View style={{flexDirection:"row",alignSelf:"center",marginTop:hp('2%')}}>
            <View style={{width:wp('18%'),height:hp('30%'),
                backgroundColor:"black",flexDirection:"column",borderTopLeftRadius:hp('3%'),
                borderBottomLeftRadius:hp('3%'),justifyContent:"space-around",alignItems:"center"}}
            >
                <Text style={{fontSize:hp('2.5%'),color:"white",transform:[{rotate: '-90deg'}],
                    fontWeight:"bold",textAlign:"center"}}
                >
                    WALLET</Text>
                <Text style={{fontSize:hp('5%'),color:"white",transform:[{rotate: '-90deg'}],
                    textAlign:"center",fontWeight:"bold"
                }}>
                    ...
                </Text>
            </View>
            <View style={{height:hp('30%'),width:hp('37%'),backgroundColor:'blue',alignSelf:"center",
                borderTopRightRadius:hp('4%'),borderBottomRightRadius:hp('4%'),
                marginLeft:wp('2%')
            
            }}>
                <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:hp('3%')}}>
                    <TextHeader 
                        headerText="Estimated Balance"
                        textColor="white"
                        size={hp('2.5%')}
                        isBold
                    />
                    <View style={{width:wp('17%'),backgroundColor:"gray",
                        borderRadius:hp('10%'),marginTop:hp('4%')}}>
                        <Text style={{fontWeight:"bold",textAlign:"center"}}>UGX</Text>
                    </View>
                </View>
                <Text style={{fontWeight:"bold",color:"white",marginLeft:wp('4%'),fontSize:hp('3%')}}>
                    UGX {amount}</Text>
                {/* <Text style={{fontWeight:"bold",color:"white",marginLeft:wp('4%'),fontSize:hp('3%')}}>
                    {amountBTC} BTC
                </Text> */}
                <View style={{flexDirection:"row",marginTop:hp('5%')}}>
                    <Text style={{fontWeight:"bold",color:"white",marginLeft:wp('4%'),
                        fontSize:hp('3%')
                    }}>
                        UGX {dollarAmount}
                    </Text>
                    <AntDesign name="caretup" size={30} color="green" 
                        style={{marginLeft:wp('5%')}}
                    />
                    <Text style={{fontWeight:"bold",color:"green",marginLeft:wp('4%'),
                        fontSize:hp('3%')
                    }}>
                        +{percent}%
                    </Text>
                </View>
                
            </View>
        </View>
      
    )
}
7
const MyWallet = ({route,navigation}) => {
    return(
        <Container>
            <StatusBar />
            <View style={{flexDirection:"row",marginTop:hp('3%'),marginLeft:wp('35%')}}>
                <TextHeader 
                    headerText="My Wallet"
                    size={hp('4%')}
                    isBold
                />
                <Ionicons name="ios-notifications-outline" size={35} color="black" 
                    style={{marginLeft:wp('14%')}}
                />
                
            </View>
            <WalletCard 
                amount={2500.00}
                amountBTC={1.5264}
                dollarAmount={492.23}
                percent={8.9}
            />
            <View style={{flexDirection:"row",alignSelf:"center",marginVertical:hp('0.2%'),
                justifyContent:"space-between",padding:hp('2%')
            }}>
                <TouchableOpacity style={{marginRight:wp('9%'),alignItems:"center"}}
                    onPress={() => {navigation.navigate('Deposit')}}
                >
                    <Image  
                        source={require('./images/receive.png')}
                        style={{borderRadius:70,width:wp('15%'),height:hp('8%'),
                        }}
                                // resizeMode="contain"
                                // style={{width: 60, height: 60}}
                    />
                   <Text style={{textAlign:"center",fontWeight:"bold",fontSize:hp('3.2%'),
                        color:"#0096FF"
                    }}>
                       Deposit</Text>
                </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('Withdraw')}>
                    <Image 
                        source={require('./images/withdraw.png')}
                        style={{borderRadius:70,width:wp('15%'),height:hp('8%')}}
                                    // resizeMode="contain"
                                    // style={{width: 60, height: 60}}
                    />
                     <Text style={{textAlign:"center",fontWeight:"bold",fontSize:hp('3.2%'),
                         color:"#0096FF"
                    }}>
                         Withdraw</Text>
               </TouchableOpacity>
               
            </View>
            {/* ====adding the button with send option ==========*/}
            <ButtonWIthText text="Send Money" background="blue" textColor="white" onPress={() => navigation.navigate('Send')} />
            {/* <TextHeader 
                headerText="My Coins"
                direction="flex-start"
                size={hp('4%')}
                isBold
                marTop={hp('4%')}
                marLeft={wp('4%')}
            /> */}
            {/* <View style={{alignSelf:"center",marginTop:hp('1%'),flexDirection:"row",
                
            }}> */}
                {/* <View style={{height:hp('10%'),width:wp('18%'),backgroundColor:"black",
                    alignItems:"center",justifyContent:"center",borderRadius:hp('1%')}}>
                    <FontAwesome5 name="bitcoin" size={36} color="orange" />
                </View> */}
                {/* <View style={{marginLeft:wp('4%')}}>
                    <Text style={{fontWeight:"bold"}}>BTC</Text>
                    <Text style={{marginTop:hp('3%'),color:"gray",fontWeight:"bold"}}>$31990</Text>
                </View>
                <Text style={{color:"green",fontWeight:"bold"}}>8.9%</Text> */}
                {/* <Image 
                    source={require('./images/curve.png')}
                    style={{borderRadius:70,width:wp('18%'),height:hp('8%')}}
                            // resizeMode="contain"
                            // style={{width: 60, height: 60}}
                /> */}
                {/* <View style={{marginLeft:wp('3%')}}>
                    <Text style={{fontWeight:"bold"}}>$25k</Text>
                    <Text style={{marginTop:hp('3%'),color:"gray",fontWeight:"bold"}}>
                        1.5264 BTC</Text>
                </View> */}
            {/* </View> */}
            {/* <View 
                style={{backgroundColor:"#F2F4F4",height:hp('0.6%'),marginTop:hp('15%')}}
            /> */}
            {/* <View style={{height:hp('12%'),marginTop:hp('0.1%'),
                flexDirection:"row",justifyContent:"space-between",
                alignItems:"center",shadowColor:"#000",shadowOffset:{width:0, height:10},
                shadowOpacity:0.53,shadowRadius:13.97,elevation:21
            }}
            > */}
                {/* <View>
                    <Image 
                        source={require('./images/wallet.png')}
                        style={{width:wp('15%'),height:hp('8%'),
                        marginHorizontal:wp('8%')}}
                                    // resizeMode="contain"
                                    // style={{width: 60, height: 60}}
                    />
                    <Text style={{textAlign:"center",color:"#0096FF"}}>Wallet</Text>
                </View> */}
                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('TradeGraph')}
                >
                    <Image 
                        source={require('./images/trade.png')}
                        style={{width:wp('26%'),height:hp('14%'),marginBottom:hp('11%')}}
                                        // resizeMode="contain"
                                        // style={{width: 60, height: 60}}
                    />
                </TouchableOpacity> */}
                {/* <View style={{marginRight:wp('5%')}}>
                    <Ionicons name="ios-settings-sharp" size={43} color="gray" />
                    <Text style={{textAlign:"center",color:"gray"}}>Settings</Text>
                </View> */}

            {/* </View> */}
            
        </Container>
    )
}

export default MyWallet;