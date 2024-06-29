import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import SvgImage from "../common/SvgImage";
import axios from "axios";
import { BASE_URL } from "../../services/baseurl";
import { useSelector } from "react-redux";

const OrganizationDrivers = ({ navigation }) => {
  const token = useSelector((state) => state.auth.token);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    getFilterData();
  }, []);

  const getFilterData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/organization/driver`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("filter data", response.data);
      setFilterData(response.data);
    } catch (error) {
      console.error("Fetching data failed", error);
    }
  };

  const renderDriverItem = ({ item: driver }) => {
    const redirectToDriverProfile = () => {
      navigation.navigate("organizationDriverProfile", {
        driver: driver,
      });
      console.log("driver profile alert");
    };

    return (
      <TouchableOpacity
        className="border-2 border-red-200 rounded-lg"
        onPress={() => redirectToDriverProfile()}
      >
        <View className="p-4 bg-white shadow-md rounded-lg">
          <View className="flex flex-row items-center">
            <SvgImage
              seed={driver.user.username}
              className="w-12 h-12 rounded-full"
            />
            <View className="ml-4">
              <Text className="text-lg font-semibold">
                {driver.user.username}
              </Text>
              <Text className="text-sm text-gray-600">{driver.address}</Text>
              <View className="flex flex-row items-center mt-2">
                <View
                  className={`w-3 h-3 rounded-full mr-2 ${
                    driver.availability_status ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <Text className="text-sm">
                  {driver.availability_status ? "Online" : "Offline"}
                </Text>
              </View>
              <Text className="text-sm text-gray-600 mt-1">
                Rating: {driver.rating}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="p-4">
      <Text className="text-lg font-semibold">Driver Details</Text>

      <View className="flex flex-row justify-between items-center mb-4">
        <FlatList
          horizontal={true}
          ListEmptyComponent={()=><Text>No Drivers Found</Text>}
          ItemSeparatorComponent={()=><View style={{width:10}}></View>}
          data={filterData}
          renderItem={renderDriverItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default OrganizationDrivers;
