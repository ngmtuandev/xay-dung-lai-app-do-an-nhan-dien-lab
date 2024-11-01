import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axiosInstance from "../config/axiosConfig";
import convertToVietnamTime from "../helper/convertTime";
import calender from "../assets/images/calender.png";
import { Calendar } from "react-native-calendars";
import { Image } from "react-native";
import { useSelector } from "react-redux";

// Helper function to format createdAt date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Function to return color based on room type
const roomColor = (room) => {
  switch (room) {
    case "Công Nghệ Thông Tin":
      return "#FFDDC1";
    case "Thị Giác Máy Tính":
      return "#D4E157";
    case "Kĩ Thuật Máy Tính":
      return "#B39DDB";
    case "Vi Xử Lý":
      return "#81D4FA";
    default:
      return "#FFCDD2";
  }
};

const LogtimeItem = ({
  title,
  email,
  room,
  checkinTime,
  checkoutTime,
  createdAt,
}) => (
  <View style={styles.logItem}>
    <View style={styles.headerContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={[styles.tag, { backgroundColor: roomColor(room) }]}>
        <Text style={styles.tagText}>{room}</Text>
      </View>
    </View>
    <Text style={styles.emailText}>{email}</Text>
    <Text style={styles.dateText}>Ngày: {formatDate(createdAt)}</Text>
    <View style={styles.detailsContainer}>
      <Text style={styles.timeLabel}>Giờ vào:</Text>
      <Text style={styles.timeValue}>{convertToVietnamTime(checkinTime)}</Text>
      <Text style={styles.timeLabel}>Giờ ra:</Text>
      <Text style={styles.timeValue}>
        {checkoutTime ? convertToVietnamTime(checkoutTime) : "Chưa ra"}
      </Text>
    </View>
  </View>
);

const LogtimeHistoryScreen = () => {
  const [allHistory, setAllHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isShowCalender, setIsShowCalender] = useState(false);
  const [monthSelected, setMonthSelected] = useState();

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  console.log("🚀 ~ LogtimeHistoryScreen ~ user:", user);

  const apiGetAllHistory = async () => {
    const response = await axiosInstance.post("/history/find-one", {
      userId: user?.id,
      month: monthSelected,
    });
    return response?.data;
  };

  const handleDateSelect = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setShowDatePicker(false);
      console.log("Selected date:", date.toISOString());
      filterByDate(date);
    } else {
      setShowDatePicker(false); // Close picker if date selection is canceled
    }
  };

  const filterByDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const filteredData = allHistory.filter((item) =>
      item.timeCheckin.startsWith(formattedDate)
    );
    setFilteredHistory(filteredData);
  };

  const showMode = () => {
    setShowDatePicker(true);
  };

  useEffect(() => {
    (async () => {
      const response = await apiGetAllHistory();
      if (response?.isSuccess) {
        setAllHistory(response?.data);
        setFilteredHistory(response?.data);
      }
    })();
  }, [monthSelected]);

  return (
    <View style={styles.container}>
      {isShowCalender && (
        <View style={styles.calendarWrapper}>
          <Calendar
            style={styles.calendar}
            // onDayPress={(day) => {
            //   setMonthSelected(day?.month);
            //   console.log("Day pressed:", day);
            // }}
            onMonthChange={(date) => setMonthSelected(date?.month)}
          />
        </View>
      )}

      <TouchableOpacity
        onPress={() => setIsShowCalender(!isShowCalender)}
        style={styles.iconWrapper}
      >
        <Image source={calender} style={styles.icon} />
      </TouchableOpacity>

      {showDatePicker && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "calendar"}
              onChange={handleDateSelect}
            />
            {Platform.OS === "ios" && (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      )}

      <Text style={styles.sectionTitle}>Lịch sử vào ra</Text>
      <FlatList
        data={filteredHistory}
        renderItem={({ item }) => (
          <LogtimeItem
            title={item.userName}
            email={item.userEmail}
            room={item?.lab?.nameLab}
            checkinTime={item?.timeCheckin}
            checkoutTime={item?.timeCheckout}
            createdAt={item?.createdAt}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default LogtimeHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 20,
  },
  calendarWrapper: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10, // Đặt Calendar lên trên các thành phần khác
    elevation: 10, // Hỗ trợ cho Android
    backgroundColor: "white", // Đảm bảo không bị trong suốt
  },
  calendar: {
    paddingTop: 10,
  },
  datePickerButton: {
    backgroundColor: "#FF6C6C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  datePickerText: {
    color: "#FFF",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  logItem: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  tag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  tagText: {
    fontSize: 12,
    color: "#333",
  },
  emailText: {
    fontSize: 14,
    color: "#888",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  detailsContainer: {
    marginTop: 5,
  },
  timeLabel: {
    fontSize: 12,
    color: "#999",
  },
  timeValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#FF6C6C",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 5, // Icon cũng cần có zIndex cao hơn box
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginLeft: "85%",
  },
  boxWrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    zIndex: 1, // Box có zIndex thấp nhất
  },
});
