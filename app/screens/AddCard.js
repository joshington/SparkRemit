import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import {Text,View,StyleSheet,Image,ActivityIndicator,
    TouchableOpacity,TouchableHighlight,StatusBar,ScrollView, Touchable, FlatList,TextInput} from 'react-native'
import { VictoryBar, VictoryChart,VictoryLine, VictoryTheme } from "victory-native";
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {
    LineChart
} from "react-native-chart-kit"
import EStyleSheet from 'react-native-extended-stylesheet';
import { FontAwesome } from '@expo/vector-icons';
import Toast from "react-native-simple-toast";
import { Picker } from "@react-native-picker/picker";
import { useSelector,useDispatch } from 'react-redux';




const CurrencyPicker = ({ currency, onValueChange }) => (
    <Picker
        selectedValue={currency}
        style={{ height: 35, width: 200,marginHorizontal:wp('6%') }}
        onValueChange={onValueChange}
    >
        <Picker.Item label="UGX" value="UGX" />
        <Picker.Item label="GHS" value="GHS" />
        <Picker.Item label="NGN" value="NGN" />
        <Picker.Item label="AED" value="AED" />
    </Picker>
);

CurrencyPicker.propTypes = {
    currency: PropTypes.string,
    onValueChange: PropTypes.func,
};

const AddCard = () => {


    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const [cvv, setCvv] = useState("");
    const [cardno, setCardNo] =  useState("");
    const [currency, setCurrency] = useState("UGX")
    const [expiry_month, setExpiryMonth] = useState("");
    const [expiryyear, setExpiryYear] = useState("");

    const handleCvv = (cvv) => {
        setCvv(cvv);
    }

    const handleCardNo = (cardno) => {
        setCardNo(cardno)
    }

    const handleChangeCurrency = (currency) => {
        setCurrency(currency);
    }

    const handleExpiryMonth = (expiry_month) => {
        setExpiryMonth(expiry_month)
    }

    const handleExpiryYear = (expiryyear) => {
        setExpiryYear(expiryyear)
    }

    const email = useSelector(state => state.wallet.user_email)
    console.log(email)
    // const email = "bbosalj@gmail.com"


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
                            <Text style={{fontSize:15}}>CVV</Text>
                            <TextInput
                                style={{borderWidth:1,height:40,width:wp('40%'),textAlign:"center"}} 
                                placeholder='457'  
                                value={cvv}
                                onChangeText={handleCvv}
                                keyboardType="number-pad"
                            />
                                
                        </View>
                        <View>
                            <Text style={{fontSize:15}}>Expiry year</Text>
                            <TextInput
                                style={{borderWidth:1,height:40,width:wp('40%'),textAlign:"center"}} 
                                placeholder='E.g 2022'  
                                value={expiryyear}
                                onChangeText={handleExpiryYear}
                                keyboardType="number-pad"
                            />
                        </View>
                        
                    </View>
                    <View style={{marginVertical:hp('5%'),display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}>
                        <View>
                            <Text style={{fontSize:15}}>CardNo.</Text>
                            <TextInput
                                style={{borderWidth:1,height:40,width:wp('40%'),textAlign:"center"}} 
                                placeholder='003451'
                                value={cardno}
                                onChangeText={handleCardNo}
                                keyboardType="number-pad"
                                
                            />
                                
                        </View>
                        <View>
                            <Text style={{fontSize:15}}>Expiry month</Text>
                            <TextInput
                                style={{borderWidth:1,height:40,width:wp('40%'),textAlign:"center"}} 
                                placeholder='01'  
                                value={expiry_month}
                                onChangeText={handleExpiryMonth}
                                keyboardType="number-pad"
                            />
                            
                        </View>

                    </View>
                    <View style={{marginHorizontal:wp('7%'), flexDirection:"row"}}>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>Add Currency</Text>
                        <CurrencyPicker
                            currency={currency}
                            onValueChange={handleChangeCurrency}
                        />
                    </View>
                    
                </View>
                <TouchableHighlight style={{height:hp('6%'),borderRadius:hp('3%'),marginTop:hp('6%'),
                    alignSelf:"center",width:wp('80%'),backgroundColor:"green"}}
                    onPress={() => {
                        setSubmitting(true);
                        fetch(`https://pregcare.pythonanywhere.com/api/wallet/add-card/?email=${email}&cardno=${cardno}&cvv=${cvv}&currency=${currency}&expiry_month=${expiry_month}&expiryyear=${expiryyear}`,{
                            method:'POST',
                            headers:{'Content-type': 'application/json;',}
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            if(data.status === true){
                                setSubmitting(false)
                                setMessage(data.message)
                                Toast.show(data.message)
                                navigation.navigate("MyProfile")
                            }else{
                                setSubmitting(false);
                                Toast.show(data.message)
                            }
                        }).catch(error => {
                            setSubmitting(false);
                            Toast.show(data.message)
                        })

                    }}
                >
                    <Text style={{textAlign:"center",fontSize:20,color:"white",fontWeight:"bold"}}>
                        ADD CARD
                    </Text>
                </TouchableHighlight>
                <Text style={{textAlign:"center"}}>
                    { 
                        submitting 
                        ? (
                            <ActivityIndicator size="large" color="green" 
                                style={{marginTop:10,fontWeight:"bold"}}   
                            />) 
                        :(<Text>''</Text>)
                    }     
                </Text>
            </View>
        </View>
    )
}

export default AddCard;