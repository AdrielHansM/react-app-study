import React, { useState } from 'react';
import { Button, StyleSheet, Text ,TextInput, View } from 'react-native';
import FirebaseAuthService from '../services/FirebaseAuthService';

export default function LoginScreen({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn  = () => {
    if (email === '' || password === '') {
      alert('Please complete all the required fields');
      return
    }
    FirebaseAuthService.signIn(email, password).catch((e) => {
      console.log(e);
      alert('Email or password is wrong'); 
    });  
  }
  
  const navigateToSignUp = () => {
    navigation.navigate('Registration')
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        style={styles.textInput}
        secureTextEntry={true}
      />
        <Button title="Sign In" onPress={() => signIn()} />
        <Text style={styles.text} onPress={() => navigateToSignUp()}> 
          create an Account 
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },

  textInput: {
    borderWidth: 1.6,
    borderColor: '#2C3E50',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },

  text:{
    color: '#72A0C1',
    marginTop: 20
  },
})