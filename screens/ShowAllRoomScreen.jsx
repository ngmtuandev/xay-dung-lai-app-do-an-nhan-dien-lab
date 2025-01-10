import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native";
import axiosInstance from "../config/axiosConfig";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import formatDate from "../helper/formatDate";
export default function ShowAllRoomScreen({ navigation }) {
  const [rooms, setRooms] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const showStartDatePicker = () => setStartDatePickerVisibility(true);
  const hideStartDatePicker = () => setStartDatePickerVisibility(false);
  const handleStartDateConfirm = (date) => {
    setStartDate(formatDate(date)); // Set start date in YYYY-MM-DD format
    hideStartDatePicker();
  };

  const showEndDatePicker = () => setEndDatePickerVisibility(true);
  const hideEndDatePicker = () => setEndDatePickerVisibility(false);
  const handleEndDateConfirm = (date) => {
    setEndDate(formatDate(date)); // Set end date in YYYY-MM-DD format
    hideEndDatePicker();
  };

  const callApi = async () => {
    try {
      console.log("start");
      const response = await axiosInstance.get(
        "/lab/status?startDate=2024-01-01&endDate=2025-01-20"
      );
      console.log("response : ", response?.data?.data);
      setRooms(response?.data?.data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  console.log("rooms : ", rooms);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "600",
          fontSize: 20,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Status of all rooms
      </Text>
      <ScrollView>
        {rooms?.map((item, index) => {
          return (
            <View style={{ marginBottom: 20 }} key={index}>
              <Text>{item?.name}</Text>

              <View
                style={{
                  width: "500px",
                  minHeightheight: 200,
                  backgroundColor: "#dcdcdc",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <Text>Mã phòng: {item?.id}</Text>
                <Text>Tên phòng: {item?.name}</Text>
                {item?.isInUse ? (
                  <Text style={{ color: "red", fontWeight: "800" }}>
                    Đang sử dụng
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: "green",
                      fontWeight: "800",
                    }}
                  >
                    Trống
                  </Text>
                )}
                <Text>Lịch đã lên:</Text>
                {item?.scheduledDates?.length > 0 ? (
                  <View>
                    {item?.scheduledDates?.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            marginBottom: 10,
                            backgroundColor: "#9fd7f9",
                            padding: 10,
                            borderRadius: 10,
                          }}
                        >
                          <Text>{item?.date}</Text>
                          <Text>Vào lúc: {item?.startTime}</Text>
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <Text>Không có lịch đã lên</Text>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
      />
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
