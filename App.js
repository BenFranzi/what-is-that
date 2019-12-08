import React from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {setNavigator} from './src/navigatorRef';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {HomeScreen, CaptureScreen} from './src/screens';

const switchNavigator = createStackNavigator({
    HomeScreen: HomeScreen,
    CaptureScreen: CaptureScreen,
});

const App = createAppContainer(switchNavigator);

export default () => {
    return (
        <ActionSheetProvider>
            <App ref={navigator => {
                setNavigator(navigator)
            }}/>
        </ActionSheetProvider>
    );
};