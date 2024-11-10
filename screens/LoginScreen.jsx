import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { routers } from "../navigate/routers";
import img_avatar from "../assets/images/img-login.png";
import axiosInstance from "../config/axiosConfig";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import FlashMessage, { showMessage } from "react-native-flash-message";

const LoginScreen = ({ navigation }) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [infoLogin, setInfoLogin] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    if (user && isLoggedIn) {
      navigation.replace("Main"); // Ensure `routers.HOME` is correctly defined
    }
  }, [isLoggedIn, user]); // Add `user` to the dependency array for accurate tracking

  const handleLogin = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", { ...data });
      return response?.data;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  const onLoginPress = async () => {
    const result = await handleLogin(infoLogin);
    console.log("result", result);
    if (!result?.isSuccess) {
      showMessage({
        message: "Đăng nhập thất bại!",
        type: "warning",
      });
    } else {
      showMessage({
        message: "Đăng nhập thành công!",
        type: "success",
      });
      dispatch(login(result?.data));
    }
  };

  return (
    <View style={styles.container}>
      <Toast />

      {/* Avatar */}
      <Image style={styles.avatar} source={img_avatar} />

      {/* Tiêu đề */}
      <Text style={styles.title}>Xác thực khuôn mặt</Text>

      {/* Email */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) =>
            setInfoLogin({ ...infoLogin, userName: text })
          }
          style={styles.input}
          placeholder="Nhập tên"
          placeholderTextColor="#A6A6A6"
        />
      </View>

      {/* Mật khẩu */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) =>
            setInfoLogin({ ...infoLogin, password: text })
          }
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#A6A6A6"
          secureTextEntry
        />
      </View>

      {/* Nút Đăng nhập */}
      <TouchableOpacity style={styles.signInButton} onPress={onLoginPress}>
        <Text style={styles.signInButtonText}>Đăng Nhập</Text>
      </TouchableOpacity>

      {/* Tùy chọn tạo tài khoản mới */}
      <Text style={styles.createNewText}>
        Bạn là người mới?{" "}
        <Text
          style={styles.createNewLink}
          onPress={() => {
            /* Thêm hành động cho tạo tài khoản mới */
          }}
        >
          Yêu cầu đăng ký.
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffeef5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 18,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#333",
  },
  signInButton: {
    width: "100%",
    backgroundColor: "#1EB7B8",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  signInButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  createNewText: {
    color: "#A6A6A6",
    fontSize: 14,
  },
  createNewLink: {
    color: "black",
    fontWeight: "bold",
  },
});
