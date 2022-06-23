import {useRoute} from "@react-navigation/native";
import React,{useState,useEffect} from 'react'
import {Text,View,StyleSheet,Image,TouchableOpacity,StatusBar,
    ScrollView, Touchable, FlatList,ActivityIndicator} from 'react-native'
//import LinearGradient from 'react-native-linear-gradient'
import {LinearGradient} from 'expo-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome'
import {dummyData} from '../constants'
import ProfitIndicator from '../components/ProfitIndicator'
import ActionCenter  from '../components/ActionCenter'
import { Fontisto,Entypo,FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons';

import { useFonts } from 'expo-font'
import { TouchableHighlight } from 'react-native-gesture-handler'
import {useSelector,useDispatch} from  'react-redux';
//====adding flutterwave====



const Dashboard = ({navigation}) => {
    
    //==use the useSelector to retrieve the stored email
    const email = useSelector(state => state.wallet.user_email)
    console.log(email)//first confirm  this email

    //===cz target is to fetch the wallet _user details'

    const [isFetching, setFetching] = useState(false);
    const [details, setDetails] = useState({});//since its an object




    const fetchUserDetails = async () => {
        try{
            const response = await fetch(`https://pregcare.pythonanywhere.com/api/wallet/wallet_details/?email=${email}`);
            const data = await response.json();
            setDetails(data);
            console.log(details);//getting the details
            setFetching(false);
        }catch(e){
            console.log(e);
            setFetching(false);
        }
    }
    //==now the useEffect
    useEffect(() => {
        let isMount = true;
        setFetching(true)
        //call the fetch details
        fetchUserDetails();
        return () => {
            isMount = false
        }
    }, []);
    const {balance,owner,status} = details;
    return  (
        //destructure the details
        
        <View style={{flex:1}}>
            <StatusBar barStyle='light-content' translucent={true} backgroundColor='transparent' />
                <LinearGradient start={{x:0.0,y:0.4}} end={{x:0.5,y:1.0}} location={[0,1]} colors={['#2D97DA','#2249D6']}
                    style={{flex:1.2,flexDirection:'column'}}
                >
                    <View style={{flexDirection:'column',marginTop:hp('10%'),paddingHorizontal:'5%'}} >
                     <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}} >
                         {/* Welcome message and name */}
                         <View style={{flexDirection:'column'}} >
                           <Text style={{fontSize:20,color:'#fff',fontWeight:"bold"}} >
                               Welcome Back
                               {/* {navigation.getParam('email')} */}
                            </Text>
                            <Text style={{color:'#fff',fontSize:22,color:"yellow"}}>
                                {owner}
                            </Text>
                         </View>

                         {/* Bell icon and profile pic */}
                        <View style={{flexDirection:'row',alignItems:'center'}} >
                            <Icon name='bell' size={30} color="#fff" />
                             {/* <Image source={require('../../assets/images/avatar.jpg')} resizeMode='cover' style={{width:40,height:40,borderRadius:20,marginLeft:15}} /> */}
                             <FontAwesome name="user-circle-o" 
                                size={40} color="black" style={{marginHorizontal:wp('5%')}}
                            />
                        </View>
                     </View>

                    {/*amount*/}
                    <View style={{flexDirection:'row',marginTop:25,
                        justifyContent:'space-between',alignItems:'center',marginBottom:hp('2.6%')}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{color:'#fff',fontWeight:"bold",fontSize:28}}>
                                UGX: {balance}
                            </Text>
                        </View>
                        {/* profit loss indicator */}
                        <ProfitIndicator type="I" percentage_change={dummyData.portfolio.changes} />
                    </View>
                    </View>


                    {/* Action Center */}
                    <View style={{flex:2.5,backgroundColor:'#fff',paddingHorizontal:wp('5%')}}>
                        <View style={{flexDirection:'row',backgroundColor:'#fff',height:hp('15%'),width:'100%',alignItems:'center',justifyContent:'space-around',borderRadius:10,borderWidth:1,borderColor:'rgba(255,255,255,0.1)',elevation:10,shadowColor:'#000',shadowRadius:10,marginTop:-22}} >

                            <ActionCenter 
                                img_src={require('../../assets/icons/top-up.png')} 
                                img_text="Top-Up" 
                                onPress={() => navigation.navigate('MobileMoney')}
                            />

                            <ActionCenter img_src={require('../../assets/icons/buy.png')} img_text="Send" />

                            <ActionCenter img_src={require('../../assets/icons/withdraw.png')} img_text="WithDraw" />

                        </View>


                        <View style={{flexDirection:'column'}} >
                            {/* Text and button */}
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:hp('4%')}} >
                                <Text style={{color:'#333',fontSize:22}} >My Actions</Text>
                               
                            </View>


                           
                            <View style={{flexDirection:"row",flexWrap:"wrap"}}>
                                <TouchableOpacity 
                                    style={{
                                        height:hp('20%'),width:wp('40%'),borderWidth:1,
                                        borderColor:'#ddd',backgroundColor:'#fff',
                                        borderRadius:15,marginRight:10,marginTop:10
                                    }}  
                                    onPress={() => navigation.navigate('AddCard')}
                                    
                                >
                                    


                                    {/* coin and price indicator */}
                                    <View style={{marginTop:20,justifyContent:'space-around',alignItems:'center'}} >
                                        {/* Coin Price */}

                                        <View style={{flexDirection:'column'}} >
                                            <Fontisto name="credit-card" size={40} color="black" />
                                            <Text style={{color:'#333',fontSize:20}} >
                                                Cards</Text>
                                            
                                        </View>

                                        {/* indicator */}
                                        {/* <ProfitIndicator type={item.type} percentage_change={item.changes} /> */}

                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={{position:'relative',flexDirection:'column',height:hp('20%'),width:wp('40%'),
                                    borderWidth:1,borderColor:'#ddd',
                                    backgroundColor:'#fff',borderRadius:15,marginRight:10,marginTop:10}}  
                                    onPress={() => navigation.navigate('Statistics')} 
                                >
                                
                                    {/* coin and price indicator */}
                                    <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-around',alignItems:'center'}} >
                                        {/* Coin Price */}

                                        <View style={{flexDirection:'column'}} >
                                            
                                            <Entypo name="bar-graph" size={40} color="black" />
                                            <Text style={{color:'#333',fontSize:20}} >
                                                Statistics</Text>
                                        </View>

                                        {/* indicator */}
                                        {/* <ProfitIndicator type={item.type} percentage_change={item.changes} /> */}

                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={{position:'relative',flexDirection:'column',height:hp('20%'),width:wp('40%'),
                                    borderWidth:1,borderColor:'#ddd',backgroundColor:'#fff',
                                    borderRadius:15,marginRight:10,marginTop:10}}  
                                    onPress={() => navigation.navigate('Transactions')} 
                                >
                                    {/* coin and price indicator */}
                                    <View 
                                        style={{flexDirection:'row',marginTop:20,justifyContent:'space-around',alignItems:'center'}}
                                    >
                                        {/* Coin Price */}

                                        <View style={{flexDirection:'column'}} >
                                           
                                            <FontAwesome name="exchange" size={40} color="black" />
                                            <Text style={{color:'#333',fontSize:20}} >
                                                Transactions
                                            </Text>
                                        </View>

                                        {/* indicator */}
                                        {/* <ProfitIndicator type={item.type} percentage_change={item.changes} /> */}

                                    </View>
                                </TouchableOpacity>

                                <View style={{position:'relative',flexDirection:'column',height:hp('20%'),width:wp('40%'),borderWidth:1,borderColor:'#ddd',backgroundColor:'#fff',borderRadius:15,marginRight:10,marginTop:10}}  >
                                
                                    {/* coin and price indicator */}
                                    <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-around',alignItems:'center'}} >
                                        {/* Coin Price */}

                                        <View style={{flexDirection:'column'}} >
                                            <MaterialCommunityIcons name="contacts" size={45} color="black" />
                                            <Text style={{fontSize:25}}>Contacts</Text>
                                        </View>

                                        {/* indicator */}
                                        {/* <ProfitIndicator type={item.type} percentage_change={item.changes} /> */}

                                    </View>
                                </View>

                            </View>
                
                        </View>
                    </View>

                </LinearGradient>

            
        </View>
    )
}

const styles = StyleSheet.create({
    
})
export default Dashboard;