import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'; // Sử dụng thư viện react-native-vector-icons để dùng icon
import { routers } from "./routers";
import { FaceRecognitionScreen, HomeScreen, LoginScreen, PermissionsScreen, WelcomeScreen } from "../screens";
import LogtimeHistoryScreen from "../screens/LogtimeHistoryScreen";

const Stack = createNativeStackNavigator();

export default function RootStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={routers.LOGIN}>
                <Stack.Group>
                    <Stack.Screen
                        name={routers.LOGIN}
                        component={LoginScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            title: 'Login',
                            headerStyle: styles.headerStyle,
                            headerTitleStyle: styles.headerTitleStyle,
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                    <Icon name="arrow-back-outline" size={28} color="#FFF" />
                                </TouchableOpacity>
                            ),
                        })}
                    />
                    <Stack.Screen
                        name={routers.LOGTIME_HISTORY}
                        component={LogtimeHistoryScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            title: 'Logtime History',
                            headerStyle: styles.headerStyle,
                            headerTitleStyle: styles.headerTitleStyle,
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                    <Icon name="arrow-back-outline" size={28} color="#FFF" />
                                </TouchableOpacity>
                            ),
                        })}
                    />
                    <Stack.Screen
                        name={routers.WELCOME}
                        component={WelcomeScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            title: 'Welcome',
                            headerStyle: styles.headerStyle,
                            headerTitleStyle: styles.headerTitleStyle,
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                    <Icon name="arrow-back-outline" size={28} color="#FFF" />
                                </TouchableOpacity>
                            ),
                        })}
                    />
                    <Stack.Screen
                        name={routers.PERMISSIONS}
                        component={PermissionsScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            title: 'Permissions',
                            headerStyle: styles.headerStyle,
                            headerTitleStyle: styles.headerTitleStyle,
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                    <Icon name="arrow-back-outline" size={28} color="#FFF" />
                                </TouchableOpacity>
                            ),
                        })}
                    />
                    <Stack.Screen
                        name={routers.FACE_RECOGNIZE}
                        component={FaceRecognitionScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            title: 'Face Recognition',
                            headerStyle: styles.headerStyle,
                            headerTitleStyle: styles.headerTitleStyle,
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                    <Icon name="arrow-back-outline" size={28} color="#FFF" />
                                </TouchableOpacity>
                            ),
                        })}
                    />
                    <Stack.Screen
                        name={routers.HOME}
                        component={HomeScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            title: 'Home',
                            headerStyle: styles.headerStyle,
                            headerTitleStyle: styles.headerTitleStyle,
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                    <Icon name="arrow-back-outline" size={28} color="#FFF" />
                                </TouchableOpacity>
                            ),
                        })}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#FF7A44', // Màu nền header
        elevation: 0, // Tắt bóng (shadow)
        shadowOpacity: 0, // Tắt bóng trên iOS
        borderBottomWidth: 0, // Bỏ đường viền dưới
        height: 80, // Tăng chiều cao của header để tạo khoảng cách thoáng đãng
    },
    headerTitleStyle: {
        color: '#FFF', // Màu chữ trắng cho tiêu đề
        fontSize: 20, // Cỡ chữ tiêu đề
        fontWeight: 'bold', // In đậm tiêu đề
        textAlign: 'center', // Căn giữa tiêu đề
        flex: 1, // Giúp tiêu đề căn giữa bằng cách chiếm không gian
    },
    backButton: {
        paddingLeft: 10, // Thêm khoảng cách trái cho nút back
        paddingVertical: 10, // Khoảng cách trên dưới
        paddingRight: 10
    },
});
