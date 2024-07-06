import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, Button, TextInput, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from "../../services/baseurl";

const BookingDetailView = ({ route }) => {
  const token = useSelector((state) => state.auth?.token);
  const passenger_email = useSelector((state) => state.auth?.email);
  const trip_price_id = route?.params?.trip.trip_price_id;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [numOfPassengers, setNumOfPassengers] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    getTripPrice();
  }, []);

  const getTripPrice = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/organization/tripprice/${trip_price_id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (error) {
      console.error("Error fetching trip price:", error);
      Alert.alert("Error", "Failed to fetch trip price. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/organization/booking/`, {
        trip_price_id: trip_price_id || "",
        num_passengers: numOfPassengers || 1,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Booking response:", res.data);
      Alert.alert("Booking Successful", "Your booking has been confirmed.");
      navigation.goBack();
    } catch (error) {
      console.error("Error making booking:", error);
      Alert.alert("Booking Failed", "There was an error with your booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = () => {
    Alert.alert(
      "Confirm Booking",
      `Are you sure you want to book this trip?\nYou need to pay: ${parseInt(data.price) * numOfPassengers}`,
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "OK", onPress: () => handleBooking() }
      ]
    );
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-lg font-medium mt-2">Loading...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-medium">No Data Available</Text>
      </View>
    );
  }

  const { trip, vehicle } = data;
  const { driver } = vehicle;

  return (
    <ScrollView className="p-4">
      <DetailCard title="Trip Details">
        <Text className="text-lg">From: {trip.from_location}</Text>
        <Text className="text-lg">To: {trip.to_location}</Text>
        <Text className="text-lg">Start Time: {new Date(trip.start_datetime).toLocaleString()}</Text>
        <Text className="text-lg">End Time: {new Date(trip.end_datetime).toLocaleString()}</Text>
      </DetailCard>

      <DetailCard title="Driver">
        <Text className="text-lg">Name: {driver.user.username}</Text>
        <Text className="text-lg">Phone: {driver.user.phone_number}</Text>
        <Text className="text-lg">Rating: {driver.rating}</Text>
      </DetailCard>

      <DetailCard title="Vehicle">
        <Text className="text-lg">Type: {vehicle.vehicle_type}</Text>
        <Text className="text-lg">Model: {vehicle.model}</Text>
        <Text className="text-lg">Color: {vehicle.color}</Text>
        <Text className="text-lg">Available Seat: {vehicle.available_seat}</Text>
        {vehicle.image && (
          <Image
            source={{ uri: vehicle.image }}
            className="w-full h-40 mt-2"
            resizeMode="cover"
          />
        )}
      </DetailCard>

      <DetailCard title="Booking">
        <Text className="text-lg">Price: {data.price}</Text>
        <TextInput
          className="border p-2 mt-2"
          placeholder="Number of Passengers"
          keyboardType="numeric"
          value={numOfPassengers.toString()}
          onChangeText={text => setNumOfPassengers(Number(text))}
        />
      </DetailCard>

      <View className="flex flex-row justify-between mt-4">
        <Button title="Cancel" onPress={handleCancel} color="#dc2626" />
        <Button title="Confirm Booking" onPress={confirmBooking} color="#16a34a" />
      </View>
    </ScrollView>
  );
};

const DetailCard = ({ title, children }) => (
  <View className="mb-4 p-4 bg-white shadow rounded-lg">
    <Text className="text-2xl font-bold mb-2">{title}</Text>
    {children}
  </View>
);

export default BookingDetailView;
