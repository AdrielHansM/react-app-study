import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text ,TextInput, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { addOrder } from '../../services/FirestoreService';
import { LoginContext } from '../../services/LoginProvider';

export default function AddPayment({route, navigation}) {
  const { user } = useContext(LoginContext)
  const { customer } = route.params;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false)
  const [amount, setAmountOrder] = useState(null);

  const processOrder = () => {
    if (amount === null || amount === 0 || amount.trim() === ""){
      alert('Order amount is required');
      return;
    }
    addOrder(customer, Number(amount), date);
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.nameText} onPress={() => setOpen(true)}> 
        Customer: {customer.customerName}
      </Text>
      <DatePicker modal open={open} date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <Text style={styles.dateText} onPress={() => setOpen(true)}> 
        Date of Payment: {date.toDateString()}
      </Text>
      <TextInput
        placeholder="Order Amount"
        onChangeText={setAmountOrder}
        value={amount}
        keyboardType = "numeric"
        style={styles.textInput}
      />
      <Button title="Submit" onPress={() => processOrder()} />

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
    borderColor: '#7F8C8D',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },

  nameText: {
    fontSize: 25,
  },

  dateText:{
    fontSize: 20,
    color: '#566573',
    borderColor: '#7F8C8D',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
  },
})