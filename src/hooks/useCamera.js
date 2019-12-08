import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {useState} from 'react';

export default () => {
    const { showActionSheetWithOptions } = useActionSheet();
    const [cameraError, setError] = useState(null);

    /**
     * Opens camera picker and runs use camera
     */
    const picker = (cb) => {
        return showActionSheetWithOptions({
                options: ['Camera', 'Files', 'Cancel'],
                cancelButtonIndex: 2, // Note: on iPad this is hidden because standard flow is to tap outside to cancel
            },
            async buttonIndex => {
                switch (buttonIndex) {
                    case 0: // Camera
                        cb(await useCamera(true));
                        break;
                    case 1: // Files
                        cb(await useCamera(false));
                        break;
                    default:
                        break; // do nothing
                }
            });
    };


    /**
     * Captures an image, returns null or image
     */
    const useCamera = async (isCamera) => {
        setError(null);
        const statusRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const statusCamera = await Permissions.askAsync(Permissions.CAMERA);
        if (statusRoll.status !== 'granted' || statusCamera.status !== 'granted') {
            setError(`permissions not granted: ${JSON.stringify(status, null, 2)}`);
        } else {
            let image;
            if (isCamera) {
                image = await ImagePicker.launchCameraAsync();
            } else {
                image = await ImagePicker.launchImageLibraryAsync();
            }

            if (!image.cancelled) {
                return image;
            }
            return null;
        }
    };

    return [picker, cameraError];
}