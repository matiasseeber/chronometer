import { StyleSheet, Text, View } from "react-native";
import Chronometer from "./src/views/chronometer";
import Timer from "./src/views/timer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#121212",
  },
};

export default function App() {
  //AGREGAR UN MAIN ACA CON LA NAVEGACION PARA CADA VISTA
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
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
                    color={focused ? "#d88e20" : "#383838"}
                  />
                  <Text style={{ color: "#7c7c7c" }}>Chronómetro</Text>
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
                    color={focused ? "#d88e20" : "#383838"}
                  />
                  <Text style={{ color: "#7c7c7c" }}>Temporizador</Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 50,
  },
});
