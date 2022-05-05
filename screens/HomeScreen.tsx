import React, { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TextInput } from 'react-native';
import { LoginContext } from '../services/LoginProvider';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import FirebaseAuthService from '../services/FirebaseAuthService';
import firestore from '@react-native-firebase/firestore';
import AntIcon from 'react-native-vector-icons/AntDesign';

export default function HomeScreen( { navigation } ) {
  const { user } = useContext(LoginContext)
  const [customerData, setCustomerData] = useState([])
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    getSearch();
  },[])

  const getSearch = () => {
    searchKey.trim() === '' ?
    firestore()
    .collection('customers')
    .where('authorId', '==', user.uid)
    .orderBy('customerName')
    .onSnapshot(
      querySnapshot => {
          const newEntities = []
          querySnapshot.forEach(doc => {
              const entity = doc.data()
              entity.id = doc.id
              newEntities.push(entity)
          });
          setCustomerData(newEntities)
      },
      error => {
          console.log(error)
      }
    ) : firestore()
    .collection('customers')
    .where('authorId', '==', user.uid)
    .orderBy('customerName').startAt(searchKey.trim()).endAt(searchKey.trim() + '~')
    .onSnapshot(
      querySnapshot => {
          const newEntities = []
          querySnapshot.forEach(doc => {
              const entity = doc.data()
              entity.id = doc.id
              newEntities.push(entity)
          });
          setCustomerData(newEntities)
      },
      error => {
          console.log(error)
      }
    )
  }

  const signOut = () => {
    FirebaseAuthService.signOut();
  };

  const renderEntity = ({item, index}) => {
    return (
        <TouchableOpacity activeOpacity={1} style={{  width: "100%"}} onPress={() => {
          navigation.navigate('Customer Details', { customer: item })}}>
          <View style={styles.listItems} >
            <Text style={styles.listText} key={item.id}>
              {index + 1}.   {item.customerName}   (balance: Php {item.remainingBalance})
            </Text>  
          </View>
        </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeader}>Customers</Text>
      <TextInput
        placeholder="Search"
        onChangeText={(text) => {
          setSearchKey(text) 
          getSearch()
          }
        }
        value={searchKey}
        style={styles.textInput}
      />
      <View style={styles.logout}>
      <AntIcon color={'#000'} name="logout" onPress={() => signOut()} size={30}></AntIcon>
      </View>
      {customerData.length === 0 ? <Text style={styles.noData}>No data found</Text> 
      : <View style={styles.listContainer}>
          <FlatList
              data={customerData}
              renderItem={renderEntity}
              keyExtractor={(item) => item.id}
              removeClippedSubviews={true}
              ListFooterComponent={<View style={{height: 20}}/>}
          />
        </View>
      }
      <View style={styles.add}>
      <AntIcon color={'#2471A3'} name="pluscircleo" onPress={() => navigation.navigate('Customer')} size={50} ></AntIcon>
      </View>
    </View>

  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },

  pageHeader: {
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 20,
    color : '#212F3D',
  },

  textInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#566573',
    height: 50,
    alignSelf:"center",
    width:"90%",
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5,
  },

  listContainer: {
    flex:1,
  },

  listItems: {
    margin:10,
    padding:10,
    backgroundColor:"#D6EAF8",
    width:"90%",
    height: 50,
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 4,
  },

  listText: {
    fontSize: 18,
  },

  noData: {
    marginTop: 40,
    fontSize: 18,
    alignSelf:"center",
  },

  //Button Designs
  logout: {
    position: "absolute",
    right: 20,
    alignItems: 'flex-end',
  },

  add: {
    position: "absolute", 
    bottom: 20,
    right: 20,
    alignSelf: "flex-end"
  },
});