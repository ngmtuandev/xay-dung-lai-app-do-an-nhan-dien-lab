import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { routers } from '../navigate/routers';
// import CheckBox from '@react-native-community/checkbox';

const PermissionsScreen = ({ navigation }) => {
    const [permissions, setPermissions] = useState({
        apps: false,
        camera: false,
        browser: false,
        contacts: false,
    });

    const togglePermission = (key) => {
        setPermissions({
            ...permissions,
            [key]: !permissions[key],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Điều khoản sử dụng</Text>

            {/* Các quyền */}
            <View style={styles.permissionContainer}>
                <TouchableOpacity onPress={() => togglePermission('apps')} style={styles.permissionItem}>
                    {/* <CheckBox value={permissions.apps} onValueChange={() => togglePermission('apps')} /> */}
                    <Text style={styles.permissionText}>Truy cập kho lưu trữu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => togglePermission('camera')} style={styles.permissionItem}>
                    {/* <CheckBox value={permissions.camera} onValueChange={() => togglePermission('camera')} /> */}
                    <Text style={styles.permissionText}>Truy cập thiết bị di động</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => togglePermission('browser')} style={styles.permissionItem}>
                    {/* <CheckBox value={permissions.browser} onValueChange={() => togglePermission('browser')} /> */}
                    <Text style={styles.permissionText}>Lưu trữu hình ảnh</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => togglePermission('contacts')} style={styles.permissionItem}>
                    {/* <CheckBox value={permissions.contacts} onValueChange={() => togglePermission('contacts')} /> */}
                    <Text style={styles.permissionText}>Truy cập camera</Text>
                </TouchableOpacity>
            </View>

            {/* Điều khoản */}
            <View style={styles.termsContainer}>
                {/* <CheckBox /> */}
                <Text style={styles.termsText}>
                    Vui lòng đọc điều khoản trước khi bắt đầu !
                </Text>
            </View>

            <TouchableOpacity style={styles.allowButton} onPress={() => navigation.navigate(routers.FACE_RECOGNIZE)}>
                <Text style={styles.allowText}>Bắt đầu</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    permissionContainer: {
        marginBottom: 20,
    },
    permissionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    permissionText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    termsText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#555',
    },
    allowButton: {
        backgroundColor: '#FF7A44',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        alignItems: 'center',
    },
    allowText: {
        fontSize: 18,
        color: '#fff',
    },
});
