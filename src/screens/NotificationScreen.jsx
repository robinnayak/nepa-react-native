import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL, MAIN_BASE_URL } from "../services/baseurl";
import { FontAwesome } from '@expo/vector-icons'; // Importing icons

const NotificationScreen = ({ navigation }) => {
  const token = useSelector((state) => state.auth?.token);
  const is_organization = useSelector((state) => state.auth?.is_organization);
  const is_driver = useSelector((state) => state.auth?.is_driver);
  const is_passenger = !is_organization && !is_driver;
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTicketNotifications();
  }, []);

  const getTicketNotifications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/organization/ticket-filter-notification/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTicketData(res.data);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error fetching ticket notifications:", error.response);
        Alert.alert(
          "Error",
          "Failed to fetch ticket notifications. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTicketPress = (ticket_file) => {
    console.log("Ticket clicked", ticket_file);
    console.log(`${MAIN_BASE_URL}${ticket_file}`);
    const url = ticket_file;
    
    Linking.openURL(`${MAIN_BASE_URL}${url}`);
    // Handle ticket click action here
  };

  const renderPassenger = (ticket) => {
    console.log("ticket", ticket);
    const { booking, ticket_id, ticket_file } = ticket;
    return (
      <TouchableOpacity
        key={ticket.ticket_id}
        className="bg-white shadow-lg p-4 my-2 rounded-lg flex-row items-center"
        onPress={() => handleTicketPress(ticket_file)}
      >
        <FontAwesome name="ticket" size={24} color="blue" className="mr-4" />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">
            Passenger Ticket
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="user" size={14} color="gray" />{" "}
            Passenger Name: {booking.passenger.user.username}
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="map-marker" size={14} color="gray" /> From:{" "}
            {booking.tripprice.trip.from_location}
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="map-marker" size={14} color="gray" /> To:{" "}
            {booking.tripprice.trip.to_location}
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="calendar" size={14} color="gray" /> Departure:{" "}
            {new Date(booking.tripprice.trip.start_datetime).toLocaleString()}
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="calendar" size={14} color="gray" /> Arrival:{" "}
            {new Date(booking.tripprice.trip.end_datetime).toLocaleString()}
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="money" size={14} color="gray" /> Price:{" "}
            {booking.tripprice.price}
          </Text>
          <Text className="text-blue-600 underline mt-2">View Ticket</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDriver = (ticket) => {
    console.log("ticket", ticket);
    const { booking, ticket_id, ticket_file } = ticket;
    return (
      <TouchableOpacity
        key={ticket_id}
        className="bg-white shadow-lg p-4 my-2 rounded-lg flex-row items-center"
        onPress={() => handleTicketPress(ticket_file)}
      >
        <FontAwesome name="car" size={24} color="green" className="mr-4" />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">
            Driver Notification
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="user" size={14} color="gray" /> Driver Name:{" "}
            {booking.tripprice.vehicle.driver.user.username}
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="car" size={14} color="gray" /> Vehicle:{" "}
            {booking.tripprice.vehicle.model}
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="list-alt" size={14} color="gray" /> Available
            Seats: {booking.tripprice.vehicle.available_seat}
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="calendar" size={14} color="gray" /> Departure:{" "}
            {new Date(booking.tripprice.trip.start_datetime).toLocaleString()}
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="calendar" size={14} color="gray" /> Arrival:{" "}
            {new Date(booking.tripprice.trip.end_datetime).toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderOrganization = (ticket) => {
    console.log("ticket", ticket);
    const { booking, ticket_id, ticket_file } = ticket;
    return (
      <TouchableOpacity
        key={ticket_id}
        className="bg-white shadow-lg p-4 my-2 rounded-lg flex-row items-center"
        onPress={() => handleTicketPress(ticket_file)}
      >
        <FontAwesome
          name="building"
          size={24}
          color="purple"
          className="mr-4"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">
            Organization Notification
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="building" size={14} color="gray" /> Organization:{" "}
            {booking.tripprice.trip.organization.name}
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="id-card" size={14} color="gray" /> Trip ID:{" "}
            {booking.tripprice.trip.trip_id}
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="map-marker" size={14} color="gray" /> From:{" "}
            {booking.tripprice.trip.from_location}
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="map-marker" size={14} color="gray" /> To:{" "}
            {booking.tripprice.trip.to_location}
          </Text>
          <Text className="text-gray-600">
            <FontAwesome name="money" size={14} color="gray" /> Earnings:{" "}
            {booking.tripprice.trip.organization.earnings}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 flex-col p-4 bg-gray-200">
      <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-bold mb-4 text-center">
          Notification Screen
        </Text>
        {loading && (
          <Text className="border-2 border-yellow-400 p-3 text-center">
            Loading...
          </Text>
        )}
        {is_passenger && ticketData.map((ticket) => renderPassenger(ticket))}
        {is_driver && ticketData.map((ticket) => renderDriver(ticket))}
        {is_organization &&
          ticketData.map((ticket) => renderOrganization(ticket))}
      </ScrollView>
      <View className="border-t-2 border-teal-400 bg-gray-50 h-16 absolute bottom-0 w-full">
        <Menu navigation={navigation} />
      </View>
    </View>
  );
};

export default NotificationScreen;
