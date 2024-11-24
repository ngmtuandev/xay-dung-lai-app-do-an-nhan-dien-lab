import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  Button,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import Webcam from "react-webcam";
import axios from "axios";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";
import { routers } from "../navigate/routers";

export default function FaceRecognitionScreen({ navigation }) {
  const [permission, setPermission] = useState(null); // Trạng thái quyền truy cập camera
  const [capturedImages, setCapturedImages] = useState([]); // Lưu các ảnh đã chụp
  const cameraRef = useRef(null);
  const scanAnim = useRef(new Animated.Value(0)).current;
  const MAX_IMAGES = 10; // Số lượng ảnh cần chụp

  const { user } = useSelector((state) => state.auth);
  console.log("🚀 ~ FaceRecognitionScreen ~ user:", user);

  useEffect(() => {
    if (user?.images?.length > 5) {
      showMessage({
        message: "Bạn đã đăng kí khuôn mặt!",
        type: "warning",
      });

      navigation.navigate(routers.HOME);
    }
  }, []);

  useEffect(() => {
    // Nếu chạy trên web, không cần xin quyền camera
    if (Platform.OS === "web") {
      setPermission(true); // Giả sử camera được cấp quyền trên trình duyệt
      startAnimation();
      return;
    }

    // Yêu cầu quyền truy cập camera trên thiết bị di động
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
    })();

    startAnimation(); // Bắt đầu hiệu ứng quét
  }, []);

  // Theo dõi danh sách ảnh cập nhật
  useEffect(() => {
    console.log("Danh sách ảnh hiện tại:", capturedImages);
    if (capturedImages?.length === 5) {
      (async () => {
        const result = await updateImage();
        if (result) {
          showMessage({
            message: "Cập nhập khuôn mặt thành công!",
            type: "success",
          });
          navigation.navigate(routers.HOME);
          return;
        } else {
          showMessage({
            message: "Cập nhập khuôn mặt thất bại, vui lòng thử lại sau!",
            type: "warning",
          });
          navigation.navigate(routers.HOME);
          return;
        }
      })();
      return;
    }
  }, [capturedImages]);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const takePictureAndUpload = async () => {
    if (capturedImages.length >= MAX_IMAGES) {
      console.log("Đã chụp đủ ảnh.");
      return;
    }

    let image;
    try {
      if (Platform.OS === "web") {
        // Chụp ảnh từ webcam trên web
        const webcamRef = cameraRef.current;
        image = webcamRef.getScreenshot();
      } else {
        // Chụp ảnh từ camera trên thiết bị di động
        if (cameraRef.current) {
          const photo = await cameraRef.current.takePictureAsync({
            quality: 1,
            base64: true,
          });
          image = photo.base64;
        }
      }

      if (image) {
        // Gửi ảnh lên API
        await uploadImage(image);
      }
    } catch (error) {
      console.error("Lỗi khi chụp hoặc upload ảnh:", error);
    }
  };

  const uploadImage = async (imageBase64OrUri) => {
    try {
      const formData = new FormData();

      // Kiểm tra môi trường và định dạng ảnh
      if (Platform.OS === "web") {
        // Trên web, tạo Blob từ base64
        const response = await fetch(imageBase64OrUri);
        const blob = await response.blob();
        formData.append(
          "file",
          new File([blob], "image.jpg", { type: "image/jpeg" })
        );
      } else {
        // Trên di động, sử dụng URI
        formData.append("file", {
          uri: imageBase64OrUri,
          name: "image.jpg",
          type: "image/jpeg",
        });
      }

      // Gửi ảnh lên API
      const response = await axios.post(
        "https://lab-manager-backend-production.up.railway.app/auth/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("API Response:", response?.data?.data);
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
      return null;
    }
  };

  const updateImage = async () => {
    const response = await axios.post(
      "https://lab-manager-backend-production.up.railway.app/user/update-image",
      {
        images: capturedImages,
        id: user?.id,
      }
    );
    return response?.data?.isSuccess;
  };

  const stopCaptureProcess = () => {
    // Nếu đang chụp ảnh, clearInterval
    if (captureInterval) {
      clearInterval(captureInterval);
      setCaptureInterval(null);
    }
    // Nếu muốn quay lại màn hình HOME
    navigation.navigate(routers.HOME);
  };

  const startCaptureProcess = () => {
    let captureCount = 0; // Đếm số lượng ảnh đã chụp
    const interval = setInterval(async () => {
      if (captureCount >= MAX_IMAGES) {
        clearInterval(interval); // Dừng quá trình chụp
        console.log("Đã chụp đủ ảnh, dừng chương trình.");
        console.log("Danh sách ảnh cuối cùng:", capturedImages);
        if (capturedImages?.length < 3) {
          showMessage({
            message: "Chụp ảnh thất bại, vui lòng thử lại sau!",
            type: "warning",
          });
          return;
        }
        // else {
        //   const result = await updateImage();
        //   if (result) {
        //     showMessage({
        //       message: "Upload image successfully!",
        //       type: "success",
        //     });
        //     navigation.navigate(routers.HOME);
        //   } else {
        //     showMessage({
        //       message: "Upload image failure, please try again!",
        //       type: "warning",
        //     });
        //     navigation.navigate(routers.HOME);
        //   }
        // }
      }
      await takePictureAndUpload();
      captureCount++; // Tăng số lượng ảnh đã chụp
    }, 2000); // Chụp ảnh mỗi 2 giây
  };

  if (permission === null) {
    return (
      <View style={styles.container}>
        <Text>Đang kiểm tra quyền truy cập camera...</Text>
      </View>
    );
  }

  if (permission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Bạn cần cấp quyền truy cập camera để sử dụng tính năng này.
        </Text>
        <Button
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status === "granted");
          }}
          title="Cho phép truy cập"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        // Sử dụng webcam khi chạy trên web
        <Webcam
          audio={false}
          ref={cameraRef}
          style={styles.camera}
          screenshotFormat="image/jpeg"
        />
      ) : (
        // Sử dụng camera Expo khi chạy trên thiết bị di động
        <Camera style={styles.camera} ref={cameraRef}>
          <View style={styles.faceOutline}>
            <Animated.View
              style={[styles.scanner, { transform: [{ translateY }] }]}
            />
          </View>
        </Camera>
      )}

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
  faceOutline: {
    position: "absolute",
    top: "25%",
    left: "10%",
    width: "80%",
    height: "50%",
    borderWidth: 2,
    borderColor: "#fff",
    borderStyle: "dashed",
    borderRadius: 500,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  scanner: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  imageList: {
    marginTop: 20,
  },
  imageText: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 2,
  },
});
