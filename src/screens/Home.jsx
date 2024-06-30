import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { BASE_URL } from "../services/baseurl";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import Menu from "../components/Menu";
import { useSelector } from "react-redux";
import ProfileDetailCard from "../components/common/ProfileDetailCard";
import Drivers from "../components/Driver/OrgnizationDrivers";

const Home = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.auth);
  const {
    username,
    user_id,
    token,
    is_driver,
    is_organization,
    profile_image,
  } = userData || {};

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
          <ProfileDetailCard
            useId={user_id}
            navigation={navigation}
            IsDriver={is_driver}
            IsOrganization={is_organization}
            token={token}
          />
        </View>

        {/* Upcoming Trips Details */}
        {is_organization && (
          <View className="mb-4 p-4 border-2 border-gray-200 rounded-lg">
            <Drivers navigation={navigation} />
          </View>
        )}
        {/* {!is_driver && !is_organization && (
          <Text className="text-center text-lg font-semibold">
            passenger Upcoming Trips Details
          </Text>
        )} */}

        {/* Three Cards */}
        <View className="flex flex-row justify-between mb-4">
          {/* Trip Card */}

          {is_organization && (
            <TouchableOpacity
              className="flex-1 mx-1 p-4 border-2 border-gray-200 "
              onPress={() => navigation.navigate("TripsScreen")}
            >
              <View className="rounded-lg items-center">
                <Text className="text-lg font-semibold">Trips</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* {!is_driver && !is_organization && (
            <TouchableOpacity
              className="flex-1 mx-1 p-4 border-2 border-gray-200 "
              onPress={() => console.log("Trips screen is clicked")}
            >
              <View className="rounded-lg items-center">
                <Text className="text-lg font-semibold">Trips</Text>
              </View>
            </TouchableOpacity>
          )} */}

          {/* Add trip details here */}
          {/* Vehicle Card */}

          {is_organization && (
            <TouchableOpacity
              className="flex-1 mx-1 p-4 border-2 border-gray-200 "
              onPress={() => navigation.navigate("Vehicle")}
            >
              <View className="rounded-lg items-center">
                <Text className="text-lg font-semibold">Vehicle</Text>
              </View>
            </TouchableOpacity>
          )}
          {/* {!is_driver && !is_organization && (
            <TouchableOpacity
              className="flex-1 mx-1 p-4 border-2 border-gray-200 "
              onPress={() => console.log("Vehicle screen is clicked")}
            >
              <View className="rounded-lg items-center">
                <Text className="text-lg font-semibold">Vehicle</Text>
              </View>
            </TouchableOpacity>
          )} */}
          {/* Booking Card */}

          {is_organization && (
            <TouchableOpacity
              className="flex-1 mx-1 p-4 border-2 border-gray-200 "
              onPress={() => navigation.navigate("Booking")}
            >
              <View className="rounded-lg items-center">
                <Text className="text-lg font-semibold">Booking</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* {!is_driver && !is_organization && (
            <TouchableOpacity
              className="flex-1 mx-1 p-4 border-2 border-gray-200 "
              onPress={() => console.log("Booking screen is clicked")}
            >
              <View className="rounded-lg items-center">
                <Text className="text-lg font-semibold">Booking</Text>
              </View>
            </TouchableOpacity>
          )} */}
        </View>

        {/* Logout Button */}
        {/* <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 p-3 rounded-lg items-center"
        >
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity> */}
      </View>
      {/* Bottom Menu */}
      <View className="border-t-2 border-teal-400 rounded-lg bg-slate-50 h-16 absolute bottom-0 w-full">
        <Menu navigation={navigation} />
      </View>
    </View>
  );
};

export default Home;
