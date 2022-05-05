import React, { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, SectionList } from 'react-native';
import { LoginContext } from '../services/LoginProvider';
import { FlatList } from 'react-native-gesture-handler';
import { deleteCustomer } from '../services/FirestoreService';
import firestore from '@react-native-firebase/firestore';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


export default function CustomerDetail( { route, navigation } ) {
  const { user } = useContext(LoginContext)
  const { customer } = route.params;
  const [ customerDetail, setCustomerDetail ] = useState([]);
  const [ payments, setPayments ] = useState([]);
  const [ orders, setOrders ] = useState([]);

  useEffect(() => {
    loadCustomerDetails();
    loadPayments();
    loadOrders();
  }, [])

  const loadCustomerDetails = () => {
    firestore().collection('customers')
    .where(firestore.FieldPath.documentId(), '==', customer.id)
    .onSnapshot(
      querySnapshot => {
          const newEntities = []
          querySnapshot.forEach(doc => {
              const entity = doc.data()
              entity.id = doc.id
              newEntities.push(entity)
          });
          setCustomerDetail(newEntities)
      },
      error => {
          console.log(error)
      }
    )
  }

  const loadPayments = () => {
    firestore().collection('payments')
    .where("customerId", '==', customer.id)
    .onSnapshot(
      querySnapshot => {
          const newEntities = []
          querySnapshot.forEach(doc => {
              const entity = doc.data()
              entity.id = doc.id
              newEntities.push(entity)
          });
          setPayments(newEntities)
      },
      error => {
          console.log(error)
      },
    )
  }

  const loadOrders = () => {
    firestore().collection('orders')
    .where("customerId", '==', customer.id)
    .onSnapshot(
      querySnapshot => {
          const newEntities = []
          querySnapshot.forEach(doc => {
              const entity = doc.data()
              entity.id = doc.id
              newEntities.push(entity)
          });
          setOrders(newEntities)
      },
      error => {
          console.log(error)
      }
    )
  }

  const renderCustomer = ({item}) => {
    return (
      <View style={styles.profileContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.customerName}>
              {item.customerName} 
            </Text>
            <FeatherIcon name="edit" style={styles.icon} size={22} onPress={ () => {
              navigation.navigate('Update Customer', { customer: customerDetail[0]})
            }}>
            </FeatherIcon>
            <FeatherIcon name="trash" style={styles.icon} size={22} onPress={() => {
                deleteCustomer(customerDetail[0])
                navigation.goBack()
              }
            }>
            </FeatherIcon>
          </View>
          <Text style={styles.totalBalance}>
            Remaining Balance: Php {item.remainingBalance} 
          </Text>
          {
            item.lastUpdated ? null : <Text style={styles.dateUpdated}>{}</Text>
          }
      </View>
    )
  }

  const renderTransactions = ({item}) => {
    const convertedDate = item.dateOfPayment ? item.dateOfPayment.toDate().toLocaleDateString() : item.dateOfOrder.toDate().toLocaleDateString()
    return (
      item.amountPaid ? 
      (
        <Text style={styles.sectionListItems}>
          ({convertedDate}) Php: {item.amountPaid} 
        </Text>
      ) : (
        <Text style={styles.sectionListItems}>
          ({convertedDate}) Php: {item.orderAmount} 
        </Text>
      ) 
    )
  }
  
  const DATA = [
    {
    title: "Payments",
    data: payments,
    },
    {
    title: "Orders",
    data: orders,
    }
]
  return (
    <View style={styles.container}>

      <View style={styles.profile}>
          <FlatList
              data={customerDetail}
              renderItem={renderCustomer}
              keyExtractor={(item) => item.id}
          />
      </View>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderTransactions}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
      <View>
        <FontIcon color={'#2471A3'} name="cart-plus" style={styles.cartIcon} size={40}
          onPress={() => {
              navigation.navigate('Order', { customer: customerDetail[0]})
            }
          }
        />
        <MaterialIcon color={'#2471A3'} name="payment" style={styles.payIcon} size={50}
          onPress={ () => {
              navigation.navigate('Payment', { customer: customerDetail[0]})
            }
          }
        />
      </View>
    </View>   
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  profile: {
    padding: 10,
  },
  
  nameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },

  customerName: {
    color: '#2C3E50' ,
    marginRight: 10,
    fontSize: 30,
  },

  icon: {
    marginLeft: 10,
  },

  totalBalance: {
    fontSize : 20,
  },

  sectionHeader:{
    backgroundColor : '#64B5F6',
    fontSize : 23,
    padding: 5,
    color: '#fff',
    fontWeight: 'bold'
 },
  sectionListItems:{
    fontSize : 18,
    padding: 10,
    color: '#34495E',
  },
  cartIcon: {
    position: 'absolute', 
    bottom: 25,
    right: 30,
    alignSelf: "center"
  },
  payIcon: {
    position: 'absolute', 
    bottom: 20,
    right: 110,
    alignSelf: "center"
  },
});