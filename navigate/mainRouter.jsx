import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { routers } from "./routers";
import {
  ActivityScreen,
  AnalysticScreen,
  FaceRecognitionScreen,
  HistoryRoomScreen,
  HomeScreen,
  LoginScreen,
  OverallLabActive,
  ProfileScreen,
  ScheduleScreen,
} from "../screens";
import LogtimeHistoryScreen from "../screens/LogtimeHistoryScreen";
import FlashMessage from "react-native-flash-message";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import ShowAllRoomScreen from "../screens/ShowAllRoomScreen";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

async function requestPermissions() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    alert("Bạn cần cấp quyền thông báo để nhận thông báo!");
  }
}

function BottomTabNavigator() {
  useEffect(() => {
    requestPermissions();
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Thông báo nhận được:", notification);
      }
    );

    return () => subscription.remove();
  }, []);

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("find notify");
      try {
        const response = await fetch(
          `https://lab-manager-backend-production.up.railway.app/notify/get-and-mark-as-read?userId=${user.id}`
        );

        // const response = await axiosInstance.get(
        //   `/notify/get-and-mark-as-read?userId=${user.id}`
        // );
        const data = await response.json();

        if (
          data &&
          data.isSuccess &&
          Array.isArray(data.data) &&
          data.data.length > 0
        ) {
          console.log("Notification data:", data.data[0]);

          await Notifications.scheduleNotificationAsync({
            content: {
              title: data.data[0].title || "Thông báo mới",
              body: "Bạn có một thông báo mới về hoạt động của mình.",
              sound: true,
            },
            trigger: null,
          });
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra thông báo:", error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log("user : ", user?.role);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === routers.HOME) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === routers.SCHEDULE) {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === routers.EMPLOYEE) {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === routers.ACTIVITY) {
            iconName = focused ? "sync" : "sync-outline";
          } else if (route.name === routers.ACCOUNT) {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === routers.ANALYSIS) {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1EB7B8",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name={routers.HOME} component={HomeScreen} />
      <Tab.Screen name={routers.SCHEDULE} component={ScheduleScreen} />
      <Tab.Screen name={routers.EMPLOYEE} component={HistoryRoomScreen} />
      <Tab.Screen name={routers.ACTIVITY} component={ActivityScreen} />
      {user?.role === "ADMIN" && (
        <Tab.Screen name={routers.ANALYSIS} component={AnalysticScreen} />
      )}

      <Tab.Screen name={routers.ACCOUNT} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function RootStack() {
  return (
    <NavigationContainer>
      <FlashMessage position="top" />
      <Stack.Navigator initialRouteName={routers.HOME}>
        {/* Login Screen */}
        <Stack.Screen
          name={routers.LOGIN}
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* Main Bottom Tab Navigator */}
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />

        {/* Other Stack Screens */}
        <Stack.Screen
          name={routers.OVERALL_ACTIVE}
          component={OverallLabActive}
          options={({ navigation }) => ({
            headerShown: false,
            title: "Tổng quan",
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Icon name="arrow-back-outline" size={28} color="#FFF" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={routers.LOGTIME_HISTORY}
          component={LogtimeHistoryScreen}
          options={{
            title: "Xem lịch sử",
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
          }}
        />
        <Stack.Screen
          name={routers.FACE_RECOGNIZE}
          component={FaceRecognitionScreen}
        ></Stack.Screen>
        <Stack.Screen
          name={routers.SHOW_ALL_ROOM}
          component={ShowAllRoomScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#FF7A44",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    height: 80,
    zIndex: 1,
  },
  headerTitleStyle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    paddingLeft: 10,
    paddingRight: 4,
  },
});
