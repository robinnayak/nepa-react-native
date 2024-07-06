import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../services/baseurl";
import SvgImage from "./SvgImage";

const Booking = ({ navigation }) => {
  const token = useSelector((state) => state.auth.token);
  const is_organization = useSelector((state) => state.auth.is_organization);
  const is_driver = useSelector((state) => state.auth.is_driver);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBookingData();
  }, []);

  const getBookingData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/organization/booking-filter/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response.data);
      setBookingData(response.data || []);
    } catch (error) {
      console.error("Fetching vehicles data failed", error);
      setBookingData([]);
    } finally {
      setLoading(false);
    }
  };

  const renderBookingCard = (booking) => {
    const {
      passenger,
      tripprice,
      booking_id,
      num_passengers,
      price,
      booking_datetime,
    } = booking;
    const { user, address, emergency_contact_name, emergency_contact_number } =
      passenger;
    const { username, email, phone_number: phoneNumber } = user || {};
    const { trip, vehicle, price: trip_price } = tripprice || {};
    const { trip_id, from_location, to_location, start_datetime, end_datetime } = trip || {};
    const {
      vehicle_type,
      model,
      color,
      company_made,
      seating_capacity,
      available_seat,
      license_plate_number,
      image,
      organization,
    } = vehicle;
    const {
      name,
      description,
      rating: orgRating,
      earnings: orgEarnings,
    } = organization || {};

    const startDateTime = start_datetime.replace("T", " ").split(".")[0];
    const endDateTime = end_datetime.replace("T", " ").split(".")[0];

    return (
      <View key={booking.id} className="bg-white p-4 m-2 rounded-lg shadow-lg">
        <View className="flex flex-row justify-between mb-2">
          <Text className="text-lg font-bold">From: {from_location}</Text>
          <Text className="text-lg font-bold">To: {to_location}</Text>
        </View>

        <Text className="text-lg font-bold mb-2">Vehicle Type: {vehicle_type}</Text>
        <View className="flex flex-row justify-between mb-2">
          <Text className="text-lg">Model: {model}</Text>
          <Text className="text-lg">{color} -- {company_made}</Text>
        </View>
        <View className="flex flex-row justify-between mb-2">
          <Text className="text-lg">Seating Capacity: {seating_capacity}</Text>
          <Text className="text-lg">Available Seats: {available_seat}</Text>
        </View>
        <Text className="text-lg mb-2">License Plate: {license_plate_number}</Text>

        {image? (
          <Image
            source={{ uri: image }}
            className="w-full h-40 mt-2 rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <SvgImage seed={username} />
        )}

        <View className="mt-4">
          <Text className="text-lg font-bold">Passenger Details</Text>
          <View className="flex flex-row justify-between mb-2">
            <Text className="text-lg">Name: {username}</Text>
            <Text className="text-lg">{phoneNumber}</Text>
          </View>
          <Text className="text-lg mb-2">Address: {address}</Text>
          <View className="flex flex-row justify-between mb-2">
            <Text className="text-lg">Emergency Contact: {emergency_contact_name}</Text>
            <Text className="text-lg">{emergency_contact_number}</Text>
          </View>
          <View className="flex flex-row justify-between mb-2">
            <Text className="text-lg">Num Of Passenger Traveling: {num_passengers}</Text>
            <Text className="text-lg">{price}</Text>
          </View>
        </View>

        <View className="mt-4">
          <Text className="text-lg font-bold">Trip Details</Text>
          <View className="flex flex-row justify-between flex-wrap mb-2">
            <Text className="text-lg">Start Date: {startDateTime}</Text>
            <Text className="text-lg">End Date: {endDateTime}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      {loading? (
        <Text className="text-center text-lg">Loading...</Text>
      ) : (
        bookingData.map((booking) => renderBookingCard(booking))
      )}
    </ScrollView>
  );
};

export default Booking;

const styles = StyleSheet.create({});