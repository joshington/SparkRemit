import React from 'react';
import {Text,View,TextInput} from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ButtonWIthText from '../components/ButtonWithText/ButtonWithText';



const LabelInput = ({label,placeText}) => {
    return (
        <View style={{marginTop:hp('4%')}}>
            <Text style={{fontSize:30}}>{label}</Text>
            <TextInput
                placeholder={placeText}
                style={{display:"flex",
                    height:hp('5%'),width:wp('70%'),borderRadius:wp('2%'),borderWidth:wp('0.3%'),
                    marginVertical:hp('6%')
                }}
            />
        </View>
    )
}


const BankDeposit = ({route,navigation}) => {
    return (
        <View style={{padding:hp('9%')}}>
            <LabelInput  label="Account Details"  placeText="Account Number"    />
            <ButtonWIthText   text="Continue" 
                background="green" textColor="white" onPress={() => navigation.navigate('MyWallet')}  />
        </View>
    )
}

export default BankDeposit;