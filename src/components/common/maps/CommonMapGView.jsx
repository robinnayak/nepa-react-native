import React, { useEffect, useState, useRef } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../services/baseurl";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const CommonMapGView = () => {
  const [location, setLocation] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        setLocation(location);
        postLocation(location.coords);
      } catch (error) {
        setErrorMsg("Unable to retrieve location. Please try again.");
      }
    })();
  }, []);

  const postLocation = async (coords) => {
    console.log("Coordinates:", coords);

    // Validate and parse the latitude and longitude
    const roundedToFiveDecimal = (num)=> Math.round(num*1e5)/1e5;
    const latitude = roundedToFiveDecimal(coords.latitude)
    const longitude = roundedToFiveDecimal(coords.longitude)
    console.log("latitude",latitude)    
    console.log("latitude",longitude)    
    // const latitude = parseFloat(roundedLatitude);
    // const longitude = parseFloat(roundedLongitude);
    const heading = coords.heading ? parseFloat(coords.heading) : 0; // Default heading to 0 if not provided

    console.log(typeof latitude, typeof longitude, typeof heading); // Log types
    
    if (isNaN(latitude) || isNaN(longitude)) {
      console.error("Invalid coordinates:", coords);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/location/`,
        {
          latitude: 27.666700,
          longitude: 85.316700,
          heading: 109,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Location posted successfully:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in request setup:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/location/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetch from driver", response.data);
      setDrivers(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const renderMarkers = () => {
    const markers = [];

    if (location && location.coords) {
      markers.push(
        <Marker
          key="currentLocation"
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          pinColor="red"
          title="My Location"
          description="This is my current location"
        />
      );
    }

    drivers.forEach((driver, index) => {
      markers.push(
        <Marker
          key={index}
          coordinate={{
            latitude: parseFloat(driver.latitude),
            longitude: parseFloat(driver.longitude),
          }}
          pinColor="blue"
          title={driver.user.username || "Driver"}
          description={`Driver: ${driver.user.email || "No email available"}`}
        />
      );
    });

    return markers;
  };

  return (
    <View className="flex-1">
      {location && location.coords ? (
        <MapView
          className="absolute top-0 left-0 right-0 bottom-0"
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={mapRef}
        >
          {renderMarkers()}
        </MapView>
      ) : errorMsg ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">{errorMsg}</Text>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

export default CommonMapGView;

const styles = StyleSheet.create({});
