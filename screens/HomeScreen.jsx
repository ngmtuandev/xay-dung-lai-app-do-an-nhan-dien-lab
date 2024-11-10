import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../config/axiosConfig";
import getCurrentDate from "../helper/getCurrentDate";
import getCurrentTime from "../helper/getCurrentTime";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function HomeScreen({ navigation }) {
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [schedules, setSchedules] = useState([]);
  const [history, setHistory] = useState();
  const [flag, setFlag] = useState(false);

  const getScheduleInTodayApi = async (teacherId, date) => {
    const response = await axiosInstance.get(
      `/schedule/teacher/${teacherId}/date/${date}`
    );

    if (response?.data?.data) {
      console.log("response?.data?.data : ", response?.data?.data);
      const convertSchedule = response?.data?.data?.map((item) => {
        return {
          date: item?.date,
          startTime: item?.startTime,
          endTime: item?.endTime,
          nameLab: item?.room?.nameLab,
          scheduleId: item?.id,
          labId: item?.room?.id,
          hasCheckedIn: item?.hasCheckedIn,
        };
      });
      setSchedules(convertSchedule);
    }
  };

  const checkinApi = async (data) => {
    const response = await axiosInstance.post(`/history/create-checkin`, data);
    return response?.data;
  };

  const handleCheckinApi = async () => {
    const response = await checkinApi({
      lab: schedules[0]?.labId,
      user: user?.id,
      date: getCurrentDate(),
      time: getCurrentTime(),
      scheduleId: schedules[0]?.scheduleId,
    });
    console.log("🚀 ~ handleCheckinApi ~ response:", response);
    if (!response?.data?.isSuccess) {
      showMessage({
        message: "Vào ca thất bại, vui lòng thử lại!",
        type: "warning",
      });
      return;
    } else {
      setHistory(response?.data?.data?.id);
      showMessage({
        message: "Vào ca thành công, đừng quên ra ca nhé!",
        type: "success",
      });
      setFlag(!flag);
      await getScheduleInTodayApi();
    }
  };

  // checkout
  const checkoutApi = async (data) => {
    const response = await axiosInstance.post(`/history/create-checkout`, data);
    return response?.data;
  };

  const handleCheckoutApi = async () => {
    const response = await checkoutApi({
      lab: schedules[0]?.labId,
      user: user?.id,
      date: getCurrentDate(),
      time: getCurrentTime(),
      history,
      scheduleId: schedules[0]?.scheduleId,
    });
    if (!response?.data?.isSuccess) {
      showMessage({
        message: "Ra ca thất bại, thử lại nhé!",
        type: "warning",
      });
      return;
    } else {
      if (response?.data?.data?.isEarlyCheckout) {
        showMessage({
          message: response?.data?.message,
          type: "warning",
        });
        setFlag(!flag);
        return;
      } else {
        showMessage({
          message: "Ra ca thành công!",
          type: "success",
        });
      }
      setFlag(!flag);
      await getScheduleInTodayApi();
    }
  };

  console.log("🚀 ~ HomeScreen ~ isLoggedIn:", isLoggedIn);
  console.log("🚀 ~ HomeScreen ~ user:", user);

  // Example data for schedule items
  // const schedules = [
  //   { date: "08 tháng 11, 2024", startTime: "08:00", endTime: "17:00" },
  //   { date: "09 tháng 11, 2024", startTime: "08:00", endTime: "17:00" },
  //   { date: "10 tháng 11, 2024", startTime: "08:00", endTime: "17:00" },
  //   // Add more schedules as needed
  // ];

  let currentDate = getCurrentDate();

  useEffect(() => {
    getScheduleInTodayApi(user?.id, currentDate);
  }, [currentDate, user?.id, flag]);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(logout());
      navigation.reset({
        index: 0,
        routes: [{ name: routers.LOGIN }],
      });
    }
  }, [isLoggedIn]);

  console.log("schedules[0]?.room?.nameLab:", schedules);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Icon
          name="person-circle-outline"
          size={28}
          color="black"
          style={styles.userIcon}
        />
        <Text style={styles.name}>{user?.userName}</Text>
        <Icon
          name="notifications-outline"
          size={24}
          color="black"
          style={styles.notificationIcon}
        />
      </View>

      {schedules?.length > 0 && (
        <View style={styles.cir}>
          <Text style={{ color: "gray", marginTop: -16, marginBottom: 8 }}>
            {schedules[0]?.nameLab}
          </Text>
          <TouchableOpacity
            onPress={() =>
              schedules[0]?.hasCheckedIn
                ? handleCheckoutApi()
                : handleCheckinApi()
            }
            style={styles.circleButton}
          >
            <Text style={styles.buttonTextCir}>
              {schedules[0]?.hasCheckedIn ? `Ra ca` : `Vào ca`}
            </Text>
            <Text style={{ color: "white" }}>
              {schedules[0]?.hasCheckedIn
                ? ` ${schedules[0]?.endTime}`
                : `${schedules[0]?.startTime}`}
            </Text>
            <Text style={{ color: "white" }}>{schedules[0]?.date}</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setFlag(!flag)}
        style={styles.refreshButton}
      >
        <Text style={styles.refreshText}>Làm mới</Text>
      </TouchableOpacity>

      <View style={styles.featureContainer}>
        <FeatureButton icon="time-outline" title="Tăng ca" />
        <FeatureButton icon="alert-outline" title="Report" />
        <FeatureButton icon="document-text-outline" title="Pay slip" />
        <FeatureButton icon="document-outline" title="Xin nghỉ phép" />
      </View>

      {/* Scrollable Schedule Section */}
      <Text style={styles.sectionTitle}>Lịch làm việc hôm nay</Text>
      <ScrollView style={styles.scheduleScrollContainer}>
        {schedules?.length > 0 ? (
          schedules.map((schedule, index) => (
            <TouchableOpacity key={index} style={styles.scheduleContainer}>
              <Text style={styles.scheduleDate}>{schedule.date}</Text>
              <Text style={styles.scheduleDate}>{schedule.nameLab}</Text>
              <View style={styles.scheduleDetails}>
                <Icon name="log-in-outline" size={20} color="#1EB7B8" />
                <Text>Vào ca</Text>
                <Text style={styles.scheduleTime}>{schedule.startTime}</Text>
              </View>
              <View style={styles.scheduleDetails}>
                <Icon name="log-out-outline" size={20} color="#1EB7B8" />
                <Text>Tan ca</Text>
                <Text style={styles.scheduleTime}>{schedule.endTime}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Không có lịch dạy nào hôm nay</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
}

const FeatureButton = ({ icon, title }) => (
  <TouchableOpacity style={styles.featureButton}>
    <Icon name={icon} size={24} color="black" />
    <Text>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cir: {
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  circleButton: {
    width: 130, // Diameter of the circle
    height: 130,
    borderRadius: 100, // Half of the width/height to make it circular
    backgroundColor: "#1EB7B8", // Blue color similar to the example
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Shadow on Android
    shadowColor: "#000", // Shadow color on iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 20,
  },
  buttonTextCir: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#EAF8F8",
    padding: 16,
    paddingTop: "10%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
    paddingBottom: 10,
    // borderBottomWidth: 0.3,
    // borderColor: "gray",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userIcon: {
    marginRight: 8, // Adds space between the icon and username
  },
  role: {
    fontSize: 16,
    color: "gray",
  },
  employeeCode: {
    color: "red",
    marginLeft: 5,
  },
  notificationIcon: {
    marginLeft: "auto",
  },
  refreshButton: {
    alignSelf: "center",
    backgroundColor: "#1EB7B8",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  refreshText: {
    color: "white",
  },
  featureContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  featureButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "48%",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  scheduleScrollContainer: {
    // maxHeight: 300, // Set a fixed height for the scrollable schedule section
  },
  scheduleContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  scheduleTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  scheduleDate: {
    color: "gray",
    marginBottom: 10,
  },
  scheduleDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  scheduleTime: {
    fontWeight: "bold",
  },
});
