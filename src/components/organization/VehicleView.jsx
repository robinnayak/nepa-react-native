import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import nepalogo from "../../../assets/nepalogo.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setOrgVehicles } from "../../app/features/auth/AuthSlice";
import axios from "axios";
import { BASE_URL } from "../../services/baseurl";
import { showMessage } from "react-native-flash-message";

const VehicleView = ({ route }) => {
  const vehicle = route.params.vehicle;
  const navigation = useNavigation();
  const vehicles = useSelector((state) => state.auth.vehicles);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const onView = () => {
    navigation.goBack();
  };
  const onEdit = (vehicle) => {
    navigation.navigate("VehicleEdit", { vehicle: vehicle });
  };
  const onDelete = async (vehicle) => {
    const res = await axios.delete(
      `${BASE_URL}/organization/vehicle/${vehicle.registration_number}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Vehicle deleted successfully", res.data);
    // dispatch(
    //   setOrgVehicles({
    //     vehicles: vehicles.filter((v) => v.id !== vehicle.id),
    //   })
    // );

    showMessage({
      message: "Deleted Vehicle",
      description: "Vehicle deleted successfully",
      type: "success",
    });
    navigation.goBack();
  };

  return (
    <View className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <Text className="text-xl font-semibold mb-2 text-blue-700">
        {vehicle.model}
      </Text>
      <View className="mb-2 space-y-1">
        <Text className="text-gray-600">
          Organization: {vehicle.organization.name}
        </Text>
        <Text className="text-gray-600">
          Driver: {vehicle.driver.user.username}
        </Text>
        <Text className="text-gray-600">
          Registration Number: {vehicle.registration_number}
        </Text>
        <Text className="text-gray-600">
          Vehicle Type: {vehicle.vehicle_type}
        </Text>
        <Text className="text-gray-600">
          Company Made: {vehicle.company_made}
        </Text>
        <Text className="text-gray-600">Color: {vehicle.color}</Text>
        <Text className="text-gray-600">
          Seating Capacity: {vehicle.seating_capacity}
        </Text>
        <Text className="text-gray-600">
          License Plate Number: {vehicle.license_plate_number}
        </Text>
        <Text className="text-gray-600">
          Insurance Expiry Date: {vehicle.insurance_expiry_date}
        </Text>
      </View>
      {vehicle.image ? (
        <Image
          source={{ uri: vehicle.image }}
          className="h-40 w-full rounded mb-4"
          style={styles.profileImage}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={nepalogo}
          className="h-40 w-full rounded mb-4"
          style={styles.profileImage}
          resizeMode="cover"
        />
      )}
      <View className="flex flex-row justify-between mt-4">
        <TouchableOpacity
          className="bg-green-500 rounded-lg p-2 flex-1 mx-1"
          onPress={() => onView()}
        >
          <Text className="text-white text-center">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-yellow-500 rounded-lg p-2 flex-1 mx-1"
          onPress={() => onEdit(vehicle)}
        >
          <Text className="text-white text-center">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 rounded-lg p-2 flex-1 mx-1"
          onPress={() => onDelete(vehicle)}
        >
          <Text className="text-white text-center">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VehicleView;

const styles = StyleSheet.create({
  profileImage: {
    width: "100%",
    height: 200,
  },
});
