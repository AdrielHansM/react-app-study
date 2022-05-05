import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text ,TextInput, View } from 'react-native';
import { addCustomer } from '../../services/FirestoreService';
import { LoginContext } from '../../services/LoginProvider';

export default function AddCustomer({ navigation }) {
  const { user } = useContext(LoginContext)
  const [customerName, setCustomerName] = useState('');
  const [balance, setBalance] = useState(null);

  const processCustomer = () => {
    if (customerName.trim() === '' || balance === 0) {
      alert('Please fill up the required fields');
      return;
    } else if(balance < 0 || balance === null || balance.trim() === "") {
      alert('Please enter a valid amount');
      return;
    }
    addCustomer(user.uid, customerName, balance);
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Customer's Name"
        onChangeText={setCustomerName}
        value={customerName}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Starting Balance"
        onChangeText={setBalance}
        value={balance}
        keyboardType = "numeric"
        style={styles.textInput}
      />
      <Button title="Submit" onPress={() => processCustomer()} />
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
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },

  text:{
    color: '#72A0C1',
    marginBottom: 20
  },
})