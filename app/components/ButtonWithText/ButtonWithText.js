import React from 'react'
import PropTypes from 'prop-types';
import { View,TouchableHighlight,Text,StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ButtonWIthText =({text,background,textColor,onPress,maTop,size,maBot}) => {
    return(
        <>
            <TouchableHighlight 
                style={{backgroundColor:background,
                    alignSelf:"center",
                    width:wp('85%'),
                    height:hp('12%'),
                    alignItems:"center",
                    justifyContent:"center",
                    borderRadius:12,
                    marginVertical:hp('0.55%'),
                    marginTop:maTop,
                    fontWeight:"bold",
                    activeOpacity:0.6,
                    underlayColor:"#DDDDDD",
                    marginBottom:maBot

                }}
                onPress={onPress}
            >
                <Text style={{fontSize:size ? size :hp('4%'),color:textColor}}>
                    {text}
                </Text>
            </TouchableHighlight>
        </>
    )
}

ButtonWIthText.propTypes={
    text:PropTypes.string,
    background:PropTypes.string,
   
}





export default ButtonWIthText;