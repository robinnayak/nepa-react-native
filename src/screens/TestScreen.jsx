import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Svg, Circle, SvgXml } from "react-native-svg";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

import axios from "axios";
const TestScreen = () => {
  useEffect(() => {
    console.log("TestScreen");
    getUserData();
    
  }, []);

  const generateAvatar = () => {
    const svg = createAvatar(avataaars, {
      seed: "Jasper",
      width: 100,
      height: 100,
    });
    console.log("svg",svg);
    console.log("svg string",svg.toString());
    console.log("svg data uri",svg.toDataUri()) ;
    console.log("svg json",svg.toJson()) ;
    return svg;
  }


  const svg = generateAvatar().toString();


  const getUserData = async () => {
    try {
      const res = await axios.get("http://10.0.2.2:8000/api/register/");
      console.log(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <View>
      <Svg height="50%" width="50%" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="50"
          stroke="purple"
          strokeWidth=".5"
          fill="violet"
        />
      </Svg>
      <SvgXml xml={svg} width="50%" height="50%" />

      <Text>TestScreen</Text>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
