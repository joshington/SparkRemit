import React from 'react';
import {Text,View,StyleSheet,Image,
    TouchableOpacity,TouchableHighlight,StatusBar,ScrollView, Touchable, FlatList} from 'react-native'
import { VictoryBar, VictoryChart,VictoryLine, VictoryTheme } from "victory-native";
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {
    LineChart
} from "react-native-chart-kit"
import EStyleSheet from 'react-native-extended-stylesheet';




const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];



const DayAmount = ({day,amount}) => {
    return(
        <View>
            <View style={{display:"flex",flexDirection:"row",marginTop:hp('5%'),
            justifyContent:"space-between",marginHorizontal:wp('6%')}}>
                <Text style={{fontSize:20}}>{day}</Text>
                <Text style={{fontSize:20,color:"red",fontWeight:"bold"}}>UGX {amount}</Text>
                
            </View>
            <View style={{backgroundColor: 'black',height: StyleSheet.hairlineWidth,marginHorizontal:wp('6%')}}  />
        </View>
     
    )
}


const Separator = () => <View style={styles.separator} />;

const Statistics = () => {
    return (
        <View style={{flex:1}}>
            {/* <StatusBar barStyle='light-content' translucent={false} backgroundColor='transparent' /> */}
            <View style={{height:hp('12%'),backgroundColor:"green"}}>
            </View>
            <View>
                <Text style={{fontSize:30,textAlign:"center",marginTop:hp('2%')}}>STATISTICS</Text>
                <View style={{...styles.container, marginHorizontal:wp('4%')}}>
                    <VictoryChart>
                        <VictoryLine
                            style={{
                                data:{stroke:"green"},
                                marginHorizontal:wp('5%')
                            }}
                            data={[
                            { x: "mon", y: 1000 },
                            { x: "Tue", y: 2000 },
                            { x: "Wed", y: 3000 },
                            { x: "Thur", y: 4000 },
                            { x: "Fri", y: 5000 }
                            ]}
                        />
                    </VictoryChart>
                </View>
            </View>
            <View style={{display:"flex",flexDirection:"row",padding:hp('3%')}}>
                <TouchableHighlight style={{height:hp('6%'),textAlign:"center",borderRadius:10,width:wp('30%'),backgroundColor:"green",marginHorizontal:wp('3%')}}>
                    <Text style={{fontSize:20,color:"#fff",textAlign:"center"}}>Transfer</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{height:hp('6%'),textAlign:"center",borderRadius:10,width:wp('30%'),backgroundColor:"green"}}>
                    <Text style={{fontSize:20,color:"#fff",textAlign:"center"}}>Recharge</Text>
                </TouchableHighlight>
            </View>
            <Text style={{fontSize:18,marginLeft:wp('6%')}}>Average Week Spendings</Text>
            <View>
                {/* <DayAmount  day="Mon" amount={5000}  /> */}
                <DayAmount  day="Mon" amount={5000}  />
                <DayAmount  day="Tue" amount={5000}  />
                <DayAmount  day="Wed" amount={5000}  />
            </View>
        </View>
       
    )
}
const styles = EStyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'center',
      
    },
});
export default Statistics;