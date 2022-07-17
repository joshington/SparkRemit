
import React, {useState,useEffect} from 'react';
import {Text,View,StatusBar,TouchableOpacity,StyleSheet} from 'react-native';
import { Fontisto,Entypo,FontAwesome,Ionicons,
    MaterialCommunityIcons} from '@expo/vector-icons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux'
import { storeRegEmail} from '../actions';

const LeftRight = ({item1,item2, check=false,onPress,money=false}) => {
    return (
        <View>
                <TouchableOpacity style={{height:hp('6%')}} onPress={onPress}>
                    <View style={{flexDirection:"row",display:"flex",justifyContent:"space-around"}}>
                        <Text style={{fontSize:20}}>{item1}</Text>
                        <Text style={{fontSize:20,color:check ? "green" : "",fontWeight:"bold"}}>{item2}</Text>
                    </View>
                </TouchableOpacity>
            <View  style={{height:StyleSheet.hairlineWidth,width:wp('95%'),backgroundColor:"black",marginHorizontal:wp('5%')}}  />
        </View>
        
    )
}


const MyProfile = ({navigation}) => {

    const [details, setDetails] = useState({});

    const email = useSelector(state => state.wallet.user_email)

    const dispatch = useDispatch()

    const fetchUserDetails = async () => {
        try{
            const response = await fetch(`https://pregcare.pythonanywhere.com/api/wallet/wallet_details/?email=${email}`);
            const data = await response.json();
            setDetails(data);
            // console.log(details);//getting the details
            
        }catch(e){
            // console.log(e);
            
        }
    }

    useEffect(() => {
        let isMount = true;
     
        //call the fetch details
        fetchUserDetails();

        //also get the transactions
        return () => {
            isMount = false
            setDetails({})
            //doing a cleanup after the fetching is done
        }
    }, []);
    const {balance,owner,status,currency,with_limit} = details;
    return (
        <View style={{flex:1}}>
            <StatusBar translucent={true} barStyle="light-content"/>
            {/* <View
                style={{ backgroundColor:"green",borderBottomLeftRadius:30,
                borderBottomRightRadius:30,height:hp('15%'),paddingHorizontal:wp('5%'),alignItems:"center"}}
            >
                <Text style={{fontSize:20,marginTop:hp('7%'),color:"white",fontWeight:"bold"}}>My Profile</Text>
            </View> */}
            <View style={{alignItems:"center",marginTop:hp('5%')}}>
                <FontAwesome name="user-circle-o" 
                    size={70} color="black" style={{marginHorizontal:wp('5%')}}
                />
            </View>
           
            <Text style={{fontSize:20,textAlign:"center",color:"green"}}>{owner}</Text>
            <View style={{flexDirection:"row",display:"flex",justifyContent:"space-around",marginTop:hp('5%')}}>
                <TouchableOpacity style={{height:hp('9%'),
                    backgroundColor:"green",paddingVertical:hp('2%'),width:wp('40%'),borderRadius:hp('2%')}}>
                    <Text style={{textAlign:"center",fontSize:20,color:"white"}}>Share Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:hp('9%'),
                    backgroundColor:"green",paddingVertical:hp('2%'),width:wp('40%'),borderRadius:hp('2%')}}
                    onPress={() => {
                        dispatch(storeRegEmail(""))
                        //since email controls everything now i just want to remove the email from the state
                        navigation.navigate("Welcome")
                    }}
                >
                    <Text style={{textAlign:"center",fontSize:20,color:"white"}}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:hp('1%')}}>
                <View  style={{height:StyleSheet.hairlineWidth,width:wp('95%'),backgroundColor:"black",marginHorizontal:wp('5%')}}  />

                <LeftRight  item1="Current Balance" item2={balance} check />
                <LeftRight  
                    item1="Withdraw Limit" 
                   item2={with_limit}

                   check
                />
                <LeftRight  
                    item1="Check Rates" 
                    item2={
                        <Ionicons name="chevron-forward" size={24} color="black" />
                    } 
                />
                <LeftRight  
                    item1="Add Account" 
                    item2={
                        <Ionicons name="chevron-forward" size={24} color="black" />
                        
                    } 
                    onPress={() => navigation.navigate("AddAccount")}
                />
                <LeftRight  
                    item1="Add Card" 
                    item2={
                        <Ionicons name="chevron-forward" size={24} color="black" />
                    } 
                    onPress={() => navigation.navigate("AddCard")}
                />
               <LeftRight  
                    item1="Settings" 
                    item2={
                        <Ionicons name="chevron-forward" size={24} color="black" 
                        />
                    } 
                    onPress={() => navigation.navigate("UserSettings")}
                    
                />
                {/* <LeftRight  
                    item1="Settings" 
                    item2={
                        <Ionicons name="chevron-forward" size={24} color="black" />
                    } 
                /> */}
            </View>
        </View>
    )
}


export default MyProfile;

