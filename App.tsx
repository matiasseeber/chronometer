import { StyleSheet, Text, View } from "react-native";
import Chronometer from "./src/views/chronometer";
import Timer from "./src/views/timer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "./src/resources/colors";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={
        {
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
        }
      }>
        <Tab.Screen
          name="Chronometer"
          component={Chronometer}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <MaterialIcons
                    name="timer"
                    size={24}
                    color={focused ? colors.orange : colors.middleGray}
                  />
                  <Text style={{ color: colors.middleGray }}>Chronómetro</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Timer"
          component={Timer}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Ionicons
                    name="timer"
                    size={24}
                    color={focused ? colors.orange : colors.middleGray}
                  />
                  <Text style={{ color: colors.middleGray }}>Temporizador</Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}