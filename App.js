import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigate from "./StackNavigate";
import Login from "./src/screens/AuthScreen/Login";
import Register from "./src/screens/AuthScreen/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";
import { useRef } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const Messageref = useRef(null); 
  return (
    <>
      <NavigationContainer>
        <StackNavigate />
      </NavigationContainer>
      <StatusBar style="auto" />
      <View className=" border-t-2  border-teal-400  bg-slate-50 h-16">
        <Text>Menu</Text>
      </View>
      <FlashMessage position="top" ref={Messageref} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
