import React from "react";
import { View, Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Detail from "./Detail";
import Splash from "./SplashScreen";
import ListScreen from "./ListScreen";
import FoodScreen from "./FoodScreen";
import DetailFood from "./DetailFood";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Locations = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Detail" component={Detail} options={{
        headerTitle: "Chi tiết",
      }}/>
    </Stack.Navigator>
  );
};
const Foods = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Food" component={FoodScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="DetailFood" component={DetailFood} options={{
        headerTitle: "Chi tiết",
      }}/>
    </Stack.Navigator>
  );
};

export default function MainScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#F18934",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Locations}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name={focused ? "map" : "map-outline"}
                  size={focused ? 20 : 18}
                  color={focused ? "#fff" : "#ccc"}
                />
                <Text
                  style={{
                    color: focused ? "#fff" : "#ccc",
                    fontSize: 12,
                  }}
                >
                  Địa điểm
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Foods"
          component={Foods}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name={focused ? "fast-food" : "fast-food-outline"}
                  size={focused ? 20 : 18}
                  color={focused ? "#fff" : "#ccc"}
                />
                <Text
                  style={{
                    color: focused ? "#fff" : "#ccc",
                    fontSize: 12,
                  }}
                >
                  Món ngon
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Splash}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name={focused ? "globe" : "globe-outline"}
                  size={focused ? 20 : 18}
                  color={focused ? "#fff" : "#ccc"}
                />
                <Text
                  style={{
                    color: focused ? "#fff" : "#ccc",
                    fontSize: 12,
                  }}
                >
                  Kết nối
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
