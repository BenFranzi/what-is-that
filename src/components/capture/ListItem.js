import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default ({item}) => {
    return (
        <View style={styles.item}>
            <Text>{item.className}</Text>
            <Text>{Math.floor(item.probability * 10000) / 100}%</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        padding: 8,
    },
});

