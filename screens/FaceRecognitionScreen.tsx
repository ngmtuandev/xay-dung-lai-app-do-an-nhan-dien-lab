import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import { Camera, CameraView } from "expo-camera";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { routers } from "../navigate/routers"; // Giả sử có một router navigation như trong logic cũ
import { useSelector } from "react-redux";

export default function FaceRecognitionScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const cameraRef = useRef(null);

  useEffect(() => {
    // Yêu cầu quyền truy cập camera trên thiết bị di động
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Hàm chụp ảnh và upload ảnh
  const takePictureAndUpload = async () => {
    if (capturedImages.length >= 12) {
      console.log("Đã chụp đủ ảnh.", capturedImages);
      return;
    }

    try {
      // Chụp ảnh từ camera
      const photo = await cameraRef.current?.takePictureAsync({ quality: 1 });

      // Gửi ảnh lên API
      await uploadImage(photo.uri);
    } catch (error) {
      // console.error("Lỗi khi chụp hoặc upload ảnh:", error);
    }
  };

  const { user } = useSelector((state: any) => state.auth);

  // Hàm upload ảnh lên API
  const uploadImage = async (imageUri) => {
    try {
      const formData = new FormData();

      // Trên di động, sử dụng URI
      formData.append("file", {
        uri: imageUri,
        name: "image.jpg",
        type: "image/jpeg",
      });

      // Gửi ảnh lên API
      const response = await axios.post(
        "https://lab-manager-backend-production.up.railway.app/auth/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response?.data?.isSuccess) {
        showMessage({
          message: "Lấy hình ảnh thành công, vui lòng đợi!",
          type: "success",
        });
        setCapturedImages((previous) => [...previous, response?.data?.data]);
      } else {
        showMessage({
          message: "Tải hình ảnh thất bại!",
          type: "warning",
        });
      }
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
    }
  };

  useEffect(() => {
    console.log("capture ================== ", capturedImages);
    // Theo dõi danh sách ảnh cập nhật
    if (capturedImages.length >= 12) {
      showMessage({
        message: "Chụp đủ ảnh, chuẩn bị gửi!",
        type: "success",
      });
      (async () => {
        const response = await axios.post(
          "https://lab-manager-backend-production.up.railway.app/user/update-image",
          {
            images: capturedImages,
            id: user?.id,
          }
        );
        console.log("🚀 ~ response:", response?.data);
        if (response?.data?.isSuccess) {
          setTimeout(() => {
            navigation.navigate(routers.HOME);
            showMessage({
              message: "CẬP NHẬP KHUÔN MẶT THÀNH CÔNG!",
              type: "success",
            });
          }, 8000); // Điều hướng sau khi upload đủ ảnh
        }
      })();
    }
  }, [capturedImages]);

  // Hàm bắt đầu quá trình chụp ảnh liên tục
  const startCaptureProcess = () => {
    let captureCount = 0; // Đếm số lượng ảnh đã chụp
    const interval = setInterval(async () => {
      if (captureCount >= 12) {
        clearInterval(interval); // Dừng quá trình chụp
      } else {
        await takePictureAndUpload();
        captureCount++; // Tăng số lượng ảnh đã chụp
      }
    }, 3000); // Chụp ảnh mỗi 3 giây
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Đang kiểm tra quyền truy cập camera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Bạn cần cấp quyền truy cập camera để sử dụng tính năng này.
        </Text>
        <Button
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
          }}
          title="Cho phép truy cập"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView facing="front" style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}></View>
      </CameraView>

      <Button
        title="Bắt đầu chụp ảnh"
        onPress={startCaptureProcess}
        color="green"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  message: {
    textAlign: "center",
    color: "#fff",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flex: 0.1,
    backgroundColor: "transparent",
    flexDirection: "row",
    marginBottom: 10,
  },
});
