import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../services/baseurl";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const HomePage = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [trips, setTrips] = useState([]);
  const [passenger, setPassenger] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("vehicles");
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());
  const token = useSelector((state) => state.auth.token);
  const [check_if_available, setCheckAvailable] = useState(false)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const passengerResponse = await axios.get(`${BASE_URL}/passenger/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setPassenger(passengerResponse.data);

      const vehicleResponse = await axios.get(
        `${BASE_URL}/organization/vehicle/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = vehicleResponse.data?.data || [];
      const vehiclesList = [];
      const tripsList = [];

      data.forEach((item) => {
        vehiclesList.push(item.vehicle);
        tripsList.push(item.trip_price);
      });

      setVehicles(vehiclesList);
      setTrips(tripsList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }, [token]);

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

  const InBetweenPlaces = ({ trip, destination }) => {
    const locationsInBetween = [
      "Bardibas",
      "Sindhuli",
      "Nepalthok",
      "Mangaltar",
      "Palekhet",
      "Kavre Bhaynjung",
      "Dhulikhel",
      "Banepa",
      "Sanga",
    ];

    const fromLocation = trip.from_location.toLowerCase();
    const toLocation = trip.to_location.toLowerCase();
    const inputDestination = destination.toLowerCase();

    const isTripBetweenKathmanduJanakpur =
      fromLocation === "kathmandu" && toLocation === "janakpur";

    const isInBetween = isTripBetweenKathmanduJanakpur
      ? locationsInBetween.some(
          (location) => location.toLowerCase() === inputDestination
        )
      : false;

    return (
      <View>
        <Text className="text-lg text-green-400 font-semibold">
          {isInBetween ? "Yes" : ""}
          {/* {isInBetween ? setCheckAvailable(true) : ""} */}
        </Text>
        <Text>
          {isTripBetweenKathmanduJanakpur &&
            `[${locationsInBetween.join(", ")}]`}
        </Text>
      </View>
    );
  };

  const VehicleList = ({ trips }) => (
    <SafeAreaView>
      {trips.map((trip, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("BookingDetailView", { trip: trip })
          }
        >
          <View className="mb-4">
            <Text className="text-lg font-bold">
              {trip?.vehicle?.model || "Cursie"}
            </Text>
            <Text>Type: {trip?.vehicle?.vehicle_type || "van"}</Text>
            <Text>Seats: {trip?.vehicle?.seating_capacity || 14}</Text>
            <Text>Color: {trip?.vehicle?.color || "white"}</Text>
            <Text>
              License Plate: {trip?.vehicle?.license_plate_number || "NEP01903"}
            </Text>
            <InBetweenPlaces trip={trip.trip} destination={destination} />
          </View>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );

  const TripList = ({ trips }) => (
    <View>
      {trips.map((trip, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("BookingDetailView", { trip: trip })
          }
        >
          <View className="mb-4">
            <Text className="text-lg font-bold">
              Journey {trip.trip.from_location} to Destination{" "}
              {trip.trip.to_location}
            </Text>
            <Text>Date: {trip.trip.start_datetime}</Text>
            <Text>Price: {trip.price}</Text>
            <InBetweenPlaces trip={trip.trip} destination={destination} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
      },
      mode: "date",
      minimumDate: new Date(),
    });
  };
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
        {/* <View style={styles.calendar}>
          <Text className="border-2 border-gray-300 p-2 rounded-md">{date.toDateString()}</Text>
          <Button onPress={showDatePicker} title="Select date" />
        </View> */}
        <Button title="Search Trips" onPress={handleSearch} />
      </View>

      {/* <View className="mb-4">
        <Text className="text-xl font-bold">Fixed Destinations</Text>
        {["Janakpur to Kathmandu", "Dharan to Kathmandu"].map(
          (destination, index) => (
            <TouchableOpacity key={index} className="mb-2">
              <Text className="text-base text-blue-500">{destination}</Text>
            </TouchableOpacity>
          )
        )}
      </View> */}

      <View className="flex-row justify-between mb-4">
        <Button title="Vehicles" onPress={() => setFilter("vehicles")} />
        <Button title="Trips" onPress={() => setFilter("trips")} />
      </View>
      {/* <Text>{check_if_available?"yes":""}</Text> */}

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
const styles = StyleSheet.create({
  calendar: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});
// can you rewrite this and also improve the filtering code and logic