import React from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const RegisterFaceScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng kí thông tin</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tên (dùng làm tên đăng nhập)"
                    placeholderTextColor="#A6A6A6"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập địa chỉ email"
                    placeholderTextColor="#A6A6A6"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập số điện thoại"
                    placeholderTextColor="#A6A6A6"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mã phòng thí nghiệm"
                    placeholderTextColor="#A6A6A6"
                />
            </View>
            <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate(routers.HOME)}>
                <Text style={styles.signInButtonText}>Đăng Kí Thông Tin</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterFaceScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#F7F7FC',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
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
});
