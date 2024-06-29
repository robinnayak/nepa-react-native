import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../services/baseurl";
import { setOrgVehicles } from "../../app/features/auth/AuthSlice";
import RNPickerSelect from "react-native-picker-select";

const AddVehicle = () => {
  const token = useSelector((state) => state.auth.token);
  const vehicles = useSelector((state) => state.auth.vehicles);
  const vehicle_types = ["car", "van", "motorcycle"];
  const dispatch = useDispatch();

  const [vehicleData, setVehicleData] = useState({
    license_number: "",
    registration_number: "",
    vehicle_type: "",
    company_made: "",
    model: "",
    color: "",
    seating_capacity: "",
    license_plate_number: "",
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleInputChange = (field, value) => {
    setVehicleData((prevData) => ({
      ...prevData,
      [field]: field === "seating_capacity" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/organization/vehicle/`,
        vehicleData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        setOrgVehicles({
          vehicles: [...vehicles, res.data.data],
          vehicle: res.data.data,
        })
      );

      showMessage({
        message: "Added Vehicle",
        description: "Vehicle added successfully",
        type: "success",
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error adding vehicle:", error);
      Alert.alert("Error", "Failed to add vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4 text-center">Add Vehicle</Text>
      <View className="mb-4">
        <Text className="text-sm font-semibold mb-1">License Number</Text>
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
          placeholder="License Number"
          value={vehicleData.license_number}
          onChangeText={(text) => handleInputChange("license_number", text)}
        />
      </View>
      <View className="mb-4">
        <Text className="text-sm font-semibold mb-1">Registration Number</Text>
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
          placeholder="Registration Number"
          value={vehicleData.registration_number}
          onChangeText={(text) => handleInputChange("registration_number", text)}
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold mb-1">Vehicle Type</Text>
        <RNPickerSelect
          onValueChange={(value) => handleInputChange("vehicle_type", value)}
          items={vehicle_types.map((type) => ({ label: type, value: type }))}
          value={vehicleData.vehicle_type}
          style={{
            inputIOS: {
              borderColor: "gray",
              borderRadius: 4,
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
              backgroundColor: "white",
            },
            inputAndroid: {
              borderColor: "gray",
              borderRadius: 4,
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
              backgroundColor: "white",
            },
          }}
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold mb-1">Company Made</Text>
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
          placeholder="Company Made"
          value={vehicleData.company_made}
          onChangeText={(text) => handleInputChange("company_made", text)}
        />
      </View>
      <View className="mb-4">
        <Text className="text-sm font-semibold mb-1">Model</Text>
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
          placeholder="Model"
          value={vehicleData.model}
          onChangeText={(text) => handleInputChange("model", text)}
        />
      </View>
      <View className="mb-4">
        <Text className="text-sm font-semibold mb-1">Color</Text>
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
          placeholder="Color"
          value={vehicleData.color}
          onChangeText={(text) => handleInputChange("color", text)}
        />
      </View>
      <View className="mb-4">
        <Text className="text-sm font-semibold mb-1">Seating Capacity</Text>
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
          placeholder="Seating Capacity"
          value={vehicleData.seating_capacity.toString()}
          keyboardType="numeric"
          onChangeText={(text) => handleInputChange("seating_capacity", text)}
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold mb-1">License Plate Number</Text>
        <TextInput
          className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
          placeholder="License Plate Number"
          value={vehicleData.license_plate_number}
          onChangeText={(text) =>
            handleInputChange("license_plate_number", text)
          }
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        className="border-2 border-green-300 bg-green-500 rounded-lg py-3"
        disabled={loading}
      >
        <Text className="text-center text-lg font-semibold text-white">
          {loading ? "Posting..." : "Add Vehicle"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddVehicle;
