import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { BASE_URL } from "../services/baseurl";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import Menu from "../components/Menu";
import { useSelector } from "react-redux";
import ProfileDetailCard from "../components/common/ProfileDetailCard";
import Drivers from "../components/Driver/OrgnizationDrivers";
import DriverOrganizationView from "../components/DriverProfile/DriverOrganizationView";

const Home = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.auth);
  const { username, user_id, token, is_driver, is_organization, profile_image } = userData || {};

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
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
            <View className="mb-4 p-4 border-2 border-gray-200 rounded-lg shadow">
              <Drivers navigation={navigation} />
            </View>
          )}
          {is_driver && (
            <View className="mb-4 p-4 border-2 border-gray-200 rounded-lg shadow">
              <DriverOrganizationView navigation={navigation} />
            </View>
          )}

          {/* Three Cards */}
          <View className="flex flex-row justify-between mb-4">
            {/* Trip Card */}
            {(is_organization || is_driver) && (
              <TouchableOpacity
                className="flex-1 mx-1 p-4 border-2 border-gray-200 rounded-lg shadow"
                onPress={() => navigation.navigate("TripsScreen")}
              >
                <View className="rounded-lg items-center">
                  <Text className="text-lg font-semibold">Trips</Text>
                </View>
              </TouchableOpacity>
            )}

            {/* Vehicle Card */}
            {(is_organization || is_driver) && (
              <TouchableOpacity
                className="flex-1 mx-1 p-4 border-2 border-gray-200 rounded-lg shadow"
                onPress={() => navigation.navigate("Vehicle")}
              >
                <View className="rounded-lg items-center">
                  <Text className="text-lg font-semibold">Vehicle</Text>
                </View>
              </TouchableOpacity>
            )}

            {/* Booking Card */}
            {(is_organization || is_driver) && (
              <TouchableOpacity
                className="flex-1 mx-1 p-4 border-2 border-gray-200 rounded-lg shadow"
                onPress={() => navigation.navigate("Booking")}
              >
                <View className="rounded-lg items-center">
                  <Text className="text-lg font-semibold">Booking</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* Logout Button */}
          {/* <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 p-3 rounded-lg items-center"
          >
            <Text className="text-white font-semibold">Logout</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      {/* Bottom Menu */}
      <View className="border-t-2 border-teal-400 rounded-lg bg-slate-50 h-16 absolute bottom-0 w-full">
        <Menu navigation={navigation} />
      </View>
    </View>
  );
};

export default Home;
