import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { routers } from "../navigate/routers";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Reset the stack and navigate to the login screen
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: routers.LOGIN }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hồ sơ</Text>
      <View style={styles.profileInfo}>
        <Icon name="person-circle-outline" size={50} color="black" />
        <View style={styles.profileText}>
          <Text style={styles.profileName}>NGUYỄN MẠNH TUẤN</Text>
          <Text style={styles.profileRole}>NV</Text>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionItem}>
          <Text>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(routers.FACE_RECOGNIZE)}
          style={styles.optionItem}
        >
          <Text>Đăng ký khuôn mặt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text>Hướng dẫn sử dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text>Liên hệ</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FC",
    padding: 16,
    paddingTop: "7%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  profileInfo: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  profileText: { marginLeft: 10 },
  profileName: { fontSize: 20, fontWeight: "bold" },
  profileRole: { color: "gray" },
  optionsContainer: { marginBottom: 20 },
  optionItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#1EB7B8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: { color: "white", fontWeight: "bold" },
});
