import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const DatePickerComponent = () => {
  // Initialize date state with a Date object
  const [date, setDate] = useState(new Date());

  // Function to open the date picker
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
      },
      mode: "date",
      minimumDate: new Date(),
    });
  };

  return (
    <View style={styles.container}>
      <Text>{date.toDateString()}</Text>
      <Button onPress={showDatePicker} title="Select date" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});

export default DatePickerComponent;
