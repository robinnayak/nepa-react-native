import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Menu from "../components/Menu";
import axios from "axios";
import { BASE_URL } from "../services/baseurl";
import { useSelector } from "react-redux";

const AiScreen = ({ navigation }) => {
  const [db_response, setDb_response] = useState([]);
  const [question, setQuestion] = useState("");
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/passenger/passenger-chatbot/`,
        {
          question: question,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", res.data);
      console.log("Response Type:", typeof res.data);

      // Transform the response string to a valid JSON format
      // const validJsonString = res.data
      //   .replace(/'/g, '"') // Replace single quotes with double quotes
      //   .replace(/\(([^)]+)\)/g, '[$1]') // Replace parentheses with square brackets
      //   .replace(/datetime\.date\(([^)]+)\)/g, '"$1"'); // Handle datetime.date formats

      // const responseData = JSON.parse(validJsonString);
      // console.log("Transformed Response:", responseData);
      setDb_response(res.data);
      if (Array.isArray(responseData)) {
        setDb_response(responseData);
      } else {
        console.log("Unexpected response format:", res.data);
        setDb_response([]);
      }
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = (response) => (
    <View key={response[0]} className="p-4 border-b border-gray-300">
      <Text className="text-lg font-bold">{response[1]}</Text>
      <Text>Type: {response[2]}</Text>
      <Text>Manufacturer: {response[3]}</Text>
      <Text>Model: {response[4]}</Text>
      <Text>Color: {response[5]}</Text>
      <Text>Capacity: {response[6]}</Text>
      <Text>License Plate: {response[7]}</Text>
      <Text>Start Date: {new Date(response[8]).toDateString()}</Text>
      <Text>End Date: {new Date(response[9]).toDateString()}</Text>
      {/* Add more fields as needed */}
    </View>
  );

  return (
    <View className="flex flex-1 flex-col p-4">
      <Text className="text-2xl font-bold mb-4">AiScreen</Text>
      <Text>Question: {question}</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="Enter your question here"
        value={question}
        onChangeText={(text) => setQuestion(text)}
        className="mb-4 p-2 border rounded"
      />
      <TouchableOpacity
        onPress={handleSubmit}
        className="border-2 border-teal-400 rounded-lg bg-slate-50 h-16 w-1/2 mb-4 flex items-center justify-center"
      >
        <Text>Submit {loading ? "Loading..." : ""} </Text>
      </TouchableOpacity>

      <Text>{db_response}</Text>
      {/* <ScrollView className="flex-1">
        {db_response.length > 0 ? (
          db_response.map(renderResponse)
        ) : (
          <Text>No responses yet. </Text>
        )}
      </ScrollView> */}
      <View className="border-t-2 border-teal-400 rounded-lg bg-slate-50 h-16 absolute bottom-0 w-full">
        <Menu navigation={navigation} />
      </View>
    </View>
  );
};

export default AiScreen;

const styles = StyleSheet.create({});
