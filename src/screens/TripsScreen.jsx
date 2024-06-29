import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../services/baseurl";
import { useSelector, useDispatch } from "react-redux";
import { setOrgTrips } from "../app/features/auth/AuthSlice";
import RNPickerSelect from "react-native-picker-select";
import { showMessage } from "react-native-flash-message";

const TripsScreen = ({ navigation }) => {
  const token = useSelector((state) => state.auth.token);
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [vehicleIds, setVehicleIds] = useState([]);

  const [data, setData] = useState({
    trip_id: "",
    vehicle_registration_number: "",
    price: "",
  });
  const [price, setPrice] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getTripsData();
    getVehicleIds();
  }, []);

  useEffect(() => {
    filterTrips();
  }, [fromLocation, toLocation, trips]);

  const getVehicleIds = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/organization/vehicle-filter-org/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const ids = response.data.map((vehicle) => vehicle.registration_number);
      console.log("Vehicle IDs", ids);
      setVehicleIds(ids);
    } catch (error) {
      console.error("Fetching vehicle data failed", error);
    }
  };

  const getTripsData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/organization/trip-filter-org/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrips(response.data);

      dispatch(
        setOrgTrips({
          trips: response.data,
        })
      );
      if (response.data.length > 0) {
        setFromLocation(response.data[0].from_location || "");
        setToLocation(response.data[0].to_location || "");
        setFilteredTrips(response.data);
      }
    } catch (error) {
      console.error("Fetching trips data failed", error);
    }
  };

  const filterTrips = () => {
    let updatedTrips = trips;

    if (fromLocation) {
      updatedTrips = updatedTrips.filter((trip) =>
        trip.from_location.toLowerCase().includes(fromLocation.toLowerCase())
      );
    }

    if (toLocation) {
      updatedTrips = updatedTrips.filter((trip) =>
        trip.to_location.toLowerCase().includes(toLocation.toLowerCase())
      );
    }

    setFilteredTrips(updatedTrips);
  };

  const deleteTrip = async (tripId) => {
    try {
      await axios.delete(`${BASE_URL}/organization/trip/${tripId}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTrips(trips.filter((trip) => trip.trip_id !== tripId));
      setFilteredTrips(filteredTrips.filter((trip) => trip.trip_id !== tripId));
    } catch (error) {
      console.error("Deleting trip failed", error);
    }
  };

  const handleSubmit = async (trip_id) => {
    setLoading(true);

    console.log("Trip ID", trip_id);
    console.log("Vehicle ID", data.vehicle_registration_number);
    console.log("Price", data.price);

    try {
      const response = await axios.post(
        `${BASE_URL}/organization/tripprice/`,
        {
          trip_id: trip_id,
          vehicle_registration_number: data.vehicle_registration_number,
          price: data.price,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showMessage({
        message: "Added Trip Price",
        description: "Trip price added successfully",
        type: "success",
      });

      console.log("Trip price added successfully", response.data);
    } catch (error) {
      console.error("Adding trip price failed", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTripItem = (trip) => (
    <View
      key={trip.trip_id}
      className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow"
    >
      <Text className="text-xl font-semibold">
        {trip.organization.name || "Organization Name"}
      </Text>
      <Text className="text-gray-600">
        Trip ID: {trip.trip_id || "KATH-001"}
      </Text>
      <Text className="text-gray-600">
        From: {trip.from_location || "Kathmandu"}
      </Text>
      <Text className="text-gray-600">
        To: {trip.to_location || "Janakpur"}
      </Text>
      <Text className="text-gray-600">
        Start: {new Date(trip.start_datetime).toLocaleString()}
      </Text>
      <Text className="text-gray-600">
        End: {new Date(trip.end_datetime).toLocaleString()}
      </Text>
      
      <View>
        <Text className="text-gray-600 font-semibold">Price:</Text>
        <TextInput
          placeholder="Enter Price"
          keyboardType="numeric"
          className="border border-gray-300 rounded p-2 mb-2"
          value={data.price.toString()}
          onChangeText={(text) => setData({ ...data, price: text })}
        />
        <View className="mb-4">
          <Text className="text-gray-600 font-semibold">
            Choose Vehicle Registration IDs:
          </Text>
          <RNPickerSelect
            onValueChange={(value) =>
              setData({ ...data, vehicle_registration_number: value })
            }
            items={vehicleIds.map((id) => ({ label: id, value: id }))}
            value={data.vehicle_registration_number}
            style={{
              inputAndroid: {
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 8,
                padding: 10,
                marginVertical: 8,
                color: "black",
              },
              inputIOS: {
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 8,
                padding: 10,
                marginVertical: 8,
                color: "black",
              },
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleSubmit(trip.trip_id)}
          className={`border-2 bg-green-500 rounded-lg py-3 ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
        >
          <Text className="text-center text-lg font-semibold text-white">
            {loading ? "Posting..." : "Add Price"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="bg-green-500 rounded-lg p-2 mt-2"
        onPress={() => navigation.navigate("TripView", { trip })}
      >
        <Text className="text-white text-center">View Trip</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-500 rounded-lg p-2 mt-2"
        onPress={() => deleteTrip(trip.trip_id)}
      >
        <Text className="text-white text-center">Delete Trip</Text>
      </TouchableOpacity>
    </View>
  );

  const navigateToAddTrip = () => {
    navigation.navigate("AddTrip");
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-semibold mb-4 text-center">Trips</Text>
      <View className="mb-4">
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-2 bg-white"
          placeholder="From Location"
          value={fromLocation}
          onChangeText={setFromLocation}
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-2 bg-white"
          placeholder="To Location"
          value={toLocation}
          onChangeText={setToLocation}
        />
      </View>
      <TouchableOpacity
        className="bg-blue-500 rounded-lg p-4 mb-4 items-center"
        onPress={navigateToAddTrip}
      >
        <Text className="text-white text-center">Add New Trip</Text>
      </TouchableOpacity>
      <ScrollView className="flex-1">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => renderTripItem(trip))
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-600 mb-4">
              There are no trips available. Add a new trip!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TripsScreen;
