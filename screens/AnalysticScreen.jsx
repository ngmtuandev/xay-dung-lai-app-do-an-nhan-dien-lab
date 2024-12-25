import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import axiosInstance from "../config/axiosConfig";
import { showMessage } from "react-native-flash-message";
import { Loader } from "../component";
import getFirstAndLastDayOfMonth from "../helper/getFirstAndLastDayOfMonth";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const AnalysticScreen = () => {
  const [listStats, setListStats] = useState([]);
  const [loader, setLoader] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [listHistory, setListHistory] = useState([]);

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
  const getLabStats = async () => {
    try {
      const response = await axiosInstance.get(
        `/history/lab-checkin-counts?startDate=${startDate}&endDate=${endDate}`
      );
      if (response?.data?.isSuccess) {
        showMessage({
          message: "Lấy dữ liệu thống kê thành công!",
          type: "success",
        });
        setListStats(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      showMessage({
        message: "Không thể lấy dữ liệu thống kê",
        type: "danger",
      });
    }
  };

  useEffect(() => {
    getLabStats();
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

  // Tính tổng số lần checkin
  const totalCheckins = listStats.reduce(
    (sum, item) => sum + item.checkinCount,
    0
  );

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Thống kê sử dụng phòng Lab</Text>

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

          {/* Tổng số lần checkin */}
          <View style={styles.totalCard}>
            <Text style={styles.totalTitle}>Tổng số lần check-in</Text>
            <Text style={styles.totalNumber}>{totalCheckins}</Text>
          </View>

          {/* Danh sách thống kê theo phòng */}
          <View style={styles.statsContainer}>
            {listStats.map((item, index) => {
              // Tính phần trăm
              const percentage = (
                (item.checkinCount / totalCheckins) *
                100
              ).toFixed(1);

              return (
                <View key={index} style={styles.statCard}>
                  <View style={styles.labInfo}>
                    <Text style={styles.labName}>{item.labName}</Text>
                    <Text style={styles.labId}>Mã phòng: {item.labId}</Text>
                  </View>

                  <View style={styles.statsInfo}>
                    <Text style={styles.checkinCount}>
                      {item.checkinCount} lần check-in
                    </Text>
                    <Text style={styles.percentage}>{percentage}%</Text>
                  </View>

                  {/* Progress bar */}
                  <View style={styles.progressBarContainer}>
                    <View
                      style={[styles.progressBar, { width: `${percentage}%` }]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
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
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FC",
    padding: 16,
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  totalCard: {
    backgroundColor: "#1EB7B8",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  totalTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  totalNumber: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  statsContainer: {
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  labInfo: {
    marginBottom: 10,
  },
  labName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  labId: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  statsInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  checkinCount: {
    fontSize: 15,
    color: "#444",
  },
  percentage: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1EB7B8",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#1EB7B8",
    borderRadius: 3,
  },
});

export default AnalysticScreen;
