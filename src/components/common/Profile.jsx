import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../services/baseurl";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const DriverProfile = ({ onPressEdit, data,dispatch }) => {
  // const editProfile = () => {
  //   console.log("Edit");
  // };
  const {
    organization,
    license_number,
    address,
    date_of_birth,
    driving_experience,
    rating,
    profile_image,
    total_rides,
    earnings,
    availability_status,
  } = data.data || {};
  const { username, email, phone_number } = data?.data?.user || {};
  console.log("Driver Profile", data.data);
  console.log("Driver Profile", phone_number);
  return (
    <View>
      <Text>Driver Profile</Text>
      <View style={styles.innerContainer}>
        <View style={styles.profileInfo}>
          <Text>Username: {username || "username"}</Text>
          <Text>Email: {email || "example@email.com"}</Text>
          <Text>Phone Number: {phone_number || "9815634567"}</Text>
          <Text>Organization: {organization || "organization_name..."}</Text>
          <Text>License Number: {license_number || "license_number..."}</Text>
          <Text>Address: {address || "address..."}</Text>
          <Text>Date of Birth: {date_of_birth || "date_of_birth..."}</Text>
          <Text>
            Driving Experience: {driving_experience || "driving_experience..."}
          </Text>
          <Text>Rating: {rating || "rating..."}</Text>
          <Text>Total Rides: {total_rides || "total_rides..."}</Text>
          <Text>Earnings: {earnings || "earnings..."}</Text>
          <Text>
            Availability Status:{" "}
            {availability_status || "availability_status..."}
          </Text>
          <View style={styles.profileImageContainer}>
            {profile_image && (
              <>
                <Image
                  src={`${MAIN_BASE_URL}${profile_image}`}
                  style={styles.profileImage}
                />
              </>
            )}
          </View>
        </View>
        <TouchableOpacity
          className="border-spacing-2 border-green-500 border-2 p-2 self-center rounded-xl"
          onPress={onPressEdit}
        >
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OrganizationProfile = ({ onPressEdit, data, dispatch }) => {
  // const editProfile = () => {
  //   console.log("Edit");
  // };
  console.log("Organization Data", data.data);
  const { description, name, logo, profile_image } = data.data || {};
  const { username, email, phone_number } = data?.data?.user || {};
  return (
    <View>
      <Text>Organization Profile</Text>
      <View style={styles.innerContainer}>
        <View style={styles.profileInfo}>
          <Text>Username: {username || "username..."}</Text>
          <Text>Email: {email || "example@email.com"}</Text>
          <Text>Phone Number: {phone_number || "9815634567"}</Text>
          <Text>name:{name || "organization_name..."} </Text>
          <Text>
            description:{description || "organization_description..."}{" "}
          </Text>
          <Text>logo:{logo || "organization_logo..."} </Text>

          <View style={styles.profileImageContainer}>
            {profile_image && (
              <>
                <Image
                  src={`${MAIN_BASE_URL}${profile_image}`}
                  style={styles.profileImage}
                />
              </>
            )}
          </View>
        </View>
        <TouchableOpacity
          className="border-spacing-2 border-green-500 border-2 p-2 self-center rounded-xl"
          onPress={onPressEdit}
        >
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Profile = () => {
  const userData = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { is_organization, is_driver, user_id, token } = userData || {};
  const [data, setData] = useState({});
  // console.log("userData", userData);
  useEffect(() => {
    getUserProfile();
  }, [token]);

  const getUserProfile = async () => {
    try {
      if (is_organization) {
        const res = await axios.get(`${BASE_URL}/organizations/${user_id}/`);
        // console.log("is_organization response", res.data);
        setData(res.data);
      } else if (is_driver) {
        const res = await axios.get(`${BASE_URL}/driver/${user_id}/`);
        // console.log("is_driver response", res.data);
        setData(res.data);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const editProfile = (data) => {
    console.log("Edit Profile", data);
    navigation.navigate("EditPage", { data });
  };

  return (
    <View>
      {is_organization ? (
        <OrganizationProfile
          data={data}
          onPressEdit={() => editProfile(data)}
          dispatch={dispatch}
        />
      ) : null}
      {is_driver ? (
        <DriverProfile
          data={data}
          onPressEdit={() => editProfile(data)}
          dispatch={dispatch}
        />
      ) : null}
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  innerContainer: {
    borderWidth: 2,
  },
  profileInfo: {
    borderWidth: 2,
    borderColor: "#D1D5DB",
    margin: 2,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageContainer: {
    borderWidth: 4,
    overflow: "hidden",
    borderColor: "#38BDF8",
    borderRadius: 24,
    marginTop: 10,
  },
  profileImage: {
    width: 110,
    height: 140,
    borderRadius: 20,
  },
  logoutButton: {
    borderWidth: 2,
    borderColor: "#FEB2B2",
    borderRadius: 10,
    width: "50%",
    alignSelf: "center",
    marginTop: 10,
  },
  logoutButtonText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    padding: 5,
  },
  menuContainer: {
    borderWidth: 2,
    borderColor: "#4FD1C5",
    backgroundColor: "#F8FAFC",
    height: 64,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
