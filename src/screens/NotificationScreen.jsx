import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Menu from '../components/Menu'

const NotificationScreen = ({navigation}) => {
  return (
    <View className="flex flex-1 flex-col">
      <Text>NotificationScreen</Text>
      <View className="border-t-2 border-teal-400 rounded-lg bg-slate-50 h-16 absolute bottom-0 w-full">
        <Menu navigation={navigation} />
      </View>
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({})