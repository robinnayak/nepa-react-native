import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";
// import { CheckBox } from "react-native-elements";
import { CheckBox } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import { BASE_URL } from "../../services/baseurl";
import nepalogo from "../../../assets/nepalogo.png";

const Register = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: 0,
    isOwner: false,
    isDriver: false,
    license_number:"",
  });
  const [registerData, setRegisterData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchRegisterData();
  }, []);

  const fetchRegisterData = async () => {
    console.log("fetching data");
    try {
      //const response = await axios.get("http://10.0.2.2:8000/api/register");
      const response = await axios.get(`${BASE_URL}/register/`);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const handleRegister = async () => {
    if (data.password !== data.confirmPassword) {
      showMessage({
        message: "Error",
        description: "Password and confirm password do not match",
        type: "danger",
      
      })
      return;
    }
    console.log("data", data);

    // called api here to register
    try {
      const response = await axios.post(
        `${BASE_URL}/register/`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
          password2: data.confirmPassword,
          phone_number: data.phone_number,
          license_number: data.license_number,
          is_organization: data.isOwner,
          is_driver: data.isDriver,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      showMessage({
        message: "successfully registered ",
        description: "You have successfully registered",
        type: "success",
      });
      navigation.navigate("Login");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.errors;
        console.error("error", errorMessage[0]);
        
      
        if(errorMessage[0]){
          console.log("errormessage ",errorMessage[0]);

          setError(errorMessage[0]);
          showMessage({
            message: "Error",
            description: errorMessage[0],
            type: "danger",
          });
        }
        else if (errorMessage && errorMessage.email[0]) {
          setError(errorMessage.email[0]);
          showMessage({
            message: "Error",
            description: errorMessage.email[0],
            type: "danger",
          });
        }
      } else {
        console.error("error", error.message);
        showMessage({
          message: "Error",
          description: "An error occurred. Please try again.",
          type: "danger",
        });
      }
      console.error("error", error);
    }
  };
  return (
    <View className="flex h-full justify-center border-2 p-5">
    <View className="flex flex-col justify-center items-center">
      <Image source={nepalogo} className="w-32 h-32" />
      <Text className="text-2xl font-semibold">Login With nepaMove</Text>
    </View>
      <View className="shadow-lg bg-white-50 p-3">
        <View className=" flex flex-row justify-around items-center my-2">
          <Text className="font-semibold text-center justify-center">
            UserName:{" "}
          </Text>
          <TextInput
            className="border-2 flex-1 rounded-lg px-2"
            placeholder="UserName"
            value={data.username}
            onChangeText={(text) => handleChange("username", text)}
          />
        </View>
        <View className=" flex flex-row justify-around items-center my-2">
          <Text className="font-semibold text-center justify-center">
            Email:{" "}
          </Text>
          <TextInput
            className="border-2 flex-1 rounded-lg px-2"
            placeholder="UserName"
            value={data.email}
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>
        <View className=" flex flex-row justify-around items-center my-2">
          <Text className="font-semibold text-center justify-center">
            Password:{" "}
          </Text>
          <TextInput
            className="border-2 flex-1 rounded-lg px-2"
            placeholder="UserName"
            value={data.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={true}
          />
        </View>
        <View className=" flex flex-row justify-around items-center my-2">
          <Text className="font-semibold text-center justify-center">
            Confirm Password:{" "}
          </Text>
          <TextInput
            className="border-2 flex-1 rounded-lg px-2"
            placeholder="UserName"
            value={data.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry={true}
          />
        </View>
        <View className=" flex flex-row justify-around items-center my-2">
          <Text className="font-semibold text-center justify-center">
            Phone Number:{" "}
          </Text>
          <TextInput
            className="border-2 flex-1 rounded-lg px-2"
            placeholder="Phone Number"
            value={data.phone_number ? data.phone_number.toString() : ""}
            onChangeText={(text) => handleChange("phone_number", text)}
            keyboardType="numeric"
          />
        </View>
        {data.isDriver && (
          <View className=" flex flex-row justify-around items-center my-2">
            <Text className="font-semibold text-center justify-center">
              License Number:{" "}
            </Text>
            <TextInput
              className="border-2 flex-1 rounded-lg px-2"
              placeholder="License Number"
              value={data.license_number}
              onChangeText={(text) => handleChange("license_number", text)}
            />
          </View>
        )}

        <View>
          <CheckBox
            title="Are you a owner?"
            checked={data.isOwner}
            onPress={() => setData({ ...data, isOwner: !data.isOwner })}
            center
          />
          
        </View>
        <View>

        <CheckBox
            title="Are you a Driver?"
            checked={data.isDriver}
            onPress={() => setData({ ...data, isDriver: !data.isDriver })}
            center
          />
        </View>
        <TouchableOpacity
          onPress={handleRegister}
          className="border-2 p-2 border-green-500 rounded-xl w-1/2 self-center "
        >
          <Text className="text-center">Register</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={()=>{navigation.navigate('TestPage')}}
          className="border-2 p-2 border-green-500 rounded-xl w-1/2 self-center "
        >
          <Text className="text-center">Navigate to Test Page</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text>Already have an account? Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
