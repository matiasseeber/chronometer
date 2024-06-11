import { View, Text } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Chronometer from "./chronometer";
import Timer from "./timer";
import colors from "../resources/colors";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HistoryList, Lap } from "./historyList";
import { LapContext } from "../context/context";
import { useState } from "react";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function MainTabs() {
  const [laps, setLaps] = useState([] as Lap[]);
  return (
    <LapContext.Provider value={{ laps, setLaps }}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            height: 70,
            backgroundColor: "#121212",
          },
        }}
      >
        <Tab.Screen
          name="Chronometer"
          component={Chronometer}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons
                  name="timer"
                  size={24}
                  color={focused ? colors.orange : colors.middleGray}
                />
                <Text style={{ color: colors.middleGray }}>Chronómetro</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Timer"
          component={Timer}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="timer"
                  size={24}
                  color={focused ? colors.orange : colors.middleGray}
                />
                <Text style={{ color: colors.middleGray }}>Temporizador</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryList}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="list"
                  size={24}
                  color={focused ? colors.orange : colors.middleGray}
                />
                <Text style={{ color: colors.middleGray }}>Historial</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </LapContext.Provider>
  );
}
