import React from 'react';
import {View,Text,TextInput,TouchableHighlight} from 'react-native';
import Container from '../components/Container/Container';
import { Entypo } from '@expo/vector-icons';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import ButtonWIthText from '../components/ButtonWithText/ButtonWithText';
// import { TouchableHighlight } from 'react-native-web';


// import { heightPercentageToDP,widthPercentageToDP } from 'react-native-responsive-screen';


//=====cpt of label and input

const LabelInput = ({label,placeText}) => {
    return (
        <View style={{marginTop:hp('4%')}}>
            <Text style={{fontSize:30}}>{label}</Text>
            <TextInput
                placeholder={placeText}
                style={{display:"flex",
                    height:hp('5%'),width:wp('80%'),borderRadius:wp('8%'),borderWidth:wp('0.3%')
                }}
            />
        </View>
    )
}


const  AdminAuth = ({route,navigation}) => {
    return (
        <Container>
            <View style={{justifyContent:"center",alignItems:"center",padding:hp('8%')}}>
                <Entypo name="user" size={70} color="black" />
                <Text style={{fontSize:hp('4%')}}>Admin Login</Text>
                <LabelInput label="Username" placeText="Username" />
                <LabelInput label="Password" placeText="Enter password" />

                <TouchableHighlight 
                    style={{
                        backgroundColor:"green",height:hp('9%'),width:wp('80%'),margin:hp('5%'),
                        borderRadius:hp('3%')
                    }}
                    onPress={() => navigation.navigate('Admin')}
                >
                    <View style={{alignItems:"center",padding:hp('1%')}}>
                        <Text style={{fontSize:hp('4%'),fontWeight:"bold",color:"white"}}>Continue</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </Container>
    )
}


export default AdminAuth;