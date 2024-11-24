import { ScrollView, StyleSheet, Text, View } from "react-native";
import axiosInstance from "../config/axiosConfig";
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { Picker } from "@react-native-picker/picker";
import getFirstAndLastDayOfMonth from "../helper/getFirstAndLastDayOfMonth";
import Icon from "react-native-vector-icons/Ionicons";
import convertToVietnamTime from "../helper/convertTime";
import formatDate from "../helper/formatDate";
import { Loader } from "../component";

export default function HistoryRoomScreen() {
  const [rooms, setRooms] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [historyOfRoom, setHistoryOfRoom] = useState([]);
  const [loader, setLoader] = useState(false);

  const getAllLabRoom = async () => {
    const response = await axiosInstance.post("/lab/find-all");
    console.log("response : ", response?.data);
    if (response?.data?.isSuccess) {
      showMessage({
        message: "Lấy danh sách phòng thành công!",
        type: "success",
      });
      setRooms(response?.data?.data);
    } else {
      showMessage({
        message: "Lấy danh sách phòng thất bại!",
        type: "warning",
      });
    }
  };

  const getHistoryOfRoom = async () => {
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth();
    setLoader(true);
    const response = await axiosInstance.get(
      `/history/lab-details?labId=${selectedValue}&startDate=${firstDay}&endDate=${lastDay}`
    );
    if (response?.data?.isSuccess) {
      setLoader(false);
      showMessage({
        message: "Lấy lịch sử của phòng thành công!",
        type: "success",
      });
      setHistoryOfRoom(response?.data?.data);
    } else {
      setLoader(false);
      showMessage({
        message: "Lấy lịch sử của phòng thất bại!",
        type: "warning",
      });
    }
  };

  useEffect(() => {
    getAllLabRoom();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 700);
  }, []);

  useEffect(() => {
    getHistoryOfRoom();
  }, [selectedValue]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Lịch sử phòng</Text>
          <View>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 30, width: 140 }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              {rooms &&
                rooms?.map((item) => {
                  return <Picker.Item label={item?.nameLab} value={item?.id} />;
                })}
            </Picker>
          </View>
          <View>
            {historyOfRoom?.length === 0 ? (
              <Text>Không có thông tin</Text>
            ) : (
              <ScrollView contentContainerStyle={styles.activityList}>
                {historyOfRoom?.map((item, index) => {
                  return (
                    <View key={index} style={styles.activityItem}>
                      <Text style={styles.activityDate}>
                        {formatDate(item?.createdAt)}
                      </Text>
                      <Text style={styles.activityDate}>
                        GV: {item?.userName}
                      </Text>
                      <View style={styles.activityDetails}>
                        <Icon name="log-in-outline" size={20} color="#1EB7B8" />
                        <Text>Vào ca</Text>
                        <Text style={styles.activityTime}>
                          {convertToVietnamTime(item?.timeCheckin)}
                        </Text>
                        {/* {item?.isLateCheckin ? (
                      <Text style={[styles.status, { color: "red" }]}>
                        Vào trễ ({item?.lateCheckinMinutes} phút)
                      </Text>
                    ) : (
                      <Text style={[styles.status, { color: "green" }]}>
                        Đúng giờ
                      </Text>
                    )} */}
                      </View>
                      <View style={styles.activityDetails}>
                        <Icon
                          name="log-out-outline"
                          size={20}
                          color="#1EB7B8"
                        />
                        <Text>Tan ca</Text>
                        <Text style={styles.activityTime}>
                          {convertToVietnamTime(item?.timeCheckout)}
                        </Text>
                        {/* {item?.isCorrect ? (
                      <Text style={[styles.status, { color: "red" }]}>
                        Vào đúng phòng
                      </Text>
                    ) : (
                      <Text style={[styles.status, { color: "green" }]}>
                        Vào sai phòng
                      </Text>
                    )} */}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </View>
        </View>
      )}
    </>
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
    marginBottom: 10,
  },
  activityList: { paddingBottom: 20, marginTop: 30 },
  activityItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  activityDate: { fontWeight: "bold", marginBottom: 8 },
  activityDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Căn đều các phần tử trong hàng
    marginBottom: 8,
  },
  activityTime: {
    fontWeight: "bold",
    flex: 1, // Căn chỉnh thời gian và status sao cho không bị chèn vào nhau
    textAlign: "center",
  },
  status: { fontWeight: "bold", flex: 1, textAlign: "right" },
});
