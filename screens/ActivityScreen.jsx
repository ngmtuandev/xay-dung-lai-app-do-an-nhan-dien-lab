import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/Ionicons";
import getFirstAndLastDayOfMonth from "../helper/getFirstAndLastDayOfMonth";
import { useSelector } from "react-redux";
import axiosInstance from "../config/axiosConfig";
import FlashMessage, { showMessage } from "react-native-flash-message";
import convertToVietnamTime from "../helper/convertTime";
import { Loader } from "../component";
import SelectDropdown from "react-native-select-dropdown";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function ActivityScreen() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [listHistory, setListHistory] = useState([]);
  const [loader, setLoader] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const data = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const { firstDay, lastDay } = getFirstAndLastDayOfMonth();
  useEffect(() => {
    setEndDate(lastDay);
    setStartDate(firstDay);
  }, [firstDay, lastDay]);

  const showStartDatePicker = () => setStartDatePickerVisibility(true);
  const hideStartDatePicker = () => setStartDatePickerVisibility(false);
  const handleStartDateConfirm = (date) => {
    setStartDate(formatDate(date)); // Set start date in YYYY-MM-DD format
    hideStartDatePicker();
  };

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, [startDate, endDate, listHistory]);

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  // api
  const getHistoryCheckinOfTeacher = async () => {
    const response = await axiosInstance.get(
      `/history/teacher-checkin-checkout-details?teacherId=${user?.id}&startDate=${startDate}&endDate=${endDate}`
    );
    console.log("🚀 ~ getHistoryCheckinOfTeacher ~ response:", response);
    if (response?.data?.isSuccess) {
      showMessage({
        message: "Lấy danh sách lịch sử thành công!",
        type: "success",
      });
      setListHistory(response?.data?.data);
    }
  };

  useEffect(() => {
    getHistoryCheckinOfTeacher();
  }, [startDate, endDate]);

  const showEndDatePicker = () => setEndDatePickerVisibility(true);
  const hideEndDatePicker = () => setEndDatePickerVisibility(false);
  const handleEndDateConfirm = (date) => {
    setEndDate(formatDate(date)); // Set end date in YYYY-MM-DD format
    hideEndDatePicker();
  };

  useEffect(() => {
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth();
    setStartDate(firstDay);
    setEndDate(lastDay);
  }, []);

  return (
    <>
      {loader ? (
        <Loader></Loader>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Hoạt động</Text>
          <View style={styles.datePickerContainer}>
            <TouchableOpacity
              onPress={showStartDatePicker}
              style={styles.dateButton}
            >
              <Text>{startDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={showEndDatePicker}
              style={styles.dateButton}
            >
              <Text>{endDate}</Text>
            </TouchableOpacity>
          </View>

          <SelectDropdown
            data={data}
            onSelect={(selectedItem, index) => {
              setSelectedItem(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />

          <ScrollView contentContainerStyle={styles.activityList}>
            {listHistory?.length > 0 &&
              listHistory?.map((item, index) => (
                <View key={index} style={styles.activityItem}>
                  <Text style={styles.activityDate}>{item?.date}</Text>
                  <Text style={styles.activityDate}>{item?.lab}</Text>
                  <View style={styles.activityDetails}>
                    <Icon name="log-in-outline" size={20} color="#1EB7B8" />
                    <Text>Vào ca</Text>
                    <Text style={styles.activityTime}>
                      {convertToVietnamTime(item?.checkinTime)}
                    </Text>
                    {item?.isLateCheckin ? (
                      <Text style={[styles.status, { color: "red" }]}>
                        Vào trễ ({item?.lateCheckinMinutes} phút)
                      </Text>
                    ) : (
                      <Text style={[styles.status, { color: "green" }]}>
                        Đúng giờ
                      </Text>
                    )}
                  </View>
                  <View style={styles.activityDetails}>
                    <Icon name="log-out-outline" size={20} color="#1EB7B8" />
                    <Text>Tan ca</Text>
                    <Text style={styles.activityTime}>
                      {convertToVietnamTime(item?.checkoutTime)}
                    </Text>
                    {item?.isEarlyCheckout ? (
                      <Text style={[styles.status, { color: "red" }]}>
                        Ra sớm ({item?.earlyCheckoutMinutes} phút)
                      </Text>
                    ) : (
                      <Text style={[styles.status, { color: "green" }]}>
                        Đúng giờ
                      </Text>
                    )}
                  </View>
                </View>
              ))}
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
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateButton: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: "45%",
    alignItems: "center",
  },
  activityList: { paddingBottom: 20 },
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
