import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default ({children, style}) => <Text style={[styles.title, style]}>{children}</Text>;

const styles = StyleSheet.create({
    title: {
        paddingLeft: 8,
        paddingRight: 8,
        textAlign: 'center',
        fontSize: 24
    },
});