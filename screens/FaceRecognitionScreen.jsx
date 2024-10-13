import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Animated, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FaceRecognitionScreen() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const scanAnim = useRef(new Animated.Value(0)).current; // Khởi tạo Animated value

    useEffect(() => {
        startAnimation();
    }, []);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    function startAnimation() {
        // Tạo hiệu ứng di chuyển lên xuống
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanAnim, {
                    toValue: 1, // Di chuyển xuống
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(scanAnim, {
                    toValue: 0, // Di chuyển lên
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }

    const translateY = scanAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100], // Thanh quét sẽ di chuyển trong khoảng từ 0 đến 100 pixel
    });

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing}>
                <View style={styles.faceOutline}>
                    <Animated.View style={[styles.scanner, { transform: [{ translateY }] }]} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    faceOutline: {
        position: 'absolute',
        top: '25%',
        left: '10%',
        width: '80%',
        height: '50%',
        borderWidth: 2,
        borderColor: '#fff',
        borderStyle: 'dashed',
        borderRadius: 500,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    scanner: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
