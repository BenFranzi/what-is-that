import React from 'react';
import {ActivityIndicator, Image, StyleSheet} from 'react-native';

export default ({style, uri}) => {
    return (
        <Image
            style={[styles.image, style]}
            source={{uri}}
            PlaceholderContent={<ActivityIndicator />}
        />
    );
}


const styles = StyleSheet.create({
    image: {
        height: 384,
        marginBottom: 5
    },
});