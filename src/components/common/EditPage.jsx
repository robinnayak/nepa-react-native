// note the profile image upload is not working yet so the axios error is not yet fixed

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, MAIN_BASE_URL } from "../../services/baseurl";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import { DateTimePicker } from "@react-native-community/datetimepicker";
import { showMessage } from "react-native-flash-message";
import { setAuth } from "../../app/features/auth/AuthSlice";

const DriverEditPage = ({ data, navigation, dispatch }) => {
  const [putData, setPutData] = useState({
    ...data,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const handleInputChange = (value, field) => {
    setPutData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [field]: value,
      },
    }));
  };
  const getUserProfile = async () => {
    // console.log("DriverEditPage get data", putData.user.id);
    // console.log("DriverEditPage get data", token);
    // console.log(
    //   "DriverEditPage get data",
    //   `${BASE_URL}/driver/${putData.user.id}/`
    // );
    try {
      const response = await axios.get(
        `${BASE_URL}/driver/${putData.user.id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      console.log("DriverEditPage get data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleSubmit = async () => {
    console.log("====================================");
    console.log("handleSubmit is clicked");
    console.log("DriverEditPage put data", putData.user);
    console.log("====================================");

    try {
      const response = await axios.put(
        `${BASE_URL}/driver/${putData.user.id}/`,
        {
          phone_number: putData.user.phone_number,
          profile_image: putData.profile_image,
          license_number: putData.license_number,
          address: putData.address,
          date_of_birth: putData.date_of_birth,
          driving_experience: putData.driving_experience,
          rating: putData.rating,
          total_rides: putData.total_rides,
          earnings: putData.earnings,
          availability_status: putData.availability_status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("==========================================");
        console.log(
          "response user data organization edit page",
          response.data.user
        );
        console.log("==========================================");

        dispatch(
          setAuth({
            userData: response.data.user,
          })
        );
        showMessage({
          message: "Driver Info Updated Successfully",
          description: "You have successfully updated your driver info",
          type: "success",
        });

        navigation.navigate("Home");
      } else {
        showMessage({
          message: "Failed to Update Driver Info",
          description: "Something went wrong. Please try again.",
          type: "danger",
        });
      }
    } catch (error) {
      console.log("error", error);
      showMessage({
        message: "Failed to Update Driver Info",
        description: "Something went wrong. Please try again.",
        type: "danger",
      });
    }
  };

  const handleSelectImage = async () => {
    console.log("handleSelectImage is clicked");
    try {
      const res = await launchImageLibrary({
        mediaType: "photo",
        includeBase64: true,
      });
      console.log("response", res);
    } catch (error) {
      console.log("ImagePicker Error: ", error);
    }
  };
  // const handleSelectImage = async() => {
  //   console.log("handleSelectImage is clicked");
  //   await ImagePicker.launchImageLibrary(
  //     {
  //       mediaType: "photo",
  //       includeBase64: true,
  //     },
  //     (response) => {
  //       console.log("response", response);
  //       if (response.didCancel) {
  //         console.log("User cancelled image picker");
  //       } else if (response.error) {
  //         console.log("ImagePicker Error: ", response.error);
  //       } else {
  //         setPutData({ ...putData, profile_image: response.uri });
  //       }
  //     }
  //   );
  // };

  return (
    <ScrollView>
      <View className="flex flex-col justify-center p-5 border-2">
        <View className="my-2">
          <Text className="font-semibold">Phone Number:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="Phone Number"
            value={putData?.user?.phone_number?.toString() || ""}
            onChangeText={(value) => handleInputChange(value, "phone_number")}
          />
        </View>
        <View className="my-2">
          <Text className="font-semibold">Profile Image:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="Profile Image"
            value={putData?.profile_image || ""}
            onChangeText={(value) => handleInputChange(value, "profile_image")}
          />
        </View>

        {/* <View className="my-2">
          <Text className="font-semibold">Profile Image:</Text>
          <TouchableOpacity onPress={handleSelectImage}>
            {putData.profile_image ? (
              <Image
                src={`${MAIN_BASE_URL}${putData.profile_image}`}
                style={{
                  width: 110,
                  height: 140,
                  borderRadius: 20,
                }}
              />
            ) : (
              <Text>Select Image</Text>
            )}
          </TouchableOpacity>
        </View> */}

        <View className="my-2">
          <Text className="font-semibold">License Number:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="License Number"
            value={putData.license_number || ""}
            onChangeText={(value) =>
              setPutData({ ...putData, license_number: value })
            }
          />
        </View>
        {/* //edited here if any thing weent wrong  */}
        <View className="my-2">
          <Text className="font-semibold">Organization Name:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="License Number"
            value={putData.organization || ""}
            onChangeText={(value) =>
              setPutData({ ...putData, organization: value })
            }
          />
        </View>

        <View className="my-2">
          <Text className="font-semibold">Address:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="Address"
            value={putData.address || ""}
            onChangeText={(value) => setPutData({ ...putData, address: value })}
          />
        </View>

        <View className="my-2">
          <Text className="font-semibold">Date Of Birth:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="Date Of Birth"
            value={putData.date_of_birth || ""}
            onChangeText={(value) =>
              setPutData({ ...putData, date_of_birth: value })
            }
          />
        </View>

        <View className="my-2">
          <Text className="font-semibold">Driving Experience:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="Driving Experience (years)"
            value={putData.driving_experience?.toString() || ""}
            onChangeText={(value) =>
              setPutData({ ...putData, driving_experience: value })
            }
          />
        </View>

        <View className="my-2">
          <Text className="font-semibold">Rating:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="Rating"
            value={putData.rating || ""}
            onChangeText={(value) => setPutData({ ...putData, rating: value })}
          />
        </View>

        <View className="my-2">
          <Text className="font-semibold">Total Rides:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="Total Rides"
            value={putData.total_rides?.toString() || ""}
            onChangeText={(value) =>
              setPutData({ ...putData, total_rides: value })
            }
          />
        </View>

        <View className="my-2">
          <Text className="font-semibold">Earnings:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="Earnings"
            value={putData.earnings || ""}
            onChangeText={(value) =>
              setPutData({ ...putData, earnings: value })
            }
          />
        </View>

        <TouchableOpacity
          className="border-2 mt-3 rounded-full self-center w-1/2"
          onPress={handleSubmit}
        >
          <Text className="text-center font-bold text-lg py-2">Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const OrganizationEditPage = ({ data, navigation, dispatch }) => {
  const userData = useSelector((state) => state.auth);

  const [putData, setPutData] = useState({
    ...data,
  });

  const token = useSelector((state) => state.auth.token);
  const handleInputChange = (value, field) => {
    setPutData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [field]: value,
      },
    }));
  };

  const getUserProfile = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/organization/${putData.user.id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      console.log("OrganizationEditPage get data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // console.log("putData inside useeffect", putData);
    getUserProfile();
  }, []);

  const handleSubmit = async () => {
    console.log("handleSubmit is clicked");
    console.log("OrganizationEditPage put data", putData);

    try {
      const response = await axios.put(
        `${BASE_URL}/organization/${putData.user.id}/`,
        {
          phone_number: putData.user.phone_number,
          name: putData.name,
          profile_image: putData.profile_image,
          description: putData.description,
          rating: putData.rating,
          earnings: putData.earnings,
          logo: putData.logo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //      console.log("response", response.data.data.user.user);

      if (response.status === 200) {
        console.log("==========================================");
        console.log(
          "response user data organization edit page",
          response.data.data.user.user
        );
        console.log("==========================================");
        dispatch(
          setAuth({
            ...userData,
            userData: response.data.data.user.user,
          })
        );
        showMessage({
          message: "Organization Info Updated Successfully",
          description: "You have successfully updated your organization info",
          type: "success",
        });
        navigation.navigate("Home");
      } else {
        showMessage({
          message: "Failed to Update Organization Info",
          description: "Something went wrong. Please try again.",
          type: "danger",
        });
      }
    } catch (error) {
      console.log("error", error);
      showMessage({
        message: "Failed to Update Organization Info",
        description: "Something went wrong. Please try again.",
        type: "danger",
      });
    }
  };

  return (
    <ScrollView>
      <View className="flex flex-col justify-center p-5 border-2">
        <View className="my-2">
          <Text className="font-semibold">Phone Number:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="Phone Number"
            value={putData?.user?.phone_number?.toString() || ""}
            onChangeText={(value) => handleInputChange(value, "phone_number")}
          />
        </View>
        <View className="my-2">
          <Text className="font-semibold">organization name:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="Organizaiton Name"
            value={putData.name || ""}
            onChangeText={(value) => setPutData({ ...putData, name: value })}
          />
        </View>
        <View className="my-2">
          <Text className="font-semibold">profile_image:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="profile image"
            value={putData.profile_image || ""}
            onChangeText={(value) =>
              setPutData({ ...putData, profile_image: value })
            }
          />
        </View>

        <View className="my-2">
          <Text className="font-semibold">description:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="description"
            value={putData.description || ""}
            onChangeText={(value) =>
              setPutData({ ...putData, description: value })
            }
          />
        </View>

        <View className="my-2">
          <Text className="font-semibold">Rating:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="Rating"
            value={putData.rating || ""}
            onChangeText={(value) => setPutData({ ...putData, rating: value })}
          />
        </View>

        <View className="my-2">
          <Text className="font-semibold">Earnings:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="Earnings"
            value={putData.earnings || ""}
            onChangeText={(value) =>
              setPutData({ ...putData, earnings: value })
            }
          />
        </View>

        <View className="my-2">
          <Text className="font-semibold">Logo:</Text>
          <TextInput
            className="border-2 h-10 rounded-lg px-2"
            placeholder="logo..."
            value={putData.logo || ""}
            onChangeText={(value) => setPutData({ ...putData, logo: value })}
          />
        </View>

        <TouchableOpacity
          className="border-2 mt-3 rounded-full self-center w-1/2"
          onPress={handleSubmit}
        >
          <Text className="text-center font-bold text-lg py-2">Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const EditPage = ({ route }) => {
  // console.log("route", route.params.data);
  const navigation = useNavigation();
  const { data } = route.params.data || {};
  const { is_organization, is_driver } = data?.user || {};
  const dispatch = useDispatch();
  return (
    <View>
      {/* <Text>somethinng is missing </Text> */}

      {data?.user?.email ? (
        <>
          {is_organization && (
            <OrganizationEditPage
              data={data}
              navigation={navigation}
              dispatch={dispatch}
            />
          )}
          {is_driver && (
            <DriverEditPage
              data={data}
              navigation={navigation}
              dispatch={dispatch}
            />
          )}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default EditPage;

const styles = StyleSheet.create({});
