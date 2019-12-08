import React from 'react';
import {Text, View} from 'react-native';

export default ({text}) => {
    if (!!text) {
        return null;
    }
    return (
        <View>
            <Text>{text}</Text>
        </View>
    );
};
