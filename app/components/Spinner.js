import React from 'react';
import spinner from  '../../assets/spinner.gif';
import {Image} from 'react-native'

const Spinner = () => {
    return (
        <Image
            source={spinner} 
            style={{width:40,height:40, margin:'auto',resizeMode:'contain',marginBottom:10}} 
            alt='Loading' 
        />
    )
}

export default Spinner



