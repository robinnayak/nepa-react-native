import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer, faHome, faLocationDot, faBell, faMicrochip, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../services/baseurl";
import { showMessage } from "react-native-flash-message";

const Menu = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/logout`);
      console.log("response", response.data);
      showMessage({
        message: "Successfully logged out",
        description: "You have successfully logged out",
        type: "success",
      });
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const renderItem = (title, icon, onPress) => (
    <TouchableOpacity onPress={onPress} className="flex items-center">
      <FontAwesomeIcon icon={icon || faMugSaucer} size={24} className="text-gray-800" />
      <Text className="text-xs mt-1">{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex flex-row justify-around bg-white py-2 border-t border-gray-300">
      {renderItem("Map", faLocationDot, () => navigation.navigate("Map"))}
      {renderItem("Notifications", faBell, () => navigation.navigate("Notification"))}
      {renderItem("Home", faHome, () => navigation.navigate("Home"))}
      {renderItem("AI", faMicrochip, () => navigation.navigate("Ai"))}
      {renderItem("Logout", faRightFromBracket, handleLogout)}
    </View>
  );
};

export default Menu;
