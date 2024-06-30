import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../services/baseurl";

const HomePage = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [trips, setTrips] = useState([]);
  const [datas, setDatas] = useState([]);
  const [passenger, setPassenger] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("vehicles");
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchPassenger();
    fetchVehicles();
  }, []);

  const fetchPassenger = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/passenger/`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setPassenger(response.data);
    } catch (error) {
      console.error("Error fetching passenger data:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/organization/vehicle/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDatas(response.data?.data || []);
      splitDataToVehicleAndTrip(response.data?.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      setIsLoading(false);
    }
  };

  const splitDataToVehicleAndTrip = (data) => {
    const vehiclesList = [];
    const tripsList = [];

    data.forEach((item) => {
      vehiclesList.push(item.vehicle);
      tripsList.push(item.trip_price);
    });

    setVehicles(vehiclesList);
    setTrips(tripsList);
  };

  const handleSearch = () => {
    const filtered = trips.filter((trip) => {
      const tripDestination = trip.trip.to_location.toLowerCase();
      const inputDestination = destination.toLowerCase();
      const tripDate = trip.trip.start_datetime.split("T")[0];
      const inputDate = date;

      const matchesDestination =
        inputDestination === "" || tripDestination.includes(inputDestination);
      const matchesDate = inputDate === "" || tripDate === inputDate;

      return filter === "vehicles"
        ? matchesDestination || matchesDate
        : matchesDestination && matchesDate;
    });
    setFilteredTrips(filtered);
  };

  const VehicleList = ({ trips }) => (
    <View>
      {trips.map((trip, index) => (
        <View key={index} className="mb-4">
          <Text className="text-lg font-bold">{trip?.vehicle?.model||"Cursie"}</Text>
          <Text>Type: {trip?.vehicle?.vehicle_type || "van"}</Text>
          <Text>Seats: {trip?.vehicle?.seating_capacity|| 14}</Text>
          <Text>Color: {trip?.vehicle?.color|| "white"}</Text>
          <Text>License Plate: {trip?.vehicle?.license_plate_number || "NEP01903"}</Text>
        </View>
      ))}
    </View>
  );

  const TripList = ({ trips }) => (
    <View>
      {trips.map((trip, index) => (
        <View key={index} className="mb-4">
          <Text className="text-lg font-bold">
            Destination: {trip.trip.to_location}
          </Text>
          <Text>Date: {trip.trip.start_datetime}</Text>
          <Text>Price: {trip.price}</Text>
        </View>
      ))}
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView className="p-4 bg-gray-100">
      <View className="mb-4">
        <Text className="text-2xl font-bold">
          Hello, {passenger ? passenger.user.username : "Passenger"}!
        </Text>
        <Text className="text-lg text-gray-600">
          Where would you like to go today?
        </Text>
      </View>

      <View className="mb-4">
        <TextInput
          placeholder="Enter destination"
          className="border border-gray-300 p-2 rounded-md"
          value={destination}
          onChangeText={setDestination}
        />
        <TextInput
          placeholder="Select date"
          className="border border-gray-300 p-2 rounded-md mt-2"
          value={date}
          onChangeText={setDate}
        />
        <Button title="Search Trips" onPress={handleSearch} />
      </View>

      <View className="mb-4">
        <Text className="text-xl font-bold">Fixed Destinations</Text>
        {["Janakpur to Kathmandu", "Dharan to Kathmandu"].map(
          (destination, index) => (
            <TouchableOpacity key={index} className="mb-2">
              <Text className="text-base text-blue-500">{destination}</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <View className="flex-row justify-between mb-4">
        <Button title="Vehicles" onPress={() => setFilter("vehicles")} />
        <Button title="Trips" onPress={() => setFilter("trips")} />
      </View>

      <View className="mb-4">
        {filter === "vehicles" ? (
          <VehicleList
            trips={filteredTrips.length > 0 ? filteredTrips : trips}
          />
        ) : (
          <TripList trips={filteredTrips.length > 0 ? filteredTrips : trips} />
        )}
      </View>

      <View className="mb-4">
        <Text className="text-xl font-bold">Need Help?</Text>
        <Button title="Contact Support" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

const PassengerProfile = ({ navigation }) => {
  return <HomePage navigation={navigation} />;
};

export default PassengerProfile;
