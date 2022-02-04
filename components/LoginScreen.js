import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { BlurView } from 'expo-blur'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useNavigation } from '@react-navigation/native'

const uri = 'https://w0.peakpx.com/wallpaper/104/532/HD-wallpaper-dragon-ball-goku-dragon-ball-dragon-ball-gt-dragon-ball-legends-dragon-ball-super-dragon-ball-z.jpg'

const profilePic = 'https://i.ytimg.com/vi/fgDwTdTdnKs/hqdefault.jpg'

const LoginScreen = () => {
  const auth = firebase.auth()
  const navigate = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleCreateAccount = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Account created')
      })
    auth.applyActionCode('code').then(e => console.log(e))
      .catch(err => {
        console.log(err)
        err.toString().includes('The email address is already') ? Alert.alert('Email already in use.') : Alert.alert('Error creating account.')
      })
  }

  const handleSignIn = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Sign in successful')
        navigate.navigate('Home')
      })
      .catch(err => {
        console.log(err)
        Alert.alert(err.message)
      })
  }

  return (
    <View style={styles.container}>
      <Image style={[styles.image, StyleSheet.absoluteFill]} source={{ uri }} />
      <View style={{ width: 100, height: 100, backgroundColor: 'purple', position: 'absolute' }}></View>
      <View style={{ width: 100, height: 100, backgroundColor: 'blue', position: 'absolute', top: 200, transform: [{ rotate: '90' }] }}></View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <BlurView intensity={50}>
          <View style={styles.login}>
            <Image style={styles.profilePicture} source={{ uri: profilePic }} />
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Email</Text>
              <TextInput onChangeText={e => setEmail(e)} style={styles.input} placeholder="gohan@dragonball.com" />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Password</Text>
              <TextInput onChangeText={e => setPassword(e)} style={styles.input} placeholder="goku123456" secureTextEntry={true} />
            </View>
            <TouchableOpacity onPress={handleSignIn} style={[styles.button, { backgroundColor: '#ffffff40' }]}>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, { backgroundColor: '#6792F060' }]}>
              <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Create account</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  login: {
    width: 350,
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center'
  },
  profilePicture: {
    marginVertical: 30,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1
  },
  input: {
    width: 250,
    height: 35,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff70',
    marginBottom: 20,
    color: '#fff'
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1
  }
})

export default LoginScreen
