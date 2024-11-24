import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { routers } from "./routers";
import {
  ActivityScreen,
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
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
