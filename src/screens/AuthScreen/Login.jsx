import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import { BASE_URL } from "../../services/baseurl";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../app/features/auth/AuthSlice";
import SvgImage from "../../components/common/SvgImage";
import nepalogo from "../../../assets/nepalogo.png";
const Login = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loginData, setLoginData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // fetchRegisterData();
  }, []);

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const handleLogin = async () => {
    // called api here to register
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/login/`,
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response", response.data);
      setLoading(false);
      setLoginData(response.data);
      // dispatch(setAuth(response.data.user));
      dispatch(
        setAuth({
          userData: response.data.user,
          token: response.data.token.access,
        })
      );
      showMessage({
        message: "successfully registered ",
        description: "You have successfully Login",
        type: "success",
      });
      navigation.navigate("Home", { data: response.data.user });
    } catch (error) {
      console.log("error", error.response.data);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;
        console.log("error", errorMessage);
        if (errorMessage) {
          // console.log("errormessage ", errorMessage);

          setError(errorMessage);
          showMessage({
            message: "Error",
            description: errorMessage,
            type: "danger",
          });
        } else if (errorMessage[0]) {
          // console.log("errormessage ", errorMessage[0]);

          setError(errorMessage[0]);
          showMessage({
            message: "Error",
            description: errorMessage[0],
            type: "danger",
          });
        }
      } else {
        console.error("error", error.message);
        showMessage({
          message: "Error",
          description: error,
          type: "danger",
        });
      }
    }
    finally{
      setLoading(false);
    }

  };
  return (
    <View className="flex h-full justify-center p-5">
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

        <View className="flex flex-row justify-around items-center my-2">
          <Text className="font-semibold text-center justify-center">
            Password:{" "}
          </Text>
          <TextInput
            className="border-2 flex-1 rounded-lg px-2"
            placeholder="your password"
            value={data.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          className="border-2 p-2 border-green-500 rounded-xl w-1/2 self-center "
        >
          <Text className="text-center">Login {loading?"Loading...":""}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text>Don't have an account? Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
