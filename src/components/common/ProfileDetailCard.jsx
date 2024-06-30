import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faStar,
  faEnvelope,
  faPhone,
  faRupee,
} from "@fortawesome/free-solid-svg-icons";
import { BASE_URL, MAIN_BASE_URL } from "../../services/baseurl";
import SvgImage from "./SvgImage";
import { useDispatch,useSelector } from "react-redux";
import { setAuth } from "../../app/features/auth/AuthSlice";
import PassengerProfile from "../passenger/PassengerProfile";
// StarRatingIcon Component
const StarRatingIcon = ({ rating }) => {
  const stars = Array(5)
    .fill()
    .map((_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        size={24}
        style={{ color: i < rating ? "#555555" : "#d3d3d3", margin: 1 }}
      />
    ));

  return (
    <View>
      <Text className="pt-1">{stars}</Text>
    </View>
  );
};

// RenderItem Function
const renderItem = (icon, data) => (
  <View className="flex flex-row items-center p-2">
    <FontAwesomeIcon
      icon={icon}
      style={{ color: "#555555", width: 50, height: 50 }}
    />
    <Text className="border-b-2 text-left text-sm pl-2">{data || "Null"}</Text>
  </View>
);

// OrganizationProfileDetailCard Component
const OrganizationProfileDetailCard = ({ useId, navigation, token,dispatch,userData }) => {
  const [data, setData] = useState({});


  const { profile_image, earnings, rating } = data?.data || {};
  const { username, email, phone_number } = data?.data?.user || {};

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/organization/${useId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response", response.data);
      // console.log("response", response.data.data.profile_image);
      setData(response.data);
      // dispatch(setAuth({
      //   profile_image: response?.data?.data?.profile_image,
      // }));
    } catch (error) {
      console.error("Get user data failed", error);
      showMessage({
        message: "Get user data failed",
        description: "Something went wrong. Please try again.",
        type: "danger",
      });
    }
  };


  return (
    <View className="flex flex-row justify-between border-2 border-green-600 rounded-xl p-4">
      <View className="flex flex-row gap-5 items-center">
        <View className="overflow-hidden border-sky-200 rounded-full">
          {profile_image ? (
            <Image
              source={{ uri: `${MAIN_BASE_URL}${profile_image}` }}
              style={{
                width: 110,
                height: 140,
                borderRadius: 75, // change to 75 to make it fully rounded
                borderColor: "#555555",
                borderWidth: 4,
              }}
            />
          ) : (
            <>
              <SvgImage seed={username} />

              {/* <SvgXml xml={svg} style={{ height: 140, width: 110 }} /> */}
            </>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("EditPage", { data })}
          >
            <Text className="text-center text-blue-500">Edit</Text>
          </TouchableOpacity>
        </View>

        <View>
          {renderItem(faUser, username)}
          {renderItem(faEnvelope, email)}
          {renderItem(faPhone, phone_number)}
          {renderItem(faRupee, earnings)}
          <View className="flex flex-row justify-evenly border-b-2 pb-1 border-gray-700 rounded-md">
            <StarRatingIcon rating={Math.round(rating)} />
          </View>
          <Text className="font-bold text-sm text-center mt-2">
            {Math.round(rating)} Star
          </Text>
        </View>
      </View>
    </View>
  );
};

// DriverProfileDetailCard Component
const DriverProfileDetailCard = ({ useId, navigation, token,dispatch,userData }) => {
  const { profile_image, earnings, rating } = data?.data || {};
  const { username, email, phone_number } = data?.data?.user || {};
  const [data, setData] = useState({});

  useEffect(() => {
    getUserData();
  }, [useId,data?.data]);

  const getUserData = async () => {
    try {
      // const response = await axios.get(`${BASE_URL}/driver/${useId}/`);
      const response = await axios.get(`${BASE_URL}/driver/${useId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Get user data failed", error);
      showMessage({
        message: "Get user data failed",
        description: "Something went wrong. Please try again.",
        type: "danger",
      });
    }
  };



  return (
    <View className="flex flex-row justify-between border-2 border-green-600 rounded-xl p-4">
      <View className="flex flex-row gap-5 items-center">
        <View className="overflow-hidden border-sky-200 rounded-full">
          {profile_image ? (
            <Image
              source={{ uri: `${MAIN_BASE_URL}${profile_image}` }}
              style={{
                width: 110,
                height: 140,
                borderRadius: 75, // change to 75 to make it fully rounded
                borderColor: "#555555",
                borderWidth: 4,
              }}
            />
          ) : (
            <>
              <SvgImage />
              {/* <SvgXml xml={svg} style={{ height: 140, width: 110 }} /> */}
            </>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("EditPage", { data })}
          >
            <Text className="text-center text-blue-500">Edit</Text>
          </TouchableOpacity>
        </View>

        <View>
          {renderItem(faUser, username)}
          {renderItem(faEnvelope, email)}
          {renderItem(faPhone, phone_number)}
          {renderItem(faRupee, earnings)}
          <View className="flex flex-row justify-evenly border-b-2 pb-1 border-gray-700 rounded-md">
            <StarRatingIcon rating={Math.round(rating)} />
          </View>
          <Text className="font-bold text-sm text-center mt-2">
            {Math.round(rating)} Star
          </Text>
        </View>
      </View>
    </View>
  );
};

// ProfileDetailCard Component
const ProfileDetailCard = ({
  useId,
  navigation,
  IsDriver,
  IsOrganization,
  token,
}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  console.log("====================================");
  console.log("userData", userData);
  console.log("====================================");

  return (
    <View>
      {IsDriver && (
        <DriverProfileDetailCard
          useId={useId}
          navigation={navigation}
          token={token}
          dispatch={dispatch}
          userData={userData}
        />
      )}
      {IsOrganization && (
        <OrganizationProfileDetailCard
          useId={useId}
          navigation={navigation}
          token={token}
          dispatch={dispatch}
          userData={userData}
        />
      )}
      {!IsDriver && !IsOrganization && (
        
        <PassengerProfile 
          useId={useId}
          navigation={navigation}
          token={token}
          dispatch={dispatch}
          userData={userData}
         />
      )
        }
    </View>
  );
};

export default ProfileDetailCard;
