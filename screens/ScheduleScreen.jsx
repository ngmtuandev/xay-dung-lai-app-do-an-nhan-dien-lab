import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import getFirstAndLastDayOfMonth from "../helper/getFirstAndLastDayOfMonth";
import { useSelector } from "react-redux";
import axiosInstance from "../config/axiosConfig";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Loader } from "../component";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function ScheduleScreen() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false); // Biến để xác định đang chọn startDate hay endDate

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const [listSchedule, setListSchedule] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, [startDate, endDate]);

  useEffect(() => {
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth();
    setStartDate(firstDay);
    setEndDate(lastDay);
  }, []);

  const getScheduleOfTeacherByConditionDate = async () => {
    const response = await axiosInstance.get(
      `/user/schedule?teacherId=${user?.id}&startDate=${startDate}&endDate=${endDate}&isActive=true`
    );
    console.log(
      "🚀 ~ getScheduleOfTeacherByConditionDate ~ response:",
      response?.data
    );
    setListSchedule(response?.data?.data);
    if (response?.data?.isSuccess) {
      showMessage({
        message: "Lấy danh sách lịch dạy thành công!",
        type: "success",
      });
    } else {
      showMessage({
        message: "Lấy danh sách lịch dạy thất bại!",
        type: "warning",
      });
    }
  };

  useEffect(() => {
    getScheduleOfTeacherByConditionDate();
  }, [startDate, endDate]);

  const handleDayPress = (day) => {
    const selectedDate = `${day.year}-${String(day.month).padStart(
      2,
      "0"
    )}-${String(day.day).padStart(2, "0")}`;

    if (isSelectingEndDate) {
      setEndDate(selectedDate); // Cập nhật endDate
    } else {
      setStartDate(selectedDate); // Cập nhật startDate
    }

    setIsShowCalendar(false); // Đóng lịch sau khi chọn ngày
  };

  return (
    <>
      {loader ? (
        <Loader></Loader>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Lịch làm</Text>
          <View style={styles.datePickerContainer}>
            <TouchableOpacity
              onPress={() => {
                setIsSelectingEndDate(false); // Đặt về false để chọn startDate
                setIsShowCalendar(!isShowCalendar);
              }}
              style={styles.dateButton}
            >
              <Text>{formatDate(startDate)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsSelectingEndDate(true); // Đặt về true để chọn endDate
                setIsShowCalendar(!isShowCalendar);
              }}
              style={styles.dateButton}
            >
              <Text>{formatDate(endDate)}</Text>
            </TouchableOpacity>
          </View>

          {isShowCalendar && (
            <View style={styles.calendarWrapper}>
              <Calendar
                style={styles.calendar}
                onDayPress={handleDayPress} // Xử lý chọn ngày
              />
            </View>
          )}

          <ScrollView contentContainerStyle={styles.scheduleList}>
            {/* Example schedule item, replace with dynamic data as needed */}
            {listSchedule?.length > 0 &&
              listSchedule?.map((item) => {
                return (
                  <View style={styles.scheduleItem}>
                    <Text style={styles.scheduleDate}>{item?.date}</Text>
                    <Text style={styles.scheduleDate}>
                      {item?.room?.nameLab}
                    </Text>
                    <View style={styles.scheduleDetails}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Icon name="log-in-outline" size={20} color="#1EB7B8" />
                        <Text>{item?.startTime}</Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Icon
                          name="log-out-outline"
                          size={20}
                          color="#1EB7B8"
                        />
                        <Text>{item?.endTime}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            {/* Repeat for more schedule items */}
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F7FC", padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    paddingTop: "4%",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  calendarWrapper: {
    position: "absolute",
    top: 60,
    left: 0,
    marginTop: 40,
    right: 0,
    zIndex: 10,
    elevation: 10,
    backgroundColor: "white",
  },
  calendar: {
    paddingTop: 10,
  },
  dateButton: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: "45%",
    alignItems: "center",
  },
  scheduleList: { paddingBottom: 20 },
  scheduleItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  scheduleDate: { fontWeight: "bold", marginBottom: 8 },
  scheduleDetails: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 8,
  },
  employeeIcons: { flexDirection: "row", justifyContent: "flex-start" },
});
