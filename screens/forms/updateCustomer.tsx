import React, { useState, useContext } from 'react';
import { Button, StyleSheet ,TextInput, View } from 'react-native';
import { updateCustomer } from '../../services/FirestoreService';
import { LoginContext } from '../../services/LoginProvider';

export default function UpdateCustomer({route, navigation}) {
  const { user } = useContext(LoginContext)
  const { customer } = route.params;
  const [newCustomerName, setCustomerName] = useState(customer.customerName);
  const [newRemainingBalance, setBalance] = useState(customer.remainingBalance);
  

  const processCustomer = () => {
    updateCustomer(customer.id, newCustomerName, newRemainingBalance);
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Customer's Name"
        onChangeText={setCustomerName}
        value={newCustomerName}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Starting Balance"
        onChangeText={setBalance}
        value={newRemainingBalance.toString()}
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