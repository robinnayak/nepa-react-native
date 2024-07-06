import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Modal from 'react-native-modal';
import { faClock, faBus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const delayMessages = [
  "Delay", "Arriving Soon", "Delay Due to Traffic", "Delay Due to Rain", "Delay Due to Accident", 
  "Delay Due to Breakdown", "Delay Due to Road Block", "Delay Due to Other Reasons"
];
const arrivingMessages = ["Arriving in 10 mins", "1km Distance far"];

const TouchPushMessage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  const handlePress = (message) => {
    Alert.alert("Notification", message, [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
  };

  const toggleModal = (type) => {
    setModalType(type);
    setModalVisible(!isModalVisible);
  };

  const renderMessages = (messages) => {
    return messages.map((message, index) => (
      <TouchableOpacity
        key={index}
        className="bg-gray-300 p-3 my-2 rounded-lg"
        onPress={() => {
          handlePress(message);
          setModalVisible(false);
        }}
      >
        <Text className="text-gray-800">{message}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View className=" justify-center items-center bg-gray-10 mb-2 border-b-2 p-2 rounded-md">
      <Text className="text-lg font-semibold mb-2 text-gray-800">TouchPushMessage</Text>
      <View className=" flex flex-row justify-evenly ">
        <NotificationButton 
          icon={faClock} 
          color="bg-blue-500" 
          text="Delay" 
          onPress={() => toggleModal('delay')} 
        />
        <NotificationButton 
          icon={faBus} 
          color="bg-green-500" 
          text="Arriving Soon" 
          onPress={() => toggleModal('arriving')} 
        />
      </View>
      
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View className="bg-white p-6 rounded-lg">
          <Text className="text-xl font-bold mb-4 text-gray-800">Select a Message</Text>
          <ScrollView className="h-52">
            {modalType === 'delay' ? renderMessages(delayMessages) : renderMessages(arrivingMessages)}
          </ScrollView>
          <TouchableOpacity
            className="bg-red-500 mt-4 p-3 rounded-lg items-center"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-white">Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const NotificationButton = ({ icon, color, text, onPress }) => (
  <TouchableOpacity
    className={`p-4 rounded-lg items-center ${color} w-44`}
    onPress={onPress}
  >
    <FontAwesomeIcon icon={icon} size={30} color="white" />
    <Text className="text-white font-bold mt-2">{text}</Text>
  </TouchableOpacity>
);

NotificationButton.propTypes = {
  icon: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default TouchPushMessage;
