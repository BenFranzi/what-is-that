import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCamera, useTensorflow} from '../hooks';
import {Routes} from '../routes';
import ErrorBox from '../components/common/ErrorBox';


export default ({navigation}) => {
    const [picker, cameraError] = useCamera();
    const [classify] = useTensorflow();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const capture = async () => {
        setError(null);
        await picker(async (image) => {
            setLoading(true);
            if (!!image) {
                try {
                    const predictions = await classify(image);
                    setLoading(false);
                    navigation.navigate(Routes.CAPTURE, {image, predictions});
                } catch (e) {
                    // Failed classifying
                    console.error(e);
                    setError(e);
                    setLoading(false);
                }
            }
        });
    };

    return (
        <View style={styles.view}>
            <TouchableOpacity onPress={() => capture()}>
                <Text>Hello</Text>
            </TouchableOpacity>
            <ErrorBox text={(error ? error : cameraError)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {

    },
});