import React,{useState,useEffect} from 'react'
import {Text,View,StyleSheet,Image,TouchableOpacity,TouchableHighlight,StatusBar,ScrollView, Touchable, FlatList} from 'react-native'
//import LinearGradient from 'react-native-linear-gradient'
import {LinearGradient} from 'expo-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import avatar from '../../assets/images/avatar.jpg'
import {useSelector,useDispatch} from  'react-redux';

import {getWalletDetails,getTransactions} from '../actions';
import Separator from '../components/Separator'
//importing styled componnets
// import styled from 'styled-components/native'



//card Component
// const Container = styled.View`
//     flex:1;
//     align-items:center;
// `;

const Button = ({text,buttonBg,ht,wd,ft,mV}) => {
    return (
        <TouchableHighlight style={{backgroundColor:buttonBg,
            height:ht,width:wd,borderRadius:10,marginVertical:mV}}>
            <Text style={{textAlign:"center",fontSize:ft,fontWeight:"bold"}}>{text}</Text>
        </TouchableHighlight>
    )
}

//now te card balance component
const Card = ({bg,balance}) => {
    return (
        <View style={{backgroundColor:bg,padding:wp('6%'),
            marginHorizontal:wp('6%'),width:wp('80%'),borderRadius:10,height:hp('25%'),alignSelf:"center"}}>
            <Text style={{fontSize:20,fontWeight:"bold",color:"green"}}>My Wallet</Text>
            <Text style={{fontSize:24, color:"white",fontWeight:"bold"}}>UGX {balance}</Text>
            <Button  text="Top up" buttonBg="gray" ht={hp('6%')} wd={wp('40%')} ft={20} mV={hp('3%')} />
        </View>
    )
   
}


//cpt with icon and amount either sent or received
const TransactImage = ({day,date,category,amount}) => {
    return (
        <>
            <View style={{display:"flex",flexDirection:"row",backgroundColor:"green",padding:hp('2s%'),
                borderRadius:10,
                justifyContent:"space-between",marginHorizontal:wp('6%'),marginTop:hp('3%')}}>
                <View>
                    <Text style={{fontSize:18}}>{day}</Text>
                    <Text style={{color:"white",fontWeight:"bold"}}>{date}</Text>
                </View>
                <View>
                    <Text style={{fontSize:22}}>{category}</Text>
                    <Text style={{fontSize:20,color:"yellow",fontWeight:"bold"}}>UGX: {amount}</Text>
                </View>
            </View>
            <Separator />
        </>
        
        
    )
}

const Transactions = ({route,navigation}) => {
    //fetch the user email this is our key ==man
    const email = useSelector(state => state.wallet.user_email)

    //===man its better to get everything from redux
    //==fetching the wallet details
    //==but first dispatch the action ====
    const dispatch = useDispatch(); //==our use dispatch here
    const wallet_details = useSelector(state => state.wallet.wallet_details) ;//have now gotten the wallet details

    const last7 = useSelector(state => state.wallet.last7);
  
   
    let counter = 0;
    const [isfetching, setFetching] = useState(false);

    useEffect(() => {
        let isMount = true;
        setFetching(true)
        dispatch(getWalletDetails(email));//have dispatched the action

        //also get the transactions
        dispatch(getTransactions(email))
        return () => {
            isMount = false
        };
    }, []);
    
    return (
        <View style={{flex:1,marginTop:hp('2%')}}>
            {/* <StatusBar barStyle='light-content' translucent={false} backgroundColor='transparent' /> */}
            <Card  bg="#ffcc00" balance={wallet_details.balance} />
            <View>
                <Text style={{fontSize:20,marginHorizontal:wp('9%'),marginTop:hp('3%')}}>Last 7 days</Text>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:wp('9%')}}>
                    <Text style={{fontSize:18,color:"green"}}>Day/Date</Text>
                    <View>
                        <Text style={{fontSize:18}}>Total Spending</Text>
                        <Text style={{fontSize:18,color:"green",fontWeight:"bold"}}>UGX 0</Text>
                    </View>
                </View>
                <View style={{height:StyleSheet.hairlineWidth,
                    marginHorizontal:wp('4%'),
                    width:wp('95%'),backgroundColor:"black"}} />
                <View>
                    {
                        counter < 1 
                        ? <Text style={{textAlign:"center",fontSize:22,marginTop:hp('8%'),fontWeight:"bold"}}>
                            No Transactions Found</Text>
                        : (
                            last7.last7transactionstop.map((trans,index)=>{
                                counter = counter+1;
                                return(
                                    <TransactImage 
                                        key={trans.index}
                                        day={trans[1]}
                                        date={trans[2]}
                                        category={trans[3]}
                                        amount={trans[0]}
                                    />
                                )
                            })
                        )
                           
                            
                        

                    }
                    
                    {/* 
                    {/* <TransactImage />
                    <TransactImage /> */} 
                </View>
            </View>
        </View>
    )
}

export default Transactions;