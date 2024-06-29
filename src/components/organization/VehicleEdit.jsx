import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import axios from "axios";
  import { BASE_URL } from "../../services/baseurl";
  import { showMessage } from "react-native-flash-message";
  import { useNavigation } from "@react-navigation/native";
import { setOrgVehicles } from "../../app/features/auth/AuthSlice";
  
  const VehicleEdit = ({ route }) => {
    const vehicle = route.params.vehicle;
    const token = useSelector((state) => state.auth.token);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const vehicles = useSelector((state) => state.auth.vehicles);

    const [vehicleData, setVehicleData] = useState({
      license_number: vehicle.driver.license_number,
      registration_number: vehicle.registration_number,
      vehicle_type: vehicle.vehicle_type,
      company_made: vehicle.company_made,
      model: vehicle.model,
      color: vehicle.color,
      seating_capacity: vehicle.seating_capacity,
      license_plate_number: vehicle.license_plate_number,
    });
  
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async () => {
      setLoading(true);
      console.log("====Vehicle edit Data====");
      console.log("Vehicle Data", vehicleData);
      console.log("====Vehicle edit Data====");

      try {
        const res = await axios.put(
          `${BASE_URL}/organization/vehicle/${vehicle.registration_number}/`,
          vehicleData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Vehicle updated successfully", res.data);
        dispatch(setOrgVehicles({
          vehicles: [...vehicles, res.data.data],
          vehicle: res.data.data,
      }));
        showMessage({
          message: "Updated Vehicle",
          description: "Vehicle updated successfully",
          type: "success",
        });
        navigation.goBack();
      } catch (error) {
        console.error("Error updating vehicle:", error);
        Alert.alert("Error", "Failed to update vehicle");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <ScrollView className="p-4 bg-gray-100">
        <Text className="text-2xl font-bold mb-4 text-center">Edit Vehicle</Text>
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-1">License Number</Text>
          <TextInput
            className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
            placeholder="License Number"
            value={vehicleData.license_number}
            onChangeText={(text) =>
              setVehicleData({ ...vehicleData, license_number: text })
            }
        
          />
        </View>
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-1">Registration Number</Text>
          <TextInput
            className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
            placeholder="Registration Number"
            value={vehicleData.registration_number}
            onChangeText={(text) =>
              setVehicleData({ ...vehicleData, registration_number: text })
            }
            editable={false}
          />
        </View>
  
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-1">Vehicle Type</Text>
          <TextInput
            className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
            placeholder="Vehicle Type"
            value={vehicleData.vehicle_type}
            onChangeText={(text) =>
              setVehicleData({ ...vehicleData, vehicle_type: text })
            }
            
          />
        </View>
  
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-1">Company Made</Text>
          <TextInput
            className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
            placeholder="Company Made"
            value={vehicleData.company_made}
            onChangeText={(text) =>
              setVehicleData({ ...vehicleData, company_made: text })
            }
          />
        </View>
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-1">Model</Text>
          <TextInput
            className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
            placeholder="Model"
            value={vehicleData.model}
            onChangeText={(text) =>
              setVehicleData({ ...vehicleData, model: text })
            }
          />
        </View>
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-1">Color</Text>
          <TextInput
            className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
            placeholder="Color"
            value={vehicleData.color}
            onChangeText={(text) =>
              setVehicleData({ ...vehicleData, color: text })
            }
          />
        </View>
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-1">Seating Capacity</Text>
          <TextInput
            className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
            placeholder="Seating Capacity"
            value={vehicleData.seating_capacity}
            onChangeText={(text) =>
              setVehicleData({ ...vehicleData, seating_capacity: text })
            }
          />
        </View>
  
        <View className="mb-4">
          <Text className="text-sm font-semibold mb-1">License Plate Number</Text>
          <TextInput
            className="border-2 border-gray-300 rounded-lg p-2 w-full bg-white"
            placeholder="License Plate Number"
            value={vehicleData.license_plate_number}
            onChangeText={(text) =>
              setVehicleData({ ...vehicleData, license_plate_number: text })
            }
            editable={false}
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          className="border-2 border-green-300 bg-green-500 rounded-lg py-3"
          disabled={loading}
        >
          <Text className="text-center text-lg font-semibold text-white">
            {loading ? "Updating..." : "Update Vehicle"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  
  export default VehicleEdit;
  
  const styles = StyleSheet.create({});
  