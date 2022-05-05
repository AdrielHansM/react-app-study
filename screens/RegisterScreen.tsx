import React, { useState } from 'react';
import { Button, StyleSheet, Text ,TextInput, View } from 'react-native';
import FirebaseAuthService from '../services/FirebaseAuthService';

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = () => {
    if (email === '' || password === '' || confirmPassword === '') {
      alert('Please complete all the required fields');
      return
    } else if (password !== confirmPassword) {
      alert('Passwords do not match');
      return
    }
    FirebaseAuthService.signUp(email, password, username).catch((e) => {
      console.log(e);
      alert('Something went wrong'); 
    });  
  };

  const navigateToSignIn = () => {
    navigation.navigate('Login')
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Email *"
        onChangeText={setEmail}
        value={email}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password *"
        onChangeText={setPassword}
        value={password}
        style={styles.textInput}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Confirm Password *"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        style={styles.textInput}
        secureTextEntry={true}
      />
      <Button title="Sign Up" onPress={() => signUp()} />
      <Text style={styles.text} onPress={() => navigateToSignIn}> 
        Sign In 
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