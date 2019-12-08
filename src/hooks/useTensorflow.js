import React, {useState} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Image } from 'react-native';
import {fetch as tfFetch} from '@tensorflow/tfjs-react-native/dist/platform_react_native';
import {base64ImageToTensor, imageToTensor, resizeImage} from '../helpers/ImageUtils';


export default () => {
    const [tfError, setError] = useState(null);

    /**
     * Classify image and return prediction
     */
    const classify = async (source) => {
        // Load TF into memory
        await tf.ready();
        // Load mobilenet model
        const model = await mobilenet.load();
        const imageTensor = await getImage(source);
        // Classify image
        const predictions = await model.classify(imageTensor, 6);
        // Dispose of generated tensor
        await tf.dispose([imageTensor]);
        return predictions;
    };

    /**
     * Get buffer from image source
     */
    const getImage = async (source) => {
        if (Number.isInteger(source)) {
            const imagePath = Image.resolveAssetSource(source);
            const response = await tfFetch(
                imagePath.uri,
                {},
                {isBinary: true}
            );
            const raw = await response.arrayBuffer();
            return imageToTensor(raw);
        } else {
            const {base64} = await resizeImage(source.uri);
            return base64ImageToTensor(base64);
        }
    };

    return [classify, tfError];
};