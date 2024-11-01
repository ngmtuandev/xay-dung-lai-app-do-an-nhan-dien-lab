import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import calender from "../assets/images/calender.png";
import { BoxItemLabActive } from "../component";
import axiosInstance from "../config/axiosConfig";
import { useSelector } from "react-redux";

const OverallLabActive = () => {
  const [isShowCalender, setIsShowCalender] = useState(false);
  const [allLab, setAllLab] = useState([]);

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const [flag, setFlag] = useState(false);

  const apiGetAllLab = async () => {
    const response = await axiosInstance.post("/lab/find-all");
    return response?.data;
  };

  useEffect(() => {
    (async () => {
      const response = await apiGetAllLab();
      if (response?.isSuccess) {
        setAllLab(response?.data);
      }
    })();
  }, [flag]);

  return (
    <ScrollView style={styles.container}>
      {/* Calendar hiển thị trên cùng */}
      {/* {isShowCalender && (
        <View style={styles.calendarWrapper}>
          <Calendar
            style={styles.calendar}
            onDayPress={(day) => {
              console.log("Day pressed:", day);
            }}
          />
        </View>
      )} */}

      {/* <TouchableOpacity
        onPress={() => setIsShowCalender(!isShowCalender)}
        style={styles.iconWrapper}
      >
        <Image source={calender} style={styles.icon} />
      </TouchableOpacity> */}

      <View style={styles.boxWrapper}>
        {allLab?.map((item, index) => {
          return (
            <BoxItemLabActive
              setFlag={setFlag}
              flag={flag}
              key={index}
              data={item}
              isActive={item?.isDoingUse}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default OverallLabActive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Đảm bảo các thành phần bên trong có thể dùng position tuyệt đối
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
