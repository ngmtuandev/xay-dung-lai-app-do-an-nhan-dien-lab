import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

const ScanningScreen = ({ navigation }) => {
    const [scanning, setScanning] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setScanning(false);
            navigation.navigate('ScanComplete');
        }, 5000); // Giả lập quá trình quét hoàn thành sau 5 giây
    }, []);

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.faceImage} />

            {/* Thanh tiến trình */}
            {scanning && (
                <>
                    <Text style={styles.scanningText}>Scanning...</Text>
                    <ActivityIndicator size="large" color="#00ff00" />
                </>
            )}
        </View>
    );
};

export default ScanningScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D3B49', // Màu nền giống hình
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    faceImage: {
        width: 300,
        height: 300,
        marginBottom: 30,
    },
    scanningText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 20,
    },
});
