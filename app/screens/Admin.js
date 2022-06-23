import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import {Text,View,TouchableHighlight,TextInput} from 'react-native';
import Container from '../components/Container/Container';
import { FontAwesome } from '@expo/vector-icons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';




const Header = ({text}) => {
    return (
        <Text style={{textAlign:"center",fontSize:hp('3%'),paddingTop:hp('20%')}}>
            <FontAwesome name="exchange" size={24} color="black" />
            {text}
        </Text>

    )
}



//now add the text and Input component
const TextAndInput = ({labelText}) => {
    return (
        <View style={{display:"flex",flexDirection:"row",paddingHorizontal:wp('15%'),marginVertical:hp('3%')}}>
            <Text style={{textAlign:"center",fontSize:hp('5%')}}>{labelText}:</Text>
            <TextInput
                placeholder="UGX: 40000"
                style={{display:"flex",
                    height:hp('5%'),width:wp('40%'),borderRadius:wp('8%'),borderWidth:wp('0.3%')}}
            />
        </View>
    )
}

const styles = EStyleSheet.create({
    containerText:{
        flexDirection:"row",
        display:"flex",
        marginVertical:hp('20%')
    },
   
})
//now adding button with text

const ButtonWithText = ({onPress}) => {
    return (
    
            <TouchableHighlight
                style={{height:hp('5%'),width:wp('70%'),
                backgroundColor:"blue",
                borderRadius:hp('1.5%'),marginHorizontal:wp('12%')}}
                onPress={onPress}
            >
                <Text style={{textAlign:"center",fontSize:hp('2.5%'),
                    color:"white",fontWeight:"bold"}}>
                    publish
                </Text>
            </TouchableHighlight>
    )
}
const Admin = ({route,navigation}) => {
    return (
       <View style={{padding:hp('2%')}}>
           <Header text="Exchange Rates" />
           
           {/* <TextAndInput  labelText="BUY" /> */}

           <TextAndInput  labelText="SELL" />
           <TextAndInput  labelText="BUY" />
           <ButtonWithText  onPress={() => navigation.navigate('Home')} />
       </View>
    )
}

export default Admin;