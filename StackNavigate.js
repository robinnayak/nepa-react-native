import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/AuthScreen/Login";
import Register from "./src/screens/AuthScreen/Register";

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
     
    </Stack.Navigator>
  );
};

export default StackNavigate;

const styles = StyleSheet.create({});
