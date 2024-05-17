import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const Login = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>Login</Text>
     <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
        <Text>Don't have an account? Register here</Text>
     </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})