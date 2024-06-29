import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../services/baseurl";
import axios from "axios";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";

const TripView = ({ route }) => {
  const token = useSelector((state) => state.auth.token);
  const [tripData, setTripData] = useState({});
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const trip = route.params.trip;

  useEffect(() => {
    getTripsData();
  }, [tripData.price]);

  const getTripsData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/organization/price-trip/${trip.trip_id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTripData(response.data);
      setPrice(response.data.price);
    } catch (error) {
      console.error("Fetching trips data failed", error);
    }
  };

  const handleUpdatePrice = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/organization/tripprice/${tripData.trip_price_id}/`,
        {
          trip_id: trip.trip_id,
          vehicle_registration_number: tripData.vehicle.registration_number,
          price: price,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Trip price updated successfully", response.data);
      setTripData({ ...tripData, price: response.data.price });
      showMessage({
        message: "Updated Trip Price",
        description: "Trip price updated successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Updating trip price failed", error);
      showMessage({
        message: "Error",
        description: "Failed to update trip price",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="p-4 bg-gray-100 flex-1">
      <Text className="text-2xl font-semibold mb-4 text-center">
        Trip Details
      </Text>
      <View className="border border-gray-300 rounded-lg p-4 bg-white shadow mb-4">
        <Text className="text-xl font-semibold">
          {tripData.trip?.organization.name || "Organization Name"}
        </Text>
        <Text className="text-gray-600">
          Trip ID: {tripData.trip?.trip_id || "N/A"}
        </Text>
        <Text className="text-gray-600">
          Vehicle: {tripData.vehicle?.company_made || "N/A"}
          {","}
          {tripData.vehicle?.model || "N/A"} --{" "}
          {tripData.vehicle?.registration_number || "N/A"}
        </Text>
        <Text className="text-gray-600">
          Driver: {tripData.vehicle?.driver?.user?.username || "N/A"}
        </Text>

        <Text className="text-gray-600">
          From: {tripData.trip?.from_location || "N/A"}
        </Text>
        <Text className="text-gray-600">
          To: {tripData.trip?.to_location || "N/A"}
        </Text>
        <Text className="text-gray-600">
          Start:{" "}
          {tripData.trip?.start_datetime
            ? new Date(tripData.trip.start_datetime).toLocaleString()
            : "N/A"}
        </Text>
        <Text className="text-gray-600">
          End:{" "}
          {tripData.trip?.end_datetime
            ? new Date(tripData.trip.end_datetime).toLocaleString()
            : "N/A"}
        </Text>
        <Text className="text-gray-600">
          Price: {tripData.price ? `₹${tripData.price}` : "N/A"}
        </Text>

        <View className="mb-4">
          <Text className="text-gray-600 font-semibold">Price:</Text>
          <TextInput
            placeholder="Enter Price"
            keyboardType="numeric"
            className="border border-gray-300 rounded p-2 mb-2"
            value={price.toString()}
            onChangeText={setPrice}
          />
          <Text className="text-gray-600 font-semibold">
            Vehicle Registration ID:
          </Text>
          <TextInput
            value={tripData.vehicle?.registration_number || ""}
            className="border border-gray-300 rounded p-2 mb-2 bg-gray-200"
            editable={false}
          />
        </View>
        <TouchableOpacity
          onPress={handleUpdatePrice}
          className={`bg-green-500 rounded-lg py-3 ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
        >
          <Text className="text-center text-lg font-semibold text-white">
            {loading ? "Updating..." : "Update Price"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TripView;

const styles = StyleSheet.create({});
