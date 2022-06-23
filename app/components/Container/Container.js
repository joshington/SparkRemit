import React from 'react';
import PropTypes from 'prop-types';
import { View,ScrollView,StatusBar} from 'react-native';


const Container = ({children}) => {
    // const containerStyles = [styles.container];
    // if (backgroundColor){
    //     containerStyles.push({backgroundColor})
    // }
    return (
        <View style={{flex:1}}>
            <StatusBar />
            {children}
        </View>
    );
};

Container.propTypes = {
    children: PropTypes.any,
};

export default Container;