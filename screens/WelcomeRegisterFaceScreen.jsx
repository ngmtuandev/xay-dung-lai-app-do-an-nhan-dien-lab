import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { routers } from '../navigate/routers';
import img_logo from "../assets/images/img-login.png"

const WelcomeRegisterFaceScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.faceContainer}>
                {/* Thêm hình ảnh hoặc vẽ mô hình khuôn mặt */}
                <Image source={img_logo} style={styles.faceImage} />
            </View>
            <Text style={styles.title}>Bắt đầu xác minh nhé !</Text>
            <Text style={styles.description}>
                Vui lòng đọc điều khoản trước khi xác minh và tuân thủ quy tắc phòng thí nhiệm.
            </Text>
            <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate(routers.PERMISSIONS)}>
                <Text style={styles.getStartedText}>Thực Hiện Xác Minh</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WelcomeRegisterFaceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
    },
    faceContainer: {
        marginBottom: 20,
    },
    faceImage: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF7A44',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#FF7A44',
        textAlign: 'center',
        marginHorizontal: 40,
        marginBottom: 30,
    },
    getStartedButton: {
        backgroundColor: '#FF7A44',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    getStartedText: {
        fontSize: 18,
        color: '#fff',
    },
});
