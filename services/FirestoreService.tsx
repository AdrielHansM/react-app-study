import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/firestore';
import {Alert } from 'react-native';

export function addCustomer(userId, customerName, remainingBalance) {

  firebase.firestore()
    .collection('customers')
    .add({
      customerName: customerName,
      remainingBalance: remainingBalance,
      authorId: userId,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((error) => console.log(error));

    alert('Customer successfully added!');
    console.log("\nCutomer Created: {", "\nCustomer ID: " ,userId,
    "\nAmount: ", remainingBalance);
}

export function updateCustomer(customerId, customerName, remainingBalance) {
  return Alert.alert(
    "Are your sure?",
    "Are you sure you want to update this customer?",
    [
      {
        text: "Yes",
        onPress: () => {
          firebase.firestore()
            .collection('customers')
            .doc(customerId)
            .update({
              customerName: customerName,
              remainingBalance: remainingBalance,
              dateUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .catch((error) => console.log(error));
          },
        },
      {
        text: "No",
      },
    ]
  );
}

export function deleteCustomer(customer) {
  return Alert.alert(
    "Are your sure?",
    "Are you sure you want to delete this customer " + customer.customerName + " and its records?",
    [
      {
        text: "Yes",
        onPress: () => {
          firebase.firestore()
            .collection('customers')
            .doc(customer.id)
            .delete()
            .then(() => {
              //Delete payments and orders associated to this customer
              firebase.firestore()
                .collection('payments')
                .doc(customer.id)
                .delete()
                .then(() => {
                  firebase.firestore()
                  .collection('orders')
                  .doc(customer.id)
                  .delete()
                  .catch((error) => console.log(error));
               })
             })
            .catch((error) => console.log(error));
            alert('Customer deleted successfully!');
        },
      },
      {
        text: "No",
      },
    ]
  );
  
}

export function addPayment(customer, amountPaid, dateOfPayment) {
  const newBalance = Number(customer.remainingBalance) - Number(amountPaid);
  firebase.firestore()
    .collection('payments')
    .add({
      customerId: customer.id,
      amountPaid: amountPaid,
      dateOfPayment: dateOfPayment,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() => {
      firebase.firestore()
        .collection('customers')
        .doc(customer.id)
        .update({
          remainingBalance: newBalance,
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));

  alert('Payment added');
  console.log("\nPayments Created: {", "\nCustomer ID: " ,customer.id,
  "\nAmount: ", amountPaid,"\nDate: ", dateOfPayment, "\nNew Balance: ", newBalance, "\n}");
}


export function addOrder(customer, orderAmount, dateOfOrder) {
  const newBalance = Number(customer.remainingBalance) + Number(orderAmount);
  console.log(typeof customer.remainingBalance);
  console.log(typeof orderAmount);
  firebase.firestore()
  .collection('orders')
  .add({
    customerId: customer.id,
    orderAmount: orderAmount,
    dateOfOrder: dateOfOrder,
    dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
  }).then(() => {
    firebase.firestore()
      .collection('customers')
      .doc(customer.id)
      .update({
        remainingBalance: newBalance,
      })
      .catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));
  alert('Order added');
  console.log("\nPayments Created: {", "\nCustomer ID: " ,customer.id,
  "\nAmount: ", orderAmount,"\nDate: ", dateOfOrder, "\nNew Balance: ", newBalance, "\n}");
}