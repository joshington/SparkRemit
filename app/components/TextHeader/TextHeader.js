import React from 'react';
import PropTypes from 'prop-types';
import { View,Text } from 'react-native';




const TextHeader = ({headerText,textColor,direction,size,marTop,isBold,isJust,marHor,marLeft,
                    marRight
}) => {
    return (
        <View style={{marginTop:marTop,marginHorizontal:marHor,marginLeft:marLeft}}>
            <Text style={{color:textColor ? textColor:"#000",alignSelf:direction,
                fontWeight: isBold ? "bold": null,fontSize:size,textAlign: isJust ? "justify":"center",
                marginRight:marRight    
            }}>
                {headerText}
            </Text>
        </View>
    )
}
TextHeader.propTypes={
    headerText:PropTypes.string,
    textColor:PropTypes.string,
    direction:PropTypes.string,
}


export default TextHeader;