import React from 'react'
import { View, Text, Button, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const HomeScreen = () => {
  const auth = firebase.auth()
  const navigate = useNavigation()

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('Logout successful')
        Alert.alert('Logout successful.')
        setTimeout(() => {
          navigate.navigate('Login')
        }, 1000)
      })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HomeScreen</Text>
      <View style={{ marginVertical: 300 }}>
        <Button onPress={handleLogout} title='Logout' />
      </View>
    </View>
  )
}

export default HomeScreen
