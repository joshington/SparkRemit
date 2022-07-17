import React, { useEffect,useState }  from 'react';
import {View,Text,StatusBar,StyleSheet,TouchableOpacity} from 'react-native';
import {LineChart,BarChart,PieChart,ProgressChart,
    ContributionGraph,StackedBarChart} from 'react-native-chart-kit'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Fontisto,Entypo,FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons';
import axios from 'axios'

const AdminDash = ({route,navigation}) => {

   

    const [Data, setData] = useState({})
    const [fetching, setFetching] = useState(false);

    const getAdminDetails = () => {
        // setFetching(true)
            axios.get('https://pregcare.pythonanywhere.com/api/auth/user-analytics/')
            .then((response) => {
                if(response.data.status === true){
                    setData(response.data)
                    console.log(Data)
                }
            }).catch(error => {
                console.log(error)
            })
    }


    useEffect(() => {
        getAdminDetails()
        return () => {
            
            // 
        }
    }, []);
    // "total_users": 1,
    // "total_topup": 0,
    // "total_withdraw": 0,
    // "total_profit": 0,
    const {total_topup,total_withdraw,total_users,total_profit,countries,count} = Data

    //===getting the data from api====
   
    const pieData = [
        {
          name: 'Uganda',
          population: 1,
          color: 'rgba(131, 167, 234, 1)',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Ghana',
          population: 0,
          color: '#F00',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'UAE',
          population:0,
          color: '#ffde00',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Nigeria',
          population: 0,
          color: 'rgb(0, 0, 255)',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
    ];


    // console.log(amount_top,amount_withdraws,total_users)
    // console.log(amount_top.amount__sum)
    return (
        <View style={{flex:1}}>
            <StatusBar barStyle='light-content' translucent={true} backgroundColor='green' />
            <View style={{alignItems:"center",marginVertical:hp('8%'),marginHorizontal:wp('5%'),
                flexDirection:"row",justifyContent:"space-around"}}>
                <View>
                    <Text style={{fontSize:28,fontWeight:"bold"}}>Dashboard</Text>
                    <Text>Welcome Admin</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('AdminProfile')}>
                    <FontAwesome name="user-circle-o" 
                        size={42} color="green" style={{marginHorizontal:wp('5%')}}
                    />
                </TouchableOpacity>
                
            </View>
            <View>
                <Text style={{fontSize:20,marginHorizontal:wp('5%'),
                    fontWeight:"bold",color:"green"}}>Amount in  Transactions</Text>
                <View style={{flexDirection:"row", borderRadius:hp('2%'),justifyContent:"space-around"}}>
                    <View>
                        <Text style={{fontSize:21,fontWeight:"bold"}}>TOPUP</Text>
                        <Text style={{fontSize:20}}>UGX {total_topup}</Text> 
                        
                    </View>
                    <View style={{width:StyleSheet.hairlineWidth,height:hp('10%')}} />
                    <View>
                        <Text style={{fontSize:21,fontWeight:"bold"}}>WITHDRAW</Text>
                        <Text style={{textAlign:"center",fontWeight:"bold",fontSize:20}}>
                            UGX {total_withdraw}
                        </Text>
                    </View>
                </View>
                <View  style={{height:hp('0.5%'),marginHorizontal:wp('4%'),
                    width:wp('93%'),backgroundColor:"gray"}} 
                />
                <View style={{flexDirection:"row",display:"flex",marginVertical:hp('4%'),
                    justifyContent:"space-around"}}>
                    <View style={{backgroundColor:"#A6CB45",width:wp('43%'),
                        height:hp('10%'),borderRadius:hp('2%'),paddingVertical:hp('2%')}}>
                        <Text style={{textAlign:"center",fontWeight:"bold",fontSize:16}}>TOTAL USERS</Text>
                        <Text style={{textAlign:"center",color:"red",fontWeight:"bold",fontSize:22}}>{total_users}</Text>
                    </View>
                    <View style={{backgroundColor:"gray",width:wp('43%'),height:hp('10%'),
                        borderRadius:hp('2%'),paddingVertical:hp('2%')}}>
                        <Text style={{textAlign:"center",fontWeight:"bold",fontSize:16}} >TOTAL INCOME</Text>
                        <Text  style={{textAlign:"center",color:"white",fontWeight:"bold",fontSize:20}}>
                           UGX {total_profit}
                        </Text>
                    </View>
                </View>
                <View  style={{height:hp('0.5%'),marginHorizontal:wp('4%'),
                    width:wp('93%'),backgroundColor:"gray"}} 
                />
            
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:18,fontWeight:"bold"}}>No of Users per country</Text>
                        <PieChart
                            data={pieData}
                            width={wp('88%')}
                            height={hp('30%')}
                            chartConfig={{
                                backgroundColor: '#e26a00',
                                backgroundGradientFrom: '#fb8c00',
                                backgroundGradientTo: '#ffa726',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius:16,
                                    marginHorizontal:wp('2%')
                                }
                            }}
                            accessor="population"
                            backgroundColor="transparent"
                            
                            absolute
                        />
                        <View  style={{height:hp('0.5%'),marginHorizontal:wp('4%'),
                            width:wp('93%'),backgroundColor:"gray"}} 
                        />
                    </View>
            </View>
        </View>
    )
}

export default AdminDash