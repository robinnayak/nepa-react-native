import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { BASE_URL } from "../services/baseurl";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import Menu from "../components/Menu";
import { useSelector } from "react-redux";
import ProfileDetailCard from "../components/common/ProfileDetailCard";

const Home = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.auth);
  const { username, user_id, token,is_driver, is_organization } = userData || {};
  console.log("====================================")
  console.log("userData", is_driver, is_organization);
  console.log("====================================")

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/logout/`);
      showMessage({
        message: "Successfully logged out",
        description: "You have successfully logged out",
        type: "success",
      });
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout failed", error);
      showMessage({
        message: "Logout failed",
        description: "Something went wrong. Please try again.",
        type: "danger",
      });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex flex-col justify-evenly p-4">
        {/* Profile Card */}
        <View className="mb-4">
          <ProfileDetailCard useId={user_id} navigation={navigation} IsDriver={is_driver} IsOrganization={is_organization} token={token} />
        </View>

        {/* Upcoming Trips Details */}
        <View className="mb-4 p-4 border-2 border-gray-200 rounded-lg">
          <Text className="text-lg font-semibold mb-2">Upcoming Trips Details</Text>
          {/* Add upcoming trips details here */}
        </View>

        {/* Three Cards */}
        <View className="flex flex-row justify-between mb-4">
          {/* Trip Card */}
          <View className="flex-1 mx-1 p-4 border-2 border-gray-200 rounded-lg items-center">
            <Text className="text-lg font-semibold">Trips</Text>
            {/* Add trip details here */}
          </View>
          {/* Vehicle Card */}
          <View className="flex-1 mx-1 p-4 border-2 border-gray-200 rounded-lg items-center">
            <Text className="text-lg font-semibold">Vehicle</Text>
            {/* Add vehicle details here */}
          </View>
          {/* Booking Card */}
          <View className="flex-1 mx-1 p-4 border-2 border-gray-200 rounded-lg items-center">
            <Text className="text-lg font-semibold">Booking</Text>
            {/* Add booking details here */}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 p-3 rounded-lg items-center"
        >
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
      {/* Bottom Menu */}
      <View className="border-t-2 border-teal-400 rounded-lg bg-slate-50 h-16 absolute bottom-0 w-full">
        <Menu navigation={navigation} />
      </View>
    </View>
  );
};

export default Home;
