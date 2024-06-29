import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../../services/baseurl";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";

const AddTrip = ({ navigation }) => {
  const token = useSelector((state) => state.auth.token);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  // const [startDateTime, setStartDateTime] = useState('');
  // const [endDateTime, setEndDateTime] = useState('');

  const handleAddTrip = async () => {
    const tripData = {
      from_location: fromLocation,
      to_location: toLocation,
      // start_datetime: startDateTime,
      // end_datetime: endDateTime,
    };

    try {
      await axios.post(`${BASE_URL}/organization/trip/`, tripData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      showMessage({
        message: "Added Trip",
        description: "Trip added successfully",
        type: "success",
      });
      // Alert.alert('Success', 'Trip added successfully');
      navigation.goBack();
    } catch (error) {
      console.error("Error adding trip:", error);
      Alert.alert("Error", "Failed to add trip");
    }
  };

  return (
    <View className="p-4 bg-gray-100 flex-1">
      <Text className="text-2xl font-semibold mb-4">Add Trip</Text>
      <View className="mb-4">
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-2 bg-white"
          placeholder="From Location"
          value={fromLocation}
          onChangeText={setFromLocation}
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-2 bg-white"
          placeholder="To Location"
          value={toLocation}
          onChangeText={setToLocation}
        />
        {/* <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-2 bg-white"
          placeholder="Start DateTime (YYYY-MM-DDTHH:MM:SS)"
          value={startDateTime}
          onChangeText={setStartDateTime}
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-2 bg-white"
          placeholder="End DateTime (YYYY-MM-DDTHH:MM:SS)"
          value={endDateTime}
          onChangeText={setEndDateTime}
        /> */}
      </View>
      <TouchableOpacity
        className="bg-blue-500 rounded-lg p-4"
        onPress={handleAddTrip}
      >
        <Text className="text-white text-center">Add Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTrip;

const styles = StyleSheet.create({});
