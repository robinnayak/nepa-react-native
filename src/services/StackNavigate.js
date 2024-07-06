import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/AuthScreen/Login";
import Register from "../screens/AuthScreen/Register";
import Home from "../screens/Home";
import MapScreen from "../screens/MapScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AiScreen from "../screens/AiScreen";
import AddressPickUp from "../screens/AddressPickUp";
import EditPage from "../components/common/EditPage";
import TestScreen from "../screens/TestScreen";
import OrganizationDriverProfile from "../components/Driver/OrganizationDriverProfile";
import TripsScreen from "../screens/TripsScreen";
import AddTrip from "../components/EditForms/AddTrip";
import Vehicle from "../screens/Vehicle";
import VehicleView from "../components/organization/VehicleView";
import VehicleEdit from "../components/organization/VehicleEdit";
import AddVehicle from "../components/organization/AddVehicle";
import TripView from "../components/organization/TripView";
import BookingDetailView from "../components/passenger/BookingDetailView";
import Booking from "../components/common/Booking";
import CommonMapGView from "../components/common/maps/CommonMapGView";
const Stack = createNativeStackNavigator();

const StackNavigate = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: "Register",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Map",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: "Notification",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Ai"
        component={AiScreen}
        options={{
          title: "Ai",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="AddressPickUp"
        component={AddressPickUp}
        options={{
          title: "AddressPickUp",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="EditPage"
        component={EditPage}
        options={{
          title: "EditPage",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="TestPage"
        component={TestScreen}
        options={{
          title: "TestPage",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="organizationDriverProfile"
        component={OrganizationDriverProfile}
        options={{
          title: "organizationDriverProfile",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="TripsScreen"
        component={TripsScreen}
        options={{
          title: "TripsScreen",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="AddTrip"
        component={AddTrip}
        options={{
          title: "AddTrip",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Vehicle"
        component={Vehicle}
        options={{
          title: "Vehicle",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="VehicleView"
        component={VehicleView}
        options={{
          title: "VehicleView",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="VehicleEdit"
        component={VehicleEdit}
        options={{
          title: "VehicleEdit",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="AddVehicle"
        component={AddVehicle}
        options={{
          title: "AddVehicle",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="TripView"
        component={TripView}
        options={{
          title: "TripView",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="BookingDetailView"
        component={BookingDetailView}
        options={{
          title: "BookingDetailView",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{
          title: "Booking",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="CommonMapGView"
        component={CommonMapGView}
        options={{
          title: "CommonMapGView",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
     
    </Stack.Navigator>
  );
};

export default StackNavigate;

const styles = StyleSheet.create({});
