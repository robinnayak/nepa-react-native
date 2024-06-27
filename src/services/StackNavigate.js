import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/AuthScreen/Login";
import Register from "../screens/AuthScreen/Register";
import Home from "../screens/Home";
import MapScreen from "../screens/MapScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AiScreen from "../screens/AiScreen";
import AddressPickUp from "../screens/AddressPickUp";
import EditPage from "../components/common/EditPage";
import TestScreen from "../screens/TestScreen";
const Stack = createNativeStackNavigator();

const StackNavigate = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: "Register",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Map",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: "Notification",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Ai"
        component={AiScreen}
        options={{
          title: "Ai",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="AddressPickUp"
        component={AddressPickUp}
        options={{
          title: "AddressPickUp",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="EditPage"
        component={EditPage}
        options={{
          title: "EditPage",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="TestPage"
        component={TestScreen}
        options={{
          title: "TestPage",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
     
    </Stack.Navigator>
  );
};

export default StackNavigate;

const styles = StyleSheet.create({});
