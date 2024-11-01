import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Sử dụng thư viện react-native-vector-icons để dùng icon
import { routers } from "./routers";
import {
  FaceRecognitionScreen,
  HomeScreen,
  LoginScreen,
  OverallLabActive,
  PermissionsScreen,
  RegisterInfoScreen,
  WelcomeScreen,
} from "../screens";
import LogtimeHistoryScreen from "../screens/LogtimeHistoryScreen";
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
      <FlashMessage position="top" />
      <Stack.Navigator initialRouteName={routers.LOGIN}>
        <Stack.Group>
          <Stack.Screen
            name={routers.OVERALL_ACTIVE}
            component={OverallLabActive}
            options={({ navigation }) => ({
              headerShown: true,
              title: "Tổng quan",
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
                  <Icon name="arrow-back-outline" size={28} color="#FFF" />
                </TouchableOpacity>
              ),
              // headerRight: ({ navigation }) => (
              //     <TouchableOpacity onPress={() => {
              //         dispatch(logout())
              //         navigation.navigate(routers.LOGIN);
              //     }}>
              //         <Text>Đăng xuất</Text>
              //     </TouchableOpacity>
              // )
            })}
          />
          <Stack.Screen
            name={routers.LOGIN}
            component={LoginScreen}
            options={({ navigation }) => ({
              headerShown: false,
              title: "Đăng nhập",
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
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
              title: "Xem lịch sử",
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
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
              title: "Bắt đầu xác minh",
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
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
              title: "Điều khoản",
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
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
              title: "Bắt đầu xác thực",
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
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
              title: "Trang chủ",
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
                  <Icon name="arrow-back-outline" size={28} color="#FFF" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name={routers.REGISTER_FACE}
            component={RegisterInfoScreen}
            options={({ navigation }) => ({
              headerShown: true,
              title: "Đăng kí khuôn mặt",
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
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
    backgroundColor: "#FF7A44", // Màu nền header
    elevation: 0, // Tắt bóng (shadow)
    shadowOpacity: 0, // Tắt bóng trên iOS
    borderBottomWidth: 0, // Bỏ đường viền dưới
    height: 80, // Tăng chiều cao của header để tạo khoảng cách thoáng đãng
    zIndex: 1,
  },
  headerTitleStyle: {
    color: "#FFF", // Màu chữ trắng cho tiêu đề
    fontSize: 20, // Cỡ chữ tiêu đề
    fontWeight: "bold", // In đậm tiêu đề
    textAlign: "center", // Căn giữa tiêu đề
    // flex: 1, // Giúp tiêu đề căn giữa bằng cách chiếm không gian
  },
  backButton: {
    paddingLeft: 10, // Thêm khoảng cách trái cho nút back
    paddingRight: 4,
  },
});
