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
import {getTransactions} from '../actions';
import Separator from '../components/Separator'




//cpt with icon and amount either sent or received
const TransactImage = ({day,date,category,amount}) => {
    return (
        <>
            <View style={{display:"flex",flexDirection:"row",backgroundColor:"green",padding:hp('2%'),
                borderRadius:10,
                justifyContent:"space-between",marginTop:hp('3%'),width:wp('90%')}}>
                <View>
                    <Text style={{fontSize:18}}>{day}</Text>
                    <Text style={{color:"white",fontWeight:"bold"}}>{date}</Text>
                </View>
                <View>
                    <Text style={{fontSize:22}}>{category}</Text>
                    <Text style={{fontSize:20,color:"yellow",fontWeight:"bold"}}>UGX: {amount}</Text>
                </View>
            </View>
          
        </>
        
        
    )
}

const Dashboard = ({navigation}) => {
    
    //==use the useSelector to retrieve the stored email
    const email = useSelector(state => state.wallet.user_email)
    //console.log(email)
    const logEmail = useSelector(state => state.register.logEmail);
    console.log(logEmail)//print out the email
    //===aslo the loggedIn condition will clear some air

    const isLog = useSelector(state => state.register.loggedIn)//checking will help me tell the email to give to user
    //===cz target is to fetch the wallet _user details'

    const [isFetching, setFetching] = useState(false);
    const [details, setDetails] = useState({});//since its an object

    const dispatch = useDispatch()

    // const [last7, setLast7] = useState({});
    const last7 = useSelector(state => state.wallet.last7);

    const arr = last7.last7
    let counter = 1;//==to help us list the transactions


    const fetchUserDetails = async () => {
        try{
            const response = await fetch(`https://pregcare.pythonanywhere.com/api/wallet/wallet_details/?email=${email}`);
            const data = await response.json();
            setDetails(data);
            // console.log(details);//getting the details
            setFetching(false);
        }catch(e){
            // console.log(e);
            setFetching(false);
        }
    }
    // const getTransactions = () => {
    //     return (dispatch) => {
    //         fetch(`https://pregcare.pythonanywhere.com/api/wallet/last7/?email=${email}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log("--ineed data==")
    //             console.log(data)
    //             setLast7(data.last7)
              
    //         }).catch(error => {
    //             console.log(error)
    //         })
    //     }
    // }
    //==now the useEffect
    useEffect(() => {
        let isMount = true;
        setFetching(true)
        //call the fetch details
        fetchUserDetails();

        //also get the transactions
        dispatch(getTransactions(email))
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
                            <TouchableOpacity 
                                onPress={() => navigation.navigate("MyProfile")}
                            >
                                <FontAwesome name="user-circle-o" 
                                    size={40} color="black" style={{marginHorizontal:wp('5%')}}
                                />
                            </TouchableOpacity>
                             
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

                            <ActionCenter 
                                img_src={require('../../assets/icons/buy.png')} 
                                img_text="Send" 
                                onPress={() => navigation.navigate('SendMoney')}
                            />

                            <ActionCenter img_src={require('../../assets/icons/withdraw.png')} img_text="WithDraw" />

                        </View>


                        <View style={{flexDirection:'column'}} >
                            {/* Text and button */}
                            <Text style={{color:'#333',fontSize:22, marginTop:hp('2%')}} >Latest Transactions</Text>
                            <View  style={{height:StyleSheet.hairlineWidth,width:wp('95%'),backgroundColor:"black",marginHorizontal:wp('5%')}}  />
                               
                                <FlatList 
                                    data={last7.last7}
                                    renderItem={({item}) => (
                                        <TransactImage 
                                            day={item[2]}
                                            date={item[3]}
                                            category={item[0]}
                                            amount={item[1]}
                                        /> 
                                    )}
                                    ItemSeparatorComponent={Separator}
                                    

                                />
                            <View>
                                
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