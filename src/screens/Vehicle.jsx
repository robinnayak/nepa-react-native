import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import { BASE_URL } from "../services/baseurl";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import VehicleDetailCard from "../components/Driver/VehicleDetaiCard";

const Vehicle = () => {
  const token = useSelector((state) => state.auth.token);
  const [vehicles, setVehicles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getVehiclesData();
  }, []);

  const getVehiclesData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/organization/vehicle-filter-org/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response.data);
      setVehicles(response.data || []);
    } catch (error) {
      console.error("Fetching vehicles data failed", error);
      setVehicles([]);
    }
  };

  const onAdd = () => {
    navigation.navigate("AddVehicle");
  };
  
  return (
    <View className="p-4 flex-1 bg-gray-100">
      <Text className="text-2xl font-semibold mb-4">Vehicles</Text>
      <ScrollView className="flex-1">
        <TouchableOpacity
          className="bg-blue-500 rounded-lg p-2 mb-4"
          onPress={onAdd}
        >
          <Text className="text-white text-center">Add New Vehicle</Text>
        </TouchableOpacity>
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <VehicleDetailCard
              key={vehicle.id}
              vehicle={vehicle}
              navigation={navigation}
            />
          ))
        ) : (
          <View className="items-center justify-center h-full mb-5 pb-3">
            <Text className="text-gray-600 mb-4">No vehicles available.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Vehicle;

const styles = StyleSheet.create({});
