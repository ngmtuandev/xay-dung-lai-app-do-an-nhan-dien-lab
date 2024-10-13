import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { routers } from '../navigate/routers';

// Giả lập hình ảnh avatar (Thay bằng ảnh thật nếu có)
import img_avatar from "../assets/images/img-login.png"; // Đặt đúng đường dẫn ảnh avatar của bạn

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Nút thoát */}
            <TouchableOpacity style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            {/* Avatar */}
            <Image style={styles.avatar} source={img_avatar} />

            {/* Tiêu đề */}
            <Text style={styles.title}>Login</Text>

            {/* Email */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email address"
                    placeholderTextColor="#A6A6A6"
                />
            </View>

            {/* Mật khẩu */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#A6A6A6"
                    secureTextEntry
                />
            </View>

            {/* Nút Đăng nhập */}
            <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate(routers.HOME)}>
                <Text style={styles.signInButtonText}>Sign in</Text>
            </TouchableOpacity>

            {/* Tùy chọn tạo tài khoản mới */}
            <Text style={styles.createNewText}>
                You are new?{' '}
                <Text style={styles.createNewLink} onPress={() => { /* Thêm hành động cho tạo tài khoản mới */ }}>
                    Create new
                </Text>
            </Text>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7FC',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    closeButtonText: {
        fontSize: 18,
        color: '#A6A6A6',
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
        backgroundColor: '#F1F1F1',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        color: '#333',
    },
    signInButton: {
        width: '100%',
        backgroundColor: '#FF7A44',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    signInButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    createNewText: {
        color: '#A6A6A6',
        fontSize: 14,
    },
    createNewLink: {
        color: 'black',
        fontWeight: 'bold',
    },
});
