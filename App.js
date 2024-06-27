import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/screens/AuthScreen/Login";
import Register from "./src/screens/AuthScreen/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";
import { useRef } from "react";
import StackNavigate from "./src/services/StackNavigate";
import { Provider } from "react-redux";
import { store } from "./src/app/store";

const Stack = createNativeStackNavigator();

export default function App() {
  const Messageref = useRef(null);

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigate />
        </NavigationContainer>
        <StatusBar style="auto" />

        <FlashMessage position="top" ref={Messageref} />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
