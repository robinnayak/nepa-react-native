import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import nepalogo from '../../../assets/nepalogo.png';

const VehicleDetailCard = ({ vehicle, navigation }) => {
    const onView = (vehicle) => {
        navigation.navigate('VehicleView', { vehicle: vehicle });
    };
    console.log('vehicle vehicle detail card', vehicle);

    return (
        <View>

            <View className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                <Text className="text-xl font-semibold mb-2 text-blue-700">{vehicle.model}</Text>
                <View className="mb-2 space-y-1">
                    <Text className="text-gray-600">Organization: {vehicle.organization.name}</Text>
                    <Text className="text-gray-600">Driver: {vehicle.driver.user.username}</Text>
                    <Text className="text-gray-600">Registration Number: {vehicle.registration_number}</Text>
                    <Text className="text-gray-600">Seating Capacity: {vehicle.seating_capacity}</Text>
                    <Text className="text-gray-600">License Plate Number: {vehicle.license_plate_number}</Text>
                    <Text className="text-gray-600">Insurance Expiry Date: {vehicle.insurance_expiry_date}</Text>
                </View>
                {vehicle.image ? (
                    <Image
                        source={{ uri: vehicle.image }}
                        className="h-40 w-full rounded mb-4"
                        style={styles.profileImage}
                        resizeMode="cover"
                    />
                ) : (
                    <Image
                        source={nepalogo}
                        className="h-40 w-full rounded mb-4"
                        style={styles.profileImage}
                        resizeMode="cover"
                    />
                )}
                <View className="flex flex-row justify-between mt-4">
                    <TouchableOpacity
                        className="bg-green-500 rounded-lg p-2 flex-1 mx-1"
                        onPress={() => onView(vehicle)}
                    >
                        <Text className="text-white text-center">View</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default VehicleDetailCard;

const styles = StyleSheet.create({
    profileImage: {
        width: "100%",
        height: 200,
    },
});
