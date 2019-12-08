import React from 'react';
import {View, StyleSheet} from 'react-native';

export default () => <View style={styles.line}/>;

const styles = StyleSheet.create({
    line: {
        backgroundColor: '#E5E5EA',
        height: 1,
    }
});