import React, {useState,useEffect} from "react";
import PropTypes from 'prop-types';
import { Switch,StatusBar,View,Text,Platform,CheckBox, 
    TouchableOpacity, TouchableHighlight, Image} from "react-native";



const TextInLine = ({text1,text2,marVert,size}) => {
    return(
        <View style={{flexDirection:"row",justifyContent:"space-around",
            marginVertical:marVert}}>
            <Text style={{fontSize:size}}>{text1}</Text>
            <Text>{text2}</Text>
        </View>
    )
}

export default TextInLine;