import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SvgXml } from "react-native-svg";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import SvgImage from "../common/SvgImage";

const OrganizationDriverProfile = ({ route }) => {
  const { driver } = route.params;
  console.log("driver", driver);

  return (
    <View className="flex flex-col items-center p-4">
      <Text className="text-2xl font-bold mb-4">Driver Profile</Text>
      <View className="flex items-center mb-6">
        {driver.profile_image ? (
          <Image
            source={{ uri: driver.profile_image }}
            style={styles.profileImage}
          />
        ) : (
          <>
            {/* <SvgXml xml={avatarSvg} width={100} height={100} /> */}
            <SvgImage seed={driver.user.username} />
          </>
        )}
        <Text className="text-xl font-semibold mt-2">
          {driver.user.username}
        </Text>
        <Text className="text-gray-600">{driver.address}</Text>
        <View className="flex flex-row items-center mt-2">
          <View
            className={`w-3 h-3 rounded-full mr-2 ${
              driver.availability_status ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <Text className="text-sm">
            {driver.availability_status ? "Online" : "Offline"}
          </Text>
        </View>
      </View>
      <View className="w-full">
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="text-sm font-semibold">Email:</Text>
          <Text className="text-sm">{driver.user.email}</Text>
        </View>
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="text-sm font-semibold">Phone Number:</Text>
          <Text className="text-sm">{driver.user.phone_number}</Text>
        </View>
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="text-sm font-semibold">License Number:</Text>
          <Text className="text-sm">{driver.license_number}</Text>
        </View>
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="text-sm font-semibold">Driving Experience:</Text>
          <Text className="text-sm">{driver.driving_experience} years</Text>
        </View>
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="text-sm font-semibold">Total Rides:</Text>
          <Text className="text-sm">{driver.total_rides}</Text>
        </View>
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="text-sm font-semibold">Earnings:</Text>
          <Text className="text-sm">₹{driver.earnings}</Text>
        </View>
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="text-sm font-semibold">Rating:</Text>
          <Text className="text-sm">{driver.rating} / 5.0</Text>
        </View>
      </View>
    </View>
  );
};

export default OrganizationDriverProfile;

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#555555",
    borderWidth: 2,
  },
});
