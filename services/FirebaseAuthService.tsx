import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert } from 'react-native';

export default class FirebaseAuthService {
  public static signIn = async (email: string, password: string) => { 
    return await auth().signInWithEmailAndPassword(email, password);
  };

  public static signUp = async (email: string, password: string, username: string) => {
    return await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          username,
        };
        const userRef = firestore().collection('users')
        userRef
          .doc(uid)
          .set(data)
          .catch((error) => {
            console.log(error)
          });
      })
  };

  public static signOut = async () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to logout?",
      [
        {
          text: "Yes",
          onPress: () => {
            auth().signOut().catch(
              (e) => {
                console.log(e);
                alert('Something went wrong');
            });
          },
        },
        {
          text: "No",
        },
      ]
    );
  };
}