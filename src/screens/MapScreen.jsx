import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Menu from "../components/Menu";
import { GOOGLE_API_KEY } from "@env";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import SearchBtn from "../components/SearchBtn";
import MapViewDirections from "react-native-maps-directions";
import { getDistance } from "geolib";

const MapScreen = ({ navigation, route }) => {
  const destCoords = route?.params?.data || null;

  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [dropup, setDropup] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [destAddress, setDestAddress] = useState({});
  const [distance, setDistance] = useState(null);

  const riderData = [
    { latitude: 26.7105, longitude: 85.9278, name: "Rider 1", loc: "Janakpur" },
    { latitude: 27.5922, longitude: 84.7964, name: "Rider 2", loc: "Chitwan" },
    { latitude: 28.2000, longitude: 83.9833, name: "Rider 3", loc: "Pokhara" },
    { latitude: 27.6706, longitude: 85.3797, name: "Rider 4", loc: "Banepa" },
    { latitude: 27.6667, longitude: 85.4167, name: "Rider 5", loc: "Bhaktapur" },
    { latitude: 27.1769, longitude: 84.9842, name: "Rider 6", loc: "Hetauda" },
  ];

  useEffect(() => {
    if (destCoords) {
      setDropup({
        latitude: destCoords.latitude,
        longitude: destCoords.longitude,
      });
    }
  }, [destCoords]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg("Unable to retrieve location. Please try again.");
      }
    })();
  }, []);

  useEffect(() => {
    if (location && dropup) {
      getDistanceBetween();
    }
  }, [location, dropup]);

  useEffect(() => {
    let locationSubscription;
    const startLocationTracking = async () => {
      try {
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          (newLocation) => {
            setLocation(newLocation);
            if (dropup) {
              getDistanceBetween(newLocation, dropup);
            }
          }
        );
      } catch (error) {
        setErrorMsg("Error in location tracking. Please try again.");
      }
    };

    startLocationTracking();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [dropup]);

  const getDistanceBetween = useCallback((currentLocation = location, dropupLocation = dropup) => {
    if (currentLocation && dropupLocation) {
      const distance = getDistance(
        {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
        {
          latitude: dropupLocation.latitude,
          longitude: dropupLocation.longitude,
        }
      );
      setDistance(distance / 1000);
      console.log("Distance between two points:", distance / 1000, "km");
    }
  }, [location, dropup]);

  const changeCoordsToAddress = useCallback(
    async (latitude, longitude) => {
      console.log("changeCoordsToAddress:===>", latitude, longitude);
      try {
        let address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (address.length > 0) {
          setDestAddress({
            city: address[0].city,
            country: address[0].country,
            district: address[0].district,
            formattedAddress: address[0].formattedAddress,
            postalCode: address[0].postalCode,
            region: address[0].region,
          });
          navigateToAddressPickUp();
        }
      } catch (error) {
        console.log("Error in reverse geocoding:", error);
      }
    },
    [navigateToAddressPickUp]
  );

  const navigateToAddressPickUp = useCallback(() => {
    if (!location || !location.coords) {
      console.log("navigateToAddressPickUp called with null location");
      return;
    }

    console.log("MapScreen location:===>", location);

    navigation.navigate("AddressPickUp", {
      data: {
        address: destAddress,
        currentLocation: location,
      },
    });
  }, [navigation, destAddress, location]);

  const getDest = useCallback(() => {
    console.log("Getting destination");
    changeCoordsToAddress(27.700769, 85.30014);
  }, [changeCoordsToAddress]);

  const renderMarkers = useCallback(() => {
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

    if (dropup) {
      markers.push(
        <Marker
          key="dropupLocation"
          coordinate={{
            latitude: dropup.latitude,
            longitude: dropup.longitude,
          }}
          pinColor="blue"
          title="Dropup Location"
          description="This is the dropup location"
        />
      );
    }

    if (riderData) {
      riderData.forEach((rider, index) => {
        markers.push(
          <Marker
            key={index}
            coordinate={{
              latitude: rider.latitude,
              longitude: rider.longitude,
            }}
            pinColor="yellow"
            title={rider.loc}
            description={rider.loc}
          />
        );
      });
    }

    return markers;
  }, [location, dropup, riderData]);

  return (
    <View style={styles.container}>
      {location && location.coords ? (
        <>
          <MapView
            style={StyleSheet.absoluteFill}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            ref={mapRef}
          >
            {renderMarkers()}
            {location && dropup && (
              <MapViewDirections
                origin={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                destination={{
                  latitude: dropup.latitude,
                  longitude: dropup.longitude,
                }}
                apikey={GOOGLE_API_KEY}
                strokeColor="hotpink"
                strokeWidth={3}
              />
            )}
          </MapView>
          <SearchBtn btnName="Choose Destination" onPressText={navigateToAddressPickUp} />

          <View className="border-2">
            <Text className="text-center text-green-500 bg-white">
              Distance Left: {distance || "0"} km
            </Text>
          </View>
        </>
      ) : errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        <Text>Loading Location ...</Text>
      )}

      <View className="border-t-2 border-teal-400 rounded-lg bg-slate-50 h-16 absolute bottom-0 w-full">
        <Menu navigation={navigation} />
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    borderTopWidth: 2,
    borderColor: "teal",
    backgroundColor: "white",
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
