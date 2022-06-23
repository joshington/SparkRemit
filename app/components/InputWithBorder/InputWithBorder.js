import React from 'react';
import {View,Text,TextInput} from 'react-native';
import PropTypes from 'prop-types';


// const Icon = () => {
//     return(
//         <View>
//             <
//         </View>
//     )
// }
const InputWithBorder = ({radi,aroundColor,customIcon,placeText,text,textColor,viewVerMar,
    viewHigh,viewWidth,borderGage,size,textLeft

}) => {
    return (
        <View style={{borderRadius:radi,borderColor:aroundColor,paddingTop:viewVerMar,height:viewHigh,
            width:viewWidth,borderWidth:borderGage,alignSelf:"center",marginTop:25,alignContent:"center"
        }}>
            <Text style={{color:textColor,alignSelf:"flex-start",fontSize:size,marginLeft:textLeft}}>{text}</Text>
            <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                <TextInput 
                    style={{fontSize:size}}
                    placeholder={placeText}
                    placeholderTextColor={textColor}

                />
                {customIcon}
            </View>
            
        </View>
    )
}

InputWithBorder.propTypes={
    aroundColor:PropTypes.string,
    customIcon:PropTypes.element,
}
export default InputWithBorder;