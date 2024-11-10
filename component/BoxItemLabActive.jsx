import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RiLoginBoxLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import convertToVietnamTime from "../helper/convertTime";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { setCheckin } from "../redux/checkinSlice";
import FlashMessage, { showMessage } from "react-native-flash-message";

const BoxItemLabActive = ({ isActive, data, flag, setFlag }) => {
  const [infoActiveOfLab, setInfoActiveOfLab] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { isCheckin } = useSelector((state) => state.checkin);
  console.log("🚀 ~ BoxItemLabActive ~ isCheckin:", isCheckin);
  console.log("user : ", user?.userName);

  const apiFindHistoryNotCheckout = async () => {
    const response = await axiosInstance.post("/history/find-by-lab", {
      labId: data?.id,
    });
    return response?.data;
  };

  const [historyOfLabNotCheckout, setHistoryOfLabNotCheckout] = useState();

  useEffect(() => {
    (async () => {
      const result = await apiFindHistoryNotCheckout();
      setHistoryOfLabNotCheckout(result?.data);
    })();
  }, [data]);

  const toggleModal = () => {
    console.log("infoActiveOfLab ==> ", infoActiveOfLab);
    if (isCheckin && !infoActiveOfLab?.lab?.isDoingUse) {
      showMessage({
        message: "Hiện bạn đang trong ca làm!",
        type: "warning",
      });
      //   Toast.show({
      //     type: "error", // success | error | info
      //     text1: "Hiện bạn đang trong ca làm!",
      //     position: "top",
      //     autoHide: true, // Tự động biến mất sau thời gian chỉ định
      //     visibilityTime: 2000,
      //   });
      return;
    } else {
      if (!infoActiveOfLab) {
        setModalVisible(!isModalVisible);
      } else if (infoActiveOfLab.userName === user?.userName) {
        setModalVisible(!isModalVisible);
      } else {
        showMessage({
          message: "Phòng đã có ca làm!",
          type: "warning",
        });
      }
    }
  };

  const apiCheckin = async () => {
    const response = await axiosInstance.post("/history/create-checkin", {
      lab: data?.id,
      user: user?.id,
    });
    return response?.data;
  };

  const apiCheckout = async () => {
    const response = await axiosInstance.post("/history/create-checkout", {
      lab: data?.id,
      history: historyOfLabNotCheckout?.id,
    });
    return response?.data;
  };

  const apiGetStatusLab = async () => {
    const response = await axiosInstance.post("/history/find-by-lab", {
      labId: data?.id,
    });
    return response?.data;
  };

  const handleConfirm = async () => {
    console.log("demo : ", infoActiveOfLab);

    const result = await apiCheckin();
    if (result?.isSuccess) {
      setFlag(!flag);
      setInfoActiveOfLab(undefined);
      dispatch(setCheckin(true));
      showMessage({
        message: "Vào ca thanh công!",
        type: "success",
      });
    } else {
      showMessage({
        message: "Phòng đã có ca làm!",
        type: "warning",
      });
    }
    setModalVisible(false);
  };

  const handleConfirmCheckout = async () => {
    const result = await apiCheckout();
    if (result?.isSuccess) {
      setFlag(!flag);
      dispatch(setCheckin(false));
      showMessage({
        message: "Ra ca thành công!",
        type: "success",
      });
      setInfoActiveOfLab(undefined);
      setFlag(!flag);
    } else {
      showMessage({
        message: "Ra ca thất bại!",
        type: "success",
      });
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    console.log("Cancelled!");
    setModalVisible(false);
  };

  useEffect(() => {
    (async () => {
      const response = await apiGetStatusLab();
      if (response?.isSuccess) {
        setInfoActiveOfLab(response?.data);
      }
    })();
  }, [data, flag]);
  console.log("tesst :  ", infoActiveOfLab);
  return (
    <>
      <TouchableOpacity
        onPress={toggleModal}
        style={{
          width: "47%",
          height: 160,
          backgroundColor: "red",
          marginBottom: 20,
          borderRadius: 10,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: isActive
            ? "rgba(0, 255, 0, 0.1)"
            : "rgba(128, 128, 128, 0.1)",
        }}
      >
        <View
          style={{
            padding: 8,
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "gray",
              fontWeight: "500",
            }}
          >
            {data?.nameLab}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {infoActiveOfLab && (
            <View
              style={{
                marginVertical: 8,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
              }}
            >
              {/* <Image style={{
                    width: 20,
                    height: 20
                }} source={user}></Image> */}
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 1,
                  color: "gray",
                  fontWeight: "600",
                }}
              >
                {infoActiveOfLab?.userName}
              </Text>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: "green",
                  borderRadius: "50%",
                }}
              ></View>
            </View>
          )}
          {infoActiveOfLab && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                alignItems: "center",
              }}
            >
              <View>
                <RiLoginBoxLine></RiLoginBoxLine>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                  }}
                >
                  Vào ca:
                </Text>
                <Text>
                  {convertToVietnamTime(infoActiveOfLab?.timeCheckin)}
                </Text>
              </View>
            </View>
          )}
          {infoActiveOfLab && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                alignItems: "center",
              }}
            >
              <View>
                <RiLogoutBoxLine></RiLogoutBoxLine>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                  }}
                >
                  Ra ca:
                </Text>
                <Text>
                  {infoActiveOfLab?.timeCheckout
                    ? convertToVietnamTime(infoActiveOfLab?.timeCheckout)
                    : "chưa ra ca"}
                </Text>
              </View>
            </View>
          )}
          {!infoActiveOfLab && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: -44,
              }}
            >
              <RiLoginBoxLine
                style={{ marginBottom: 4 }}
                color="rgba(0, 255, 0, 0.7)"
                size={30}
              ></RiLoginBoxLine>
              <Text style={{ fontWeight: "600", color: "gray" }}>Vào ca</Text>
              <Text
                style={{
                  display: "flex",
                  textAlign: "center",
                  fontSize: 10,
                }}
              >
                Vui lòng chọn ngày trước khi vào ca
              </Text>
            </View>
          )}
        </View>
        {infoActiveOfLab?.timeCheckout == null &&
          infoActiveOfLab?.timeCheckin == null && (
            <Modal isVisible={isModalVisible}>
              <View style={styles.modalContent}>
                <Text>Xác nhận vào ca</Text>
                <Text
                  style={{
                    fontWeight: "700",
                    color: "green",
                    marginBottom: 20,
                  }}
                >
                  Phòng : {data?.nameLab}
                </Text>
                <View style={styles.buttonContainer}>
                  <Button title="Hủy" onPress={handleCancel} />
                  <Button
                    title={
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          textAlign: "center",
                          gap: 4,
                        }}
                      >
                        <Text>Vào ca</Text>
                        <RiLoginBoxLine></RiLoginBoxLine>
                      </View>
                    }
                    onPress={handleConfirm}
                  />
                </View>
              </View>
            </Modal>
          )}
        {infoActiveOfLab?.timeCheckout == null &&
          infoActiveOfLab?.timeCheckin != null && (
            <Modal isVisible={isModalVisible}>
              <View style={styles.modalContent}>
                <Text>Xác nhận ra ca</Text>
                <Text
                  style={{ fontWeight: "700", color: "red", marginBottom: 20 }}
                >
                  Phòng : {data?.nameLab}
                </Text>
                <View style={styles.buttonContainer}>
                  <Button title="Hủy" onPress={handleCancel} />
                  <Button
                    title={
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          textAlign: "center",
                          gap: 4,
                        }}
                      >
                        <Text>Ra ca</Text>
                        <RiLoginBoxLine></RiLoginBoxLine>
                      </View>
                    }
                    onPress={handleConfirmCheckout}
                  />
                </View>
              </View>
            </Modal>
          )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 30,
  },
});

export default BoxItemLabActive;
