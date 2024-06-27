import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GooglePlacesName from "../components/common/GooglePlacesName";

const AddressPickUp = ({ route }) => {
  console.log("AddressPickUp route:===>", route?.params?.data);
  const { address, currentLocation } = route?.params?.data || {};
  const { latitude, longitude } = currentLocation?.coords || {};
  console.log("AddressPickUp:===>", address, currentLocation);
  console.log("AddressPickUp latitude and longitude:===>", latitude, longitude);
  return (
    <View style={styles.container}>
      <GooglePlacesName
        placeholdertext="Pick A Destination"
        latitude={latitude}
        longitude={longitude}
      />
    </View>
  );
};

export default AddressPickUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
