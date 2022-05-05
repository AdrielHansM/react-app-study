import React, { useState, useContext } from 'react';
import { Button, StyleSheet, Text ,TextInput, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { addPayment } from '../../services/FirestoreService';
import { LoginContext } from '../../services/LoginProvider';

export default function AddPayment({route, navigation}) {
  const { user } = useContext(LoginContext)
  const { customer } = route.params;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false)
  const [payment, setPayment] = useState(null);

  const processPayments = () => {
    if (payment === null || payment === 0 || payment.trim() === ""){ 
      alert('Payment is required');
      return;
    }
    if (payment > customer.remainingBalance){
      alert('Payment cannot be greater than the remaining balance');
      return;
    } 
    addPayment(customer, Number(payment), date);
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.nameText} onPress={() => setOpen(true)}> 
        Customer: {customer.customerName}
      </Text>
      <Text style={styles.balanceText} onPress={() => setOpen(true)}> 
        Balance: {customer.remainingBalance}
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
        placeholder="Amount Paid"
        onChangeText={setPayment}
        value={payment}
        keyboardType = "numeric"
        style={styles.textInput}
      />
      <Button title="Submit" onPress={() => processPayments()} />

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
    fontSize: 20,
  },

  balanceText: {
    fontSize: 20,
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