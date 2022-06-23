import React from 'react'
import {View,Text,StatusBar} from 'react-native';
import ButtonWIthText from '../components/ButtonWithText/ButtonWithText';
import TextHeader from '../components/TextHeader/TextHeader';



import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {PayWithFlutterwaveV2} from 'flutterwave-react-native';

const DepositWallet = ({route,navigation}) => {
    return(
        <View style={{padding:hp('8%')}}>
            <StatusBar  />
            <TextHeader headerText="Choose Method" size={hp('5%')} />
            <ButtonWIthText  text="Mobile Money" 
                background="blue" textColor="white" maTop={hp('3%')} 
                onPress={() => navigation.navigate('MobileMoney')}
            />
            <ButtonWIthText  text="Bank" 
                background="blue" textColor="white" 
                onPress={() => navigation.navigate('BankDeposit')}
            />
        </View>
    )
}

export default DepositWallet;