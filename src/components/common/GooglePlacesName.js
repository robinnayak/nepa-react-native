import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { GOOGLE_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { getDistance } from "geolib";
const GooglePlacesName = ({ placeholdertext, latitude, longitude }) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const fetchCoords = (data, details = null) => {
    // console.log("Google name search data", data);
    // console.log("Google name search details", details.geometry.location);
    // navigation.navigate("Map");
    if (
      latitude &&
      longitude &&
      details.geometry.location.lat &&
      details.geometry.location.lng
    ) {
      const distance = getDistance(
        { latitude: latitude, longitude: longitude },
        {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        }
      );
      const distanceInKm = distance / 1000;
      if (distanceInKm <= 1000) {
        navigation.navigate("Map", {
          data: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          },
        });
      } else {
        Alert.alert("This service is only available within 1000km radius.");
      }

      // {
      //   distance / 1000 <= 1000
      //     ? () => {
      //         navigation.navigate("Map", {
      //           data: {
      //             latitude: details.geometry.location.lat,
      //             longitude: details.geometry.location.lng,
      //           },
      //         });
      //       }
      //     : Alert.alert("This service is only available within 1000km radius.");
      // }
    }
  };

  return (
    <GooglePlacesAutocomplete
      placeholder={placeholdertext}
      fetchDetails={true}
      onPress={fetchCoords}
      query={{
        key: GOOGLE_API_KEY,
        language: "en",
      }}
      styles={{
        textInputContainer: {
          backgroundColor: "grey",
        },
        textInput: {
          height: 38,
          color: "#5d5d5d",
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
      }}
    />
  );
};

export default GooglePlacesName;

const styles = StyleSheet.create({});
