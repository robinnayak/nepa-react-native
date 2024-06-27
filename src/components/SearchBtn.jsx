import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SearchBtn = ({btnName="btn", onPressText}) => {
  return (
    <TouchableOpacity onPress={onPressText} className="border-2 border-gray-600  rounded-lg w-10/12 self-center bg-white ">
      <Text className="text-cyan-600 text-lg text-center rounded-lg" style={{
        fontSize: 20,
      }}>{btnName}</Text>
    </TouchableOpacity>
  )
}

export default SearchBtn

const styles = StyleSheet.create({})