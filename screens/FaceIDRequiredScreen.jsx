import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const FaceIDRequiredScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Hình ảnh khuôn mặt */}
            <Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.faceImage} />

            {/* Nội dung thông báo */}
            <Text style={styles.title}>FaceID Required</Text>
            <Text style={styles.subtitle}>
                Ensure that your camera focuses on your face and should be 50cm from your face.
            </Text>

            {/* Nút quét */}
            <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('Scanning')}>
                <Text style={styles.scanButtonText}>Scan</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FaceIDRequiredScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D3B49', // Màu nền giống hình
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    faceImage: {
        width: 200,
        height: 200,
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#C0C0C0',
        textAlign: 'center',
        marginBottom: 40,
    },
    scanButton: {
        backgroundColor: '#4FC59A', // Màu nút quét
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 25,
    },
    scanButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});
