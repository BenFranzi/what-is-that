import React from 'react';
import {Title, Header, Line, Capture} from '../components/common';
import {FlatList, ScrollView} from 'react-native';
import ListItem from '../components/capture/ListItem';
import {AdMobBanner} from 'expo-ads-admob';

export default ({navigation}) => {
    const image = navigation.getParam('image');
    const predictions = navigation.getParam('predictions');

    const items = predictions.splice(1);
    const primary = predictions[0];

    return (
        <ScrollView>
            <Capture uri={image.uri}/>
            <Title>{primary.className.split(',')[0]}</Title>
            <Header>{Math.floor(primary.probability * 10000) / 100}%</Header>
            <Line/>
            <Header>what else could it be</Header>
            <FlatList
                data={items}
                renderItem={ListItem}
                keyExtractor={item => item.className + item.probability}
            />
            <AdMobBanner/>
        </ScrollView>
    );
};