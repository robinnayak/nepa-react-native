import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import axios from "axios";
import TouchPushMessage from "./TouchPushMessage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope, faPhone, faStar } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../services/baseurl";
import { useSelector } from "react-redux";
import SvgImage from "../common/SvgImage";
const DriverOrganizationView = () => {
  const [data, setData] = useState(null);
  token = useSelector((state) => state.auth.token);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/driver/driver-related-organization/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response data", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!data) {
    return (
      <View className="flex-1 p-4 bg-gray-100 justify-center items-center">
        <Text className="text-xl text-gray-700">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="p-4 bg-gray-100">
      <TouchPushMessage />
      <View className="mt-4 p-6 bg-white rounded-lg shadow-lg flex-row items-center">
        {data.profile_image ? (
          <Image
            source={{
              uri: data.profile_image || "https://via.placeholder.com/100",
            }}
            className="w-24 h-24 rounded-full mr-6"
          />
        ) : (
          <SvgImage seed={data.user.username} />
        )}

        <View className="flex-1">
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            {data.name}
          </Text>
          <Text className="text-gray-700 mb-2">{data.description}</Text>
          <View className="flex-row items-center mb-1">
            <FontAwesomeIcon icon={faStar} size={16} color="#FFD700" />
            <Text className="ml-2 text-gray-700">{data.rating}</Text>
          </View>
          {/* <Text className="text-gray-700 mb-2">Earnings: ${data.earnings}</Text> */}
          
          <View className="flex-row items-center mb-1">
            <FontAwesomeIcon icon={faPhone} size={16} color="#4A5568" />
            <Text className="ml-2 text-gray-700">{data.user.phone_number}</Text>
          </View>
          <View className="flex-row items-center">
            <FontAwesomeIcon icon={faEnvelope} size={16} color="#4A5568" />
            <Text className="ml-2 text-gray-700">{data.user.email}</Text>
          </View>
          <Text className="text-gray-700 mb-2">
            Created: {new Date(data.date_created).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DriverOrganizationView;
