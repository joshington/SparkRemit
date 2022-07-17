import React,{useEffect, useState} from 'react';
import {View,Text,TouchableOpacity,TextInput,StyleSheet,FlatList} from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch,useSelector } from 'react-redux';
import {all_spark_users,storeSparkUser,check_text,checkCommand} from '../actions';
import axios from 'axios';
import Separator from '../components/Separator';


const LabelInput = ({label,placeText,keyboard,secure,onChangeText,value}) => {
    return (
        <View style={{marginHorizontal:wp('6%')}}>
            <Text style={{fontSize:20,color:"green"}}>{label}</Text>
            <TextInput
                placeholder={placeText}
                style={{display:"flex",
                // textAlign:"center",
                    paddingHorizontal:wp('3%'),
                    height:50,width:wp('90%'),borderRadius:wp('5%'),borderWidth:wp('0.5%')
                }}
                keyboardType={keyboard}
                secureTextEntry={secure ? true : false}
                onChangeText={onChangeText}
                value={value}
                autoFocus={true}
              
            />
            
        </View>
    )
}

const SendMoney = ({navigation}) => {
    const [username, setUsername] = useState("")

    //==to help control listing the spark remit users
    const [searching, setSearching] = useState(false);


    //get the email====
    const email = useSelector(state => state.wallet.user_email)
    console.log("===email====")
    console.log(email)
    //===for dispatcing actions=====
    const dispatch = useDispatch()


    //====get the users from the reducer=====
    const spark_users = useSelector(state => state.wallet.sparkUsers)
    //==the above gets me all the spark users=====
    let counter = 1//==to help us list the users

    const check_text =(text) =>{
        console.log(text)
    }

    const [selected, setSelected] = useState(false);
    const [Data, setData] = useState([]);
   

    const [recipient, setRecepient] = useState("");
    useEffect(() => {
        return () => {
            setSelected(false)
            setRecepient("");
            // 
        }
    }, []);
    return (
        <>
            <View style={{flexDirection:"row",display:"flex",justifyContent:"space-around",marginTop:hp('4%')}}>
                <TouchableOpacity style={{height:hp('9%'),
                    backgroundColor:searching ? "#FDDB27FF":"green",paddingVertical:hp('2%'),width:wp('40%'),borderRadius:hp('2%')}}>
                    <Text style={{textAlign:"center",fontSize:20,color:"white",fontWeight:"bold"}}>
                        Spark User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:hp('9%'),
                    backgroundColor:"green",paddingVertical:hp('2%'),width:wp('40%'),borderRadius:hp('2%')}}
                    onPress={() => {
                        dispatch(checkCommand(false))
                        navigation.navigate("CheckNon")
                    }}
                >
                    <Text style={{textAlign:"center",fontSize:20,color:"white"}}>Non User</Text>
                </TouchableOpacity>

            </View>
            <Text style={{textAlign:"center",marginTop:hp('3%'),fontSize:20}}>search for user's username</Text>
            <LabelInput 
                placeText="Search for user e.g @spark"
                value={username}
                onChangeText={(text) => {
                    fetch(`https://pregcare.pythonanywhere.com/api/wallet/wallet_users/?email=${email}&uname=${text}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log('loggg')
                        console.log(data.users)
                        //data
                        setData(data.users)
                        console.log('==data now===')
                        console.log(Data)
                        // console.log(Data)
                    }).catch(error => {
                        // console.log(error)
                    })

                    setSearching(true)
                    setUsername(text)
                    
                }}
                keyboard="name-phone-pad"
                
            />
            {
                searching ?  (
                     
                    <>
                   
                    <View>
                        <View style={{marginHorizontal:wp('6%'),marginTop:hp('2%'),borderRadius:10,padding:hp('1.5%'),
                            backgroundColor:"gray"}}>
                               <FlatList 
                                    data={Data}
                                    renderItem={({item}) => (
                                        <TouchableOpacity  
                                           
                                            style={{ backgroundColor: selected ? 'white':"",height:hp('4%')}} 
                                            onPress={() => {
                                                setSelected(true)
                                                            // let user= {user}
                                                setRecepient(item)
                                                dispatch(storeSparkUser(recipient))
                                            }}
                                        >
                                            <Text style={{fontSize:20,textAlign:"center",marginTop:hp('1%')}}>{item}</Text>
                                    </TouchableOpacity>
                                    )}
                                    ItemSeparatorComponent={Separator}
                                    scrollEnabled={true}
                                /> 
                        </View>
                        <TouchableOpacity style={{backgroundColor:"green",
                            marginHorizontal:wp('6%'),borderRadius:15,marginTop:hp('1%'),
                            height:hp('10%'),margin:hp('4%')}}
                            onPress={() => navigation.navigate("FinalSend")}
                        >
                            <Text style={{textAlign:"center",fontSize:18,marginTop:hp('3%'),color:"white"}}>Send</Text>
                        </TouchableOpacity>
                    </View>
                    </>
                ) : <Text></Text>
            }
        </>
    )
}


export default SendMoney